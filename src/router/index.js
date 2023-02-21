import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'

import errorLayut from '../layouts/Error.vue'
import dashboardLayut from '../layouts/Dashboard.vue'
import mainLayut from '../layouts/Main.vue'

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
		path: '/keplr_reload',
		name: 'KeplrReload',
		component: () => import('../views/KeplrReload.vue'),
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
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
		meta: {
			layout: dashboardLayut
		}
	},
	{
		path: '/create_passport',
		name: 'CreatePassport',
		component: () => import('../views/CreatePassport.vue'),
		meta: {
			layout: mainLayut
		}
	},
	{
		path: '/',
		name: 'MainPage',
		component: () => import('../views/MainPage.vue'),
		meta: {
			layout: mainLayut
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})


router.beforeEach((to, from, next) => {
	const store = useGlobalStore(),
		modalId = to.query.manage_modal,
		ref = to.query.ref

	// Manage modal from url
	if (modalId) { store.networkManageModal = modalId }
	if (ref) { store.ref = ref }

	// Keplr
	setTimeout(() => {
		// If Keplr does not exist
		if(!window.keplr && (to.name != 'KeplrError' && to.name != 'KeplrReload')) {
			router.push({ name: 'KeplrError' })
		}

		// If Keplr is installed
		if(window.keplr && (to.name == 'KeplrError' || to.name == 'KeplrReload')) {
			router.push({ name: 'MainPage' })
		}

		// If Keplr is installed and the wallet is connected
		if(window.keplr && store.auth && to.name == 'MainPage') {
			router.push({ name: 'Dashboard' })
		}

		// If all OK
		next()
	})
})


export default router
