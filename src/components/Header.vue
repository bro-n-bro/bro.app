<template>
    <header>
        <div class="cont">
            <div class="info row">
                <div class="logo">
                    <img src="/logo.svg" alt="">
                </div>

                <transition name="fade" mode="out-in" appear type="animation">
                <IPFS />
                </transition>

                <transition name="fade" mode="out-in" appear type="animation">
                <Currency v-if="store.auth" />
                </transition>

                <transition name="fade" mode="out-in" appear type="animation">
                <User v-if="store.auth" />
                </transition>

                <ConnectBtn v-if="!store.auth" />
            </div>
        </div>
    </header>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    import IPFS from '../components/header/IPFS.vue'
    import Currency from '../components/header/Currency.vue'
    import User from '../components/header/User.vue'
    import ConnectBtn from '../components/header/ConnectBtn.vue'

    const store = useGlobalStore()
</script>


<style>
    header
    {
        position: fixed;
        z-index: 90;
        top: 0;
        left: 0;

        width: 100%;
        padding: 20px 0;

        transition: .2s linear;

        background: var(--bg);
    }


    header .cont
    {
        max-width: 100%;
        padding: 0 20px;
    }


    header .info
    {
        padding: 11px 20px;

        border-radius: 42px;

        align-content: center;
        align-items: center;
        justify-content: space-between;
    }



    header .logo
    {
        margin-right: auto;
    }

    header .logo img
    {
        display: block;

        max-width: 100%;
        height: 70px;
    }



    header.vue-sticky-element--stuck
    {
        padding: 0;

        transform: translateY(0%) !important;
    }

</style>