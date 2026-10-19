# Portfolio: working rules

React + Vite, CSS modules. The old repo (`../Portfolio`) is read-only reference. Vercel deploys `main`.

## Process
- Give a plan first for any change touching more than 2 files.
- Ask before adding a dependency or a font.
- Never invent copy or facts; leave anything unconfirmed out.
- No em dashes in copy or UI text.
- Delete replaced code; no dead code or unused tokens.
- End each task with a report, then build, lint, commit and push `main`, and confirm the Vercel production deployment.

## Code
- Use tokens (`src/styles/tokens.css`), not hardcoded values.
- Animate only `transform` and `opacity`; use IntersectionObserver for scroll reveals.
- Breakpoints: mobile ≤640, tablet 641 to 1024, desktop ≥1025.
- Verify at 1280×650, 1440×900, 1920×1080, 2560×1440, tablet and mobile, in both reading modes.

## Case study layout
- One column, `--article-col-w` (clamp 620px, 50vw, 760px).
- One left edge: every text element in the column sits on the column's left edge (hero, eyebrows, headings, body, highlight lines, notes, findings, end buttons).
- Cards and frames: illustrations and visuals stay centred in their area; card text (eyebrow, title, body) and frame eyebrows and captions are left-aligned, with the card's inner padding.
- Body text is left-aligned, ragged right, never justified or hyphenated. The About page stays justified.
- Type comes only from the `--type-*` scale in `tokens.css` (title, h2, highlight, h3, body, small, label). Diagrams inside frames may size their own labels.
- Spacing comes only from parent gaps (`--space-2xs`, `--space-sm`, `--space-md`, `--space-section`); components have no outer margins.
- The rail (back button and section index) sits at the top-left, level with the content's first line, and stays sticky; the lamp hangs at the top-right on the same line.
