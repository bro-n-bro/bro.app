<template>
    <div class="chart_info">
        <div class="block_title">{{ $t('message.account_chart_assets_block_title') }}</div>

        <div class="block_desc">{{ $t('message.account_chart_assets_desc') }}</div>


        <div class="chart">
            <Doughnut ref="chart" :data="chartData" :options="chartOptions" v-if="!chartLoading" />

            <div class="total">
                <div class="label">
                    {{ $t('message.account_charts_total_assets') }}
                </div>

                <div class="price">
                    {{ $filters.toFixed(currentData.totalTokensPrice, 2) }}<span>{{ store.currentCurrency }}</span>
                </div>
            </div>
        </div>


        <div class="legends" :class="{ empty: !currentData.totalTokensPrice }">
            <template v-if="!currentData.totalTokensPrice">
            <div class="legend"></div>

            <div class="legend"></div>

            <div class="legend"></div>

            <div class="legend"></div>
            </template>

            <template v-else>
            <div v-for="(item, index) in currentData.groupByDenom" :key="index" class="legend" :class="{'active': chartActiveLegend == index}" @mouseenter="mouseenterLegend(index)" @mouseleave="mouseleaveLegend()">
                <div class="logo">
                    <img :src="item.logo" alt="">
                </div>

                <div class="token">
                    {{ item.symbol }}
                </div>

                <div class="price">
                    <div>
                        <template v-if="(currencyСonversion(item.symbol == 'BOOT' ? item.amount / Math.pow(10, store.networks.bostrom.exponent) : item.amount, item.symbol)) < 0.01">&lt; 0.01</template>

                        <template v-else>{{ $filters.toFixed(currencyСonversion(item.symbol == 'BOOT' ? item.amount / Math.pow(10, store.networks.bostrom.exponent) : item.amount, item.symbol), 2) }}</template>

                        {{ store.currentCurrency }}
                    </div>

                    <div class="percents">
                        {{ $filters.toFixed(calcPercents(item.symbol), 2) }}%
                    </div>
                </div>
            </div>
            </template>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, computed, reactive, ref, watch } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { currencyСonversion } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement)


    const store = useGlobalStore()

    var chart = ref(null),
        chartLoading = ref(true),
        chartDatasets = reactive([]),
        chartActiveLegend = ref(null),
        chartColors = reactive([]),
        chartTotal = ref(0),
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
        currentData = ref({})


    onBeforeMount(() => init())

    watch(computed(() => store.currentNetwork), () => {
        // Reset chart
        chartLoading.value = true

        chartDatasets = reactive([])
        chartColors = reactive([])

        init()
    })


    // Init
    function init() {
        if(store.account.currentWallet != 'all') {
            // Get current walllet data
            let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)

            // Get current data
            currentData.value = currentWallet.networks.find(el => el.name == store.currentNetwork)
        } else {
            let allGroupByDenom = []

            // Group by denom
            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    // Calc if one network
                    if (store.currentNetwork != 'all' && network.name == store.currentNetwork) {
                        network.groupByDenom.forEach(el => {
                            let duplicate = allGroupByDenom.find(e => e.symbol == el.symbol)

                            if(duplicate) {
                                duplicate.amount += el.amount
                                duplicate.amountCurrentDenom += el.amountCurrentDenom
                            } else {
                                allGroupByDenom.push({
                                    'amount': el.amount,
                                    'amountCurrentDenom': el.amountCurrentDenom,
                                    'logo': el.logo,
                                    'symbol': el.symbol
                                })
                            }
                        })
                    }
                }
            }

            // Sort data
            allGroupByDenom.sort((a, b) => {
                if (a.amountCurrentDenom > b.amountCurrentDenom) { return -1 }
                if (a.amountCurrentDenom < b.amountCurrentDenom) { return 1 }
                return 0
            })

            // Set data
            currentData.value.groupByDenom = allGroupByDenom

            // Total tokens
            currentData.value.totalTokensPrice = store.account.totalTokensPrice
        }

        // Set data for chart
        currentData.value.groupByDenom.forEach(el => {
            chartDatasets.push(el.amountCurrentDenom)

            let color = store.networkColors[el.symbol]

            if(el.symbol.substring(0, 2) == 'st') {
                color = store.networkColors.STRD
            }

            if(el.symbol.substring(0, 3) == 'stk') {
                color = store.networkColors.XPRT
            }

            if(el.symbol.substring(0, 1) == 'q') {
                color = store.networkColors.QCK
            }

            chartColors.push(color)
        })

        // Sum chart total
        currentData.value.groupByDenom.forEach(el => chartTotal.value += el.amountCurrentDenom)

        // Show chart
        chartLoading.value = false
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


    // Calc percents
    function calcPercents(symbol) {
        let result = 0,
            token = currentData.value.groupByDenom.find(e => e.symbol == symbol)

        if(currentData.value.totalTokensPrice) {
            result = currencyСonversion(token.symbol == 'BOOT' ? token.amount / Math.pow(10, store.networks.bostrom.exponent) : token.amount, token.symbol) / currentData.value.totalTokensPrice * 100
        }

        return result
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
        font-size: 14px;
        line-height: 100%;

        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 100%;
        height: 100%;

        text-align: center;
        white-space: nowrap;
        pointer-events: none;

        color: #555;
    }


    .chart .total .label
    {
        width: 100%;
        margin-bottom: 8px;
    }


    .chart .total .price
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;

        color: #fff;
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
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        padding: 6px 8px;

        cursor: pointer;
        transition: background .2s linear;

        border-radius: 10px;
        background: #141414;
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
        font-size: 12px;
        line-height: 100%;

        margin-top: 4px;

        color: #464646;
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


        .chart
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
        .chart
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


        .chart
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
        .chart
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