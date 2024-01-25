<template>
    <div class="chart_info">
        <div class="block_title">
            {{ $t('message.account_chart_stake_block_title') }}
        </div>

        <div class="block_desc">
            {{ $t('message.account_chart_stake_desc') }}
        </div>


        <div class="charts">
            <Avatar />

            <div class="chartStake" :class="{'active': props.chartActive == 1}" @click.prevent="emitter.emit('changeActiveChart', 1)">
                <Doughnut ref="chartStake" :data="chartDataStake" :options="chartOptionsStake" class="chart" />
            </div>

            <div class="chartLiquide" :class="{'active': props.chartActive == 2}" @click.prevent="emitter.emit('changeActiveChart', 2)">
                <Doughnut ref="chartLiquide" :data="chartDataLiquide" :options="chartOptionsLiquide" class="chart" />
            </div>
        </div>


        <template v-if="props.chartActive == 1">
        <div class="legends empty" v-if="!chartTotalStake">
            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>

            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>

            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>

            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>
        </div>


        <div class="legends" v-else>
            <div class="legend" v-if="currentData.total.staked" :class="{'active': chartActiveLegendStake == 0}" @mouseenter="mouseenterLegendStake(0)" @mouseleave="mouseleaveLegendStake()">
                <div class="name">
                    <div class="color" style="background-color: #950FFF;"></div>
                    <span>{{ $t('message.account_charts_staked_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="currentData.total.staked < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.staked, 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.staked, store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>

                <div class="progress">
                    <div class="bar"><div style="background-color: #950FFF;" :style="setWidth(calcPercentsStake('staked'))"></div></div>
                </div>
            </div>


            <div class="legend" v-if="currentData.total.liquid_rewards" :class="{'active': chartActiveLegendStake == 1}" @mouseenter="mouseenterLegendStake(1)" @mouseleave="mouseleaveLegendStake()">
                <div class="name">
                    <div class="color" style="background-color: #0343E8;"></div>
                    <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="currentData.total.liquid_rewards < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.liquid_rewards, 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.liquid_rewards, store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>

                <div class="progress">
                    <div class="bar"><div style="background-color: #0343E8;" :style="setWidth(calcPercentsStake('liquid_rewards'))"></div></div>
                </div>
            </div>


            <div class="legend" v-if="currentData.total.unbonding" :class="{'active': chartActiveLegendStake == 2}" @mouseenter="mouseenterLegendStake(2)" @mouseleave="mouseleaveLegendStake()">
                <div class="name">
                    <div class="color" style="background-color: #EB5757;"></div>
                    <span>{{ $t('message.account_charts_unbonding_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="currentData.total.unbonding < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.unbonding, 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.unbonding, store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>

                <div class="progress">
                    <div class="bar"><div style="background-color: #EB5757;" :style="setWidth(calcPercentsStake('unbonding'))"></div></div>
                </div>
            </div>
        </div>
        </template>


        <template v-if="props.chartActive == 2">
        <div class="legends empty" v-if="!chartTotalLiquide">
            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>

            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>

            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>

            <div class="legend">
                <div class="name">
                    <span></span>
                </div>

                <div class="amount">
                    <span></span>
                </div>

                <div class="progress">
                    <div class="bar"><div></div></div>
                </div>
            </div>
        </div>

        <div class="legends" v-else>
            <div class="legend" v-if="currentData.total.liquid" :class="{'active': chartActiveLegendLiquide == 0}" @mouseenter="mouseenterLegendLiquide(0)" @mouseleave="mouseleaveLegendLiquide()">
                <div class="name">
                    <div class="color" style="background-color: #7879F1;"></div>
                    <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="currentData.total.liquid < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.liquid, 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.liquid, store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>
            </div>


            <div class="legend" v-if="currentData.total.ibc" :class="{'active': chartActiveLegendLiquide == 1}" @mouseenter="mouseenterLegendLiquide(1)" @mouseleave="mouseleaveLegendLiquide()">
                <div class="name" @click.prevent="toggleActiveClass">
                    <div class="color" style="background-color: #EF5DA8;"></div>
                    <span>{{ $t('message.account_charts_ibc_label') }}</span>

                    <!-- <svg class="arr"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg> -->
                </div>

                <div class="dropdown">
                    <!-- <pre>{{ currentNetwork.balance.liquid.ibc }}</pre> -->

                    <div class="tokens">
                        <div v-for="(item, index) in currentData.balance.liquid.ibc" :key="index" class="item">
                            <div class="logo">
                                <img :src="`${item.logo}`" alt="">

                                <div class="on_chain_logo">
                                    <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                                </div>
                            </div>

                            <div>
                                <div class="token">{{ item.symbol }}</div>

                                <div class="on_chain">
                                    {{ $t('message.account_charts_on_chain') }}
                                    {{ store.networks[store.currentNetwork].name }}
                                </div>
                            </div>

                            <div>
                                <div class="amount">
                                    <template v-if="item.symbol == 'BOOT'">
                                        <span v-if="(item.amount / Math.pow(10, item.exponent) / 1000000) < 0.01">&lt; 0.01</span>
                                        <span v-else>{{ $filters.toFixed(item.amount / Math.pow(10, item.exponent) / 1000000, 2) }}</span>
                                    </template>

                                    <template v-else>
                                        <span v-if="(item.amount / Math.pow(10, item.exponent)) < 0.01">&lt; 0.01</span>
                                        <span v-else>{{ $filters.toFixed(item.amount / Math.pow(10, item.exponent), 2) }}</span>
                                    </template>

                                    <span class="token" v-if="item.symbol == 'BOOT'">M{{ item.symbol }}</span>
                                    <span class="token" v-else>{{ item.symbol }}</span>

                                    <div class="price">
                                        <template v-if="(currencyСonversion(item.amount / Math.pow(10, item.exponent), item.symbol)) < 0.01">&lt; 0.01</template>
                                        <template v-else>{{ $filters.toFixed(currencyСonversion(item.amount / Math.pow(10, item.exponent), item.symbol), 2) }}</template>
                                        {{ store.currentCurrency }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="legend" v-if="currentData.total.rewards" :class="{'active': chartActiveLegendLiquide == 2}" @mouseenter="mouseenterLegendLiquide(2)" @mouseleave="mouseleaveLegendLiquide()">
                <div class="name">
                    <div class="color" style="background-color: #1BC562;"></div>
                    <span>{{ $t('message.account_charts_rewards_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="currentData.total.rewards < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.rewards, 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.rewards, store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>
            </div>
        </div>
        </template>
    </div>
</template>


<script setup>
    import { onBeforeMount, computed, reactive, ref, inject, watch } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { currencyСonversion } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    // Components
    import Avatar from '@/components/account/charts/Avatar.vue'

    ChartJS.register(ArcElement)


    const store = useGlobalStore(),
        props = defineProps(['chartActive']),
        emitter = inject('emitter')

    var chartStake = ref(null),
        chartDatasetsStake = [],
        chartActiveLegendStake = ref(null),
        chartTotalStake = ref(0),
        chartDataStake = ref({
            datasets: [{
                data: computed(() => chartDatasetsStake),
                backgroundColor: ['#950FFF', '#0343E8', '#EB5757'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#7700E1', '#3400D1', '#D74343'],
                hoverBorderColor: ['#7700E1', '#3400D1', '#D74343'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        }),
        chartOptionsStake = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            animation: {
                duration: 200
            },
            transitions: {
                active: {
                    animation: {
                        duration: 200
                    }
                }
            },
            onHover: (e, item) => {
                item.length
                    ? chartActiveLegendStake.value = item[0].index
                    : chartActiveLegendStake.value = null
            }
        }),

        chartLiquide = ref(null),
        chartDatasetsLiquide = [],
        chartActiveLegendLiquide = ref(null),
        chartTotalLiquide = ref(0),
        chartDataLiquide = ref({
            datasets: [{
                data: computed(() => chartDatasetsLiquide),
                backgroundColor: ['#7879F1', '#EF5DA8', '#1BC562'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#7879F1', '#EF5DA8', '#07B14E'],
                hoverBorderColor: ['#7879F1', '#EF5DA8', '#07B14E'],
                borderAlign: 'inner',
                cutout: '80%'
            }]
        }),
        chartOptionsLiquide = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            animation: {
                duration: 200
            },
            transitions: {
                active: {
                    animation: {
                        duration: 200
                    }
                }
            },
            onHover: (e, item) => {
                item.length
                    ? chartActiveLegendLiquide.value = item[0].index
                    : chartActiveLegendLiquide.value = null
            }
        }),

        currentData = ref({
            total: {
                staked: 0,
                unbonding: 0,
                liquid_rewards: 0,
                liquid: 0,
                rewards: 0,
                ibc: 0,
            },
            balance: {
                liquid: {
                    ibc: []
                }
            }
        })


    onBeforeMount(() => init())

    watch(computed(() => store.currentNetwork), () => {
        // Reset chart
        chartDatasetsStake = [],
        chartTotalStake = ref(0)

        chartDatasetsLiquide = [],
        chartTotalLiquide = ref(0)

        init()
    })


    function init() {
        if(store.account.currentWallet != 'all') {
            // Get current walllet
            let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)

            // Get current network
            currentData.value = currentWallet.networks.find(el => el.name == store.currentNetwork)
        } else {
            // Sum totals
            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    currentData.value.total.staked += network.total.staked,
                    currentData.value.total.unbonding += network.total.unbonding,
                    currentData.value.total.liquid_rewards += network.total.liquid_rewards

                    currentData.value.total.liquid += network.total.liquid,
                    currentData.value.total.ibc += network.total.ibc,
                    currentData.value.total.rewards += network.total.rewards

                    // Balance - Concat ibc tokens
                    if(network.balance.liquid.ibc != null) {
                        network.balance.liquid.ibc.forEach(el => {
                            let duplicate = currentData.value.balance.liquid.ibc.find(e => e.symbol == el.symbol)

                            duplicate
                                ? duplicate.amount += el.amount
                                : currentData.value.balance.liquid.ibc.push(el)
                        })
                    }
                }
            }
        }

        // Set charts data
        chartDatasetsStake.push(currentData.value.total.staked)
        chartDatasetsStake.push(currentData.value.total.liquid_rewards)
        chartDatasetsStake.push(currentData.value.total.unbonding)

        chartDatasetsLiquide.push(currentData.value.total.liquid)
        chartDatasetsLiquide.push(currentData.value.total.ibc)
        chartDatasetsLiquide.push(currentData.value.total.rewards)

        // Sum charts total
        chartTotalStake.value = currentData.value.total.staked + currentData.value.total.liquid_rewards + currentData.value.total.unbonding
        chartTotalLiquide.value = currentData.value.total.liquid + currentData.value.total.ibc + currentData.value.total.rewards
    }


    // Calc percents
    function calcPercentsStake(type) {
        let result = 0

        if(chartTotalStake.value) {
            result = currentData.value.total[type] / chartTotalStake.value * 100
        }

        return result
    }


    // Mouse enter on legend
    function mouseenterLegendStake(dataIndex) {
        let chartInstance = chartStake.value.chart

        chartActiveLegendStake.value = dataIndex

        chartInstance.setActiveElements([{
            datasetIndex: 0,
            index: dataIndex
        }])

        chartInstance.update()
    }


    // Mouse leave from legend
    function mouseleaveLegendStake() {
        let chartInstance = chartStake.value.chart

        chartActiveLegendStake.value = null

        chartInstance.setActiveElements([])
        chartInstance.update()
    }


    // Set width
    function setWidth(percents) {
        return `width: ${percents}%;`
    }


    // Mouse enter on legend
    function mouseenterLegendLiquide(dataIndex) {
        let chartInstance = chartLiquide.value.chart

        chartActiveLegendLiquide.value = dataIndex

        chartInstance.setActiveElements([{
            datasetIndex: 0,
            index: dataIndex
        }])

        chartInstance.update()
    }


    // Mouse leave from legend
    function mouseleaveLegendLiquide() {
        let chartInstance = chartLiquide.value.chart

        chartActiveLegendLiquide.value = null

        chartInstance.setActiveElements([])
        chartInstance.update()
    }


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.closest('.legend').classList.toggle('active')
    }
</script>


<style scoped>
    .chart_info
    {
        display: flex;
        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;
    }


    .block_title
    {
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;

        width: 100%;
        margin-bottom: 8px;
    }


    .block_desc
    {
        line-height: 110%;

        width: 100%;
        margin-bottom: 24px;

        color: #555;
    }


    .charts
    {
        position: relative;
        z-index: 3;

        width: 291px;
        max-width: 100%;
        height: 291px;

        border-radius: 50%;
        background: #0d0d0d;
        box-shadow: inset 0 0 0 18px rgba(255,255,255,.05);
    }


    .chartStake,
    .chartLiquide
    {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        cursor: pointer;

        border-radius: inherit;
    }

    .chartLiquide
    {
        z-index: 3;

        width: calc(100% - 44px);
        height: calc(100% - 44px);
        margin: auto;

        inset: 0;
    }

    .chartStake:after,
    .chartLiquide:after
    {
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';

        border-radius: inherit;
    }


    .chartStake.active:after,
    .chartLiquide.active:after
    {
        display: none;
    }


    .chart
    {
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        cursor: pointer;
        transition: opacity .2s linear;

        opacity: .2;
        border-radius: 50%;

        clip-path: circle(50% at 50% 50%);
    }

    .chartStake.active .chart,
    .chartLiquide.active .chart
    {
        opacity: 1;
    }



    .legends
    {
        width: calc(100% - 307px);
        margin-left: auto;
    }

    .legends > * + *
    {
        margin-top: 8px;
    }


    .legends .legend
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        padding: 6px 8px;

        transition: background .2s linear;

        border-radius: 10px;
    }


    .legends .legend .dropdown
    {
        /* display: none; */
        width: 100%;
        margin-top: 8px;
    }


    .legends .legend .name
    {
        font-size: 14px;
        line-height: 100%;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        color: #555;
    }


    .legends .legend .color
    {
        width: 10px;
        height: 10px;
        margin-right: 4px;

        border-radius: 50%;
    }


    .legends .legend .amount
    {
        font-size: 18px;
        font-weight: 600;
        line-height: 100%;

        margin-left: auto;

        text-align: right;
        white-space: nowrap;
        text-transform: uppercase;
    }

    .legends .legend .amount .token
    {
        margin-left: 4px;
    }


    .legends .legend .price
    {
        font-size: 12px;
        font-weight: 400;
        line-height: 100%;

        margin-top: 4px;

        white-space: nowrap;

        color: #555;
    }


    .legends .legend .progress
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        width: 100%;
        margin-top: 8px;
    }


    .legends .legend .bar
    {
        width: 100%;
        height: 8px;

        border-radius: 4px;
        background: #282828;
    }

    .legends .legend .bar div
    {
        width: 0;
        height: 8px;

        transition: width .4s linear;

        border-radius: 4px;
    }


    .legends .legend .tokens
    {
        margin-top: 8px;
    }


    .legends .legend .tokens .item
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        padding-top: 8px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }

    .legends .legend .tokens .item + .item
    {
        margin-top: 8px;
    }


    .legends .legend .tokens .item > *:last-child
    {
        margin-left: auto;
    }


    .legends .legend .tokens .token
    {
        font-size: 16px;
        font-weight: 500;
        line-height: 100%;

        white-space: nowrap;
    }


    .legends .legend .tokens .on_chain
    {
        font-size: 12px;
        line-height: 100%;

        margin-top: 4px;

        color: #555;
    }


    .legends .legend .tokens .logo
    {
        position: relative;

        width: 30px;
        height: 30px;
        margin-right: 11px;

        border-radius: 50%;
    }

    .legends .legend .tokens .logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .legends .legend .tokens .on_chain_logo
    {
        position: absolute;
        right: -3px;
        bottom: -5px;

        width: 16px;
        height: 16px;

        border: 1px solid #141414;
        border-radius: 50%;
    }


    .legends .legend.active
    {
        background: #141414;
    }



    .legends.empty .legend .name span,
    .legends.empty .legend .amount span
    {
        display: block;

        width: 80px;
        height: 14px;

        border-radius: 8px;
        background: #282828;
    }



    @media print, (max-width: 1599px)
    {
        .block_title
        {
            font-size: 19px;
            line-height: 23px;
        }


        .legends .legend .amount
        {
            font-size: 17px;
        }
    }



    @media print, (max-width: 1439px)
    {
        .block_title
        {
            font-size: 18px;
            line-height: 22px;
        }


        .charts
        {
            width: 272px;
            height: 272px;
        }


        .legends
        {
            width: calc(100% - 292px);
        }


        .legends .legend .amount
        {
            font-size: 16px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .charts
        {
            width: 291px;
            height: 291px;
        }

        .legends
        {
            width: calc(100% - 307px);
        }
    }



    @media print, (max-width: 767px)
    {
        .block_title
        {
            font-size: 17px;
            line-height: 21px;
        }


        .charts
        {
            margin-right: auto;
            margin-left: auto;
        }


        .legends
        {
            width: 100%;
            margin-top: 10px;
        }
    }



    @media print, (max-width: 479px)
    {
        .charts
        {
            width: 280px;
            height: 280px;
        }



        .legends .legend .amount
        {
            font-size: 15px;
        }
    }
</style>