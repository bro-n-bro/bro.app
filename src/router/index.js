import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'
import { getNetworksData } from '@/utils'

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
			accessDenied: ['without_keplr', 'not_connected']
		}
	},
	{
		path: '/account/:network',
		name: 'Account',
		component: () => import('../views/Account.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/account/passport',
		name: 'Passport',
		component: () => import('../views/Passport.vue'),
		meta: {
			layout: defaultLayut,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/proposals/:network',
		name: 'Proposals',
		component: () => import('../views/Proposals.vue'),
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
	const store = useGlobalStore(),
		modalId = to.query.manage_modal,
		ref = to.query.ref

	// Manage modal from url
	if (modalId) {
		store.networkManageModal = modalId
	}

	if (ref) { store.ref = ref }

	// Network
	to.params.network
		? store.currentNetwork = to.params.network
		: store.currentNetwork = ''

	next()
})


router.afterEach((to, from, next) => {
	const store = useGlobalStore()

	window.onload = async () =>{
		// Connect wallet
		await store.connectWallet()

		// Get networks data
		await getNetworksData()

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
					router.push('/account/cosmoshub')
				}

				// Forbidden without a passport
				if (access.includes('without_passport') && !store.account.moonPassport) {
					router.push({ name: 'Dashboard' })
				}
			}
		})

		// App full loaded
		store.appLoaded = true

		// Change Keplr account
		window.addEventListener('keplr_keystorechange', async () => {
			// Reset store
			// await store.reset()

			// Reload page
			window.location.reload()
		})
	}
})


export default router
