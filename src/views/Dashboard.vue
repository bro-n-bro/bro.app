<template>
    <section class="dashboard">
        <div class="cont">
            <div class="row">
                <!-- Evmos -->
                <Network network="evmos" />

                <!-- Juno -->
                <Network network="juno" />

                <!-- Сosmos hub -->
                <Network network="cosmoshub" />

                <!-- Bostrom -->
                <Network network="bostrom" />
            </div>


            <div class="row">
                <!-- E-money -->
                <Network network="emoney" />

                <!-- Desmos -->
                <Network network="desmos" />

                <!-- Account -->
                <Account />

                <!-- Osmosis -->
                <Network network="osmosis" />

                <!-- Crescent -->
                <Network network="crescent" />
            </div>


            <div class="row">
                <!-- Gravity bridge -->
                <Network network="gravity" />

                <!-- Stargaze -->
                <Network network="stargaze" />

                <!-- Omniflix hub -->
                <Network network="omniflix" />

                <!-- Stride -->
                <Network network="stride" />
            </div>
        </div>
    </section>


    <!-- Make choice modal -->
    <MakeChoice />
</template>


<script setup>
    import { onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { getNetworksData } from '@/utils'

    // Components
    import Network from '../components/Network.vue'
    import Account from '../components/Account.vue'
    import MakeChoice from '../components/modal/MakeChoice.vue'

    const store = useGlobalStore()


    onBeforeMount(() => {
        // Get networks data
        getNetworksData()
    })
</script>


<style>
    .dashboard
    {
        padding-bottom: 24px;
    }


    .dashboard .row
    {
        margin-bottom: -7px;
        margin-left: -7px;

        justify-content: center;
    }

    .dashboard .row + .row
    {
        margin-top: -82px;
    }
</style>
