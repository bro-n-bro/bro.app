import { createRouter, createWebHistory } from 'vue-router'

import defaultLayut from '../layouts/Default.vue'
import errorLayut from '../layouts/Error.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: () => import('../views/Dashboard.vue'),
            meta: {
                layout: defaultLayut
            }
        },
        {
            path: '/keplr_error',
            name: 'KeplrError',
            component: () => import('../views/KeplrError.vue'),
            meta: {
                layout: errorLayut
            }
        },
        {
            path: '/:pathMatch(.*)',
            name: 'Error',
            component: () => import('../views/Error404.vue'),
            meta: {
                layout: errorLayut
            }
        },
    ]
})


router.beforeEach(async (to, from, next) => {
    // Keplr
    if (!window.keplr && to.name !== 'KeplrError') {
        router.push({ name: 'KeplrError' })
    } else {
        next()
    }
})


export default router
