<template>
    <section class="create_passport">
        <div class="cont">
            <div class="data_wrap">
                <div class="data_hide" id="completed_passport">
                    <div class="data active">
                        <div class="avatar">
                            <input type="file" id="avatar" ref="avatar" accept="image/png, image/jpeg" @change="avatarUpload">
                            <label for="avatar" class="box hide">
                                <div class="icon" v-if="!avatarPreview.status"></div>

                                <div class="label" v-if="!avatarPreview.status">
                                    {{ $t('message.passport_avatar_label') }}
                                </div>

                                <div class="exp" v-if="!avatarPreview.status">
                                    {{ $t('message.passport_avatar_file_size') }}<br>
                                    {{ $t('message.passport_avatar_mimetype_size') }}
                                </div>

                                <div class="image" :class="{'show': avatarPreview.src, 'animated': avatarPreview.src}"><div>
                                    <img :src="avatarPreview.src" alt="">
                                </div></div>
                            </label>

                            <div class="logo">
                                <img src="../assets/images/black_logo.svg" alt="">

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

                                    <input type="text" :value="data.moonAddress.slice(0, 12) + '...' + data.moonAddress.slice(-5)" class="input" readonly>
                                </div>
                            </div>

                            <div class="line">
                                <div class="field">
                                    <div class="label">
                                        {{ $t('message.passport_name_label') }}
                                    </div>

                                    <input type="text" name="name" v-model="data.nickName" class="input" readonly>
                                </div>
                            </div>

                            <div class="line citizenship">
                                <div class="field">
                                    <div class="label">
                                        {{ $t('message.passport_citizenship_label') }}
                                    </div>

                                    <div class="text">
                                        {{ $t('message.passport_citizenship_text') }}
                                    </div>

                                    <img src="../assets/images/passport_citizenship.svg" alt="" class="img">
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

                        <div class="gradient" :style="{ 'background': data.bgGradient }"></div>
                    </div>
                </div>
            </div>


            <div class="bottom_btns">
                <label for="avatar" class="btn change_image_btn" v-if="!avatarPreview.buffer.length || data.status">
                    {{ $t('message.change_image_btn') }}
                </label>

                <button class="btn update_btn" v-else @click.prevent="updatePassport">
                    {{ $t('message.update_btn') }}
                </button>

                <a :href="data.passportImage" download="my_passport.png" class="btn download_btn">
                    {{ $t('message.download_png_btn') }}
                </a>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { ref, reactive, computed, inject, onMounted } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import * as htmlToImage from 'html-to-image'
    import { toJpeg } from 'html-to-image'
    import gradient from 'random-gradient'
    import { prepareCreatePassportTx, sendTx } from '@/utils'

    const store = useGlobalStore(),
        i18n = inject('i18n'),
        notification = useNotification()

    var avatar = ref(null),
        avatarPreview = reactive({
            src: '',
            buffer: '',
            status: false
        }),
        data = reactive({
            moonAddress: computed(() => store.wallets.bostrom ? store.wallets.bostrom : ''),
            nickName: '',
            passportImage: '',
            status: false,
            bgGradient: '',
            changeImage: false,
        })


    onMounted(() => {
        // Set data from passport
        data.nickName = store.account.moonPassport.extension.nickname
        avatarPreview.src = store.account.avatar
        avatarPreview.status = true

        setTimeout(() => document.querySelector('.create_passport .avatar .image.animated').classList.remove('animated'), 800)

        // Generate gradient
        data.bgGradient = gradient(data.nickName)

        // Create passport image
        htmlToImage.toJpeg(document.getElementById('completed_passport'), { quality: 1 })
            .then(dataUrl => data.passportImage = dataUrl)
            .catch(error => console.error(error))
    })


    // // Enable change image
    // function changeImage() {
    //     avatarPreview.src = ''
    //     avatarPreview.buffer =''
    //     avatarPreview.status = false

    //     data.changeImage = true
    // }


    // Avatar upload
    function avatarUpload () {
        let formData = new FormData()

        // Reset preview
        avatarPreview.src = ''

        // File size valdate
        if(avatar.value.files[0].size / 1024 / 1024 <= 5){
            formData.append('avatar', avatar.value.files[0])

            // Get preview
            let reader = new FileReader()

            reader.onload = async () => {
                avatarPreview.buffer = Buffer(reader.result)
                avatarPreview.src = reader.result
                avatarPreview.status = true

                setTimeout(() => document.querySelector('.create_passport .avatar .image.animated').classList.remove('animated'), 800)
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

        data.status = true

        try{
            // Send avatar to IPFS
            let avatarIpfs = await store.node.add(avatar.value.files[0])

            // Prepare Tx
            let prepareResult = await prepareCreatePassportTx({
                update_avatar: {
                    new_avatar: avatarIpfs.path,
                    nickname: data.nickName
                }
            })

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
                    .then(dataUrl => data.passportImage = dataUrl)
                    .catch(error => console.error(error))

                // Get moon passport
                await store.getMoonPassport()

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
                    group: store.networks.bostrom.denom,
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
                    chain: 'bostrom',
                    tx_type: i18n.global.t('message.notification_action_update_passport')
                }
            })
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

        padding: 40px 48px 46px 92px;

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

        -webkit-animation: spin 10s linear infinite;
           -moz-animation: spin 10s linear infinite;
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


    .create_passport .avatar .icon
    {
        position: relative;

        width: 18px;
        height: 18px;
        margin: 0 auto 8px;
    }

    .create_passport .avatar .icon:before,
    .create_passport .avatar .icon:after
    {
        position: absolute;

        display: block;

        width: 100%;
        height: 2px;
        margin: auto;

        content: '';

        background: #950fff;

        inset: 0;
    }

    .create_passport .avatar .icon:after
    {
        width: 2px;
        height: 100%;
    }


    .create_passport .avatar .label
    {
        color: #950fff;
        font-family: var(--font_family2);
        font-size: 24px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;

        text-transform: uppercase;
    }


    .create_passport .avatar .exp
    {
        color: #4d4d4d;
        line-height: 130%;

        width: 100%;
        margin-top: 8px;
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
        height: 0;
    }

    .create_passport .avatar .image div.full_h
    {
        height: 100%;
    }

    .create_passport .avatar .image div:after
    {
        position: absolute;
        bottom: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 4px;

        content: '';
        transition: opacity .2s linear;

        opacity: 0;
        border-radius: 33px;
        background: #950fff;
    }

    .create_passport .avatar .image.animated div:after
    {
        opacity: 1;
    }


    .create_passport .avatar .image.show div
    {
        height: 342px;

        transition: height 1s linear;
    }


    .create_passport .avatar .image img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 342px;
        height: 342px;

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
        margin-bottom: 12px;
        padding: 14px;

        transition: .2s linear;

        border-radius: 16px;
        background: rgba(0, 0, 0, .23);
        box-shadow: 0 4px 0 rgba(1, 1, 1, .3);
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

        text-transform: lowercase;

        border: none;
        background: none;
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

        width: 212px;
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



    @-moz-keyframes spin
    {
        100%
        {
            -moz-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin
    {
        100%
        {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin
    {
        100%
        {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }

</style>