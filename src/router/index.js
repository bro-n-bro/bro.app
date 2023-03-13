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
			layout: errorLayut,
			accessDenied: ['without_keplr']
		}
	},
	{
		path: '/keplr_error',
		name: 'KeplrError',
		component: () => import('../views/KeplrError.vue'),
		meta: {
			layout: errorLayut,
			accessDenied: ['with_keplr']
		}
	},
	{
		path: '/keplr_reload',
		name: 'KeplrReload',
		component: () => import('../views/KeplrReload.vue'),
		meta: {
			layout: errorLayut,
			accessDenied: ['with_keplr']
		}
	},
	{
		path: '/under_construction',
		name: 'Under construction',
		component: () => import('../views/UnderConstruction.vue'),
		meta: {
			layout: errorLayut,
			accessDenied: ['without_keplr']
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr', 'not_connected']
		}
	},
	{
		path: '/create_passport',
		name: 'CreatePassport',
		component: () => import('../views/CreatePassport.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr', 'not_connected', 'with_passport']
		}
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import('../views/Account.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/wallets',
		name: 'Wallets',
		component: () => import('../views/Wallets.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/',
		name: 'MainPage',
		component: () => import('../views/MainPage.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr']
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
	const store = useGlobalStore()

	window.onload = async () =>{
		// // If Keplr does not exist
		// if(!window.keplr && (to.name != 'KeplrError' && to.name != 'KeplrReload')) {
		// 	router.push({ name: 'KeplrError' })
		// }

		// // If Keplr is installed
		// if(window.keplr && (to.name == 'KeplrError' || to.name == 'KeplrReload')) {
		// 	router.push({ name: 'MainPage' })
		// }

		// Connect wallet
		await store.connectWallet()

		// Check page access
		to.matched.some(record => {
			// Array with prohibitions
			let access = record.meta.accessDenied

			if (access) {
				// Forbidden without keplr
				if (access.includes('without_keplr') && !window.keplr) {
					router.push({ name: 'KeplrError' })
				}

				// Forbidden with keplr
				if (access.includes('with_keplr') && window.keplr) {
					router.push({ name: 'MainPage' })
				}

				// Wallet not connected
				if (access.includes('not_connected') && !store.connected) {
					router.push({ name: 'MainPage' })
				}

				// Forbidden with a passport
				if (access.includes('with_passport') && store.account.moonPassport) {
					router.push({ name: 'Wallets' })
				}

				// Forbidden without a passport
				if (access.includes('without_passport') && !store.account.moonPassport) {
					router.push({ name: 'Dashboard' })
				}
			}
		})

		// // If Keplr is installed and the wallet is connected
		// if(window.keplr && store.auth && to.name == 'MainPage' && store.account.moonPassport) {
		// 	router.push({ name: 'Wallets' })
		// }

		// if(window.keplr && store.auth && to.name == 'MainPage' && !store.account.moonPassport) {
		// 	router.push({ name: 'Dashboard' })
		// }

		// // If has passport
		// if(store.account.moonPassport && to.name == 'CreatePassport') {
		// 	router.push({ name: 'Wallets' })
		// }

		// // If hasn't passport
		// if(!store.account.moonPassport && to.name == 'Wallets') {
		// 	router.push({ name: 'Dashboard' })
		// }

		// App full loaded
		store.appLoaded = true

		// Change Keplr account
		window.addEventListener('keplr_keystorechange', async () => {
			// Reset store
			await store.reset()
		})
	}
})


export default router
