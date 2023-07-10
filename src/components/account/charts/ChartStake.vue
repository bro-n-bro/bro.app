<template>
    <div class="chart_info">
        <div class="block_title">
            {{ $t('message.account_chart_stake_block_title') }}
        </div>

        <div class="block_desc">
            {{ $t('message.account_chart_stake_desc') }}
        </div>


        <div class="chart">
            <Avatar />

            <Doughnut ref="chart" :data="chartData" :options="chartOptions" />
        </div>


        <div class="legends empty" v-if="!chartTotal">
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
            <div class="legend" v-if="currentData.total.staked" :class="{'active': chartActiveLegend == 0}" @mouseenter="mouseenterLegend(0)" @mouseleave="mouseleaveLegend()">
                <div class="name">
                    <div class="color" style="background-color: #950FFF;"></div>
                    <span>{{ $t('message.account_charts_staked_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="(currentData.total.staked / Math.pow(10, store.networks[store.currentNetwork].exponent)) < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.staked / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.staked / Math.pow(10, store.networks[store.currentNetwork].exponent), store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>

                <div class="progress">
                    <div class="bar"><div style="background-color: #950FFF;" :style="setWidth(calcPercents('staked'))"></div></div>
                </div>
            </div>


            <div class="legend" v-if="currentData.total.liquid_rewards" :class="{'active': chartActiveLegend == 1}" @mouseenter="mouseenterLegend(1)" @mouseleave="mouseleaveLegend()">
                <div class="name">
                    <div class="color" style="background-color: #0343E8;"></div>
                    <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="(currentData.total.liquid_rewards / Math.pow(10, store.networks[store.currentNetwork].exponent)) < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.liquid_rewards / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.liquid_rewards / Math.pow(10, store.networks[store.currentNetwork].exponent), store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>

                <div class="progress">
                    <div class="bar"><div style="background-color: #0343E8;" :style="setWidth(calcPercents('liquid_rewards'))"></div></div>
                </div>
            </div>


            <div class="legend" v-if="currentData.total.unbonding" :class="{'active': chartFirstActiveLegend == 2}" @mouseenter="mouseenterLegend(2)" @mouseleave="mouseleaveLegend()">
                <div class="name">
                    <div class="color" style="background-color: #EB5757;"></div>
                    <span>{{ $t('message.account_charts_unbonding_label') }}</span>
                </div>

                <div class="amount">
                    <template v-if="(currentData.total.unbonding / Math.pow(10, store.networks[store.currentNetwork].exponent)) < 0.01">&lt; 0.01</template>
                    <template v-else>{{ $filters.toFixed(currentData.total.unbonding / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}</template>

                    {{ store.networks[store.currentNetwork].token_name }}

                    <div class="price">
                        {{ $filters.toFixed(currencyСonversion(currentData.total.unbonding / Math.pow(10, store.networks[store.currentNetwork].exponent), store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>

                <div class="progress">
                    <div class="bar"><div style="background-color: #EB5757;" :style="setWidth(calcPercents('unbonding'))"></div></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, computed, reactive, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { currencyСonversion } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    // Components
    import Avatar from '@/components/account/charts/Avatar.vue'

    ChartJS.register(ArcElement)


    const store = useGlobalStore(),
        chart = ref(null),
        chartDatasets = reactive([]),
        chartActiveLegend = ref(null),
        chartTotal = ref(0),
        chartData = computed(() => ({
            datasets: [{
                data: chartDatasets,
                backgroundColor: ['#950FFF', '#0343E8', '#EB5757'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#7700E1', '#3400D1', '#D74343'],
                hoverBorderColor: ['#7700E1', '#3400D1', '#D74343'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        chartOptions = reactive({
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
                    ? chartActiveLegend.value = item[0].index
                    : chartActiveLegend.value = null
            }
        }),
        currentWallet = ref({}),
        currentData = ref({
            total: {
                staked: 0,
                unbonding: 0,
                liquid_rewards: 0
            }
        })


    onBeforeMount(() => {
        if(store.account.currentWallet != 'all') {
            // Get current walllet data
            currentWallet.value = store.account.wallets.find(el => el.address == store.account.currentWallet)

            // Get current data
            currentData.value = currentWallet.value.networks.find(el => el.name == 'cosmoshub')
        } else {
            // Sum totals
            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    currentData.value.total.staked += network.total.staked,
                    currentData.value.total.unbonding += network.total.unbonding,
                    currentData.value.total.liquid_rewards += network.total.liquid_rewards
                }
            }
        }

        // Set chart data
        chartDatasets.push(currentData.value.total.staked)
        chartDatasets.push(currentData.value.total.liquid_rewards)
        chartDatasets.push(currentData.value.total.unbonding)

        // Sum chart total
        chartTotal.value = currentData.value.total.staked + currentData.value.total.liquid_rewards + currentData.value.total.unbonding
    })


    // Calc percents
    function calcPercents(type) {
        let result = 0

        if(chartTotal.value) {
            result = currentData.value.total[type] / chartTotal.value * 100
        }

        return result
    }


    // Mouse enter on legend
    function mouseenterLegend(dataIndex) {
        let chartInstance = chart.value.chart

        chartActiveLegend.value = dataIndex

        chartInstance.setActiveElements([{
            datasetIndex: 0,
            index: dataIndex
        }])

        chartInstance.update()
    }


    // Mouse leave from legend
    function mouseleaveLegend() {
        let chartInstance = chart.value.chart

        chartActiveLegend.value = null

        chartInstance.setActiveElements([])
        chartInstance.update()
    }


    // Set width
    function setWidth(percents) {
        return `width: ${percents}%;`
    }
</script>


<style scoped>
    .chart_info
    {
        display: flex;

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
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
        color: #555;
        line-height: 110%;

        width: 100%;
        margin-bottom: 24px;
    }



    .chart
    {
        position: relative;

        width: 291px;
        max-width: 100%;
        height: 291px;

        border-radius: 50%;
        background: #0d0d0d;

        clip-path: circle(50% at 50% 50%);
    }

    .chart:before
    {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';

        border: 14px solid #282828;
        border-radius: 50%;
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

        padding: 6px 8px;

        transition: background .2s linear;

        border-radius: 10px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .legends .legend .name
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        color: #555;
        font-size: 12px;
        font-weight: 400;
        line-height: 100%;

        margin-top: 4px;

        white-space: nowrap;
    }


    .legends .legend .progress
    {
        display: flex;

        width: 100%;
        margin-top: 8px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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

</style>