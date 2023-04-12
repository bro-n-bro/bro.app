<template>
    <div class="row">
        <div class="col_left">
            <div class="charts" v-if="chartActive != 3">
                <div class="avatar">
                    <img :src="store.account.avatar" alt="">

                    <router-link to="/account/passport" class="edit_link">
                        <div class="btn">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_settings"></use></svg>
                            <span>{{ $t('message.settings_btn') }}</span>
                        </div>
                    </router-link>
                </div>

                <div class="chart chartFirst" :class="{'active': chartActive == 1}" @click.prevent="chartActive = 1">
                    <Pie ref="chartFirst" :data="chartDataFirst" :options="chartOptionsFirst" v-if="chartDone" />
                </div>

                <div class="chart chartSecond" :class="{'active': chartActive == 2}" @click.prevent="chartActive = 2">
                    <Pie ref="chartSecond" :data="chartDataSecond" :options="chartOptionsSecond" v-if="chartDone" />
                </div>
            </div>


            <div class="charts" v-else>
                <div class="chart chartThird">
                    <Doughnut ref="chartThird" :data="chartDataThird" :options="chartOptionsThird" v-if="chartDone" />

                    <div class="total">
                        <div class="label">Total Assets</div>

                        <div class="amount">1,484.4047 <span>{{ store.networks[store.currentNetwork].token_name }}</span></div>

                        <div class="price">$56,875</div>
                    </div>
                </div>
            </div>


            <div class="bullets">
                <div class="row">
                    <button class="btn bullet" :class="{'active': chartActive == 1}" @click.prevent="chartActive = 1"></button>
                    <button class="btn bullet" :class="{'active': chartActive == 2}" @click.prevent="chartActive = 2"></button>
                    <button class="btn bullet" :class="{'active': chartActive == 3}" @click.prevent="chartActive = 3"></button>
                </div>
            </div>
        </div>


        <div class="col_main">
            <div class="legends" v-if="chartActive == 1">
                <div class="legend" v-if="accountBalance.staked">
                    <div class="name">
                        <div class="color" style="background-color: #950FFF;"></div>
                        <span>{{ $t('message.account_charts_staked_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ accountBalance.staked / store.networks[store.currentNetwork].exponent }} {{ store.networks[store.currentNetwork].token_name }}
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #950FFF;" :style="setWidth(calcPercentsChart1('staked'))"></div></div>
                        <div class="percents">{{ $filters.toFixed(calcPercentsChart1('staked'), 2) }}%</div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.liquid">
                    <div class="name">
                        <div class="color" style="background-color: #0343E8;"></div>
                        <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ accountBalance.liquid / store.networks[store.currentNetwork].exponent }} {{ store.networks[store.currentNetwork].token_name }}
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #0343E8;" :style="setWidth(calcPercentsChart1('liquid'))"></div></div>
                        <div class="percents">{{ $filters.toFixed(calcPercentsChart1('liquid'), 2) }}%</div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.unbonding">
                    <div class="name">
                        <div class="color" style="background-color: #EB5757;"></div>
                        <span>{{ $t('message.account_charts_unbonding_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ accountBalance.unbonding / store.networks[store.currentNetwork].exponent }} {{ store.networks[store.currentNetwork].token_name }}
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #EB5757;" :style="setWidth(calcPercentsChart1('unbonding'))"></div></div>
                        <div class="percents">{{ $filters.toFixed(calcPercentsChart1('unbonding'), 2) }}%</div>
                    </div>
                </div>
            </div>


            <div class="legends" v-if="chartActive == 2">
                <div class="legend inline" v-if="accountBalance.liquid">
                    <div class="name">
                        <div class="color" style="background-color: #7879F1;"></div>
                        <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ accountBalance.liquid / store.networks[store.currentNetwork].exponent }} {{ store.networks[store.currentNetwork].token_name }}
                    </div>
                </div>

                <!-- <div class="legend" v-if="accountBalance.outside"> -->
                    <div class="legend" v-if="accountBalance.outside">
                    <div class="name spoler_btn" @click.prevent="toggleActiveClass">
                        <div class="color" style="background-color: #C5811B;"></div>
                        <span>{{ $t('message.account_charts_outside_label') }}</span>

                        <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                    </div>

                    <div class="dropdown">
                        <div class="amount">
                            {{ accountBalance.outside / store.networks[store.currentNetwork].exponent }} {{ store.networks[store.currentNetwork].token_name }}
                        </div>

                        <div class="progress">
                            <div class="bar"><div style="background-color: #C5811B;" :style="setWidth(6)"></div></div>
                            <div class="percents">6%</div>
                        </div>

                        <div class="tokens">
                            <div class="item">
                                <div class="logo">
                                    <img :src="`/${store.currentNetwork}_logo.png`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/osmosis_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">{{ store.networks[store.currentNetwork].token_name }}</div>
                                    <div class="on_chain">On Osmosis</div>
                                </div>

                                <div>
                                    <div class="amount">360 {{ store.networks[store.currentNetwork].token_name }}</div>
                                    <div class="price">16,230$</div>
                                </div>
                            </div>

                            <div class="item">
                                <div class="logo">
                                    <img :src="`/${store.currentNetwork}_logo.png`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/stargaze_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">{{ store.networks[store.currentNetwork].token_name }}</div>
                                    <div class="on_chain">On Osmosis</div>
                                </div>

                                <div>
                                    <div class="amount">360 {{ store.networks[store.currentNetwork].token_name }}</div>
                                    <div class="price">16,230$</div>
                                </div>
                            </div>

                            <div class="item">
                                <div class="logo">
                                    <img :src="`/${store.currentNetwork}_logo.png`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/juno_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">{{ store.networks[store.currentNetwork].token_name }}</div>
                                    <div class="on_chain">On Osmosis</div>
                                </div>

                                <div>
                                    <div class="amount">360 {{ store.networks[store.currentNetwork].token_name }}</div>
                                    <div class="price">16,230$</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legend">
                    <div class="name spoler_btn" @click.prevent="toggleActiveClass">
                        <div class="color" style="background-color: #EF5DA8;"></div>
                        <span>{{ $t('message.account_charts_ibc_label') }}</span>

                        <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                    </div>

                    <div class="dropdown">
                        <div class="tokens">
                            <div class="item">
                                <div class="logo">
                                    <img :src="`/osmosis_logo.png`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">OSMO</div>
                                    <div class="on_chain">On {{ store.networks[store.currentNetwork].name }}</div>
                                </div>

                                <div>
                                    <div class="amount">360 OSMO</div>
                                    <div class="price">16,230$</div>
                                </div>
                            </div>

                            <div class="item">
                                <div class="logo">
                                    <img :src="`/desmos_logo.png`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">DSM</div>
                                    <div class="on_chain">On {{ store.networks[store.currentNetwork].name }}</div>
                                </div>

                                <div>
                                    <div class="amount">160 DSM</div>
                                    <div class="price">220$</div>
                                </div>
                            </div>

                            <div class="item">
                                <div class="logo">
                                    <img :src="`/stargaze_logo.png`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">STARS</div>
                                    <div class="on_chain">On {{ store.networks[store.currentNetwork].name }}</div>
                                </div>

                                <div>
                                    <div class="amount">140 STARS</div>
                                    <div class="price">200$</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legend inline" v-if="accountBalance.rewards">
                    <div class="name">
                        <div class="color" style="background-color: #1BC562;"></div>
                        <span>{{ $t('message.account_charts_rewards_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ accountBalance.rewards / store.networks[store.currentNetwork].exponent }} {{ store.networks[store.currentNetwork].token_name }}
                    </div>
                </div>
            </div>


            <div class="tokens_legends" v-if="chartActive == 3">
                <div class="legend" :class="{'active': chartThirdActiveLegend == 0}" @mouseenter="mouseenterLegend(0)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/cosmoshub_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.cosmoshub.token_name }}
                    </div>

                    <div class="amount">
                        <span>$46,875</span>
                        <span class="percents">(29.13%)</span>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 1}" @mouseenter="mouseenterLegend(1)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/osmosis_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.osmosis.token_name }}
                    </div>

                    <div class="amount">
                        <span>$7,200</span>
                        <span class="percents">(15.13%)</span>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 2}" @mouseenter="mouseenterLegend(2)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/juno_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.juno.token_name }}
                    </div>

                    <div class="amount">
                        <span>$1,200</span>
                        <span class="percents">(12.17%)</span>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 3}" @mouseenter="mouseenterLegend(3)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/evmos_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.evmos.token_name }}
                    </div>

                    <div class="amount">
                        <span>$976</span>
                        <span class="percents">(8.22%)</span>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 4}" @mouseenter="mouseenterLegend(4)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/gravity_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.gravity.token_name }}
                    </div>

                    <div class="amount">
                        <span>$880</span>
                        <span class="percents">(5.6%)</span>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 5}" @mouseenter="mouseenterLegend(5)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/stargaze_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.stargaze.token_name }}
                    </div>

                    <div class="amount">
                        <span>$550</span>
                        <span class="percents">(3.2%)</span>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 6}" @mouseenter="mouseenterLegend(6)" @mouseleave="mouseleaveLegend()">
                    <div class="logo">
                        <img :src="`/bostrom_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.bostrom.token_name }}
                    </div>

                    <div class="amount">
                        <span>$115</span>
                        <span class="percents">(2.%)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, reactive, ref, inject, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Pie, Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement)

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        chartDone = ref(false),
        chartActive = ref(1),
        chartFirst = ref(null),
        chartSecond = ref(null),
        chartThird = ref(null),
        chartThirdActiveLegend = ref(),
        chartOptionsFirst = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            // onHover: (e, item) => {
            //     item.length
            //         ? activeLegend.value = item[0].index + 1
            //         : activeLegend.value = null
            // }
        }),
        chartOptionsSecond = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            // onHover: (e, item) => {
            //     item.length
            //         ? activeLegend.value = item[0].index + 3
            //         : activeLegend.value = null
            // }
        }),
        chartOptionsThird = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            onHover: (e, item) => {
                item.length
                    ? chartThirdActiveLegend.value = item[0].index
                    : chartThirdActiveLegend.value = null
            }
        }),
        chartDatasetsFirst = reactive([]),
        chartDatasetsSecond = reactive([]),
        chartDatasetsThird = reactive([]),
        chartDataFirst = computed(() => ({
            labels: [
                i18n.global.t('message.account_charts_staked_label'),
                i18n.global.t('message.account_charts_liquid_tokens_label'),
                i18n.global.t('message.account_charts_unbonding_label')
            ],
            datasets: [{
                data: chartDatasetsFirst,
                backgroundColor: ['#950FFF', '#0343E8', '#EB5757'],
                borderColor: 'transparent',
                hoverOffset: 0,
                // hoverBackgroundColor: ['#7700E1', '#3400D1']
            }]
        })),
        chartDataSecond = computed(() => ({
            labels: [
                i18n.global.t('message.account_charts_liquid_tokens_label'),
                i18n.global.t('message.account_charts_outside_label'),
                i18n.global.t('message.account_charts_ibc_label'),
                i18n.global.t('message.account_charts_rewards_label')
            ],
            datasets: [{
                data: chartDatasetsSecond,
                backgroundColor: ['#7879F1', '#C5811B', '#EF5DA8', '#1BC562'],
                borderColor: 'transparent',
                hoverOffset: 0,
                // hoverBackgroundColor: ['#D17D00', '#D74343', '#07B14E']
            }]
        })),
        chartDataThird = computed(() => ({
            labels: ['Atom', 'Osmo', 'Juno', 'Evmos', 'Gravity', 'Star', 'Boot'],
            datasets: [{
                data: chartDatasetsThird,
                backgroundColor: ['#7879F1', '#C5811B', '#EF5DA8', '#1BC562', '#7879F1', '#C5811B', '#EF5DA8'],
                borderColor: 'transparent',
                hoverOffset: 0,
                cutout: '86%'
                // hoverBackgroundColor: ['#D17D00', '#D74343', '#07B14E']
            }]
        })),
        accountBalance = reactive({
            staked: 0,
            liquid: 0,
            unbonding: 0,
            outside: 0,
            rewards: 0,
            totalChartFirst: 0,
            totalChartSecond: 0
        })


    onBeforeMount(async () => {
        try {
            await fetch(`https://rpc.bronbro.io/account/account_balance/${generateAddress(store.networks[store.currentNetwork].mintscanAlias, store.account.moonPassportOwner)}`)
                .then(res => res.json())
                .then(response => {
                    // Set data for first chart
                    chartDatasetsFirst.push(response.staked.uatom)
                    chartDatasetsFirst.push(response.liquid.uatom)
                    chartDatasetsFirst.push(response.unbonding.uatom)

                    // Set data for second chart
                    chartDatasetsSecond.push(response.staked.uatom)
                    chartDatasetsSecond.push(response.outside.uatom)
                    chartDatasetsSecond.push(0)
                    chartDatasetsSecond.push(response.rewards.uatom)

                    // Set data for third chart
                    chartDatasetsThird.push(10)
                    chartDatasetsThird.push(10)
                    chartDatasetsThird.push(10)
                    chartDatasetsThird.push(10)
                    chartDatasetsThird.push(10)
                    chartDatasetsThird.push(10)
                    chartDatasetsThird.push(10)

                    // Set data
                    accountBalance.staked = response.staked.uatom
                    accountBalance.liquid = response.liquid.uatom
                    accountBalance.unbonding = response.unbonding.uatom
                    accountBalance.outside = response.outside.uatom
                    accountBalance.rewards = response.rewards.uatom

                    // Calc totals
                    accountBalance.totalChartFirst = response.staked.uatom + response.liquid.uatom + response.unbonding.uatom

                    // Set charts status
                    chartDone.value = true
                })
        } catch (error) {
            console.log(error)
        }
    })


    // Set width
    function setWidth(percents) {
        return `width: ${percents}%;`
    }


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.closest('.legend').classList.toggle('active')
    }


    // Mouse enter on legend for third chart
    function mouseenterLegend(dataIndex) {
        let chartInstance = chartThird.value.chart

        chartThirdActiveLegend.value = dataIndex

        chartInstance.setActiveElements([{
            datasetIndex: 0,
            index: dataIndex
        }])

        chartInstance.update()
    }


    // Mouse leave from legend for first chart
    function mouseleaveLegend() {
        let chartInstance = chartThird.value.chart

        chartThirdActiveLegend.value = null

        chartInstance.setActiveElements([])
        chartInstance.update()
    }


    // Calc percents
    function calcPercentsChart1(type) {
        let result = 0

        if(accountBalance.totalChartFirst) {
            result = accountBalance[type] / accountBalance.totalChartFirst * 100
        }

        return result
    }
