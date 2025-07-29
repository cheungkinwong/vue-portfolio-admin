import 'vuetify'

declare module 'vuetify' {
  interface ThemeDefinition {
    dark: boolean 
    colors: {
      primary: string
      'primary-light': string
      'primary-dark': string
      'primary-contrast': string

      secondary: string
      'secondary-light': string
      'secondary-dark': string
      'secondary-contrast': string
    }
  }
}
