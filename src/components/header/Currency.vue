<template>
    <div class="currency" @mouseover="emitter.emit('setNotification', $t('message.currency_notice'))">
        <button class="btn" :class="{ active: store.showCurrencyDropdown }" @click.prevent="store.showCurrencyDropdown = true">
            <span>{{ store.currency }}</span>
            <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>

        <transition name="fadeUp" mode="out-in">
        <div class="dropdown" v-show="store.showCurrencyDropdown">
            <div><button class="btn" :class="{ active: store.currency == 'BTC' }" @click.prevent="selectCurrency('BTC')">BTC</button></div>

            <div><button class="btn" :class="{ active: store.currency == 'ETH' }" @click.prevent="selectCurrency('ETH')">ETH</button></div>

            <div><button class="btn" :class="{ active: store.currency == 'ATOM' }" @click.prevent="selectCurrency('ATOM')">ATOM</button></div>

            <div><button class="btn" :class="{ active: store.currency == 'USDT' }" @click.prevent="selectCurrency('USDT')">USDT</button></div>
        </div>
        </transition>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter')


    function selectCurrency(newCurrency) {
        store.$patch({ currency: newCurrency })

        store.showCurrencyDropdown = false
    }
</script>


<style scoped>
    .currency
    {
        position: relative;

        margin-left: 60px;
    }


    .currency .btn
    {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;

        display: flex;

        min-width: 70px;

        pointer-events: auto;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .currency .btn svg
    {
        display: block;

        width: 15px;
        height: 15px;
        margin-left: 10px;
    }


    .currency .dropdown
    {
        position: absolute;
        z-index: 5;
        top: 100%;
        left: -9px;

        width: 90px;
        margin-top: 7px;
        padding: 6px 4px;

        border-radius: 10px;
        background: #101010;
    }

    .currency .dropdown > * + *
    {
        margin-top: 5px;
    }


    .currency .dropdown .btn
    {
        font-size: 12px;
        line-height: 15px;

        display: block;

        width: 100%;
        padding: 4px;

        transition: background .2s linear;
        text-align: left;
        pointer-events: auto;

        border-radius: 7px;
    }

    .currency .dropdown .btn:hover,
    .currency .dropdown .btn.active
    {
        background: #191919;
    }

</style>