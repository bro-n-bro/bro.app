<template>
    <section class="error_info">
        <div class="cont">
            <img src="../assets/images/error_404.svg" alt="" class="img">

            <div class="title">{{ $t('message.under_construction_title') }}</div>

            <router-link to="/" class="back_btn">{{ $t('message.back_home_btn') }}</router-link>
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore()


    // Pre connect
    store.preConnect()
</script>