<template>
    <form class="form" @submit.prevent="onSubmit">
        <ManageModalValidator />


        <div class="notice" v-if="!manageGrant">
            <div class="title">
                {{ $t('message.manage_modal_restake_notice_title') }}
            </div>

            <div class="desc" v-html="$t('message.manage_modal_restake_notice_desc')"></div>
        </div>


        <div class="restake_features" v-if="!manageGrant">
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


        <div class="grant_info" v-if="!manageGrant">
            <div>
                <div class="label">{{ $t('message.manage_modal_grant_label_status') }}</div>

                <div class="val red" v-if="!Object.keys(restake.grant).length">{{ $t('message.manage_modal_grant_status_inactive') }}</div>

                <div class="val green" v-else>
                    <div>{{ $t('message.manage_modal_grant_status_active') }}</div>

                    <div class="expiration">
                        {{ $t('message.manage_modal_grant_expiry', { date: $filters.timeAgo(restake.grant.expiration) }) }}
                    </div>
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


        <div class="grant_manage" v-else>
            <div class="text">
                <p v-html="$t('message.manage_modal_grant_text1')"></p>
                <p v-html="$t('message.manage_modal_grant_text2')"></p>
                <p v-html="$t('message.manage_modal_grant_text3', { date: getDate(restake.grant.expiration) })"></p>
                <p v-html="$t('message.manage_modal_grant_text4')"></p>
            </div>

            <div class="max_amount">
                <div class="label">
                    {{ $t('message.manage_modal_grant_label_amount') }}
                </div>

                <div class="field">
                    <input type="number" class="input" v-model="restake.amount" :placeholder="$t('message.manage_modal_grant_amount_placeholder')">

                    <div class="unit">
                        <img :src="`/${store.networkManageModal}_logo.png`" alt="">
                        <span>{{ store.networks[store.networkManageModal].token_name }}</span>
                    </div>
                </div>

                <div class="exp">
                    {{ $t('message.manage_modal_grant_amount_exp') }}
                </div>
            </div>

            <div class="expiry_date">
                <div class="label">
                    {{ $t('message.manage_modal_grant_label_expiry') }}
                </div>

                <div class="field">
                    <Datepicker class="input" v-model="restake.expiry" :lowerLimit="new Date()" />

                    <svg class="icon"><use xlink:href="/sprite.svg#ic_calendar"></use></svg>
                </div>

                <div class="exp">
                    {{ $t('message.manage_modal_grant_expiry_exp') }}
                </div>
            </div>
        </div>


        <div class="btns" v-if="!store.isLedger">
            <button type="button" class="btn green" v-if="!Object.keys(restake.grant).length && !manageGrant" @click.prevent="manageGrant = true">
                {{ $t('message.manage_modal_enable_restake_btn') }}
            </button>

            <button type="button" class="btn green" v-if="!Object.keys(restake.grant).length && manageGrant" @click.prevent="setGrant">
                {{ $t('message.manage_modal_enable_restake_btn') }}
            </button>

            <button type="button" class="btn red w50" v-if="Object.keys(restake.grant).length" @click.prevent="removeGrant">
                {{ $t('message.manage_modal_disable_restake_btn') }}
            </button>

            <button type="button" class="btn grey w50" v-if="Object.keys(restake.grant).length && !manageGrant" @click.prevent="manageGrant = true">
                {{ $t('message.manage_modal_manage_grant_btn') }}
            </button>

            <button type="button" class="btn fiolet w50" v-if="Object.keys(restake.grant).length && manageGrant" @click.prevent="setGrant">
                {{ $t('message.update_btn') }}
            </button>
        </div>

        <div class="authz_exp" v-else>
            {{ $t('message.manage_modal_restake_authz_exp') }}
        </div>
    </form>
</template>


