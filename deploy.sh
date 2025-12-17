#!/bin/bash

# Automated deployment script for CV Profile application
# This script pulls the latest Docker image and deploys it with health checks and automatic rollback

set -e  # Exit on error

# Configuration
DEPLOY_USER="github-deploy"
COMPOSE_FILE="/home/${DEPLOY_USER}/cv_profile/docker-compose.yml"
LOG_FILE="/var/log/cv-profile-deploy.log"
MAX_HEALTH_CHECK_WAIT=60  # seconds
HEALTH_CHECK_INTERVAL=5   # seconds

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

# Start deployment
log "========================================="
log "Starting CV Profile deployment"
log "========================================="

# Change to project directory
cd "/home/${DEPLOY_USER}/cv_profile" || {
    log_error "Failed to change to project directory"
    exit 1
}

# Get current container ID for potential rollback
CURRENT_CONTAINER=$(docker ps -q -f name=cv-profile)
if [ -n "$CURRENT_CONTAINER" ]; then
    log "Current container ID: $CURRENT_CONTAINER"
    # Get current image ID
    CURRENT_IMAGE=$(docker inspect --format='{{.Image}}' "$CURRENT_CONTAINER")
    log "Current image ID: $CURRENT_IMAGE"
else
    log_warning "No running container found. This might be the first deployment."
    CURRENT_CONTAINER=""
    CURRENT_IMAGE=""
fi

# Pull latest image
log "Pulling latest image from GHCR..."
if ! docker-compose pull; then
    log_error "Failed to pull latest image"
    exit 1
fi
log "Image pulled successfully"

# Deploy new container
log "Deploying new container..."
if ! docker-compose up -d; then
    log_error "Failed to start new container"

    # Rollback if we had a previous container
    if [ -n "$CURRENT_CONTAINER" ]; then
        log "Attempting rollback to previous container..."
        docker start "$CURRENT_CONTAINER" || log_error "Rollback failed!"
    fi

    exit 1
fi

log "Container started, waiting for health check..."

# Wait for health check to pass
ELAPSED=0
HEALTH_CHECK_PASSED=false

while [ $ELAPSED -lt $MAX_HEALTH_CHECK_WAIT ]; do
    # Check container health status
    HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' cv-profile 2>/dev/null || echo "none")

    if [ "$HEALTH_STATUS" = "healthy" ]; then
        log "Health check passed!"
        HEALTH_CHECK_PASSED=true
        break
    elif [ "$HEALTH_STATUS" = "unhealthy" ]; then
        log_error "Health check failed (unhealthy status)"
        break
    fi

    # Also check if container is still running
    if ! docker ps -q -f name=cv-profile | grep -q .; then
        log_error "Container stopped unexpectedly"
        break
    fi

    log "Health check status: $HEALTH_STATUS (waiting... ${ELAPSED}s/${MAX_HEALTH_CHECK_WAIT}s)"
    sleep $HEALTH_CHECK_INTERVAL
    ELAPSED=$((ELAPSED + HEALTH_CHECK_INTERVAL))
done

# Verify deployment success
if [ "$HEALTH_CHECK_PASSED" = true ]; then
    log "Deployment successful!"

    # Cleanup old container if exists
    if [ -n "$CURRENT_CONTAINER" ] && [ "$CURRENT_CONTAINER" != "$(docker ps -q -f name=cv-profile)" ]; then
        log "Removing old container: $CURRENT_CONTAINER"
        docker rm -f "$CURRENT_CONTAINER" 2>/dev/null || log_warning "Failed to remove old container"
    fi

    # Cleanup old images (keep last 3)
    log "Cleaning up old images..."
    docker images ghcr.io/dremdem/cv_profile --format "{{.ID}}" | tail -n +4 | xargs -r docker rmi -f 2>/dev/null || true

    log "========================================="
    log "Deployment completed successfully"
    log "========================================="
    exit 0
else
    log_error "Deployment failed! Health check did not pass within ${MAX_HEALTH_CHECK_WAIT}s"

    # Get logs from failed container
    log "Failed container logs:"
    docker logs cv-profile --tail 50 | tee -a "$LOG_FILE"

    # Rollback
    log "Rolling back to previous container..."
    docker-compose down

    if [ -n "$CURRENT_IMAGE" ]; then
        log "Starting previous image: $CURRENT_IMAGE"
        docker run -d \
            --name cv-profile \
            --restart unless-stopped \
            -p 127.0.0.1:3000:3000 \
            "$CURRENT_IMAGE"

        log "Rollback completed"
    else
        log_error "No previous image available for rollback"
    fi

    log "========================================="
    log "Deployment failed and rolled back"
    log "========================================="
    exit 1
fi
