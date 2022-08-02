import { defineStore } from 'pinia'


export const useGlobalStore = defineStore('global', {
    state: () => ({
        node: null,
        IPFSStatus: false,
        auth: false
    })
})
