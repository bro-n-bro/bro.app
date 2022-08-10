import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'


export const useGlobalStore = defineStore('global', {
    state: () => ({
        node: null,
        IPFSStatus: false,
        auth: useLocalStorage('auth', false),
        userName: useLocalStorage('userName', ''),
        currency: useLocalStorage('currency', 'BTC')
    })
})
