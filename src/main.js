import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locale'
import VStickyElement from 'vue-sticky-element'


// Events
import mitt from 'mitt'
const emitter = mitt()


// Create App
const app = createApp(App)


// Vue use
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VStickyElement)


// Vue provide
app.provide('i18n', i18n)
app.provide('emitter', emitter)


// Add rounding
app.config.globalProperties.$filters = {
    toFixed(value, limit) {
        return value.toFixed(limit)
    }
}


// Сlick element outside
const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value()
            }
        }

        document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted: el => document.removeEventListener('click', el.clickOutsideEvent),
}

app.directive('clickOut', clickOutside).mount('#app')
