<template>
    <!-- Header -->
    <Header />

    <!-- Router view -->
    <RouterView />

    <!-- Manage modal -->
    <ManageModal v-if="store.showManageModal" />

    <!-- Manage modal -->
    <MakeChoice v-if="store.showMakeChoice" />

    <!-- Feedback -->
    <Feedback />

    <!-- Footer -->
    <Footer />
</template>


<script setup>
    import { inject, onBeforeMount } from 'vue'
    import { RouterView } from 'vue-router'
    import { useGlobalStore } from '@/stores'
    import { preConnectWallet, connectWallet } from '@/utils'

    // Components
    import Header from '../components/Header.vue'
    import ManageModal from '../components/modal/ManageModal.vue'
    import MakeChoice from '../components/MakeChoice.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'


    const emitter = inject('emitter'),
        i18n = inject('i18n'),
        store = useGlobalStore()


    onBeforeMount(() => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default')


        // Change Keplr account
        window.addEventListener('keplr_keystorechange', () => {
            store.reset()
            emitter.emit('connectWallet')
        })


        // Load/Refresh page
        emitter.emit('preConnectWallet')
    })


    // Event "pre connect wallet"
    emitter.on('preConnectWallet', async () => {
        await preConnectWallet()

        emitter.emit('connectWallet')
    })


    // Event "connect wallet"
    emitter.on('connectWallet', async () => await connectWallet())


    // Event "set notification"
    emitter.on('setNotification', notice => {
        store.$patch({ tooltip: notice })
    })


    // Event "open manage modal"
    emitter.on('open_manage_modal', async function(modal_data = { network: store.networkManageModal }) {
        await fetch(`${store.networks[modal_data.network].lcd_api}/cosmos/staking/v1beta1/params`)
            .then(response => response.json())
            .then(data => {
                store.$patch((state) => {
                    state.showManageModal = true,
                    state.networkManageModal = modal_data.network,
                    state.networks[modal_data.network].unbonding_time = parseInt(data.params.unbonding_time)
                })

                document.body.classList.add('lock')
            })
    })


    // Event "close manage modal"
    emitter.on('close_manage_modal', function() {
        store.$patch({ showManageModal: false })

        document.body.classList.remove('lock')
    })


    // Event "open manage success modal"
    emitter.on('open_manage_success_modal', async function() {
        store.$patch({ showManageSuccessModal: true })

        document.body.classList.add('lock')
    })


    // Event "close manage success modal"
    emitter.on('close_manage_success_modal', function() {
        store.$patch({ showManageSuccessModal: false })

        document.body.classList.remove('lock')
    })


    // Event "open manage error modal"
    emitter.on('open_manage_error_modal', async function() {
        store.$patch({ showManageErrorModal: true })

        document.body.classList.add('lock')
    })


    // Event "close manage error modal"
    emitter.on('close_manage_error_modal', function() {
        store.$patch({ showManageErrorModal: false })

        document.body.classList.remove('lock')
    })
</script>