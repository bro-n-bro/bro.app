<template>
    <section class="account_info">
        <div class="cont middle">
            <div class="grid row">
                <section class="col">
                    <!-- Networks -->
                    <Networks />
                </section>


                <section class="col_main">
                    <section class="main_data">
                        <!-- Contract address -->
                        <!-- <ContractAddress /> -->

                        <!-- Charts -->
                        <Charts />
                    </section>


                    <!-- Stats -->
                    <Stats />

                    <!-- Validators -->
                    <Validators />

                    <!-- Proposals -->
                    <Proposals />
                </section>


                <section class="col">
                    <!-- Connected addresses -->
                    <ConnectedAddresses />
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onBeforeMount, inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Networks from '../components/account/Networks.vue'
    import Charts from '../components/account/Charts.vue'
    import Stats from '../components/account/Stats.vue'
    import Validators from '../components/account/Validators.vue'
    import Proposals from '../components/account/Proposals.vue'
    import ConnectedAddresses from '../components/account/ConnectedAddresses.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n')


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_account_page')
    })
</script>


<style scoped>
    .grid
    {
        justify-content: space-between;
    }


    .col
    {
        width: 353px;
        max-width: 100%;
    }


    .col_main
    {
        width: calc(100% - 746px);
    }

    .col_main > * + *
    {
        margin-top: 24px;
    }



    .main_data
    {
        padding: 20px;

        border-radius: 20px;
        background: #0d0d0d;
    }
</style>