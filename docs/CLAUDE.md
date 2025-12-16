# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Notes

### Git Workflow
- **NEVER push directly to the master branch**
- Always create a feature branch for your changes
- Push to the feature branch and create a Pull Request
- **ALWAYS check CI checks after pushing code**
  - Go to the PR page on GitHub
  - Verify all workflow checks are passing (green checkmarks)
  - If checks fail, review the error logs and fix issues before requesting review
- Wait for CI checks to pass before merging
- All changes must go through the PR review process

### Documentation Standards
- **Use Mermaid.js for diagrams** - All architecture diagrams, flowcharts, and technical diagrams should be created using Mermaid.js syntax
  - Benefits: Renders natively on GitHub, version-controllable, consistent styling
  - Example: See `docs/DEPLOYMENT.md` Overview section for deployment architecture
  - Reference: [Mermaid.js Documentation](https://mermaid.js.org/)
- Keep documentation organized in the `docs/` folder
- Update `docs/README.md` when adding new documentation files

