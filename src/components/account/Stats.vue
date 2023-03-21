<template>
    <section class="stats">
        <!-- <pre>{{ data.info }}</pre> -->

        <div class="row">
            <div class="item">
                <div class="label">{{ $t('message.account_APR') }}</div>
                <div class="val">{{ $filters.toFixed(data.info.apr * 100, 2) }}%</div>
            </div>

            <div class="item">
                <div class="label">{{ $t('message.account_voting_power') }}</div>
                <div class="val">{{ $filters.toFixed(data.info.rpde / 1000000, 2) }}</div>
            </div>

            <div class="item">
                <div class="label">{{ $t('message.account_RPDE') }}</div>
                <div class="val">{{ $filters.toFixed(data.info.voting_power * 100, 8) }}</div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { reactive } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        data = reactive({
            info: {},
            showAll: false
        })


    try {
        await fetch(`https://rpc.bronbro.io/account/account_info/${store.wallets.cosmoshub}`)
            .then(res => res.json())
            .then(response => data.info = response)
    } catch (error) {
        console.log(error)
    }
</script>


<style scoped>
    .stats .row
    {
        margin-bottom: -20px;
        margin-left: -20px;

        align-items: stretch;
        align-content: stretch;
    }

    .stats .row > *
    {
        width: calc(33.333% - 20px);
        margin-bottom: 20px;
        margin-left: 20px;
    }


    .stats .item
    {
        display: flex;

        padding: 16px;

        text-align: center;

        border-radius: 20px;
        background: #0d0d0d;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .stats .label
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        width: 100%;
        margin-bottom: 8px;
    }


    .stats .val
    {
        font-size: 32px;
        font-weight: 700;
        line-height: 100%;

        white-space: nowrap;
    }

</style>