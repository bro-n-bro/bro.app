<template>
    <header>
        <div class="cont">
            <div class="info row">
                <div class="logo" v-click-out="clickOut">
                    <div class="btn" @click.prevent="showDropdown = !showDropdown">
                        <img src="/logo.svg" alt="">

                        <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                    </div>

                    <div class="mini_modal" v-show="showDropdown">
                        <div><a href="https://bronbro.io/" target="_blank" rel="noopener">
                            <img src="/bro_logo.svg" alt="">
                        </a></div>

                        <div><a href="https://score.bronbro.io/" target="_blank" rel="noopener">
                            <img src="/bro_score_logo.svg" alt="">
                        </a></div>

                        <div><a href="https://monitor.bronbro.io/" target="_blank" rel="noopener">
                            <img src="/bro_stats_logo.svg" alt="">
                        </a></div>
                    </div>
                </div>

                <!-- Notifications -->
                <Notifications v-if="route.name != 'KeplrError' && route.name != 'KeplrReload'" />

                <!-- IPFS -->
                <IPFS v-if="route.name != 'KeplrError' && route.name != 'KeplrReload'" />

                <!-- Currency -->
                <Currency v-if="store.auth" />

                <!-- User info -->
                <User v-if="store.auth" />

                <ConnectBtn v-if="!store.auth && route.name != 'KeplrError' && route.name != 'KeplrReload'" />
            </div>
        </div>
    </header>
</template>


<script setup>
    import { onMounted, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRoute } from 'vue-router'

    // Components
    import Notifications from '../components/Notifications.vue'
    import IPFS from '../components/header/IPFS.vue'
    import Currency from '../components/header/Currency.vue'
    import User from '../components/header/User.vue'
    import ConnectBtn from '../components/header/ConnectBtn.vue'


    const store = useGlobalStore(),
        route = useRoute(),
        showDropdown = ref(false)


    onMounted(() => {
        // Sticky header
        const header = document.querySelector('header')

        if(header) {
            header.stickyEvent = () => setTimeout(() => {
                window.scrollY > 0
                    ? header.classList.add('stuck')
                    : header.classList.remove('stuck')
            })

            document.addEventListener('scroll', header.stickyEvent)
        }
    })


    // Сlick element outside
    function clickOut() {
        // Hide dropdown
        showDropdown.value = false
    }
</script>


<style>
header
{
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;

    width: 100%;
    padding: 20px 0;

    transition: padding-top .2s linear, padding-bottom .2s linear;
}

.lock header
{
    padding-right: var(--scroll_width);
}

.lock header.stuck
{
    width: calc(100% - var(--scroll_width));
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
    position: relative;

    margin-right: auto;
}


header .logo .btn
{
    display: flex;

    cursor: pointer;

    justify-content: flex-start;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


header .logo .btn img
{
    display: block;

    max-width: 100%;
    height: 70px;
}


header .logo .arr
{
    display: block;

    width: 24px;
    height: 24px;
    margin-left: 14px;
}


header .logo .mini_modal
{
    position: absolute;
    top: 100%;
    left: 0;

    width: 238px;
    margin-top: 10px;
    padding: 6px 4px;

    border-radius: 10px;
    background: #101010;
}

header .logo .mini_modal > * + *
{
    margin-top: 8px;
}


header .logo .mini_modal a
{
    color: currentColor;

    display: block;

    padding: 6px 10px 6px 4px;

    transition: background .2s linear;
    text-decoration: none;

    border-radius: 8px;
}


header .logo .mini_modal img
{
    display: block;

    max-width: 100%;
}


header .logo .mini_modal a:hover
{
    background: #191919;
}



header.stuck
{
    padding: 0;

    background: var(--bg);
}
</style>