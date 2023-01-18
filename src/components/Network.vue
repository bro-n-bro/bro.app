<template>
    <div class="network" :class="{
        empty: !store.auth,
        disabled: !store.networks[props.network].status && store.auth,
        default: store.networks[props.network].tokens_sum
    }">
        <template v-if="!store.auth">
            <div class="logo">
                <img :src="`/${props.network}_logo.png`" alt="">
            </div>

            <div>{{ store.networks[props.network].name }}</div>
        </template>

        <template v-else>
            <div class="head" @mouseover="emitter.emit('setNotification', $t('message.network_notice', {
                health: $filters.toFixed(store.networks[props.network].health, 2),
                color: store.networks[props.network].health_color
            }))">
                <div class="logo">
                    <img :src="`/${props.network}_logo.png`" alt="">
                </div>

                <div class="name">{{ store.networks[props.network].name }}</div>
            </div>

            <div class="tokens" v-show="store.networks[props.network].status"
                @mouseover="emitter.emit('setNotification', $t('message.network_sum_notice', { network: store.networks[props.network].name }))
            ">
                {{ $filters.toFixed(store.networks[props.network].tokens_sum, 2) }}
                {{ store.networks[props.network].token_name }}
            </div>

            <div class="visualization"  v-show="store.networks[props.network].status" @mouseover="emitter.emit('setNotification', $t('message.network_tokens_notice', {
                delegations_tokens: $filters.toFixed(store.networks[props.network].delegations_tokens, 6),
                availabel_tokens: $filters.toFixed(store.networks[props.network].availabel_tokens, 6),
                rewards_tokens: $filters.toFixed(store.networks[props.network].rewards_tokens, 6),
                ibc_tokens: $filters.toFixed(store.networks[props.network].ibc_tokens, 6),
                denom: store.networks[props.network].token_name,
                network: store.networks[props.network].name
            }))">
                <div class="staked" :style="{'width': $filters.toFixed(store.networks[props.network].delegations_percents, 2) + '%'}" v-show="store.networks[props.network].delegations_tokens"></div>

                <div class="liquid" :style="{'width': $filters.toFixed(store.networks[props.network].availabel_percents, 2) + '%'}" v-show="store.networks[props.network].availabel_tokens"></div>

                <div class="rewards" :style="{'width': $filters.toFixed(store.networks[props.network].rewards_percents, 2) + '%'}" v-show="store.networks[props.network].rewards_tokens"></div>

                <div class="IBC" :style="{'width': $filters.toFixed(store.networks[props.network].ibc_percents, 2) + '%'}" v-show="store.networks[props.network].ibc_tokens"></div>
            </div>

            <div class="stats" v-show="store.networks[props.network].status">
                <div @mouseover="emitter.emit('setNotification', $t('message.network_personal_APR_notice'))">
                    <div class="label">{{ $t('message.personal_apr') }}</div>

                    <div class="val">{{ $filters.toFixed(store.networks[props.network].personal_APR, 2) }}%</div>
                </div>

                <div @mouseover="emitter.emit('setNotification', $t('message.network_RPDE_notice', { denom: store.networks[props.network].token_name}))">
                    <div class="label">{{ $t('message.RPDE') }}</div>

                    <div class="val">{{ $filters.toFixed(store.networks[props.network].RPDE, 2) }}</div>
                </div>
            </div>

            <div class="lock" v-show="!store.networks[props.network].status">
                <svg><use xlink:href="/sprite.svg#ic_lock"></use></svg>
            </div>

            <!-- <a href="/" class="details_btn" v-if="store.networks[props.network].status && store.auth">{{ $t('message.details') }}</a> -->
            <button class="details_btn" v-if="store.networks[props.network].status && store.auth" @click.prevent="emitter.emit('open_manage_modal', { network: props.network })">
                {{ $t('message.manage_btn') }}
            </button>

            <button class="delegate_btn" v-else @click.prevent="emitter.emit('open_manage_modal', { network: props.network })">
                {{ $t('message.delegate_btn') }}
            </button>
        </template>

        <div class="shadow" :class="[store.networks[props.network].health_color]" :style="{'--speed': store.networks[props.network].speed + 's'}"></div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const props = defineProps(['network']),
        store = useGlobalStore(),
        emitter = inject('emitter')
