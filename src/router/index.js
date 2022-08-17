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
		path: '/',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
		meta: {
			layout: defaultLayut
		}
	},
	// {
	// 	path: '/',
	// 	name: 'home',
	// 	component: HomeView
	// },
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	// }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
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
