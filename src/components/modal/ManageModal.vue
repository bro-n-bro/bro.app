<template>
    <section class="modal" id="manage_modal">
        <div class="modal_content" @click.self="emitter.emit('closeManageModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeManageModal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>


                <div class="type">
                    <button class="btn" :class="{ active: data.type == 'delegate' }" @click="data.type = 'delegate'">
                        {{ $t('message.manage_modal_action_delegate') }}
                    </button>

                    <button class="btn" :class="{ active: data.type == 'redelegate' }" v-if="data.validators.length" @click="data.type = 'redelegate'">
                        {{ $t('message.manage_modal_action_redelegate') }}
                    </button>

                    <button class="btn" :class="{ active: data.type == 'claim' }" v-if="store.networks[store.networkManageModal].rewards_tokens > 0.0049 && store.networks[store.networkManageModal].status" @click="data.type = 'claim'">
                        {{ $t('message.manage_modal_action_claim') }}
                    </button>

                    <button class="btn" :class="{ active: data.type == 'restake' }" v-if="store.networks[store.networkManageModal].restake && store.networks[store.networkManageModal].status" @click="data.type = 'restake'">
                        {{ $t('message.manage_modal_action_restake') }}
                    </button>
                </div>


                <!-- Delegate -->
                <ManageModalDelegate v-if="data.type == 'delegate'" />

                <!-- Redelegate -->
                <ManageModalRedelegate v-if="data.type == 'redelegate'" :validators="data.validators" />

                <!-- Claim -->
                <ManageModalClaim v-if="data.type == 'claim'" :validators="data.validators" />

                <!-- Restake -->
                <ManageModalRestake v-if="data.type == 'restake'" />
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { inject, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import ManageModalDelegate from './ManageModalDelegate.vue'
    import ManageModalRedelegate from './ManageModalRedelegate.vue'
    import ManageModalClaim from './ManageModalClaim.vue'
    import ManageModalRestake from './ManageModalRestake.vue'

    const emitter = inject('emitter'),
        store = useGlobalStore(),
        data = reactive({
            type: 'delegate',
            validators: []
        })


    // Get validators for redelegate
    if(store.showManageModal){
        await fetch(`${store.networks[store.networkManageModal].lcd_api}/cosmos/staking/v1beta1/delegators/${store.wallets[store.networkManageModal]}/validators`)
            .then(res => res.json())
            .then(response => {
                let result = response.validators.filter(el => {
                    if(el.operator_address != store.networks[store.networkManageModal].validator) {
                        return el
                    }
                })

                if(result.length) {
                    data.validators = result
                }
            })
    }
</script>


<style>
    #manage_modal .data
    {
        display: flex;
        flex-direction: column;

        height: 729px;
    }


    #manage_modal .form
    {
        display: flex;
        flex-direction: column;

        flex: 1 0 auto;
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


    #manage_modal .type .btn
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: block;

        padding: 13px;

        transition: .2s linear;

        border: 2px solid;
        border-radius: 14px;
        background: #191919;
    }

    #manage_modal .type .btn:hover,
    #manage_modal .type .btn.active
    {
        color: #000;

        border-color: #fff;
        background: #fff;
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
        margin-top: 10px;
        padding-top: 10px;

        border-top: 1px solid rgba(255, 255, 255, .05);
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
        line-height: 19px;

        white-space: nowrap;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    #manage_modal .fields
    {
        display: flex;
        flex-direction: column;

        margin-top: 30px;

        flex: 1 0 auto;
    }


    #manage_modal .fields .line
    {
        margin-bottom: 30px;
    }


    #manage_modal .fields .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;

        margin-bottom: 16px;
    }


    #manage_modal .fields .field
    {
        position: relative;
    }


    #manage_modal .fields .input
    {
        color: currentColor;
        font-family: var(--font_family);
        font-size: var(--font_size);
        font-weight: 500;

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 9px 2px;

        transition: border-color .2s linear;

        border: 1px solid transparent;
        border-radius: 17px;
        background: #191919;
    }

    #manage_modal .fields .validator .input
    {
        padding-right: 77px;
    }

    #manage_modal .fields .amount .input
    {
        padding-right: 154px;
    }

    #manage_modal .fields .input:read-only
    {
        pointer-events: none;
    }

    #manage_modal .fields .input:focus
    {
        border-color: #950fff;
    }


    #manage_modal .fields .unit
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


    #manage_modal .fields .max_btn
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

        border: 2px solid;
        border-radius: 14px;
    }

    #manage_modal .fields .max_btn:hover
    {
        color: #000;

        border-color: #fff;
        background: #fff;
    }

    #manage_modal .fields .max_btn:disabled
    {
        pointer-events: none;

        opacity: .5;
    }


    #manage_modal .fields .arr
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

    #manage_modal .fields .clear_btn + .arr
    {
        right: 44px;
    }

    #manage_modal .fields .arr svg
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    #manage_modal .fields .clear_btn
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

    #manage_modal .fields .clear_btn svg
    {
        display: block;

        width: 24px;
        height: 24px;
    }


    #manage_modal .fields .dropdown
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

    #manage_modal .fields .input.active ~ .dropdown
    {
        display: block;
    }


    #manage_modal .fields .dropdown .scroll
    {
        overflow: auto;

        max-height: 128px;
        padding-right: 4px;
    }

    #manage_modal .fields .dropdown .scroll::-webkit-scrollbar
    {
        width: 4px;
        height: 4px;

        border-radius: 5px;
    }

    #manage_modal .fields .dropdown .scroll > * + *
    {
        margin-top: 4px;
    }


    #manage_modal .fields .dropdown .btn
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

    #manage_modal .fields .dropdown .btn:hover,
    #manage_modal .fields .dropdown .btn.active
    {
        background: #191919;
    }


    #manage_modal .fields .exp
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

        transition: .2s linear;

        border: 1px solid #950fff;
        border-radius: 14px;
    }

    #manage_modal .btns .btn:disabled
    {
        cursor: default;
        pointer-events: none;
    }

    #manage_modal .btns .btn.w50
    {
        width: calc(50% - 5px);
    }


    #manage_modal .btns .btn:hover
    {
        background: #950fff;
    }

    #manage_modal .btns .btn:active
    {
        border-color: #7700e1;
        background: #7700e1;
    }


    #manage_modal .btns .btn.green
    {
        border-color: #1bc562;
        background: #1bc562;
    }

    #manage_modal .btns .btn.green:hover
    {
        border-color: #11bb58;
        background: #11bb58;
    }

    #manage_modal .btns .btn.green:active
    {
        border-color: #00a744;
        background: #00a744;
    }


    #manage_modal .btns .btn.red
    {
        border-color: #eb5757;
        background: #eb5757;
    }

    #manage_modal .btns .btn.red:hover
    {
        border-color: #e14d4d;
        background: #e14d4d;
    }

    #manage_modal .btns .btn.red:active
    {
        border-color: #d74343;
        background: #d74343;
    }


    #manage_modal .btns .btn.grey
    {
        border-color: #282828;
        background: #282828;
    }

    #manage_modal .btns .btn.grey:hover
    {
        border-color: #950fff;
        background: #950fff;
    }

    #manage_modal .btns .btn.grey:active
    {
        border-color: #7700e1;
        background: #7700e1;
    }


    #manage_modal .btns .btn.fiolet
    {
        border-color: #950fff;
        background: #950fff;
    }

    #manage_modal .btns .btn.fiolet:hover
    {
        border-color: #7700e1;
        background: #7700e1;
    }



    #manage_modal .authz_exp
    {
        color: #8e8e8e;
        font-size: 12px;
        line-height: 130%;

        margin-top: auto;
        padding: 14px;

        text-align: center;

        border-radius: 17px;
        background: #191919;
    }
</style>