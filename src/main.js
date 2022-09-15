import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locale'

import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.provide('i18n', i18n)
app.provide('emitter', emitter)

app.config.globalProperties.$filters = {
    toFixed(value, limit) {
        return value.toFixed(limit)
    }
}

app.mount('#app')
