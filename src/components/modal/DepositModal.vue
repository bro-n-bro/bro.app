<template>
    <section class="modal" id="deposit_modal">
        <div class="modal_content" @click.self="emitter.emit('closeDepositModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeDepositModal')">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                </button>


                <div class="modal_title">
                    {{ $t('message.deposit_modal_title') }}
                </div>


                <form class="form" @submit.prevent="onSubmit">
                    <div class="line">
                        <div class="label">
                            {{ $t('message.deposit_modal_sender_label') }}
                        </div>

                        <div class="field">
                            <input type="text" class="input" readonly :value="store.Keplr.account.address">
                        </div>
                    </div>


                    <div class="line amount">
                        <div class="label">
                            {{ $t('message.deposit_modal_amount_label') }}
                        </div>

                        <div class="field">
                            <input type="text" class="input" v-model="amount" placeholder="0" @input="setAmount">

                            <div class="balance">
                                <Loader v-if="loader" />
                                <span>{{ balance }}</span>
                                {{ store.networks[props.proposal.network].token_name }}
                            </div>
                        </div>
                    </div>


                    <div class="submit">
                        <button type="submit" class="submit_btn">
                            {{ $t('message.btn_send') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { inject, ref, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { generateAddress, prepareTx, sendTx } from '@/utils'

    // Components
    import Loader from '@/components/Loader.vue'


    const props = defineProps(['proposal']),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        store = useGlobalStore(),
        notification = useNotification(),
        loader = ref(true),
        amount = ref(''),
        balance = ref(0)


    onBeforeMount(async () => {
        // Get current account balance
        await getCurrentAccountBalance()
    })


    // Get current account balance
    async function getCurrentAccountBalance() {
        let wallet = store.account.wallets.find(wallet => wallet.address == store.account.currentWallet),
            networkInWallet = wallet.networks.find(network => network.name == store.currentNetwork)

        if(networkInWallet.balance > 0) {
            // Get balance from state
            balance.value = networkInWallet.balance.liquid.native[0].amount / Math.pow(10, networkInWallet.balance.liquid.native[0].exponent)
        } else {
            // Get balance from API
            try {
                await fetch(`${store.networks[store.currentNetwork].index_api}/account/account_balance/${generateAddress(store.networks.cosmoshub.address_prefix, wallet.address)}`)
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        balance.value = response.liquid.native[0].amount / Math.pow(10, response.liquid.native[0].exponent)
                    })
            } catch (error) {
                console.error(error)
            }
        }

        // Hide loader
        loader.value = false
    }


    // Set amount
    function setAmount(event) {
        if(parseFloat(event.target.value.replace(',', '.')) > balance.value) {
            amount.value = balance.value
        }
    }


    // Submit form
    async function onSubmit() {// Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_proposal_deposit_process')
        })

        try {
            // Message
            let msgAny = [{
                typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
                value: {
                    proposalId: props.proposal.id,
                    depositor: store.Keplr.account.address,
                    amount: {
                        denom: store.networks[store.currentNetwork].denom,
                        amount: `${parseFloat(amount.value.replace(',', '.')).toFixed(store.networks[store.currentNetwork].exponent.toString().length - 1) * Math.pow(10, store.networks[store.currentNetwork].exponent)}`
                    }
                }
            }]

            // Prepare Tx
            let prepareResult = await prepareTx([msgAny], false, props.proposal.network)

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
                    group: 'default',
                    title: i18n.global.t('message.notification_success_proposal_deposit_title'),
                    type: 'success',
                    data: {
                        chain: store.networks[store.currentNetwork].name,
                        tx_type: i18n.global.t('message.notification_action_proposal_deposit')
                    }
                })

                // Refresh proposal data
                refreshProposalData()
            }

            if (result.code) {
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
                        chain: store.networks[store.currentNetwork].name,
                        tx_type: i18n.global.t('message.notification_action_address_add')
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
                    chain: store.networks[store.currentNetwork].name,
                    tx_type: i18n.global.t('message.manage_modal_action_deposit')
                }
            })
        }
    }


    // Refresh proposal data
    async function refreshProposalData() {
        // Set loader
        loading.value = true

        // Send "refreshProposalData" event
        emitter.emit('refreshProposalData')
    }
</script>


<style scoped>
    .modal_title
    {
        font-size: 20px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 30px;
    }


    .modal_content .data > .close_btn
    {
        top: 20px;
    }


    .form .line
    {
        margin-bottom: 24px;
    }


    .form .label
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        margin-bottom: 8px;
    }


    .form .field
    {
        position: relative;
    }


    .form .input
    {
        color: currentColor;
        font-family: var(--font_family);
        font-size: 15px;

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 9px 2px;

        transition: border-color .2s linear;

        border: 1px solid transparent;
        border-radius: 15px;
        background: #191919;
    }


    .form .balance
    {
        color: #fff;
        font-size: 14px;
        line-height: 17px;

        position: absolute;
        right: 0;
        bottom: 100%;

        display: flex;

        margin-bottom: 8px;

        white-space: nowrap;

        opacity: .7;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .form .balance .default_loader_wrap
    {
        position: relative;

        width: 16px;
        height: 16px;
        margin: 0 8px 0 0;
    }

    .form .balance span
    {
        margin-right: 4px;
    }


    .form .submit
    {
        padding-top: 10px;
    }


    .form .submit_btn
    {
        font-weight: 500;
        line-height: 19px;

        display: block;

        margin-left: auto;
        padding: 14px 24px;

        transition: background .2s linear;

        border-radius: 14px;
        background: #950fff;
    }


    .form .submit_btn:hover
    {
        background: #7700e1;
    }
</style>