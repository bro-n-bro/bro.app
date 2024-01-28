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
                        <!-- Charts -->
                        <Charts :key="chartsKey" />
                    </section>


                    <!-- Stats -->
                    <Stats :key="statsKey" />

                    <!-- Validators -->
                    <Validators :key="validatorsKey" />

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


    <!-- Account Page Tour -->
    <AccountPageTour v-if="store.tour" />
</template>


<script setup>
    import { onBeforeMount, inject, ref, watch } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Networks from '../components/account/Networks.vue'
    import Charts from '../components/account/Charts.vue'
    import Stats from '../components/account/Stats.vue'
    import Validators from '../components/account/Validators.vue'
    import Proposals from '../components/account/Proposals.vue'
    import ConnectedAddresses from '../components/account/ConnectedAddresses.vue'
    import AccountPageTour from '../components/tour/AccountPageTour.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        chartsKey = ref(0),
        statsKey = ref(0),
        validatorsKey = ref(0)


    onBeforeMount(() => {
        // Set default notification
        store.demo
            ? store.tooltip = i18n.global.t('message.notice_demo_default_account_page')
            : store.tooltip = i18n.global.t('message.notice_default_account_page')
    })


    watch(() => [store.account.currentWallet, store.currentNetwork], () => {
        chartsKey.value += 1
        statsKey.value += 1
        validatorsKey.value += 1
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



    @media print, (max-width: 1599px)
    {
        .col
        {
            width: 324px;
        }

        .col_main
        {
            width: calc(100% - 696px);
        }
    }



    @media print, (max-width: 1439px)
    {
        .col
        {
            width: 300px;
        }

        .col_main
        {
            width: calc(100% - 648px);
        }
    }



    @media print, (max-width: 1359px)
    {
        .col
        {
            width: 280px;
        }

        .col_main
        {
            width: calc(100% - 600px);
        }
    }



    @media print, (max-width: 1279px)
    {
        .col,
        .col_main
        {
            width: 100%;
        }

        .col_main
        {
            order: 3;
        }
    }



    @media print, (max-width: 767px)
    {
        .col_main > * + *
        {
            margin-top: 20px;
        }


        .main_data
        {
            padding: 14px;
        }
    }

</style>