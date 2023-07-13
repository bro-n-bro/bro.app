<template>
    <div class="main no_pad" :class="{'tour_show': store.tour}">
        <!-- Router view -->
        <RouterView />
    </div>

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    // Components
    import Feedback from '../components/Feedback.vue'
</script>
