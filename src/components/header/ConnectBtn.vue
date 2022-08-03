<template>
    <button class="connect_btn" @click.prevent="connectWallet()">
        <div class="icon">
            <svg><use xlink:href="/sprite.svg#ic_wallet"></use></svg>
        </div>

        <span>{{ $t('message.connect_wallet') }}</span>
    </button>
</template>


<script setup>
    const connectWallet = async () => {
        const chainId = 'cosmoshub-4'

        window.keplr.enable(chainId)

        const offlineSigner = window.keplr.getOfflineSigner(chainId),
            accounts = await offlineSigner.getAccounts()
    }
</script>


<style scoped>
    .connect_btn
    {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;

        display: flex;

        width: 243px;
        max-width: 100%;
        margin-left: 40px;
        padding: 15px 10px;

        text-align: left;

        border-radius: 20px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .connect_btn .icon
    {
        display: flex;

        width: 40px;
        height: 40px;

        border-radius: 50%;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connect_btn .icon svg
    {
        display: block;

        width: 18px;
        height: 18px;
    }


    .connect_btn span
    {
        width: calc(100% - 50px);
    }

</style>