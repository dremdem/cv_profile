# Visitor Counter Solutions Analysis

**Issue:** [#18 - Add a simple counter (Google?)](https://github.com/dremdem/cv_profile/issues/18)
**Date:** 2025-12-15
**Author:** Claude Code

---

## Executive Summary

This document analyzes options for adding a visitor counter to the CV Profile portfolio site. The site is a Next.js 14 application deployed via Docker to Digital Ocean, currently with **no analytics or tracking**.

Given the project's privacy-conscious, self-hosted design philosophy, I recommend **Option B: GoatCounter** as the best balance of simplicity, privacy, and features.

---

## Current Site Architecture

| Aspect | Details |
|--------|---------|
| Framework | Next.js 14 (App Router) + React 18 |
| Styling | Tailwind CSS + Framer Motion |
| Deployment | Docker container on Digital Ocean |
| Current Analytics | None |
| Footer/Contact | Integrated as scrolling section (not traditional footer) |

---

## Requirements Analysis

Based on the issue description "simple counter", the requirements appear to be:
1. Display visitor count on the page (visible counter)
2. Simple to implement and maintain
3. Optional: Basic analytics (page views, referrers)

---

## Option A: Google Analytics 4 (GA4)

### Overview
Industry-standard analytics platform with comprehensive tracking capabilities.

### Integration Method
```bash
npm install @next/third-parties@latest
```

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

### Pros
- Official Next.js integration via `@next/third-parties`
- Comprehensive analytics (demographics, behavior flow, conversions)
- Free for most use cases
- Real-time debugging tools
- Industry standard (familiar interface)

### Cons
- **Privacy concerns**: Sends data to Google servers, may require GDPR consent banner
- **No visible counter**: Only dashboard analytics (no embeddable visitor count widget)
- **Overkill**: Full-featured analytics for a simple portfolio site
- **Cookie-based**: Uses cookies for tracking (privacy regulations)
- **Complexity**: Steep learning curve for GA4 interface

### Best For
Sites needing detailed user behavior analytics, marketing teams

### Rating for This Project: 4/10
Does not meet the "simple counter" requirement - no visible count on page.

---

## Option B: GoatCounter (Recommended)

### Overview
Open-source, privacy-focused analytics. Can be self-hosted or use free hosted service.

### Integration Method
```html
<!-- Add to layout.tsx or use Script component -->
<script data-goatcounter="https://YOURCODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

Or with public counter display:
```html
<!-- Shows visitor count on your page -->
<a href="https://YOURCODE.goatcounter.com">
  <img src="https://YOURCODE.goatcounter.com/counter/PAGEPATH.svg">
</a>
```

### Pros
- **Visible counter available**: SVG badge showing visitor count
- **Privacy-first**: No cookies, no personal data, GDPR compliant without consent banner
- **Lightweight**: ~3.5KB script
- **Free hosted tier**: For reasonable personal usage
- **Self-hostable**: Docker support if needed
- **Simple dashboard**: Clean, focused metrics
- **Open source**: Full transparency, AGPL licensed

### Cons
- Free tier has usage limits (fine for portfolio sites)
- Less detailed than GA4
- Requires signup for hosted version

### Metrics Provided
- Page views & unique visitors
- Referrers (where visitors came from)
- Browser, OS, screen size
- Country/region
- Campaign tracking (UTM parameters)

### Best For
Personal sites, portfolios, blogs wanting privacy-respecting analytics with visible counter

### Rating for This Project: 9/10
Perfect match - simple, privacy-focused, visible counter option, fits the site's philosophy.

### Implementation Estimate
- Hosted version: 15-30 minutes
- Self-hosted: 1-2 hours (Docker setup)

---

## Option C: Counter.dev

### Overview
Minimalist, privacy-first analytics. Fully open source.

### Integration Method
```html
<script async src="https://cdn.counter.dev/script.js"
        data-id="YOUR_ID"
        data-utcoffset="7"></script>
```

### Pros
- **Ultra-minimal**: Focus on essential metrics only
- **Privacy-first**: No cookies, no fingerprinting, no logging
- **Open source**: AGPL-v3 license
- **Referrer tracking**: Shows which sites link to you
- **Free**: Pay-what-you-want model

### Cons
- **No visible counter widget**: Dashboard only
- Less mature than alternatives
- Limited documentation

### Best For
Sites wanting absolute minimal analytics footprint

### Rating for This Project: 6/10
Good privacy stance but lacks visible counter feature.

---

## Option D: Umami (Self-Hosted)

### Overview
Modern, privacy-focused analytics platform. Built with Next.js. Requires self-hosting.

### Integration Method
```yaml
# docker-compose.yml addition
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3001:3000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/umami
      DATABASE_TYPE: postgresql
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - umami-db:/var/lib/postgresql/data

volumes:
  umami-db:
```

Then add tracking script to your site:
```html
<script async src="https://your-umami-instance.com/script.js"
        data-website-id="YOUR_WEBSITE_ID"></script>
```

### Pros
- **Full data ownership**: Self-hosted, data stays on your server
- **Feature-rich dashboard**: Real-time analytics, custom events
- **Privacy compliant**: No cookies, GDPR friendly
- **Modern UI**: Clean, intuitive interface
- **Active development**: v3 recently released

### Cons
- **Requires self-hosting**: Additional infrastructure (PostgreSQL database)
- **No visible counter widget** out of the box
- **Maintenance overhead**: Updates, database backups
- **Resource usage**: Needs dedicated resources

### Best For
Teams wanting full analytics with complete data ownership

### Rating for This Project: 5/10
Powerful but over-engineered for a simple counter requirement.

---

## Option E: Simple Embeddable Counters

### Overview
Traditional hit counters that display visitor count as an image/badge.

### Examples & Integration

**ReliableCounter.com:**
```html
<a href="https://www.reliablecounter.com" target="_blank">
  <img src="https://www.reliablecounter.com/count.php?page=YOUR_SITE&digit=style/plain/1/&reession=0"
       alt="visitor counter" border="0">
</a>
```

**HitWebCounter.com:**
```html
<script type="text/javascript" src="https://www.hitwebcounter.com/counter/counter.js"
        data-id="YOUR_ID"></script>
```

**StatCounter:**
```html
<!-- StatCounter Code -->
<script type="text/javascript">
var sc_project=YOUR_PROJECT;
var sc_invisible=0;
var sc_security="YOUR_SECURITY";
</script>
<script src="https://www.statcounter.com/counter/counter.js" async></script>
```

### Pros
- **Simple**: Just embed HTML/JS snippet
- **Visible counter**: Shows visitor count on page
- **No signup** (some services)
- **Many styles**: Retro, modern, minimal designs

### Cons
- **Third-party dependency**: Relies on external service
- **Privacy concerns**: May track visitors, IP logging
- **Aesthetic mismatch**: Generic counter styles may clash with Matrix/retro theme
- **Limited analytics**: Just a number, no insights
- **Potentially ads**: Some free tiers show ads

### Best For
Quick solution when you just need a visible number

### Rating for This Project: 5/10
Meets the "visible counter" need but raises privacy concerns and may not fit the aesthetic.

---

## Option F: Custom Self-Hosted Counter

### Overview
Build a simple counter using your existing infrastructure.

### Possible Approaches

**1. Serverless Function (Vercel/Cloudflare):**
- Edge function that increments a counter in KV store
- Return count as JSON or SVG image

**2. Simple API Endpoint:**
- Add API route to Next.js
- Store count in file, SQLite, or external DB (Redis, Supabase)

**3. GitHub-based Counter:**
- Use GitHub API to track visits via a file in repo
- Free, no additional infrastructure

### Example (Next.js API Route + File Storage):
```typescript
// app/api/counter/route.ts
import { promises as fs } from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'data', 'counter.json');

