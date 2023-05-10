<template>
    <div class="row">
        <div class="tabs">
            <button class="btn" :class="{'active': chartActive == 1}" @click.prevent="chartActive = 1">1</button>
            <button class="btn" :class="{'active': chartActive == 2}" @click.prevent="chartActive = 2">2</button>
            <button class="btn" :class="{'active': chartActive == 3}" @click.prevent="chartActive = 3">3</button>
            <button class="btn" :class="{'active': chartActive == 4}" @click.prevent="chartActive = 4">4</button>
            <button class="btn" :class="{'active': chartActive == 5}" @click.prevent="chartActive = 5">5</button>
        </div>


        <div class="loader_wrap" v-if="loading">
            <div class="loader"><span></span></div>
        </div>

        <template v-else>
        <template v-if="chartActive == 1">
        <div class="block_title">H1</div>

        <div class="block_desc">small explanation</div>
        </template>

        <template v-if="chartActive == 2">
        <div class="block_title">H1</div>

        <div class="block_desc">small explanation</div>
        </template>

        <template v-if="chartActive == 3">
        <div class="block_title">H1</div>

        <div class="block_desc">small explanation</div>
        </template>

        <template v-if="chartActive == 4">
        <div class="block_title">H1</div>

        <div class="block_desc">small explanation</div>
        </template>

        <template v-if="chartActive == 5">
        <div class="block_title">H1</div>

        <div class="block_desc">small explanation</div>
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

            <!-- <div class="charts" v-if="chartActive == 3">
                <div class="chart chartThird active">
                    <Doughnut ref="chartThird" :data="chartDataThird" :options="chartOptionsThird" />

                    <div class="total">
                        <div class="label">Total Assets</div>

                        <div class="price">
                            56,875
                            <span>{{ store.currency }}</span>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- <div class="charts" v-if="chartActive == 4">
                <div class="chart chartFourth active">
                    <Doughnut ref="chartFourth" :data="chartDataFourth" :options="chartOptionsFourth" />

                    <div class="total">
                        <div class="label">Total Assets</div>

                        <div class="price">
                            56,875
                            <span>{{ store.currency }}</span>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- <div class="charts" v-if="chartActive == 5">
                <div class="chart chartFifth active">
                    <Doughnut ref="chartFifth" :data="chartDataFifth" :options="chartOptionsFifth" />

                    <div class="total">
                        <div class="label">Total Assets</div>

                        <div class="price">
                            1,484.4047
                            <span>{{ store.currency }}</span>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>


        <div class="col_main">
            <div class="legends" v-if="chartActive == 1">
                <div class="legend" v-if="accountBalance.staked" :class="{'active': chartFirstActiveLegend == 0}" @mouseenter="mouseenterLegend('chartFirst', 0)" @mouseleave="mouseleaveLegend('chartFirst')">
                    <div class="name">
                        <div class="color" style="background-color: #950FFF;"></div>
                        <span>{{ $t('message.account_charts_staked_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ $filters.toFixed(accountBalance.staked_total / store.networks[store.currentNetwork].exponent, 2) }}
                        {{ store.networks[store.currentNetwork].token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((accountBalance.staked_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((accountBalance.staked_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((accountBalance.staked_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((accountBalance.staked_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #950FFF;" :style="setWidth(calcPercentsChart1('staked'))"></div></div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.liquid_rewards_total" :class="{'active': chartFirstActiveLegend == 1}" @mouseenter="mouseenterLegend('chartFirst', 1)" @mouseleave="mouseleaveLegend('chartFirst')">
                    <div class="name">
                        <div class="color" style="background-color: #0343E8;"></div>
                        <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ $filters.toFixed(accountBalance.liquid_rewards_total / store.networks[store.currentNetwork].exponent, 2) }}
                        {{ store.networks[store.currentNetwork].token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((accountBalance.liquid_rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((accountBalance.liquid_rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((accountBalance.liquid_rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((accountBalance.liquid_rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>

                    <div class="progress">
                        <div class="bar"><div style="background-color: #0343E8;" :style="setWidth(calcPercentsChart1('liquid'))"></div></div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.unbonding_total" :class="{'active': chartFirstActiveLegend == 2}" @mouseenter="mouseenterLegend('chartFirst', 2)" @mouseleave="mouseleaveLegend('chartFirst')">
                    <div class="name">
                        <div class="color" style="background-color: #EB5757;"></div>
                        <span>{{ $t('message.account_charts_unbonding_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ $filters.toFixed(accountBalance.unbonding_total / store.networks[store.currentNetwork].exponent, 2) }}
                        {{ store.networks[store.currentNetwork].token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((accountBalance.unbonding_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((accountBalance.unbonding_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((accountBalance.unbonding_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((accountBalance.unbonding_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
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
                <div class="legend" v-if="accountBalance.liquid_total" :class="{'active': chartSecondActiveLegend == 0}" @mouseenter="mouseenterLegend('chartSecond', 0)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name">
                        <div class="color" style="background-color: #7879F1;"></div>
                        <span>{{ $t('message.account_charts_liquid_tokens_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ $filters.toFixed(accountBalance.liquid_total / store.networks[store.currentNetwork].exponent, 2) }}
                        {{ store.networks[store.currentNetwork].token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((accountBalance.liquid_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((accountBalance.liquid_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((accountBalance.liquid_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((accountBalance.liquid_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.outside_total" :class="{'active': chartSecondActiveLegend == 1}" @mouseenter="mouseenterLegend('chartSecond', 1)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name" @click.prevent="toggleActiveClass">
                        <div class="color" style="background-color: #C5811B;"></div>
                        <span>{{ $t('message.account_charts_outside_label') }}</span>

                        <!-- <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg> -->
                    </div>

                    <div class="dropdown">
                        <div class="amount">
                            {{ $filters.toFixed(accountBalance.outside_total / store.networks[store.currentNetwork].exponent, 2) }}
                            {{ store.networks[store.currentNetwork].token_name }}

                            <div class="price">
                                <template v-if="store.currency == 'USDT'">
                                {{ $filters.toFixed((accountBalance.outside_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                </template>

                                <template v-if="store.currency == 'ATOM'">
                                {{ $filters.toFixed((accountBalance.outside_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                </template>

                                <template v-if="store.currency == 'ETH'">
                                {{ $filters.toFixed((accountBalance.outside_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                </template>

                                <template v-if="store.currency == 'BTC'">
                                {{ $filters.toFixed((accountBalance.outside_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                </template>

                                {{ store.currency }}
                            </div>
                        </div>

                        <div class="tokens">
                            <!-- <div class="item">
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
                                    <div class="amount">
                                        360 {{ store.networks[store.currentNetwork].token_name }}

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
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
                                    <div class="amount">
                                        360 {{ store.networks[store.currentNetwork].token_name }}

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
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
                                    <div class="amount">
                                        360 {{ store.networks[store.currentNetwork].token_name }}

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.ibc_total" :class="{'active': chartSecondActiveLegend == 2}" @mouseenter="mouseenterLegend('chartSecond', 2)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name" @click.prevent="toggleActiveClass">
                        <div class="color" style="background-color: #EF5DA8;"></div>
                        <span>{{ $t('message.account_charts_ibc_label') }}</span>

                        <!-- <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg> -->
                    </div>

                    <div class="dropdown">
                        <div class="tokens">
                            <!-- <div class="item">
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
                                    <div class="amount">
                                        360 OSMO

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
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
                                    <div class="amount">
                                        160 DSM

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
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
                                    <div class="amount">
                                        140 STARS

                                        <div class="price">
                                            <template v-if="store.currency == 'USDT'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                                            </template>

                                            <template v-if="store.currency == 'ATOM'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                                            </template>

                                            <template v-if="store.currency == 'ETH'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                                            </template>

                                            <template v-if="store.currency == 'BTC'">
                                            {{ $filters.toFixed((accountBalance.outside / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                                            </template>

                                            {{ store.currency }}
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>

                <div class="legend" v-if="accountBalance.rewards_total" :class="{'active': chartSecondActiveLegend == 3}" @mouseenter="mouseenterLegend('chartSecond', 3)" @mouseleave="mouseleaveLegend('chartSecond')">
                    <div class="name">
                        <div class="color" style="background-color: #1BC562;"></div>
                        <span>{{ $t('message.account_charts_rewards_label') }}</span>
                    </div>

                    <div class="amount">
                        {{ $filters.toFixed(accountBalance.rewards_total / store.networks[store.currentNetwork].exponent, 5) }}
                        {{ store.networks[store.currentNetwork].token_name }}

                        <div class="price">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed((accountBalance.rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_usdt, 1) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed((accountBalance.rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed((accountBalance.rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed((accountBalance.rewards_total / store.networks[store.currentNetwork].exponent) * store.networks[store.currentNetwork].price_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>
                    </div>
                </div>
            </div>


            <div class="legends2" v-if="chartActive == 3">
                <div class="legend" :class="{'active': chartThirdActiveLegend == 0}" @mouseenter="mouseenterLegend('chartThird', 0)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/cosmoshub_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.cosmoshub.token_name }}
                    </div>

                    <div class="price">
                        <div>46,875 {{ store.currency }}</div>
                        <div class="percents">65.43%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 1}" @mouseenter="mouseenterLegend('chartThird', 1)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/osmosis_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.osmosis.token_name }}
                    </div>

                    <div class="price">
                        <div>7,200 {{ store.currency }}</div>
                        <div class="percents">10.32%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 2}" @mouseenter="mouseenterLegend('chartThird', 2)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/juno_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.juno.token_name }}
                    </div>

                    <div class="price">
                        <div>1,200 {{ store.currency }}</div>
                        <div class="percents">9.12%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 3}" @mouseenter="mouseenterLegend('chartThird', 3)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/evmos_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.evmos.token_name }}
                    </div>

                    <div class="price">
                        <div>976 {{ store.currency }}</div>
                        <div class="percents">7.75%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 4}" @mouseenter="mouseenterLegend('chartThird', 4)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/gravity_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.gravity.token_name }}
                    </div>

                    <div class="price">
                        <div>880 {{ store.currency }}</div>
                        <div class="percents">3.86%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 5}" @mouseenter="mouseenterLegend('chartThird', 5)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/stargaze_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.stargaze.token_name }}
                    </div>

                    <div class="price">
                        <div>550 {{ store.currency }}</div>
                        <div class="percents">2.34%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartThirdActiveLegend == 6}" @mouseenter="mouseenterLegend('chartThird', 6)" @mouseleave="mouseleaveLegend('chartThird')">
                    <div class="logo">
                        <img :src="`/bostrom_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.bostrom.token_name }}
                    </div>

                    <div class="price">
                        <div>115 {{ store.currency }}</div>
                        <div class="percents">1.02%</div>
                    </div>
                </div>
            </div>


            <div class="legends2" v-if="chartActive == 4">
                <div class="legend" :class="{'active': chartFourthActiveLegend == 0}" @mouseenter="mouseenterLegend('chartFourth', 0)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/cosmoshub_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.cosmoshub.name }}
                    </div>

                    <div class="price">
                        <div>65.43%</div>
                        <div class="percents">46,875 {{ store.currency }}</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFourthActiveLegend == 1}" @mouseenter="mouseenterLegend('chartFourth', 1)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/osmosis_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.osmosis.name }}
                    </div>

                    <div class="price">
                        <div>10.32%</div>
                        <div class="percents">7,200 {{ store.currency }}</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFourthActiveLegend == 2}" @mouseenter="mouseenterLegend('chartFourth', 2)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/juno_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.juno.name }}
                    </div>

                    <div class="price">
                        <div>9.12%</div>
                        <div class="percents">1,200 {{ store.currency }}</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFourthActiveLegend == 3}" @mouseenter="mouseenterLegend('chartFourth', 3)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/evmos_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.evmos.name }}
                    </div>

                    <div class="price">
                        <div>7.75%</div>
                        <div class="percents">976 {{ store.currency }}</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFourthActiveLegend == 4}" @mouseenter="mouseenterLegend('chartFourth', 4)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/gravity_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.gravity.name }}
                    </div>

                    <div class="price">
                        <div>3.86%</div>
                        <div class="percents">880 {{ store.currency }}</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFourthActiveLegend == 5}" @mouseenter="mouseenterLegend('chartFourth', 5)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/stargaze_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.stargaze.name }}
                    </div>

                    <div class="price">
                        <div>2.34%</div>
                        <div class="percents">550 {{ store.currency }}</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFourthActiveLegend == 6}" @mouseenter="mouseenterLegend('chartFourth', 6)" @mouseleave="mouseleaveLegend('chartFourth')">
                    <div class="logo">
                        <img :src="`/bostrom_logo.png`" alt="">
                    </div>

                    <div class="token">
                        {{ store.networks.bostrom.name }}
                    </div>

                    <div class="price">
                        <div>1.02%</div>
                        <div class="percents">115 {{ store.currency }}</div>
                    </div>
                </div>
            </div>


            <div class="legends2" v-if="chartActive == 5">
                <div class="legend" :class="{'active': chartFifthActiveLegend == 0}" @mouseenter="mouseenterLegend('chartFifth', 0)" @mouseleave="mouseleaveLegend('chartFifth')">
                    <div class="address">Valentin Prikolistov</div>

                    <div class="price">
                        <div>46,875 {{ store.currency }}</div>
                        <div class="percents">45.43%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFifthActiveLegend == 1}" @mouseenter="mouseenterLegend('chartFifth', 1)" @mouseleave="mouseleaveLegend('chartFifth')">
                    <div class="address">Masha Kozlova</div>

                    <div class="price">
                        <div>3,345 {{ store.currency }}</div>
                        <div class="percents">32.65%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFifthActiveLegend == 2}" @mouseenter="mouseenterLegend('chartFifth', 2)" @mouseleave="mouseleaveLegend('chartFifth')">
                    <div class="address">Airdrop111 </div>

                    <div class="price">
                        <div>2,543 {{ store.currency }}</div>
                        <div class="percents">22.78%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFifthActiveLegend == 3}" @mouseenter="mouseenterLegend('chartFifth', 3)" @mouseleave="mouseleaveLegend('chartFifth')">
                    <div class="address">Airdrop_main</div>

                    <div class="price">
                        <div>1,234 {{ store.currency }}</div>
                        <div class="percents">18.12%</div>
                    </div>
                </div>

                <div class="legend" :class="{'active': chartFifthActiveLegend == 4}" @mouseenter="mouseenterLegend('chartFifth', 4)" @mouseleave="mouseleaveLegend('chartFifth')">
                    <div class="address">Airdrop222</div>

                    <div class="price">
                        <div>843 {{ store.currency }}</div>
                        <div class="percents">8.34%</div>
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

    import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement, Tooltip)

    var store = useGlobalStore(),
        i18n = inject('i18n'),
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
            labels: [
                i18n.global.t('message.account_charts_liquid_tokens_label'),
                i18n.global.t('message.account_charts_outside_label'),
                i18n.global.t('message.account_charts_ibc_label'),
                i18n.global.t('message.account_charts_rewards_label')
            ],
            datasets: [{
                data: chartDatasetsSecond,
                backgroundColor: ['#7879F1', '#C5811B', '#EF5DA8', '#1BC562'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#7879F1', '#D17D00', '#EF5DA8', '#07B14E'],
                hoverBorderColor: ['#7879F1', '#D17D00', '#EF5DA8', '#07B14E'],
                borderAlign: 'inner',
                cutout: '80%'
            }]
        })),
        chartDataThird = computed(() => ({
            labels: ['Bostrom', 'Evmos', 'Stargaze', 'Juno', 'Crescent hub', 'Gravity bridge', 'Osmosis'],
            datasets: [{
                data: chartDatasetsThird,
                backgroundColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A', '#0036C1', '#7900E1', '#00646F', '#2E314B', '#F98256', '#F19E22'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A', '#0036C1', '#7900E1', '#00646F', '#2E314B', '#F98256', '#F19E22'],
                hoverBorderColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A', '#0036C1', '#7900E1', '#00646F', '#2E314B', '#F98256', '#F19E22'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        chartDataFourth = computed(() => ({
            labels: ['Bostrom', 'Evmos', 'Stargaze', 'Juno', 'Crescent hub', 'Gravity bridge', 'Osmosis'],
            datasets: [{
                data: chartDatasetsFourth,
                backgroundColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A', '#0036C1', '#7900E1', '#00646F', '#2E314B', '#F98256', '#F19E22'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A', '#0036C1', '#7900E1', '#00646F', '#2E314B', '#F98256', '#F19E22'],
                hoverBorderColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A', '#0036C1', '#7900E1', '#00646F', '#2E314B', '#F98256', '#F19E22'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        chartDataFifth = computed(() => ({
            labels: ['Bostrom', 'Evmos', 'Stargaze', 'Juno', 'Crescent hub'],
            datasets: [{
                data: chartDatasetsFifth,
                backgroundColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A'],
                borderColor: '#0d0d0d',
                borderWidth: 4,
                hoverBackgroundColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A'],
                hoverBorderColor: ['#25FF25', '#ED4E33', '#E94A9D', '#F0827D', '#FFB04A'],
                borderAlign: 'inner',
                cutout: '84%',
            }]
        })),
        accountBalance = ref({})


    onBeforeMount(async () => {
        // Get data
        await getData()
    })


    // Monitor of current wallet changes
    watch(() => store.account.currentWallet, async () => {
        // Get data
        await getData()
    })


    // Get data
    async function getData() {
        // Set loader
        loading.value = true

        try {
            await fetch(`https://rpc.bronbro.io/account/account_balance/${generateAddress(store.networks[store.currentNetwork].address_prefix, store.account.currentWallet)}`)
                .then(res => res.json())
                .then(response => {
                    console.log(response)

                    // Clear data
                    chartDatasetsFirst = reactive([]),
                    chartDatasetsSecond = reactive([]),
                    chartDatasetsThird = reactive([]),
                    chartDatasetsFourth = reactive([]),
                    chartDatasetsFifth = reactive([]),

                    accountBalance.value = response

                    // Sum
                    accountBalance.value.liquid_total = 0
                    accountBalance.value.staked_total = 0
                    accountBalance.value.unbonding_total = 0
                    accountBalance.value.rewards_total = 0
                    accountBalance.value.outside_total = 0
                    accountBalance.value.ibc_total = 0
                    accountBalance.value.liquid_rewards_total = 0

                    // Calc liquid tokens
                    if(accountBalance.value.liquid.native.length) {
                        accountBalance.value.liquid.native.forEach(el => {
                            // Sum
                            accountBalance.value.liquid_total += el.amount

                            // Currencies
                            el.price_usdt = el.price
                            el.price_atom = el.price / store.ATOM_price
                            el.price_eth = el.price / store.ETH_price
                            el.price_btc = el.price / store.BTC_price
                        })
                    }

                    // Calc ibc tokens
                    if(accountBalance.value.liquid.ibc.length) {
                        accountBalance.value.liquid.ibc.forEach(el => {
                            // Sum
                            accountBalance.value.ibc_total += el.amount

                            // Currencies
                            el.price_usdt = el.price
                            el.price_atom = el.price / store.ATOM_price
                            el.price_eth = el.price / store.ETH_price
                            el.price_btc = el.price / store.BTC_price
                        })
                    }

                    // Calc staked tokens
                    if(accountBalance.value.staked) {
                        accountBalance.value.staked.forEach(el => {
                            // Sum
                            accountBalance.value.staked_total += el.amount

                            // Currencies
                            el.price_usdt = el.price
                            el.price_atom = el.price / store.ATOM_price
                            el.price_eth = el.price / store.ETH_price
                            el.price_btc = el.price / store.BTC_price
                        })
                    }

                    // Calc unbonding tokens
                    if(accountBalance.value.unbonding) {
                        accountBalance.value.unbonding.forEach(el => {
                            // Sum
                            accountBalance.value.unbonding_total += el.amount

                            // Currencies
                            el.price_usdt = el.price
                            el.price_atom = el.price / store.ATOM_price
                            el.price_eth = el.price / store.ETH_price
                            el.price_btc = el.price / store.BTC_price
                        })
                    }

                    // Calc rewards tokens
                    if(accountBalance.value.rewards) {
                        // Set current denom
                        let currentDenom = accountBalance.value.rewards.find(el => el.denom == store.networks[store.currentNetwork].denom)

                        accountBalance.value.rewards.forEach(el => {
                            // Convert to current denom
                            el.amount_current_denom = el.amount * (el.price / currentDenom.price)

                            // Currencies
                            el.price_usdt = el.price
                            el.price_atom = el.price / store.ATOM_price
                            el.price_eth = el.price / store.ETH_price
                            el.price_btc = el.price / store.BTC_price

                            // Sum
                            if(el.amount * Math.pow(10, el.exponent) >= 1) {
                                accountBalance.value.rewards_total += parseFloat(el.amount_current_denom)
                            }
                        })

                        accountBalance.value.liquid_rewards_total = accountBalance.value.liquid_total + accountBalance.value.rewards_total
                    }

                    console.log(accountBalance.value)

                    // Set data for first chart
                    chartDatasetsFirst.push(accountBalance.value.staked_total)
                    chartDatasetsFirst.push(accountBalance.value.liquid_rewards_total)
                    chartDatasetsFirst.push(accountBalance.value.unbonding_total)

                    // Set data for second chart
                    chartDatasetsSecond.push(accountBalance.value.liquid_total)
                    chartDatasetsSecond.push(accountBalance.value.ibc_total)
                    chartDatasetsSecond.push(accountBalance.value.outside_total)
                    chartDatasetsSecond.push(accountBalance.value.rewards_total)

                    // // Set data for third chart
                    // chartDatasetsThird.push(10)
                    // chartDatasetsThird.push(10)
                    // chartDatasetsThird.push(10)
                    // chartDatasetsThird.push(10)
                    // chartDatasetsThird.push(10)
                    // chartDatasetsThird.push(10)
                    // chartDatasetsThird.push(10)

                    // // Set data for fourth chart
                    // chartDatasetsFourth.push(10)
                    // chartDatasetsFourth.push(10)
                    // chartDatasetsFourth.push(10)
                    // chartDatasetsFourth.push(10)
                    // chartDatasetsFourth.push(10)
                    // chartDatasetsFourth.push(10)
                    // chartDatasetsFourth.push(10)

                    // // Set data for fifth chart
                    // chartDatasetsFifth.push(50)
                    // chartDatasetsFifth.push(10)
                    // chartDatasetsFifth.push(10)
                    // chartDatasetsFifth.push(10)
                    // chartDatasetsFifth.push(10)

                    // Calc totals
                    accountBalance.value.totalChartFirst = accountBalance.value.staked_total + accountBalance.value.liquid_total + accountBalance.value.unbonding_total

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.log(error)
        }
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
        font-size: 14px;
        line-height: 100%;

        display: block;

        width: 100%;
        padding: 10px 0 9px;

        text-align: left;

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

    .chart .total .price span
    {
        font-size: 12px;
        font-weight: 400;
        line-height: 100%;

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
        background: #fff;
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