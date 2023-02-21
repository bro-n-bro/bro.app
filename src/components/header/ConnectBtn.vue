<template>
    <button class="connect_btn" @click.prevent="emitter.emit('connectWallet')">
        {{ $t('message.connect_wallet_btn') }}
    </button>
</template>


<script setup>
    import { inject } from 'vue'

    const emitter = inject('emitter')
</script>


<style scoped>
    .connect_btn
    {
        color: #fff;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        width: 219px;
        max-width: 100%;
        margin-left: 40px;
        padding: 26px 59px;

        transition: box-shadow .2s linear;
        text-align: left;

        border-radius: 20px;
        background: #950fff;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .connect_btn:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }
</style>