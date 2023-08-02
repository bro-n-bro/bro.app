<template>
    <section class="modal" id="validator_modal">
        <div class="modal_content" @click.self="emitter.emit('closeValidatorModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeValidatorModal')">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                </button>

                <div class="modal_title">
                    {{ $t('message.validator_modal_title') }}
                </div>


                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>


                <template v-else>
                <div class="row">
                    <div class="logo">
                        <div class="power">
                            {{ store.validatorInfo.voting_power_rank }}
                            <svg><use xlink:href="@/assets/sprite.svg#bg_rank"></use></svg>
                        </div>

                        <img :src="store.validatorInfo.mintscan_avatar_url" alt="" @error="imageLoadError">
                        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_user"></use></svg>
                    </div>

                    <div class="info">
                        <div class="name">{{ store.validatorInfo.moniker }}</div>

                        <div class="operator_address">
                            <div class="label">
                                {{ $t('message.validator_modal_operator_address_label') }}
                            </div>

                            <div class="val">
                                {{ store.validatorInfo.operator_address }}
                            </div>
                        </div>
                    </div>

                    <div class="active_set" :class="{ green: store.validatorInfo.is_active }">
                        <template v-if="store.validatorInfo.is_active">
                        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                        <span>{{ $t('message.validator_modal_active_set') }}</span>
                        </template>

                        <template v-else>
                        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>
                        <span>{{ $t('message.validator_modal_inactive_set') }}</span>
                        </template>
                    </div>
                </div>

                <div class="btns">
                    <a :href="`https://${store.validatorInfo.website.replace('https://', '')}`" target="_blank" rel="noopener nofollow" class="link">
                        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_website"></use></svg>
                        <span>{{ $t('message.validator_modal_website_btn') }}</span>
                    </a>

                    <a :href="`https://www.mintscan.io/${store.networks[store.currentNetwork].mintscanAlias}/validators/${store.validatorInfo.operator_address}`" target="_blank" rel="noopener nofollow" class="link" v-if="store.networks[store.currentNetwork].mintscanAlias">
                        <img src="@/assets/mintscan_logo.png" alt="">
                        <span>{{ $t('message.validator_modal_mintscan_btn') }}</span>
                    </a>

                    <a :href="`https://score.bronbro.io/network?network=${store.currentNetwork}`" target="_blank" rel="noopener nofollow" class="link">
                        <img src="@/assets/broscore_logo.svg" alt="">
                        <span>{{ $t('message.validator_modal_broscore_btn') }}</span>
                    </a>
                </div>

                <div class="details">
                    <div class="label">
                        {{ $t('message.validator_modal_details_label') }}
                    </div>

                    <div class="val">
                        {{ store.validatorInfo.details }}
                    </div>
                </div>

                <div class="features">
                    <div class="row">
                        <div class="feature" @mouseover="emitter.emit('setNotification', $t('message.validator_modal_col_commission_notice'))">
                            <div class="label">
                                {{ $t('message.validator_modal_commission_label') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.validatorInfo.commission * 100, 2) }}%
                            </div>
                        </div>

                        <div class="feature" @mouseover="emitter.emit('setNotification', $t('message.validator_modal_col_self_bonded_ownership_notice'))">
                            <div class="label" v-html="$t('message.validator_modal_ownership_label')"></div>

                            <div class="val">
                                <span>
                                    {{ new Number($filters.toFixed(store.validatorInfo.self_bonded.amount / Math.pow(10, store.networks[store.validatorInfo.network].exponent), 0)).toLocaleString() }}
                                </span>
                                /
                                <span>
                                    <!-- {{ $filters.toFixed(store.validatorInfo.ownership')] * 100, 2) }}% -->
                                </span>
                            </div>
                        </div>

                        <div class="feature" @mouseover="emitter.emit('setNotification', $t('message.validator_modal_col_total_delegated_notice'))">
                            <div class="label">
                                {{ $t('message.validator_modal_total_delegated_label') }}
                            </div>

                            <div class="val">
                                {{ new Number($filters.toFixed(store.validatorInfo.voting_power / Math.pow(10, store.networks[store.validatorInfo.network].exponent), 0)).toLocaleString() }}
                            </div>
                        </div>

                        <div class="feature" @mouseover="emitter.emit('setNotification', $t('message.validator_modal_col_voted_notice', { voted: $filters.toFixed(store.validatorInfo.proposals_voted_amount, 2) }))">
                            <div class="label">
                                {{ $t('message.validator_modal_voted_label') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.validatorInfo.proposals_voted_amount, 0) }}
                            </div>
                        </div>

                        <div class="feature" @mouseover="emitter.emit('setNotification', $t('message.validator_modal_col_blurring_notice'))">
                            <div class="label">
                                {{ $t('message.validator_modal_blurring_label') }}
                            </div>

                            <div class="val">
                                {{ $filters.toFixed(store.validatorInfo.voting_power / store.validatorInfo.delegator_shares * 100, 2) }}%
                            </div>
                        </div>
                    </div>
                </div>
                </template>
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { inject, onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        loading = ref(true)


    onBeforeMount(async () => {
        // Get validator data
        await fetch(`https://rpc.bronbro.io/validators/${store.validatorInfo.operator_address}`)
            .then(res => res.json())
            .then(response => {
                // Set data
                store.validatorInfo = response

                // Hide loader
                loading.value = false
            })
    })


    // Replacement of the logo if it is not present
    function imageLoadError(event) {
        event.target.classList.add('hide')

        event.target.closest('.logo').style.backgroundColor = store.colors[Math.floor((Math.random()*store.colors.length))]
    }
</script>


<style scoped>
    .modal_content .data
    {
        width: 960px;
        padding: 24px;

        background: #0d0d0d;
    }


    .modal_content .modal_title
    {
        margin-bottom: 40px;
    }


    .data > .row
    {
        position: relative;

        flex-wrap: nowrap;
    }


    .logo
    {
        position: relative;

        display: flex;

        width: 100px;
        min-width: 100px;
        height: 100px;
        padding: 17px;

        border-radius: 50%;
        background: #fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: 50%;
    }

    .logo img.hide
    {
        display: none;
    }


    .logo .icon
    {
        display: none;

        width: 48px;
        height: 48px;
    }

    .logo img.hide + .icon
    {
        display: block;
    }



    .power
    {
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        line-height: 34px;

        position: absolute;
        z-index: 3;
        top: -10px;
        right: 0;

        display: block;

        width: 34px;
        height: 34px;

        text-align: center;
    }

    .power svg
    {
        color: #950fff;

        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;
    }



    .info
    {
        width: 100%;
        margin: 0 0 0 20px;
    }


    .info .name
    {
        font-size: 30px;
        font-weight: 500;
        line-height: 100%;

        display: flex;

        min-height: 44px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .name > div
    {
        max-width: calc(100% - 124px);
    }


    .info .operator_address
    {
        margin-top: 14px;
    }


    .info .operator_address .label
    {
        font-size: 14px;
        line-height: 100%;

        margin-bottom: 10px;

        opacity: .4;
    }

    .info .operator_address .val
    {
        font-size: 14px;
        line-height: 100%;

        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .active_set
    {
        line-height: 100%;

        display: flex;

        padding: 10px 14px;

        white-space: nowrap;

        border-radius: 24px;
        background: #353535;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .active_set.green
    {
        padding: 9px 14px 11px;

        opacity: 1;
        background: #1bc562;
    }

    .active_set .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-right: 4px;
    }



    .btns
    {
        display: flex;

        margin-top: 30px;
        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .btns > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .btns .link
    {
        color: currentColor;
        font-size: 14px;
        line-height: 100%;

        display: flex;

        min-height: 32px;
        padding: 4px 6px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 10px;
        background: #191919;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .btns .link .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-right: 8px;
    }

    .btns .link img
    {
        display: block;

        width: 24px;
        height: 20px;
        margin-right: 8px;
    }


    .btns .link:hover
    {
        background: #950fff;
    }



    .details
    {
        margin-top: 30px;
    }


    .details .label
    {
        font-size: 14px;
        line-height: 100%;

        margin-bottom: 8px;

        opacity: .4;
    }


    .details .val
    {
        font-size: 14px;
        line-height: 120%;
    }



    .features
    {
        margin-top: 30px;
    }


    .features .row
    {
        margin-bottom: -24px;
        margin-left: -24px;

        align-items: stretch;
        align-content: stretch;
    }

    .features .row > *
    {
        width: calc(20% - 24px);
        margin-bottom: 24px;
        margin-left: 24px;
    }


    .features .feature
    {
        padding: 10px;

        border-radius: 12px;
        background: #141414;
    }


    .features .label
    {
        line-height: 120%;

        min-height: 52px;
        margin-bottom: 10px;

        opacity: .4;
    }


    .features .val
    {
        font-weight: 500;
        line-height: 120%;

        white-space: nowrap;
    }


    .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 0;

        background: none;
    }



    @media print, (max-width: 1439px)
    {
        .info .name
        {
            font-size: 28px;
        }



        .features .row
        {
            margin-bottom: -20px;
            margin-left: -20px;
        }

        .features .row > *
        {
            width: calc(20% - 20px);
            margin-bottom: 20px;
            margin-left: 20px;
        }


        .features .label
        {
            min-height: 48px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .info .name
        {
            font-size: 26px;
        }
    }



    @media print, (max-width: 1023px)
    {
        .features .row > *
        {
            width: calc(25% - 20px);
        }
    }



    @media print, (max-width: 767px)
    {
        .data > .row
        {
            flex-wrap: wrap;
        }


        .logo
        {
            padding: 10px;
        }


        .info
        {
            width: calc(100% - 120px);
        }


        .info .name
        {
            font-size: 20px;
            line-height: normal;

            min-height: 0;
        }


        .active_set
        {
            margin-top: 10px;
            margin-left: 120px;
        }



        .features .row
        {
            margin-bottom: -12px;
            margin-left: -12px;
        }

        .features .row > *
        {
            width: calc(50% - 12px);
            margin-bottom: 12px;
            margin-left: 12px;
        }


        .features .label
        {
            min-height: 40px;
        }
    }



    @media print, (max-width: 479px)
    {
        .modal_content .data
        {
            padding: 20px;
        }


        .info
        {
            width: 100%;
            margin-top: 12px;
            margin-left: 0;
        }


        .active_set
        {
            position: absolute;
            top: 0;
            right: 0;

            margin: 0;
        }


        .btns .link
        {
            font-size: 13px;
        }

        .btns .link .icon
        {
            width: 20px;
            height: 20px;
            margin-right: 6px;
        }

        .btns .link img
        {
            width: 20px;
            height: 17px;
            margin-right: 6px;
        }
    }

</style>
