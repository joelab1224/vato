export type ThemeId = 'clean' | 'warm' | 'dark'

// Base color palette following vato-unified-design-system-light.html
const baseColors = {
  // Professional design system gray scale (for fixed components)
  professional: {
    gray50: '#f9fafb',   // Professional gray-50
    gray100: '#f3f4f6',  // Professional gray-100  
    gray200: '#e5e7eb',  // Professional gray-200
    gray300: '#d1d5db',  // Professional gray-300
    gray400: '#9ca3af',  // Professional gray-400
    gray500: '#6b7280',  // Professional gray-500
    gray600: '#4b5563',  // Professional gray-600
    gray700: '#374151',  // Professional gray-700
    gray800: '#1f2937',  // Professional gray-800
    gray900: '#111827',  // Professional gray-900
  },
  // Light theme foundation (warm backgrounds for cognitive rest)
  light: {
    50: '#fafafa',    // Ultra light gray
    100: '#f5f5f5',   // Light gray
    200: '#e5e5e5',   // Medium light gray
  },
  // Vibrant accents for energy and interaction
  violet: {
    300: '#c4b5fd',   // Light violet
    400: '#a78bfa',   // Medium violet  
    500: '#8b5cf6',   // Base violet (primary)
    600: '#7c3aed',   // Dark violet
    700: '#6d28d9',   // Darker violet
  },
  purple: {
    400: '#c084fc',   // Light purple
    500: '#a855f7',   // Base purple
    600: '#9333ea',   // Dark purple (secondary)
    700: '#7e22ce',   // Darker purple
  },
  pink: {
    400: '#f472b6',   // Light pink
    500: '#ec4899',   // Base pink (accent)
    600: '#db2777',   // Dark pink
    700: '#be185d',   // Darker pink
  },
  // Neutral text colors
  zinc: {
    50: '#fafafa',    // Almost white
    100: '#f4f4f5',   // Very light
    200: '#e4e4e7',   // Light
    300: '#d4d4d8',   // Medium light
    400: '#a1a1aa',   // Medium
    500: '#71717a',   // Medium dark
    600: '#52525b',   // Dark
    700: '#3f3f46',   // Darker
    800: '#27272a',   // Very dark
    900: '#18181b',   // Almost black
  },
  // Status colors
  status: {
    error: '#ef4444',     // Red for errors
    warning: '#f59e0b',   // Amber for warnings
    success: '#10b981',   // Emerald for success
    info: '#3b82f6',      // Blue for information
  }
}

export interface Theme {
  id: ThemeId
  name: string
  description: string
  colors: {
    // Core brand colors
    primary: string
    primaryHover: string
    primaryActive: string
    secondary: string
    secondaryHover: string
    accent: string
    accentHover: string
    
    // Background system (layered for depth)
    background: string
    backgroundElevated: string
    surface: string
    surfaceHover: string
    surfaceActive: string
    
    // Text hierarchy
    text: string
    textSecondary: string
    textTertiary: string
    textInverse: string
    
    // Interactive elements
    border: string
    borderHover: string
    borderFocus: string
    
    // Message-specific colors
    userMessage: string
    userMessageHover: string
    assistantMessage: string
    assistantMessageHover: string
    
    // Citation system
    citation: string
    citationHover: string
    citationBackground: string
    
    // Glass morphism effects
    glassBackground: string
    glassBorder: string
    glassViolet: string
    glassPurple: string
    glassPink: string
    
    // Status colors
    error: string
    warning: string
    success: string
    info: string
  }
  typography: {
    fontFamily: string
    codeFontFamily: string
    sizes: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
    }
  }
  spacing: {
    // Systematic spacing scale based on 4px foundation
    xs: string      // 4px - micro spacing
    sm: string      // 8px - small spacing
    md: string      // 12px - medium spacing
    lg: string      // 16px - large spacing
    xl: string      // 24px - extra large spacing
    '2xl': string   // 32px - 2x large spacing
    '3xl': string   // 48px - 3x large spacing
    '4xl': string   // 64px - 4x large spacing
    
    // Semantic spacing values
    containerPadding: string
    messagePadding: string
    inputPadding: string
    borderRadius: string
    borderRadiusLarge: string
    
    // Layout-specific spacing
    headerHeight: string
    bottomNavHeight: string
    floatingOffset: string
  }
  effects: {
    shadow: string
    shadowLarge: string
    transition: string
  }
}