export async function GET() {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf8');
    const { count } = JSON.parse(data);
    return Response.json({ count });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function POST() {
  let count = 0;
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf8');
    count = JSON.parse(data).count;
  } catch {}

  count++;
  await fs.writeFile(COUNTER_FILE, JSON.stringify({ count }));
  return Response.json({ count });
}
```

### Pros
- **Full control**: Design matches site aesthetic perfectly
- **No external dependencies**: Self-contained
- **Privacy-first**: No third-party tracking
- **Free**: No ongoing costs
- **Learning opportunity**: Good exercise

### Cons
- **Development time**: Needs implementation
- **Persistence**: Need to handle data storage
- **Not production-ready**: File storage doesn't work well with Docker (stateless containers)
- **No analytics**: Just a counter, no insights

### Best For
Sites with specific design requirements or wanting educational experience

### Rating for This Project: 6/10
Maximum control but requires development effort and solving persistence in Docker environment.

---

## Comparison Matrix

| Solution | Visible Counter | Privacy | Setup Complexity | Analytics Depth | Cost | Docker Friendly |
|----------|----------------|---------|------------------|-----------------|------|-----------------|
| **GA4** | No | Low | Low | High | Free | Yes |
| **GoatCounter** | Yes (SVG) | High | Low | Medium | Free/Donate | Yes |
| **Counter.dev** | No | High | Low | Low | Free | Yes |
| **Umami** | No | High | High | High | Free (self-host) | Yes |
| **Embeddable** | Yes | Low | Very Low | None | Free | Yes |
| **Custom** | Yes | High | Medium-High | None | Free | Needs work |

---

## Recommendation

### Primary Recommendation: GoatCounter (Hosted)

**Why GoatCounter:**

1. **Meets core requirement**: Provides visible counter via SVG badge
2. **Privacy-aligned**: Matches site's philosophy (currently no tracking)
3. **Simple setup**: Single script tag, free hosted tier
4. **Useful analytics**: Get referrer data, visitor counts without complexity
5. **No consent banner needed**: GDPR compliant without cookies
6. **Open source**: Can self-host later if needed
7. **Professional**: Clean badge design, won't look dated

### Implementation Steps

1. Sign up at [goatcounter.com](https://www.goatcounter.com)
2. Create a site (e.g., `cv-profile.goatcounter.com`)
3. Add script to `app/layout.tsx`:
   ```tsx
   import Script from 'next/script'

   // In layout:
   <Script
     data-goatcounter="https://cv-profile.goatcounter.com/count"
     src="//gc.zgo.at/count.js"
     strategy="afterInteractive"
   />
   ```
4. Add visible counter badge to Contact section (optional):
   ```tsx
   <img
     src="https://cv-profile.goatcounter.com/counter//.svg"
     alt="Visitor count"
     className="opacity-50"
   />
   ```

### Alternative Recommendation: Custom Counter

If you prefer no external dependencies at all, we could implement a custom counter using:
- Supabase (free tier) for persistent storage
- Next.js API route for incrementing/reading
- Custom SVG/component for display that matches the Matrix theme

This would require more development time but gives complete control.

---

## Questions for Review

Before implementation, please clarify:

1. **Visible counter preference**: Do you want a visible counter on the page, or just dashboard analytics?

2. **Privacy stance**: Is sending anonymous data to a third party (GoatCounter) acceptable, or must everything be self-hosted?

3. **Counter location**: If visible, where should it appear?
   - Footer/Contact section
   - Hero section (subtle)
   - Dedicated stats section
   - Floating badge

4. **Counter style**: Should it match the Matrix/retro aesthetic (custom styling) or can it be a simple badge?

5. **Analytics scope**: Do you want referrer tracking and other analytics, or purely a visit count?

---

## Implementation Details

### Status: ✅ IMPLEMENTED (Configuration Required)

The GoatCounter integration has been fully implemented and is ready to use. The implementation is **optional** - the site works normally without it, and tracking only activates when configured.

### Files Changed

1. **`app/layout.tsx`**
   - Added GoatCounter tracking script using Next.js `Script` component
   - Conditional rendering based on environment variable
   - Script loads with `afterInteractive` strategy for optimal performance

2. **`components/Contact/Contact.tsx`**
   - Added environment variable retrieval
   - Integrated VisitorCounter component

3. **`components/Contact/VisitorCounter.tsx`** (NEW)
   - Custom component displaying visitor count badge
   - Matrix-themed styling with glowing effects
   - SVG image filter for green matrix aesthetic
   - Terminal-style label: `> VISITORS_LOGGED: [counter]`

4. **`.env.example`** (NEW)
   - Configuration template
   - Setup instructions

### How It Works

**1. Tracking Script (Invisible)**
- Loaded in `layout.tsx` after page interactive
- Sends anonymous pageview data to GoatCounter
- ~3.5KB overhead, no cookies, no personal data

**2. Visible Counter (Contact Section)**
- Displays below "connection.established" line
- Fetches live visitor count as SVG image
- Styled with Matrix green theme and glow effects
- Animated fade-in with Framer Motion (1.0s delay)

**3. Environment Variable Control**
- `NEXT_PUBLIC_GOATCOUNTER_CODE` - Your GoatCounter site code
- If not set: site works normally, no tracking, no counter display
- If set: tracking enabled + counter visible

### Setup Instructions

#### Step 1: Sign Up for GoatCounter

1. Visit [goatcounter.com/signup](https://www.goatcounter.com/signup)
2. Create a free account
3. Choose a site code (e.g., `cv-profile`)
   - This creates: `cv-profile.goatcounter.com`
4. Complete registration

#### Step 2: Configure GitHub Secret

**IMPORTANT:** `NEXT_PUBLIC_*` environment variables must be set at **build time**, not runtime.

**Add GitHub Repository Secret:**

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GOATCOUNTER_CODE`
4. Value: Your GoatCounter site code (e.g., `dremdem`)
5. Click **Add secret**

