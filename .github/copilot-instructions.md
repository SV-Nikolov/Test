<!-- Auto-generated guidance for AI coding agents. Edit with repository-specific details. -->
# Copilot agent instructions for this repository

Purpose: give AI agents the minimum, actionable context to be productive in this repo.

Quick facts
- **Repo path:** `/` (root). Use `README.md` for high-level notes — currently empty.
- **Primary language / build:** NOT SPECIFIED — ask the user and prefer to infer from files before making changes.

What to look for (high-value files)
- `README.md`: the single existing file; currently empty. If you make build or run assumptions, confirm with the maintainer.
- `.github/`: write or update CI / workflow files here if needed.

Repository patterns and expectations
- Keep changes minimal and focused: avoid wide refactors without explicit approval from the maintainer.
- When adding new runnable code, include a minimal README and a simple run/test command.

When you don't know the language/build/test commands
- Stop and ask the maintainer. Provide a short list of plausible guesses derived from files you see (e.g., `package.json`, `pyproject.toml`, `go.mod`) and propose a single safe default change (documentation only) until confirmed.

Examples and actionable templates
- If adding a new script, include a one-line example in `README.md`, e.g.:

  ```
  # Example run (replace with actual command)
  <replace-with-run-command>
  ```

- If creating CI workflows, place them under `.github/workflows/` and keep them minimal:

  - checkout
  - install dependencies (only if manifest detected)
  - run a single test command (if present)

Safety shortcuts for AI changes
- Don't modify files outside a clearly scoped change set in a single PR.
- When in doubt, create or update documentation (`README.md` or files in `.github/`) rather than changing code.

What this agent couldn't discover
- Build and test commands: none found. File to update with this info: `README.md`.
- Language/runtime: none detected. Add `LANGUAGE:` and `BUILD:` sections to `README.md` for future agents.

Checklist for PRs an AI generates
- Include a short `CHANGELOG` entry in the PR description summarizing intent.
- Include how to run and verify the change (commands added to `README.md`).
- Keep the change focused: 1 feature or bugfix per PR.

If you are the human reviewer
- Confirm the primary language, build, and test commands and paste them into `README.md`.
- Tell the AI any non-obvious code ownership, CI tokens, or deployment steps before approving automated edits.

Contact the maintainer for missing details before modifying code.
