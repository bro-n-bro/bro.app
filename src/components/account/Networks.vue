<template>
    <section class="networks">
        <div class="title">
            {{ $t('message.account_networks_title') }}
        </div>

        <div class="list">
            <button class="network active">
                <div class="logo">
                    <img src="/cosmoshub_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.cosmoshub.name }}</div>
                    <div class="token">{{ store.networks.cosmoshub.token_name }}</div>
                </div>
            </button>
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>



<style scoped>
    .networks
    {
        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .networks .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 20px;
    }


    .networks .list > * + *
    {
        margin-top: 4px;
    }


    .networks .network
    {
        display: flex;

        width: 100%;
        padding: 10px;

        transition: background .2s linear;
        text-align: left;

        border-radius: 14px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .networks .logo
    {
        position: relative;

        overflow: hidden;

        width: 40px;
        height: 40px;

        border-radius: 50%;
    }


    .networks .logo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .networks .logo + *
    {
        width: calc(100% - 54px);
        margin-left: auto;
    }


    .networks .name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;
    }


    .networks .token
    {
        color: #555;
        font-size: 12px;
        line-height: 15px;

        margin-top: 6px;

        text-transform: uppercase;
    }


    .networks .network:hover,
    .networks .network.active
    {
        background: #141414;
    }



    @media print, (max-width: 1899px)
    {
        .networks .title
        {
            font-size: 27px;
            line-height: 33px;
        }
    }

</style>