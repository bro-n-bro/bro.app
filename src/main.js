import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './locale'

import App from './App.vue'
import router from './router'

import './assets/css/styles.css'

// Events
import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.provide('emitter', emitter)
app.provide('i18n', i18n)

app.mount('#app')
