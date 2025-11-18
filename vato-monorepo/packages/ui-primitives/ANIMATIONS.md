# VATO Animation Library

> Purposeful, organic motion that enhances understanding

## 🎬 Animation Principles

1. **Reduce Cognitive Load** - Animations should clarify, not distract
2. **Reveal Relationships** - Motion shows how elements connect
3. **60fps Minimum** - Smooth, performant animations
4. **Respect Preferences** - Honor prefers-reduced-motion
5. **GPU-Accelerated** - Use transform and opacity only

---

## ⏱️ Duration Presets

```typescript
duration: {
  instant: 0,      // No animation
  fast: 150,       // Micro-interactions, hover states
  base: 200,       // Default transitions
  moderate: 300,   // Drawers, modals
  slow: 500,       // Page transitions
  slower: 800,     // Data visualizations
}
```

---

## 📐 Easing Functions

### Standard
```typescript
linear
ease
easeIn
easeOut
easeInOut
```

### Custom (Organic)
```typescript
smooth       // Default for most - cubic-bezier(0.4, 0.0, 0.2, 1)
snappy       // Quick responses - cubic-bezier(0.4, 0.0, 1, 1)
gentle       // Smooth, natural - cubic-bezier(0.25, 0.1, 0.25, 1)
bounce       // Playful - cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Specialized
```typescript
spring       // Spring-like - cubic-bezier(0.34, 1.56, 0.64, 1)
decelerate   // Natural decel - cubic-bezier(0.0, 0.0, 0.2, 1)
accelerate   // Natural accel - cubic-bezier(0.4, 0.0, 1, 1)
```

---

## 🎭 Keyframe Animations

### Fade
- **fadeIn** - Opacity 0 → 1
- **fadeOut** - Opacity 1 → 0

### Slide
- **slideUp** - From bottom with fade
- **slideDown** - From top with fade
- **slideInLeft** - From left side
- **slideInRight** - From right side

### Scale
- **scaleIn** - Scale 0.95 → 1 with fade
- **scaleOut** - Scale 1 → 0.95 with fade
- **bounceIn** - Playful entrance with overshoot

### Loading
- **pulse** - Opacity oscillation
- **rotate** - 360° spin
- **shimmer** - Skeleton loader effect

### Special
- **float** - Subtle hover effect
- **glow** - Pulsing shadow for emphasis
- **progressFill** - Donut chart animation

---

## 🎯 Animation Presets

### Card Animations
```typescript
// Entrance
cardEnter: 'slideUp 200ms smooth'

// Exit
cardExit: 'fadeOut 150ms smooth'
```

### Modal
```typescript
// Backdrop
modalBackdrop: 'fadeIn 300ms smooth'

// Content
modalContent: 'scaleIn 300ms gentle'
```

### Drawer (Side Panel)
```typescript
drawerEnter: 'slideInRight 300ms smooth'
```

### Toast Notification
```typescript
toastEnter: 'slideInRight 200ms smooth'
```

### Loading States
```typescript
// Pulsing
loading: 'pulse 1.5s ease infinite'

// Spinner
spinner: 'rotate 1s linear infinite'

// Skeleton
skeleton: {
  animation: 'shimmer 2s linear infinite',
  background: 'linear-gradient(90deg, #E8E4DC 25%, #F5F1E8 50%, #E8E4DC 75%)',
  backgroundSize: '200% 100%',
}
```

---

## 📊 Staggered Animations

### List Items
```typescript
// Generate delay for item at index
stagger.delay(index, baseDelay)
// Example: stagger.delay(3, 50) = 150ms

// Generate full style object
stagger.style(index, 'slideUp', 50)
// Returns:
// {
//   animation: 'slideUp 200ms smooth',
//   animationDelay: '150ms',
//   animationFillMode: 'both',
// }
```

### Usage Example
```tsx
{items.map((item, index) => (
  <Card 
    key={item.id}
    style={stagger.style(index)}
  >
    {item.content}
  </Card>
))}
```

---

## 🤚 Gesture Animations

### Touch Interactions
```typescript
gestures: {
  swipeThreshold: 50,     // pixels to trigger swipe
  
  pullToRefresh: {
    threshold: 80,        // pixels to trigger
    maxPull: 120,         // max pull distance
  },
  
  pressScale: 0.98,       // Button press feedback
  pressDuration: 150,     // Fast feedback
}
```

---

## ♿ Accessibility

### Reduced Motion Support

**Automatic Detection:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript Detection:**
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches
```

---

## ⚡ Performance

### GPU-Accelerated Properties
**Only animate these for 60fps:**
- `transform`
- `opacity`

**Avoid animating:**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Force Hardware Acceleration
```typescript
performance.accelerate: {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  perspective: '1000px',
}
```

### Will-Change Property
```typescript
// Use sparingly
performance.willChange(['transform', 'opacity'])
// Returns: { willChange: 'transform, opacity' }
```

---

## 📦 Usage Examples

### CSS
```css
/* Import keyframes */
@import url('./animations.css');

/* Use preset */
.card-enter {
  animation: slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

/* Staggered */
.card-1 { animation-delay: 0ms; }
.card-2 { animation-delay: 50ms; }
.card-3 { animation-delay: 100ms; }

/* Loading */
.spinner {
  animation: rotate 1s linear infinite;
}

/* Skeleton */
.skeleton {
  animation: shimmer 2s linear infinite;
  background: linear-gradient(90deg, #E8E4DC 25%, #F5F1E8 50%, #E8E4DC 75%);
  background-size: 200% 100%;
}
```

### React/TypeScript
```typescript
import { animations, stagger } from '@vato/ui-primitives/design-system'

// Use duration
const cardStyle = {
  transition: `all ${animations.duration.base}ms ${animations.easing.smooth}`,
}

// Use preset
const modalStyle = {
  animation: animations.presets.modalContent.animation,
}

// Staggered list
{items.map((item, index) => (
  <div style={stagger.style(index, 'slideUp', 50)}>
    {item}
  </div>
))}
```

### JavaScript
```javascript
// Trigger animation
element.style.animation = 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)'

// Remove animation
element.style.animation = 'none'

// Restart animation
element.style.animation = 'none'
element.offsetHeight // Force reflow
element.style.animation = 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)'
```

---

## 🎨 Animation Showcase

**See animations in action:**
1. Open `design-system-demo.html`
2. Scroll to "Animation Library" section
3. Click "Animate Cards" to see staggered entrance
4. Observe loading states, special effects

**Features demonstrated:**
- ✨ Staggered card entrance
- 🔄 Loading spinners
- 💫 Skeleton loaders
- 🌊 Float animation
- ✨ Glow effect
- 📊 Donut chart progress

---

## 🚀 Best Practices

### Do ✅
- Use animations to **clarify relationships**
- Keep durations **under 500ms** for UI elements
- Use **transform and opacity** for smooth 60fps
- **Stagger** list items for better perception
- **Test with reduced-motion** enabled
- Use **easeOut** for most transitions

### Don't ❌
- Don't animate layout properties (width, height, top, left)
- Don't use durations over 800ms (feels sluggish)
- Don't animate on every interaction (overwhelming)
- Don't ignore accessibility preferences
- Don't use animations just for decoration

---

## 📚 Resources

- **Demo:** `design-system-demo.html`
- **Source:** `src/design-system/animations.ts`
- **Performance Guide:** [web.dev/animations](https://web.dev/animations/)
- **Reduced Motion:** [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Status:** ✅ Ready for Implementation
