<template>
    <section class="dashboard">
        <div class="cont">
            <div class="row">
                <div class="network" empty></div>

                <!-- <div class="network" :class="{ empty: !store.networks.evmos.status}">
                    <template v-if="!store.networks.evmos.status">
                        <div class="logo">
                            <img src="../assets/images/evmos_logo.png" alt="">
                        </div>

                        <div>Evmos</div>
                    </template>

                    <template v-else>
                        <div class="head">
                            <div class="logo">
                                <img src="../assets/images/evmos_logo.png" alt="">
                            </div>

                            <div class="name">Evmos</div>
                        </div>

                        <div class="tokens">2,123.43 MBOOT</div>

                        <div class="progress">
                            <div class="bar" style="width: 0%;"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">0%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">0</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.evmos.health_color]" :style="{'--speed': store.networks.evmos.speed + 's'}"></div>
                </div> -->


                <div class="network" :class="{ empty: !store.networks.juno.status}">
                    <template v-if="!store.networks.juno.status">
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

                        <div class="tokens">{{ store.networks.juno.delegations_sum }} JUNO</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.juno.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.juno.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.juno.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.juno.health_color]" :style="{'--speed': store.networks.juno.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.cosmoshub.status}">
                    <template v-if="!store.networks.cosmoshub.status">
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

                        <div class="tokens">{{ store.networks.cosmoshub.delegations_sum }} ATOM</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.cosmoshub.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.cosmoshub.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.cosmoshub.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.cosmoshub.health_color]" :style="{'--speed': store.networks.cosmoshub.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.bostrom.status}">
                    <template v-if="!store.networks.bostrom.status">
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

                        <div class="tokens">{{ store.networks.bostrom.delegations_sum }} MBOOT</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.bostrom.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.bostrom.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.bostrom.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.bostrom.health_color]" :style="{'--speed': store.networks.bostrom.speed + 's'}"></div>
                </div>
            </div>


            <div class="row">
                <div class="network" :class="{ empty: !store.networks.emoney.status}">
                    <template v-if="!store.networks.emoney.status">
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

                        <div class="tokens">{{ store.networks.emoney.delegations_sum }} NGM</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.emoney.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.emoney.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.emoney.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.emoney.health_color]" :style="{'--speed': store.networks.emoney.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.desmos.status}">
                    <template v-if="!store.networks.desmos.status">
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

                        <div class="tokens">{{ store.networks.desmos.delegations_sum }} MBOOT</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.desmos.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.desmos.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.desmos.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.desmos.health_color]" :style="{'--speed': store.networks.desmos.speed + 's'}"></div>
                </div>


                <div class="account">
                    <button class="connect_wallet_btn" @click.prevent="emitter.emit('connectWallet')" v-if="!store.auth">
                        {{ $t('message.connect_wallet') }}
                    </button>

                    <template v-else>
                        <div class="user_name">{{ store.userName }}</div>

                        <div class="balance" v-if="store.currency == 'USDT'">{{ store.balance_usdt }} {{ store.currency }}</div>
                        <div class="balance" v-if="store.currency == 'ATOM'">{{ store.balance_atom }} {{ store.currency }}</div>
                        <div class="balance" v-if="store.currency == 'ETH'">{{ store.balance_eth }} {{ store.currency }}</div>
                        <div class="balance" v-if="store.currency == 'BTC'">{{ store.balance_btc }} {{ store.currency }}</div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.RPDE }}</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.personal_APR }}%</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.osmosis.status}">
                    <template v-if="!store.networks.osmosis.status">
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

                        <div class="tokens">{{ store.networks.osmosis.delegations_sum }} OSMO</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.osmosis.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.osmosis.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.osmosis.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.osmosis.health_color]" :style="{'--speed': store.networks.osmosis.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.crescent.status}">
                    <template v-if="!store.networks.crescent.status">
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

                        <div class="tokens">{{ store.networks.crescent.delegations_sum }} CRE</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.crescent.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.crescent.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.crescent.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.crescent.health_color]" :style="{'--speed': store.networks.crescent.speed + 's'}"></div>
                </div>
            </div>


            <div class="row">
                <div class="network" :class="{ empty: !store.networks.gravity.status}">
                    <template v-if="!store.networks.gravity.status">
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

                        <div class="tokens">{{ store.networks.gravity.delegations_sum }} GRAV</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.gravity.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.gravity.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.gravity.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.gravity.health_color]" :style="{'--speed': store.networks.gravity.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.stargaze.status}">
                    <template v-if="!store.networks.stargaze.status">
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

                        <div class="tokens">{{ store.networks.stargaze.delegations_sum }} STAR</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.stargaze.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.stargaze.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.stargaze.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.stargaze.health_color]" :style="{'--speed': store.networks.stargaze.speed + 's'}"></div>
                </div>


                <div class="network" :class="{ empty: !store.networks.omniflix.status}">
                    <template v-if="!store.networks.omniflix.status">
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

                        <div class="tokens">{{ store.networks.omniflix.delegations_sum }} MBOOT</div>

                        <div class="progress">
                            <div class="bar" :style="{'width': store.networks.omniflix.availabel_percents + '%'}"></div>
                        </div>

                        <div class="stats">
                            <div>
                                <div class="label">{{ $t('message.personal_apr') }}</div>
                                <div class="val">{{ store.networks.omniflix.personal_APR }}%</div>
                            </div>

                            <div>
                                <div class="label">{{ $t('message.RPDE') }}</div>
                                <div class="val">{{ store.networks.omniflix.RPDE }}</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">{{ $t('message.details') }}</a>
                    </template>

                    <div class="shadow" :class="[store.networks.omniflix.health_color]" :style="{'--speed': store.networks.omniflix.speed + 's'}"></div>
                </div>


                <div class="network hidden"></div>
            </div>
        </div>
    </section>
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
    padding: 40px 38px 52px;

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

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


.dashboard .logo
{
    display: flex;

    width: 30px;
    height: 30px;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


.dashboard .logo img
{
    display: block;

    max-width: 100%;
    max-height: 100%;
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


.dashboard .progress
{
    height: 13px;
    margin-bottom: 12px;

    border-radius: 20px;
    background: #0b2272;
}

.dashboard .progress .bar
{
    height: 13px;

    transition: width .2s linear;

    border-radius: 20px;
    background: #4075fd;
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

    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
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

    align-items: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
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

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
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
    top: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 100%;

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
