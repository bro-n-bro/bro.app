<template>
    <template v-if="!route.query.connect">
    <section class="main_page" v-if="!store.isAuth || store.isAuth && !store.account.moonPassportOwner">
        <div class="cont">
            <div class="title">
                {{ $t('message.main_page_title') }}
            </div>

            <button class="btn" @click.prevent="emitter.emit('initApp')" v-if="!store.isKeplrConnected">
                {{ $t('message.btn_connect_wallet') }}
            </button>

            <router-link class="btn" to="/create_passport" v-else>
                {{ $t('message.btn_create_passport') }}
            </router-link>

            <div class="demo_desc" v-if="!store.isKeplrConnected">
                {{ $t('message.main_page_demo_text') }}

                <router-link to="/account/cosmoshub?demo=true">
                    {{ $t('message.main_page_demo_link') }}
                </router-link>
            </div>
        </div>

        <img src="@/assets/images/main_page.png" alt="" class="img">

        <img src="@/assets/images/bg_main_page.jpg" alt="" class="bg">
    </section>
    </template>
</template>


<script setup>
    import { inject, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRoute, useRouter } from 'vue-router'


    const emitter = inject('emitter'),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        route = useRoute(),
        router = useRouter()


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_main_page')

        // Reset state if hit the main page
        if (store.account.demo) {
            store.$reset()
            store.isAppFullLoaded = true
        }

        // Connect wallet
        if (route.query.connect) {
            // Reset state
            store.$reset()
            store.isAppFullLoaded = true

            // Init app
            await store.initApp()

            // Reload
            store.account.moonPassport
                ? router.push('/account/cosmoshub')
                : router.push('/create_passport')
        }
    })
</script>


<style>
    .main_page
    {
        position: relative;
        z-index: 3;

        display: flex;

        padding-top: 40px;

        text-align: center;

        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        flex: 1 0 auto;
    }

    /* .main_page:after
        {
            position: absolute;
            z-index: 5;
            bottom: 0;
            left: 0;

            display: block;

            width: 100%;
            height: 416px;

            content: '';
            pointer-events: none;

            opacity: .6;
            background: linear-gradient(180deg, rgba(0, 0, 0, .00) 0%, #000 100%);
        } */


    .main_page .cont
    {
        position: relative;
        z-index: 5;
    }


    .main_page .title
    {
        font-size: 44px;
        font-weight: 600;
        line-height: 120%;

        width: 918px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
    }


    .main_page .btn
    {
        color: currentColor;
        font-weight: 600;

        display: inline-block;

        min-width: 180px;
        margin-top: 40px;
        padding: 20px;

        transition: .2s linear;
        vertical-align: top;
        text-decoration: none;

        border-radius: 17px;
        background: #950fff;
    }

    .main_page .btn:hover
    {
        background: #7700e1;
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }


    .main_page .demo_desc
    {
        font-weight: 600;
        line-height: 120%;

        margin-top: 28px;

        opacity: .7;
    }


    .main_page .demo_desc a
    {
        color: currentColor;

        transition: color .2s linear;
    }

    .main_page .demo_desc a:hover
    {
        color: #950fff;
    }



    .main_page .img
    {
        position: absolute;
        z-index: 3;
        top: 300px;
        right: 0;
        left: 0;

        display: block;

        max-width: 100%;
        margin: 0 auto;
    }



    .main_page .bg
    {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: 50% 0;
    }

</style>