<script setup>
    import { inject, ref, reactive, onMounted } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { prepareTx, sendTx, prepareEVMOSTx, sendEVMOSTx } from '@/utils'

    import { StakeAuthorization } from 'cosmjs-types/cosmos/staking/v1beta1/authz'
    import { Timestamp } from "cosmjs-types/google/protobuf/timestamp"

    import moment from 'moment'
    import Datepicker from 'vue3-datepicker'

    // Components
    import ManageModalValidator from './ManageModalValidator.vue'

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification(),
        restake = reactive({
            grant: {},

            delegations: store.networks[store.networkManageModal].restake ? store.networks[store.networkManageModal].delegations.find(el => el.operator_address == store.networks[store.networkManageModal].validator).amount : 0,

            rewards: store.networks[store.networkManageModal].restake ? store.networks[store.networkManageModal].rewards.find(el => el.operator_address == store.networks[store.networkManageModal].validator).amount : 0,

            amount: 0 || i18n.global.t('message.manage_modal_grant_amount_placeholder'),
            expiry: new Date(moment().add(1, 'year').format('YYYY-MM-DD'))
        }),
        manageGrant = ref(false)


    onMounted(async () => {
        // Get grant info
        if(store.networks[store.networkManageModal].restake) {
            await getGrantInfo()
        }
    })


    // Get grant info
    async function getGrantInfo() {
        try {
            await fetch(`${store.networks[store.networkManageModal].lcd_api}/cosmos/authz/v1beta1/grants?granter=${store.wallets[store.networkManageModal]}&grantee=${store.networks[store.networkManageModal].restake.address}`)
                .then(response => response.json())
                .then(data => {
                    if(data.grants.length) {
                        let grant = data.grants.find(el => el.authorization['@type'] == '/cosmos.staking.v1beta1.StakeAuthorization')

                        restake.grant = grant
                        restake.amount = grant.authorization.max_tokens ? grant.authorization.max_tokens.amount / store.networks[store.networkManageModal].exponent : ''
                        restake.expiry = new Date(getDate(grant.expiration))
                    }

                    manageGrant.value = false
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Set grant
    function setGrant() {
        // Other processing for EVMOS
        store.networkManageModal == 'evmos'
            ? createGrantEVMOS()
            : createGrantDEFAULT()
    }


    // Remove grant
    function removeGrant() {
        // Other processing for EVMOS
        store.networkManageModal == 'evmos'
            ? removeGrantEVMOS()
            : removeGrantDEFAULT()
    }


    // Create grant DEFAULT
    async function createGrantDEFAULT() {
        try {
            // Authorizationgranf data
            let authorization = {}

            if(parseFloat(restake.amount) > 0) {
                authorization = {
                    typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
                    value: StakeAuthorization.encode(StakeAuthorization.fromPartial({
                        allowList: { address: [store.networks[store.networkManageModal].validator] },
                        maxTokens: {
                            denom: store.networks[store.networkManageModal].denom,
                            amount: `${parseFloat(restake.amount).toFixed(store.networks[store.networkManageModal].exponent.toString().length - 1) * store.networks[store.networkManageModal].exponent}`
                        },
                        authorizationType: 1
                    })).finish()
                }
            } else {
                authorization = {
                    typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
                    value: StakeAuthorization.encode(StakeAuthorization.fromPartial({
                        allowList: { address: [store.networks[store.networkManageModal].validator] },
                        authorizationType: 1
                    })).finish()
                }
            }

            // Message
            let msgAny = {
                typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
                value: {
                    granter: store.wallets[store.networkManageModal],
                    grantee: store.networks[store.networkManageModal].restake.address,
                    grant: {
                        authorization,
                        expiration: Timestamp.fromPartial({
                            seconds: moment(restake.expiry).unix(),
                            nanos: 0
                        })
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
                    tx_type: i18n.global.t('message.manage_modal_action_restake')
                }
            })

            // Send Tx
            let result = await sendTx(prepareResult)

            if(result.code == 0){
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
                        tx_type: i18n.global.t('message.manage_modal_action_restake')
                    }
                })

                // Update grant info
                await getGrantInfo()
            }
        } catch (error) {
            console.log(error)

            // Show error modal
            showError(error)
        }
    }


    // Create grant EVMOS
    async function createGrantEVMOS() {
        // Create request
        await fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
            .then(res => res.json())
            .then(async response => {
                try {
                    // Params
                    let params = {
                        bot_address: store.networks[store.networkManageModal].restake.address,
                        validator_address: store.networks[store.networkManageModal].restake.address,
                        denom: store.networks.evmos.denom,
                        maxTokens: restake.amount > 0 ? `${parseFloat(restake.amount).toFixed(store.networks[store.networkManageModal].exponent.toString().length - 1) * store.networks[store.networkManageModal].exponent}` : 0,
                        duration_in_seconds: moment(restake.expiry).unix()
                    }

                    // Prepare EVMOS Tx
                    let prepareResult = await prepareEVMOSTx(params, response.account.base_account, 'restake_enable')

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
                            tx_type: i18n.global.t('message.manage_modal_action_delegate'),
                            tx_hash: store.lastTXS
                        }
                    })

                    // Update grant info
                    let interval = setInterval(async () => {
                        !Object.keys(restake.grant).length
                            ? await getGrantInfo()
                            : clearInterval(interval)
                    }, 500)
                } catch (error) {
                    console.log(error)

                    // Get error title
                    store.manageError = i18n.global.t('message.manage_modal_error_rejected')

                    // Show notification
                    notification.notify({
                        group: store.networks[store.networkManageModal].denom,
                        clean: true
                    })

                    notification.notify({
                        id: Date.now(),
                        group: store.networks[store.networkManageModal].denom,
                        title: i18n.global.t('message.notification_failed_title'),
                        text: store.manageError,
                        type: 'error',
                        data: {
                            chain: store.networkManageModal,
                            tx_type: i18n.global.t('message.manage_modal_action_restake')
                        }
                    })
                }
            })
    }


    // Remove grant DEFAULT
    async function removeGrantDEFAULT() {
        try {
            // Message
            let msgAny = {
                typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
                value: {
                    granter: store.wallets[store.networkManageModal],
                    grantee: store.networks[store.networkManageModal].restake.address,
                    msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate'
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
                    tx_type: i18n.global.t('message.manage_modal_action_restake')
                }
            })

            // Send Tx
            let result = await sendTx(prepareResult)

            if(result.code == 0){
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
                        tx_type: i18n.global.t('message.manage_modal_action_restake')
                    }
                })

                // Update grant info
                restake.grant = {}
                restake.amount = 0 || i18n.global.t('message.manage_modal_grant_amount_placeholder')
                restake.expiry = new Date(moment().add(1, 'year').format('YYYY-MM-DD'))
            } else {
                // Show error modal
                console.log(result)
                showError(result)
            }
        } catch (error) {
            console.log(error)

            // Get error title
            store.manageError = i18n.global.t('message.manage_modal_error_rejected')

            // Show notification
            notification.notify({
                group: store.networks[store.networkManageModal].denom,
                clean: true
            })

            notification.notify({
                id: Date.now(),
                group: store.networks[store.networkManageModal].denom,
                title: i18n.global.t('message.notification_failed_title'),
                text: store.manageError,
                type: 'error',
                data: {
                    chain: store.networkManageModal,
                    tx_type: i18n.global.t('message.manage_modal_action_delegate')
                }
            })
        }
    }


    // Remove grant EVMOS
    async function removeGrantEVMOS() {
        // Create request
        await fetch(`${store.networks.evmos.lcd_api}/cosmos/auth/v1beta1/accounts/${store.wallets.evmos}`)
            .then(res => res.json())
            .then(async response => {
                try {
                    // Params
                    let params = {
                        bot_address: store.networks[store.networkManageModal].restake.address,
                        validator_address: store.networks[store.networkManageModal].restake.address
                    }

                    // Prepare EVMOS Tx
                    let prepareResult = await prepareEVMOSTx(params, response.account.base_account, 'restake_disable')

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
                            tx_type: i18n.global.t('message.manage_modal_action_delegate'),
                            tx_hash: store.networkManageModal != 'bostrom' ? store.lastTXS : ''
                        }
                    })

                    // Update grant info
                    restake.grant = {}
                    restake.amount = 0 || i18n.global.t('message.manage_modal_grant_amount_placeholder')
                    restake.expiry = new Date(moment().add(1, 'year').format('YYYY-MM-DD'))
                } catch (error) {
                    console.log(error)

                    // Get error title
                    store.manageError = i18n.global.t('message.manage_modal_error_rejected')

                    // Show notification
                    notification.notify({
                        group: store.networks[store.networkManageModal].denom,
                        clean: true
                    })

                    notification.notify({
                        id: Date.now(),
                        group: store.networks[store.networkManageModal].denom,
                        title: i18n.global.t('message.notification_failed_title'),
                        text: store.manageError,
                        type: 'error',
                        data: {
                            chain: store.networkManageModal,
                            tx_type: i18n.global.t('message.manage_modal_action_restake')
                        }
                    })
                }
            })
    }


    // Get formatted date
    function getDate(date) {
        return moment(date).format('YYYY-MM-DD')
    }


    // Show error modal
    function showError(error) {
        // Get error title
        error.code
            ? store.manageError = i18n.global.t(`message.manage_modal_error_${error.code}`)
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
                tx_type: i18n.global.t('message.manage_modal_action_restake')
            }
        })
    }
