<template>
    <div class="avatar">
        <div class="loader_wrap" v-if="!store.account.avatar && !store.demo">
            <div class="loader"><span></span></div>
        </div>

        <template v-else>
        <img src="/demo_avatar.jpg" alt="" v-if="store.demo">
        <img :src="store.account.avatar" alt="" v-else>
        </template>

        <router-link to="/account/passport?demo=true" class="edit_link" v-if="store.demo">
            <div class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_settings"></use></svg>
                <span>{{ $t('message.btn_settings') }}</span>
            </div>
        </router-link>

        <router-link to="/account/passport" class="edit_link" v-else>
            <div class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_settings"></use></svg>
                <span>{{ $t('message.btn_settings') }}</span>
            </div>
        </router-link>
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>


<style scoped>
    .avatar
    {
        position: absolute;
        z-index: 5;

        width: 200px;
        height: 200px;
        margin: auto;

        border: 5px solid #0d0d0d;
        border-radius: 50%;

        inset: 0;
    }


    .avatar img
    {
        position: relative;
        z-index: 10;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;
        background: #141414;

        object-fit: cover;
    }


    .avatar .edit_link
    {
        color: currentColor;
        font-size: 14px;
        line-height: 120%;

        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 100%;

        transition: opacity .2s linear;
        text-decoration: none;

        opacity: 0;
        border-radius: 50%;
        background: rgba(0, 0, 0, .6);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .avatar .edit_link .btn
    {
        display: flex;

        padding: 8px;

        border-radius: 10px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .avatar .edit_link .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    .avatar .edit_link:hover
    {
        opacity: 1;
    }



    .loader_wrap
    {
        border-radius: 50%;
        background: none;
    }



    @media print, (max-width: 767px)
    {
        .avatar .edit_link
        {
            font-size: 13px;
        }
    }

</style>