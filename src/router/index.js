import { createRouter, createWebHistory } from 'vue-router'

import errorLayut from '../layouts/Error.vue'
import defaultLayut from '../layouts/Default.vue'

const routes = [
	{
		path: '/:pathMatch(.*)',
		name: 'Error',
		component: () => import('../views/Error404.vue'),
		meta: {
			layout: errorLayut
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
		path: '/under_construction',
		name: 'Under construction',
		component: () => import('../views/UnderConstruction.vue'),
		meta: {
			layout: errorLayut
		}
	},
	{
		path: '/',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
		meta: {
			layout: defaultLayut
		}
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})


router.beforeEach(async (to, from, next) => {
	// Keplr
	if (!window.keplr && to.name !== 'KeplrError') {
		router().push({ name: 'KeplrError' })
	} else {
		next()
	}
})


export default router