</script>


<style>
    .restake_features
    {
        margin-top: 26px;
        padding-bottom: 10px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }

    .restake_features > *
    {
        display: flex;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .restake_features > * + *
    {
        margin-top: 10px;
        padding-top: 10px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .restake_features .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;
    }


    .restake_features .val
    {
        font-weight: 600;
        line-height: 19px;

        white-space: nowrap;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }



    .grant_info
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

    .grant_info > *
    {
        width: calc(50% - 10px);
        margin-bottom: 10px;
        margin-left: 10px;
        padding: 10px;

        border-radius: 10px;
        background: #191919;
    }


    .grant_info .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;
    }


    .grant_info .val
    {
        color: #8e8e8e;
        font-weight: 600;
        line-height: 19px;

        margin-top: 6px;
    }

    .grant_info .val.red
    {
        color: #eb5757;
    }

    .grant_info .val.green
    {
        color: #1bc562;
    }


    .grant_info .expiration
    {
        color: #8e8e8e;
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;

        margin-top: 2px;
    }



    .grant_manage .text
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 130%;

        margin-top: 20px;
        padding: 10px;

        border-radius: 10px;
        background: #191919;
    }

    .grant_manage .text > * + *
    {
        margin-top: 10px;
    }

    .grant_manage .text b
    {
        color: #fff;
    }


    .grant_manage .max_amount,
    .grant_manage .expiry_date
    {
        margin-top: 20px;
    }


    .grant_manage .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;

        margin-bottom: 10px;
    }


    .grant_manage ::-webkit-input-placeholder
    {
        color: #aaa;
    }

    .grant_manage :-moz-placeholder
    {
        color: #aaa;
    }

    .grant_manage ::-moz-placeholder
    {
        color: #aaa;

        opacity: 1;
    }

    .grant_manage :-ms-input-placeholder
    {
        color: #aaa;
    }


    .grant_manage .field
    {
        position: relative;
    }


    .grant_manage .input
    {
        color: #aaa;
        font-family: var(--font-family);
        font-size: 16px;
        font-weight: 500;

        display: block;

        width: 100%;
        height: 55px;
        padding-right: 111px;
        padding-left: 9px;

        border: 1px solid transparent;
        border-radius: 15px;
        background: #191919;
    }


    .grant_manage .unit
    {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;

        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;

        display: flex;

        height: 55px;

        white-space: nowrap;
        pointer-events: none;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .grant_manage .unit img
    {
        display: block;

        width: 30px;
        height: 30px;
        margin-right: 6px;

        border-radius: 50%;
    }


    .grant_manage .icon
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;
        bottom: 0;

        display: block;

        width: 24px;
        height: 24px;
        margin: auto;

        pointer-events: none;
    }


    .grant_manage .exp
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        margin-top: 10px;
    }

</style>
