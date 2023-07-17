<template>
    <div class="chart_info">
        <div class="block_title">{{ $t('message.account_chart_networks_block_title') }}</div>

        <div class="block_desc">{{ $t('message.account_chart_networks_desc') }}</div>


        <div class="chart">
            <Doughnut ref="chart" :data="chartData" :options="chartOptions" />

            <div class="total">
                <div class="label">
                    {{ $t('message.account_charts_total_assets') }}
                </div>

                <div class="price">
                    {{ $filters.toFixed(currencyСonversion(currentData.totalTokens / Math.pow(10, store.networks[store.currentNetwork].exponent), store.networks[store.currentNetwork].token_name), 2) }}
                    <span>{{ store.currentCurrency }}</span>
                </div>
            </div>
        </div>


        <div class="legends" :class="{ empty: !currentData.totalTokens }">
            <template v-if="!currentData.totalTokens">
            <div class="legend"></div>

            <div class="legend"></div>

            <div class="legend"></div>

            <div class="legend"></div>
            </template>

            <template v-else>
            <div v-for="(network, index) in currentData.networks" :key="index" class="legend" :class="{'active': chartActiveLegend == index}" @mouseenter="mouseenterLegend(index)" @mouseleave="mouseleaveLegend()">
                <div class="logo">
                    <img :src="`/${network.name}_logo.png`" alt="">
                </div>

                <div class="token">
                    {{ store.networks[network.name].name }}
                </div>

                <div class="price">
                    <div>{{ $filters.toFixed(calcPercents(network.totalTokens), 2) }}%</div>

                    <div class="percents">
                        {{ $filters.toFixed(currencyСonversion(network.totalTokens / Math.pow(10, store.networks[store.currentNetwork].exponent), store.networks[store.currentNetwork].token_name), 2) }}
                        {{ store.currentCurrency }}
                    </div>
                </div>
            </div>
            </template>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, computed, reactive, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { currencyСonversion } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement)


    const store = useGlobalStore(),
        chart = ref(null),
        chartDatasets = reactive([]),
        chartActiveLegend = ref(null),
        chartColors = reactive([]),
        chartData = computed(() => ({
            datasets: [{
                data: chartDatasets,
                backgroundColor: chartColors,
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: chartColors,
                hoverBorderColor: chartColors,
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
        currentData = ref({
            totalTokens: 0,
            networks: []
        })


    onBeforeMount(() => {
        if(store.account.currentWallet != 'all') {
            // Get current walllet data
            currentData.value = store.account.wallets.find(el => el.address == store.account.currentWallet)
        } else {
            // Sum data for chart
            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    let duplicate = currentData.value.networks.find(e => e.name == network.name)

                    if(duplicate) {
                        duplicate.totalTokens += network.totalTokens
                    } else {
                        currentData.value.networks.push({
                            name: network.name,
                            color: network.color,
                            totalTokens: network.totalTokens
                        })
                    }
                }
            }

            // Total tokens
            currentData.value.totalTokens = store.account.totalTokens
        }

        // Set data for chart
        currentData.value.networks.forEach(network => {
            chartDatasets.push(network.totalTokens)
            chartColors.push(network.color)
        })
    })


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


    // Calc percents
    function calcPercents(amount) {
        let result = 0

        if(currentData.value.totalTokens) {
            result = amount / currentData.value.totalTokens * 100
        }

        return result
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


    .chart .total
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 100%;

        text-align: center;
        white-space: nowrap;
        pointer-events: none;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .chart .total .label
    {
        width: 100%;
        margin-bottom: 8px;
    }


    .chart .total .price
    {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;
    }

    .chart .total .price.hide
    {
        display: none;
    }

    .chart .total .price span
    {
        font-size: 12px;
        font-weight: 400;
        line-height: 100%;

        margin-left: 4px;

        text-transform: uppercase;
    }



    .legends
    {
        width: calc(100% - 307px);
        margin-left: auto;
    }


    .legends .legend
    {
        display: flex;

        padding: 6px 8px;

        cursor: pointer;
        transition: background .2s linear;

        border-radius: 10px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .legends .legend + .legend
    {
        margin-top: 7px;
    }


    .legends .legend .logo
    {
        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .legends .legend .logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .legends .legend .token,
    .legends .legend .address
    {
        font-size: 14px;
        line-height: 100%;
    }

    .legends .legend .address
    {
        overflow: hidden;

        width: calc(100% - 140px);

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .legends .legend .price
    {
        font-size: 14px;
        line-height: 100%;

        margin-left: auto;

        text-align: right;
        white-space: nowrap;
    }


    .legends .legend .percents
    {
        color: #464646;
        font-size: 12px;
        line-height: 100%;

        margin-top: 4px;
    }


    .legends .legend:hover,
    .legends .legend.active
    {
        background: #212121;
    }


    .legends.empty .legend
    {
        height: 40px;

        border-radius: 8px;
        background: #282828;
    }

</style>