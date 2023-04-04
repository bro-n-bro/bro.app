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

                                    <router-link to="/account/passport" class="edit_link">
                                        <div class="btn">
                                            <svg class="icon"><use xlink:href="/sprite.svg#ic_settings"></use></svg>
                                            <span>{{ $t('message.settings_btn') }}</span>
                                        </div>
                                    </router-link>
                                </div>

                                <div class="chartFirst">
                                    <Pie ref="chartFirst" :data="chartDataFirst" :options="chartOptionsFirst" v-if="chartDone" />
                                </div>

                                <div class="chartSecond">
                                    <Pie ref="chartSecond" :data="chartDataSecond" :options="chartOptionsSecond" v-if="chartDone" />
                                </div>
                            </div>

                            <!-- Abilities -->
                            <Suspense>
                            <Abilities />
                            </Suspense>

                            <div class="charts_legends">
                                <div class="item color1" :class="{'hover': activeLegend == 1}"
                                    @mouseenter="mouseenterСhart(1, 0)"
                                    @mouseleave="mouseleaveСhart(1, 0)"
                                >
                                    {{ $t('message.account_charts_staked_label') }}
                                </div>

                                <div class="item color2" :class="{'hover': activeLegend == 2}"
                                    @mouseenter="mouseenterСhart(1, 1)"
                                    @mouseleave="mouseleaveСhart(1, 1)"
                                >
                                    {{ $t('message.account_charts_liquid_tokens_label') }}
                                </div>

                                <div class="item color3" :class="{'hover': activeLegend == 3}"
                                    @mouseenter="mouseenterСhart(2, 0)"
                                    @mouseleave="mouseleaveСhart(2, 0)"
                                >
                                    {{ $t('message.account_charts_outside_label') }}
                                </div>

                                <div class="item color4" :class="{'hover': activeLegend == 4}"
                                    @mouseenter="mouseenterСhart(2, 1)"
                                    @mouseleave="mouseleaveСhart(2, 1)"
                                >
                                    {{ $t('message.account_charts_unbonding_label') }}
                                </div>

                                <div class="item color5" :class="{'hover': activeLegend == 5}"
                                    @mouseenter="mouseenterСhart(2, 2)"
                                    @mouseleave="mouseleaveСhart(2, 2)"
                                >
                                    {{ $t('message.account_charts_rewards_label') }}
                                </div>
                            </div>
                        </div>
                    </section>


                    <!-- Stats -->
                    <Suspense>
                    <Stats />
                    </Suspense>


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


        <!-- Validator modal -->
        <Suspense>
        <ValidatorModal v-if="showValidatorModal" :validator="validatorInfo" />
        </Suspense>
    </section>
</template>


<script setup>
    import { onBeforeMount, reactive, ref, inject, computed } from 'vue'
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
    import ValidatorModal from '../components/modal/ValidatorModal.vue'

    ChartJS.register(ArcElement)

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        showValidatorModal = ref(null)

    var validatorInfo = ref({}),
        chartFirst = ref(null),
        chartSecond = ref(null),
        activeLegend = ref(null),
        chartOptionsFirst = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            onHover: (e, item) => {
                item.length
                    ? activeLegend.value = item[0].index + 1
                    : activeLegend.value = null
            }
        }),
        chartOptionsSecond = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            onHover: (e, item) => {
                item.length
                    ? activeLegend.value = item[0].index + 3
                    : activeLegend.value = null
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
                hoverOffset: 0,
                hoverBackgroundColor: ['#7700E1', '#3400D1']
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
                hoverOffset: 0,
                hoverBackgroundColor: ['#D17D00', '#D74343', '#07B14E']
            }]
        }))


    // Mouse enter on legend for first chart
    function mouseenterСhart(chartIndex, dataIndex) {
        let chartInstance = {}

        chartIndex == 1
            ? chartInstance = chartFirst.value.chart
            : chartInstance = chartSecond.value.chart

        chartInstance.setActiveElements([{
            datasetIndex: 0,
            index: dataIndex
        }])

        chartInstance.update()
    }


    // Mouse leave from legend for first chart
    function mouseleaveСhart(chartIndex, dataIndex) {
        let chartInstance = {}

        chartIndex == 1
            ? chartInstance = chartFirst.value.chart
            : chartInstance = chartSecond.value.chart

        chartInstance.setActiveElements([])
        chartInstance.update()
    }


    onBeforeMount(async () => {
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

        document.body.classList.add('lock')
    })


    // Event "close add proposal modal"
    emitter.on('closeAddProposalModal', () => {
        store.showAddProposalModal = false

        document.body.classList.remove('lock')
    })


    // Event "show validator modal"
    emitter.on('openValidatorModal', validator => {
        validatorInfo.value = validator
        showValidatorModal.value = true

        document.body.classList.add('lock')
    })


    // Event "close validator modal"
    emitter.on('closeValidatorModal', () => {
        showValidatorModal.value = false

        document.body.classList.remove('lock')
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

        border-radius: 50%;

        clip-path: circle(50% at 50% 50%);
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

        border-radius: 50%;

        clip-path: circle(50% at 50% 50%);
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
        position: relative;
        z-index: 10;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;
        background: #141414;

        object-fit: cover;
    }


    .account_info .avatar .edit_link
    {
        color: currentColor;
        font-size: 14px;
        line-height: 120%;

        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 100%;

        transition: opacity .2s linear;
        text-decoration: none;

        opacity: 0;
        border-radius: 50%;
        background: rgba(0, 0, 0, .6);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .account_info .avatar .edit_link .btn
    {
        display: flex;

        padding: 8px;

        border-radius: 10px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .account_info .avatar .edit_link .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    .account_info .avatar .edit_link:hover
    {
        opacity: 1;
    }



    .account_info .charts_legends
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

    .account_info .charts_legends > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .account_info .charts_legends .item
    {
        font-size: 12px;
        line-height: 100%;

        position: relative;

        padding: 8px 8px 8px 26px;

        transition: background .2s linear;

        border-radius: 10px;
        background: #141414;
    }

    .account_info .charts_legends .item:before
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

    .account_info .charts_legends .item.color1:before
    {
        background: #950fff;
    }

    .account_info .charts_legends .item.color2:before
    {
        background: #0343e8;
    }

    .account_info .charts_legends .item.color3:before
    {
        background: #c5811b;
    }

    .account_info .charts_legends .item.color4:before
    {
        background: #eb5757;
    }

    .account_info .charts_legends .item.color5:before
    {
        background: #1bc562;
    }

    .account_info .charts_legends .item:hover,
    .account_info .charts_legends .item.hover
    {
        background: #353535;
    }

</style>