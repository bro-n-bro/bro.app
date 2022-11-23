<template>
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
                <div @mouseover="emitter.emit('setNotification', $t('message.account_RPDE_notice'))">
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

                <div @mouseover="emitter.emit('setNotification', $t('message.account_personal_APR_notice'))">
                    <div class="label">{{ $t('message.personal_apr') }}</div>

                    <div class="val">{{ $filters.toFixed(store.account.personal_APR, 2) }}%</div>
                </div>
            </div>

            <router-link to="/under_construction" class="details_btn">{{ $t('message.details_btn') }}</router-link>
        </template>

        <div class="shadow"></div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
   .account
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
       padding: 58px 38px 64px;

       pointer-events: none;
   }

   .account:before
   {
       position: absolute;
       z-index: -1;
       top: 0;
       left: 0;

       display: block;

       width: 100%;
       height: 100%;

       content: '';

       background: #3c0666;

       clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
   }


   .account .shadow
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

   .account .shadow:after
   {
       position: absolute;
       top: -24px;
       left: -24px;

       display: block;

       width: calc(100% + 48px);
       height: calc(100% + 48px);

       content: '';

       background: #950fff;
   }


   .account .user_name
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


   .account .balance
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

   .account .balance:hover
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


   .account .stats
   {
       font-size: 12px;
       line-height: 15px;

       width: 100%;
       margin-bottom: 20px;

       pointer-events: auto;
   }

   .account:not(.disabled) .stats
   {
       pointer-events: auto;
   }


   .account .stats > *
   {
       display: flex;

       transition: text-shadow .2s linear;

       align-content: center;
       align-items: center;
       flex-wrap: nowrap;
       justify-content: space-between;
   }

   .account .stats > *:hover
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


   .account .stats > * + *
   {
       margin-top: 7px;
       padding-top: 6px;

       border-top: 1px solid rgba(255, 255, 255, .05);
   }


   .account .stats .label
   {
       position: relative;

       margin-right: 10px;
   }


   .account .stats .val
   {
       font-weight: 500;
   }


   .account .details_btn
   {
       border-color: rgba(255, 255, 255, .2);
   }


   .account .details_btn
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

       border: 1px solid rgba(255, 255, 255, .2);
       border-radius: 40px;
   }

   .account .details_btn:hover
   {
       color: #fff;

       border-color: #950fff;
       background: #950fff;
   }


   .account .connect_wallet_btn
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

   .account .connect_wallet_btn:hover
   {
       color: #fff;

       background: #950fff;
   }

</style>
