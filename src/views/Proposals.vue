<template>
    <section class="account_info">
        <div class="cont middle">
            <div class="grid row">
                <section class="col">
                    <!-- Networks -->
                    <Networks />
                </section>


                <section class="col_main">

                </section>


                <section class="col">
                    <!-- Filter -->
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onMounted, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Networks from '../components/account/Networks.vue'

    const store = useGlobalStore()
</script>


<style scoped>

</style>