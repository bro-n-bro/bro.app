<template>
    <div class="user">
        <div class="icon">
            <svg><use xlink:href="/sprite.svg#ic_wallet"></use></svg>
        </div>

        <div class="name" @mouseover="emitter.emit('setNotification', $t('message.username_notice'))">
            {{ store.account.userName }}
            </div>

        <a href="https://cyb.ai/citizenship" target="_blank" rel="noopener nofollow" class="photo" @mouseover="emitter.emit('setNotification', $t('message.avatar_notice'))">
            <img :src="store.account.avatar" alt="" v-show="store.account.avatar">
        </a>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .user
    {
        color: #fff;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        margin-left: 40px;
        padding: 15px 10px;

        text-align: left;

        border-radius: 20px;
        background: #141414;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }


    .user .icon
    {
        display: flex;

        width: 40px;
        height: 40px;
        margin-right: 10px;

        border-radius: 50%;
        background: #950fff;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .user .icon svg
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .user .photo
    {
        color: currentColor;

        position: relative;

        display: block;
        overflow: hidden;

        width: 40px;
        height: 40px;
        margin-left: 26px;

        text-decoration: none;

        border-radius: 50%;
        background: #353535;
    }

    .user .photo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;

        object-fit: cover;
    }

</style>