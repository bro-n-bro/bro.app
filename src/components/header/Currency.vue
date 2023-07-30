<template>
    <div class="currency" @mouseover="emitter.emit('setNotification', $t('message.notice_currency'))" ref="target">
        <button class="btn" :class="{ active: showDropdown }" @click.prevent="showDropdown = !showDropdown">
            <span>{{ store.currentCurrency }}</span>
            <svg><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </button>


        <transition name="fadeUp" mode="out-in">
        <div class="dropdown" v-show="showDropdown">
            <div><button class="btn" :class="{ active: store.currentCurrency == 'BTC' }" @click.prevent="selectCurrency('BTC')">BTC</button></div>

            <div><button class="btn" :class="{ active: store.currentCurrency == 'ETH' }" @click.prevent="selectCurrency('ETH')">ETH</button></div>

            <div><button class="btn" :class="{ active: store.currentCurrency == 'ATOM' }" @click.prevent="selectCurrency('ATOM')">ATOM</button></div>

            <div><button class="btn" :class="{ active: store.currentCurrency == 'USDT' }" @click.prevent="selectCurrency('USDT')">USDT</button></div>
        </div>
        </transition>
    </div>
</template>


<script setup>
    import { inject, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { onClickOutside } from '@vueuse/core'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        showDropdown = ref(false),
        target = ref(null)


    // Select currency
    function selectCurrency(newCurrency) {
        // Set new currency
        store.currentCurrency = newCurrency

        // Hide dropdown
        showDropdown.value = false
    }


    // Сlick element outside
    onClickOutside(target, event => showDropdown.value = false)
</script>


<style scoped>
    .currency
    {
        position: relative;

        margin-left: 40px;
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



    @media print, (max-width: 1599px)
    {
        .currency
        {
            margin-left: 32px;
        }
    }



    @media print, (max-width: 767px)
    {
        .currency
        {
            margin-left: auto;
        }


        .currency .btn
        {
            font-size: 14px;
        }
    }
</style>