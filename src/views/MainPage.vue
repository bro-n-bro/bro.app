<template>
    <section class="main_page" v-if="!store.isAuth">
        <div class="cont">
            <div class="title" v-html="$t('message.main_page_title')"></div>

            <button class="btn" @click.prevent="emitter.emit('initApp')">
                {{ $t('message.btn_connect_wallet') }}
            </button>

            <div class="demo_desc">
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


<script setup>
    import { inject, watchEffect, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'


    const emitter = inject('emitter'),
        store = useGlobalStore(),
        route = useRouter(),
        i18n = inject('i18n')


    onBeforeMount(() => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_main_page')
    })


    watchEffect(() => {
        // Monitor the connection of the Keplr
        if(store.isAuth && store.isAppFullLoaded) {
            route.push('/account/cosmoshub')
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

    .main_page:after
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
    }


    .main_page .cont
    {
        position: relative;
        z-index: 3;
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
        font-weight: 600;

        min-width: 180px;
        margin-top: 40px;
        padding: 20px;

        transition: .2s linear;

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

        margin-top: 20px;

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
        top: 348px;
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