export const themes: Record<ThemeId, Theme> = {
  clean: {
    id: 'clean',
    name: 'Clean Intelligence',
    description: 'Professional, trustworthy, precise',
    colors: {
      // Core brand colors - violet as primary following design system
      primary: baseColors.violet[500],           // #8b5cf6
      primaryHover: baseColors.violet[600],      // #7c3aed
      primaryActive: baseColors.violet[700],     // #6d28d9
      secondary: baseColors.purple[600],         // #9333ea
      secondaryHover: baseColors.purple[700],    // #7e22ce
      accent: baseColors.pink[500],              // #ec4899
      accentHover: baseColors.pink[600],         // #db2777
      
      // Background system - light with subtle warmth
      background: '#ffffff',                     // Pure white base
      backgroundElevated: baseColors.light[50],  // #fafafa
      surface: baseColors.light[50],             // #fafafa
      surfaceHover: baseColors.light[100],       // #f5f5f5
      surfaceActive: baseColors.light[200],      // #e5e5e5
      
      // Text hierarchy - charcoal instead of pure black
      text: baseColors.zinc[900],                // #18181b
      textSecondary: baseColors.zinc[600],       // #52525b
      textTertiary: baseColors.zinc[400],        // #a1a1aa
      textInverse: '#ffffff',                    // White text on dark backgrounds
      
      // Interactive elements
      border: baseColors.zinc[200],              // #e4e4e7
      borderHover: baseColors.violet[300],       // #c4b5fd
      borderFocus: baseColors.violet[500],       // #8b5cf6
      
      // Message-specific colors
      userMessage: baseColors.violet[500],       // #8b5cf6
      userMessageHover: baseColors.violet[600],  // #7c3aed
      assistantMessage: baseColors.light[50],    // #fafafa
      assistantMessageHover: baseColors.light[100], // #f5f5f5
      
      // Citation system
      citation: baseColors.violet[500],          // #8b5cf6
      citationHover: baseColors.violet[600],     // #7c3aed
      citationBackground: baseColors.violet[50] || '#f3f4ff', // Light violet background
      
      // Glass morphism effects (matching design system)
      glassBackground: 'rgba(255, 255, 255, 0.3)',
      glassBorder: 'rgba(0, 0, 0, 0.08)',
      glassViolet: 'rgba(139, 92, 246, 0.08)',
      glassPurple: 'rgba(147, 51, 234, 0.08)',
      glassPink: 'rgba(236, 72, 153, 0.08)',
      
      // Status colors
      error: baseColors.status.error,            // #ef4444
      warning: baseColors.status.warning,        // #f59e0b
      success: baseColors.status.success,        // #10b981
      info: baseColors.status.info,              // #3b82f6
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      codeFontFamily: 'SF Mono, Monaco, monospace',
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
    spacing: {
      // Systematic spacing scale (4px base unit)
      xs: '0.25rem',          // 4px
      sm: '0.5rem',           // 8px
      md: '0.75rem',          // 12px
      lg: '1rem',             // 16px
      xl: '1.5rem',           // 24px
      '2xl': '2rem',          // 32px
      '3xl': '3rem',          // 48px
      '4xl': '4rem',          // 64px
      
      // Semantic spacing values
      containerPadding: '1.5rem',
      messagePadding: '1rem 1.25rem',
      inputPadding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      borderRadiusLarge: '0.5rem',
      
      // Layout-specific spacing
      headerHeight: '3.5rem',        // 56px - header height
      bottomNavHeight: '4.5rem',     // 72px - bottom nav height
      floatingOffset: '1rem',        // 16px - gap between floating elements
    },
    effects: {
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      shadowLarge: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease-in-out',
    },
  },

  warm: {
    id: 'warm',
    name: 'Warm Companion',
    description: 'Friendly, approachable, comfortable',
    colors: {
      // Core brand colors - warm variation with purple/pink emphasis
      primary: baseColors.purple[500],           // #a855f7 (warmer than violet)
      primaryHover: baseColors.purple[600],      // #9333ea
      primaryActive: baseColors.purple[700],     // #7e22ce
      secondary: baseColors.pink[500],           // #ec4899 (warm accent)
      secondaryHover: baseColors.pink[600],      // #db2777
      accent: baseColors.violet[400],            // #a78bfa (softer violet)
      accentHover: baseColors.violet[500],       // #8b5cf6
      
      // Background system - slightly warmer tones
      background: '#fefefe',                     // Warmer white
      backgroundElevated: baseColors.light[50],  // #fafafa
      surface: 'rgba(255, 247, 237, 0.8)',      // Warm cream with transparency
      surfaceHover: 'rgba(255, 247, 237, 0.9)', // Deeper warm cream
      surfaceActive: baseColors.light[100],      // #f5f5f5
      
      // Text hierarchy - warmer grays
      text: baseColors.zinc[800],                // #27272a (softer than clean)
      textSecondary: baseColors.zinc[600],       // #52525b
      textTertiary: baseColors.zinc[400],        // #a1a1aa
      textInverse: '#ffffff',                    // White text on dark backgrounds
      
      // Interactive elements - warm borders
      border: baseColors.zinc[200],              // #e4e4e7
      borderHover: baseColors.pink[300] || '#fda4af', // Light pink hover
      borderFocus: baseColors.purple[500],       // #a855f7
      
      // Message-specific colors
      userMessage: baseColors.purple[500],       // #a855f7
      userMessageHover: baseColors.purple[600],  // #9333ea
      assistantMessage: 'rgba(255, 247, 237, 0.6)', // Warm glass effect
      assistantMessageHover: 'rgba(255, 247, 237, 0.8)', // Deeper warm glass
      
      // Citation system - pink accent for warmth
      citation: baseColors.pink[500],            // #ec4899
      citationHover: baseColors.pink[600],       // #db2777
      citationBackground: baseColors.pink[50] || '#fdf2f8', // Light pink background
      
      // Glass morphism effects - warmer tinting
      glassBackground: 'rgba(255, 247, 237, 0.3)',
      glassBorder: 'rgba(168, 85, 247, 0.1)',    // Purple tinted border
      glassViolet: 'rgba(167, 139, 250, 0.12)',
      glassPurple: 'rgba(168, 85, 247, 0.12)',
      glassPink: 'rgba(236, 72, 153, 0.12)',
      
      // Status colors - slightly warmer variants
      error: baseColors.status.error,            // #ef4444
      warning: baseColors.status.warning,        // #f59e0b
      success: baseColors.status.success,        // #10b981
      info: baseColors.violet[500],              // #8b5cf6 (brand info color)
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      codeFontFamily: 'SF Mono, Monaco, monospace',
      sizes: {
        xs: '0.8125rem',
        sm: '0.9375rem',
        base: '1.0625rem',
        lg: '1.1875rem',
        xl: '1.3125rem',
        '2xl': '1.625rem',
      },
    },
    spacing: {
      // Systematic spacing scale (4px base unit)
      xs: '0.25rem',          // 4px
      sm: '0.5rem',           // 8px
      md: '0.75rem',          // 12px
      lg: '1rem',             // 16px
      xl: '1.5rem',           // 24px
      '2xl': '2rem',          // 32px
      '3xl': '3rem',          // 48px
      '4xl': '4rem',          // 64px
      
      // Semantic spacing values (larger for warm theme)
      containerPadding: '2rem',
      messagePadding: '1.25rem 1.5rem',
      inputPadding: '1rem 1.25rem',
      borderRadius: '1rem',
      borderRadiusLarge: '1.25rem',
      
      // Layout-specific spacing
      headerHeight: '3.5rem',        // 56px - header height
      bottomNavHeight: '4.5rem',     // 72px - bottom nav height
      floatingOffset: '1.5rem',      // 24px - larger gap for warm theme
    },
    effects: {
      shadow: '0 4px 12px 0 rgba(251, 146, 60, 0.15)',
      shadowLarge: '0 8px 25px -5px rgba(139, 92, 246, 0.25)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  dark: {
    id: 'dark',
    name: 'Research Intelligence',
    description: 'Technical precision on warm, organic foundation',
    colors: {
      // Core brand colors - maintaining violet/purple but darker variants
      primary: baseColors.violet[400],           // #a78bfa (brighter for dark bg)
      primaryHover: baseColors.violet[300],      // #c4b5fd
      primaryActive: baseColors.violet[500],     // #8b5cf6
      secondary: baseColors.purple[400],         // #c084fc (bright purple)
      secondaryHover: baseColors.purple[300] || '#d8b4fe', // Lighter purple
      accent: '#22d3ee',                         // Cyan accent for technical feel
      accentHover: '#06b6d4',                    // Darker cyan
      
      // Background system - following design system with warm beige base
      background: '#F5F1E8',                     // Warm beige - design system compliant
      backgroundElevated: '#E8E4DC',             // Sand - elevated surfaces
      surface: 'rgba(255, 255, 255, 0.95)',     // Pure white cards with slight transparency
      surfaceHover: 'rgba(255, 255, 255, 0.98)', // Slightly more opaque on hover
      surfaceActive: '#ffffff',                  // Pure white when active
      
      // Text hierarchy - design system compliant charcoal colors
      text: '#2A2A2A',                           // Charcoal (design system requirement)
      textSecondary: baseColors.zinc[600],       // #52525b
      textTertiary: baseColors.zinc[400],        // #a1a1aa  
      textInverse: '#ffffff',                    // White text for colored backgrounds
      
      // Interactive elements - design system compliant
      border: baseColors.zinc[200],              // #e4e4e7 (light border for warm bg)
      borderHover: baseColors.violet[300],       // #c4b5fd (light violet hover)
      borderFocus: baseColors.violet[500],       // #8b5cf6 (standard violet focus)
      
      // Message-specific colors - maintaining violet for research mode
      userMessage: baseColors.violet[500],       // #8b5cf6 (violet for technical feel)
      userMessageHover: baseColors.violet[600],  // #7c3aed
      assistantMessage: '#ffffff',               // Pure white cards on warm background
      assistantMessageHover: 'rgba(255, 255, 255, 0.8)', // Slightly transparent on hover
      
      // Citation system - keeping cyan for technical research feel
      citation: '#22d3ee',                       // Cyan (maintaining technical precision)
      citationHover: '#06b6d4',                  // Darker cyan
      citationBackground: 'rgba(34, 211, 238, 0.08)', // Light cyan background
      
      // Glass morphism effects - warm background compatible
      glassBackground: 'rgba(255, 255, 255, 0.3)', // Light glass on warm background
      glassBorder: 'rgba(0, 0, 0, 0.08)',       // Subtle dark border
      glassViolet: 'rgba(139, 92, 246, 0.08)',  // Light violet tint
      glassPurple: 'rgba(168, 85, 247, 0.08)',  // Light purple tint
      glassPink: 'rgba(34, 211, 238, 0.08)',    // Light cyan tint (keeping research feel)
      
      // Status colors - bright variants for dark theme
      error: '#f87171',                          // Brighter red
      warning: '#fbbf24',                        // Brighter yellow
      success: '#34d399',                        // Brighter green
      info: baseColors.violet[400],              // #a78bfa
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      codeFontFamily: 'SF Mono, Monaco, monospace',
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
    spacing: {
      // Systematic spacing scale (4px base unit)
      xs: '0.25rem',          // 4px
      sm: '0.5rem',           // 8px
      md: '0.75rem',          // 12px
      lg: '1rem',             // 16px
      xl: '1.5rem',           // 24px
      '2xl': '2rem',          // 32px
      '3xl': '3rem',          // 48px
      '4xl': '4rem',          // 64px
      
      // Semantic spacing values
      containerPadding: '1.5rem',                // Standard container padding
      messagePadding: '1rem 1.25rem',            // Comfortable message padding
      inputPadding: '0.75rem 1rem',              // Input padding
      borderRadius: '1.25rem',                   // 20px - organic river stone radius
      borderRadiusLarge: '1.5rem',               // 24px - larger organic radius
      
      // Layout-specific spacing
      headerHeight: '3.5rem',        // 56px - header height
      bottomNavHeight: '4.5rem',     // 72px - bottom nav height
      floatingOffset: '1rem',        // 16px - compact spacing for technical feel
    },
    effects: {
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',   // Subtle shadow for light background
      shadowLarge: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', // Larger shadow
      transition: 'all 0.15s ease-out',          // Keep snappy transitions
    },
  },
}

export const defaultTheme: ThemeId = 'clean'

// Utility functions for color manipulation and access
export const getThemeColor = (theme: Theme, colorKey: keyof Theme['colors']) => {
  return theme.colors[colorKey]
}

// Helper to create glassmorphism styles
export const createGlassStyle = (theme: Theme, variant: 'default' | 'violet' | 'purple' | 'pink' = 'default') => {
  const backgrounds = {
    default: theme.colors.glassBackground,
    violet: theme.colors.glassViolet,
    purple: theme.colors.glassPurple,
    pink: theme.colors.glassPink,
  }
  
  return {
    background: backgrounds[variant],
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${theme.colors.glassBorder}`,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
  }
}

// Color system documentation following vato-unified-design-system-light.html
/*

VATO Color System - Design Philosophy Implementation
==================================================

This color system follows the vato-unified-design-system-light.html guidelines:

1. **Base Color Palette**:
   - Violet (#8b5cf6) - Primary brand color for all themes
   - Purple (#9333ea) - Secondary brand color  
   - Pink (#ec4899) - Accent color for energy and interaction
   - Light grays (#fafafa, #f5f5f5) - Background foundations
   - Zinc scale - Comprehensive neutral hierarchy

2. **Theme Mood Consistency**:
   - Clean: Professional violet-first with pure whites
   - Warm: Purple-pink emphasis with cream surfaces
   - Dark: Technical with cyan accents for precision

3. **Flexible Color Variables**:
   - Each color has hover/active states for interactions
   - Glass morphism variants for depth and transparency
   - Message-specific colors for chat interface
   - Status colors consistent across themes

4. **Accessibility Compliance**:
   - High contrast ratios maintained
   - Color-blind friendly palette
   - Sufficient differentiation between states

5. **Design System Benefits**:
   - Mood consistency across themes
   - Flexible shade system for any use case
   - Glass morphism effects ready-to-use
   - Interactive state coverage
   - Semantic color naming

Usage Examples:
- Primary actions: colors.primary, colors.primaryHover, colors.primaryActive
- Glass effects: Use createGlassStyle(theme, 'violet') helper
- Citations: colors.citation with colors.citationBackground
- Status indicators: colors.error, colors.success, colors.warning, colors.info

*/
