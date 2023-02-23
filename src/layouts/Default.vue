<template>
    <!-- Header -->
    <Header />

    <!-- Router view -->
    <RouterView />

    <!-- Manage modal -->
    <ManageModal v-if="store.showManageModal" />

    <!-- Feedback -->
    <Feedback />

    <!-- Footer -->
    <Footer />
</template>


<script setup>
    import { inject, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Header from '../components/Header.vue'
    import ManageModal from '../components/modal/ManageModal.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'

    const i18n = inject('i18n'),
        store = useGlobalStore()


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default')
    })
</script>
