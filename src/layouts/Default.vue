<template>
    <div class="main">
        <!-- Header -->
        <Header />

        <!-- Router view -->
        <RouterView />

        <!-- Manage modal -->
        <Suspense>
        <ManageModal v-if="store.showManageModal" />
        </Suspense>

        <!-- Feedback -->
        <Feedback />
    </div>

    <!-- Footer -->
    <Footer />
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    // Components
    import Header from '../components/Header.vue'
    import ManageModal from '../components/modal/ManageModal.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'

    const store = useGlobalStore()
</script>
