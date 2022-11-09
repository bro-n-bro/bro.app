<template>
    <div class="ipfs_status" :class="{ green: store.IPFSStatus }" @mouseover="setNotice">
        <div>{{ $t('message.ipfs') }}</div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n')


    // Set notice
    function setNotice() {
        store.IPFSStatus
            ? emitter.emit('setNotification', i18n.global.t('message.ipfs_active_notice'))
            : emitter.emit('setNotification', i18n.global.t('message.ipfs_not_active_notice'))
    }
</script>


<style scoped>
    .ipfs_status
    {
        color: #eb5757;
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;

        position: relative;

        padding-left: 21px;
    }

    .ipfs_status.green
    {
        color: #1bc562;
    }


    .ipfs_status:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        display: block;

        width: 11px;
        height: 11px;
        margin: auto;

        content: '';

        border-radius: 50%;
        background: currentColor;
    }

</style>