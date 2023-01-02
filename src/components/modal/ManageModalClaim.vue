<template>
    <form class="form" @submit.prevent="onSubmit">
        <ManageModalValidator />


        <div class="notice">
            <div class="title" v-html="$t('message.manage_modal_claim_notice_title')"></div>
        </div>


        <div class="tokens">
            <div>
                <div class="label">
                    {{ $t('message.manage_modal_my_delegation') }}
                </div>

                <div class="val">
                    {{ $filters.toFixed(store.networks[store.networkManageModal].delegations_tokens, 2) }}

                    {{ store.networks[store.networkManageModal].token_name }}
                </div>
            </div>

            <div>
                <div class="label">
                    {{ $t('message.manage_modal_available_balance') }}
                </div>

                <div class="val">
                    {{ $filters.toFixed(store.networks[store.networkManageModal].availabel_tokens, 2) }}
                    {{ store.networks[store.networkManageModal].token_name }}
                </div>
            </div>

            <div>
                <div class="label">
                    {{ $t('message.manage_modal_rewards_balance') }}
                </div>

                <div class="val">
                    <!-- {{ $filters.toFixed(store.networks[store.networkManageModal].rewards_tokens, 2) }} -->
                    {{ store.networks[store.networkManageModal].rewards_tokens }}
                    {{ store.networks[store.networkManageModal].token_name }}
                </div>
            </div>
        </div>


        <div class="btns">
            <button type="submit" class="btn submit_btn">
                {{ $t('message.manage_modal_claim_all_btn') }}
            </button>
        </div>
    </form>
</template>


<script setup>
    import { inject, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { prepareTx, sendTx, prepareEVMOSTx, sendEVMOSTx } from '@/utils'

    // Components
    import ManageModalValidator from './ManageModalValidator.vue'

    const props = defineProps(['validators']),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification(),
        validators = reactive(props.validators)


    // Submit form
    function onSubmit() {
        // Other processing for EVMOS
        store.networkManageModal == 'evmos'
            ? claimAllEVMOS()
            : claimAllDEFAULT()
    }


    // Claim all DEFAILT
    async function claimAllDEFAULT() {
        try {
            // Message
            let msgAny = [{
                typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                value: {
                    delegatorAddress: store.wallets[store.networkManageModal],
                    validatorAddress: store.networks[store.networkManageModal].validator
                }
            }]

            if(validators.length) {
                // If there is more than one validator
                validators.forEach(validator => {
                    let validatorRewards = store.networks[store.networkManageModal].rewards.find(el => el.operator_address == validator.operator_address)

                    msgAny.push({
                        typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                        value: {
                            delegatorAddress: store.wallets[store.networkManageModal],
                            validatorAddress: validator.operator_address
                        }
                    })
                })
            }

            // Prepare Tx
            let prepareResult = await prepareTx(msgAny, false)

            // Show notification
            notification.notify({
                group: store.networks[store.networkManageModal].denom,
                duration: -100,
                title: i18n.global.t('message.notification_progress_title'),
                data: {
                    chain: store.networkManageModal,
                    tx_type: i18n.global.t('message.manage_modal_action_claim')
                }
            })

            // Send Tx
            let result = await sendTx(prepareResult)

            if(result.code != 0){
                // Get error title
                store.manageError = i18n.global.t(`message.manage_modal_error_${result.code}`)

                // Show notification
                notification.notify({
                    group: store.networks[store.networkManageModal].denom,
                    clean: true
                })

                notification.notify({
                    group: store.networks[store.networkManageModal].denom,
                    title: i18n.global.t('message.notification_failed_title'),
                    text: store.manageError,
                    type: 'error',
                    data: {
                        chain: store.networkManageModal,
                        tx_type: i18n.global.t('message.manage_modal_action_claim')
                    }
                })

                return false
            }

            // Show notification
            notification.notify({
                group: store.networks[store.networkManageModal].denom,
                clean: true
            })

            notification.notify({
                group: store.networks[store.networkManageModal].denom,
                title: i18n.global.t('message.notification_successful_title'),
                type: 'success',
                data: {
                    chain: store.networkManageModal,
                    tx_type: i18n.global.t('message.manage_modal_action_claim')
                }
            })

            // Update network
            setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
        } catch (error) {
            console.log(error)

            // Show error modal
            showError(error)
        }
    }


    // Claim all EVMOS
    async function claimAllEVMOS() {
        try {
            // Create request
            await fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
                .then(res => res.json())
                .then(async response => {
                    try {
                        // Params
                        let params = {
                            validatorAddress: store.networks.evmos.validator
                        }

                        // Prepare EVMOS Tx
                        let prepareResult = await prepareEVMOSTx(params, response.account.base_account, 'claim')

                        // Show notification
                        notification.notify({
                            group: store.networks[store.networkManageModal].denom,
                            duration: -100,
                            title: i18n.global.t('message.notification_progress_title'),
                            data: {
                                chain: store.networkManageModal,
                                tx_type: i18n.global.t('message.manage_modal_action_delegate')
                            }
                        })

                        // Send EVMOS Tx
                        let result = await sendEVMOSTx(prepareResult)

                        // if(result.tx_response.code != 0){
                        //     // Get error title
                        //     store.manageError = i18n.global.t(`message.manage_modal_error_${result.tx_response.code}`)

                        //     // Show notification
                        //     notification.notify({
                        //         group: store.networks[store.networkManageModal].denom,
                        //         clean: true
                        //     })

                        //     notification.notify({
                        //         group: store.networks[store.networkManageModal].denom,
                        //         title: i18n.global.t('message.notification_failed_title'),
                        //         text: store.manageError,
                        //         type: 'error',
                        //         data: {
                        //             chain: store.networkManageModal,
                        //             tx_type: i18n.global.t('message.manage_modal_action_claim')
                        //         }
                        //     })

                        //     return false
                        // }

                        // Show notification
                        notification.notify({
                            group: store.networks[store.networkManageModal].denom,
                            clean: true
                        })

                        notification.notify({
                            group: store.networks[store.networkManageModal].denom,
                            title: i18n.global.t('message.notification_successful_title'),
                            type: 'success',
                            data: {
                                chain: store.networkManageModal,
                                tx_type: i18n.global.t('message.manage_modal_action_claim')
                            }
                        })

                        // Update network
                        setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
                    } catch (error) {
                        console.log(error)

                        // Show error modal
                        showError(error)
                    }
                })
        } catch (error) {
            console.log(error)

            // Show error modal
            showError(error)
        }
    }


    // Show error modal
    function showError(error) {
        // Get error code
        let errorCode = error.message.match(/code (\d+(\.\d)*)/i)

        // Get error title
        errorCode
            ? store.manageError = i18n.global.t(`message.manage_modal_error_${errorCode[1]}`)
            : store.manageError = i18n.global.t('message.manage_modal_error_rejected')

        // Show notification
        notification.notify({
            group: store.networks[store.networkManageModal].denom,
            clean: true
        })

        notification.notify({
            group: store.networks[store.networkManageModal].denom,
            title: i18n.global.t('message.notification_failed_title'),
            text: store.manageError,
            type: 'error',
            data: {
                chain: store.networkManageModal,
                tx_type: i18n.global.t('message.manage_modal_action_claim')
            }
        })
    }
</script>