**How it works:**
- GitHub Actions workflow reads `secrets.GOATCOUNTER_CODE`
- Passes it as `--build-arg` during Docker build
- Dockerfile accepts it as `ARG` and sets as `ENV`
- Next.js embeds it into JavaScript bundle during build
- Counter appears on production site

#### Step 3: Trigger Build from Master

**Build the Docker image with the secret:**

1. Ensure your changes are merged to `master` branch
2. Go to **Actions** tab on GitHub
3. Select **"Docker Release"** workflow
4. Click **"Run workflow"** dropdown
5. Ensure `master` branch is selected
6. Click **"Run workflow"** button
7. Wait for build to complete (~2-5 minutes)

**The workflow will:**
- Checkout master branch
- Build Docker image with `GOATCOUNTER_CODE` secret
- Push to `ghcr.io/dremdem/cv_profile:latest`
- Image now contains embedded GoatCounter configuration

#### Step 4: Deploy to Production

**Pull and restart on Digital Ocean droplet:**

```bash
# SSH to your droplet
ssh root@your-droplet-ip

# Pull the new image with embedded secret
docker pull ghcr.io/dremdem/cv_profile:latest

# Stop and remove old container
docker stop cv-profile
docker rm cv-profile

# Start new container (no -e flag needed!)
docker run -d \
  --name cv-profile \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  ghcr.io/dremdem/cv_profile:latest

# Verify
docker logs cv-profile
```

