<template>
    <section class="create_passport">
        <div class="cont">
            <div class="back_btn">
                <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/account/cosmoshub?demo=true'" class="btn" v-if="store.demo">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>

                <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/account/cosmoshub'" class="btn" v-else>
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>
            </div>

            <!-- <pre>{{ store.account.moonPassport }}</pre> -->

            <div class="data_wrap">
                <div class="data_hide" id="completed_passport">
                    <div class="data active">
                        <div class="avatar">
                            <input type="file" id="avatar" ref="avatar" accept="image/png, image/jpeg" @change="avatarUpload">
                            <label for="avatar" class="box hide">
                                <div class="loader_wrap" v-if="!avatarPreview.status && !store.demo">
                                    <div class="loader"><span></span></div>
                                </div>

                                <div class="image" v-else><div>
                                    <img src="/demo_avatar.jpg" alt="" v-if="store.demo">
                                    <img :src="avatarPreview.src" alt="" v-else>
                                </div></div>
                            </label>

                            <div class="logo">
                                <img src="@/assets/images/black_logo.svg" alt="">

                                <div class="corner corner_top_left"></div>
                                <div class="corner corner_top_right"></div>
                                <div class="corner corner_bottom_left"></div>
                                <div class="corner corner_bottom_right"></div>
                            </div>
                        </div>

                        <form class="info">
                            <div class="line">
                                <div class="field">
                                    <div class="label">
                                        {{ $t('message.passport_address_exp') }}
                                    </div>

                                    <input type="text" :value="moonAddress.slice(0, 13) + '...' + moonAddress.slice(-6)" class="input" readonly>
                                </div>
                            </div>

                            <div class="line" :class="{ 'error': nickNameError }">
                                <div class="field">
                                    <div class="label">
                                        {{ $t('message.passport_name_label') }}
                                    </div>

                                    <div class="exp" v-if="editNickname && !status">
                                        {{ $t('message.passport_name_exp') }}
                                    </div>

                                    <input class="input" type="text" name="name" maxlength="16" v-model="nickName" @input="validateName" :readonly="!editNickname">

                                    <button type="button" class="edit_btn" @click="enableEditNickname()" v-if="!editNickname && !status">
                                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.57716 3.76801L10.5638 2.78134C10.6876 2.65747 10.8347 2.55921 10.9965 2.49217C11.1583 2.42513 11.3317 2.39062 11.5068 2.39062C11.682 2.39062 11.8554 2.42513 12.0172 2.49217C12.179 2.55921 12.326 2.65747 12.4498 2.78134L13.3925 3.72401C13.6425 3.97404 13.7829 4.31312 13.7829 4.66667C13.7829 5.02023 13.6425 5.3593 13.3925 5.60934L12.4058 6.59601M9.57716 3.76801L3.16649 10.178C2.94515 10.3994 2.80874 10.6915 2.78116 11.0033L2.61983 12.83C2.61116 12.9271 2.6239 13.0249 2.65714 13.1166C2.69039 13.2082 2.74333 13.2915 2.81223 13.3604C2.88114 13.4294 2.96433 13.4824 3.05595 13.5158C3.14757 13.5491 3.24538 13.5619 3.34249 13.5533L5.16916 13.392C5.48144 13.3647 5.77413 13.2283 5.99583 13.0067L12.4058 6.59601M9.57716 3.76801L12.4058 6.59601" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                        </svg>
                                    </button>

                                    <template v-else>
                                    <button type="submit" class="submit_btn" @click.prevent="updateNickname()">
                                        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                                    </button>

                                    <button type="button" class="cancel_btn" @click.prevent="disableEditNickname()">
                                        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                                    </button>
                                    </template>
                                </div>
                            </div>

                            <div class="line citizenship">
                                <div class="field">
                                    <div class="label">
                                        {{ $t('message.passport_citizenship_label') }}
                                    </div>

                                    <div class="text" v-html="$t('message.passport_citizenship_text')"></div>

                                    <img src="@/assets/images/passport_citizenship.svg" alt="" class="img">
                                </div>
                            </div>
                        </form>


                        <div class="bg_line">
                            <div class="corner corner_top_left"></div>
                            <div class="corner corner_top_right"></div>
                            <div class="corner corner_bottom_left"></div>
                            <div class="corner corner_bottom_right"></div>
                        </div>

                        <div class="bg_left"></div>
                        <div class="bg_right"></div>
                        <div class="bg_bottom"></div>

                        <div class="gradient" :style="{ 'background': bgGradient }"></div>
                    </div>
                </div>
            </div>


            <div class="bottom_btns" v-if="showBottomBtns">
                <label for="avatar" class="btn change_image_btn" v-if="!avatarPreview.buffer.length || status">
                    {{ $t('message.btn_change_image') }}
                </label>

                <button class="btn update_btn" v-else @click.prevent="updatePassport()">
                    {{ $t('message.btn_update') }}
                </button>

                <a :href="passportImage" download="my_passport.png" class="btn download_btn">
                    {{ $t('message.btn_download_png') }}
                </a>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { ref, reactive, inject, onBeforeMount, watchEffect } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'
    import { useNotification } from '@kyvg/vue3-notification'
    import * as htmlToImage from 'html-to-image'
    import gradient from 'random-gradient'
    import { preparePassportTx, sendTx } from '@/utils'

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification(),
        router = useRouter(),
        avatar = ref(null),
        avatarPreview = reactive({
            src: '',
            buffer: '',
            status: false
        }),
        moonAddress = store.account.moonPassportOwnerAddress,
        nickName = ref(store.account.moonPassportOwner.extension.nickname),
        nickNameError = ref(false),
        passportImage = ref(''),
        status = ref(false),
        showBottomBtns = store.demo ? ref(true) : ref(false),
        editNickname = ref(false),
        bgGradient = ref('')


    onBeforeMount(() => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_account_passport')

        // Generate gradient
        bgGradient.value = gradient(nickName.value)
    })


    watchEffect(() => {
        // Monitor the IPFSStatus
        if(store.IPFSNode) {
            let delay = 0

            if(!store.account.avatar) {
                delay = 5100
            }

            setTimeout(() => {
                avatarPreview.src = store.account.avatar
                avatarPreview.status = true

                // Create passport image
                htmlToImage.toJpeg(document.getElementById('completed_passport'), { quality: 1 })
                    .then(dataUrl => {
                        passportImage.value = dataUrl
                        showBottomBtns.value = true
                    })
                    .catch(error => console.error(error))
            }, delay)
        }
    })


    // Enable edit nickname
    function enableEditNickname() {
        let input = event.target.closest('.line').querySelector('.input')

        editNickname.value = true

        // Focus on input
        setTimeout(() => input.focus())
    }


    // Disable edit nickname
    function disableEditNickname() {
        editNickname.value = false

        // Set nickName from passport
        nickName.value = store.account.moonPassportOwner.extension.nickname
    }


    // Avatar upload
    function avatarUpload () {
        let formData = new FormData()

        // Reset preview
        avatarPreview.status = false

        // File size valdate
        if(avatar.value.files[0].size / 1024 / 1024 <= 5){
            formData.append('avatar', avatar.value.files[0])

            // Get preview
            let reader = new FileReader()

            reader.onload = async () => {
                avatarPreview.buffer = Buffer(reader.result)
                avatarPreview.src = reader.result
                avatarPreview.status = true
            }

            reader.readAsDataURL(avatar.value.files[0])
        } else {
            // Show notification
            notification.notify({
                group: 'default',
                durartion: 5000,
                title: i18n.global.t('message.notification_error_file_size_title'),
                text: i18n.global.t('message.notification_error_file_size_text', {'size': '5mb'}),
                type: 'error'
            })
        }
    }


    // Update passport
    async function updatePassport() {
        // Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_passport_update_process')
        })

        status.value = true

        try{
            if (!store.demo) {
                // Send avatar to IPFS
                let avatarIpfs = await store.IPFSNode.add(avatar.value.files[0])

                // Pin avatar
                let pinAvatar = new FormData()

                pinAvatar.append('file', avatar.value.files[0])

                fetch('https://io.cybernode.ai/add?stream-channels=false&raw-leaves=true&cid-version=0', {
                    method: 'POST',
                    body: pinAvatar
                })

                // Prepare Tx
                var prepareResult = await preparePassportTx({
                    update_avatar: {
                        new_avatar: avatarIpfs.path,
                        nickname: nickName.value
                    }
                })

                // Send Tx
                var result = await sendTx(prepareResult)
            } else {
                var result = { code: 0 }
            }

            if (result.code === 0) {
                // Set TXS
                store.lastTXS = result.transactionHash

                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    group: 'default',
                    title: i18n.global.t('message.notification_success_update_passport_title'),
                    type: 'success',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_update_passport')
                    }
                })

                // Clear buffer
                avatarPreview.buffer = ''

                // Create passport image
                htmlToImage.toJpeg(document.getElementById('completed_passport'), { quality: 1 })
                    .then(dataUrl => passportImage.value = dataUrl)
                    .catch(error => console.error(error))

                // Get moon passport
                if (!store.demo) {
                    await store.getMoonPassport()
                    await store.getOwnerMoonPassport()
                }

                // Set avatar
                store.account.avatar = avatarPreview.src
            }

            if (result.code) {
                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    duration: -100,
                    group: 'default',
                    title: i18n.global.t('message.notification_failed_title'),
                    text: result?.rawLog.toString(),
                    type: 'error',
                    data: {
                        chain: 'bostrom',
                        tx_type: i18n.global.t('message.notification_action_update_passport')
                    }
                })
            }
        } catch (error) {
            console.error(error)

            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                group: 'default',
                title: i18n.global.t('message.notification_failed_title'),
                text: i18n.global.t('message.notification_tx_error_rejected'),
                type: 'error',
                data: {
                    chain: 'bostrom',
                    tx_type: i18n.global.t('message.notification_action_update_passport')
                }
            })
        }

        status.value = false
    }


    // Validate nickname
    function validateName(event) {
        let result = /^([a-z0-9-]*)$/g.test(event.target.value)

        event.target.value.length < 8 || event.target.value.length > 16 || !result
            ? nickNameError.value = true
            : nickNameError.value = false
    }


    // Nickname availability check
    async function checkNickname() {
        try {
            let response = await store.jsCyber.queryContractSmart(
                store.CONTRACT_ADDRESS_PASSPORT,
                {
                    passport_by_nickname: {
                        nickname: nickName.value
                    }
                }
            )

            return response
        } catch (error) {
            console.error(error)

            return null
        }
    }


    // Update nickname
    async function updateNickname() {
        if(nickNameError.value) {
            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                durartion: 5000,
                group: 'default',
                title: i18n.global.t('message.passport_error_nickname_title'),
                text: i18n.global.t('message.passport_name_exp'),
                type: 'error',
                data: {
                    chain: 'bostrom',
                    tx_type: i18n.global.t('message.notification_action_update_passport')
                }
            })
        } else {
            if(await checkNickname() == null) {
                // Show notification
                notification.notify({
                    group: 'default',
                    duration: -100,
                    title: i18n.global.t('message.notification_passport_update_process')
                })

                status.value = true

                // Disable edit nickname
                editNickname.value = false

                try{
                    if (!store.demo) {
                        // Prepare Tx
                        var prepareResult = await preparePassportTx({
                            update_name: {
                                new_nickname: nickName.value,
                                old_nickname: store.account.moonPassportOwner.extension.nickname
                            }
                        })

                        // Send Tx
                        var result = await sendTx(prepareResult)
                    } else {
                        var result = { code: 0 }
                    }

                    if (result.code === 0) {
                        // Set TXS
                        store.lastTXS = result.transactionHash

                        // Show notification
                        notification.notify({
                            group: 'default',
                            clean: true
                        })

                        notification.notify({
                            group: 'default',
                            title: i18n.global.t('message.notification_success_update_passport_title'),
                            type: 'success',
                            data: {
                                chain: 'bostrom',
                                tx_type: i18n.global.t('message.notification_action_update_passport')
                            }
                        })

                        // Generate gradient
                        bgGradient.value = gradient(nickName.value)

                        // Create passport image
                        htmlToImage.toJpeg(document.getElementById('completed_passport'), { quality: 1 })
                            .then(dataUrl => passportImage.value = dataUrl)
                            .catch(error => console.error(error))

                        // Get moon passport
                        if (!store.demo) {
                            await store.getMoonPassport()
                            await store.getOwnerMoonPassport()
                        }
                    }

                    if (result.code) {
                        // Show notification
                        notification.notify({
                            group: 'default',
                            clean: true
                        })

                        notification.notify({
                            duration: -100,
                            group: 'default',
                            title: i18n.global.t('message.notification_failed_title'),
                            text: result?.rawLog.toString(),
                            type: 'error',
                            data: {
                                chain: 'bostrom',
                                tx_type: i18n.global.t('message.notification_action_update_passport')
                            }
                        })
                    }
                } catch (error) {
                    console.error(error)

                    // Show notification
                    notification.notify({
                        group: 'default',
                        clean: true
                    })

                    notification.notify({
                        group: 'default',
                        title: i18n.global.t('message.notification_failed_title'),
                        text: i18n.global.t('message.notification_tx_error_rejected'),
                        type: 'error',
                        data: {
                            chain: 'bostrom',
                            tx_type: i18n.global.t('message.notification_action_update_passport')
                        }
                    })
                }

                status.value = false
            } else {
                // Show notification
                notification.notify({
                    group: 'default',
                    durartion: 5000,
                    title: i18n.global.t('message.notification_error_nickName_title'),
                    text: i18n.global.t('message.notification_error_nickName_desc'),
                    type: 'error'
                })

                nickNameError.value = true
            }
        }
    }
