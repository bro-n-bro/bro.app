<template>
    <section class="modal" id="manage_modal">
        <transition name="fadeUp" mode="out-in" appear type="animation">
        <div class="modal_content" @click.self="emitter.emit('close_manage_modal')">
            <div class="data">
                <div class="loader_wrap" v-if="store.loaderManageModal">
                    <div class="loader"><span></span></div>
                </div>

                <button class="close_btn" @click.prevent="emitter.emit('close_manage_modal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <form class="form" @submit.prevent="onSubmit">
                    <div class="type">
                        <label @click="clearValidator; form.validator.name = $t('message.manage_modal_validator_name')">
                            <input type="radio" value="delegate" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_delegate') }}</div>
                        </label>

                        <label v-if="form.validators.length" @click="clearValidator">
                            <input type="radio" value="redelegate" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_redelegate') }}</div>
                        </label>

                        <label v-if="store.networks[store.networkManageModal].rewards_tokens > 0.0049" @click="clearValidator">
                            <input type="radio" value="claim" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_claim') }}</div>
                        </label>

                        <label @click="clearValidator" v-if="store.networks[store.networkManageModal].restake">
                            <input type="radio" value="restake" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_restake') }}</div>
                        </label>
                    </div>

                    <div class="validator">
                        <div class="logo">
                            <img src="../assets/images/logo_mini.svg" alt="">
                        </div>

                        <div>
                            <div class="name">
                                {{ $t('message.manage_modal_validator_name') }}
                            </div>

                            <div class="commission">
                                {{ $t('message.manage_modal_commission') }}
                                <span class="sep">—</span>
                                <span class="val">{{ commision }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="notice">
                        <div class="title" v-if="form.type == 'delegate' || form.type == 'redelegate'">
                            {{ $t('message.manage_modal_notice_title', {
                                unbonding_time: store.networks[store.networkManageModal].unbonding_time/60/60/24
                            }) }}
                        </div>

                        <div class="desc" v-if="form.type == 'delegate' || form.type == 'redelegate'">
                            {{ $t('message.manage_modal_notice_desc', {
                                currency: store.networks[store.networkManageModal].token_name,
                                unbonding_time: store.networks[store.networkManageModal].unbonding_time/60/60/24
                            }) }}
                        </div>


                        <div class="title" v-if="form.type == 'claim'" v-html="$t('message.manage_modal_claim_notice_title')"></div>


                        <div class="title" v-if="form.type == 'restake'">
                            {{ $t('message.manage_modal_restake_notice_title') }}
                        </div>

                        <div class="desc" v-if="form.type == 'restake'" v-html="$t('message.manage_modal_restake_notice_desc')"></div>
                    </div>

                    <div class="tokens" v-if="form.type != 'restake'">
                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_my_delegation') }}
                            </div>

                            <div class="val">
                                <template v-if="form.validator.availabel_tokens">
                                {{ $filters.toFixed(form.validator.availabel_tokens, 2) }}
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
                                <template v-if="form.validator.availabel_tokens">
                                {{ $filters.toFixed(form.validator.availabel_tokens, 2) }}
                                </template>

                                <template v-else>
                                {{ $filters.toFixed(store.networks[store.networkManageModal].availabel_tokens, 2) }}
                                </template>

                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>
                        </div>

                        <div v-if="form.type == 'claim'">
                            <div class="label">
                                {{ $t('message.manage_modal_rewards_balance') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.networks[store.networkManageModal].rewards_tokens, 2) }}

                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>
                        </div>
                    </div>

                    <div class="validate_from" v-if="form.type == 'delegate' || form.type == 'redelegate'">
                        <div class="label" v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_validator_label') }}
                        </div>

                        <div class="label" v-else>
                            {{ $t('message.manage_modal_validator_label2') }}
                        </div>

                        <div class="field" v-click-out="hideDropdown">
                            <input type="text" class="input" :placeholder="$t('message.manage_modal_validator_placeholder')"
                                :readonly="form.type == 'delegate'"
                                v-model="form.validator.name"
                                @focus.self="$event.target.classList.add('active')">

                            <button type="button" class="clear_btn" @click.prevent="clearValidator" v-if="form.validator.name.length">
                                <svg><use xlink:href="/sprite.svg#ic_close"></use></svg>
                            </button>

                            <div class="arr">
                                <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                            </div>

                            <div class="dropdown">
                                <div class="scroll">
                                    <div v-for="(validator, index) in form.validators" :key="index">
                                        <button type="button" class="btn" @click.stop.prevent="setValidator(validator)">
                                            {{ validator.description.moniker }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="exp" v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_validator_exp') }}
                        </div>
                    </div>

                    <div class="amount" v-if="form.type == 'delegate' || form.type == 'redelegate'">
                        <div class="label">
                            <template v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_amount') }}
                            </template>

                            <template v-else>
                            {{ $t('message.manage_modal_amount2') }}
                            </template>
                        </div>

                        <div class="field">
                            <input type="text" class="input" v-model="form.amount" @input="setAmount" placeholder="0">

                            <div class="unit">
                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>

                            <button type="button" class="max_btn" @click.prevent="setMAX">
                                {{ $t('message.manage_modal_max_btn') }}
                            </button>
                        </div>

                        <div class="exp">
                            {{ $t('message.manage_modal_amount_exp', { value: 0.01, currency: store.networks[store.networkManageModal].token_name }) }}
                        </div>
                    </div>

                    <div class="restake_features" v-if="form.type == 'restake'">
                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_APR') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.networks[store.networkManageModal].apr*100, 2) }} %
                            </div>
                        </div>

                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_APY') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.networks[store.networkManageModal].apy*100, 2) }} %
                            </div>
                        </div>

                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_delegation') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(restake.delegations, 2) }}
                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>
                        </div>

                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_pending_rewards') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(restake.rewards, 2) }}
                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>
                        </div>

                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_frequency') }}
                            </div>

                            <div class="val">
                                {{ $t('message.manage_modal_frequency_val', { frequency: store.networks[store.networkManageModal].restake.run_time }) }}
                            </div>
                        </div>

                        <div>
                            <div class="label">
                                {{ $t('message.manage_modal_minimum_reward') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.networks[store.networkManageModal].restake.minimum_reward / store.networks[store.networkManageModal].exponent, 1) }}
                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>
                        </div>
                    </div>

                    <div class="grant_info" v-if="form.type == 'restake'">
                        <div>
                            <div class="label">{{ $t('message.manage_modal_grant_label_status') }}</div>

                            <div class="val red" v-if="!Object.keys(restake.grant).length">{{ $t('message.manage_modal_grant_status_inactive') }}</div>

                            <div class="val green" v-else>
                                <div>{{ $t('message.manage_modal_grant_status_active') }}</div>
                                <div class="expiration">{{ restake.grant.expiration }}</div>
                            </div>
                        </div>

                        <div>
                            <div class="label">{{ $t('message.manage_modal_grant_label_remaining') }}</div>

                            <div class="val" v-if="!Object.keys(restake.grant).length">{{ $t('message.manage_modal_grant_remaining') }}</div>

                            <div class="val green" v-else-if="restake.grant.authorization.max_tokens == undefined">{{ $t('message.manage_modal_grant_remaining_unlimited') }}</div>

                            <div class="val green" v-else>
                                {{ restake.grant.authorization.max_tokens.amount / store.networks[store.networkManageModal].exponent }}
                                {{ store.networks[store.networkManageModal].token_name }}
                            </div>
                        </div>
                    </div>


                    <div class="btns">
                        <button type="submit" class="btn submit_btn" v-if="form.type != 'restake'">
                            <template v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_delegate_btn') }}
                            </template>

                            <template v-if="form.type == 'redelegate'">
                            {{ $t('message.manage_modal_redelegate_btn') }}
                            </template>

                            <template v-if="form.type == 'claim'">
                            {{ $t('message.manage_modal_claim_all_btn') }}
                            </template>
                        </button>

                        <button type="button" class="btn green" v-if="form.type == 'restake' && !Object.keys(restake.grant).length" @click.prevent="setGrant">
                            {{ $t('message.manage_modal_enable_restake_btn') }}
                        </button>

                        <button type="button" class="btn red w50" v-if="form.type == 'restake' && Object.keys(restake.grant).length" @click.prevent="removeGrant">
                            {{ $t('message.manage_modal_disable_restake_btn') }}
                        </button>

                        <button type="button" class="btn grey w50" v-if="form.type == 'restake' && Object.keys(restake.grant).length">
                            {{ $t('message.manage_modal_manage_grant_btn') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </transition>


        <transition name="fade" mode="out-in" appear type="animation">
        <div class="overlay"></div>
        </transition>
    </section>
</template>


<script setup>
    import { inject, reactive, onMounted } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { SigningStargateClient } from '@cosmjs/stargate'
    import { createTxRaw } from '@evmos/proto'
    import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@evmos/provider'
    import { createTxMsgDelegate, createTxMsgBeginRedelegate, createTxMsgWithdrawDelegatorReward } from '@evmos/transactions'

    import { StakeAuthorization } from 'cosmjs-types/cosmos/staking/v1beta1/authz'

    const emitter = inject('emitter'),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        commision = 5,
        form = reactive({
            type: 'delegate',
            amount: '',
            validators: [],
            validator: {
                operator_address: '',
                availabel_tokens: 0,
                name: i18n.global.t('message.manage_modal_validator_name')
            }
        }),
        restake = reactive({
            grant: {},
            delegations: store.networks[store.networkManageModal].delegations.find(el => el.operator_address == store.networks[store.networkManageModal].validator).amount,
            rewards: store.networks[store.networkManageModal].rewards.find(el => el.operator_address == store.networks[store.networkManageModal].validator).amount
        })


    onMounted(async () => {
        // Get validators for redelegate
        if(store.showManageModal){
            await fetch(`${store.networks[store.networkManageModal].lcd_api}/cosmos/staking/v1beta1/delegators/${store.wallets[store.networkManageModal]}/validators`)
                .then(response => response.json())
                .then(data => {
                    let result = data.validators.filter(el => {
                        if(el.operator_address != store.networks[store.networkManageModal].validator) {
                            return el
                        }
                    })

                    if(result.length) {
                        form.validators = result
                    }
                })
        }

        // Get grant info
        if(store.networks[store.networkManageModal].restake) {
            getGrantInfo()
        }
    })


    // Clear validator info
    function clearValidator() {
        form.validator.operator_address = ''
        form.validator.name = ''
        form.validator.availabel_tokens = 0
    }


    // Hide dropdown
    function hideDropdown() {
        let validateInout = document.querySelector('#manage_modal .validate_from .input')

        if(validateInout.classList.contains('active')){
            setTimeout(() => validateInout.classList.remove('active'), 150)
        }
    }


    // Set validator info
    function setValidator(validator) {
        form.validator.operator_address = validator.operator_address
        form.validator.name = validator.description.moniker
        form.validator.availabel_tokens = store.networks[store.networkManageModal].delegations[validator.operator_address]

        form.amount = form.validator.availabel_tokens - 0.00

        // Hide dropdown
        hideDropdown()
    }


    // Set amount
    function setAmount(event) {
        if(form.validator.availabel_tokens) {
            if(event.target.value > form.validator.availabel_tokens) {
                form.amount = form.validator.availabel_tokens - 0.01
            }
        } else {
            if(event.target.value > store.networks[store.networkManageModal].availabel_tokens) {
                form.amount = store.networks[store.networkManageModal].availabel_tokens - 0.01
            }
        }
    }


    // Set MAX amount
    function setMAX() {
        form.validator.operator_address
            ? form.amount = form.validator.availabel_tokens - 0.01
            : form.amount = store.networks[store.networkManageModal].availabel_tokens - 0.01
    }


    // Get grant info
    async function getGrantInfo() {
        try {
            await fetch(`${store.networks[store.networkManageModal].lcd_api}/cosmos/authz/v1beta1/grants/granter/${store.wallets[store.networkManageModal]}`)
                .then(response => response.json())
                .then(data => {
                    if(data.grants.length) {
                        restake.grant = data.grants.find(grant => grant.grantee == store.networks[store.networkManageModal].restake.address)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Prepare transaction
    async function prepareTx(enableFee) {
        // Create request
        const offlineSigner = await window.getOfflineSignerAuto(store.networks[store.networkManageModal].chainId)

        Object.assign(offlineSigner, {
            signAmino: offlineSigner.signAmino ?? offlineSigner.sign
        })

        const rpcEndpoint = store.networks[store.networkManageModal].rpc_api,
            client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner)

        if(enableFee) {
            // Simulate gas
            let gasUsed = store.networkManageModal != 'emoney' ? '0' : store.networks.emoney.gas

            if(store.networkManageModal != 'emoney'){
                gasUsed = await client.simulate(store.wallets[store.networkManageModal], [msgAny])
            }
        }

        const fee = {
            amount: [{
                denom: store.networks[store.networkManageModal].denom,
                amount: '0'
            }],
            gas: !enableFee ? '250000' : Math.round(gasUsed * 1.3).toString()
        }

        const memo = 'bro.app'

        return { client, fee,  memo }
    }


    // Send transaction
    async function sendTx(client, address, message, fee, memo) {
        const result = await client.signAndBroadcast(address, message, fee, memo)

        return result
    }


    async function setGrant() {
        // Enable loader
        store.loaderManageModal = !store.loaderManageModal

        try {
            const expiry = new Date(),
                msgAny = {
                    typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
                    value: {
                        granter: store.wallets[store.networkManageModal],
                        grantee: store.networks[store.networkManageModal].restake.address,
                        grant: {
                            expiration: expiry.setFullYear(expiry.getFullYear() + 1),
                            authorization: {
                                typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
                                value: StakeAuthorization.encode(StakeAuthorization.fromPartial({
                                    allowList: { address: [store.networks[store.networkManageModal].validator] },
                                    authorizationType: 1
                                })).finish()
                            }
                        }
                    }
                }

            // Prepare message
            const tx = await prepareTx(false)

            // Send transaction
            const result = await sendTx(tx.client, store.wallets[store.networkManageModal], [msgAny], tx.fee, tx.memo)

            if(result.code == 0){
                // Update grant info
                getGrantInfo()

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function removeGrant() {
        // Enable loader
        store.loaderManageModal = !store.loaderManageModal

        try {
            const msgAny = {
                typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
                value: {
                    granter: store.wallets[store.networkManageModal],
                    grantee: store.networks[store.networkManageModal].restake.address,
                    msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate'
                }
            }

            // Prepare message
            const tx = await prepareTx(false)

            // Send transaction
            const result = await sendTx(tx.client, store.wallets[store.networkManageModal], [msgAny], tx.fee, tx.memo)

            if(result.code == 0){
                // Update grant info
                restake.grant = {}

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal
            }
        } catch (error) {
            console.log(error)
        }
    }


    // Delegate DEFAULT
    async function delegateDEFAULT() {
        try {
            const msgAny = {
                typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
                value: {
                    delegatorAddress: store.wallets[store.networkManageModal],
                    validatorAddress: store.networks[store.networkManageModal].validator,
                    amount: {
                        denom: store.networks[store.networkManageModal].denom,
                        amount: (form.amount * store.networks[store.networkManageModal].exponent).toString()
                    }
                }
            }

            // Prepare message
            const tx = await prepareTx(false)

            // Send transaction
            const result = await sendTx(tx.client, store.wallets[store.networkManageModal], [msgAny], tx.fee, tx.memo)

            // Show success modal
            showSuccessModal(result)
        } catch (error) {
            console.log(error)

            // Show error modal
            showErrorModal(error)
        }
    }


    // Delegate EVMOS
    async function delegateEVMOS() {
        try {
            // Create request
            await fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
                .then(response => response.json())
                .then(async data => {
                    const chain = {
                        chainId: 9001,
                        cosmosChainId: store.networks.evmos.chainId,
                    },
                    sender = {
                        accountAddress: store.wallets.evmos,
                        sequence: data.account.base_account.sequence,
                        accountNumber: data.account.base_account.account_number,
                        pubkey: data.account.base_account.pub_key.key,
                    },
                    fee = {
                        amount: '0',
                        denom: store.networks.evmos.denom,
                        gas: store.networks.evmos.gas,
                    },
                    params = {
                        validatorAddress: store.networks.evmos.validator,
                        amount: `${form.amount * store.networks.evmos.exponent}`,
                        denom: store.networks.evmos.denom,
                    }

                    const msg = createTxMsgDelegate(chain, sender, fee, 'bro.app', params)

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
                    const postOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: generatePostBodyBroadcast(rawTx),
                    }

                    let broadcastPost = await fetch(`https://lcd.evmos-9001-2.bronbro.io${generateEndpointBroadcast()}`, postOptions)

                    let response = await broadcastPost.json()

                    if(response.tx_response.code != 0){
                        // Get error title
                        store.manageError = i18n.global.t(`message.manage_modal_error_${response.tx_response.code}`)

                        // Disable loader
                        store.loaderManageModal = !store.loaderManageModal

                        // Open error modal
                        emitter.emit('close_manage_modal')
                        emitter.emit('open_manage_error_modal')

                        return false
                    }

                    // Disable loader
                    store.loaderManageModal = !store.loaderManageModal

                    // Set TXS
                    store.lastTXS = response.tx_response.txhash

                    // Open success modal
                    emitter.emit('close_manage_modal')
                    emitter.emit('open_manage_success_modal')

                    // Update network
                    setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
                })
        } catch (error) {
            console.log(error)

            // Get error title
            store.manageError = i18n.global.t('message.manage_modal_error_rejected')

            // Disable loader
            store.loaderManageModal = !store.loaderManageModal

            // Open error modal
            emitter.emit('close_manage_modal')
            emitter.emit('open_manage_error_modal')
        }
    }


    // Rredelegate DEFAULT
    async function redelegateDEFAULT() {
        try {
            const msgAny = {
                typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
                value: {
                    delegatorAddress: store.wallets[store.networkManageModal],
                    validatorSrcAddress: form.validator.operator_address,
                    validatorDstAddress: store.networks[store.networkManageModal].validator,
                    amount: {
                        denom: store.networks[store.networkManageModal].denom,
                        amount: `${form.amount * store.networks[store.networkManageModal].exponent}`
                    }
                }
            }

            // Prepare message
            const tx = await prepareTx(false)

            // Send transaction
            const result = await sendTx(tx.client, store.wallets[store.networkManageModal], [msgAny], tx.fee, tx.memo)

            if(result.code != 0){
                // Get error title
                store.manageError = i18n.global.t(`message.manage_modal_error_${result.code}`)

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal

                // Open error modal
                emitter.emit('close_manage_modal')
                emitter.emit('open_manage_error_modal')

                return false
            }

            // Show success modal
            showSuccessModal(result)
        } catch (error) {
            console.log(error)

            // Show error modal
            showErrorModal(error)
        }
    }


    // Rredelegate EVMOS
    function redelegateEVMOS() {
        try {
            // Create request
            fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
                .then(response => response.json())
                .then(async data => {
                    const chain = {
                        chainId: 9001,
                        cosmosChainId: store.networks.evmos.chainId,
                    },
                    sender = {
                        accountAddress: store.wallets.evmos,
                        sequence: data.account.base_account.sequence,
                        accountNumber: data.account.base_account.account_number,
                        pubkey: data.account.base_account.pub_key.key,
                    },
                    fee = {
                        amount: '0',
                        denom: store.networks.evmos.denom,
                        gas: store.networks.evmos.gas,
                    },
                    params = {
                        validatorSrcAddress: form.validator.operator_address,
                        validatorDstAddress: store.networks.evmos.validator,
                        amount: `${form.amount * store.networks.evmos.exponent}`,
                        denom: store.networks.evmos.denom,
                    }

                    const msg = createTxMsgBeginRedelegate(chain, sender, fee, 'bro.app', params)

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
                    const postOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: generatePostBodyBroadcast(rawTx),
                    }

                    let broadcastPost = await fetch(`https://lcd.evmos-9001-2.bronbro.io${generateEndpointBroadcast()}`, postOptions)

                    let response = await broadcastPost.json()

                    if(response.tx_response.code != 0){
                        // Get error title
                        store.manageError = i18n.global.t(`message.manage_modal_error_${response.tx_response.code}`)

                        // Disable loader
                        store.loaderManageModal = !store.loaderManageModal

                        // Open error modal
                        emitter.emit('close_manage_modal')
                        emitter.emit('open_manage_error_modal')

                        return false
                    }

                    // Disable loader
                    store.loaderManageModal = !store.loaderManageModal

                    // Set TXS
                    store.lastTXS = response.tx_response.txhash

                    // Open success modal
                    emitter.emit('close_manage_modal')
                    emitter.emit('open_manage_success_modal')

                    // Update network
                    setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Claim all DEFAILT
    async function claimAllDEFAULT() {
        // Enable loader
        store.loaderManageModal = !store.loaderManageModal

        try {
            const msgAny = [
                {
                    typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                    value: {
                        delegatorAddress: store.wallets[store.networkManageModal],
                        validatorAddress: store.networks[store.networkManageModal].validator
                    }
                }
            ]

            if(form.validators.length) {
                // If there is more than one validator
                form.validators.forEach(validator => {
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

            // Prepare message
            const tx = await prepareTx(false)

            // Send transaction
            const result = await sendTx(tx.client, store.wallets[store.networkManageModal], msgAny, tx.fee, tx.memo)

            if(result.code != 0){
                // Get error title
                store.manageError = i18n.global.t(`message.manage_modal_error_${result.code}`)

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal

                // Open error modal
                emitter.emit('close_manage_modal')
                emitter.emit('open_manage_error_modal')

                return false
            }

            // Update network
            setTimeout(() => {
                store.updateNetwork(store.networkManageModal)

                // Disable loader
                store.loaderManageModal = !store.loaderManageModal
            }, 5000)
        } catch (error) {
            console.log(error)

            // Show error modal
            showErrorModal(error)
        }
    }


    // Claim all EVMOS
    async function claimAllEVMOS() {
        // Enable loader
        store.loaderManageModal = !store.loaderManageModal

        try {
            // Create request
            await fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
                .then(response => response.json())
                .then(async data => {
                    const chain = {
                        chainId: 9001,
                        cosmosChainId: store.networks.evmos.chainId,
                    },
                    sender = {
                        accountAddress: store.wallets.evmos,
                        sequence: data.account.base_account.sequence,
                        accountNumber: data.account.base_account.account_number,
                        pubkey: data.account.base_account.pub_key.key,
                    },
                    fee = {
                        amount: '0',
                        denom: store.networks.evmos.denom,
                        gas: store.networks.evmos.gas,
                    },
                    params = {
                        validatorAddress: store.networks.evmos.validator,
                    }

                    const msg = createTxMsgWithdrawDelegatorReward(chain, sender, fee, 'bro.app', params)

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
                    const postOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: generatePostBodyBroadcast(rawTx),
                    }

                    let broadcastPost = await fetch(`https://lcd.evmos-9001-2.bronbro.io${generateEndpointBroadcast()}`, postOptions)

                    let response = await broadcastPost.json()

                    if(response.tx_response.code != 0){
                        // Get error title
                        store.manageError = i18n.global.t(`message.manage_modal_error_${response.tx_response.code}`)

                        // Disable loader
                        store.loaderManageModal = !store.loaderManageModal

                        // Open error modal
                        emitter.emit('close_manage_modal')
                        emitter.emit('open_manage_error_modal')

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
            showErrorModal(error)
        }
    }


    // Show error modal
    function showErrorModal(error) {
        // Get error code
        let errorCode = error.message.match(/code (\d+(\.\d)*)/i)

        // Get error title
        errorCode
            ? store.manageError = i18n.global.t(`message.manage_modal_error_${errorCode[1]}`)
            : store.manageError = i18n.global.t('message.manage_modal_error_rejected')

        // Disable loader
        store.loaderManageModal = !store.loaderManageModal

        // Open error modal
        emitter.emit('close_manage_modal')
        emitter.emit('open_manage_error_modal')
    }


    // Show success modal
    function showSuccessModal(result) {
        // Disable loader
        store.loaderManageModal = !store.loaderManageModal

        // Set TXS
        store.lastTXS = result.transactionHash

        // Open success modal
        emitter.emit('close_manage_modal')
        emitter.emit('open_manage_success_modal')

        // Update network
        setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
    }


    // Submit form
    function onSubmit() {
        // Stargate
        if(form.amount > 0) {
            // Enable loader
            store.loaderManageModal = !store.loaderManageModal

            // Delegate
            if(form.type == 'delegate') {
                store.networkManageModal == 'evmos'
                    ? delegateEVMOS()
                    : delegateDEFAULT()
            }

            // Redelegate
            if(form.type == 'redelegate') {
                store.networkManageModal == 'evmos'
                    ? redelegateEVMOS()
                    : redelegateDEFAULT()
            }
        }

        // Delegate
        if(form.type == 'claim') {
            store.networkManageModal == 'evmos'
                ? claimAllEVMOS()
                : claimAllDEFAULT()
        }
    }
</script>


<style scoped>
#manage_modal form
{
    display: flex;
    flex-direction: column;

    height: 690px;
}


#manage_modal .type
{
    display: flex;

    margin-bottom: 22px;
    margin-left: -8px;
    padding-right: 60px;

    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
}

#manage_modal .type > *
{
    margin-bottom: 8px;
    margin-left: 8px;
}


#manage_modal .type label
{
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;

    display: block;

    cursor: pointer;
}


#manage_modal .type input
{
    display: none;
}


#manage_modal .type label div
{
    padding: 13px;

    transition: .2s linear;

    border: 1px solid;
    border-radius: 14px;
    background: #191919;
}


#manage_modal .type label input:checked + div
{
    color: #000;

    background: #fff;
}


#manage_modal .validator
{
    display: flex;

    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
}


#manage_modal .validator .logo
{
    display: flex;

    width: 65px;
    height: 58px;

    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}

#manage_modal .validator .logo img
{
    display: block;

    width: 100%;
    height: 100%;
}

#manage_modal .validator .logo + *
{
    width: calc(100% - 73px);
}


#manage_modal .validator .name
{
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
}


#manage_modal .validator .commission
{
    color: #8e8e8e;
    font-size: 12px;
    line-height: 15px;

    margin-top: 4px;
}

#manage_modal .validator .commission .sep,
#manage_modal .validator .commission .val
{
    color: #fff;
    font-weight: 600;

    margin-left: 6px;
}

#manage_modal .validator .commission .val
{
    margin-left: 10px;
}


#manage_modal .notice
{
    margin-top: 20px;
    padding: 14px;

    text-align: center;

    border-radius: 17px;
    background: #191919;
}


#manage_modal .notice .title
{
    font-weight: 600;
    line-height: 19px;

    margin-bottom: 6px;
}


#manage_modal .notice .desc
{
    color: #8e8e8e;
    font-size: 12px;
    line-height: 130%;

    width: 324px;
    max-width: 100%;
    margin: 0 auto;
}


#manage_modal .tokens,
#manage_modal .restake_features
{
    margin-top: 26px;
}

#manage_modal .restake_features
{
    padding-bottom: 10px;

    border-bottom: 1px solid rgba(255, 255, 255, .05);
}


#manage_modal .tokens > *,
#manage_modal .restake_features > *
{
    display: flex;

    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
}

#manage_modal .tokens > * + *,
#manage_modal .restake_features > * + *
{
    margin-top: 10px;
    padding-top: 10px;

    border-top: 1px solid rgba(255, 255, 255, .05);
}


#manage_modal .tokens .label,
#manage_modal .restake_features .label
{
    color: #8e8e8e;
    font-size: 14px;
    line-height: 17px;
}


#manage_modal .tokens .val,
#manage_modal .restake_features .val
{
    font-weight: 600;
    line-height: 19px;

    white-space: nowrap;

    font-feature-settings: 'pnum' on, 'lnum' on;
}


#manage_modal .amount
{
    margin-top: 30px;
}


#manage_modal .amount .label
{
    color: #8e8e8e;
    font-size: 14px;
    line-height: 17px;

    margin-bottom: 16px;
}


#manage_modal .amount .field
{
    position: relative;
}


#manage_modal .amount .input
{
    color: currentColor;
    font-family: var(--font_family);
    font-size: var(--font_size);
    font-weight: 500;

    display: block;

    width: 100%;
    height: 55px;
    padding: 0 154px 2px 9px;

    transition: border-color .2s linear;

    border: 1px solid transparent;
    border-radius: 17px;
    background: #191919;

    font-feature-settings: 'pnum' on, 'lnum' on;
}

#manage_modal .amount .input:focus
{
    border-color: #950fff;
}


#manage_modal .amount .unit
{
    color: #8e8e8e;
    line-height: 19px;

    position: absolute;
    z-index: 3;
    top: 0;
    right: 80px;
    bottom: 0;

    height: 19px;
    margin: auto;

    white-space: nowrap;
    text-transform: uppercase;
}


#manage_modal .amount .max_btn
{
    line-height: 19px;

    position: absolute;
    z-index: 3;
    top: 0;
    right: 10px;
    bottom: 0;

    display: block;

    width: 60px;
    height: 39px;
    margin: auto;

    transition: .2s linear;
    text-transform: uppercase;

    border: 1px solid #fff;
    border-radius: 14px;
}

#manage_modal .amount .max_btn:hover
{
    color: #000;

    border-color: #fff;
    background: #fff;
}


#manage_modal .validate_from
{
    margin-top: 30px;
}


#manage_modal .validate_from .label
{
    color: #8e8e8e;
    font-size: 14px;
    line-height: 17px;

    margin-bottom: 16px;
}


#manage_modal .validate_from .field
{
    position: relative;
}


#manage_modal .validate_from .input
{
    color: currentColor;
    font-family: var(--font_family);
    font-size: var(--font_size);
    font-weight: 500;

    display: block;

    width: 100%;
    height: 55px;
    padding: 0 77px 3px 9px;

    transition: border-color .2s linear;

    border: 1px solid transparent;
    border-radius: 17px;
    background: #191919;
}

#manage_modal .validate_from .input:read-only
{
    pointer-events: none;
}

#manage_modal .validate_from .input:focus
{
    border-color: #950fff;
}


#manage_modal .validate_from .arr
{
    position: absolute;
    z-index: 3;
    top: 0;
    right: 19px;
    bottom: 0;

    display: flex;

    width: 24px;
    height: 24px;
    margin: auto;

    pointer-events: none;

    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}

#manage_modal .validate_from .clear_btn + .arr
{
    right: 44px;
}

#manage_modal .validate_from .arr svg
{
    display: block;

    width: 20px;
    height: 20px;
}

#manage_modal .validate_from .input:read-only ~ .arr
{
    display: none;
}


#manage_modal .validate_from .clear_btn
{
    position: absolute;
    z-index: 3;
    top: 0;
    right: 10px;
    bottom: 0;

    display: flex;

    width: 24px;
    height: 24px;
    margin: auto;

    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}

#manage_modal .validate_from .clear_btn svg
{
    display: block;

    width: 24px;
    height: 24px;
}

#manage_modal .validate_from .input:read-only ~ .clear_btn
{
    display: none;
}


#manage_modal .validate_from .dropdown
{
    position: absolute;
    z-index: 5;
    top: 100%;
    left: 0;

    display: none;

    width: 100%;
    margin-top: 10px;
    padding: 6px 4px;

    border-radius: 10px;
    background: #101010;
}

#manage_modal .validate_from .input.active ~ .dropdown
{
    display: block;
}


#manage_modal .validate_from .dropdown .scroll
{
    overflow: auto;

    max-height: 128px;
    padding-right: 4px;
}

#manage_modal .validate_from .dropdown .scroll::-webkit-scrollbar
{
    width: 4px;
    height: 4px;

    border-radius: 5px;
}

#manage_modal .validate_from .dropdown .scroll > * + *
{
    margin-top: 4px;
}


#manage_modal .validate_from .dropdown .btn
{
    font-size: 14px;
    line-height: 17px;

    display: block;

    width: 100%;
    padding: 6px;

    transition: background .2s linear;
    text-align: left;
    pointer-events: auto;

    border-radius: 8px;
}

#manage_modal .validate_from .dropdown .btn:hover,
#manage_modal .validate_from .dropdown .btn.active
{
    background: #191919;
}


#manage_modal .exp
{
    color: #555;
    font-size: 14px;
    line-height: 17px;

    margin-top: 10px;

    font-feature-settings: 'pnum' on, 'lnum' on;
}


#manage_modal .grant_info
{
    display: flex;

    margin-top: 10px;
    margin-bottom: -10px;
    margin-left: -10px;

    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    flex-wrap: wrap;
}

#manage_modal .grant_info > *
{
    width: calc(50% - 10px);
    margin-bottom: 10px;
    margin-left: 10px;
    padding: 10px;

    border-radius: 10px;
    background: #191919;
}


#manage_modal .grant_info .label
{
    color: #8e8e8e;
    font-size: 14px;
    line-height: 17px;
}


#manage_modal .grant_info .val
{
    color: #8e8e8e;
    font-weight: 600;
    line-height: 19px;

    margin-top: 6px;
}

#manage_modal .grant_info .val.red
{
    color: #eb5757;
}

#manage_modal .grant_info .val.green
{
    color: #1bc562;
}


#manage_modal .grant_info .expiration
{
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;

    margin-top: 2px;
}


#manage_modal .btns
{
    display: flex;

    margin-top: auto;

    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


#manage_modal .btns .btn
{
    color: #fff;
    font-weight: 500;
    line-height: 19px;

    display: block;

    width: 100%;
    padding: 13px;

    transition: background .2s linear;

    border: 1px solid #950fff;
    border-radius: 14px;
}

#manage_modal .btns .btn.w50
{
    width: calc(50% - 5px);
}


#manage_modal .btns .btn:hover
{
    background: #950fff;
}


#manage_modal .btns .btn.green
{
    border-color: #1bc562;
    background: #1bc562;
}

#manage_modal .btns .btn.red
{
    border-color: #eb5757;
    background: #eb5757;
}

#manage_modal .btns .btn.grey
{
    border-color: #282828;
    background: #282828;
}


























































</style>