#### Step 5: Local Development

**For local testing only:**

```bash
# Create .env.local file (not committed to git)
cp .env.example .env.local

# Edit .env.local and add your site code:
NEXT_PUBLIC_GOATCOUNTER_CODE=your-site-code

# Run dev server
npm run dev
# Visit http://localhost:3000 and check Contact section
```

#### Step 6: Verify Installation

**After deployment, verify the counter is working:**

1. **Check Counter Display:**
   - Visit your production site (e.g., https://dremdem.ru/)
   - Scroll to Contact section
   - Look for `> VISITORS_LOGGED: [number]` line
   - Counter should show visitor count badge

2. **Check Tracking:**
   - Visit your site a few times
   - Go to GoatCounter dashboard: `https://your-code.goatcounter.com`
   - Check if pageviews are being recorded (may take ~10 seconds)
   - Verify stats are updating

3. **Debug Issues:**

   **If counter not showing:**
   ```bash
   # Check if build included the secret
   # Look at build logs in GitHub Actions

   # Check browser console for GoatCounter errors
   # Open DevTools → Console → filter "goatcounter"

   # Verify tracking script loaded
   # View page source → search for "goatcounter"
   # Should see: <script data-goatcounter="https://your-code.goatcounter.com/count"
   ```

   **If counter shows but doesn't track:**
   - Check GoatCounter dashboard for errors
   - Verify site code matches in secret and GoatCounter account
   - Check browser ad blockers (may block GoatCounter)

### Code Architecture

**Privacy-First Design:**
- ✅ No cookies used
- ✅ No personal data collected
- ✅ No fingerprinting
- ✅ GDPR compliant (no consent banner needed)
- ✅ Opt-in by design (requires explicit configuration)

**Performance:**
- Script loads after page interactive (doesn't block rendering)
- SVG counter cached by browser
- ~3.5KB JavaScript overhead
- Minimal impact on Core Web Vitals

**Maintainability:**
- Single environment variable controls everything
- No API keys or secrets needed
- Can disable by removing env var
- Easy to switch to self-hosted GoatCounter later

### Counter Styling Details

The visitor counter badge includes:
- Terminal-style prefix: `> VISITORS_LOGGED:`
- Matrix green text color
- Glowing cyan background effect
- Border with matrix green accent
- CSS filters applied to SVG:
  - `brightness(1.25)` - Brighter display
  - `contrast(1.25)` - Enhanced visibility
  - `hue-rotate(60deg)` - Shift to Matrix green
  - `saturate(1.5)` - More vibrant color
  - `pixelated` rendering for retro aesthetic

### Self-Hosting Option (Future)

The implementation is compatible with self-hosted GoatCounter:

1. Deploy GoatCounter on your infrastructure
2. Update environment variable to your domain:
   ```bash
   NEXT_PUBLIC_GOATCOUNTER_CODE=stats.yourdomain.com
   ```
3. No code changes required

### Next Steps

- [ ] Sign up for GoatCounter account
- [ ] Configure environment variable
- [ ] Deploy and verify counter appears
- [ ] Monitor analytics dashboard
- [ ] Optional: Customize counter styling if needed

---

## Sources

- [GoatCounter - Open Source Web Analytics](https://www.goatcounter.com)
- [Counter.dev - Easy Web Analytics](https://counter.dev/)
- [Next.js Third-Party Libraries Documentation](https://nextjs.org/docs/app/guides/third-party-libraries)
- [Umami GitHub Repository](https://github.com/umami-software/umami)
- [ReliableCounter - Free Hit Counter](https://www.reliablecounter.com/)
- [StatCounter - Free Web Counter](https://statcounter.com/free-hit-counter/)
- [GA4 Next.js Integration Guide](https://dev.to/rajeshkumaryadavdotcom/how-to-implement-google-analytics-4-ga4-in-a-nextjs-project-dm7)
- [Umami Self-Hosting Guide](https://www.paulsblog.dev/self-host-umami-analytics-with-docker-compose/)
