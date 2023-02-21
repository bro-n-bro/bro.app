<template>
    <!-- Header -->
    <Header />

    <!-- Router view -->
    <RouterView />

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    import { inject, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { preConnectWallet } from '@/utils'

    // Components
    import Header from '../components/Header.vue'
    import Feedback from '../components/Feedback.vue'

    const i18n = inject('i18n'),
        store = useGlobalStore(),
        emitter = inject('emitter')


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default')


        // Load/Refresh page
        await preConnectWallet()
    })


    // Event "set notification"
    emitter.on('setNotification', notice => {
        store.$patch({ tooltip: notice })
    })
</script>
