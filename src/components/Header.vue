<template>
    <header>
        <div class="cont">
            <div class="info row">
                <div class="logo">
                    <img src="/logo.svg" alt="">
                </div>

                <IPFS />

                <Currency />

                <User />
            </div>
        </div>
    </header>
</template>


<script setup>
    import IPFS from '../components/IPFS.vue'
    import Currency from '../components/Currency.vue'
    import User from '../components/User.vue'
</script>


<style>
    header
    {
        position: relative;
        z-index: 90;
        top: 0;
        left: 0;

        width: 100%;
        padding: 20px 0;

        transition: .2s linear;
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

        justify-content: space-between;
        align-items: center;
        align-content: center;
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

</style>
