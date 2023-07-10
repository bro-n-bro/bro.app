<template>
    <section class="wallet_error">
        <div class="cont">
            <img src="../assets/images/reload_page.svg" alt="" class="img">

            <div class="title" v-html="$t('message.keplr_reload_title')"></div>

            <div class="link">
                <button class="btn" @click.prevent="reloadPage">
                    {{ $t('message.btn_reload') }}
                </button>
            </div>
        </div>
    </section>
</template>


<script setup>
    // Reload page
    function reloadPage() {
        window.location.reload()
    }
</script>


<style>
    .wallet_error
    {
        display: flex;

        padding-bottom: 100px;

        text-align: center;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        flex: 1 0 auto;
    }


    .wallet_error .img
    {
        display: block;

        max-width: 50%;
        margin: 0 auto 20px;
    }


    .wallet_error .title
    {
        color: #fff;
        font-size: 52px;
        font-weight: 600;
        line-height: 63px;
    }


    .wallet_error .link
    {
        display: flex;

        margin-top: 40px;

        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }


    .wallet_error .link .btn
    {
        color: #fff;
        font-weight: 600;
        line-height: 19px;

        display: block;

        padding: 13px 30px;

        transition: box-shadow .2s linear;

        border-radius: 20px;
        background: #950fff;
    }


    .wallet_error .link .btn:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }

</style>