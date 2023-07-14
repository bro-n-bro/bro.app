<template>
    <div class="main" :class="{tour_show: store.tour}">
        <!-- Header -->
        <Header />

        <!-- Demo notice -->
        <DemoNotice v-if="store.demo" />

        <!-- Router view -->
        <RouterView />
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    // Components
    import DemoNotice from '../components/DemoNotice.vue'
    import Header from '../components/Header.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'


    const store = useGlobalStore()
</script>
