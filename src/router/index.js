import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'

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


router.beforeEach((to, from, next) => {
	const store = useGlobalStore()


	// Keplr
	!window.keplr && to.name != 'KeplrError'
		? router.push({ name: 'KeplrError' })
		: next()

	window.keplr && to.name == 'KeplrError'
		? router.push({ name: 'Dashboard' })
		: next()


	// Manage modal from url
	if (to.query.manage_modal) {
		store.showManageModal = true
		store.networkManageModal = to.query.manage_modal
	}
})


export default router
