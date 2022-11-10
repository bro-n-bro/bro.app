<template>
    <section class="modal" id="manage_modal">
        <transition name="fadeUp" mode="out-in" appear type="animation">
        <div class="modal_content">
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

                        <label v-show="form.validators.length" @click="clearValidator">
                            <input type="radio" value="redelegate" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_redelegate') }}</div>
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
                    </div>

                    <div class="validate_from">
                        <div class="label" v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_validator_label') }}
                        </div>

                        <div class="label" v-else>
                            {{ $t('message.manage_modal_validator_label2') }}
                        </div>

                        <div class="field" v-click-out="hideDropdown">
                            <input type="text" class="input"
                                :readonly="form.type == 'delegate'"
                                v-model="form.validator.name"
                                @focus.self="$event.target.classList.add('active')">

                            <div class="arr">
                                <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                            </div>

                            <button type="button" class="clear_btn" @click.prevent="clearValidator">
                                <svg><use xlink:href="/sprite.svg#ic_close"></use></svg>
                            </button>

                            <div class="dropdown">
                                <div class="scroll">
                                    <div v-for="validator in form.validators">
                                        <button type="button" class="btn" @click.stop.prevent="setValidator(validator)">
                                            {{ validator.description.moniker }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="amount">
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

                        <div class="fees">
                            {{ $t('message.manage_modal_fees', { value: 0.01, currency: store.networks[store.networkManageModal].token_name }) }}
                        </div>
                    </div>

                    <div class="btns">
                        <button type="button" class="btn close_btn" @click.prevent="emitter.emit('close_manage_modal')">
                            {{ $t('message.manage_modal_back_btn') }}
                        </button>

                        <button type="submit" class="btn submit_btn">
                            <template v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_delegate_btn') }}
                            </template>

                            <template v-if="form.type == 'redelegate'">
                            {{ $t('message.manage_modal_redelegate_btn') }}
                            </template>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </transition>


        <transition name="fade" mode="out-in" appear type="animation">
        <div class="overlay" @click.prevent="emitter.emit('close_manage_modal')"></div>
        </transition>
    </section>
</template>


<script setup>
    import { inject, reactive, onMounted } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { SigningStargateClient } from '@cosmjs/stargate'
    import { createTxRaw } from '@evmos/proto'
    import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@evmos/provider'
    import { createTxMsgDelegate, createTxMsgBeginRedelegate } from '@evmos/transactions'

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

                    if(result.length){
                        form.validators = result
                    }
                })
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
        setTimeout(() => document.querySelector('#manage_modal .validate_from .input').classList.remove('active'), 150)
    }


    // Set validator info
    function setValidator(validator) {
        form.validator.operator_address = validator.operator_address
        form.validator.name = validator.description.moniker
        form.validator.availabel_tokens = store.networks[store.networkManageModal].delegations[validator.operator_address]

        form.amount = form.validator.availabel_tokens - 0.01

        hideDropdown()
    }


    // Set Amount
    function setAmount(event) {
        if(form.validator.availabel_tokens) {
            if(event.target.value > form.validator.availabel_tokens){
                form.amount = form.validator.availabel_tokens - 0.01
            }
        } else {
            if(event.target.value > store.networks[store.networkManageModal].availabel_tokens){
                form.amount = store.networks[store.networkManageModal].availabel_tokens - 0.01
            }
        }
    }


    // Set MAX
    function setMAX() {
        form.validator.operator_address
            ? form.amount = form.validator.availabel_tokens - 0.01
            : form.amount = store.networks[store.networkManageModal].availabel_tokens - 0.01
    }


    // Submit form
    async function onSubmit() {
            // Stargate
            if(form.amount > 0) {
                // Enable loader
                store.loaderManageModal = !store.loaderManageModal

                // Delegate
                if(form.type == 'delegate') {
                    if(store.networkManageModal == 'evmos') {
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

                                    const msg = createTxMsgDelegate(chain, sender, fee, '', params)

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
                            // Get error title
                            store.manageError = i18n.global.t('message.manage_modal_error_rejected')

                            // Disable loader
                            store.loaderManageModal = !store.loaderManageModal

                            // Open error modal
                            emitter.emit('close_manage_modal')
                            emitter.emit('open_manage_error_modal')
                        }
                    } else {
                        try {
                            // Create request
                            const offlineSigner = window.getOfflineSigner(store.networks[store.networkManageModal].chainId),
                                rpcEndpoint = store.networks[store.networkManageModal].rpc_api,
                                client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner),
                                msgAny = {
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

                            let gasUsed = store.networkManageModal != 'emoney' ? '0' : store.networks.emoney.gas

                            if(store.networkManageModal != 'emoney'){
                                gasUsed = await client.simulate(store.wallets[store.networkManageModal], [msgAny])
                            }

                            const fee = {
                                amount: [{
                                    denom: store.networks[store.networkManageModal].denom,
                                    amount: '0'
                                }],
                                gas: Math.round(gasUsed * 1.3).toString()
                            }

                            const result = await client.signAndBroadcast(store.wallets[store.networkManageModal], [msgAny], fee)

                            // Disable loader
                            store.loaderManageModal = !store.loaderManageModal

                            // Set TXS
                            store.lastTXS = result.transactionHash

                            // Open success modal
                            emitter.emit('close_manage_modal')
                            emitter.emit('open_manage_success_modal')

                            // Update network
                            setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
                        } catch (error) {
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
                    }
                }


                // Redelegate
                if(form.type == 'redelegate') {
                    if(store.networkManageModal == 'evmos'){
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

                                    const msg = createTxMsgBeginRedelegate(chain, sender, fee, '', params)

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
                    } else {
                        try {
                            // Create request
                            const offlineSigner = window.getOfflineSigner(store.networks[store.networkManageModal].chainId),
                                rpcEndpoint = store.networks[store.networkManageModal].rpc_api,
                                client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner),
                                msgAny = {
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

                            let gasUsed = store.networkManageModal != 'emoney' ? '0' : store.networks.emoney.gas

                            if(store.networkManageModal != 'emoney'){
                                gasUsed = await client.simulate(store.wallets[store.networkManageModal], [msgAny])
                            }

                            const fee = {
                                amount: [{
                                    denom: store.networks[store.networkManageModal].denom,
                                    amount: '0'
                                }],
                                gas: Math.round(gasUsed * 1.3).toString()
                            }

                            const result = await client.signAndBroadcast(store.wallets[store.networkManageModal], [msgAny], fee)

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

                            // Disable loader
                            store.loaderManageModal = !store.loaderManageModal

                            // Set TXS
                            store.lastTXS = result.transactionHash

                            // Open success modal
                            emitter.emit('close_manage_modal')
                            emitter.emit('open_manage_success_modal')

                            // Update network
                            setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
                        } catch (error) {
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
                    }
                }
            }
    }
</script>


<style>
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


    #manage_modal .tokens
    {
        margin-top: 26px;
    }


    #manage_modal .tokens > *
    {
        display: flex;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #manage_modal .tokens > * + *
    {
        margin-top: 16px;
    }


    #manage_modal .tokens .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;
    }


    #manage_modal .tokens .val
    {
        font-weight: 600;

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

        border: 1px solid rgba(255, 255, 255, .05);
        border-radius: 17px;
        background: none;

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

        border: 1px solid rgba(255, 255, 255, .05);
        border-radius: 17px;
        background: none;
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
        right: 44px;
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


    #manage_modal .fees
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        margin-top: 10px;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    #manage_modal .btns
    {
        display: flex;

        margin-top: 30px;
        margin-bottom: -10px;
        margin-left: -10px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    #manage_modal .btns > *
    {
        margin-bottom: 10px;
        margin-left: 10px;
    }


    #manage_modal .btns .btn
    {
        color: #fff;
        font-weight: 500;
        line-height: 19px;

        display: block;

        padding: 13px;

        transition: .2s linear;

        border: 1px solid #353535;
        border-radius: 16px;
    }


    #manage_modal .btns .btn:hover
    {
        color: #000;

        border-color: #fff;
        background: #fff;
    }


    #manage_modal .btns .btn.submit_btn
    {
        color: #fff;

        border-color: #950fff;
        background: #950fff;
    }

</style>