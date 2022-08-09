import { defineStore } from 'pinia'


console.log(import.meta.env.VUE_APP_CURRENCY)

export const useGlobalStore = defineStore('global', {
    state: () => ({
        node: null,
        IPFSStatus: false,
        auth: false,
        userName: '',
        currency: import.meta.env.VUE_APP_CURRENCY
    })
})
