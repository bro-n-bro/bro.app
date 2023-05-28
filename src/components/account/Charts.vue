<template>
    <div class="row">
        <div class="tabs">
            <button class="btn" :class="{'active': chartActive == 1}" @click.prevent="chartActive = 1" @mouseover="emitter.emit('setNotification', $t('message.account_charts_tab1_notice'))">
                {{ $t('message.account_charts_tab1') }}
            </button>

            <button class="btn" :class="{'active': chartActive == 2}" @click.prevent="chartActive = 2" @mouseover="emitter.emit('setNotification', $t('message.account_charts_tab2_notice'))">
                {{ $t('message.account_charts_tab2') }}
            </button>

            <button class="btn" :class="{'active': chartActive == 5}" @click.prevent="chartActive = 5" @mouseover="emitter.emit('setNotification', $t('message.account_charts_tab5_notice'))">
                {{ $t('message.account_charts_tab5') }}
            </button>

            <button class="btn" :class="{'active': chartActive == 3}" @click.prevent="chartActive = 3" @mouseover="emitter.emit('setNotification', $t('message.account_charts_tab3_notice'))">
                {{ $t('message.account_charts_tab3') }}
            </button>

            <button class="btn" :class="{'active': chartActive == 4}" @click.prevent="chartActive = 4" @mouseover="emitter.emit('setNotification', $t('message.account_charts_tab4_notice'))">
                {{ $t('message.account_charts_tab4') }}
            </button>
        </div>


        <div class="loader_wrap" v-if="loading">
            <div class="loader"><span></span></div>
        </div>

        <template v-else>
        <template v-if="chartActive == 1">
        <div class="block_title">{{ $t('message.account_charts_block_title1') }}</div>

        <div class="block_desc">{{ $t('message.account_charts_desc1') }}</div>
        </template>

        <template v-if="chartActive == 2">
        <div class="block_title">{{ $t('message.account_charts_block_title2') }}</div>

        <div class="block_desc">{{ $t('message.account_charts_desc2') }}</div>
        </template>

        <template v-if="chartActive == 5">
        <div class="block_title">{{ $t('message.account_charts_block_title5') }}</div>

        <div class="block_desc">{{ $t('message.account_charts_desc5') }}</div>
        </template>

        <template v-if="chartActive == 3">
        <div class="block_title">{{ $t('message.account_charts_block_title3') }}</div>

        <div class="block_desc">{{ $t('message.account_charts_desc3') }}</div>
        </template>

        <template v-if="chartActive == 4">
        <div class="block_title">{{ $t('message.account_charts_block_title4') }}</div>

        <div class="block_desc">{{ $t('message.account_charts_desc4') }}</div>
        </template>


        <div class="col_left">
            <div class="charts" v-if="chartActive == 1 || chartActive == 2">
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
                    <Doughnut ref="chartFirst" :data="chartDataFirst" :options="chartOptionsFirst" />
                </div>

                <div class="chart chartSecond" :class="{'active': chartActive == 2}" @click.prevent="chartActive = 2">
                    <Doughnut ref="chartSecond" :data="chartDataSecond" :options="chartOptionsSecond" />
                </div>
            </div>

            <div class="charts" v-if="chartActive == 3">
                <div class="chart chartThird active">
                    <Doughnut ref="chartThird" :data="chartDataThird" :options="chartOptionsThird" />

                    <div class="total">
                        <div class="label">{{ $t('message.account_charts_total_assets') }}</div>

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((totalChartThird / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((totalChartThird / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((totalChartThird / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((totalChartThird / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            <span>{{ store.currency }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="charts" v-if="chartActive == 4">
                <div class="chart chartFourth active">
                    <Doughnut ref="chartFourth" :data="chartDataFourth" :options="chartOptionsFourth" />

                    <div class="total">
                        <div class="label">{{ $t('message.account_charts_total_assets') }}</div>

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed(currentWallet.totalPrice_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed(currentWallet.totalPrice_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed(currentWallet.totalPrice_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed(currentWallet.totalPrice_btc, 5) }}
                            </template>

                            <span>{{ store.currency }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="charts" v-if="chartActive == 5">
                <div class="chart chartFifth active">
                    <Doughnut ref="chartFifth" :data="chartDataFifth" :options="chartOptionsFifth" />

                    <div class="total">
                        <div class="label">{{ $t('message.account_charts_total_assets') }}</div>
                        <div class="price" v-if="(typeof chartFifthActiveLegend == 'undefined' || typeof chartFifthActiveLegend == 'object')">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed(store.account.totalPrice_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed(store.account.totalPrice_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed(store.account.totalPrice_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed(store.account.totalPrice_btc, 5) }}
                            </template>

                            <span>{{ store.currency }}</span>
                        </div>

                        <template v-for="(wallet, index) in store.account.wallets" :key="index">
                            <div class="price" v-if="chartFifthActiveLegend == index">
                                <template v-if="store.currency == 'USDT'">
                                {{ $filters.toFixed(wallet.totalPrice_usdt, 2) }}
                                </template>

                                <template v-if="store.currency == 'ATOM'">
                                {{ $filters.toFixed(wallet.totalPrice_atom, 2) }}
                                </template>

                                <template v-if="store.currency == 'ETH'">
                                {{ $filters.toFixed(wallet.totalPrice_eth, 4) }}
                                </template>

                                <template v-if="store.currency == 'BTC'">
                                {{ $filters.toFixed(wallet.totalPrice_btc, 5) }}
                                </template>

                                <span>{{ store.currency }}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>


        <div class="col_main">
            <div class="legends" v-if="chartActive == 1">
                <div class="legend" v-if="currentNetwork.total.staked" :class="{'active': chartFirstActiveLegend == 0}" @mouseenter="mouseenterLegend('chartFirst', 0)" @mouseleave="mouseleaveLegend('chartFirst')">
                    <div class="name">
                        <div class="color" style="background-color: #950FFF;"></div>
                        <span>{{ $t('message.account_charts_staked_label') }}</span>
                    </div>

                    <div class="amount">
                        <template v-if="(currentNetwork.total.staked / currentNetwork.exponent) < 0.01">&lt; 0.01</template>
                        <template v-else>{{ $filters.toFixed(currentNetwork.total.staked / currentNetwork.exponent, 2) }}</template>
                        {{ currentNetwork.token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((currentNetwork.total.staked / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((currentNetwork.total.staked / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((currentNetwork.total.staked / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((currentNetwork.total.staked / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #950FFF;" :style="setWidth(calcPercentsChart1('staked'))"></div></div>
                    </div>
                </div>

                <div class="legend" v-if="currentNetwork.total.liquid_rewards" :class="{'active': chartFirstActiveLegend == 1}" @mouseenter="mouseenterLegend('chartFirst', 1)" @mouseleave="mouseleaveLegend('chartFirst')">
                    <div class="name">
                        <div class="color" style="background-color: #0343E8;"></div>
                        <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                    </div>

                    <div class="amount">
                        <template v-if="(currentNetwork.total.liquid_rewards / currentNetwork.exponent) < 0.01">&lt; 0.01</template>
                        <template v-else>{{ $filters.toFixed(currentNetwork.total.liquid_rewards / currentNetwork.exponent, 2) }}</template>
                        {{ currentNetwork.token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((currentNetwork.total.liquid_rewards / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((currentNetwork.total.liquid_rewards / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((currentNetwork.total.liquid_rewards / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((currentNetwork.total.liquid_rewards / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #0343E8;" :style="setWidth(calcPercentsChart1('liquid_rewards'))"></div></div>
                    </div>
                </div>

                <div class="legend" v-if="currentNetwork.total.unbonding" :class="{'active': chartFirstActiveLegend == 2}" @mouseenter="mouseenterLegend('chartFirst', 2)" @mouseleave="mouseleaveLegend('chartFirst')">
                    <div class="name">
                        <div class="color" style="background-color: #EB5757;"></div>
                        <span>{{ $t('message.account_charts_unbonding_label') }}</span>
                    </div>

                    <div class="amount">
                        <template v-if="(currentNetwork.total.unbonding / currentNetwork.exponent) < 0.01">&lt; 0.01</template>
                        <template v-else>{{ $filters.toFixed(currentNetwork.total.unbonding / currentNetwork.exponent, 2) }}</template>
                        {{ currentNetwork.token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((currentNetwork.total.unbonding / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((currentNetwork.total.unbonding / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((currentNetwork.total.unbonding / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((currentNetwork.total.unbonding / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #EB5757;" :style="setWidth(calcPercentsChart1('unbonding'))"></div></div>
                    </div>
                </div>
            </div>


            <div class="legends" v-if="chartActive == 2">
                <div class="legend" v-if="currentNetwork.total.liquid" :class="{'active': chartSecondActiveLegend == 0}" @mouseenter="mouseenterLegend('chartSecond', 0)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name">
                        <div class="color" style="background-color: #7879F1;"></div>
                        <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                    </div>

                    <div class="amount">
                        <template v-if="(currentNetwork.total.liquid / currentNetwork.exponent) < 0.01">&lt; 0.01</template>
                        <template v-else>{{ $filters.toFixed(currentNetwork.total.liquid / currentNetwork.exponent, 2) }}</template>
                        {{ currentNetwork.token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((currentNetwork.total.liquid / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((currentNetwork.total.liquid / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((currentNetwork.total.liquid / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((currentNetwork.total.liquid / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>
                </div>


                <div class="legend" v-if="currentNetwork.total.ibc" :class="{'active': chartSecondActiveLegend == 1}" @mouseenter="mouseenterLegend('chartSecond', 1)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name" @click.prevent="toggleActiveClass">
                        <div class="color" style="background-color: #EF5DA8;"></div>
                        <span>{{ $t('message.account_charts_ibc_label') }}</span>

                        <!-- <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg> -->
                    </div>

                    <div class="dropdown">
                        <!-- <pre>{{ currentNetwork.balance.liquid.ibc }}</pre> -->

                        <div class="tokens">
                            <div v-for="(item, index) in currentNetwork.balance.liquid.ibc" :key="index" class="item">
                                <div class="logo">
                                    <img :src="`${item.logo}`" alt="">

                                    <div class="on_chain_logo">
                                        <img :src="`/${currentNetwork.name}_logo.png`" alt="">
                                    </div>
                                </div>

                                <div>
                                    <div class="token">{{ item.symbol }}</div>

                                    <div class="on_chain">
                                        {{ $t('message.account_charts_on_chain') }} {{ store.networks[currentNetwork.name].name }}
                                    </div>
                                </div>

                                <div>
                                    <div class="amount">
                                        <template v-if="(item.amount / Math.pow(10, item.exponent)) < 0.01">&lt; 0.01</template>
                                        <template v-else>{{ $filters.toFixed(item.amount / Math.pow(10, item.exponent), 2) }}</template>
                                        {{ item.symbol }}

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((item.amount / Math.pow(10, item.exponent)) * item.price_usdt, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((item.amount / Math.pow(10, item.exponent)) * item.price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((item.amount / Math.pow(10, item.exponent)) * item.price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((item.amount / Math.pow(10, item.exponent)) * item.price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="legend" v-if="currentNetwork.total.rewards" :class="{'active': chartSecondActiveLegend == 2}" @mouseenter="mouseenterLegend('chartSecond', 2)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name">
                        <div class="color" style="background-color: #1BC562;"></div>
                        <span>{{ $t('message.account_charts_rewards_label') }}</span>
                    </div>

                    <div class="amount">
                        <template v-if="(currentNetwork.total.rewards / currentNetwork.exponent) < 0.01">&lt; 0.01</template>
                        <template v-else>{{ $filters.toFixed(currentNetwork.total.rewards / currentNetwork.exponent, 5) }}</template>
                        {{ currentNetwork.token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((currentNetwork.total.rewards / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((currentNetwork.total.rewards / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((currentNetwork.total.rewards / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((currentNetwork.total.rewards / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>
                </div>
            </div>


            <div class="legends2" v-if="chartActive == 3">
                <div v-for="(item, index) in currentNetwork.balance.groupByDenom" :key="index" class="legend" :class="{'active': chartThirdActiveLegend == index}" @mouseenter="mouseenterLegend('chartThird', index)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="item.logo" alt="">
                    </div>

                    <div class="token">
                        {{ item.symbol }}
                    </div>

                    <div class="price">
                        <div>
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((item.amount / currentNetwork.exponent) * currentNetwork.price_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((item.amount / currentNetwork.exponent) * currentNetwork.price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((item.amount / currentNetwork.exponent) * currentNetwork.price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((item.amount / currentNetwork.exponent) * currentNetwork.price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>

                        <div class="percents">
                            {{ $filters.toFixed(calcPercentsChart3(item.symbol), 2) }}%
                        </div>
                    </div>
                </div>
            </div>


            <div class="legends2" v-if="chartActive == 4">
                <div v-for="(network, index) in currentWallet.networks" :key="index" class="legend" :class="{'active': chartFourthActiveLegend == index}" @mouseenter="mouseenterLegend('chartFourth', index)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/${network.name}_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks[network.name].name }}
                    </div>

                    <div class="price">
                        <div>{{ $filters.toFixed(calcPercentsChart4(network.totalPrice_usdt), 2) }}%</div>

                        <div class="percents">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed(network.totalPrice_usdt, 2) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed(network.totalPrice_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed(network.totalPrice_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed(network.totalPrice_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>
                </div>
            </div>


            <div class="legends2" v-if="chartActive == 5">
                <div v-for="(wallet, index) in store.account.wallets" :key="index" class="legend" :class="{'active': chartFifthActiveLegend == index}" @mouseenter="mouseenterLegend('chartFifth', index)" @mouseleave="mouseleaveLegend('chartFifth')">
                    <div class="address">
                        <span v-if="wallet.nickname.length">{{ wallet.nickname }}</span>
                        <span v-else>{{ wallet.address.slice(0, 13) + '...' + wallet.address.slice(-6) }}</span>
                    </div>

                    <div class="price">
                        <div>
                        <template v-if="store.currency == 'USDT'">
                        {{ $filters.toFixed(wallet.totalPrice_usdt, 2) }}
                        </template>

                        <template v-if="store.currency == 'ATOM'">
                        {{ $filters.toFixed(wallet.totalPrice_atom, 2) }}
                        </template>

                        <template v-if="store.currency == 'ETH'">
                        {{ $filters.toFixed(wallet.totalPrice_eth, 4) }}
                        </template>

                        <template v-if="store.currency == 'BTC'">
                        {{ $filters.toFixed(wallet.totalPrice_btc, 5) }}
                        </template>

                        {{ store.currency }}
                        </div>

                        <div class="percents">{{ $filters.toFixed(calcPercentsChart5(wallet.totalPrice_usdt), 2) }}%</div>
                    </div>
                </div>
            </div>
        </div>
        </template>
    </div>
</template>


<script setup>
    import { onBeforeMount, reactive, ref, inject, computed, watch } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement)

    var store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        loading = ref(true),
        chartActive = ref(1),
        chartFirst = ref(null),
        chartSecond = ref(null),
        chartThird = ref(null),
        chartFourth = ref(null),
        chartFifth = ref(null),
        chartFirstActiveLegend = ref(),
        chartSecondActiveLegend = ref(),
        chartThirdActiveLegend = ref(),
        chartFourthActiveLegend = ref(),
        chartFifthActiveLegend = ref(),
        chartOptionsFirst = reactive({
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
                    ? chartFirstActiveLegend.value = item[0].index
                    : chartFirstActiveLegend.value = null
            }
        }),
        chartOptionsSecond = reactive({
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
                    ? chartSecondActiveLegend.value = item[0].index
                    : chartSecondActiveLegend.value = null
            }
        }),
        chartOptionsThird = reactive({
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
                    ? chartThirdActiveLegend.value = item[0].index
                    : chartThirdActiveLegend.value = null
            }
        }),
        chartOptionsFourth = reactive({
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
                    ? chartFourthActiveLegend.value = item[0].index
                    : chartFourthActiveLegend.value = null
            }
        }),
        chartOptionsFifth = reactive({
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
                    ? chartFifthActiveLegend.value = item[0].index
                    : chartFifthActiveLegend.value = null
            }
        }),

        chartDatasetsFirst = reactive([]),
        chartDatasetsSecond = reactive([]),
        chartDatasetsThird = reactive([]),
        chartDatasetsFourth = reactive([]),
        chartDatasetsFifth = reactive([]),

        chartColorsThird = reactive([]),
        chartColorsFourth = reactive([]),

        chartDataFirst = computed(() => ({
            labels: [
                i18n.global.t('message.account_charts_staked_label'),
                i18n.global.t('message.account_charts_liquid_tokens_label'),
                i18n.global.t('message.account_charts_unbonding_label')
            ],
            datasets: [{
                data: chartDatasetsFirst,
                backgroundColor: ['#950FFF', '#0343E8', '#EB5757'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#7700E1', '#3400D1', '#D74343'],
                hoverBorderColor: ['#7700E1', '#3400D1', '#D74343'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),

        chartDataSecond = computed(() => ({
            datasets: [{
                data: chartDatasetsSecond,
                backgroundColor: ['#7879F1', '#EF5DA8', '#1BC562'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#7879F1', '#EF5DA8', '#07B14E'],
                hoverBorderColor: ['#7879F1', '#EF5DA8', '#07B14E'],
                borderAlign: 'inner',
                cutout: '80%'
            }]
        })),

        chartDataThird = computed(() => ({
            datasets: [{
                data: chartDatasetsThird,
                backgroundColor: chartColorsThird,
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: chartColorsThird,
                hoverBorderColor: chartColorsThird,
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        chartDataFourth = computed(() => ({
            datasets: [{
                data: chartDatasetsFourth,
                backgroundColor: chartColorsFourth,
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: chartColorsFourth,
                hoverBorderColor: chartColorsFourth,
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        chartDataFifth = computed(() => ({
            datasets: [{
                data: chartDatasetsFifth,
                backgroundColor: ['#4B0582', '#550694', '#6B09B7', '#800CDB', '#950FFF', '#A636FF', '#B75DFF', '#C983FF'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#4B0582', '#550694', '#6B09B7', '#800CDB', '#950FFF', '#A636FF', '#B75DFF', '#C983FF'],
                hoverBorderColor: ['#4B0582', '#550694', '#6B09B7', '#800CDB', '#950FFF', '#A636FF', '#B75DFF', '#C983FF'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        totalChartFirst = ref(0),
        totalChartThird = ref(0),
        currentWallet = ref({}),
        currentNetwork = ref({})


    onBeforeMount(async () => {
        // Get data
        await getData()

        // Set actual data
        setActualData()
    })


    // Monitor of current wallet changes
    watch(() => store.account.currentWallet, async () => {
        // Get data
        await getData()

        // Set actual data
        setActualData()
    })


    // Get data
    async function getData() {
        // Set loader
        loading.value = true

        // Get cosmos hub data
        for (const wallet of store.account.wallets) {
            try {
                await fetch(`https://rpc.bronbro.io/account/account_balance/${generateAddress(store.networks.cosmoshub.address_prefix, wallet.address)}`)
                    .then(res => res.json())
                    .then(response => {
                        let totals = {
                            liquid: 0,
                            staked: 0,
                            unbonding: 0,
                            rewards: 0,
                            outside: 0,
                            ibc: 0,
                            liquid_rewards: 0
                        },
                        groupByDenom = []

                        wallet.networks = [
                            {
                                name: 'cosmoshub',
                                color: '#2E314B',
                                denom: store.networks.cosmoshub.denom,
                                token_name: store.networks.cosmoshub.token_name,
                                exponent: store.networks.cosmoshub.exponent,
                                price: store.prices.find(el => el.symbol == 'ATOM').price,
                                price_usdt: store.networks.cosmoshub.price_usdt,
                                price_atom: store.networks.cosmoshub.price_atom,
                                price_eth: store.networks.cosmoshub.price_eth,
                                price_btc: store.networks.cosmoshub.price_btc,
                            }
                        ]


                        // Calc liquid tokens
                        if(response.liquid && response.liquid.native) {
                            response.liquid.native.forEach(el => {
                                // Sum total
                                totals.liquid += el.amount

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent,
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc ibc tokens
                        if(response.liquid && response.liquid.ibc) {
                            response.liquid.ibc.forEach(el => {
                                // Convert to current denom
                                el.amountCurrentDenom = el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)

                                // Sum total
                                totals.ibc += parseFloat(el.amountCurrentDenom * store.networks.cosmoshub.exponent)

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent,
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }

                                // Set prices
                                el.price_usdt = el.price
                                el.price_atom = el.price / store.ATOM_price
                                el.price_eth = el.price / store.ETH_price
                                el.price_btc = el.price / store.BTC_price
                            })
                        }

                        // Calc staked tokens
                        if(response.staked) {
                            response.staked.forEach(el => {
                                // Sum total
                                totals.staked += el.amount

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent,
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc unbonding tokens
                        if(response.unbonding) {
                            response.unbonding.forEach(el => {
                                // Sum total
                                totals.unbonding += el.amount

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent,
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc rewards tokens
                        if(response.rewards) {
                            response.rewards.forEach(el => {
                                // Convert to current denom
                                el.amountCurrentDenom = el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)

                                // Sum total
                                if(el.amount * Math.pow(10, el.exponent) >= 1) {
                                    totals.rewards += parseFloat(el.amountCurrentDenom * store.networks.cosmoshub.exponent)
                                }

                                totals.liquid_rewards = totals.liquid + totals.rewards

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / store.networks.cosmoshub.price_usdt)) * store.networks.cosmoshub.exponent,
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }


                        // Set data in network
                        let currentNetworkInWallet = wallet.networks.find(network => network.name == 'cosmoshub')

                        currentNetworkInWallet.address = response.address,
                        currentNetworkInWallet.total = totals,

                        currentNetworkInWallet.balance = {
                                liquid: {
                                    native: response.liquid && response.liquid.native ? response.liquid.native : null,
                                    ibc: response.liquid && response.liquid.ibc ? response.liquid.ibc : null
                                },
                                staked: response.staked,
                                unbonding: response.unbonding,
                                rewards: response.rewards,
                                groupByDenom: groupByDenom.sort((a, b) => {
                                    if (a.amount > b.amount) { return -1 }
                                    if (a.amount < b.amount) { return 1 }
                                    return 0
                                })
                            }

                        currentNetworkInWallet.totalPrice_usdt = totals.liquid / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_usdt + totals.ibc / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_usdt + totals.staked / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_usdt + totals.rewards / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_usdt + totals.unbonding / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_usdt,

                        currentNetworkInWallet.totalPrice_atom = totals.liquid / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_atom + totals.ibc / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_atom + totals.staked / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_atom + totals.rewards / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_atom + totals.unbonding / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_atom,

                        currentNetworkInWallet.totalPrice_eth = totals.liquid / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_eth + totals.ibc / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_eth + totals.staked / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_eth + totals.rewards / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_eth + totals.unbonding / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_eth,

                        currentNetworkInWallet.totalPrice_btc = totals.liquid / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_btc + totals.ibc / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_btc + totals.staked / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_btc + totals.rewards / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_btc + totals.unbonding / store.networks.cosmoshub.exponent * store.networks.cosmoshub.price_btc
                    })
            } catch (error) {
                console.log(error)
            }
        }


        // Calc total prices
        store.account.wallets.forEach(el => {
            el.totalPrice_usdt = 0
            el.totalPrice_eth = 0
            el.totalPrice_btc = 0
            el.totalPrice_atom = 0

            el.networks.forEach(network => {
                el.totalPrice_usdt += network.totalPrice_usdt
                el.totalPrice_eth += network.totalPrice_eth
                el.totalPrice_btc += network.totalPrice_btc
                el.totalPrice_atom += network.totalPrice_atom
            })
        })
    }


    // Set actual data
    function setActualData() {
        // Clear data
        chartDatasetsFirst = reactive([])
        chartDatasetsSecond = reactive([])
        chartDatasetsThird = reactive([])
        chartDatasetsFourth = reactive([])
        chartDatasetsFifth = reactive([])

        chartColorsThird = reactive([])
        chartColorsFourth = reactive([])


        // Get current walllet data
        currentWallet.value = store.account.wallets.find(el => el.address == store.account.currentWallet)

        // Get current network data
        currentNetwork.value = currentWallet.value.networks.find(el => el.name == 'cosmoshub')

        // Calc charts totals
        totalChartFirst.value = 0
        totalChartFirst.value = currentNetwork.value.total.staked + currentNetwork.value.total.liquid_rewards + currentNetwork.value.total.unbonding

        totalChartThird.value = 0
        currentNetwork.value.balance.groupByDenom.forEach(el => totalChartThird.value += el.amount)


        // Set data for first chart
        chartDatasetsFirst.push(currentNetwork.value.total.staked)
        chartDatasetsFirst.push(currentNetwork.value.total.liquid_rewards)
        chartDatasetsFirst.push(currentNetwork.value.total.unbonding)

        // Set data for second chart
        chartDatasetsSecond.push(currentNetwork.value.total.liquid)
        chartDatasetsSecond.push(currentNetwork.value.total.ibc)
        chartDatasetsSecond.push(currentNetwork.value.total.rewards)

        // Set data for third chart
        currentNetwork.value.balance.groupByDenom.forEach(el => {
            chartDatasetsThird.push(el.amount)

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

            chartColorsThird.push(color)
        })

        // Set data for fourth chart
        currentWallet.value.networks.forEach(el => {
            chartDatasetsFourth.push(el.totalPrice_usdt)
            chartColorsFourth.push(el.color)
        })

        // Set data for fifth chart
        store.account.wallets.forEach(el => chartDatasetsFifth.push(el.totalPrice_usdt))


        // Calc totals for account
        store.account.totalPrice_usdt = 0
        store.account.totalPrice_eth = 0
        store.account.totalPrice_btc = 0
        store.account.totalPrice_atom = 0

        store.account.wallets.forEach(wallet => {
            store.account.totalPrice_usdt += wallet.totalPrice_usdt
            store.account.totalPrice_eth += wallet.totalPrice_eth
            store.account.totalPrice_btc += wallet.totalPrice_btc
            store.account.totalPrice_atom += wallet.totalPrice_atom
        })


        // Hide loader
        loading.value = false
    }


    // Set width
    function setWidth(percents) {
        return `width: ${percents}%;`
    }


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.closest('.legend').classList.toggle('active')
    }


    // Mouse enter on legend for third chart
    function mouseenterLegend(chart, dataIndex) {
        let chartInstance = {}

        if(chart == 'chartFirst') {
            chartInstance = chartFirst.value.chart
            chartFirstActiveLegend.value = dataIndex
        }

        if(chart == 'chartSecond') {
            chartInstance = chartSecond.value.chart
            chartSecondActiveLegend.value = dataIndex
        }

        if(chart == 'chartThird') {
            chartInstance = chartThird.value.chart
            chartThirdActiveLegend.value = dataIndex
        }

        if(chart == 'chartFourth') {
            chartInstance = chartFourth.value.chart
            chartFourthActiveLegend.value = dataIndex
        }

        if(chart == 'chartFifth') {
            chartInstance = chartFifth.value.chart
            chartFifthActiveLegend.value = dataIndex
        }

        chartInstance.setActiveElements([{
            datasetIndex: 0,
            index: dataIndex
        }])

        chartInstance.update()
    }


    // Mouse leave from legend for first chart
    function mouseleaveLegend(chart) {
        let chartInstance = {}

        if(chart == 'chartFirst') {
            chartInstance = chartFirst.value.chart
            chartFirstActiveLegend.value = null
        }

        if(chart == 'chartSecond') {
            chartInstance = chartSecond.value.chart
            chartSecondActiveLegend.value = null
        }

        if(chart == 'chartThird') {
            chartInstance = chartThird.value.chart
            chartThirdActiveLegend.value = null
        }

        if(chart == 'chartFourth') {
            chartInstance = chartFourth.value.chart
            chartFourthActiveLegend.value = null
        }

        if(chart == 'chartFifth') {
            chartInstance = chartFifth.value.chart
            chartFifthActiveLegend.value = null
        }

        chartInstance.setActiveElements([])
        chartInstance.update()
    }


    // Calc percents for chart 1
    function calcPercentsChart1(type) {
        let result = 0

        if(totalChartFirst.value) {
            result = currentNetwork.value.total[type] / totalChartFirst.value * 100
        }

        return result
    }


    // Calc percents for chart 3
    function calcPercentsChart3(symbol) {
        let result = 0,
            token = currentNetwork.value.balance.groupByDenom.find(e => e.symbol == symbol)

        if(totalChartThird.value) {
            result = token.amount / totalChartThird.value * 100
        }

        return result
    }


    // Calc percents for chart 4
    function calcPercentsChart4(price) {
        let result = 0

        if(currentWallet.value.totalPrice_usdt) {
            result = price / currentWallet.value.totalPrice_usdt * 100
        }

        return result
    }


    // Calc percents for chart 5
    function calcPercentsChart5(price) {
        let result = 0

        if(store.account.totalPrice_usdt) {
            result = price / store.account.totalPrice_usdt * 100
        }

        return result
    }
</script>


<style scoped>
    .tabs
    {
        display: flex;

        width: 100%;
        margin-bottom: 24px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }


    .tabs .btn
    {
        color: #555;
        font-size: 16px;
        line-height: 100%;

        display: block;

        width: 100%;
        min-height: 62px;
        padding: 10px 0 9px;

        text-align: center;

        border-bottom: 1px solid rgba(255, 255, 255, .1);
    }

    .tabs .btn + .btn
    {
        margin-left: 4px;
    }

    .tabs .btn:hover,
    .tabs .btn.active
    {
        color: #950fff;

        border-color: #950fff;
    }


    .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 0;

        background: none;
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

        border-radius: 50%;
        background: #0d0d0d;
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

        opacity: .2;
        border-radius: 50%;

        clip-path: circle(50% at 50% 50%);
    }

    .chart.chartSecond
    {
        z-index: 3;

        width: calc(100% - 44px);
        height: calc(100% - 44px);
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

        border-radius: 50%;
    }

    .chart.active
    {
        opacity: 1;
    }

    .chart.active:after
    {
        display: none;
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

    /* .legends .legend .name.spoler_btn
                                                        {
                                                            cursor: pointer;
                                                        } */

    .legends .legend .color
    {
        width: 10px;
        height: 10px;
        margin-right: 4px;

        border-radius: 50%;
    }


    /* .legends .legend .arr
                                                        {
                                                            color: #fff;

                                                            display: block;

                                                            width: 24px;
                                                            height: 24px;
                                                            margin-left: auto;

                                                            transition: transform .2s linear;
                                                        } */


    .legends .legend .dropdown
    {
        /* display: none; */
        width: 100%;
        margin-top: 8px;
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


    /* .legends .legend .percents
                            {
                                font-size: 14px;
                                font-weight: 500;
                                line-height: 100%;

                                width: 52px;
                                margin-left: auto;

                                text-align: right;
                                white-space: nowrap;
                            } */


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
    }


    .legends .legend.active
    {
        background: #141414;
    }

    .legends .legend.active .arr
    {
        transform: rotate(180deg);
    }

    .legends .legend.active .dropdown
    {
        display: block;
    }



    .legends2 .legend
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

    .legends2 .legend + .legend
    {
        margin-top: 8px;
    }


    .legends2 .legend .logo
    {
        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .legends2 .legend .logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .legends2 .legend .token,
    .legends2 .legend .address
    {
        font-size: 14px;
        line-height: 100%;
    }

    .legends2 .legend .address
    {
        overflow: hidden;

        width: calc(100% - 140px);

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .legends2 .legend .price
    {
        font-size: 14px;
        line-height: 100%;

        margin-left: auto;

        text-align: right;
        white-space: nowrap;
    }


    .legends2 .legend .percents
    {
        color: #464646;
        font-size: 12px;
        line-height: 100%;

        margin-top: 4px;
    }


    .legends2 .legend:hover,
    .legends2 .legend.active
    {
        background: #212121;
    }



    .avatar
    {
        position: absolute;
        z-index: 5;

        width: 200px;
        height: 200px;
        margin: auto;

        border: 5px solid #0d0d0d;
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