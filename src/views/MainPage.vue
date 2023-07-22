<template></template>


<script setup>
    import { inject, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        router = useRouter()


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_main_page')


        // Route
        if (!window.keplr) {
            router.push('/welcome')
        } else {
            // Reset
            if (store.account.demo) {
                store.customReset()

                await store.initApp()
            }

            // Init app
            if (!store.isAuth) {
                await store.initApp()
            }

            // Reload
            store.account.moonPassport
                ? router.push('/account/cosmoshub')
                : router.push('/welcome')
        }
    })
</script>