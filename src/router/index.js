import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'

import errorLayout from '@/layouts/Error.vue'
import defaultLayout from '@/layouts/Default.vue'
import mainPageLayout from '@/layouts/MainPage.vue'


const routes = [
    {
        path: '/:pathMatch(.*)',
        name: 'Error',
        component: () => import('../views/Error404.vue'),
        meta: {
            layout: errorLayout,
            accessDenied: []
        }
    },
    {
        path: '/keplr_error',
        name: 'KeplrError',
        component: () => import('../views/KeplrError.vue'),
        meta: {
            layout: errorLayout,
            accessDenied: ['with_keplr']
        }
    },
    {
        path: '/keplr_reload',
        name: 'KeplrReload',
        component: () => import('../views/KeplrReload.vue'),
        meta: {
            layout: errorLayout,
            accessDenied: ['with_keplr']
        }
    },
	{
		path: '/under_construction',
		name: 'Under construction',
		component: () => import('../views/UnderConstruction.vue'),
		meta: {
			layout: errorLayout,
			accessDenied: ['without_keplr']
		}
	},
    {
		path: '/',
		name: 'MainPage',
		component: () => import('../views/MainPage.vue'),
		meta: {
			layout: mainPageLayout,
			accessDenied: []
		}
	},
    {
		path: '/welcome',
		name: 'Welcome',
		component: () => import('../views/Welcome.vue'),
		meta: {
			layout: mainPageLayout,
			accessDenied: ['with_passport', 'with_global_passport']
		}
	},
    {
		path: '/create_passport',
		name: 'CreatePassport',
		component: () => import('../views/CreatePassport.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: ['without_keplr', 'not_connected', 'with_passport']
		}
	},
	{
		path: '/proposals/:network',
		name: 'Proposals',
		component: () => import('../views/Proposals.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/:network/proposal/:proposal_id',
		name: 'Proposal',
		component: () => import('../views/Proposal.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/account/:network',
		name: 'Account',
		component: () => import('../views/Account.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
	{
		path: '/account/passport',
		name: 'Passport',
		component: () => import('../views/Passport.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: ['without_keplr', 'not_connected', 'without_passport']
		}
	},
]


const router = createRouter({
	history: createWebHistory(),
	routes
})


const urlsExceptions = [
	'/',
	'/welcome',
	'/keplr_error',
	'/keplr_reload',
	'/under_construction'
]


router.beforeResolve(async (to, from, next) => {
	let store = useGlobalStore(),
		referer = to.query.ref,
		demo = to.query.demo

	// Demo
	demo ? store.demo = true : store.demo = false

	// Referer
	if (referer) {
		store.referer = referer
	}

	// Current network from url
	if (to.params.network) {
		store.currentNetwork = to.params.network
	}

	// Current proposal from url
	if (to.params.proposal_id) {
		store.currentProposalId = to.params.proposal_id
	}


	// Get currencies price
	if (!store.prices) {
		await store.getCurrenciesPrice()
	}


    // Init APP
	if (!urlsExceptions.includes(to.fullPath)) {
		if (!store.isAuth) {
			store.demo
				? store.initDemo()
				: await store.initApp()
		} else{
			if (!store.account.demo && store.demo) {
				store.reset()
				store.initDemo()
			} else if (!store.account.moonPassport && !store.isKeplrConnected){
				store.reset()
				await store.initApp()
			}
		}
	}


	// Check page access
	to.matched.some(record => {
		// Array with prohibitions
		let access = record.meta.accessDenied

		if(access.length && !store.account.demo) {
			// Forbidden without keplr
			if(access.includes('without_keplr') && !window.keplr) {
				next({ name: 'KeplrError' })

				return false
			}

			// Forbidden with keplr
			if(access.includes('with_keplr') && window.keplr) {
				!store.demo
					? next('/')
					: next('/?demo=true')

				return false
			}

			// Forbidden with a passport
			if (access.includes('with_passport') && store.account.moonPassport) {
				!store.demo
					? next('/account/cosmoshub')
					: next('/account/cosmoshub?demo=true')

				return false
			}

			// Forbidden without a passport
			if (access.includes('without_passport') && !store.account.moonPassportOwner) {
				!store.demo
					? next('/')
					: next('/?demo=true')

				return false
			}

			// Forbidden with a global passport
			if (access.includes('with_global_passport') && store.account.moonPassportOwner && !store.account.moonPassport) {
				!store.demo
					? next('/account/cosmoshub')
					: next('/account/cosmoshub?demo=true')

				return false
			}

			// Wallet not connected
			if (access.includes('not_connected') && !store.isKeplrConnected) {
				!store.demo
					? next('/')
					: next('/?demo=true')

				return false
			}
		}
	})


    // App full loaded
    if(!store.isAppFullLoaded) {
        store.isAppFullLoaded = true
    }

	next()
})


export default router
