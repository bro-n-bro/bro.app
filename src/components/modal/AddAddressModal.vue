<template>
    <section class="modal" id="add_address_modal">
        <div class="modal_content">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeAddAddressModal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <template v-if="store.account.moonPassport && activeStep == 1">
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
                        <div :class="{'active': activeStep == 1, 'completed': activeStep > 1, 'disabled': activeStep == 5}" @click.prevent="activeStep = 1">
                            <span>{{ $t('message.add_address_modal_step1_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>

                        <div :class="{'active': activeStep == 2, 'completed': activeStep > 2, 'disabled': activeStep == 5}">
                            <span>{{ $t('message.add_address_modal_step2_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>

                        <div :class="{'active': activeStep == 3, 'completed': activeStep > 3, 'disabled': activeStep == 5}" @click.prevent="activeStep = 3">
                            <span>{{ $t('message.add_address_modal_step3_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>

                        <div :class="{'active': activeStep == 4, 'completed': activeStep > 4, 'disabled': activeStep == 5}" @click.prevent="activeStep = 4">
                            <span>{{ $t('message.add_address_modal_step4_name') }}</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                        </div>
                    </div>


                    <div class="step step1" v-if="activeStep == 1">
                        <div class="title">
                            {{ $t('message.add_address_modal_step1_title') }}
                        </div>

                        <div class="current_account" :class="{'editing': editForm, 'error': !tempAddressName.length}">
                            <div class="logo">
                                <img :src="`/${addedNetwork}_logo.png`" alt="" v-if="!duplicate">
                                <svg class="icon" v-else><use xlink:href="/sprite.svg#ic_duplicate"></use></svg>
                            </div>

                            <div>
                                <div class="name" :class="{'error': duplicate}">
                                    {{ tempAddressName }}
                                    <span v-if="duplicate">Duplicated</span>
                                </div>

                                <form class="edit_name_form" @submit.prevent="hideEditForm">
                                    <input type="text" v-model="tempAddressName" class="input" id="temp_name">

                                    <button type="submit" class="submit_btn">
                                        <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                                    </button>

                                    <button type="button" class="cancel_btn" @click.prevent="cancelEditForm">
                                        <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                                    </button>
                                </form>

                                <div class="address">
                                    <template v-if="addedNetwork == 'evmos'">
                                    {{ store.wallets.evmos.slice(0, 13) + '...' + store.wallets.evmos.slice(-6) }}
                                    </template>

                                    <template v-else-if="addedNetwork == 'desmos'">
                                    {{ store.wallets.desmos.slice(0, 13) + '...' + store.wallets.desmos.slice(-6) }}
                                    </template>

                                    <template v-else>
                                    {{ generateAddress(store.networks[addedNetwork].address_prefix, store.wallets.cosmoshub).slice(0, 13) + '...' + generateAddress(store.networks[addedNetwork].address_prefix, store.wallets.cosmoshub).slice(-6) }}
                                    </template>
                                </div>

                                <button class="edit_btn" @click.prevent="showEditForm">
                                    <svg><use xlink:href="/sprite.svg#ic_edit"></use></svg>
                                </button>
                            </div>
                        </div>

                        <div class="networks">
                            <div><button class="network" :class="{'active': addedNetwork == 'cosmoshub', 'added': checkAddress('cosmos')}" @click.prevent="selectNetwork('cosmoshub')">
                                <div class="logo">
                                    <img src="/cosmoshub_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.cosmoshub.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <!-- <div><button class="network" :class="{'active': addedNetwork == 'desmos'}" @click.prevent="selectNetwork('desmos')">
                                <div class="logo">
                                    <img src="/desmos_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.desmos.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div> -->

                            <div><button class="network" :class="{'active': addedNetwork == 'juno', 'added': checkAddress('juno')}" @click.prevent="selectNetwork('juno')">
                                <div class="logo">
                                    <img src="/juno_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.juno.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'stargaze', 'added': checkAddress('stars')}" @click.prevent="selectNetwork('stargaze')">
                                <div class="logo">
                                    <img src="/stargaze_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.stargaze.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'gravity', 'added': checkAddress('gravity')}" @click.prevent="selectNetwork('gravity')">
                                <div class="logo">
                                    <img src="/gravity_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.gravity.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'stride', 'added': checkAddress('stride')}" @click.prevent="selectNetwork('stride')">
                                <div class="logo">
                                    <img src="/stride_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.stride.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'omniflix', 'added': checkAddress('omniflix')}" @click.prevent="selectNetwork('omniflix')">
                                <div class="logo">
                                    <img src="/omniflix_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.omniflix.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'osmosis', 'added': checkAddress('osmo')}" @click.prevent="selectNetwork('osmosis')">
                                <div class="logo">
                                    <img src="/osmosis_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.osmosis.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'bostrom', 'added': checkAddress('bostrom')}" @click.prevent="selectNetwork('bostrom')">
                                <div class="logo">
                                    <img src="/bostrom_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.bostrom.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'crescent', 'added': checkAddress('cre')}" @click.prevent="selectNetwork('crescent')">
                                <div class="logo">
                                    <img src="/crescent_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.crescent.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>

                            <div><button class="network" :class="{'active': addedNetwork == 'emoney', 'added': checkAddress('emoney')}" @click.prevent="selectNetwork('emoney')">
                                <div class="logo">
                                    <img src="/emoney_logo.png" alt="">
                                </div>

                                <div>{{ store.networks.emoney.name }}</div>

                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>

                                <div class="added_label">{{ $t('message.add_address_added_label') }}</div>
                            </button></div>
                        </div>

                        <button class="btn" :class="{'disabled': duplicate || !tempAddressName.length}" @click.prevent="setActiveKeplrAddress">
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

                        <div class="loader_wrap" v-if="loading">
                            <div class="loader"><span></span></div>
                        </div>
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
    import { ref, inject, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { preparePassportTx, sendTx, generateAddress } from '@/utils'
    import { toAscii, toBase64 } from '@cosmjs/encoding'

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification(),
        emitter = inject('emitter'),
        activeStep = ref(1),
        activeKeplrAddress = ref(store.activeKeplrAddress),
        addedNetwork = ref(),
        addedAddress = ref(''),
        ownerAccount = ref(false),
        loading = ref(false),
        signature = ref(''),
        duplicate = ref(false),
        editForm = ref(false),
        tempAddressName = ref(store.account.userName)


    onBeforeMount(() => {
        // Select network
        selectNetwork('cosmoshub')
    })


    // Checking if the address was previously added
    function checkAddress(prefix) {
        if(store.account.owner.moonPassport.extension.addresses) {
            let addresses = []

            store.account.owner.moonPassport.extension.addresses.forEach(el => {
                addresses.push(el.address)
            })

            return addresses.includes(generateAddress(prefix, store.wallets.cosmoshub))
        }
    }


    // Select network
    async function selectNetwork(network) {
        addedNetwork.value = network

        // Checking if the address was previously added
        let result = checkAddress(store.networks[network].address_prefix)

        result
            ? duplicate.value = true
            : duplicate.value = false

        // Set new singer
        await setNewSinger()
    }


    // Show edit form
    function showEditForm() {
        editForm.value = true

        // Focus on input
        setTimeout(() => document.getElementById('temp_name').focus())
    }


    // Hide edit form
    function hideEditForm() {
        if(tempAddressName.value.length) {
            editForm.value = false
        }
    }


    // Cancel edit form
    function cancelEditForm() {
        hideEditForm()

        // Set default name
        tempAddressName.value = store.account.userName
    }


    // Set active Keplr address
    async function setActiveKeplrAddress() {
        activeKeplrAddress.value = store.activeKeplrAddress

        // Set new singer
        await setNewSinger()

        // Go to next step
        activeStep.value += 1
    }


    // Set new singer
    async function setNewSinger() {
        await window.keplr.enable(store.networks[addedNetwork.value].chainId)

        let offlineSigner = await window.getOfflineSignerAuto(store.networks[addedNetwork.value].chainId),
            accounts = await offlineSigner.getAccounts()

        addedAddress.value = accounts[0].address
    }


    // Create signature
    async function createSignature() {
        try {
            let res = await window.keplr.signArbitrary(
                store.networks[addedNetwork.value].chainId,
                addedAddress.value,
                `${store.account.moonPassportOwner}:${store.CONSTITUTION_HASH}`
            )

            signature.value = toBase64(toAscii(JSON.stringify({
                pub_key: res.pub_key.value,
                signature: res.signature
            })))

            // Show notification
            notification.notify({
                group: 'default',
                title: i18n.global.t('message.notification_passport_signature'),
                type: 'success'
            })

            // Hide loader
            loading.value = false

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

        try{
            // Prepare Tx
            let prepareResult = await preparePassportTx([
                {
                    proof_address: {
                        address: addedAddress.value,
                        nickname: store.account.owner.moonPassport.extension.nickname,
                        signature: signature.value
                    }
                },
                {
                    set_address_label: {
                        address: addedAddress.value,
                        label: tempAddressName.value,
                        nickname: store.account.owner.moonPassport.extension.nickname
                    }
                }
            ])

            // Send Tx
            let result = await sendTx(prepareResult)

            if (result.code === 0) {
                // Set TXS
                store.lastTXS = result.transactionHash

                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    group: store.networks.bostrom.denom,
                    title: i18n.global.t('message.notification_success_address_added_title'),
                    type: 'success',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_address_add')
                    }
                })

                // Hide loader
                loading.value = false

                // Go to next step
                activeStep.value += 1
                store.needReload = true
            }

            if (result.code) {
                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    group: store.networks.bostrom.denom,
                    title: i18n.global.t('message.notification_failed_title'),
                    text: i18n.global.t('message.manage_modal_error_rejected'),
                    type: 'error',
                    data: {
                        chain: 'passport',
                        tx_type: i18n.global.t('message.notification_action_address_add')
                    }
                })

                // Hide loader
                loading.value = false
            }
        } catch (error) {
            console.log(error)

            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                group: store.networks.bostrom.denom,
                title: i18n.global.t('message.notification_failed_title'),
                text: i18n.global.t('message.manage_modal_error_rejected'),
                type: 'error',
                data: {
                    chain: 'passport',
                    tx_type: i18n.global.t('message.notification_action_address_add')
                }
            })

            // Hide loader
            loading.value = false
        }
    }


    // Change Keplr account
    window.addEventListener('keplr_keystorechange', async () => {
        // Check account
        if(store.showAddAddressModal) {
            // Show loader
            loading.value = true

            // Set condition
            ownerAccount.value = false

            // New keplr connect
            await store.connectWallet(false, false)

            // Step 0 and Step 2
            if (activeStep.value == 1 || activeStep.value == 2) {
                if(store.account.moonPassport) {
                    // Hide loader
                    loading.value = false

                    // Go to zero step
                    activeStep.value = 1
                }
            }

            // Step 3
            if (activeStep.value == 3) {
                if(store.wallets.bostrom == store.account.moonPassportOwner) {
                    // Set condition
                    ownerAccount.value = true

                    // Go to next step
                    activeStep.value += 1
                }

                // Hide loader
                loading.value = false
            }

            // Step 4
            if (activeStep.value == 4) {
                if(store.wallets.bostrom != store.account.moonPassportOwner) {
                    // Go to next step
                    activeStep.value -= 1
                }

                // Hide loader
                loading.value = false
            }
        }
    })
</script>


<style scoped>
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


    .names > *.active,
    .names > *.completed
    {
        color: #950fff;

        cursor: pointer;
        pointer-events: auto;

        border-color: #950fff;
    }

    .names > *.disabled
    {
        pointer-events: none;
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

        height: 150px;
        margin: 24px auto 0;
    }


    .step1 .current_account
    {
        position: relative;

        display: flex;

        margin-top: 16px;
        padding: 11px 9px;

        transition: border-color .2s linear;

        border: 1px solid transparent;
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


    .step1 .current_account .logo .icon
    {
        color: #eb5757;

        display: block;

        width: 24px;
        height: 24px;
    }


    .step1 .current_account .name
    {
        font-weight: 500;
        line-height: 100%;

        display: flex;

        padding-right: 40px;

        transition: color .2s linear;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .step1 .current_account .name.error
    {
        color: #eb5757;
    }

    .step1 .current_account .name span
    {
        color: #555;
        font-size: 14px;
        font-weight: 400;

        margin-left: 8px;
    }


    .step1 .current_account .edit_name_form
    {
        position: relative;

        display: none;

        width: 100%;
    }


    .step1 .current_account .edit_name_form .input
    {
        color: var(--text_color);
        font-family: var(--font-family);
        font-size: var(--font_size);
        font-weight: 500;

        display: block;

        width: 100%;
        height: 16px;
        padding-right: 60px;

        border: none;
        background: none;
    }


    .step1 .current_account .edit_name_form .submit_btn
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 30px;
        bottom: 0;

        display: flex;

        width: 16px;
        height: 16px;
        margin: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .step1 .current_account .edit_name_form .submit_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }


    .step1 .current_account .edit_name_form .cancel_btn
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;
        bottom: 0;

        display: flex;

        width: 16px;
        height: 16px;
        margin: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .step1 .current_account .edit_name_form .cancel_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }


    .step1 .current_account .address
    {
        color: #555;
        font-size: 14px;
        line-height: 16px;

        overflow: hidden;

        margin-top: 6px;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .step1 .current_account .edit_btn
    {
        color: #555;

        position: absolute;
        top: 12px;
        right: 10px;

        display: flex;

        width: 16px;
        height: 16px;

        transition: color .2s linear;
        pointer-events: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .step1 .current_account .edit_btn svg
    {
        display: block;

        width: 100%;
        height: 100%;
    }

    .step1 .current_account .edit_btn:hover
    {
        color: #fff;
    }



    .step1 .current_account.editing
    {
        border-color: #950fff;
    }

    .step1 .current_account.editing.error
    {
        border: 1px solid #eb5757;
        background: rgba(235, 87, 87, .1);
    }

    .step1 .current_account.editing .name,
    .step1 .current_account.editing .edit_btn
    {
        display: none;
    }

    .step1 .current_account.editing .edit_name_form
    {
        display: block;
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
        padding: 7px;

        transition: .2s linear;
        text-align: left;

        border: 1px solid transparent;
        border-radius: 8px;
        background: #191919;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .step1 .networks .logo
    {
        width: 24px;
        min-width: 24px;
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
        width: 100%;
        margin-left: 8px;
    }


    .step1 .networks .icon
    {
        color: #950fff;

        display: block;

        width: 16px;
        min-width: 16px;
        height: 16px;
        margin-left: 8px;

        transition: opacity .2s linear;

        opacity: 0;
    }


    .step1 .networks .added_label
    {
        font-size: 12px;
        line-height: 100%;

        display: none;

        margin-left: 8px;

        white-space: nowrap;

        opacity: .5;
    }

    .step1 .networks .network.added:not(.active) .added_label
    {
        display: block;
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


    .step1 .networks .network.added
    {
        border-color: #950fff;
        background: rgba(149, 15, 255, .1);
    }

    .step1 .networks .network.added .icon
    {
        display: none;
    }


    .step1 .networks .network.added.active
    {
        border: 1px solid #eb5757;
        background: rgba(235, 87, 87, .1);
    }

    .step1 .networks .network.added.active .icon
    {
        color: #fff;

        display: block;
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