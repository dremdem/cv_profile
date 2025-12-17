# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Notes

### Git Workflow

#### Core Rules (NO EXCEPTIONS)

**RULE #1: NEVER push directly to the master branch**

This rule applies to:
- ❌ Bug fixes (even one-line fixes)
- ❌ Typo corrections
- ❌ Documentation updates
- ❌ Emergency hotfixes
- ❌ Follow-up changes to merged PRs
- ❌ "Small" changes
- ❌ "Quick" fixes
- ❌ ANY change, regardless of size or urgency

**There are ZERO exceptions to this rule.**

#### Required Workflow for ALL Changes

```bash
# 1. Start from updated master
git checkout master
git pull origin master

# 2. Create feature branch
git checkout -b feature/issue-XX-description
# or: fix/bug-description
# or: docs/topic-description

# 3. Make your changes
# ... edit files ...

# 4. Commit to feature branch
git add <files>
git commit -m "type: description"

# 5. Push feature branch (NOT master!)
git push -u origin feature/issue-XX-description

# 6. Create Pull Request
gh pr create --title "..." --body "..."

# 7. Wait for review and approval
# Human reviewer merges to master
```

#### Why This Rule Exists

- **Code Review:** All changes must be reviewed by humans
- **Quality Control:** Prevents breaking changes from reaching production
- **Audit Trail:** Every change traceable through PR history
- **CI/CD:** Allows automated checks to run before merge
- **Team Collaboration:** Enables discussion and feedback
- **Rollback Safety:** Easy to revert if issues found

#### Common Mistakes to Avoid

**❌ WRONG:**
```bash
git checkout master
# ... make changes ...
git commit -m "quick fix"
git push origin master  # ← VIOLATION!
```

**✅ CORRECT:**
```bash
git checkout -b fix/quick-fix
# ... make changes ...
git commit -m "fix: description"
git push origin fix/quick-fix  # ← Correct!
gh pr create ...
```

#### What To Do If You Accidentally Push to Master

If you realize you pushed to master:

```bash
# 1. Immediately notify the team
# 2. Consider reverting the commit:
git checkout master
git revert <commit-hash>
git push origin master

# 3. Create proper PR with the fix:
git checkout -b fix/proper-implementation
git cherry-pick <commit-hash>
git push origin fix/proper-implementation
gh pr create ...

# 4. Document the incident in the PR description
```

#### Branch Naming Conventions

- `feature/issue-XX-description` - New features
- `fix/issue-XX-description` - Bug fixes
- `docs/topic-description` - Documentation updates
- `refactor/component-name` - Code refactoring
- `test/feature-name` - Test additions

#### PR Requirements

- **ALWAYS check CI checks after pushing code**
  - Go to the PR page on GitHub
  - Verify all workflow checks are passing (green checkmarks)
  - If checks fail, review the error logs and fix issues before requesting review
- Wait for CI checks to pass before merging
- All changes must go through the PR review process
- Link related issues using "Fixes #XX" or "Addresses #XX"
- Provide clear description of what changed and why

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

