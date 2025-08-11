import 'vuetify'

declare module 'vuetify' {
  interface ThemeDefinition {
    dark: boolean 
    colors: {
      primary: string
      'primary-light': string
      'primary-dark': string
      'primary-contrast': string

      background: string // Optional background color  
    }
  }
}
