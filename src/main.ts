import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import 'vuetify/_styles.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createVuetify } from 'vuetify'
import { lightTheme, darkTheme } from '@/plugins/vuetify-theme' 
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'
import { aliases, md } from 'vuetify/iconsets/md'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
app.config.errorHandler = (err, info) => {
  console.error('[Vue error]:', err, info)
}
