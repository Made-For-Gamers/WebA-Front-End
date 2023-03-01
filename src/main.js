import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import './style.css'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(
  createHead({
    title: 'MFG - Made For Gamers',
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_KEY}`,
        // if recaptcha is needed on page load, use `load: () => {}`
      },
    ],
  })
)

router.isReady().then(() => {
  app.mount('#app')
})
