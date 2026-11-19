# Cyrus de Sosa · Portfolio

Live: https://cyrusssdesosaa-png.github.io/

Static site (plain HTML/CSS/JS, no build step) served by GitHub Pages from `main` / root.

## Structure
- `index.html` – all content (hero, about, experience, projects, skills, education, contact)
- `assets/css/style.css`, `assets/js/main.js` – styles, galleries, lightbox, animations
- `assets/projects/manifest.js` – **image list for every project (edit this)**
- `assets/projects/<slug>/` – project images (`1.webp`, `2.webp`, …; `thumb/` = smaller card versions)

## Adding screenshots to a project
These projects have no screenshots yet and show a designed cover until images are added:

| Project | Folder |
|---|---|
| AR Campus Navigation System | `assets/projects/ar-campus-navigation/` |
| Unity Mini-Games | `assets/projects/unity-mini-games/` |
| Project-P: Pac-Man Reimagined | `assets/projects/project-p/` |
| Story Game | `assets/projects/story-game/` |

1. Save images as **WebP** named exactly `1.webp`, `2.webp`, `3.webp` … (no gaps, up to 12).
   Convert with e.g. `cwebp -q 80 shot.png -o 1.webp`, or squoosh.app. Keep them ≤1600px wide.
2. Put them in the project's folder and push. They appear automatically (the first one is the card cover).
3. Optional captions: in `assets/projects/manifest.js`, fill `autoCaptions`, e.g.
   `"project-p": { auto: true, autoCaptions: ["Main menu", "Boss fight"] }` (index 0 = `1.webp`).

For projects with an explicit `images` list (and `thumbs: true`), add the file to the folder,
a smaller copy to `thumb/`, and an entry to the list.

## Image sources
- Wally Wombats website & Rehab Directives: screenshots of the live sites (wallywombats.com, rehabdirectives.com), Nov 2026.
- Wally Wombats games: official Google Play store screenshots, © Wally Wombats LLC.

Privacy: no phone number, home address or resume PDF is published here.
