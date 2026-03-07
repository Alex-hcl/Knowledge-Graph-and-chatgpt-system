# Knowledge-Graph-and-chatgpt-system

A static website that presents the research concept "Enhancing ChatGPT with Knowledge Graphs".

## Quick Start

1. Open `index.html` directly in a browser, or
2. Run a local static server (recommended):
   - Python: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

## Project Structure

- `index.html`: Main landing page and section navigation.
- `pages/steps/`: Knowledge graph construction pages.
- `pages/system/`: System design and development pages.
- `pages/evaluation/`: Evaluation plan pages.
- `pages/demos/`: Interactive demo and graph pages.
- `news-detail.html`: Template/news detail page.

## Compatibility Redirects

Legacy and old semantic filenames are kept at project root as lightweight redirect pages, so historical links remain valid.

## Shared Assets

- `css/chat-kg-demo.css`: Shared styles for chat + graph demo pages.
- `js/chat-kg-demo.js`: Shared interaction logic for chat + graph demos.
- `js/echarts-graph-page.js`: Shared ECharts page bootstrap for JSON graph pages.

## Data Files

- `data/les.json`: Les Miserables graph data.
- `data/les2.json`: NPM dependency graph data.

## Maintenance Notes

- Keep page content in HTML, but avoid inline JS/CSS when possible.
- Reuse shared files in `js/` and `css/` before adding new page-local code.
- If renaming an existing page, keep a redirect page to preserve old links.
