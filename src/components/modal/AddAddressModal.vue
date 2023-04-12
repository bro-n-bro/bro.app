<template>
    <section class="modal" id="add_address_modal">
        <div class="modal_content" @click.self="emitter.emit('closeAddAddressModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeAddAddressModal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <template v-if="store.account.moonPassport">
                <div class="error">
                    <div class="title">
                        {{ $t('message.add_address_modal_title') }}
                    </div>

                    <img src="@/assets/images/add_address_different_account.svg" alt="">

                    <div class="desc">
                        {{ $t('message.add_address_modal_error_desc') }}
                    </div>

                    <div class="loader_wrap" v-if="loading">
                        <div class="loader"><span></span></div>
                    </div>
                </div>
                </template>


                <template v-else>
                <div class="steps">
                    <div class="title">
                        {{ $t('message.add_address_modal_title') }}
                    </div>

                    <div class="names">
                        <div :class="{'active': activeStep == 1, 'completed': activeStep > 1}" @click.prevent="activeStep = 1">
                            <span>{{ $t('message.add_address_modal_step1_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>

                        <div :class="{'active': activeStep == 2, 'completed': activeStep > 2}" @click.prevent="activeStep = 2">
                            <span>{{ $t('message.add_address_modal_step2_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>

                        <div :class="{'active': activeStep == 3, 'completed': activeStep > 3}" @click.prevent="activeStep = 3">
                            <span>{{ $t('message.add_address_modal_step3_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>

                        <div :class="{'active': activeStep == 4, 'completed': activeStep > 4}" @click.prevent="activeStep = 4">
                            <span>{{ $t('message.add_address_modal_step4_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>
                    </div>


                    <div class="step step1" v-if="activeStep == 1">
                        <div class="title">
                            {{ $t('message.add_address_modal_step1_title') }}
                        </div>

                        <div class="current_account">
                            <div class="logo">
                                <img :src="`/${activeNetwork}_logo.png`" alt="">
                            </div>

                            <div>
                                <div class="name">
                                    {{ store.account.userName }}
                                </div>

                                <div class="address">
                                    {{ generateAddress(store.networks[activeNetwork].mintscanAlias, store.wallets.cosmoshub) }}
                                </div>
                            </div>
                        </div>

                        <div class="networks">
                            <div><button class="network" :class="{'active': activeNetwork == 'cosmoshub'}" @click.prevent="selectNetwork('cosmoshub')">
                                <div class="logo">
                                    <img src="/cosmoshub_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.cosmoshub.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'desmos'}" @click.prevent="selectNetwork('desmos')">
                                <div class="logo">
                                    <img src="/desmos_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.desmos.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'juno'}" @click.prevent="selectNetwork('juno')">
                                <div class="logo">
                                    <img src="/juno_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.juno.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'stargaze'}" @click.prevent="selectNetwork('stargaze')">
                                <div class="logo">
                                    <img src="/stargaze_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.stargaze.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'gravity'}" @click.prevent="selectNetwork('gravity')">
                                <div class="logo">
                                    <img src="/gravity_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.gravity.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'stride'}" @click.prevent="selectNetwork('stride')">
                                <div class="logo">
                                    <img src="/stride_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.stride.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'omniflix'}" @click.prevent="selectNetwork('omniflix')">
                                <div class="logo">
                                    <img src="/omniflix_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.omniflix.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'osmosis'}" @click.prevent="selectNetwork('osmosis')">
                                <div class="logo">
                                    <img src="/osmosis_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.osmosis.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'evmos'}" @click.prevent="selectNetwork('evmos')">
                                <div class="logo">
                                    <img src="/evmos_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.evmos.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'bostrom'}" @click.prevent="selectNetwork('bostrom')">
                                <div class="logo">
                                    <img src="/bostrom_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.bostrom.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'crescent'}" @click.prevent="selectNetwork('crescent')">
                                <div class="logo">
                                    <img src="/crescent_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.crescent.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>

                            <div><button class="network" :class="{'active': activeNetwork == 'emoney'}" @click.prevent="selectNetwork('emoney')">
                                <div class="logo">
                                    <img src="/emoney_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.emoney.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button></div>
                        </div>

                        <button class="btn" @click.prevent="activeStep += 1">
                            {{ $t('message.next_btn') }}
                        </button>
                    </div>


                    <div class="step step2" v-if="activeStep == 2">
                        <div class="title">
                            {{ $t('message.add_address_modal_step2_title') }}
                        </div>

                        <div class="desc">
                            {{ $t('message.add_address_modal_step2_desc') }}
                        </div>

                        <img src="@/assets/images/add_address_step2.svg" alt="" class="img">

                        <button class="btn" @click.prevent="createSignature">
                            {{ $t('message.sign_btn') }}
                        </button>
                    </div>


                    <div class="step step3" v-if="activeStep == 3">
                        <div class="title">
                            {{ $t('message.add_address_modal_step3_title') }}
                        </div>

                        <div class="desc">
                            {{ $t('message.add_address_modal_step3_desc') }}
                        </div>

                        <img src="@/assets/images/add_address_step3.svg" alt="" class="img">

                        <button class="btn" :class="{'disabled': !ownerAccount}" @click.prevent="activeStep += 1">
                            {{ $t('message.next_btn') }}
                        </button>
                    </div>


                    <div class="step step4" v-if="activeStep == 4">
                        <div class="title">
                            {{ $t('message.add_address_modal_step4_title') }}
                        </div>

                        <div class="desc">
                            {{ $t('message.add_address_modal_step4_desc') }}
                        </div>

                        <img src="@/assets/images/add_address_step4.svg" alt="" class="img">

                        <button class="btn" @click.prevent="addAddress">
                            {{ $t('message.sing_broadcast_btn') }}
                        </button>

                        <div class="loader_wrap" v-if="loading">
                            <div class="loader"><span></span></div>
                        </div>
                    </div>


                    <div class="step step5" v-if="activeStep == 5">
                        <div class="title">
                            {{ $t('message.add_address_modal_step5_title') }}
                        </div>

                        <div class="desc">
                            {{ $t('message.add_address_modal_step5_desc') }}
                        </div>

                        <img src="@/assets/images/add_address_step5.svg" alt="" class="img">

                        <button class="btn" @click.prevent="emitter.emit('closeAddAddressModal')">
                            {{ $t('message.done_btn') }}
                        </button>
                    </div>
                </div>
                </template>
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { generateAddress } from '@/utils'
    import { toAscii, toBase64 } from '@cosmjs/encoding'

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification(),
        emitter = inject('emitter'),
        activeStep = ref(1),
        activeNetwork = ref('cosmoshub'),
        ownerAccount = ref(true),
        loading = ref(false)


    // Select network
    function selectNetwork(network) {
        activeNetwork.value = network
    }


    // Create signature
    async function createSignature() {
        try {
            await window.keplr.enable(store.networks.bostrom.chainId)

            let res = await window.keplr.signArbitrary(
                store.networks.bostrom.chainId,
                store.wallets.bostrom,
                `${store.wallets.bostrom}:${store.CONSTITUTION_HASH}`
            )

            store.account.signature = toBase64(toAscii(JSON.stringify({
                pub_key: res.pub_key.value,
                signature: res.signature
            })))

            // Show notification
            notification.notify({
                group: 'default',
                title: i18n.global.t('message.notification_passport_signature'),
                type: 'success'
            })

            // Go to next step
            activeStep.value += 1
        } catch (error) {
            console.log(error)
        }
    }


    // Sign a nd broadcast
    async function addAddress() {
        // Show loader
        loading.value = true

        // Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_address_adding_process')
        })

        setTimeout(() => {
            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            activeStep.value += 1
            store.needReload = true
        }, 2000)
    }


    // Change Keplr account
    window.addEventListener('keplr_keystorechange', async () => {
        // Check account
        if(store.showAddAddressModal) {
            // Show loader
            loading.value = true

            // Check passport
            await store.connectWallet(false, false)

            if(store.account.moonPassport) {
                // Hide loader
                loading.value = false
            }
        }
    })
</script>


<style scoped>
    .modal_content .data
    {
        width: 424px;
    }


    .loader_wrap
    {
        border-radius: 36px;
    }



    .title
    {
        line-height: 36px;

        margin-bottom: 8px;
        padding: 4px 60px 4px 0;
    }



    .error img
    {
        display: block;

        width: 180px;
        max-width: 100%;
        margin: 0 auto 24px;
    }


    .error .desc
    {
        font-size: 24px;
        font-weight: 500;
        line-height: 110%;

        text-align: center;
    }



    .names
    {
        display: flex;

        margin-bottom: 24px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }

    .names > *
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        display: flex;

        width: 100%;
        padding: 10px 0;

        transition: .2s linear;
        pointer-events: none;

        border-bottom: 1px solid rgba(255, 255, 255, .1);

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .names > * + *
    {
        margin-left: 4px;
    }


    .names span
    {
        width: calc(100% - 24px);
    }


    .names .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-left: auto;

        transition: opacity .2s linear;

        opacity: 0;
    }


    .names > *.disabled
    {
        pointer-events: none;
    }

    .names > *.active,
    .names > *.completed
    {
        color: #950fff;

        cursor: pointer;
        pointer-events: auto;

        border-color: #950fff;
    }

    .names > *.completed .icon
    {
        opacity: 1;
    }



    .step .title
    {
        font-size: 24px;
        line-height: 110%;

        margin-bottom: 8px;
        padding: 0;
    }


    .step .desc
    {
        color: #555;
        line-height: 110%;
    }


    .step .img
    {
        display: block;

        margin: 24px auto 0;
    }


    .step1 .current_account
    {
        display: flex;

        margin-top: 16px;
        padding: 12px 10px;

        border-radius: 12px;
        background: #191919;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .step1 .current_account .logo
    {
        width: 24px;
        height: 24px;

        border-radius: 50%;
    }

    .step1 .current_account .logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }

    .step1 .current_account .logo + *
    {
        width: calc(100% - 32px);
        margin-left: auto;
    }


    .step1 .current_account .name
    {
        font-weight: 500;
        line-height: 100%;
    }


    .step1 .current_account .address
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        overflow: hidden;

        margin-top: 8px;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .step1 .networks
    {
        display: flex;

        margin-top: 24px;
        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }

    .step1 .networks > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .step1 .networks .network
    {
        font-size: 14px;
        line-height: 100%;

        display: flex;

        width: 100%;
        padding: 8px;

        transition: background .2s linear;
        text-align: left;

        border-radius: 8px;
        background: #191919;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .step1 .networks .logo
    {
        width: 24px;
        height: 24px;

        border-radius: 50%;
    }

    .step1 .networks .logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }

    .step1 .networks .logo + *
    {
        width: calc(100% - 52px);
        margin-left: auto;
    }


    .step1 .networks .icon
    {
        color: #950fff;

        display: block;

        width: 16px;
        height: 16px;
        margin-left: auto;

        transition: opacity .2s linear;

        opacity: 0;
    }


    .step1 .networks .network:hover,
    .step1 .networks .network.active
    {
        background: #212121;
    }

    .step1 .networks .network.active .icon
    {
        opacity: 1;
    }



    .btn
    {
        font-weight: 500;
        line-height: 100%;

        display: block;

        width: 100%;
        height: 46px;
        margin-top: 24px;
        padding: 15px;

        transition: background .2s linear;

        border-radius: 12px;
        background: #950fff;
    }

    .btn.disabled
    {
        pointer-events: none;

        background: #353535;
    }

    .btn:hover
    {
        background: #7700e1;
    }

</style>