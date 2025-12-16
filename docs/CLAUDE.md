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

### PR Discussion & Comment Management

When responding to PR review comments:

**Step 1: Understanding Context**
- Read the entire comment thread to understand the discussion
- Review related code changes and files
- Identify the specific concern or request

**Step 2: Reply In-Thread**
- Use GitHub API for threaded responses (not top-level comments)
- Fetch the comment ID first
- Post reply using the PR comment response endpoint
- Note: `gh pr review --comment` creates top-level comments, NOT threaded replies

**Step 3: Reply Format**
- Start with acknowledgment: "Thanks for catching that!", "Good point!", "You're right!", or "Agreed!"
- Acknowledge the specific feedback
- Explain what changes were made
- Reference file paths with line numbers (e.g., `components/Contact/Contact.tsx:107`)
- Include commit hash for traceability

**Step 4: Making Changes**
- Create individual commits per comment addressed
- Use descriptive commit messages that reference the feedback
- Format:
  ```
  <type>: <brief description>

  Addresses PR review feedback: <specific concern>

  Changes:
  - Bullet point 1
  - Bullet point 2

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```

**Step 5: Best Practices**
- Address feedback promptly and thoroughly
- Ask clarifying questions if feedback is unclear
- Test changes locally before pushing
- Ensure CI checks pass after addressing comments
- **Never mark comments as resolved** - let reviewers handle this
- Keep replies focused and concise
- Reference specific line numbers and commit hashes

