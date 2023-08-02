<template>
    <section class="modal" id="add_address_modal">
        <div class="modal_content" @click.self="emitter.emit('closeDeleteAddressModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeDeleteAddressModal')">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                </button>

                <div class="image">
                    <img src="@/assets/images/confirm_delete.svg" alt="">
                </div>

                <div class="title">Do you want to delete your adress?</div>

                <div class="btns">
                    <button class="btn no_btn" @click.prevent="emitter.emit('closeDeleteAddressModal')">
                        {{ $t('message.btn_no') }}
                    </button>

                    <button class="btn yes_btn" @click.prevent="deleteAddress()">
                        {{ $t('message.btn_yes') }}
                    </button>
                </div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>
            </div>
        </div>

        <div class="overlay" @click.prevent="emitter.emit('closeDeleteAddressModal')"></div>
    </section>
</template>


<script setup>
    import { inject, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { preparePassportTx, sendTx } from '@/utils'


    const emitter = inject('emitter'),
        i18n = inject('i18n'),
        store = useGlobalStore(),
        notification = useNotification(),
        loading = ref(false)


    // Delete address
    async function deleteAddress() {
        // Show loader
        loading.value = true

        // Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_address_deleting_process')
        })

        try{
            if (!store.demo) {
                // Prepare Tx
                var prepareResult = await preparePassportTx({
                    remove_address: {
                        address: store.currentDeleteAddress,
                        nickname: store.account.moonPassportOwner.extension.nickname
                    }
                })

                // Send Tx
                var result = await sendTx(prepareResult)
            } else {
                var result = { code: 0 }
            }

            if (result.code === 0) {
                // Set TXS
                store.lastTXS = result.transactionHash

                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    group: 'default',
                    title: i18n.global.t('message.notification_success_address_delete_title'),
                    type: 'success',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_address_delete')
                    }
                })

                if (!store.demo) {
                    // Reload page
                    setTimeout(() => window.location.reload(), 100)
                } else {
                    setTimeout(() => {
                        // Hide loader
                        loading.value = false

                        // Close delete address modal
                        store.currentDeleteAddress = ''
                        store.showDeleteAddressModal = false

                        document.body.classList.remove('lock')
                    }, 200)
                }
            }

            if (result.code) {
                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    duration: -100,
                    group: 'default',
                    title: i18n.global.t('message.notification_failed_title'),
                    text: result?.rawLog.toString(),
                    type: 'error',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_address_delete')
                    }
                })

                // Hide loader
                loading.value = false
            }
        } catch (error) {
            console.error(error)

            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                group: 'default',
                title: i18n.global.t('message.notification_failed_title'),
                text: i18n.global.t('message.notification_tx_error_rejected'),
                type: 'error',
                data: {
                    chain: 'bostrom',
                    tx_type: i18n.global.t('message.notification_action_address_delete')
                }
            })

            // Hide loader
            loading.value = false
        }
    }
</script>


<style scoped>
    .modal_content .data
    {
        padding-top: 96px;
    }


    .image
    {
        display: flex;

        height: 240px;
        margin-bottom: 40px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .image img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;
    }


    .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 130%;

        text-align: center;
    }


    .btns
    {
        display: flex;

        margin-top: 40px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .btns .btn
    {
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;

        display: block;

        width: calc(50% - 5px);
        padding: 14px;

        transition: background .2s linear;

        border-radius: 14px;
        background: #353535;
    }

    .btns .btn:hover
    {
        background: #282828;
    }


    .btns .btn.yes_btn
    {
        background: #950fff;
    }

    .btns .btn.yes_btn:hover
    {
        background: #7700e1;
    }

</style>