<template>
    <section class="contract_address">
        <div class="title">
            {{ $t('message.account_contract_address_title') }}
        </div>

        <div class="address">
            {{ store.account.moonPassportOwner }}
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>


<style scoped>
    .contract_address
    {
        margin-bottom: 24px;
    }


    .contract_address .title
    {
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;

        margin-bottom: 8px;
    }


    .contract_address .address
    {
        color: rgba(255,255,255,.7);
        font-size: 14px;
        line-height: 20px;

        position: relative;

        overflow: hidden;

        padding: 10px 10px 10px 30px;

        white-space: nowrap;
        text-overflow: ellipsis;

        border-radius: 10px;
        background: #141414;

        text-decoration-line: underline;
    }


    .contract_address .address:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 11px;

        display: block;

        width: 11px;
        height: 12px;
        margin: auto;

        content: '';

        background: #950fff;

        clip-path: polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%);
    }

</style>