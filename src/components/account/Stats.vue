<template>
    <section class="stats">
        <!-- <pre>{{ data.info }}</pre> -->

        <div class="row">
            <div class="item">
                <div class="label">{{ $t('message.account_APR') }}</div>
                <div class="val">{{ data.info.apr * 100 }}%</div>
            </div>

            <div class="item">
                <div class="label">{{ $t('message.account_voting_power') }}</div>
                <div class="val">{{ data.info.rpde / 1000000 }}</div>
            </div>

            <div class="item">
                <div class="label">{{ $t('message.account_RPDE') }}</div>
                <div class="val">{{ data.info.voting_power * 100 }}</div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onMounted, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        data = reactive({
            info: {},
            showAll: false
        })


    onMounted(async () => {
        await fetch(`https://rpc.bronbro.io/account/account_info/${store.wallets.cosmoshub}`)
            .then(res => res.json())
            .then(response => data.info = response)
    })
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
        font-size: 36px;
        font-weight: 700;
        line-height: 100%;

        white-space: nowrap;
    }

</style>