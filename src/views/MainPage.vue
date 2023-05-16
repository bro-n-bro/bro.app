<template>
    <section class="main_page" v-if="!store.auth">
        <div class="cont">
            <div class="title" v-html="$t('message.main_page_title')"></div>

            <button class="btn" @click.prevent="emitter.emit('connectWallet')">
                {{ $t('message.connect_wallet_btn') }}
            </button>
        </div>

        <div class="bg">
            <img src="../assets/images/main_page.png" alt="" class="img">
        </div>
    </section>
</template>


<script setup>
    import { inject, watchEffect, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'


    const emitter = inject('emitter'),
        store = useGlobalStore(),
        route = useRouter(),
        i18n = inject('i18n')


    watchEffect(() => {
        // Monitor the connection of the kepler
        if(store.auth && store.appLoaded) {
            !store.account.moonPassport && !store.account.moonPassportOwner
                ? route.push({ name: 'Dashboard' })
                : route.push('/account/cosmoshub')
        }
    })


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_main_page')
    })
</script>


<style>
    .main_page
    {
        display: flex;

        text-align: center;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        flex: 1 0 auto;
    }


    .main_page .cont
    {
        position: relative;
        z-index: 3;

        padding-top: 80px;
    }


    .main_page .title
    {
        font-size: 120px;
        font-weight: 600;
        line-height: 90%;

        letter-spacing: -.02em;
        text-transform: uppercase;
    }


    .main_page .btn
    {
        color: #950fff;
        font-weight: 600;
        line-height: 19px;

        margin-top: 40px;
        padding: 17px 30px;

        transition: .2s linear;

        border-radius: 20px;
        background: #fff;
    }


    .main_page .btn:hover
    {
        color: #fff;

        background: #950fff;
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }



    .main_page .bg
    {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
    }

    .main_page .bg:before
    {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        left: 0;

        display: block;

        width: 1301px;
        height: 1301px;
        margin: auto;

        content: '';

        opacity: .8;
        background: linear-gradient(180deg, #190027 0%, rgba(141, 5, 225, .7) 100%);

        filter: blur(300px);
    }


    .main_page .bg img
    {
        position: absolute;
        z-index: 2;
        top: 80px;
        right: 0;
        left: 0;

        display: block;

        width: 1481px;
        height: 965px;
        margin: auto;
    }

</style>