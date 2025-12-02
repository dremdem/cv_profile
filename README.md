# CV Profile - Matrix × 8-Bit Portfolio

A personal portfolio landing page combining Matrix movie aesthetics with 8-bit gaming style, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Features

- **Matrix Theme**: Digital rain background effects and green terminal aesthetics
- **8-Bit Retro Style**: Pixel art elements and retro gaming UI components
- **Modern Tech Stack**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Mobile-first approach with full desktop experience
- **Custom Animations**: Smooth transitions and interactive effects
- **Accessibility**: WCAG 2.1 Level AA compliance with reduced motion support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dremdem/cv_profile.git
cd cv_profile
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
cv_profile/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Hero/               # Hero section components
│   ├── About/              # About section components
│   ├── Skills/             # Skills section components
│   ├── Experience/         # Experience section components
│   ├── Contact/            # Contact section components
│   ├── Hobbies/            # Hobbies section components
│   └── shared/             # Shared/reusable components
├── lib/                    # Utilities and data
│   ├── data/              # Data files (personal info, skills, etc.)
│   └── utils/             # Utility functions
├── public/                # Static assets
│   ├── images/           # Images and profile photos
│   ├── sounds/           # Optional sound effects
│   └── fonts/            # Custom fonts (if needed)
├── styles/               # Additional CSS files
│   ├── matrix.css       # Matrix-specific effects
│   ├── retro.css        # 8-bit retro styles
│   └── animations.css   # Custom animations
└── LANDING_PAGE_PLAN.md # Full design and implementation plan
```

## 🎨 Design System

### Color Palette

```css
/* Matrix Colors */
--matrix-green: #00FF41
--matrix-green-dark: #008F11
--matrix-dark: #0D0208
--matrix-cyan: #00D9FF

/* Pixel Colors */
--pixel-red: #FF0040
--pixel-gray: #1A1A1A

/* Text */
--ghost-white: #F8F8FF
```

### Typography

- **Headings**: Press Start 2P (8-bit style)
- **Terminal Text**: VT323 (retro terminal)
- **Body/Code**: Fira Code (monospace)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Effects**: react-type-animation, react-intersection-observer

## 📋 Development Phases

- ✅ **Phase 1**: Setup & Foundation (Complete)
  - Next.js project initialization
  - Tailwind CSS configuration
  - Project structure setup
  - Base styles and design tokens

- ⏳ **Phase 2**: Core Components (Next)
  - Hero section with Matrix rain
  - About section
  - Skills section

- ⏳ **Phase 3**: Content Sections
  - Experience section
  - Contact section
  - Hobbies section

- ⏳ **Phase 4**: Polish & Animations
  - Scroll animations
  - Micro-interactions
  - Performance optimization

- ⏳ **Phase 5**: Optimization & Deploy
  - Final testing
  - SEO optimization
  - Production deployment

## 📝 Customization

To customize the portfolio with your own information:

1. Update personal data in `lib/data/personal-info.ts`
2. Add your skills in `lib/data/skills.ts`
3. Add work experience in `lib/data/experience.ts`
4. Add hobbies in `lib/data/hobbies.ts`
5. Replace profile photo in `public/images/`

## 🌐 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dremdem/cv_profile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Easter Eggs

Stay tuned for hidden features and retro gaming references!

---

**Status**: Phase 1 Complete ✅
**Last Updated**: 2025-12-02
**Version**: 0.1.0
