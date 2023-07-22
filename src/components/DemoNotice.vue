<template>
    <div class="demo_notice">
        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_notice2"></use></svg>

        <span>{{ $t('message.demo_notice_text') }}</span>

        <div class="sep">—</div>

        <button class="btn" @click.prevent="emitter.emit('initApp')">
            {{ $t('message.btn_connect_wallet') }}
        </button>
    </div>
</template>


<script setup>
    import { inject } from 'vue'

    const emitter = inject('emitter')
</script>


<style scoped>
    .demo_notice
    {
        font-weight: 500;

        display: flex;

        width: calc(100% - 40px);
        margin: 0 auto 20px;
        padding: 14px;

        text-align: center;

        border-radius: 14px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .demo_notice .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 8px;
    }


    .demo_notice .sep
    {
        margin: 0 8px;
    }


    .demo_notice .btn
    {
        margin-left: 6px;

        border-bottom: 1px solid;
    }

</style>