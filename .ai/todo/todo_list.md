# Refactoring Todo List

Here is the list of refactoring tasks identified for the `site31246` project:

## UI/UX & Code Quality Fixes
- [x] **Fix `tmp.js` runtime error**: Added a check to proceed with tab initialization only if the `.tabs` selector finds an element, eliminating runtime TypeError.
- [x] **Throttle Scroll Event Listeners**: Refactored scroll handler to throttle state updates using `requestAnimationFrame`, and stored timeouts in a local closure instead of polluting the global `window` object.
- [x] **Refactor Script References**: Added `defer` to script tags where appropriate, removed the duplicate `jsPDF` CDN script tag, and completely eliminated the jQuery CDN reference.
- [x] **Remove jQuery Dependency**: Rewrote the inline jQuery event listeners and Chart.js selectors at the bottom of `tmp.html` to modern Vanilla HTML5 APIs (`DOMContentLoaded`, `bootstrap.Tab.getOrCreateInstance`, `getElementById`).
- [x] **Clean up Inline Styles in HTML**: Moved nested `<style>` tags from the navbar list and card containers in `tmp.html` into `tmp1.css`, utilizing clean `.canva-container-small` and `.canva-container-large` class definitions.
- [x] **Fix Syntax & Duplicate ID Issues**: Fixed mismatched button closing tags (`<button>...</a >` -> `<button>...</button>`), prefixed navbar IDs with `nav-` to ensure uniqueness, and differentiated canvas IDs (`myLineChart` & `myLineChartLarge`).
- [x] **Convert Image Icon Assets to SVGs**: Replaced heavy external PNG files for file structure icons (folders and home) in `style.css` and `filetree.css` with inline base64/SVG DataURIs, reducing layout shift and layout dependencies.

## Frameworks & Architecture Integration Recommendations (Documented in Project Memory)
- Vite build setup
- Clean CSS modularization (moving to CSS variables / Tailwind if requested)
- Alpine.js or native Web Components for minor interactive states
