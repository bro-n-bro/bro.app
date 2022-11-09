<template>
    <transition name="fade" mode="out-in" appear type="animation">
    <section class="dashboard">
        <div class="cont">
            <div class="row">
                <!-- Evmos -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.evmos.status && store.auth,
                    default: store.networks.evmos.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/evmos_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.evmos.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.evmos.health, 2),
                            color: store.networks.evmos.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/evmos_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.evmos.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.evmos.name }))">
                            {{ $filters.toFixed(store.networks.evmos.tokens_sum, 2) }}
                            {{ store.networks.evmos.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.evmos.delegations_percents, 2) + '%'}" v-show="store.networks.evmos.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.evmos.delegations_tokens,
                                denom: store.networks.evmos.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.evmos.availabel_percents, 2) + '%'}" v-show="store.networks.evmos.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.evmos.availabel_tokens,
                                denom: store.networks.evmos.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.evmos.rewards_percents, 2) + '%'}" v-show="store.networks.evmos.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.evmos.rewards_tokens,
                                denom: store.networks.evmos.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.evmos.ibc_percents, 2) + '%'}" v-show="store.networks.evmos.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.evmos.ibc_tokens,
                                denom: store.networks.evmos.token_name,
                                network: store.networks.evmos.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.evmos.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.evmos.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.evmos.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.evmos.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.evmos.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'evmos' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'evmos' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.evmos.health_color]" :style="{'--speed': store.networks.evmos.speed + 's'}"></div>
                </div>


                <!-- Juno -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.juno.status && store.auth,
                    default: store.networks.juno.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/juno_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.juno.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.juno.health, 2),
                            color: store.networks.juno.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/juno_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.juno.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.juno.name }))">
                            {{ $filters.toFixed(store.networks.juno.tokens_sum, 2) }}
                            {{ store.networks.juno.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.juno.delegations_percents, 2) + '%'}" v-show="store.networks.juno.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.juno.delegations_tokens,
                                denom: store.networks.juno.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.juno.availabel_percents, 2) + '%'}" v-show="store.networks.juno.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.juno.availabel_tokens,
                                denom: store.networks.juno.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.juno.rewards_percents, 2) + '%'}" v-show="store.networks.juno.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.juno.rewards_tokens,
                                denom: store.networks.juno.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.juno.ibc_percents, 2) + '%'}" v-show="store.networks.juno.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.juno.ibc_tokens,
                                denom: store.networks.juno.token_name,
                                network: store.networks.juno.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.juno.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.juno.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.juno.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.juno.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.juno.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'juno' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'juno' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.juno.health_color]" :style="{'--speed': store.networks.juno.speed + 's'}"></div>
                </div>


                <!-- Сosmos hub -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.cosmoshub.status && store.auth,
                    default: store.networks.cosmoshub.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/cosmos_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.cosmoshub.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.cosmoshub.health, 2),
                            color: store.networks.cosmoshub.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/cosmos_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.cosmoshub.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.cosmoshub.name }))">
                            {{ $filters.toFixed(store.networks.cosmoshub.tokens_sum, 2) }}
                            {{ store.networks.cosmoshub.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.cosmoshub.delegations_percents, 2) + '%'}" v-show="store.networks.cosmoshub.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.cosmoshub.delegations_tokens,
                                denom: store.networks.cosmoshub.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.cosmoshub.availabel_percents, 2) + '%'}" v-show="store.networks.cosmoshub.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.cosmoshub.availabel_tokens,
                                denom: store.networks.cosmoshub.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.cosmoshub.rewards_percents, 2) + '%'}" v-show="store.networks.cosmoshub.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.cosmoshub.rewards_tokens,
                                denom: store.networks.cosmoshub.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.cosmoshub.ibc_percents, 2) + '%'}" v-show="store.networks.cosmoshub.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.cosmoshub.ibc_tokens,
                                denom: store.networks.cosmoshub.token_name,
                                network: store.networks.cosmoshub.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.cosmoshub.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.cosmoshub.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.cosmoshub.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.cosmoshub.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.cosmoshub.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'cosmoshub' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'cosmoshub' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.cosmoshub.health_color]" :style="{'--speed': store.networks.cosmoshub.speed + 's'}"></div>
                </div>


                <!-- Bostrom -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.bostrom.status && store.auth,
                    default: store.networks.bostrom.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/bostrom_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.bostrom.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.bostrom.health, 2),
                            color: store.networks.bostrom.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/bostrom_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.bostrom.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.bostrom.name }))">
                            {{ $filters.toFixed(store.networks.bostrom.tokens_sum, 2) }}
                            {{ store.networks.bostrom.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.bostrom.delegations_percents, 2) + '%'}" v-show="store.networks.bostrom.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.bostrom.delegations_tokens,
                                denom: store.networks.bostrom.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.bostrom.availabel_percents, 2) + '%'}" v-show="store.networks.bostrom.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.bostrom.availabel_tokens,
                                denom: store.networks.bostrom.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.bostrom.rewards_percents, 2) + '%'}" v-show="store.networks.bostrom.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.bostrom.rewards_tokens,
                                denom: store.networks.bostrom.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.bostrom.ibc_percents, 2) + '%'}" v-show="store.networks.bostrom.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.bostrom.ibc_tokens,
                                denom: store.networks.bostrom.token_name,
                                network: store.networks.bostrom.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.bostrom.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.bostrom.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.bostrom.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.bostrom.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.bostrom.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'bostrom' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'bostrom' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.bostrom.health_color]" :style="{'--speed': store.networks.bostrom.speed + 's'}"></div>
                </div>
            </div>


            <!-- E-money -->
            <div class="row">
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.emoney.status && store.auth,
                    default: store.networks.emoney.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/e-money_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.emoney.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.emoney.health, 2),
                            color: store.networks.emoney.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/e-money_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.emoney.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.emoney.name }))">
                            {{ $filters.toFixed(store.networks.emoney.tokens_sum, 2) }}
                            {{ store.networks.emoney.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.emoney.delegations_percents, 2) + '%'}" v-show="store.networks.emoney.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.emoney.delegations_tokens,
                                denom: store.networks.emoney.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.emoney.availabel_percents, 2) + '%'}" v-show="store.networks.emoney.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.emoney.availabel_tokens,
                                denom: store.networks.emoney.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.emoney.rewards_percents, 2) + '%'}" v-show="store.networks.emoney.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.emoney.rewards_tokens,
                                denom: store.networks.emoney.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.emoney.ibc_percents, 2) + '%'}" v-show="store.networks.emoney.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.emoney.ibc_tokens,
                                denom: store.networks.emoney.token_name,
                                network: store.networks.emoney.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.emoney.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.emoney.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.emoney.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.emoney.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.emoney.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'emoney' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'emoney' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.emoney.health_color]" :style="{'--speed': store.networks.emoney.speed + 's'}"></div>
                </div>


                <!-- Desmos -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.desmos.status && store.auth,
                    default: store.networks.desmos.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/desmos_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.desmos.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.desmos.health, 2),
                            color: store.networks.desmos.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/desmos_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.desmos.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.desmos.name }))">
                            {{ $filters.toFixed(store.networks.desmos.tokens_sum, 2) }}
                            {{ store.networks.desmos.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.desmos.delegations_percents, 2) + '%'}" v-show="store.networks.desmos.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.desmos.delegations_tokens,
                                denom: store.networks.desmos.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.desmos.availabel_percents, 2) + '%'}" v-show="store.networks.desmos.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.desmos.availabel_tokens,
                                denom: store.networks.desmos.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.desmos.rewards_percents, 2) + '%'}" v-show="store.networks.desmos.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.desmos.rewards_tokens,
                                denom: store.networks.desmos.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.desmos.ibc_percents, 2) + '%'}" v-show="store.networks.desmos.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.desmos.ibc_tokens,
                                denom: store.networks.desmos.token_name,
                                network: store.networks.desmos.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.desmos.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.desmos.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.desmos.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.desmos.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.desmos.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'desmos' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'desmos' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.desmos.health_color]" :style="{'--speed': store.networks.desmos.speed + 's'}"></div>
                </div>


                <!-- Account -->
                <div class="account">
                    <button class="connect_wallet_btn" @click.prevent="emitter.emit('connectWallet')" v-if="!store.auth">
                        {{ $t('message.connect_wallet_btn') }}
                    </button>

                    <template v-else>
                        <div class="user_name">{{ store.userName }}</div>

                        <div class="balance" @mouseover="emitter.emit('setNotification', $t('message.account_balance_notice'))">
                            <template v-if="store.currency == 'USDT'">
                            {{ $filters.toFixed(store.account.balance_usdt, 1) }}
                            </template>

                            <template v-if="store.currency == 'ATOM'">
                            {{ $filters.toFixed(store.account.balance_atom, 2) }}
                            </template>

                            <template v-if="store.currency == 'ETH'">
                            {{ $filters.toFixed(store.account.balance_eth, 4) }}
                            </template>

                            <template v-if="store.currency == 'BTC'">
                            {{ $filters.toFixed(store.account.balance_btc, 5) }}
                            </template>

                            {{ store.currency }}
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.account_personal_APR_notice'))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">
                                    <template v-if="store.currency == 'USDT'">
                                    {{ $filters.toFixed(store.account.RPDE_usdt, 3) }}
                                    </template>

                                    <template v-if="store.currency == 'ATOM'">
                                    {{ $filters.toFixed(store.account.RPDE_atom, 3) }}
                                    </template>

                                    <template v-if="store.currency == 'ETH'">
                                    {{ $filters.toFixed(store.account.RPDE_eth, 3) }}
                                    </template>

                                    <template v-if="store.currency == 'BTC'">
                                    {{ $filters.toFixed(store.account.RPDE_btc, 3) }}
                                    </template>
                                </div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.account_RPDE_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val">{{ $filters.toFixed(store.account.personal_APR, 2) }}%</div>
                            </div>
                        </div>

                        <router-link to="/under_construction" class="details_btn">{{ $t('message.details_btn') }}</router-link>
                    </template>

                    <div class="shadow"></div>
                </div>


                <!-- Osmosis -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.osmosis.status && store.auth,
                    default: store.networks.osmosis.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/osmosis_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.osmosis.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.osmosis.health, 2),
                            color: store.networks.osmosis.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/osmosis_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.osmosis.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.osmosis.name }))">
                            {{ $filters.toFixed(store.networks.osmosis.tokens_sum, 2) }}
                            {{ store.networks.osmosis.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.osmosis.delegations_percents, 2) + '%'}" v-show="store.networks.osmosis.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.osmosis.delegations_tokens,
                                denom: store.networks.osmosis.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.osmosis.availabel_percents, 2) + '%'}" v-show="store.networks.osmosis.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.osmosis.availabel_tokens,
                                denom: store.networks.osmosis.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.osmosis.rewards_percents, 2) + '%'}" v-show="store.networks.osmosis.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.osmosis.rewards_tokens,
                                denom: store.networks.osmosis.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.osmosis.ibc_percents, 2) + '%'}" v-show="store.networks.osmosis.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.osmosis.ibc_tokens,
                                denom: store.networks.osmosis.token_name,
                                network: store.networks.osmosis.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.osmosis.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.osmosis.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.osmosis.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.osmosis.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.osmosis.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'osmosis' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'osmosis' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.osmosis.health_color]" :style="{'--speed': store.networks.osmosis.speed + 's'}"></div>
                </div>


                <!-- Crescent -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.crescent.status && store.auth,
                    default: store.networks.crescent.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/crescent_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.crescent.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.crescent.health, 2),
                            color: store.networks.crescent.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/crescent_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.crescent.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.crescent.name }))">
                            {{ $filters.toFixed(store.networks.crescent.tokens_sum, 2) }}
                            {{ store.networks.crescent.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.crescent.delegations_percents, 2) + '%'}" v-show="store.networks.crescent.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.crescent.delegations_tokens,
                                denom: store.networks.crescent.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.crescent.availabel_percents, 2) + '%'}" v-show="store.networks.crescent.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.crescent.availabel_tokens,
                                denom: store.networks.crescent.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.crescent.rewards_percents, 2) + '%'}" v-show="store.networks.crescent.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.crescent.rewards_tokens,
                                denom: store.networks.crescent.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.crescent.ibc_percents, 2) + '%'}" v-show="store.networks.crescent.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.crescent.ibc_tokens,
                                denom: store.networks.crescent.token_name,
                                network: store.networks.crescent.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.crescent.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.crescent.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.crescent.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.crescent.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.crescent.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'crescent' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'crescent' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.crescent.health_color]" :style="{'--speed': store.networks.crescent.speed + 's'}"></div>
                </div>
            </div>


            <!-- Gravity bridge -->
            <div class="row">
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.gravity.status && store.auth,
                    default: store.networks.gravity.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/g-bridge_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.gravity.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.gravity.health, 2),
                            color: store.networks.gravity.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/g-bridge_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.gravity.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.gravity.name }))">
                            {{ $filters.toFixed(store.networks.gravity.tokens_sum, 2) }}
                            {{ store.networks.gravity.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.gravity.delegations_percents, 2) + '%'}" v-show="store.networks.gravity.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.gravity.delegations_tokens,
                                denom: store.networks.gravity.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.gravity.availabel_percents, 2) + '%'}" v-show="store.networks.gravity.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.gravity.availabel_tokens,
                                denom: store.networks.gravity.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.gravity.rewards_percents, 2) + '%'}" v-show="store.networks.gravity.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.gravity.rewards_tokens,
                                denom: store.networks.gravity.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.gravity.ibc_percents, 2) + '%'}" v-show="store.networks.gravity.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.gravity.ibc_tokens,
                                denom: store.networks.gravity.token_name,
                                network: store.networks.gravity.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.gravity.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.gravity.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.gravity.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.gravity.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.gravity.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'gravity' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'gravity' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.gravity.health_color]" :style="{'--speed': store.networks.gravity.speed + 's'}"></div>
                </div>


                <!-- Stargaze -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.stargaze.status && store.auth,
                    default: store.networks.stargaze.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/stargaze_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.stargaze.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.stargaze.health, 2),
                            color: store.networks.stargaze.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/stargaze_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.stargaze.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.stargaze.name }))">
                            {{ $filters.toFixed(store.networks.stargaze.tokens_sum, 2) }}
                            {{ store.networks.stargaze.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.stargaze.delegations_percents, 2) + '%'}" v-show="store.networks.stargaze.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.stargaze.delegations_tokens,
                                denom: store.networks.stargaze.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.stargaze.availabel_percents, 2) + '%'}" v-show="store.networks.stargaze.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.stargaze.availabel_tokens,
                                denom: store.networks.stargaze.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.stargaze.rewards_percents, 2) + '%'}" v-show="store.networks.stargaze.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.stargaze.rewards_tokens,
                                denom: store.networks.stargaze.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.stargaze.ibc_percents, 2) + '%'}" v-show="store.networks.stargaze.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.stargaze.ibc_tokens,
                                denom: store.networks.stargaze.token_name,
                                network: store.networks.stargaze.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.stargaze.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.stargaze.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.stargaze.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.stargaze.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.stargaze.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'stargaze' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'stargaze' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.stargaze.health_color]" :style="{'--speed': store.networks.stargaze.speed + 's'}"></div>
                </div>


                <!-- Omniflix hub -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.omniflix.status && store.auth,
                    default: store.networks.omniflix.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/omniflix_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.omniflix.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.omniflix.health, 2),
                            color: store.networks.omniflix.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/omniflix_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.omniflix.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.omniflix.name }))">
                            {{ $filters.toFixed(store.networks.omniflix.tokens_sum, 2) }}
                            {{ store.networks.omniflix.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.omniflix.delegations_percents, 2) + '%'}" v-show="store.networks.omniflix.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.omniflix.delegations_tokens,
                                denom: store.networks.omniflix.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.omniflix.availabel_percents, 2) + '%'}" v-show="store.networks.omniflix.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.omniflix.availabel_tokens,
                                denom: store.networks.omniflix.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.omniflix.rewards_percents, 2) + '%'}" v-show="store.networks.omniflix.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.omniflix.rewards_tokens,
                                denom: store.networks.omniflix.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.omniflix.ibc_percents, 2) + '%'}" v-show="store.networks.omniflix.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.omniflix.ibc_tokens,
                                denom: store.networks.omniflix.token_name,
                                network: store.networks.omniflix.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.omniflix.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.omniflix.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.omniflix.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.omniflix.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.omniflix.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'omniflix' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'omniflix' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.omniflix.health_color]" :style="{'--speed': store.networks.omniflix.speed + 's'}"></div>
                </div>


                <!-- Stride -->
                <div class="network" :class="{
                    empty: !store.auth,
                    disabled: !store.networks.stride.status && store.auth,
                    default: store.networks.stride.tokens_sum
                }">
                    <template v-if="!store.auth">
                        <div class="logo">
                            <img src="../assets/images/stride_logo.png" alt="">
                        </div>

                        <div>{{ store.networks.stride.name }}</div>
                    </template>

                    <template v-else>
                        <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                            health: $filters.toFixed(store.networks.stride.health, 2),
                            color: store.networks.stride.health_color
                        }))">
                            <div class="logo">
                                <img src="../assets/images/stride_logo.png" alt="">
                            </div>

                            <div class="name">{{ store.networks.stride.name }}</div>
                        </div>

                        <div class="tokens" @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks.stride.name }))">
                            {{ $filters.toFixed(store.networks.stride.tokens_sum, 2) }}
                            {{ store.networks.stride.token_name }}
                        </div>

                        <div class="visualization">
                            <div class="staked" :style="{'width': $filters.toFixed(store.networks.stride.delegations_percents, 2) + '%'}" v-show="store.networks.stride.delegations_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_staked_tokens_notice', {
                                value: store.networks.stride.delegations_tokens,
                                denom: store.networks.stride.token_name
                            }))"></div>

                            <div class="liquid" :style="{'width': $filters.toFixed(store.networks.stride.availabel_percents, 2) + '%'}" v-show="store.networks.stride.availabel_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_liquid_tokens_notice', {
                                value: store.networks.stride.availabel_tokens,
                                denom: store.networks.stride.token_name
                            }))"></div>

                            <div class="rewards" :style="{'width': $filters.toFixed(store.networks.stride.rewards_percents, 2) + '%'}" v-show="store.networks.stride.rewards_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_rewards_tokens_notice', {
                                value: store.networks.stride.rewards_tokens,
                                denom: store.networks.stride.token_name
                            }))"></div>

                            <div class="IBC" :style="{'width': $filters.toFixed(store.networks.stride.ibc_percents, 2) + '%'}" v-show="store.networks.stride.ibc_tokens"
                            @mouseover="emitter.emit('setNotification', $t('message.network_ibc_tokens_notice', {
                                value: store.networks.stride.ibc_tokens,
                                denom: store.networks.stride.token_name,
                                network: store.networks.stride.name
                            }))"></div>
                        </div>

                        <div class="stats">
                            <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                                <div class="label">{{ $t('message.personal_apr') }}</div>

                                <div class="val"> {{ $filters.toFixed(store.networks.stride.personal_APR, 2) }}%</div>
                            </div>

                            <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks.stride.token_name}))">
                                <div class="label">{{ $t('message.RPDE') }}</div>

                                <div class="val">{{ $filters.toFixed(store.networks.stride.RPDE, 2) }}</div>
                            </div>
                        </div>

                        <!-- <a href="/" class="details_btn" v-if="store.networks.stride.status && store.auth">{{ $t('message.details') }}</a> -->
                        <button class="details_btn" v-if="store.networks.stride.status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: 'stride' })">
                            {{ $t('message.manage_btn') }}
                        </button>

                        <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: 'stride' })">
                            {{ $t('message.delegate_btn') }}
                        </button>
                    </template>

                    <div class="shadow" :class="[store.networks.stride.health_color]" :style="{'--speed': store.networks.stride.speed + 's'}"></div>
                </div>
            </div>

            <!-- <pre>{{ store.account }}</pre> -->
        </div>
    </section>
    </transition>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter')
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
        color: #fff;

        position: relative;
        z-index: 3;

        display: flex;
        flex-direction: column;

        width: calc(20% - 7px);
        width: 280px;
        height: 324px;
        margin-bottom: 7px;
        margin-left: 7px;
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

        transition: text-shadow .2s linear;
    }

    .dashboard .name:hover
    {
        text-shadow: -0   -1px 0   rgba( 149, 15, 255, .6 ),
        0   -1px 0   rgba( 149, 15, 255, .6 ),
        -0    1px 0   rgba( 149, 15, 255, .6 ),
        0    1px 0   rgba( 149, 15, 255, .6 ),
        -1px -0   0   rgba( 149, 15, 255, .6 ),
        1px -0   0   rgba( 149, 15, 255, .6 ),
        -1px  0   0   rgba( 149, 15, 255, .6 ),
        1px  0   0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        2px 5px 15px rgba(149, 15, 255, .45);
    }


    .dashboard .tokens
    {
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;

        margin-bottom: 10px;

        transition: text-shadow .2s linear;
        text-align: center;
        white-space: nowrap;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }

    .dashboard .tokens:hover
    {
        text-shadow: -0   -1px 0   rgba( 149, 15, 255, .6 ),
        0   -1px 0   rgba( 149, 15, 255, .6 ),
        -0    1px 0   rgba( 149, 15, 255, .6 ),
        0    1px 0   rgba( 149, 15, 255, .6 ),
        -1px -0   0   rgba( 149, 15, 255, .6 ),
        1px -0   0   rgba( 149, 15, 255, .6 ),
        -1px  0   0   rgba( 149, 15, 255, .6 ),
        1px  0   0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        2px 5px 15px rgba(149, 15, 255, .45);
    }


    .dashboard .visualization
    {
        display: flex;
        visibility: hidden;

        height: 12px;
        margin-bottom: 12px;

        transition: .2s linear;
        transition-property: opacity, visibility;
        pointer-events: none;

        opacity: 0;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .dashboard .network:not(.disabled) .visualization
    {
        visibility: visible;

        pointer-events: auto;

        opacity: 1;
    }


    .dashboard .visualization > *
    {
        min-width: 24px;
        height: 12px;

        transition: .2s linear;

        border-radius: 10px;
    }

    .dashboard .visualization > * + *
    {
        margin-left: 6px;
    }

    .dashboard .visualization .staked
    {
        background: #950fff;
    }

    .dashboard .visualization .liquid
    {
        background: #eb5757;
    }

    .dashboard .visualization .rewards
    {
        background: #1bc562;
    }

    .dashboard .visualization .IBC
    {
        background: #c5811b;
    }

    .dashboard .visualization .staked:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .65);
    }

    .dashboard .visualization .liquid:hover
    {
        box-shadow: 2px 5px 15px rgba(235, 87, 87, .65);
    }

    .dashboard .visualization .rewards:hover
    {
        box-shadow: 2px 5px 15px rgba(27, 197, 98, .65);
    }

    .dashboard .visualization .IBC:hover
    {
        box-shadow: 2px 5px 15px rgba(197, 129, 27, .65);
    }


    .dashboard .stats
    {
        font-size: 12px;
        line-height: 15px;

        width: 100%;
        margin-bottom: 20px;
    }

    .dashboard .network:not(.disabled) .stats
    {
        pointer-events: auto;
    }


    .dashboard .stats > *
    {
        display: flex;

        transition: text-shadow .2s linear;

        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .dashboard .stats > *:hover
    {
        text-shadow: -0   -1px 0   rgba( 149, 15, 255, .6 ),
        0   -1px 0   rgba( 149, 15, 255, .6 ),
        -0    1px 0   rgba( 149, 15, 255, .6 ),
        0    1px 0   rgba( 149, 15, 255, .6 ),
        -1px -0   0   rgba( 149, 15, 255, .6 ),
        1px -0   0   rgba( 149, 15, 255, .6 ),
        -1px  0   0   rgba( 149, 15, 255, .6 ),
        1px  0   0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        2px 5px 15px rgba(149, 15, 255, .45);
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

    .dashboard .disabled:not(.default) .delegate_btn
    {
        opacity: .65;
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

    .dashboard .disabled:not(.default) .logo:after
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

    .dashboard .network.disabled .shadow:after
    {
        background: #212121;
    }


    .dashboard .network:not(.disabled) .head,
    .dashboard .network:not(.disabled) .tokens
    {
        pointer-events: auto;
    }

    .dashboard .network.default .head,
    .dashboard .network.default .tokens
    {
        color: #fff;
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

        transition: text-shadow .2s linear;
        text-align: center;
        pointer-events: auto;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }

    .dashboard .account .balance:hover
    {
        text-shadow: -0   -1px 0   rgba( 149, 15, 255, .6 ),
        0   -1px 0   rgba( 149, 15, 255, .6 ),
        -0    1px 0   rgba( 149, 15, 255, .6 ),
        0    1px 0   rgba( 149, 15, 255, .6 ),
        -1px -0   0   rgba( 149, 15, 255, .6 ),
        1px -0   0   rgba( 149, 15, 255, .6 ),
        -1px  0   0   rgba( 149, 15, 255, .6 ),
        1px  0   0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        -1px -1px 0   rgba( 149, 15, 255, .6 ),
        1px -1px 0   rgba( 149, 15, 255, .6 ),
        -1px  1px 0   rgba( 149, 15, 255, .6 ),
        1px  1px 0   rgba( 149, 15, 255, .6 ),
        2px 5px 15px rgba(149, 15, 255, .45);
    }


    .dashboard .account .stats
    {
        pointer-events: auto;
    }


    .dashboard .account .details_btn
    {
        border-color: rgba(255, 255, 255, .2);
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
