import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import LineBubbles from './components/LineBubbles.vue'

const app = createApp(App)
app.component('LineBubbles', LineBubbles)
app.use(createPinia())
app.use(router)
app.mount('#app')
