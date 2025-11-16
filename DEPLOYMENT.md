# Deployment Guide for GitHub Pages

## Your site is ready! Here's how to deploy it to defrein.github.io

### Method 1: Manual Deployment (Recommended for first time)

1. **Build the project** (already done!):
   ```bash
   cd portfolio
   npm run build
   ```
   This creates a `build` folder with all static files (including index.html)

2. **Copy build files to root**:
   - Copy everything from `portfolio/build/*` to the root of your repository
   - Make sure `index.html` is at the root level (not in a subfolder)

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Deploy portfolio to GitHub Pages"
   git push origin main
   ```

4. **Your site will be live at**: https://defrein.github.io

### Method 2: Using GitHub Actions (Automated)

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

jobs:
  build_site:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd portfolio
          npm ci

      - name: Build
        run: |
          cd portfolio
          npm run build

      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'portfolio/build/'

  deploy:
    needs: build_site
    runs-on: ubuntu-latest

    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

Then in GitHub repository settings:
- Go to Settings > Pages
- Source: GitHub Actions
- Push your code and it will auto-deploy!

### Important Notes:

- The `build` folder contains:
  - `index.html` (main entry point)
  - `_app/` folder (all JS, CSS, and assets)
  - All prerendered pages

- Your portfolio will be accessible at: **https://defrein.github.io**

- Every time you make changes:
  ```bash
  cd portfolio
  npm run build
  # Copy build/* to root
  git add .
  git commit -m "Update portfolio"
  git push
  ```

### File Structure After Deployment:
```
defrein.github.io/
├── index.html          (from portfolio/build/)
├── _app/              (from portfolio/build/_app/)
├── .nojekyll          (important: tells GitHub to serve all files)
└── ... other build files
```

### Quick Commands:

```bash
# Development
cd portfolio
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Your site is now production-ready! 🎉
