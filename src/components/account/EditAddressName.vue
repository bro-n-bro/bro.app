<template>
    <form @submit.prevent="onSubmit">
        <input type="text" v-model="name" class="input" maxlength="16">

        <button type="submit" class="submit_btn">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
        </button>

        <button type="button" class="cancel_btn" @click.prevent="e => e.target.closest('.item').classList.remove('editing')">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
        </button>

        <div class="loader_wrap" v-if="loading">
            <div class="loader"><span></span></div>
        </div>
    </form>
</template>


<script setup>
    import { inject, onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { preparePassportTx, sendTx } from '@/utils'


    const props = defineProps(['address', 'name']),
        store = useGlobalStore(),
        notification = useNotification(),
        i18n = inject('i18n'),
        name = ref(''),
        loading = ref(false)


    onBeforeMount(() => {
        name.value = props.name
    })


    // Submit form
    async function onSubmit() {
        // Show loader
        loading.value = true

        // Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_address_renaming_process')
        })

        try{
            // Prepare Tx
            let prepareResult = await preparePassportTx({
                set_address_label: {
                    address: props.address,
                    label: name.value,
                    nickname: store.account.moonPassportOwner.extension.nickname
                }
            })

            // Send Tx
            let result = await sendTx(prepareResult)

            if (result.code === 0) {
                // Set TXS
                store.lastTXS = result.transactionHash

                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    group: store.networks.bostrom.denom,
                    title: i18n.global.t('message.notification_success_address_rename_title'),
                    type: 'success',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_address_rename')
                    }
                })

                // Get moon passport
                await store.getMoonPassport()
                await store.getOwnerMoonPassport()

                // Hide loader
                loading.value = false

                // Hide form
                document.querySelectorAll('.connected_addresses .item').forEach(el => el.classList.remove('editing'))
            }
        } catch (error) {
            console.log(error)

            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                group: store.networks.bostrom.denom,
                title: i18n.global.t('message.notification_failed_title'),
                text: i18n.global.t('message.manage_modal_error_rejected'),
                type: 'error',
                data: {
                    chain: 'bostrom',
                    tx_type: i18n.global.t('message.notification_action_address_rename')
                }
            })

            // Hide loader
            loading.value = false
        }
    }
</script>


<style scoped>
    form
    {
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        pointer-events: auto;
    }


    form .input
    {
        color: var(--text_color);
        font-family: var(--font-family);
        font-size: 14px;

        display: block;

        width: 100%;
        height: 42px;
        padding-right: 55px;
        padding-bottom: 1px;
        padding-left: 9px;

        border: 1px solid #950fff;
        border-radius: 14px;
        background: #141414;
    }


    form .submit_btn
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 30px;
        bottom: 0;

        display: flex;

        width: 16px;
        height: 16px;
        margin: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    form .submit_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }


    form .cancel_btn
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;
        bottom: 0;

        display: flex;

        width: 16px;
        height: 16px;
        margin: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    form .cancel_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }


    form .loader_wrap
    {
        border-radius: 13px;
    }

    form .loader
    {
        width: 24px;
        height: 24px;
    }

</style>