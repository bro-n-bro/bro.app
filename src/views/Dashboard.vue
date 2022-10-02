<template>
    <transition name="fade" mode="out-in" appear type="animation">
    <section class="dashboard">
        <div class="cont">
            <div class="row">
                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.evmos.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/evmos_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.evmos.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/evmos_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.evmos.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.evmos.tokens_sum, 2) }}
                            {{ store.networks.evmos.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.evmos.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.evmos.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.evmos.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.evmos.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.evmos.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.evmos.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.evmos.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.evmos.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.evmos.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'evmos' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.evmos.health_color]" :style="{'--speed': store.networks.evmos.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.juno.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/juno_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.juno.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/juno_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.juno.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.juno.tokens_sum, 2) }}
                            {{ store.networks.juno.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.juno.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.juno.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.juno.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.juno.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.juno.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.juno.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.juno.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.juno.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.juno.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'juno' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.juno.health_color]" :style="{'--speed': store.networks.juno.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.cosmoshub.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/cosmos_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.cosmoshub.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/cosmos_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.cosmoshub.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.cosmoshub.tokens_sum, 2) }}
                            {{ store.networks.cosmoshub.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.cosmoshub.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.cosmoshub.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.cosmoshub.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.cosmoshub.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.cosmoshub.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.cosmoshub.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.cosmoshub.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.cosmoshub.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.cosmoshub.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'cosmoshub' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.cosmoshub.health_color]" :style="{'--speed': store.networks.cosmoshub.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.bostrom.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/bostrom_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.bostrom.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/bostrom_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.bostrom.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.bostrom.tokens_sum / store.networks.bostrom.exponent, 2) }}
                            {{ store.networks.bostrom.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.bostrom.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.bostrom.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.bostrom.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.bostrom.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.bostrom.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.bostrom.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.bostrom.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.bostrom.RPDE / store.networks.bostrom.exponent, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.bostrom.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'bostrom' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.bostrom.health_color]" :style="{'--speed': store.networks.bostrom.speed + 's'}"></div>
                </div>
            </div>


            <div class="row">
                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.emoney.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/e-money_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.emoney.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/e-money_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.emoney.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.emoney.tokens_sum, 2) }}
                            {{ store.networks.emoney.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.emoney.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.emoney.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.emoney.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.emoney.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.emoney.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.emoney.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.emoney.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.emoney.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.emoney.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'emoney' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.emoney.health_color]" :style="{'--speed': store.networks.emoney.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.desmos.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/desmos_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.desmos.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/desmos_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.desmos.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.desmos.tokens_sum, 2) }}
                            {{ store.networks.desmos.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.desmos.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.desmos.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.desmos.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.desmos.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.desmos.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.desmos.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.desmos.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.desmos.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.desmos.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'desmos' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.desmos.health_color]" :style="{'--speed': store.networks.desmos.speed + 's'}"></div>
                </div>


                <div class="account">
                    <button class="connect_wallet_btn" @click.prevent="emitter.emit('connectWallet')" v-if="!store.auth">
                        {{ $t('message.connect_wallet') }}
                    </button>

                    <template v-else>
                        <div class="user_name">{{ store.userName }}</div>

                        <div class="balance" v-if="store.currency == 'USDT'">{{ $filters.toFixed(store.account.balance_usdt, 1) }} {{ store.currency }}</div>
                        <div class="balance" v-if="store.currency == 'ATOM'">{{ $filters.toFixed(store.account.balance_atom, 2) }} {{ store.currency }}</div>
                        <div class="balance" v-if="store.currency == 'ETH'">{{ $filters.toFixed(store.account.balance_eth, 4) }} {{ store.currency }}</div>
                        <div class="balance" v-if="store.currency == 'BTC'">{{ $filters.toFixed(store.account.balance_btc, 5) }} {{ store.currency }}</div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val" v-if="store.currency == 'USDT'">{{ $filters.toFixed(store.account.RPDE_usdt, 3) }}</div>
                                <div class="val" v-if="store.currency == 'ATOM'">{{ $filters.toFixed(store.account.RPDE_atom, 3) }}</div>
                                <div class="val" v-if="store.currency == 'ETH'">{{ $filters.toFixed(store.account.RPDE_eth, 3) }}</div>
                                <div class="val" v-if="store.currency == 'BTC'">{{ $filters.toFixed(store.account.RPDE_btc, 3) }}</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.account.personal_APR, 2) }}%</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.osmosis.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/osmosis_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.osmosis.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/osmosis_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.osmosis.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.osmosis.tokens_sum, 2) }}
                            {{ store.networks.osmosis.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.osmosis.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.osmosis.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.osmosis.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.osmosis.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.osmosis.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.osmosis.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.osmosis.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.osmosis.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.osmosis.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'osmosis' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.osmosis.health_color]" :style="{'--speed': store.networks.osmosis.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.crescent.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/crescent_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.crescent.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/crescent_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.crescent.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.crescent.tokens_sum, 2) }}
                            {{ store.networks.crescent.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.crescent.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.crescent.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.crescent.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.crescent.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.crescent.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.crescent.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.crescent.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.crescent.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.crescent.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'crescent' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.crescent.health_color]" :style="{'--speed': store.networks.crescent.speed + 's'}"></div>
                </div>
            </div>


            <div class="row">
                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.gravity.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/g-bridge_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.gravity.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/g-bridge_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.gravity.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.gravity.tokens_sum, 2) }}
                            {{ store.networks.gravity.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.gravity.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.gravity.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.gravity.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.gravity.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.gravity.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.gravity.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.gravity.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.gravity.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.gravity.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'gravity' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.gravity.health_color]" :style="{'--speed': store.networks.gravity.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.stargaze.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/stargaze_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.stargaze.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/stargaze_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.stargaze.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.stargaze.tokens_sum, 2) }}
                            {{ store.networks.stargaze.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.stargaze.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.stargaze.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.stargaze.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.stargaze.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.stargaze.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.stargaze.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.stargaze.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.stargaze.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.stargaze.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'stargaze' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.stargaze.health_color]" :style="{'--speed': store.networks.stargaze.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.omniflix.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/omniflix_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.omniflix.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/omniflix_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.omniflix.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.omniflix.tokens_sum, 2) }}
                            {{ store.networks.omniflix.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.omniflix.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.omniflix.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.omniflix.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.omniflix.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.omniflix.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.omniflix.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.omniflix.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.omniflix.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.omniflix.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'omniflix' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.omniflix.health_color]" :style="{'--speed': store.networks.omniflix.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.auth, disabled: !store.networks.stride.status && store.auth}">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/stride_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.stride.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/stride_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.stride.name }}</div>
                        </div>

                        <div class="tokens">
                            {{ $filters.toFixed(store.networks.stride.tokens_sum, 2) }}
                            {{ store.networks.stride.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" v-show="store.networks.stride.delegations_tokens"></div>
                            <div class="liquid" v-show="store.networks.stride.availabel_tokens"></div>
                            <div class="rewards" v-show="store.networks.stride.rewards_tokens"></div>
                            <div class="IBC" v-show="store.networks.stride.ibc_tokens"></div>
                        </div>

                        <!-- <div class="progress">
                            <div class="bar" :style="{'width': $filters.toFixed(store.networks.stride.delegations_percents, 2) + '%'}"></div>
                            <div class="bar orange" :style="{'width': $filters.toFixed(store.networks.stride.rewards_percents, 2) + '%'}"></div>
                        </div> -->

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.stride.personal_APR, 2) }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ $filters.toFixed(store.networks.stride.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn" v-if="store.networks.stride.status && store.auth">{{ $t('message.details') }}</a>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'stride' })">{{ $t('message.delegate_btn') }}</button>
                    </template>

                    <div class="shadow" :class="[store.networks.stride.health_color]" :style="{'--speed': store.networks.stride.speed + 's'}"></div>
                </div>
            </div>
        </div>
    </section>
    </transition>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const emitter = inject('emitter'),
        store = useGlobalStore()
</script>


<style scoped>
    .dashboard
    {
        padding-bottom: 24px;
    }


    .dashboard .row
    {
        margin-bottom: -7px;
        margin-left: -7px;

        justify-content: center;
    }

    .dashboard .row + .row
    {
        margin-top: -82px;
    }


    .dashboard .row > *
    {
        width: calc(20% - 7px);
        margin-bottom: 7px;
        margin-left: 7px;
    }


    .dashboard .row > *
    {
        color: #fff;

        position: relative;
        z-index: 3;

        display: flex;
        flex-direction: column;

        width: 280px;
        height: 324px;
        padding: 48px 38px 64px;

        pointer-events: none;
    }

    .dashboard .row > *:before
    {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';

        background: #141414;

        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    }

    .dashboard .row > *.hidden:before
    {
        display: none;
    }


    .dashboard .shadow
    {
        position: absolute;
        z-index: -2;
        top: -3px;
        left: -3px;

        display: block;

        width: calc(100% + 6px);
        height: calc(100% + 6px);

        --speed: 10s;
        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    }


    .dashboard .shadow:after
    {
        position: absolute;
        top: -24px;
        left: -24px;

        display: block;

        width: calc(100% + 48px);
        height: calc(100% + 48px);

        content: '';
        -webkit-animation: spin var(--speed) linear infinite;
           -moz-animation: spin var(--speed) linear infinite;
                animation: spin var(--speed) linear infinite;
    }

    .dashboard .shadow.green:after
    {
        background:    -moz-linear-gradient(top, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
        background: -webkit-linear-gradient(top, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
        background:         linear-gradient(to bottom, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
    }

    .dashboard .shadow.orange:after
    {
        background:    -moz-linear-gradient(top, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
        background: -webkit-linear-gradient(top, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
        background:         linear-gradient(to bottom, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
    }

    .dashboard .shadow.red:after
    {
        background:    -moz-linear-gradient(top, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
        background: -webkit-linear-gradient(top, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
        background:         linear-gradient(to bottom, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
    }

    .dashboard .shadow.grey:after
    {
        background: #212121;
    }


    .dashboard .head
    {
        display: flex;

        width: 100%;
        margin-bottom: 20px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }


    .dashboard .logo
    {
        position: relative;

        display: flex;

        width: 30px;
        height: 30px;

        border-radius: 50%;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }


    .dashboard .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: inherit;
    }


    .dashboard .name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;

        max-width: calc(100% - 40px);
        margin-left: 10px;
    }


    .dashboard .tokens
    {
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;

        margin-bottom: 10px;

        text-align: center;
        white-space: nowrap;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    .dashboard .visualization
    {
        display: flex;

        height: 12px;
        margin-bottom: 12px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .dashboard .visualization > *
    {
        width: 100%;
        height: 12px;

        border-radius: 20px;
    }

    .dashboard .visualization > * + *
    {
        margin-left: 6px;
    }

    .dashboard .visualization .staked
    {
        background: #0b2272;
    }

    .dashboard .visualization .liquid
    {
        background: #4075fd;
    }

    .dashboard .visualization .rewards
    {
        background: #f17344;
    }

    .dashboard .visualization .IBC
    {
        background: #9b3915;
    }


    .dashboard .progress
    {
        display: flex;
        overflow: hidden;

        height: 13px;
        margin-bottom: 12px;

        border-radius: 20px;
        background: #0b2272;

        align-content: stretch;
        align-items: stretch;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .dashboard .progress .bar
    {
        height: 13px;

        transition: width .2s linear;

        background: #4075fd;
    }

    .dashboard .progress .bar.orange
    {
        background: orange;
    }


    .dashboard .stats
    {
        font-size: 12px;
        line-height: 15px;

        width: 100%;
        margin-bottom: 20px;
    }


    .dashboard .stats > *
    {
        display: flex;

        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .dashboard .stats > * + *
    {
        margin-top: 7px;
        padding-top: 6px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .dashboard .stats .label
    {
        position: relative;

        margin-right: 10px;
    }


    .dashboard .stats .val
    {
        font-weight: 500;
    }


    .dashboard .details_btn,
    .dashboard .delegate_btn
    {
        color: currentColor;
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;

        display: block;

        margin: auto auto 0;
        padding: 9px 29px 10px;

        transition: .2s linear;
        text-decoration: none;
        pointer-events: auto;

        border: 1px solid #353535;
        border-radius: 40px;
    }

    .dashboard .delegate_btn,
    .dashboard .details_btn:hover
    {
        color: #fff;

        border-color: #950fff;
        background: #950fff;
    }



    .dashboard .network.empty
    {
        color: #464646;
        font-size: 30px;
        font-weight: 700;
        line-height: 36px;

        flex-direction: row;

        text-align: center;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .dashboard .network.empty .shadow:after
    {
        background: #212121;
    }


    .dashboard .network.empty .logo
    {
        position: relative;

        display: flex;

        width: 60px;
        height: 60px;
        margin: 0 auto 10px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .dashboard .network.empty .logo + div
    {
        width: 100%;
    }

    .dashboard .network.empty .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: 50%;
    }

    .dashboard .network.empty .logo:after
    {
        position: absolute;
        z-index: 2;
        top: -1px;
        left: -1px;

        display: block;

        width: calc(100% + 2px);
        height: calc(100% + 2px);

        content: '';

        border-radius: 50%;
        background: rgba(20, 20, 20, .8);
    }



    .dashboard .row > *.disabled
    {
        color: #464646;
    }

    .dashboard .disabled .logo:after
    {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';

        opacity: .8;
        border-radius: inherit;
        background: #141414;
    }

    .dashboard .disabled .progress,
    .dashboard .disabled .progress .bar
    {
        background: #282828;
    }

    .dashboard .network.disabled .shadow:after
    {
        background: #212121;
    }



    .dashboard .row > *.account:before
    {
        background: #3c0666;
    }


    .dashboard .account
    {
        position: relative;
    }


    .dashboard .account .user_name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;

        overflow: hidden;

        width: 102px;
        margin: 0 auto 20px;

        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .dashboard .account .balance
    {
        font-size: 30px;
        font-weight: 700;
        line-height: 36px;

        margin-bottom: 18px;

        text-align: center;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    .dashboard .account .connect_wallet_btn
    {
        color: #000;
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: block;

        width: 128px;
        height: 35px;
        margin: auto;

        transition: .2s linear;
        pointer-events: auto;

        border-radius: 50px;
        background: #fff;
    }

    .dashboard .account .connect_wallet_btn:hover
    {
        color: #fff;

        background: #950fff;
    }


    .dashboard .account .shadow:after
    {
        background: #950fff;
    }



    @-moz-keyframes spin
    {
        100%
        {
            -moz-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin
    {
        100%
        {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin
    {
        100%
        {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }

</style>
