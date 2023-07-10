<template>
    <div class="user">
        <template v-if="store.account.moonPassport">
        <router-link to="/account/cosmoshub" class="account_link">
            <div class="icon">
                <svg><use xlink:href="@/assets/sprite.svg#ic_wallet"></use></svg>
            </div>

            <div class="name" @mouseover="emitter.emit('setNotification', $t('message.notice_username'))">
                <span v-if="store.account.moonPassportOwner">{{ store.account.moonPassportOwner.extension.nickname }}</span>
                <span v-else>{{ store.account.userName }}</span>
            </div>
        </router-link>

        <router-link to="/account/passport" class="photo" @mouseover="emitter.emit('setNotification', $t('message.notice_avatar'))">
            <img :src="store.account.avatar" alt="" v-if="store.account.avatar">
        </router-link>
        </template>


        <template v-else>
        <div class="account_link">
            <div class="icon">
                <svg><use xlink:href="/sprite.svg#ic_wallet"></use></svg>
            </div>

            <div class="name" @mouseover="emitter.emit('setNotification', $t('message.notice_username'))">
                <span v-if="store.account.moonPassportOwner">{{ store.account.moonPassportOwner.extension.nickname }}</span>
                <span v-else>{{ store.account.userName }}</span>
            </div>
        </div>

        <div class="photo" @mouseover="emitter.emit('setNotification', $t('message.notice_avatar'))">
            <img :src="store.account.avatar" alt="" v-if="store.account.avatar">
        </div>
        </template>
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

        width: 216px;
        margin-left: 32px;
        padding: 15px 10px;

        text-align: left;

        border-radius: 20px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .user .account_link
    {
        color: currentColor;

        display: flex;

        width: calc(100% - 50px);

        text-decoration: none;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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


    .user .name
    {
        overflow: hidden;

        width: calc(100% - 50px);

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .user .photo
    {
        color: currentColor;

        position: relative;

        display: block;
        overflow: hidden;

        width: 40px;
        height: 40px;
        margin-left: 10px;

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