export type ThemeId = 'clean' | 'warm' | 'dark'

export interface Theme {
  id: ThemeId
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    userMessage: string
    assistantMessage: string
    citation: string
    error: string
    success: string
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
    containerPadding: string
    messagePadding: string
    inputPadding: string
    borderRadius: string
    borderRadiusLarge: string
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
      primary: '#2563EB',
      secondary: '#64748B',
      accent: '#10B981',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1E293B',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      userMessage: '#2563EB',
      assistantMessage: '#F8FAFC',
      citation: '#2563EB',
      error: '#DC2626',
      success: '#10B981',
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
      containerPadding: '1.5rem',
      messagePadding: '1rem 1.25rem',
      inputPadding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      borderRadiusLarge: '0.5rem',
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
      primary: '#8B5CF6',
      secondary: '#FB923C',
      accent: '#14B8A6',
      background: '#FAFAF9',
      surface: '#FFF7ED',
      text: '#292524',
      textSecondary: '#78716C',
      border: '#FED7AA',
      userMessage: '#8B5CF6',
      assistantMessage: '#FFF7ED',
      citation: '#FB923C',
      error: '#EF4444',
      success: '#14B8A6',
    },
    typography: {
      fontFamily: 'Circular, Avenir, system-ui, sans-serif',
      codeFontFamily: 'Source Code Pro, monospace',
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
      containerPadding: '2rem',
      messagePadding: '1.25rem 1.5rem',
      inputPadding: '1rem 1.25rem',
      borderRadius: '1rem',
      borderRadiusLarge: '1.25rem',
    },
    effects: {
      shadow: '0 4px 12px 0 rgba(251, 146, 60, 0.15)',
      shadowLarge: '0 8px 25px -5px rgba(139, 92, 246, 0.25)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  dark: {
    id: 'dark',
    name: 'Dark Intelligence',
    description: 'Powerful, technical, focused',
    colors: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      accent: '#22D3EE',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#A1A1AA',
      border: '#27272A',
      userMessage: '#60A5FA',
      assistantMessage: '#1A1A1A',
      citation: '#22D3EE',
      error: '#F87171',
      success: '#34D399',
    },
    typography: {
      fontFamily: 'JetBrains Mono, IBM Plex Sans, monospace',
      codeFontFamily: 'JetBrains Mono, monospace',
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
      containerPadding: '1rem',
      messagePadding: '0.75rem 1rem',
      inputPadding: '0.75rem 1rem',
      borderRadius: '0.125rem',
      borderRadiusLarge: '0.25rem',
    },
    effects: {
      shadow: '0 0 0 1px rgba(96, 165, 250, 0.3)',
      shadowLarge: '0 0 20px rgba(34, 211, 238, 0.3)',
      transition: 'all 0.15s ease-out',
    },
  },
}

export const defaultTheme: ThemeId = 'clean'