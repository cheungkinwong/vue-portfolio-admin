import type { ThemeDefinition } from 'vuetify'

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#2196f3',
    'primary-light': '#bbdefb',
    'primary-dark': '#0d47a1',
    'primary-contrast': '#ffffff',

    secondary: '#009688',
    'secondary-light': '#b2dfdb',
    'secondary-dark': '#004d40',
    'secondary-contrast': '#ffffff',
  },
}

export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#90caf9',
    'primary-light': '#e3f2fd',
    'primary-dark': '#42a5f5',
    'primary-contrast': '#000000',

    secondary: '#80cbc4',
    'secondary-light': '#b2dfdb',
    'secondary-dark': '#4f5b62',
    'secondary-contrast': '#000000',
  },
}
