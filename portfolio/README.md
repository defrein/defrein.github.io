# Wahni Adnani — Portfolio v4

This folder preserves the previous SvelteKit portfolio as **Portfolio v4**. The locally verified combined publication layout places it at **https://defrein.github.io/portfolio/** and Wave at the homepage; these public paths take effect after deployment succeeds. Source stays in this folder; the repository's root build combines both applications into one deployment. See the [root README](../README.md) and [deployment guide](../docs/deployment.md).

A modern, professional portfolio website built with SvelteKit and TailwindCSS, showcasing my experience as an AI Engineer and Software Engineer specializing in ML, NLP, Computer Vision, and Robotics.

## 🚀 Features

- **Modern Dark Theme** - Futuristic dark mode design with glassmorphism effects
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations** - Scroll-triggered animations and micro-interactions
- **Interactive Navigation** - Sticky header with active section indicators
- **Project Showcase** - Filterable project gallery with category filters
- **Timeline Experience** - Vertical timeline displaying work history
- **Contact Form** - Interactive contact form with validation
- **SEO Optimized** - Meta tags and semantic HTML for better search engine visibility
- **Static Site** - Pre-rendered for fast loading times

## 🛠️ Tech Stack

- **Framework:** SvelteKit 2.0
- **Styling:** TailwindCSS 3.4
- **Icons:** Lucide Svelte
- **Fonts:** Space Grotesk, Inter, JetBrains Mono (Google Fonts)
- **Deployment:** Static adapter for various hosting platforms

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173/portfolio/`.

### Building for Production

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

The built files will be in the `build` directory, ready for deployment.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Nav.svelte           # Navigation bar
│   │   │   ├── Hero.svelte          # Hero section with animations
│   │   │   ├── About.svelte         # About me section
│   │   │   ├── Experience.svelte    # Work experience timeline
│   │   │   ├── Projects.svelte      # Project showcase
│   │   │   ├── Skills.svelte        # Skills & technologies
│   │   │   ├── Education.svelte     # Education background
│   │   │   ├── Contact.svelte       # Contact form
│   │   │   └── Footer.svelte        # Footer component
│   │   └── data/
│   │       └── resume.js            # Resume data (easy to update)
│   ├── routes/
│   │   ├── +layout.svelte           # Root layout
│   │   └── +page.svelte             # Main page
│   └── app.css                      # Global styles
├── static/                          # Static assets
├── svelte.config.js                 # SvelteKit configuration
├── tailwind.config.js               # Tailwind configuration
└── package.json
```

## 🎨 Customization

### Updating Content

All portfolio content is centralized in `src/lib/data/resume.js`. Update this file to modify:
- Personal information
- Work experience
- Projects
- Skills
- Education
- Contact details

### Color Scheme

Modify the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: '#0F172A',      // Dark Slate
  secondary: '#3B82F6',    // Blue
  accent: '#10B981',       // Green
  highlight: '#8B5CF6',    // Purple
  background: '#020617',   // Near Black
  surface: '#1E293B',      // Card backgrounds
  text: '#F1F5F9',         // Off White
  'text-muted': '#94A3B8', // Muted text
  border: '#334155'        // Borders
}
```

## 🚢 Deployment

### GitHub Pages / Vercel / Netlify

Simply connect your repository to your hosting platform. The build command is `npm run build` and the output directory is `build`.

### Custom Server

Upload the contents of the `build` directory to your web server.

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
- **Wide:** > 1536px

## ⚡ Performance

- Lighthouse Score: 90+
- Fully static, pre-rendered pages
- Optimized fonts
- Minimal JavaScript bundle
- CSS purging with TailwindCSS

## 📧 Contact

**Wahni Adnani**
- Email: adnaniwahni@gmail.com
- LinkedIn: [linkedin.com/in/wahni-adnani](https://linkedin.com/in/wahni-adnani)
- GitHub: [github.com/defrein](https://github.com/defrein)
- Location: Banjarmasin, Indonesia

---

Built with ❤️ using SvelteKit and TailwindCSS

