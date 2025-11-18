# VATO Multi-Theme Prototype

A high-fidelity interactive prototype showcasing three distinct AI assistant personalities through dynamic theming.

## 🎨 Three Theme Personalities

### 1. Clean Intelligence
- **Aesthetic**: Professional, trustworthy, precise
- **Colors**: Cool blue primary, slate gray secondary, emerald accents
- **Typography**: Inter + SF Mono
- **Best for**: Business users, research, analytical work

### 2. Warm Companion
- **Aesthetic**: Friendly, approachable, comfortable
- **Colors**: Soft purple primary, coral secondary, teal accents
- **Typography**: Circular + Source Serif (larger sizes, warmer feel)
- **Best for**: General consumers, creative work, emotional support

### 3. Dark Intelligence
- **Aesthetic**: Technical, powerful, focused
- **Colors**: Electric blue on black, violet secondary, neon cyan accents
- **Typography**: JetBrains Mono + IBM Plex Sans
- **Best for**: Developers, power users, night sessions

## 🌊 Ethereal Animated Backgrounds

Each theme features subtle, mesmerizing background animations that enhance the personality:

### Clean Intelligence
- **Effect**: Geometric particles floating upward with rotating motion
- **Elements**: Small squares, subtle grid pattern, linear movements
- **Feel**: Precise, orderly, professional

### Warm Companion  
- **Effect**: Organic blob shapes with gentle pulsing and flowing motion
- **Elements**: Soft circles with blur effects, warm color gradients
- **Feel**: Comforting, natural, friendly

### Dark Intelligence
- **Effect**: Slow-moving cyberpunk matrix with elegant depth layers
- **Elements**: Large circuit boards, data streams, energy cores, scanning lines
- **Feel**: Sophisticated, mysterious, professional tech aesthetic
- **Timing**: Deliberately slow (12-25s cycles) for contemplative focus

## ✨ Features Demonstrated

- **🎯 Real-time Theme Switching**: Instant transitions between all three themes
- **💬 Interactive Chat Interface**: Full conversational experience with citations
- **📑 Citation System**: Inline citations with source previews (document, web, memory)
- **📱 Responsive Design**: Optimized for desktop and mobile
- **🎭 Theme-Aware Components**: All UI components adapt to theme context
- **⚡ Smooth Animations**: Framer Motion powered transitions
- **🌊 Ethereal Animated Backgrounds**: Unique moving animations for each theme
- **♿ Accessibility**: Respects `prefers-reduced-motion` for users with motion sensitivities
- **🏗️ Modular Architecture**: Highly reusable component system

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## 📱 Navigation

- **Main Chat**: `/` - Full chat interface with theme switching
- **Demo Showcase**: `/demo` - Side-by-side theme comparison

## 🏗️ Architecture

### Theme System
- **Dynamic CSS Custom Properties**: Real-time theme switching
- **Design Tokens**: Centralized theme configuration
- **Theme Provider**: React Context for global theme state
- **Persistent Storage**: Remembers user's theme preference

### Component Library
- **Button**: Theme-aware variants (default, secondary, ghost, outline)
- **Message**: Chat bubbles with citation support
- **ChatInput**: Auto-resizing input with file/voice buttons
- **ThemeSwitcher**: Multiple variants (dropdown, tabs, cards)

### Styling Approach
- **Tailwind CSS**: Utility-first styling
- **CSS Custom Properties**: Dynamic theming
- **Class Variance Authority**: Type-safe component variants
- **Framer Motion**: Smooth animations and transitions

## 🎯 Phase 1 MVP Scope

This prototype focuses on the core Phase 1 features:
- ✅ Basic chat interface
- ✅ Theme system with real-time switching
- ✅ Citation display system
- ✅ Responsive design
- ✅ Component reusability

**Future Phases** (not in this prototype):
- Document upload & RAG integration
- Persistent memory system
- Multi-agent orchestration
- Session management
- Voice input/output

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Component Variants**: Class Variance Authority
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main chat interface
│   └── demo/page.tsx      # Theme showcase demo
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx     # Theme-aware button
│   │   ├── message.tsx    # Chat message bubbles
│   │   ├── input.tsx      # Auto-resizing chat input
│   │   └── theme-switcher.tsx # Theme selection component
│   └── chat/
│       └── chat-interface.tsx # Main chat layout
├── contexts/
│   └── theme-context.tsx  # Theme provider & state
├── lib/
│   ├── themes.ts          # Theme definitions & tokens
│   └── utils.ts           # Utility functions
```

## 🎨 Design Principles

1. **Extreme Modularity**: Every component is theme-aware and reusable
2. **Smooth Transitions**: All theme changes animate smoothly
3. **Type Safety**: Full TypeScript coverage with proper typing
4. **Performance**: Optimized rendering and minimal re-renders
5. **Accessibility**: Focus states and semantic HTML
6. **Mobile-First**: Responsive design from the ground up

## 🚧 Development Notes

- Theme switching uses CSS custom properties for instant updates
- Components use compound patterns for maximum flexibility  
- All animations respect user's motion preferences
- Theme persistence uses localStorage
- Fully typed with TypeScript for better DX

---

**Built for the VATO AI Assistant Project** - Demonstrating next-generation AI interaction design with adaptive personalities.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
