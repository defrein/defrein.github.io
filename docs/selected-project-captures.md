# Selected Defrein projects

The five additions follow the user's explicit selection: VIDEF, Laravel Social App, DeffRenn, Laravel Blog, and the native PHP School Administration app. Descriptive portfolio titles distinguish their workflows. Existing projects remain published; the gallery now contains 17 projects.

## Inspected revisions

- VIDEF: `defrein/videf-object-detection-and-voice-recognition-robot`, `c2aa85a84c9282a81a834ba603c15e8f7c244fc5`.
- Social Feed: `defrein/laravel-app-sosmed`, `72e3cb55719f08787ae2bd9f9e33f75d1ac00ed3`.
- DeffRenn: `defrein/DeffRenn`, `893e991e8a9922638936b270a76227eac8cdc9fa` (private).
- Laravel Blog: `defrein/laravel-blog`, `79c15705f130e716199d9e868f5d05c4fdb4bb4e`.
- School Administration: `defrein/administrasi-sekolah`, `ad14a94a84c7bcf737bf7da5effbf408893bb2d8`.

## Images and capture setup

Each project has two WebP images with descriptive alt text and captions. App screenshots are actual browser captures at 1440 × 1000, encoded at WebP quality 90. Robot photographs retain their source dimensions and use quality 92.

- VIDEF uses the user-specified `v.3/assets/img/activity/robot_pln.jpg` (1600 × 900) and the existing `v.3/assets/img/project/project_robot_pln_2.jpg` (500 × 281). The robot was not physically rerun; the description is based on its code and original photographs.
- Social Feed runs locally with fictional users, posts, comments, likes and follow relationships. Captures show the signed-in home feed and profile. Its service provider queries users and ideas during application boot, so a temporary schema-existence guard was used only to initialize the empty demo database, then the original provider was restored.
- DeffRenn runs locally with the repository's seed users and articles. Captures show its dark public homepage and Filament admin dashboard. The framework version is Laravel 12 according to composer.json/lock, despite the README's older Laravel 11 badge.
- Laravel Blog runs locally with six fictional articles and categories. Category colors are set to supported values in the demo data. The source badge template contains a misspelled fallback match arm (`deafult`); the capture uses valid existing color options and does not change that template. Captures show the listing and article detail. No claim is made that all source-app edge cases were tested.
- Article covers are original decorative SVG illustrations created as local sample content for both blog demos. They are not fabricated application interfaces. Their rendered appearance is captured inside the real application screenshots.
- School Administration uses schema-only CREATE/ALTER statements from the repository SQL dump, populated with fictional students, teachers, schedules, tuition records and one demo account. No original school records were imported. Its local database connection was redirected to the isolated database, and PHP session.save_path points to temporary writable storage. Captures show the student table and main menu.

All runtime configuration, demo databases, example article assets, and initialization scripts stay outside the portfolio repository. No changes are pushed to the five source repositories. Only the portfolio content, images, gallery regression expectations and this provenance document are committed.
