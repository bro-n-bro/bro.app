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
                        <ContractAddress />

                        <div class="row">
                            <div class="charts">
                                <div class="avatar">
                                    <img :src="store.account.avatar" alt="">
                                </div>

                                <Pie ref="chartFirst" class="chartFirst" :data="chartDataFirst" :options="chartOptions" v-if="chartDone" />

                                <Pie ref="chartSecond" class="chartSecond" :data="chartDataSecond" :options="chartOptions" v-if="chartDone" />
                            </div>

                            <!-- Abilities -->
                            <Abilities />

                            <div class="charts_exp" id="legends">
                                <div class="item color1">{{ $t('message.account_charts_staked_label') }}</div>
                                <div class="item color2">{{ $t('message.account_charts_liquid_tokens_label') }}</div>
                                <div class="item color3">{{ $t('message.account_charts_outside_label') }}</div>
                                <div class="item color4">{{ $t('message.account_charts_unbonding_label') }}</div>
                                <div class="item color5">{{ $t('message.account_charts_rewards_label') }}</div>
                            </div>
                        </div>
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


        <!-- Add proposal modal -->
        <AddProposalModal v-if="store.showAddProposalModal" />

        <!-- Validator modal -->
        <ValidatorModal v-if="showValidatorModal" :validator="validatorInfo" />
    </section>
</template>


<script setup>
    import { onMounted, reactive, ref, inject, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Pie } from 'vue-chartjs'

    // Components
    import Networks from '../components/account/Networks.vue'
    import ContractAddress from '../components/account/ContractAddress.vue'
    import Abilities from '../components/account/Abilities.vue'
    import Stats from '../components/account/Stats.vue'
    import Validators from '../components/account/Validators.vue'
    import Proposals from '../components/account/Proposals.vue'
    import ConnectedAddresses from '../components/account/ConnectedAddresses.vue'

    import AddProposalModal from '../components/modal/AddProposalModal.vue'
    import ValidatorModal from '../components/modal/ValidatorModal.vue'

    ChartJS.register(ArcElement)

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        showValidatorModal = ref(null)

    var validatorInfo = ref({}),
        chartFirst = ref(null),
        chartSecond = ref(null),
        chartOptions = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            }
        }),
        chartDatasetsFirst = reactive([]),
        chartDatasetsSecond = reactive([]),
        chartDone = ref(false),
        chartDataFirst = computed(() => ({
            labels: [
                i18n.global.t('message.account_charts_staked_label'),
                i18n.global.t('message.account_charts_liquid_tokens_label')
            ],
            datasets: [{
                data: chartDatasetsFirst,
                backgroundColor: ['#950FFF', '#0343E8'],
                borderColor: 'transparent',
                hoverOffset: 0
            }]
        })),
        chartDataSecond = computed(() => ({
            labels: [
                i18n.global.t('message.account_charts_outside_label'),
                i18n.global.t('message.account_charts_unbonding_label'),
                i18n.global.t('message.account_charts_rewards_label')
            ],
            datasets: [{
                data: chartDatasetsSecond,
                backgroundColor: ['#C5811B', '#EB5757', '#1bc562'],
                borderColor: 'transparent',
                hoverOffset: 0
            }]
        }))


    // function triggerHover() {
    //     const chartInstance = chartFirst.value.chart

    //     chartInstance.setActiveElements([
    //         {datasetIndex: 0, index: 0},
    //     ])

    //     chartInstance.update()
    // }


    onMounted(async () => {
        try {
            await fetch(`https://rpc.bronbro.io/account/account_balance/${store.wallets.cosmoshub}`)
                .then(res => res.json())
                .then(response => {
                    // Set data for first chart
                    chartDatasetsFirst.push(response.staked.uatom)
                    chartDatasetsFirst.push(response.liquid.uatom)

                    // Set data for second chart
                    chartDatasetsSecond.push(response.outside.uatom)
                    chartDatasetsSecond.push(response.unbonding.uatom)
                    chartDatasetsSecond.push(response.rewards.uatom)

                    chartDone.value = true
                })
        } catch (error) {
            console.log(error)
        }
    })


    // Event "open add proposal modal"
    emitter.on('openAddProposalModal', () => {
        store.showAddProposalModal = true
    })


    // Event "close add proposal modal"
    emitter.on('closeAddProposalModal', () => {
        store.showAddProposalModal = false
    })


    // Event "show validator modal"
    emitter.on('openValidatorModal', validator => {
        validatorInfo.value = validator
        showValidatorModal.value = true
    })


    // Event "close validator modal"
    emitter.on('closeValidatorModal', () => {
        showValidatorModal.value = false
    })
</script>


<style>
    .account_info .grid
    {
        justify-content: space-between;
    }


    .account_info .col
    {
        width: 353px;
        max-width: 100%;
    }


    .account_info .col_main
    {
        width: calc(100% - 746px);
    }

    .account_info .col_main > * + *
    {
        margin-top: 24px;
    }



    .account_info .main_data
    {
        padding: 20px;

        border-radius: 20px;
        background: #0d0d0d;
    }



    .account_info .charts
    {
        position: relative;

        width: 291px;
        max-width: 100%;
        height: 291px;
    }


    .account_info .chartFirst
    {
        position: absolute !important;
        z-index: 1;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
    }

    .account_info .chartSecond
    {
        position: absolute !important;
        z-index: 3;
        top: 0;
        left: 0;

        width: calc(100% - 40px);
        height: calc(100% - 40px);
        margin: auto;

        inset: 0;
    }


    .account_info .avatar
    {
        position: absolute;
        z-index: 9;

        width: 203px;
        height: 203px;
        margin: auto;

        border-radius: 50%;

        inset: 0;
    }

    .account_info .avatar img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;

        object-fit: cover;
    }



    .account_info .charts_exp
    {
        display: flex;

        margin-top: 24px;
        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .account_info .charts_exp > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .account_info .charts_exp .item
    {
        font-size: 12px;
        line-height: 100%;

        position: relative;

        padding: 8px 8px 8px 26px;

        border-radius: 10px;
        background: #141414;
    }

    .account_info .charts_exp .item:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 8px;

        display: block;

        width: 10px;
        height: 10px;
        margin: auto;

        content: '';

        border-radius: 50%;
    }

    .account_info .charts_exp .item.color1:before
    {
        background: #950fff;
    }

    .account_info .charts_exp .item.color2:before
    {
        background: #0343e8;
    }

    .account_info .charts_exp .item.color3:before
    {
        background: #c5811b;
    }

    .account_info .charts_exp .item.color4:before
    {
        background: #eb5757;
    }

    .account_info .charts_exp .item.color5:before
    {
        background: #1bc562;
    }

</style>