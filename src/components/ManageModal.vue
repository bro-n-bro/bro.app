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
                        <label @click="form.validator.name = $t('message.manage_modal_validator_name')">
                            <input type="radio" value="delegate" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_delegate') }}</div>
                        </label>

                        <label v-show="form.validators.length" @click="form.validator.name = ''">
                            <input type="radio" value="redelegate" v-model="form.type">
                            <div>{{ $t('message.manage_modal_action_redelegate') }}</div>
                        </label>
                    </div>

                    <div class="validator">
                        <div class="logo">
                            <img src="../assets/images/logo_mini_black.svg" alt="">
                        </div>

                        <div>
                            <div class="name">{{ $t('message.manage_modal_validator_name') }}</div>

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
                            <div class="label">{{ $t('message.manage_modal_my_delegation') }}</div>
                            <div class="val">{{ store.networks[store.networkManageModal].delegations_tokens }} {{ store.networks[store.networkManageModal].token_name }}</div>
                        </div>

                        <div>
                            <div class="label">{{ $t('message.manage_modal_available_balance') }}</div>
                            <div class="val">{{ store.networks[store.networkManageModal].availabel_tokens }} {{ store.networks[store.networkManageModal].token_name }}</div>
                        </div>
                    </div>

                    <div class="amount">
                        <div class="label">{{ $t('message.manage_modal_amount') }}</div>

                        <div class="field">
                            <input type="text" class="input" v-model="form.amount">

                            <div class="unit">{{ store.networks[store.networkManageModal].token_name }}</div>

                            <button type="button" class="max_btn" @click.prevent="form.amount = store.networks[store.networkManageModal].availabel_tokens">
                                {{ $t('message.manage_modal_max_btn') }}
                            </button>
                        </div>
                    </div>

                    <div class="validate_from">
                        <div class="label" v-if="form.type == 'delegate'">
                            {{ $t('message.manage_modal_validator_label') }}
                        </div>

                        <div class="label" v-else>
                            {{ $t('message.manage_modal_validator_label2') }}
                        </div>

                        <div class="field">
                            <input type="text" class="input" :readonly="form.type == 'delegate'" v-model="form.validator.name" @focus.self="$event.target.classList.add('active')">

                            <div class="arr">
                                <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                            </div>

                            <button type="button" class="clear_btn" @click.prevent="clearValidator">
                                <svg><use xlink:href="/sprite.svg#ic_close"></use></svg>
                            </button>

                            <div class="dropdown">
                                <div class="scroll">
                                    <div v-for="validator in form.validators">
                                        <button type="button" class="btn" @click.prevent="setValidator(validator)">
                                            {{ validator.description.moniker }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="fees">
                            {{ $t('message.manage_modal_fees', { value: 0.0001, currency: store.networks[store.networkManageModal].token_name }) }}
                        </div> -->
                    </div>

                    <div class="btns">
                        <button type="button" class="btn close_btn" @click.prevent="emitter.emit('close_manage_modal')">
                            {{ $t('message.manage_modal_back_btn') }}
                        </button>

                        <button type="submit" class="btn submit_btn">
                            {{ $t('message.manage_modal_delegate_btn') }}
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

    const emitter = inject('emitter'),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        commision = 5,
        form = reactive({
            type: 'delegate',
            amount: 0,
            validators: [],
            validator: {
                operator_address: '',
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
    }


    // Set validator info
    function setValidator(validator) {
        form.validator.operator_address = validator.operator_address
        form.validator.name = validator.description.moniker

        document.querySelector('#manage_modal .validate_from .input').classList.remove('active')
    }


    // Submit form
    async function onSubmit() {
            // Stargate
            if(form.amount > 0) {
                store.loaderManageModal = !store.loaderManageModal

                try {
                    const offlineSigner = window.getOfflineSigner(store.networks[store.networkManageModal].chainId),
                        rpcEndpoint = store.networks[store.networkManageModal].rpc_api,
                        client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner),
                        msg = {
                            delegatorAddress: store.wallets[store.networkManageModal],
                            validatorAddress: store.networks[store.networkManageModal].validator,
                            amount: {
                                denom: store.networks[store.networkManageModal].denom,
                                amount: `${form.amount * store.networks[store.networkManageModal].exponent}`
                            }
                        },
                        msgAny = {
                            typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
                            value: msg
                        },
                        fee = {
                            amount: [{
                                denom: store.networks[store.networkManageModal].denom,
                                amount: '0'
                            }],
                            gas: '190000'
                        },
                        memo = '',
                        result = await client.signAndBroadcast(
                            store.wallets[store.networkManageModal],
                            [msgAny],
                            fee,
                            memo
                        )

                    store.loaderManageModal = !store.loaderManageModal
                    store.lastTXS = result.transactionHash

                    emitter.emit('close_manage_modal')
                    emitter.emit('open_manage_success_modal')

                    setTimeout(() => store.updateNetwork(store.networkManageModal), 4000)
                } catch (error) {
                    let errorCode = error.message.match(/code (\d+(\.\d)*)/i)

                    errorCode
                        ? store.manageError = i18n.global.t(`message.manage_modal_error_${errorCode[1]}`)
                        : store.manageError = i18n.global.t('message.manage_modal_error_rejected')

                    store.loaderManageModal = !store.loaderManageModal

                    emitter.emit('close_manage_modal')
                    emitter.emit('open_manage_error_modal')
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
        color: rgba(255, 255, 255, .5);
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
        padding: 14px;

        transition: .2s linear;

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

        width: 51px;
        height: 45px;

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
        width: calc(100% - 59px);
    }


    #manage_modal .validator .name
    {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
    }


    #manage_modal .validator .commission
    {
        color: #f2f2f2;
        font-size: 14px;
        line-height: 17px;

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
        padding: 13px;

        border: 1px solid rgba(255, 255, 255, .1);
        border-radius: 20px;
    }


    #manage_modal .notice .title
    {
        font-weight: 600;
        line-height: 19px;

        margin-bottom: 14px;
    }


    #manage_modal .notice .desc
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 130%;
    }


    #manage_modal .tokens
    {
        margin-top: 26px;
    }


    #manage_modal .tokens > *
    {
        color: #fff;
        line-height: 19px;

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
        line-height: 19px;

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
        line-height: 19px;

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 154px 0 9px;

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
        line-height: 19px;

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
        line-height: 19px;

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 77px 0 9px;

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

        width: 15px;
        height: 16px;
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

        width: 20px;
        height: 20px;
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


    #manage_modal .validate_from .fees
    {
        color: #f2f2f2;
        font-size: 14px;
        line-height: 17px;

        margin-top: 14px;

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