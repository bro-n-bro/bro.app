<template>
    <form class="form" @submit.prevent="onSubmit">
        <ManageModalValidator />


        <div class="notice">
            <div class="title">
                {{ $t('message.manage_modal_notice_title', {
                    unbonding_time: store.networks[store.networkManageModal].unbonding_time/60/60/24
                }) }}
            </div>

            <div class="desc">
                {{ $t('message.manage_modal_notice_desc', {
                    currency: store.networks[store.networkManageModal].token_name,
                    unbonding_time: store.networks[store.networkManageModal].unbonding_time/60/60/24
                }) }}
            </div>
        </div>


        <div class="tokens">
            <div>
                <div class="label">
                    {{ $t('message.manage_modal_my_delegation') }}
                </div>

                <div class="val">
                    <template v-if="data.availabel_tokens">
                    {{ $filters.toFixed(data.availabel_tokens, 2) }}
                    </template>

                    <template v-else>
                    {{ $filters.toFixed(store.networks[store.networkManageModal].delegations_tokens, 2) }}
                    </template>

                    {{ store.networks[store.networkManageModal].token_name }}
                </div>
            </div>

            <div>
                <div class="label">
                    {{ $t('message.manage_modal_available_balance') }}
                </div>

                <div class="val">
                    <template v-if="data.availabel_tokens">
                    {{ $filters.toFixed(data.availabel_tokens, 2) }}
                    </template>

                    <template v-else>
                    {{ $filters.toFixed(store.networks[store.networkManageModal].availabel_tokens, 2) }}
                    </template>

                    {{ store.networks[store.networkManageModal].token_name }}
                </div>
            </div>
        </div>


        <div class="fields">
            <div class="line validator">
                <div class="label">
                    {{ $t('message.manage_modal_validator_redelegare_label') }}
                </div>

                <div class="field" v-click-out="hideDropdown">
                    <input type="text" class="input validator_input" v-model="data.name"
                        :placeholder="$t('message.manage_modal_validator_placeholder')"
                        @focus.self="$event.target.classList.add('active')">

                    <button type="button" class="clear_btn" v-if="data.name.length" @click.prevent="clearValidator">
                        <svg><use xlink:href="/sprite.svg#ic_close"></use></svg>
                    </button>

                    <div class="arr">
                        <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                    </div>

                    <div class="dropdown">
                        <div class="scroll">
                            <div v-for="(validator, index) in validators" :key="index">
                                <button type="button" class="btn" @click.stop.prevent="setValidator(validator)">
                                    {{ validator.description.moniker }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="line amount">
                <div class="label">
                    {{ $t('message.manage_modal_redelegate_amount') }}
                </div>

                <div class="field">
                    <input type="text" class="input" v-model="data.amount" @input="setAmount" placeholder="0" :readonly="!data.operator_address.length">

                    <div class="unit">
                        {{ store.networks[store.networkManageModal].token_name }}
                    </div>

                    <button type="button" class="max_btn" :disabled="!data.operator_address.length" @click.prevent="setMaxAmount">
                        {{ $t('message.manage_modal_max_btn') }}
                    </button>
                </div>

                <div class="exp">
                    {{ $t('message.manage_modal_amount_exp', { value: 0.01, currency: store.networks[store.networkManageModal].token_name }) }}
                </div>
            </div>


            <div class="btns">
                <button type="submit" class="btn submit_btn" :disabled="!data.amount">
                    {{ $t('message.manage_modal_redelegate_btn') }}
                </button>
            </div>
        </div>
    </form>
</template>


<script setup>
    import { reactive, inject } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { prepareTx, sendTx, prepareEVMOSTx, sendEVMOSTx } from '@/utils'

    // Components
    import ManageModalValidator from './ManageModalValidator.vue'

    const props = defineProps(['validators']),
        i18n = inject('i18n'),
        store = useGlobalStore(),
        notification = useNotification(),
        data = reactive({
            amount: '',
            operator_address: '',
            availabel_tokens: 0,
            name: ''
        }),
        validators = reactive(props.validators)


    // Hide dropdown
    function hideDropdown() {
        let validateInput = document.querySelector('.validator_input')

        if(validateInput.classList.contains('active')){
            setTimeout(() => validateInput.classList.remove('active'), 150)
        }
    }


    // Clear data
    function clearValidator() {
        data.operator_address = ''
        data.name = ''
        data.availabel_tokens = 0
        data.amount = ''
    }


    // Set data
    function setValidator(newValidator) {
        data.operator_address = newValidator.operator_address
        data.name = newValidator.description.moniker
        data.availabel_tokens = store.networks[store.networkManageModal].delegations.find(el => el.operator_address == newValidator.operator_address).amount
        data.amount = (data.availabel_tokens - 0.01).toString()

        // Hide dropdown
        hideDropdown()
    }


    // Set amount
    function setAmount(event) {
        if(parseFloat(event.target.value.replace(',', '.')) > data.availabel_tokens - 0.01) {
            data.amount = (data.availabel_tokens - 0.01).toString()
        }
    }


    // Set max. amount
    function setMaxAmount() {
        data.amount = (data.availabel_tokens - 0.01).toString()
    }


    // Submit form
    function onSubmit() {
        let amount = parseFloat(data.amount.replace(',', '.'))

        if(amount > 0) {
            // Other processing for EVMOS
            store.networkManageModal == 'evmos'
                ? redelegateEVMOS()
                : redelegateDEFAULT()
        }
    }


    // Rredelegate DEFAULT
    async function redelegateDEFAULT() {
        try {
            // Message
            let msgAny = {
                typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
                value: {
                    delegatorAddress: store.wallets[store.networkManageModal],
                    validatorSrcAddress: data.operator_address,
                    validatorDstAddress: store.networks[store.networkManageModal].validator,
                    amount: {
                        denom: store.networks[store.networkManageModal].denom,
                        amount: `${parseFloat(data.amount.replace(',', '.')).toFixed(store.networks[store.networkManageModal].exponent.toString().length - 1) * store.networks[store.networkManageModal].exponent}`
                    }
                }
            }

            // Prepare Tx
            let prepareResult = await prepareTx([msgAny])

            // Show notification
            notification.notify({
                group: store.networks[store.networkManageModal].denom,
                duration: -100,
                title: i18n.global.t('message.notification_progress_title'),
                data: {
                    chain: store.networkManageModal,
                    tx_type: i18n.global.t('message.manage_modal_action_redelegate')
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
                    title: i18n.global.t('message.notification_failed_title'),
                    text: store.manageError,
                    type: 'error',
                    data: {
                        chain: store.networkManageModal,
                        tx_type: i18n.global.t('message.manage_modal_action_redelegate')
                    }
                })

                return false
            }

            // Show success modal
            showSuccess(result)
        } catch (error) {
            console.log(error)

            // Show error modal
            showError(error)
        }
    }


    // Rredelegate EVMOS
    function redelegateEVMOS() {
        try {
            // Create request
            fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
                .then(res => res.json())
                .then(async response => {
                    try {
                        // Params
                        let params = {
                            validatorSrcAddress: data.operator_address,
                            validatorDstAddress: store.networks.evmos.validator,
                            amount: `${parseFloat(data.amount.replace(',', '.')).toFixed(store.networks[store.networkManageModal].exponent.toString().length - 1) * store.networks.evmos.exponent}`,
                            denom: store.networks.evmos.denom,
                        }

                        // Prepare EVMOS Tx
                        let prepareResult = await prepareEVMOSTx(params, response.account.base_account, 'redelegate')

                        // Show notification
                        notification.notify({
                            group: store.networks[store.networkManageModal].denom,
                            duration: -100,
                            title: i18n.global.t('message.notification_progress_title'),
                            data: {
                                chain: store.networkManageModal,
                                tx_type: i18n.global.t('message.manage_modal_action_redelegate')
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
                        //             tx_type: i18n.global.t('message.manage_modal_action_redelegate')
                        //         }
                        //     })

                        //     return false
                        // }

                        // Set TXS
                        store.lastTXS = result.tx_response.txhash

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
                                tx_type: i18n.global.t('message.manage_modal_action_redelegate'),
                                tx_hash: store.lastTXS
                            }
                        })

                        // Update network
                        store.updateNetwork(store.networkManageModal)

                        // Clear validator data
                        clearValidator()
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


    // Show success modal
    function showSuccess(result) {
        // Set TXS
        store.lastTXS = result.transactionHash

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
                tx_type: i18n.global.t('message.manage_modal_action_redelegate'),
                tx_hash: store.networkManageModal != 'bostrom' ? store.lastTXS : ''
            }
        })

        // Update network
        store.updateNetwork(store.networkManageModal)

        // Clear validator data
        clearValidator()
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
                tx_type: i18n.global.t('message.manage_modal_action_redelegate')
            }
        })
    }
</script>


<style scoped>

</style>
