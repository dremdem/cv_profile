# Automated Deployment Setup Guide

This guide provides step-by-step instructions for setting up automated deployment for the CV Profile application using GitHub Actions, Docker Compose, and SSH.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Security Approach](#security-approach)
- [Setup Steps](#setup-steps)
  - [Step 1: Create Deployment User](#step-1-create-deployment-user)
  - [Step 2: Generate SSH Key Pair](#step-2-generate-ssh-key-pair)
  - [Step 3: Configure Droplet SSH Access](#step-3-configure-droplet-ssh-access)
  - [Step 4: Configure GitHub Secrets](#step-4-configure-github-secrets)
  - [Step 5: Install Docker Compose (if needed)](#step-5-install-docker-compose-if-needed)
  - [Step 6: Test Deployment](#step-6-test-deployment)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring](#monitoring)

---

## Overview

The automated deployment system provides zero-touch deployment with health checks and automatic rollback capabilities.

**Architecture:**

```mermaid
graph TB
    A[Developer: Trigger Workflow] --> B[GitHub Actions: Build Image]
    B --> C[GHCR: Store Image]
    C --> D[GitHub Actions: SSH to Droplet]
    D --> E[Droplet: Run deploy.sh]
    E --> F[Docker Compose: Pull & Deploy]
    F --> G{Health Check}
    G -->|✅ Healthy| H[Remove Old Container]
    G -->|❌ Unhealthy| I[Rollback to Previous]
    H --> J[Cleanup Old Images]
    J --> K[Deployment Complete]
    I --> L[Deployment Failed - Safe State]

    style A fill:#2ea44f,stroke:#1b6635,color:#fff
    style K fill:#2ea44f,stroke:#1b6635,color:#fff
    style L fill:#cf222e,stroke:#a40e26,color:#fff
```

**Key Benefits:**
- ✅ Single workflow trigger deploys everything
- ✅ Automatic health verification
- ✅ Built-in rollback on failure
- ✅ Deployment logging for debugging
- ✅ Zero or minimal downtime

---

## Prerequisites

Before setting up automated deployment, ensure you have:

- [ ] Digital Ocean droplet running and accessible
- [ ] Docker installed on droplet
- [ ] Nginx configured and working
- [ ] Root or sudo access to droplet (for initial setup only)
- [ ] Admin access to GitHub repository
- [ ] Repository secrets permission (Settings > Secrets)

## Security Approach

**Important:** This deployment uses a **dedicated non-root user** with Docker group membership instead of root access.

**Security Benefits:**
- ✅ **No root SSH access** - Compromised key cannot destroy system
- ✅ **Limited blast radius** - Attacker confined to Docker operations
- ✅ **Clear audit trail** - All actions logged as deployment user
- ✅ **Easy to revoke** - Simply delete user if needed
- ✅ **Industry standard** - Widely adopted best practice

**User:** `github-deploy` (non-root user with docker group membership)

**What attacker CAN do if key is compromised:**
- Manipulate containers (stop, start, modify)
- Pull and run Docker images
- Access container data

**What attacker CANNOT do:**
- Delete system files
- Install malware on host
- Create users or modify system
- Disable firewall
- Access other users' data

**Security Rating: 7/10** (Good balance of security and practicality)

---

## Setup Steps

### Step 1: Create Deployment User

**Why:** Using a dedicated non-root user significantly improves security.

Create a user named `github-deploy` with Docker permissions:

```bash
# SSH to droplet as root (one-time setup)
ssh root@YOUR_DROPLET_IP

# Create deployment user (no password - SSH key only)
sudo adduser --disabled-password --gecos "GitHub Actions Deploy User" github-deploy

# Add user to docker group (allows running docker commands)
sudo usermod -aG docker github-deploy

# Verify docker group membership
groups github-deploy
# Expected output: github-deploy : github-deploy docker

# Test docker access (switch to new user)
sudo -u github-deploy docker ps
# Should show container list without errors
```

**Security Note:**
- User `github-deploy` can run Docker commands but **cannot** use sudo
- If SSH key is compromised, attacker is limited to Docker operations
- System files, other users, and root access remain protected

**Verification:**
```bash
# These should FAIL (no sudo access):
sudo -u github-deploy apt install malware
sudo -u github-deploy rm -rf /

# These should WORK (docker group access):
sudo -u github-deploy docker ps
sudo -u github-deploy docker images
```

---

### Step 2: Generate SSH Key Pair

Generate a dedicated SSH key pair for GitHub Actions to use:

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github-actions-deploy

# This creates two files:
# - github-actions-deploy (private key - for GitHub Secrets)
# - github-actions-deploy.pub (public key - for droplet)
```

**Important:**
- Do NOT set a passphrase (GitHub Actions can't enter it)
- Keep the private key secure
- You'll delete it from your local machine after adding to GitHub Secrets

---

### Step 3: Configure Droplet SSH Access

Add the public key to the `github-deploy` user's authorized keys:

```bash
# Still on droplet as root
sudo mkdir -p /home/github-deploy/.ssh
sudo chmod 700 /home/github-deploy/.ssh

# Copy your public key content to authorized_keys
# (You can use nano, vim, or paste from local machine)
sudo nano /home/github-deploy/.ssh/authorized_keys
# Paste the contents of ~/.ssh/github-actions-deploy.pub from your local machine

# Set correct permissions
sudo chmod 600 /home/github-deploy/.ssh/authorized_keys
sudo chown -R github-deploy:github-deploy /home/github-deploy/.ssh

# Exit from droplet
exit
```

**Alternative: Copy key from local machine:**
```bash
# On your local machine
cat ~/.ssh/github-actions-deploy.pub | ssh root@YOUR_DROPLET_IP \
  "sudo mkdir -p /home/github-deploy/.ssh && \
   sudo tee /home/github-deploy/.ssh/authorized_keys && \
   sudo chmod 700 /home/github-deploy/.ssh && \
   sudo chmod 600 /home/github-deploy/.ssh/authorized_keys && \
   sudo chown -R github-deploy:github-deploy /home/github-deploy/.ssh"
```

**Test SSH connection:**
```bash
# On your local machine
ssh -i ~/.ssh/github-actions-deploy github-deploy@YOUR_DROPLET_IP "echo 'SSH connection successful!'"

# Expected output:
# SSH connection successful!

# Test docker access via SSH:
ssh -i ~/.ssh/github-actions-deploy github-deploy@YOUR_DROPLET_IP "docker ps"

# Should show container list
```

**If this works, security setup is complete!** ✅

---

### Step 4: Configure GitHub Secrets

Add three secrets to your GitHub repository:

#### 4.1. Add `DROPLET_SSH_KEY`

1. Display the private key:
   ```bash
   cat ~/.ssh/github-actions-deploy
   ```

2. Copy the **entire output** including:
   ```
   -----BEGIN OPENSSH PRIVATE KEY-----
   ... (key content) ...
   -----END OPENSSH PRIVATE KEY-----
   ```

3. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
4. Click **"New repository secret"**
5. Name: `DROPLET_SSH_KEY`
6. Value: Paste the entire private key
7. Click **"Add secret"**

#### 4.2. Add `DROPLET_HOST`

1. Determine your droplet's address (IP or domain):
   ```bash
   # Use IP address
   YOUR_DROPLET_IP

   # Or domain name (if DNS configured)
   dremdem.ru
   ```

2. Add secret:
   - Name: `DROPLET_HOST`
   - Value: Your droplet IP or domain (e.g., `134.122.xx.xx` or `dremdem.ru`)

#### 4.3. Add `DROPLET_USER`

1. Add secret:
   - Name: `DROPLET_USER`
   - Value: `github-deploy` (the non-root user we created)

**Important:** Use `github-deploy`, NOT `root`

#### 4.4. Verify Secrets

After adding all three secrets, you should see:

| Name | Value | Updated |
|------|-------|---------|
| DROPLET_SSH_KEY | (hidden) | Now |
| DROPLET_HOST | YOUR_DROPLET_IP or domain | Now |
| DROPLET_USER | github-deploy | Now |
| GOATCOUNTER_CODE | (existing) | (existing) |

#### 4.5. Clean Up Local SSH Key

**Important:** Delete the private key from your local machine (it's now in GitHub Secrets):

```bash
# Securely delete private key
shred -u ~/.ssh/github-actions-deploy

# Or on macOS:
rm -P ~/.ssh/github-actions-deploy

# Keep public key for reference (optional)
# rm ~/.ssh/github-actions-deploy.pub
```

---

### Step 5: Install Docker Compose (if needed)

Check if docker-compose is installed on your droplet:

```bash
ssh github-deploy@YOUR_DROPLET_IP "docker-compose --version"
```

If not installed, install it **(requires root - one-time setup)**:

```bash
ssh root@YOUR_DROPLET_IP << 'EOF'
  # Download docker-compose
  curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

  # Make executable
  chmod +x /usr/local/bin/docker-compose

  # Verify installation
  docker-compose --version
EOF
```

**Verify as deployment user:**
```bash
ssh github-deploy@YOUR_DROPLET_IP "docker-compose --version"
# Expected: Docker Compose version...
```

---

### Step 6: Test Deployment

Now test the automated deployment:

#### 6.1. Trigger Workflow

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **"Docker Release"** workflow
4. Click **"Run workflow"**
5. Ensure `master` branch is selected
6. Click **"Run workflow"** button

#### 6.2. Monitor Deployment

Watch the workflow execution:

1. Click on the running workflow
2. Expand **"build-and-push"** job to see image build
3. Expand **"deploy"** job to see deployment steps:
   - ✅ Setup SSH
   - ✅ Copy docker-compose.yml
   - ✅ Copy deploy.sh
   - ✅ Run deployment
   - ✅ Verify deployment

#### 6.3. Check Deployment Logs

SSH to your droplet and check deployment logs:

```bash
ssh github-deploy@YOUR_DROPLET_IP "tail -50 /var/log/cv-profile-deploy.log"
```

**Expected output:**
```
[2025-12-17 10:30:15] =========================================
[2025-12-17 10:30:15] Starting CV Profile deployment
[2025-12-17 10:30:15] =========================================
[2025-12-17 10:30:15] Current container ID: abc123...
[2025-12-17 10:30:16] Pulling latest image from GHCR...
[2025-12-17 10:30:25] Image pulled successfully
[2025-12-17 10:30:25] Deploying new container...
[2025-12-17 10:30:27] Container started, waiting for health check...
[2025-12-17 10:30:32] Health check passed!
[2025-12-17 10:30:32] Deployment successful!
```

#### 6.4. Verify Application

Visit your application URL:

```bash
curl -I https://dremdem.ru
```

**Expected:**
```
HTTP/2 200
```

If you see this, deployment is successful! ✅

---

## How It Works

### Workflow Execution

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub Actions
    participant GHCR as GitHub Registry
    participant Droplet as Digital Ocean
    participant App as Application

    Dev->>GH: Trigger Workflow
    GH->>GH: Build Docker Image
    GH->>GHCR: Push Image :latest
    GH->>Droplet: SSH Connection
    GH->>Droplet: Copy docker-compose.yml
    GH->>Droplet: Copy deploy.sh
    GH->>Droplet: Execute deploy.sh
    Droplet->>GHCR: Pull Latest Image
    Droplet->>Droplet: Save Current Container ID
    Droplet->>App: Start New Container
    Droplet->>App: Health Check (60s)

    alt Health Check Passes
        App-->>Droplet: ✅ Healthy
        Droplet->>Droplet: Remove Old Container
        Droplet->>Droplet: Cleanup Old Images
        Droplet-->>GH: ✅ Deployment Success
    else Health Check Fails
        App-->>Droplet: ❌ Unhealthy
        Droplet->>Droplet: Stop New Container
        Droplet->>App: Restart Old Container
        Droplet-->>GH: ❌ Deployment Failed (Rolled Back)
    end
```

### Health Check Mechanism

The deployment script waits up to 60 seconds for the container to become healthy:

```bash
# Health check happens every 30s
# Container is considered healthy when:
# - wget successfully fetches http://localhost:3000
# - Response received within 10s timeout

# If healthy: Deployment continues
# If unhealthy after 60s: Automatic rollback
```

### Rollback Process

If deployment fails, the script automatically:

1. Captures logs from failed container
2. Stops and removes the new container
3. Restarts the previous container using saved image ID
4. Exits with error code (GitHub Actions shows failure)

This ensures your application stays running even if deployment fails.

---

## Troubleshooting

### Issue: Workflow fails at "Setup SSH"

**Error:** `Permission denied (publickey)`

**Solution:**
1. Verify `DROPLET_SSH_KEY` secret contains the correct private key
2. Ensure public key is in droplet's `~/.ssh/authorized_keys`
3. Test SSH connection manually:
   ```bash
   ssh -i ~/.ssh/github-actions-cv-profile root@YOUR_DROPLET_IP
   ```

---

### Issue: Workflow fails at "Run deployment"

**Error:** `docker-compose: command not found`

**Solution:**
Install docker-compose on droplet (see Step 4).

---

### Issue: Deployment fails with "Health check did not pass"

**Possible causes:**

1. **Application not starting:**
   ```bash
   ssh github-deploy@YOUR_DROPLET_IP "docker logs cv-profile --tail 100"
   ```

2. **Port conflict:**
   ```bash
   ssh github-deploy@YOUR_DROPLET_IP "netstat -tulpn | grep 3000"
   ```

3. **Insufficient resources:**
   ```bash
   ssh github-deploy@YOUR_DROPLET_IP "docker stats --no-stream"
   ```

**Solution:**
- Check container logs for errors
- Ensure port 3000 is available
- Verify droplet has enough memory/CPU

---

### Issue: Old containers not being removed

**Symptom:** Multiple `cv-profile` containers exist

**Solution:**
Manually clean up:
```bash
ssh github-deploy@YOUR_DROPLET_IP << 'EOF'
  # Stop all cv-profile containers
  docker ps -a -q -f name=cv-profile | xargs -r docker stop

  # Remove all cv-profile containers
  docker ps -a -q -f name=cv-profile | xargs -r docker rm

  # Start fresh with docker-compose
  cd ~/cv_profile
  docker-compose up -d
EOF
```

---

### Issue: Deployment logs not found

**Error:** `/var/log/cv-profile-deploy.log: No such file or directory`

**Solution:**
Create log file (requires root):
```bash
ssh root@YOUR_DROPLET_IP "touch /var/log/cv-profile-deploy.log && chmod 666 /var/log/cv-profile-deploy.log"
```

**Note:** Log file needs world-writable permissions (666) so `github-deploy` user can write to it.

---

## Rollback Procedures

### Automatic Rollback

Automatic rollback happens when:
- Health check fails within 60s
- Container stops unexpectedly
- Application doesn't respond

**No action required** - script handles this automatically.

---

### Manual Rollback

If you need to manually rollback to a previous version:

#### Option 1: Using previous image

```bash
ssh github-deploy@YOUR_DROPLET_IP << 'EOF'
  # Stop current container
  cd ~/cv_profile
  docker-compose down

  # List available images
  docker images ghcr.io/dremdem/cv_profile

  # Run specific image by ID
  docker run -d \
    --name cv-profile \
    --restart unless-stopped \
    -p 127.0.0.1:3000:3000 \
    ghcr.io/dremdem/cv_profile@sha256:PREVIOUS_IMAGE_SHA
EOF
```

#### Option 2: Re-run previous deployment

1. Find successful workflow run in GitHub Actions
2. Click **"Re-run all jobs"**
3. This will deploy the same image again

---

## Monitoring

### Check Deployment Status

```bash
# View recent deployments
ssh github-deploy@YOUR_DROPLET_IP "tail -100 /var/log/cv-profile-deploy.log"

# Check container status
ssh github-deploy@YOUR_DROPLET_IP "docker ps -f name=cv-profile"

# Check container health
ssh github-deploy@YOUR_DROPLET_IP "docker inspect --format='{{.State.Health.Status}}' cv-profile"

# View application logs
ssh github-deploy@YOUR_DROPLET_IP "docker logs cv-profile --tail 50 -f"
```

### Monitor Resource Usage

```bash
# Check disk space
ssh github-deploy@YOUR_DROPLET_IP "df -h"

# Check memory usage
ssh github-deploy@YOUR_DROPLET_IP "free -h"

# Check container resources
ssh github-deploy@YOUR_DROPLET_IP "docker stats cv-profile --no-stream"
```

### Verify Application Health

```bash
# HTTP health check
curl -I https://dremdem.ru

# Check response time
curl -w "@-" -o /dev/null -s https://dremdem.ru <<'EOF'
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
      time_redirect:  %{time_redirect}s\n
   time_starttransfer:%{time_starttransfer}s\n
                     ----------\n
         time_total:  %{time_total}s\n
EOF
```

---

## Security Best Practices

1. **SSH Key Management:**
   - Use dedicated SSH keys for automation
   - Never commit private keys to repository
   - Rotate keys periodically
   - Delete keys from local machine after adding to GitHub Secrets

2. **Access Control:**
   - Limit SSH key permissions (read-only where possible)
   - Use GitHub environment protection rules
   - Require manual approval for production deployments (optional)

3. **Secrets Management:**
   - Regularly audit GitHub Secrets
   - Remove unused secrets
   - Monitor secret access logs

4. **Monitoring:**
   - Set up alerts for failed deployments
   - Monitor deployment logs regularly
   - Track deployment frequency and success rate

---

## Next Steps

After successful automated deployment setup:

1. **Test failure scenario:**
   - Intentionally break the application
   - Verify automatic rollback works

2. **Set up monitoring:**
   - Configure uptime monitoring (e.g., UptimeRobot)
   - Set up log aggregation
   - Create alerting for failed deployments

3. **Document team procedures:**
   - Who can trigger deployments?
   - What to do when deployment fails?
   - How to verify deployment success?

4. **Consider enhancements:**
   - Staging environment
   - Blue-green deployments for zero downtime
   - Automated testing before deployment
   - Deployment notifications (Slack, Discord, etc.)

---

## Support

If you encounter issues not covered in this guide:

1. Check GitHub Actions workflow logs
2. Review deployment logs on droplet
3. Verify all GitHub Secrets are correctly configured
4. Ensure droplet has sufficient resources
5. Check firewall and network connectivity

**Log Locations:**
- GitHub Actions: Repository → Actions → Workflow run
- Deployment: `/var/log/cv-profile-deploy.log` on droplet
- Application: `docker logs cv-profile` on droplet
- Nginx: `/var/log/nginx/error.log` on droplet
