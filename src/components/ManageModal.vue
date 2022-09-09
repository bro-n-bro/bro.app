<template>
    <section class="modal" id="manage_modal">
        <div class="modal_content">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('close_manage_modal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <form class="form" @submit.prevent="onSubmit">
                    <div class="type">
                        <label>
                            <input type="radio" name="type" value="delegate" checked>
                            <div>{{ $t('message.manage_modal_action_delegate') }}</div>
                        </label>

                        <label>
                            <input type="radio" name="type" value="redelegate">
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
                        <div class="title">{{ $t('message.manage_modal_notice_title') }}</div>

                        <div class="desc">{{ $t('message.manage_modal_notice_desc') }}</div>
                    </div>

                    <div class="tokens">
                        <div>
                            <div class="label">{{ $t('message.manage_modal_my_delegation') }}</div>
                            <div class="val">3.37K EVMOS</div>
                        </div>

                        <div>
                            <div class="label">{{ $t('message.manage_modal_available_balance') }}</div>
                            <div class="val">0.64 EVMOS</div>
                        </div>
                    </div>

                    <div class="amount">
                        <div class="label">{{ $t('message.manage_modal_amount') }}</div>

                        <div class="field">
                            <input type="number" name="amount" value="" class="input">

                            <div class="unit">EVMOS</div>

                            <button type="button" class="max_btn">{{ $t('message.manage_modal_max_btn') }}</button>
                        </div>
                    </div>

                    <div class="validate_from">
                        <div class="label">{{ $t('message.manage_modal_validator_label') }}</div>

                        <div class="field">
                            <input type="text" name="validator" value="Bro_n_Bro" class="input" readonly>

                            <div class="arr">
                                <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                            </div>

                            <button type="button" class="clear_btn">
                                <svg><use xlink:href="/sprite.svg#ic_close"></use></svg>
                            </button>

                            <div class="dropdown">
                                <div class="scroll">
                                    <div><button type="button" class="btn active">Bro_n_bro</button></div>
                                    <div><button type="button" class="btn">stake.fish</button></div>
                                    <div><button type="button" class="btn">Binance Staking</button></div>
                                    <div><button type="button" class="btn">DokiaCapital</button></div>
                                    <div><button type="button" class="btn">stake.fish</button></div>
                                    <div><button type="button" class="btn">Binance Staking</button></div>
                                    <div><button type="button" class="btn">DokiaCapital</button></div>
                                    <div><button type="button" class="btn">stake.fish</button></div>
                                    <div><button type="button" class="btn">Binance Staking</button></div>
                                    <div><button type="button" class="btn">DokiaCapital</button></div>
                                    <div><button type="button" class="btn">stake.fish</button></div>
                                    <div><button type="button" class="btn">Binance Staking</button></div>
                                    <div><button type="button" class="btn">DokiaCapital</button></div>
                                </div>
                            </div>
                        </div>

                        <div class="fees">
                            {{ $t('message.manage_modal_fees', { value: 0.0001, currency: 'EVMOS' }) }}
                        </div>
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

        <div class="overlay" @click.prevent="emitter.emit('close_manage_modal')"></div>
    </section>
</template>


<script setup>
    const commision = 5

    function onSubmit() {
        
    }
</script>


<style>
    #manage_modal .type
    {
        display: flex;

        margin-bottom: 22px;
        margin-left: -8px;
        padding-right: 60px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    #manage_modal .type > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    #manage_modal .type label
    {
        color: #464646;
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

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    #manage_modal .validator .logo
    {
        display: flex;

        width: 51px;
        height: 45px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    #manage_modal .validate_from .clear_btn svg
    {
        display: block;

        width: 12px;
        height: 12px;
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

        justify-content: flex-end;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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