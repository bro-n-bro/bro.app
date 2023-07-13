<template>
    <div class="main no_pad" :class="{'tour_show': store.tour}">
        <!-- Router view -->
        <RouterView />
    </div>

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    // Components
    import Feedback from '../components/Feedback.vue'


    const store = useGlobalStore()
</script>