</script>


<style scoped>
    .col_left
    {
        width: 291px;
        max-width: 100%;
    }

    .col_main
    {
        width: calc(100% - 307px);
        margin-left: auto;
    }



    .charts
    {
        position: relative;

        width: 291px;
        max-width: 100%;
        height: 291px;
    }


    .chart
    {
        position: absolute !important;
        z-index: 1;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        cursor: pointer;

        border-radius: 50%;

        clip-path: circle(50% at 50% 50%);
    }

    .chart.chartSecond
    {
        z-index: 3;

        width: calc(100% - 40px);
        height: calc(100% - 40px);
        margin: auto;

        inset: 0;
    }

    .chart.chartThird
    {
        cursor: default;
    }

    .chart:after
    {
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';
        transition: opacity .2s linear;
        pointer-events: none;

        opacity: .8;
        background: #000;
    }

    .chart.active:after,
    .chart.chartThird:after
    {
        opacity: 0;
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


    .chart .total .amount
    {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;
    }

    .chart .total .amount span
    {
        font-size: 12px;
        line-height: 100%;

        text-transform: uppercase;
    }


    .chart .total .price
    {
        width: 100%;
        margin-top: 4px;
    }



    .bullets
    {
        display: flex;

        margin-top: 16px;
    }


    .bullets .row
    {
        display: flex;

        margin: 0 auto;
        padding: 8px;

        border-radius: 12px;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .bullets .bullet
    {
        width: 10px;
        height: 10px;

        transition: background .2s linear;

        border-radius: 50%;
        background: #464646;
    }

    .bullets .bullet + .bullet
    {
        margin-left: 8px;
    }

    .bullets .bullet:hover,
    .bullets .bullet.active
    {
        background: #fff;
    }



    .legends > * + *
    {
        margin-top: 8px;
    }


    .legends .legend
    {
        padding: 8px;

        border-radius: 10px;
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

    .legends .legend .name.spoler_btn
    {
        cursor: pointer;
    }

    .legends .legend .color
    {
        width: 10px;
        height: 10px;
        margin-right: 4px;

        border-radius: 50%;
    }


    .legends .legend .arr
    {
        color: #fff;

        display: block;

        width: 24px;
        height: 24px;
        margin-left: auto;

        transition: transform .2s linear;
    }


    .legends .legend .dropdown
    {
        display: none;
    }


    .legends .legend .amount
    {
        font-size: 18px;
        font-weight: 600;
        line-height: 100%;

        margin-top: 10px;

        text-transform: uppercase;
    }


    .legends .legend .progress
    {
        display: flex;

        margin-top: 8px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .legends .legend .bar
    {
        width: calc(100% - 60px);
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


    .legends .legend .percents
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 100%;

        width: 52px;
        margin-left: auto;

        text-align: right;
        white-space: nowrap;
    }


    .legends .legend .tokens
    {
        margin-top: 8px;
    }


    .legends .legend .tokens .item
    {
        display: flex;

        padding-top: 8px;

        border-top: 1px solid rgba(255, 255, 255, .05);

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        color: #555;
        font-size: 12px;
        line-height: 100%;

        margin-top: 4px;
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
        background: #fff;
    }




    .legends .legend .tokens .amount
    {
        font-size: 16px;
        font-weight: 400;

        margin: 0;

        text-align: right;
        white-space: nowrap;
    }


    .legends .legend .tokens .price
    {
        color: #555;
        font-size: 12px;
        line-height: 100%;

        margin-top: 4px;

        text-align: right;
        white-space: nowrap;
    }


    .legends .legend.inline
    {
        display: flex;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .legends .legend.inline .amount
    {
        margin-top: 0;
        margin-left: auto;
    }


    .legends .legend.active .arr
    {
        transform: rotate(180deg);
    }

    .legends .legend.active .dropdown
    {
        display: block;
    }



    .tokens_legends .legend
    {
        display: flex;

        padding: 8px;

        cursor: pointer;
        transition: background .2s linear;

        border-radius: 10px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .tokens_legends .legend + .legend
    {
        margin-top: 8px;
    }


    .tokens_legends .legend .logo
    {
        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .tokens_legends .legend .logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .tokens_legends .legend .token
    {
        font-size: 14px;
        line-height: 100%;
    }


    .tokens_legends .legend .amount
    {
        font-size: 14px;
        line-height: 100%;

        margin-left: auto;

        white-space: nowrap;
    }


    .tokens_legends .legend .percents
    {
        color: #555;

        margin-left: 4px;
    }


    .tokens_legends .legend:hover,
    .tokens_legends .legend.active
    {
        background: #212121;
    }



    .avatar
    {
        position: absolute;
        z-index: 9;

        width: 203px;
        height: 203px;
        margin: auto;

        border-radius: 50%;

        inset: 0;
    }


    .avatar img
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


    .avatar .edit_link
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

    .avatar .edit_link .btn
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

    .avatar .edit_link .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    .avatar .edit_link:hover
    {
        opacity: 1;
    }

</style>