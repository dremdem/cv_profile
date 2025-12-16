# Documentation

This folder contains all project documentation for the CV Profile application.

## Available Documentation

### [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment Guide ⭐
**Complete deployment workflow from build to production**

Topics covered:
- CI/CD workflow with GitHub Actions
- Build from master branch only
- Push to GHCR (GitHub Container Registry)
- Digital Ocean droplet setup
- Docker container management
- nginx configuration
- SSL setup with Let's Encrypt
- Monitoring and troubleshooting

**Start here** if you need to deploy or update the application.

---

### [LANDING_PAGE_PLAN.md](LANDING_PAGE_PLAN.md) - Design Plan
**Original design concept and implementation strategy**

Topics covered:
- Visual design concept (Matrix × 8-Bit theme)
- Color palette and typography
- Layout structure for all sections
- Technical architecture
- Animation strategy
- Development phases
- Success metrics

Reference this document to understand design decisions and implementation approach.

---

### [COUNTER_SOLUTIONS.md](COUNTER_SOLUTIONS.md) - Analytics Research
**Analysis of visitor counter and analytics solutions**

Topics covered:
- Comparison of 6 analytics solutions
- GoatCounter implementation (recommended)
- Privacy-first analytics approach
- Implementation details and setup instructions
- Environment variable configuration
- Docker deployment integration

Contains research, recommendations, and complete implementation guide for visitor tracking.

---

### [CLAUDE.md](CLAUDE.md) - Claude Code Guidelines
**Instructions for Claude Code when working on this project**

Topics covered:
- Git workflow (feature branches, PRs)
- CI check requirements
- Code review process

This file provides context to Claude Code for maintaining consistent development practices.

---

## Quick Reference

| Task | Document | Section |
|------|----------|---------|
| Deploy to production | [DEPLOYMENT.md](DEPLOYMENT.md) | CI/CD Workflow |
| Set up new droplet | [DEPLOYMENT.md](DEPLOYMENT.md) | Part 1-4 |
| Update running app | [DEPLOYMENT.md](DEPLOYMENT.md) | Part 5 |
| Understand design | [LANDING_PAGE_PLAN.md](LANDING_PAGE_PLAN.md) | Visual Design Concept |
| Add analytics | [COUNTER_SOLUTIONS.md](COUNTER_SOLUTIONS.md) | Implementation Details |
| Configure GoatCounter | [COUNTER_SOLUTIONS.md](COUNTER_SOLUTIONS.md) | Setup Instructions |

---

## Documentation Standards

When adding new documentation:

1. **Use clear headings** - Make it easy to scan
2. **Add to this index** - Update README.md with summary
3. **Cross-reference** - Link to related docs
4. **Keep it updated** - Mark last update date
5. **Use examples** - Code samples for technical docs

---

**Last Updated**: 2025-12-16