</script>



<style scoped>
    .network
    {
        color: #fff;

        position: relative;
        z-index: 3;

        display: flex;
        flex-direction: column;

        width: 280px;
        height: 324px;
        margin-bottom: 7px;
        margin-left: 7px;
        padding: 58px 38px 64px;

        pointer-events: none;
    }

    .network:before
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

    .network.hidden:before
    {
        display: none;
    }


    .network .shadow
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


    .network .shadow:after
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

    .network .shadow.green:after
    {
        background:    -moz-linear-gradient(top, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
        background: -webkit-linear-gradient(top, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
        background:         linear-gradient(to bottom, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
    }

    .network .shadow.orange:after
    {
        background:    -moz-linear-gradient(top, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
        background: -webkit-linear-gradient(top, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
        background:         linear-gradient(to bottom, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
    }

    .network .shadow.red:after
    {
        background:    -moz-linear-gradient(top, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
        background: -webkit-linear-gradient(top, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
        background:         linear-gradient(to bottom, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
    }

    .network .shadow.grey:after
    {
        background: #212121;
    }


    .network .head
    {
        display: flex;

        width: 100%;
        margin-bottom: 20px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }


    .network .logo
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


    .network .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: inherit;
    }


    .network .name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;

        max-width: calc(100% - 40px);
        margin-left: 10px;

        transition: text-shadow .2s linear;
    }

    .network .name:hover
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


    .network .tokens
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

    .network .tokens:hover
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


    .network .visualization
    {
        display: flex;
        visibility: hidden;
        overflow: hidden;

        height: 12px;
        min-height: 12px;
        margin-bottom: 12px;

        transition: .2s linear;
        transition-property: opacity, visibility, box-shadow;
        pointer-events: none;

        opacity: 0;
        border-radius: 10px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .network:not(.disabled) .visualization
    {
        visibility: visible;

        pointer-events: auto;

        opacity: 1;
    }


    .network .visualization > *
    {
        min-width: 2px;
        height: 12px;

        transition: width .2s linear;
    }

    .network .visualization .staked
    {
        background: #950fff;
    }

    .network .visualization .liquid
    {
        background: #eb5757;
    }

    .network .visualization .rewards
    {
        background: #1bc562;
    }

    .network .visualization .IBC
    {
        background: #c5811b;
    }

    .network .visualization:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .65);
    }


    .network .stats
    {
        font-size: 12px;
        line-height: 15px;

        width: 100%;
        margin-bottom: 20px;
    }

    .network:not(.disabled) .stats
    {
        pointer-events: auto;
    }


    .network .stats > *
    {
        display: flex;

        transition: text-shadow .2s linear;

        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .network .stats > *:hover
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


    .network .stats > * + *
    {
        margin-top: 7px;
        padding-top: 6px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .network .stats .label
    {
        position: relative;

        margin-right: 10px;
    }


    .network .stats .val
    {
        font-weight: 500;
    }



    .network .lock
    {
        margin-top: 8px;
    }

    .network .lock svg
    {
        display: block;

        width: 68px;
        height: 68px;
        margin: auto;
    }


    .network .details_btn,
    .network .delegate_btn
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

    .network .delegate_btn,
    .network .details_btn:hover
    {
        color: #fff;

        border-color: #950fff;
        background: #950fff;
    }

    .network .delegate_btn:hover,
    .network .delegate_btn:active,
    .network .details_btn:active
    {
        color: #fff;

        border-color: #7700e1;
        background: #7700e1;
    }

    .network.disabled:not(.default) .delegate_btn
    {
        opacity: .65;
    }



    .network.empty
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

    .network.empty .shadow:after
    {
        background: #212121;
    }


    .network.empty .logo
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

    .network.empty .logo + div
    {
        width: 100%;
    }

    .network.empty .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: 50%;
    }

    .network.empty .logo:after
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



    .network.disabled
    {
        color: #464646;
    }

    .network.disabled:not(.default) .logo:after
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

    .network.disabled .shadow:after
    {
        background: #212121;
    }


    .network:not(.disabled) .head,
    .network:not(.disabled) .tokens
    {
        pointer-events: auto;
    }

    .network.default .head,
    .network.default .tokens
    {
        color: #fff;
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