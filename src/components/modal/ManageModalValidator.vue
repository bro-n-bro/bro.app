<template>
    <div class="validator">
        <div class="logo">
            <img :src="`${props.validator.logo ? props.validator.logo : '/logo_mini.svg'}`" alt="">
        </div>

        <div>
            <div class="name">
                {{ props.validator.name }}
            </div>

            <div class="commission">
                {{ $t('message.manage_modal_commission') }}

                <span class="sep">{{ $t('message.manage_modal_commission_sep') }}</span>

                <span class="val">{{ props.validator.commision }}%</span>
            </div>
        </div>
    </div>
</template>


<script setup>
    const props = defineProps(['validator'])
</script>


<style scoped>
    .validator
    {
        display: flex;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }


    .validator .logo
    {
        display: flex;

        width: 65px;
        height: 58px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .validator .logo img
    {
        display: block;

        width: 100%;
        height: 100%;
    }

    .validator .logo + *
    {
        width: calc(100% - 73px);
    }


    .validator .name
    {
        font-size: 30px;
        font-weight: 700;
        line-height: 36px;
    }


    .validator .commission
    {
        color: #8e8e8e;
        font-size: 12px;
        line-height: 15px;

        margin-top: 4px;
    }

    .validator .commission .sep,
    .validator .commission .val
    {
        color: #fff;
        font-weight: 600;

        margin-left: 6px;
    }

    .validator .commission .val
    {
        margin-left: 10px;
    }

</style>
