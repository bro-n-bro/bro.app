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
			layout: defaultLayut
		}
	},
	{
		path: '/create_passport',
		name: 'CreatePassport',
		component: () => import('../views/CreatePassport.vue'),
		meta: {
			layout: defaultLayut
		}
	},
	{
		path: '/wallets',
		name: 'Wallets',
		component: () => import('../views/Wallets.vue'),
		meta: {
			layout: defaultLayut
		}
	},
	{
		path: '/',
		name: 'MainPage',
		component: () => import('../views/MainPage.vue'),
		meta: {
			layout: defaultLayut
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})


router.beforeEach((to, from, next) => {
	const modalId = to.query.manage_modal,
		ref = to.query.ref

	// Manage modal from url
	if (modalId) { store.networkManageModal = modalId }
	if (ref) { store.ref = ref }

	next()
})


router.afterEach((to, from, next) => {
	window.onload = async () =>{
		const store = useGlobalStore()

		// If Keplr does not exist
		if(!window.keplr && (to.name != 'KeplrError' && to.name != 'KeplrReload')) {
			router.replace({ name: 'KeplrError' })
		}

		// If Keplr is installed
		if(window.keplr && (to.name == 'KeplrError' || to.name == 'KeplrReload')) {
			router.replace({ name: 'MainPage' })
		}

		// If Keplr is installed and the wallet is connected
		if(window.keplr && store.auth && to.name == 'MainPage') {
			router.replace({ name: 'Dashboard' })
		}

		// Connect wallet
		if(!store.connected) {
			await store.connectWallet()
		}

		// If has passport
		if(store.account.moonPassport && to.name == 'CreatePassport') {
			router.replace({ name: 'Wallets' })
		}

		// Change Keplr account
		window.addEventListener('keplr_keystorechange', async () => {
			// Reset store
			await store.reset()
		})
	}
})


export default router
