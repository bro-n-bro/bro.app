<template>
    <section class="connected_addresses">
        <div class="title">
            {{ $t('message.account_connected_addresses_title') }}
        </div>

        <div class="list">
            <!-- <pre>{{ store.account.moonPassport }}</pre> -->

            <router-link :to="`/dashboard/${store.wallets.cosmoshub}`" class="item">
                <div class="health green"></div>

                <div class="name">{{ store.wallets.bostrom }}</div>
            </router-link>

            <template v-for="(item, index) in store.account.moonPassport.extension.addresses" :key="index">
            <router-link :to="`/dashboard/${store.wallets.cosmoshub}`" class="item" :class="{'hide': index >= 3 && !data.showAll}" v-if="item.address.substring(0, 2) != '0x'">
                <div class="health green"></div>

                <div class="name">{{ item.address }}</div>

                <button class="remove_btn" @click.prevent="deleteAddress(item.address)">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_remove"></use></svg>
                </button>
            </router-link>
            </template>
        </div>

        <button class="add_btn">
            <span>{{ $t('message.add_address_btn') }}</span>
            <svg class="icon"><use xlink:href="/sprite.svg#ic_plus"></use></svg>
        </button>

        <button class="spoler_btn" :class="{'active': data.showAll}" @click.prevent="data.showAll = !data.showAll" v-if="store.account.moonPassport.approvals.length > 3">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>
    </section>
</template>


<script setup>
    import { reactive, inject } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { preparePassportTx, sendTx } from '@/utils'

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification(),
        data = reactive({
            showAll: false
        })


    // Delete address
    async function deleteAddress(address) {
        // Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_address_deleting_process')
        })

        try{
            // Prepare Tx
            let prepareResult = await preparePassportTx({
                remove_address: {
                    address,
                    nickname: store.account.moonPassport.extension.nickname
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
                    title: i18n.global.t('message.notification_success_address_delete_title'),
                    type: 'success',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_address_delete')
                    }
                })

                // Get moon passport
                store.getMoonPassport()
            }

            if (result.code) {
                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    duration: -100,
                    group: store.networks.bostrom.denom,
                    title: i18n.global.t('message.notification_failed_title'),
                    text: result?.rawLog.toString(),
                    type: 'error',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_address_delete')
                    }
                })
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
                    tx_type: i18n.global.t('message.notification_action_address_delete')
                }
            })
        }
    }
</script>


<style scoped>
    .connected_addresses
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .connected_addresses .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 20px;
    }


    .connected_addresses .list > * + *
    {
        margin-top: 8px;
    }


    .connected_addresses .item
    {
        color: rgba(255,255,255,.7);

        display: flex;

        padding: 10px;

        transition: .2s linear;

        border-radius: 14px;
        background: #141414;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .item.hide
    {
        display: none;
    }


    .connected_addresses .health
    {
        position: relative;
        top: 1px;

        width: 14px;
        height: 16px;
        margin-right: 9px;
        margin-left: 1px;

        clip-path: polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%);
    }

    .connected_addresses .health.orange
    {
        background: linear-gradient(180deg, #ff650f 0%, rgba(96, 24, 2, .3) 100%);
    }

    .connected_addresses .health.red
    {
        background: linear-gradient(180deg, #ff0f0f 0%, rgba(87, 0, 0, .3) 100%);
    }

    .connected_addresses .health.green
    {
        background: linear-gradient(180deg, #5cff0f 0%, rgba(0, 47, 5, .3) 100%);
    }


    .connected_addresses .name
    {
        font-size: 14px;
        line-height: 20px;

        overflow: hidden;

        width: calc(100% - 48px);

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .connected_addresses .remove_btn
    {
        color: #555;

        display: flex;

        width: 16px;
        height: 16px;
        margin-left: auto;

        transition: color .2s linear;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .remove_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }

    .connected_addresses .remove_btn:hover
    {
        color: #950fff;
    }


    .connected_addresses .item:hover
    {
        color: #fff;

        background: #353535;
    }


    .connected_addresses .add_btn
    {
        font-size: 14px;
        line-height: 110%;

        display: flex;

        width: 100%;
        margin-top: 16px;
        padding: 8px;

        transition: background .2s linear;

        border-radius: 10px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .add_btn .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-left: 8px;
    }

    .connected_addresses .add_btn:hover
    {
        background: #7700e1;
    }


    .connected_addresses .spoler_btn
    {
        position: absolute;
        right: 0;
        bottom: -18px;
        left: 0;

        display: flex;

        width: 36px;
        height: 36px;
        margin: auto;

        transition: background .2s linear;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }

    .connected_addresses .spoler_btn:hover
    {
        background: #950fff;
    }



    @media print, (max-width: 1899px)
    {
        .connected_addresses .title
        {
            font-size: 27px;
            line-height: 33px;
        }
    }

</style>