</script>


<style>
    .create_passport
    {
        display: flex;

        padding-bottom: 40px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        flex: 1 0 auto;
    }



    .create_passport .back_btn
    {
        margin-bottom: 8px;
    }


    .create_passport .back_btn .btn
    {
        color: currentColor;

        display: flex;

        width: 36px;
        height: 36px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .create_passport .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
    }


    .create_passport .back_btn .btn:hover
    {
        background: #950fff;
    }


    .create_passport .data_wrap
    {
        position: relative;

        width: 974px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
    }


    .create_passport .data
    {
        position: relative;
        z-index: 3;

        display: flex;

        height: 579px;
        padding: 40px 48px 45px 92px;

        border-radius: 15px;
        background: #151515;
        box-shadow: 0 4px 0 #1f1c1c, inset 0 1px 0 rgba(91, 91, 91, .13);

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }


    .create_passport .data_hide
    {
        overflow: hidden;

        border-radius: 15px;
        background: var(--bg);
    }


    .create_passport .data .gradient
    {
        position: absolute;
        z-index: 1;
        top: -50%;
        left: -50%;

        width: 200%;
        height: 200%;

        animation: spin 10s linear infinite;
        pointer-events: none;

        opacity: .8;
        border-radius: inherit;

        background-blend-mode: overlay, screen, difference, normal;
    }


    .create_passport .data .bg_line
    {
        position: absolute;
        z-index: 3;
        top: 98px;
        left: 0;

        width: 66px;
        height: 12px;

        background: var(--bg);
        box-shadow: 0 -4px 0 #1f1c1c;
    }


    .create_passport .data .bg_line .corner
    {
        position: absolute;

        width: 9px;
        height: 9px;

        background: url(../assets/images/corner_big.svg) 100% 0/9px 9px no-repeat;
    }


    .create_passport .data .bg_line .corner_top_left
    {
        bottom: 100%;
        left: 0;

        transform: rotate(-180deg);
    }


    .create_passport .data .bg_line .corner_top_right
    {
        right: -1px;
        bottom: 100%;

        transform: rotate(90deg);
    }


    .create_passport .data .bg_line .corner_bottom_left
    {
        top: 100%;
        left: 0;

        transform: rotate(-90deg);
    }


    .create_passport .data .bg_line .corner_bottom_right
    {
        top: 100%;
        right: 4px;
    }


    .create_passport .data .bg_left
    {
        position: absolute;
        z-index: 2;
        bottom: 90px;
        left: -22px;

        display: block;

        width: 40px;
        height: 162px;

        content: '';
        pointer-events: none;

        border-radius: 0 33px 33px 0;
        background: var(--bg);
        box-shadow: inset 0 4px 0 #1f1c1c, inset 0 4px 0 #3c3c3c;
    }

    .create_passport .data .bg_left:after
    {
        position: absolute;
        bottom: 0;
        left: 0;

        display: block;

        width: 22px;
        height: 100%;

        content: '';

        background: var(--bg);
    }


    .create_passport .data .bg_right
    {
        position: absolute;
        z-index: 2;
        top: 200px;
        right: -22px;

        display: block;

        width: 40px;
        height: 162px;

        content: '';
        pointer-events: none;

        border-radius: 33px 0 0 33px;
        background: var(--bg);
        box-shadow: inset 0 4px 0 #1f1c1c, inset 0 4px 0 #3c3c3c;
    }

    .create_passport .data .bg_right:after
    {
        position: absolute;
        right: 0;
        bottom: 0;

        display: block;

        width: 22px;
        height: 100%;

        content: '';

        background: var(--bg);
    }


    .create_passport .data .bg_bottom
    {
        position: absolute;
        z-index: 2;
        right: 224px;
        bottom: -22px;

        display: block;

        width: 252px;
        height: 34px;

        content: '';
        pointer-events: none;

        border-radius: 33px 33px 0 0;
        background: var(--bg);
        box-shadow: inset 0 4px 0 #1f1c1c, inset 0 4px 0 #3c3c3c;
    }

    .create_passport .data .bg_bottom:after
    {
        position: absolute;
        bottom: -4px;
        left: 0;

        display: block;

        width: 100%;
        height: 22px;

        content: '';

        background: var(--bg);
    }



    .create_passport .avatar
    {
        position: relative;
        z-index: 3;

        display: flex;
        flex-direction: column;

        width: 342px;
        height: 342px;
        margin-top: 30px;
        margin-bottom: 114px;

        transition: background .2s linear;
    }

    .create_passport .avatar:before
    {
        position: absolute;
        z-index: -1;
        top: -30px;
        left: -30px;

        display: block;

        width: calc(100% + 60px);
        height: calc(100% + 60px);

        content: '';

        border-radius: 70px;
        background: var(--bg);
        box-shadow: inset 0 4px 0 #1f1c1c, inset 0 4px 0 #3c3c3c;
    }


    .create_passport .avatar input
    {
        display: none;
    }


    .create_passport .avatar label
    {
        display: flex;

        padding: 24px;

        cursor: pointer;
        text-align: center;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .create_passport .avatar .box
    {
        position: relative;

        border-radius: 40px;
        background: #252525;
        box-shadow: 0 4px 0 #1f1c1c, 0 4px 0 #3c3c3c, inset 0 1px 0 rgba(91, 91, 91, .13);

        flex: 1 0 auto;
    }


    .create_passport .avatar .image
    {
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;

        overflow: hidden;

        width: 100%;
        height: 100%;

        border-radius: 40px;
    }

    .create_passport .avatar .image div
    {
        position: absolute;
        top: 0;
        left: 0;

        overflow: hidden;

        width: 100%;
        height: 100%;
    }


    .create_passport .avatar .image img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        object-fit: cover;
    }


    .create_passport .avatar .logo
    {
        position: absolute;
        top: 100%;
        left: 50%;

        display: flex;

        width: 160px;
        height: 138px;
        margin-top: 26px;

        transform: translateX(-50%);

        border-radius: 60px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .create_passport .avatar .logo:before
    {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';
        transition: background .2s linear;

        border-radius: 60px;
        background: #fff;
        box-shadow: 0 4px 0 #1f1c1c, inset 0 1px 0 rgba(91, 91, 91, .13);
    }

    .create_passport .avatar .logo:after
    {
        position: absolute;
        z-index: 1;
        top: -11px;
        left: -11px;

        display: block;

        width: calc(100% + 22px);
        height: calc(100% + 22px);

        content: '';
        transition: background .2s linear;

        background: var(--bg);
    }


    .create_passport .avatar .logo img
    {
        position: relative;
        z-index: 3;

        display: block;

        width: 126px;
        max-width: 100%;
        height: 117px;
        max-height: 100%;
    }


    .create_passport .avatar .logo .corner
    {
        position: absolute;

        width: 20px;
        height: 20px;

        background: url(../assets/images/corner_big.svg) 100% 0/15px 16px no-repeat;
    }


    .create_passport .avatar .logo .corner_top_left
    {
        top: 4px;
        right: 100%;

        margin-right: 11px;
    }


    .create_passport .avatar .logo .corner_top_right
    {
        top: 4px;
        left: 100%;

        margin-left: 11px;

        transform: scale(-1, 1);
    }


    .create_passport .avatar .logo .corner_bottom_left
    {
        right: 100%;
        bottom: -3px;

        margin-right: 11px;

        transform: scale(1, -1);
    }


    .create_passport .avatar .logo .corner_bottom_right
    {
        bottom: -3px;
        left: 100%;

        margin-left: 11px;

        transform: rotate(-180deg);
    }


    .create_passport .info
    {
        position: relative;
        z-index: 3;

        display: flex;
        flex-direction: column;

        width: 416px;
        max-width: 100%;
        min-height: 478px;
        margin-left: auto;
    }


    .create_passport .info ::-webkit-input-placeholder
    {
        color: #464646;
    }

    .create_passport .info :-moz-placeholder
    {
        color: #464646;
    }

    .create_passport .info ::-moz-placeholder
    {
        color: #464646;

        opacity: 1;
    }

    .create_passport .info :-ms-input-placeholder
    {
        color: #464646;
    }


    .create_passport .info .line
    {
        position: relative;

        margin-bottom: 12px;
        padding: 14px;

        transition: .2s linear;

        border-radius: 16px;
        background: rgba(0, 0, 0, .23);
        box-shadow: 0 4px 0 rgba(1, 1, 1, .3);
    }

    .create_passport .info .line.error
    {
        box-shadow: 0 4px 0  #eb5757;
    }


    .create_passport .info .input
    {
        color: #fff;
        font-family: var(--font_family2);
        font-size: 24px;
        font-weight: 500;

        display: block;

        width: 100%;
        height: 28px;

        border: none;
        background: none;
    }


    .create_passport .info .edit_btn
    {
        position: absolute;
        right: 14px;
        bottom: 14px;

        display: none;

        width: 24px;
        height: 24px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .create_passport .info .edit_btn svg
    {
        display: block;

        width: 24px;
        height: 24px;

        pointer-events: none;
    }

    .create_passport .data_hide:hover .info .edit_btn
    {
        display: flex;
    }


    .create_passport .info .submit_btn
    {
        position: absolute;
        z-index: 3;
        right: 42px;
        bottom: 14px;

        display: flex;

        width: 24px;
        height: 24px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .create_passport .info .submit_btn .icon
    {
        display: block;

        width: 24px;
        height: 24px;
    }


    .create_passport .info .cancel_btn
    {
        position: absolute;
        z-index: 3;
        right: 14px;
        bottom: 14px;

        display: flex;

        width: 24px;
        height: 24px;
        margin: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .create_passport .info .cancel_btn .icon
    {
        display: block;

        width: 24px;
        height: 24px;
    }


    .create_passport .info .citizenship
    {
        position: relative;
    }


    .create_passport .info .citizenship .text
    {
        color: #fdfdfd;
        font-family: var(--font_family2);
        font-size: 24px;
        font-weight: 500;
        line-height: 100%;

        width: 191px;
        max-width: 100%;
        margin-top: 155px;

        text-transform: uppercase;
    }


    .create_passport .info .citizenship .img
    {
        position: absolute;
        top: 14px;
        right: 14px;

        display: block;

        width: auto;
        max-width: 100%;
        height: 256px;
        max-height: calc(100% - 19px);

        pointer-events: none;
    }


    .create_passport .info .label
    {
        line-height: 130%;

        margin-bottom: 14px;

        opacity: .4;
    }


    .create_passport .info .exp
    {
        font-size: 12px;

        position: absolute;
        top: 17px;
        right: 16px;

        white-space: nowrap;

        opacity: .4;
    }



    .create_passport .bottom_btns
    {
        display: flex;

        height: 72px;
        margin-top: 40px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .create_passport .bottom_btns > * + *
    {
        margin-left: 20px;
    }


    .create_passport .bottom_btns .btn
    {
        color: #950fff;
        font-family: var(--font_family2);
        font-size: 24px;
        font-weight: 700;
        line-height: 70px;

        display: block;

        padding: 0 11px;

        cursor: pointer;
        text-decoration: none;
        text-transform: uppercase;

        border: 1px solid #950fff;
        border-radius: 16px;
        background: #151515;
        box-shadow: 0 4px 0 #5a1e89;
    }

    .create_passport .bottom_btns .download_btn
    {
        color: #fff;

        background: #950fff;
    }



    @keyframes spin
    {
        100%
        {
            transform: rotate(360deg);
        }
    }



    @media print, (max-width: 1279px)
    {
        .create_passport
        {
            padding-bottom: 20px;
        }


        .create_passport .back_btn
        {
            margin-bottom: 20px;
        }
    }



    @media print, (max-width: 1024px)
    {
        .create_passport
        {
            padding-bottom: 0;
        }


        .create_passport .data
        {
            padding: 40px 80px;
        }


        .create_passport .avatar
        {
            margin-right: auto;
            margin-left: auto;
        }


        .create_passport .data
        {
            height: auto;
        }

        .create_passport .data .bg_line
        {
            width: calc(50% - 196px);
        }


        .create_passport .avatar .logo:after
        {
            border-radius: 0 0 15px 15px;
        }

        .create_passport .avatar .logo .corner_bottom_left,
        .create_passport .avatar .logo .corner_bottom_right
        {
            display: none;
        }


        .create_passport .info
        {
            width: 100%;
            min-height: 0;
            margin-top: 101px;
        }
    }



    @media print, (max-width: 767px)
    {
        .create_passport .data
        {
            padding: 28px 60px 40px;
        }


        .create_passport .data .bg_line
        {
            top: 66px;

            width: calc(50% - 165px);
        }


        .create_passport .data .bg_bottom
        {
            right: 36px;
        }


        .create_passport .avatar
        {
            width: 300px;
            height: 300px;
            margin-top: 20px;
            margin-bottom: 100px;
        }

        .create_passport .avatar:before
        {
            top: -20px;
            left: -20px;

            width: calc(100% + 40px);
            height: calc(100% + 40px);

            border-radius: 48px;
        }


        .create_passport .avatar .logo
        {
            width: 124px;
            height: 116px;
            margin-top: 24px;
            padding: 16px;

            border-radius: 40px;
        }

        .create_passport .avatar .logo:before
        {
            border-radius: 40px;
        }

        .create_passport .avatar .logo:after
        {
            top: -11px;
            left: -12px;

            width: calc(100% + 24px);
            height: calc(100% + 24px);
        }

        .create_passport .avatar .image img
        {
            object-fit: cover;
        }

        .create_passport .avatar .logo .corner_top_right
        {
            top: -4px;

            margin-left: 12px;
        }

        .create_passport .avatar .logo .corner_top_left
        {
            top: -4px;

            margin-right: 12px;
        }


        .create_passport .info
        {
            width: calc(100% + 40px);
            max-width: calc(100% + 40px);
            margin: 88px -20px 0;
        }


        .create_passport .info .label
        {
            margin-bottom: 8px;
        }


        .create_passport .info .input
        {
            font-size: 20px;
        }


        .create_passport .info .citizenship .text
        {
            font-size: 20px;

            margin-top: 100px;
        }


        .create_passport .bottom_btns
        {
            height: auto;
        }

        .create_passport .bottom_btns .btn
        {
            font-size: 20px;
            line-height: 60px;
        }


        .create_passport .data .gradient
        {
            top: -70%;
            left: -70%;

            width: 240%;
            height: 240%;
        }
    }



    @media print, (max-width: 479px)
    {
        .create_passport .data
        {
            padding: 24px 40px;
        }


        .create_passport .data .bg_line
        {
            top: 60px;

            width: 32px;
        }

        .create_passport .data .bg_right
        {
            top: 240px;
            right: -28px;
        }

        .create_passport .data .bg_left
        {
            bottom: 120px;
            left: -28px;
        }

        .create_passport .data .bg_bottom
        {
            right: 24px;
        }


        .create_passport .avatar
        {
            width: 100%;
            height: 220px;
            margin-bottom: 60px;
        }

        .create_passport .avatar:before
        {
            top: -16px;
            left: -16px;

            width: calc(100% + 32px);
            height: calc(100% + 32px);

            border-radius: 48px;
        }


        .create_passport .avatar .logo
        {
            width: 92px;
            height: 88px;
            margin-top: 16px;
            padding: 12px;

            border-radius: 28px;
        }

        .create_passport .avatar .logo:before
        {
            border-radius: 28px;
        }

        .create_passport .avatar .logo .corner_top_right
        {
            top: 0;
        }

        .create_passport .avatar .logo .corner_top_left
        {
            top: 0;
        }


        .create_passport .info
        {
            width: calc(100% + 32px);
            max-width: calc(100% + 32px);
            margin: 80px -16px 0;
        }


        .create_passport .info .label
        {
            margin-bottom: 4px;
        }


        .create_passport .info .input
        {
            font-size: 18px;
        }


        .create_passport .info .citizenship .text
        {
            font-size: 18px;

            margin-top: 80px;
        }


        .create_passport .bottom_btns .btn
        {
            font-size: 18px;
            line-height: 52px;

            width: 100%;

            text-align: center;
        }

        .create_passport .bottom_btns > * + *
        {
            margin-top: 16px;
            margin-left: 0;
        }


        .create_passport .data .gradient
        {
            top: -100%;
            left: -100%;

            width: 300%;
            height: 300%;
        }
    }

</style>