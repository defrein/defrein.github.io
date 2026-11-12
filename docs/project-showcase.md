# Project showcase captures

Five projects added to the current Wave portfolio in November 2026. Portfolio v4 remains an archive.

## Sources inspected

- ENEXRE: `defrein/enexre`, `204b5bde982a1207ef806933857f3cf8a49ec672`.
- Plant Shop Management: `defrein/management-plant-shop`, branch `redesign-and-catalog-photo`, `aadff1b` (latest inspected commit, 12 November 2026; “Redesign public pages and add catalog plant photos”). Private source is not linked from the public project page.
- Better JATS Viewer: `openjournalteam/jats-viewer`, `2f6c1482ed5b7ee70e6390dc8e90561a9af8e2c7`.
- JATS Scholar: `openjournalteam/jats-scholar`, `73f042804d0f3c1a2e00ee1297da8a75d1e9f328`; screenshots from the public site, https://scholar.jatseditor.com. The public deployment's commit was not independently verified.
- Journal Metadata Extractor: `defrein/metadata_extractor`, `9c801283b6aa5574bb23cb3e7f44b5d7d172a8f9`.

## Capture notes

Captures are actual browser screenshots at 1440 × 900, encoded as WebP quality 90 in `wave/public/images/projects/showcase/`. Each project includes two images with alt text and captions. Screenshots receive a subtle shadow on the portfolio's existing purple/cyan frames.

- ENEXRE uses the local Flask application, included graph CSVs, and built-in mixed-case abstract examples. The second image shows the case library. The interactive demonstration uses the prototype's matching logic, not live PubMedBERT inference. At inspection, the supplied public domain showed an Apache default page over HTTP and failed certificate validation over HTTPS, so it was not used for screenshots.
- Plant Shop uses an isolated local MariaDB database and the repository seeders, including synthetic customer and transaction data. The local capture configuration disables MySQL strict mode because the top-selling widget groups `plants.*` by `plants.id`, which MariaDB rejects under ONLY_FULL_GROUP_BY. This capture-only configuration change is not included in the portfolio repository or pushed to the Plant Shop repository. Screenshots show the actual dashboard and inventory; no production records are used.
- Better JATS Viewer uses the bundled `jats_files/data.xml` demonstration article. The second capture opens the reference panel. The app was built locally with Gulp/esbuild and Tailwind.
- JATS Scholar shows the public homepage and publications catalog. The project description distinguishes available features from the repository's documented backlog.
- Metadata Extractor runs locally with Flask and PyMuPDF. The results image comes from uploading a synthetic PDF headed “Connecting Scientific Documents with Structured Metadata,” using example authors and the deliberately synthetic identifier `10.0000/demo.2026.001`. The optional trained CRF and spaCy models are absent, so the app uses its documented heuristic fallback. Source and result records stay outside the portfolio repository.

## Selection

Metadata Extractor was selected from the additional Defrein repositories because it demonstrates a distinct document-processing workflow with a verifiable web interface. Forks, small learning exercises, and repositories without a checked presentation were not added.

## Validation

The combined site build and four root route/asset tests passed. Astro and Svelte checks reported zero errors and warnings. A dedicated browser pass at 1440px and 390px verified the 12-project gallery, pagination, robotics filter, all five new routes, all ten images, both slider images, Home-key navigation, and the absence of horizontal overflow, browser errors, or failed local HTTP responses. Review screenshots and the detailed browser report are stored in this BB thread's `showcase-review` artifacts.
