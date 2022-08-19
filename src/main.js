import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './locale'

import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)

app.config.globalProperties.$filters = {
    toFixed(value, limit) {
        return value.toFixed(limit)
    }
}

app.use(createPinia())
app.use(router)
app.use(i18n)

app.provide('i18n', i18n)
app.provide('emitter', emitter)

app.mount('#app')
