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
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    import { SigningStargateClient } from '@cosmjs/stargate'
    import { createTxMsgWithdrawDelegatorReward } from '@evmos/transactions'
    import { createTxRaw } from '@evmos/proto'
    import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@evmos/provider'

    // Components
    import ManageModalValidator from './ManageModalValidator.vue'

    const props = defineProps(['validators']),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        validators = props.validators


    // Submit form
    function onSubmit() {
        // Enable loader
        store.loaderManageModal = !store.loaderManageModal

        // Other processing for EVMOS
        store.networkManageModal == 'evmos'
            ? claimAllEVMOS()
            : claimAllDEFAULT()
    }


    // Claim all DEFAILT
    async function claimAllDEFAULT() {
        try {
            // Create request
            let offlineSigner = await window.getOfflineSignerAuto(store.networks[store.networkManageModal].chainId)

            Object.assign(offlineSigner, {
                signAmino: offlineSigner.signAmino ?? offlineSigner.sign
            })

            // RPC endpoint
            let rpcEndpoint = store.networks[store.networkManageModal].rpc_api

            // Client
            let client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner)

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

            // Gas
            let fee = {
                amount: [{
                    denom: store.networks[store.networkManageModal].denom,
                    amount: '0'
                }],
                gas: '1000000'
            }

            // MENO
            let memo = 'bro.app'

            // Send transaction
            let result = await client.signAndBroadcast(store.wallets[store.networkManageModal], msgAny, fee, memo)

            if(result.code != 0){
                // Get error title
                store.manageError = i18n.global.t(`message.manage_modal_error_${result.code}`)

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal

                // Open error modal
                // emitter.emit('close_manage_modal')
                // emitter.emit('open_manage_error_modal')

                return false
            }

            // Update network
            setTimeout(() => {
                store.updateNetwork(store.networkManageModal)

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal
            }, 4000)
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
                    let chain = {
                        chainId: 9001,
                        cosmosChainId: store.networks.evmos.chainId,
                    },
                    sender = {
                        accountAddress: store.wallets.evmos,
                        sequence: response.account.base_account.sequence,
                        accountNumber: response.account.base_account.account_number,
                        pubkey: response.account.base_account.pub_key.key,
                    },
                    fee = {
                        amount: '0',
                        denom: store.networks.evmos.denom,
                        gas: store.networks.evmos.gas,
                    },
                    params = {
                        validatorAddress: store.networks.evmos.validator,
                    },
                    memo = 'bro.app'

                    let msg = createTxMsgWithdrawDelegatorReward(chain, sender, fee, memo, params)

                    let sign = await window?.keplr?.signDirect(
                        store.networks.evmos.chainId,
                        sender.accountAddress,
                        {
                            bodyBytes: msg.signDirect.body.serializeBinary(),
                            authInfoBytes: msg.signDirect.authInfo.serializeBinary(),
                            chainId: store.networks.evmos.chainId,
                            accountNumber: sender.accountNumber,
                        },
                        { isEthereum: true }
                    )

                    let rawTx = createTxRaw(sign.signed.bodyBytes, sign.signed.authInfoBytes, [
                        new Uint8Array(Buffer.from(sign.signature.signature, 'base64'))
                    ])

                    // Broadcast it
                    let postOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: generatePostBodyBroadcast(rawTx),
                    }

                    let broadcastPost = await fetch(`${store.networks.evmos.lcd_api}${generateEndpointBroadcast()}`, postOptions)

                    let result = await broadcastPost.json()

                    if(result.tx_response.code != 0){
                        // Get error title
                        store.manageError = i18n.global.t(`message.manage_modal_error_${result.tx_response.code}`)

                        // Disable loader
                        store.loaderManageModal = !store.loaderManageModal

                        // Open error modal
                        // emitter.emit('close_manage_modal')
                        // emitter.emit('open_manage_error_modal')

                        return false
                    }

                    // Update network
                    setTimeout(() => {
                        store.updateNetwork(store.networkManageModal)

                        // Disable loader
                        store.loaderManageModal = !store.loaderManageModal
                    }, 4000)
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

        // Disable loader
        store.loaderManageModal = !store.loaderManageModal

        // Open error modal
        // emitter.emit('close_manage_modal')
        // emitter.emit('open_manage_error_modal')
    }
</script>