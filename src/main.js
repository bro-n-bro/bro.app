import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './locale'
import moment from 'moment'
import Notifications from '@kyvg/vue3-notification'
import timeago from 'vue-timeago3'
import VueCountdown from '@chenfengyuan/vue-countdown'
import mitt from 'mitt'
import VueClipboard from 'vue3-clipboard'


// Create App
const app = createApp(App)


// Pinia
const pinia = createPinia()


// Events
const emitter = mitt()


// Vue use
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(Notifications)
app.use(timeago)

app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})


// Vue provide
app.provide('i18n', i18n)
app.provide('emitter', emitter)


// Filters
app.config.globalProperties.$filters = {
    // Add rounding
    toFixed(value, limit) {
        let newValue

        value != 0
            ? newValue = value.toFixed(limit)
            : newValue = value

        return newValue
    },

    // Time age
    timeAgo(date) {
        return moment(date).fromNow()
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


// Directives
app.directive('clickOut', clickOutside)


// VueCountdown
app.component(VueCountdown.name, VueCountdown)


// Mount
app.mount('#app')
