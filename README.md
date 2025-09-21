# Test — Snake Game

This repository contains a simple JavaScript Snake game implemented with plain HTML/CSS/JS.

Files added:
- `index.html` — game page
- `style.css` — styles
- `script.js` — game logic

Run locally:

1. Open `index.html` in a browser (double-click or use browser "Open File").
2. Or run a simple HTTP server (recommended) from the repo root:

```powershell
# using Python 3
python -m http.server 8000; Start-Process http://localhost:8000

# using PowerShell Core / .NET (if available)
# dotnet tool or other servers also work. Replace with your preferred local server.
```

Controls:
- Arrow keys or WASD to move
- Space to pause/resume
- Click "Restart" to start a new game

New features:
- Settings: change grid size (15/20/30), wall behavior (wrap or solid), and base speed.
- Mobile: on-screen controls and swipe support for touch devices.
- Sound: simple beep effects (toggleable).
- High score: saved to `localStorage` and shown in the UI.
- GitHub Pages: a workflow (`.github/workflows/gh-pages.yml`) will deploy the repo root as a static site when pushed to `main`.

To enable GitHub Pages deployment:

1. Ensure the repository is pushed to GitHub and the branch `main` is the default branch.
2. The included workflow uses `peaceiris/actions-gh-pages` to publish the repository root. No build step is required because this is a static site.

