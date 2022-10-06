<template>
    <Header />

    <!-- <pre>{{ store }}</pre> -->

    <transition name="fade" mode="out-in" appear type="animation">
    <section class="notifications">
        <div class="cont">
            <div class="data">
                <div class="icon">
                    <svg><use xlink:href="/sprite.svg#ic_notification"></use></svg>
                </div>

                <span>{{ store.tooltip }}</span>
            </div>
        </div>
    </section>
    </transition>

    <RouterView />

    <ManageModal v-if="store.showManageModal" />

    <ManageSuccessModal v-if="store.showManageSuccessModal" />

    <ManageErrorModal v-if="store.showManageErrorModal" />
</template>


<script setup>
    import Header  from '../components/Header.vue'
    import ManageModal  from '../components/ManageModal.vue'
    import ManageSuccessModal  from '../components/ManageSuccessModal.vue'
    import ManageErrorModal  from '../components/ManageErrorModal.vue'

    import { inject, onMounted } from 'vue'
    import { RouterView } from 'vue-router'
    import { useGlobalStore } from '@/stores'

    import { fromBech32, toBech32 } from '@cosmjs/encoding'

    const emitter = inject('emitter'),
        i18n = inject('i18n'),
        store = useGlobalStore()


    onMounted(() => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default')

        // Change Keplr account
        window.addEventListener('keplr_keystorechange', () => {
            store.reset()
            emitter.emit('connectWallet')
        })

        // Refresh page
        if(store.auth){
            emitter.emit('connectWallet')
        }
    })


    // Event "connect wallet"
    emitter.on('connectWallet', async () => {
        // Keplr connect
        const chainId = 'cosmoshub-4',
            chainIdDesmos = 'desmos-mainnet',
            chainIdEvmos = 'evmos_9001-2'

        window.keplr.enable(chainId)

        // Desmos address
        const offlineSignerDesmos = window.getOfflineSigner(chainIdDesmos),
            accountsDesmos = await offlineSignerDesmos.getAccounts()

        // Evmos address
        const offlineSignerEvmos = window.getOfflineSigner(chainIdEvmos),
            accountsEvmos = await offlineSignerEvmos.getAccounts()

        // Cosmos address
        const offlineSigner = window.getOfflineSigner(chainId),
            accounts = await offlineSigner.getAccounts(),
            key = await window.keplr.getKey(chainId)


        if (key) {
            // Update store,
            store.$patch((state) => state.account.userName = key.name)
            store.$patch({ auth: true })


            // Wallets
            store.$patch({
                wallets: {
                    'cosmoshub': accounts[0].address,
                    'bostrom': toBech32('bostrom', fromBech32(accounts[0].address).data),
                    'osmosis': toBech32('osmo', fromBech32(accounts[0].address).data),
                    'juno': toBech32('juno', fromBech32(accounts[0].address).data),
                    'emoney': toBech32('emoney', fromBech32(accounts[0].address).data),
                    'stargaze': toBech32('stars', fromBech32(accounts[0].address).data),
                    'gravity': toBech32('gravity', fromBech32(accounts[0].address).data),
                    'evmos': accountsEvmos[0].address,
                    'crescent': toBech32('cre', fromBech32(accounts[0].address).data),
                    'omniflix': toBech32('omniflix', fromBech32(accounts[0].address).data),
                    'desmos': accountsDesmos[0].address,
                    'stride': toBech32('stride', fromBech32(accounts[0].address).data),
                }
            })


            // Avatar
            store.getAvatar()

            // Networks health
            store.getNetworksHealth()

            // Currencies price
            store.getCurrenciesPrice()

            // Networks status
            for (let network in store.networks) {
                await store.getNetworkStatus(network)
            }

            // Networks delegations tokens
            for (let network in store.networks) {
                await store.getNetworkDelegationTokens(network)
            }

            // Network rewords tokens
            for (let network in store.networks) {
                await store.getNetworkRewardTokens(network)
            }

            // Network availabel tokens
            for (let network in store.networks) {
                await store.getNetworkAvailabelTokens(network)
            }

            // Network price
            for (let network in store.networks) {
                await store.getNetworkPrice(network)
            }

            // Network balance
            for (let network in store.networks) {
                await store.getNetworkBalance(network)
            }

            // Delegations/Rewards price
            for (let network in store.networks) {
                // Delegations
                store.getDelegationsPrice(network)

                // Rewards
                store.getRewardsPrice(network)
            }

            // Networks data
            for (let network in store.networks) {
                if(network.status){
                    await store.getNetworkData(network)
                }
            }

            // Account balance
            for (let network in store.networks) {
                store.getAccountBalance(network)
            }

            if(store.account.delegations_price != 0){
                store.$patch((state) => state.account.personal_APR = state.account.RPDE_usdt * 365.3 / state.account.delegations_price * 100)
            }
        }
    })


    // Event "set notification"
    emitter.on('setNotification', function(notice) {
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


<style>
    .notifications
    {
        margin-bottom: 30px;
    }


    .notifications .data
    {
        font-size: 14px;
        line-height: 150%;

        display: flex;

        width: 953px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding: 20px;

        border-radius: 20px;
        background: #141414;

        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;
        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    .notifications .icon
    {
        display: flex;

        width: 52px;
        height: 52px;

        border: 1px solid rgba(217, 217, 217, .1);
        border-radius: 50%;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .notifications .icon svg
    {
        display: block;

        width: 30px;
        height: 30px;
    }

    .notifications .icon + *
    {
        width: calc(100% - 67px);
        margin-left: auto;
    }

    .notifications span
    {
        display: -webkit-box;
        overflow: hidden;

        text-overflow: ellipsis;

        align-self: center;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

</style>