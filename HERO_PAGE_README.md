# AI Governance DPSEC API - Hero Landing Page 🚀

A professional, high-quality hero landing page built with **Astro**, **React**, **HeroUI**, and **Tailwind CSS v4** to showcase the SpecIT AI Governance DPSEC API platform.

## ✨ Features

### Technology Stack
- **Astro 5.16+**: Fast, modern web framework with islands architecture
- **React 19**: UI components with interactive elements
- **HeroUI**: Beautiful, accessible component library
- **Tailwind CSS v4**: Latest utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Bun**: Fast JavaScript runtime and package manager
- **Turborepo**: Monorepo build system

### Design Features
- 🎨 **Modern Glass Morphism**: Gradient borders, backdrop blur effects
- 🌊 **Smooth Animations**: Framer Motion entrance and hover animations
- 📱 **Fully Responsive**: Mobile-first design, works on all devices
- 🌙 **Dark Mode Support**: Built-in dark theme
- ⚡ **Performance Optimized**: Astro islands for efficient hydration
- 🎯 **Professional Layout**: Hero, stats, features, CTA, and footer sections

## 🏗️ Project Structure

```
astro-docs/apps/web/
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx       # Main hero section with CTA
│   │   ├── StatsSection.tsx      # Key metrics display
│   │   ├── FeaturesSection.tsx   # 8 detailed feature cards
│   │   ├── CTASection.tsx        # Call-to-action section
│   │   └── Footer.tsx            # Footer with links
│   ├── pages/
│   │   ├── index.astro           # Landing page
│   │   └── hero.astro            # Hero page
│   ├── layouts/
│   │   └── Layout.astro          # Base layout
│   └── styles/
│       └── global.css            # Global styles + Tailwind
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed (v1.0+)

### Installation

From the root of the monorepo:

```bash
# Install all dependencies
cd astro-docs
bun install
```

### Development

```bash
# Start the development server
cd apps/web
bun run dev
```

The site will be available at `http://localhost:4321`

Access the hero page at: **`http://localhost:4321/hero`**

### Build for Production

```bash
# From apps/web directory
bun run build

# Preview production build
bun run preview
```

## 🎨 Customization

### Colors

Edit the Tailwind theme in [src/styles/global.css](src/styles/global.css):

```css
@theme {
  --color-primary-500: #006fff;
  --color-secondary-500: #0ea5e9;
  /* Add more custom colors */
}
```

### Content

Update component content:
- **Hero Section**: [src/components/HeroSection.tsx](src/components/HeroSection.tsx)
- **Features**: [src/components/FeaturesSection.tsx](src/components/FeaturesSection.tsx)
- **Stats**: [src/components/StatsSection.tsx](src/components/StatsSection.tsx)
- **CTA**: [src/components/CTASection.tsx](src/components/CTASection.tsx)
- **Footer**: [src/components/Footer.tsx](src/components/Footer.tsx)

### Adding New Pages

Create new `.astro` files in `src/pages/`:

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Your Page Title">
  <div>Your content here</div>
</Layout>
```

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "@astrojs/react": "^4.4.2",
    "@heroui/react": "^2.8.7",
    "@heroui/theme": "^2.4.25",
    "framer-motion": "^12.29.0",
    "react": "^19.2.3",
    "astro": "^5.16.11"
  }
}
```

## 🎯 Features Showcase

The hero page showcases 8 key AI Governance features:

1. **PII Detection & Masking** - Detect 12+ PII types
2. **Secrets Scanning** - Find hardcoded credentials
3. **Multi-Language Translation** - 100+ languages with PII protection
4. **Model Garden** - Multi-model AI execution
5. **Consistency Testing** - Validate AI reliability
6. **Relevance Checking** - Semantic analysis
7. **Data Validation** - Schema & compliance checks
8. **Intelligent Caching** - Redis-based optimization

## 🎨 Design System

### Components Used
- **HeroUI Chip**: For badges and tags
- **HeroUI Card**: For feature cards
- **HeroUI Button**: For CTAs
- **Framer Motion**: For animations

### Custom Utilities
```css
.text-gradient       /* Gradient text effect */
.gradient-border     /* Gradient border effect */
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance

- **Astro Islands**: Only hydrate interactive components
- **Client Directives**: 
  - `client:load` - Immediate hydration
  - `client:visible` - Lazy load when visible
- **Optimized Images**: Modern formats with lazy loading

## 🔗 Navigation

- `/` - Main landing page with API status
- `/hero` - Full hero landing page
- `/docs` - Documentation (to be implemented)
- `/api` - API reference (to be implemented)

## 🛠️ Development Commands

```bash
# From apps/web directory
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
bun run astro    # Run Astro CLI commands
```

## 📄 License

This is part of the SpecIT AI Governance DPSEC API project.

## 🤝 Contributing

For issues and feature requests, please create an issue in the repository.

---

**Built with ❤️ using Astro, React, HeroUI, and Tailwind CSS v4**
