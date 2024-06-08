import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import '@/styles/main.scss'
import '@/styles/tailwind.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())

app.mount('#app')
