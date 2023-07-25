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
            // Redirect
            router.push('/welcome')
        } else {
            if (store.account.demo || !store.isAuth) {
                // Reset
                store.reset()

                // Init app
                await store.initApp()
            }

            // Redirect
            store.account.moonPassport
                ? router.push('/account/cosmoshub')
                : router.push('/welcome')
        }
    })
</script>