<template>
    <!-- Header -->
    <Header />

    <!-- Notifications -->
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

    <!-- Router view -->
    <RouterView />

    <!-- Manage modal -->
    <ManageModal v-if="store.showManageModal" />

    <!-- Manage success modal -->
    <ManageSuccessModal v-if="store.showManageSuccessModal" />

    <!-- Manage error modal -->
    <ManageErrorModal v-if="store.showManageErrorModal" />

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    import { inject, onMounted } from 'vue'
    import { RouterView } from 'vue-router'
    import { useGlobalStore } from '@/stores'
    import { fromBech32, toBech32 } from '@cosmjs/encoding'

    // Components
    import Header  from '../components/Header.vue'
    import ManageModal  from '../components/ManageModal.vue'
    import ManageSuccessModal  from '../components/ManageSuccessModal.vue'
    import ManageErrorModal  from '../components/ManageErrorModal.vue'
    import Feedback  from '../components/Feedback.vue'

    // Config
    import desmosConfig from '@/config/chain/desmos'
    import crescentConfig from '@/config/chain/crescent'
    import omniflixConfig from '@/config/chain/omniflix'


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
        if(store.auth && store.recalc){
            emitter.emit('connectWallet')
        }


        // Sticky notification
        const notificatios = document.querySelector('.notifications')

        notificatios.stickyEvent = () => {
            setTimeout(() => {
                window.scrollY > 32
                    ? notificatios.classList.add('stuck')
                    : notificatios.classList.remove('stuck')
            })
        }

        document.addEventListener('DOMContentLoaded', notificatios.stickyEvent)
        document.addEventListener('scroll', notificatios.stickyEvent)
    })


    // Event "connect wallet"
    emitter.on('connectWallet', async () => {
        // Pre connect
        await store.preConnect()


        // Get currencies price
        let promiseCurrencies = await store.getCurrenciesPrice()


        //======== Evmos
        try{
            // Singer
            const offlineSignerEvmos = await window.getOfflineSigner(store.networks.evmos.chainId),
                accountsEvmos = await offlineSignerEvmos.getAccounts()

            // Set wallet address
            store.setWallet('evmos', accountsEvmos[0].address)

            // Get status
            store.getNetworkStatus('evmos')

            // Get network tokens
            store.getNetworkTokens('evmos').then(() => {
                // Calc network tokens sum
                store.calcNetworkTokensSum('evmos')

                if(store.networks.evmos.status){
                    // Get network data
                    let promiseData = store.getNetworkData('evmos')

                    Promise.all([promiseData, promiseCurrencies]).then(() => {
                        // Calc network RPDE
                        store.calcNetworkRPDEInCurrency('evmos')

                        // Calc network balance
                        store.calcNetworkBalance('evmos')

                        // Calc delegations price
                        store.calcDelegationsPrice('evmos')

                        // Calc rewards price
                        store.calcRewardsPrice('evmos')

                        // Update account balance
                        store.updateAccountBalance()
                    })
                }
            })
        } catch(error) {
            console.log(error)
        }


        //======== JUNO
        // Set wallet address
        store.setWallet('juno', toBech32('juno', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('juno')

        // Get network tokens
        store.getNetworkTokens('juno').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('juno')

            if(store.networks.juno.status){
                // Get network data
                let junoData = store.getNetworkData('juno')

                Promise.all([junoData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('juno')

                    // Calc network balance
                    store.calcNetworkBalance('juno')

                    // Calc delegations price
                    store.calcDelegationsPrice('juno')

                    // Calc rewards price
                    store.calcRewardsPrice('juno')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Cosmos hub
        // Get status
        store.getNetworkStatus('cosmoshub')

        // Get network tokens
        store.getNetworkTokens('cosmoshub').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('cosmoshub')

            if(store.networks.cosmoshub.status){
                // Get network data
                let cosmoshubData = store.getNetworkData('cosmoshub')

                Promise.all([cosmoshubData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('cosmoshub')

                    // Calc network balance
                    store.calcNetworkBalance('cosmoshub')

                    // Calc delegations price
                    store.calcDelegationsPrice('cosmoshub')

                    // Calc rewards price
                    store.calcRewardsPrice('cosmoshub')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Bostrom
        // Get status
        store.getNetworkStatus('bostrom')

        // Get network tokens
        store.getNetworkTokens('bostrom').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('bostrom')

            if(store.networks.bostrom.status){

                // Get network data
                let bostromData = store.getNetworkData('bostrom')

                Promise.all([bostromData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('bostrom')

                    // Calc network balance
                    store.calcNetworkBalance('bostrom')

                    // Calc delegations price
                    store.calcDelegationsPrice('bostrom')

                    // Calc rewards price
                    store.calcRewardsPrice('bostrom')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Osmosis
        // Set wallet address
        store.setWallet('osmosis', toBech32('osmo', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('osmosis')

        // Get network tokens
        store.getNetworkTokens('osmosis').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('osmosis')

            if(store.networks.emoney.status){
                // Get network data
                let osmosisData = store.getNetworkData('osmosis')

                Promise.all([osmosisData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('osmosis')

                    // Calc network balance
                    store.calcNetworkBalance('osmosis')

                    // Calc delegations price
                    store.calcDelegationsPrice('osmosis')

                    // Calc rewards price
                    store.calcRewardsPrice('osmosis')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== E-money
        // Set wallet address
        store.setWallet('emoney', toBech32('emoney', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('emoney')

        // Get network tokens
        store.getNetworkTokens('emoney').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('emoney')

            if(store.networks.emoney.status){
                // Get network data
                let emoneyData = store.getNetworkData('emoney')

                Promise.all([emoneyData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('emoney')

                    // Calc network balance
                    store.calcNetworkBalance('emoney')

                    // Calc delegations price
                    store.calcDelegationsPrice('emoney')

                    // Calc rewards price
                    store.calcRewardsPrice('emoney')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Gravity bridge
        // Set wallet address
        store.setWallet('gravity', toBech32('gravity', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('gravity')

        // Get network tokens
        store.getNetworkTokens('gravity').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('gravity')

            if(store.networks.gravity.status){
                // Get network data
                let gravityData = store.getNetworkData('gravity')

                Promise.all([gravityData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('gravity')

                    // Calc network balance
                    store.calcNetworkBalance('gravity')

                    // Calc delegations price
                    store.calcDelegationsPrice('gravity')

                    // Calc rewards price
                    store.calcRewardsPrice('gravity')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Stargaze
        // Set wallet address
        store.setWallet('stargaze', toBech32('stars', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('stargaze')

        // Get network tokens
        store.getNetworkTokens('stargaze').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('stargaze')

            if(store.networks.stargaze.status){
                // Get network data
                let stargazeData = store.getNetworkData('stargaze')

                Promise.all([stargazeData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('stargaze')

                    // Calc network balance
                    store.calcNetworkBalance('stargaze')

                    // Calc delegations price
                    store.calcDelegationsPrice('stargaze')

                    // Calc rewards price
                    store.calcRewardsPrice('stargaze')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Stride
        // Set wallet address
        store.setWallet('stride', toBech32('stride', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('stride')

        // Get network tokens
        store.getNetworkTokens('stride').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('stride')

            if(store.networks.stride.status){
                // Get network data
                let strideData = store.getNetworkData('stride')

                Promise.all([strideData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('stride')

                    // Calc network balance
                    store.calcNetworkBalance('stride')

                    // Calc delegations price
                    store.calcDelegationsPrice('stride')

                    // Calc rewards price
                    store.calcRewardsPrice('stride')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        const checkChains = [
            {
                chainId: 'desmos-mainnet',
                name: 'desmos',
                config: desmosConfig
            },
            {
                chainId: 'crescent-1',
                name: 'crescent',
                config: crescentConfig
            },
            {
                chainId: 'omniflixhub-1',
                name: 'omniflix',
                config: omniflixConfig
            }
        ]

        var accountsDesmos = {}


        // Check chains in Keplr
        for (let i in checkChains) {
            try{
                let offlineSigner = await window.getOfflineSignerAuto(checkChains[i].chainId),
                    accounts = await offlineSigner.getAccounts()

                if(checkChains[i].chainId == 'desmos-mainnet'){
                    accountsDesmos = accounts
                }
            } catch (error) {
                console.log(error)

                // Add chain in Keplr
                await window.keplr.experimentalSuggestChain(checkChains[i].config).then(() => store.updateNetwork(checkChains[i].name))
            }
        }


        // ======== Desmos
        // Set wallet address
        store.setWallet('desmos', accountsDesmos[0].address)

        // Get status
        store.getNetworkStatus('desmos')

        // Get network tokens
        store.getNetworkTokens('desmos').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('desmos')

            if(store.networks.desmos.status){
                // Get network data
                let desmosData = store.getNetworkData('desmos')

                Promise.all([desmosData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('desmos')

                    // Calc network balance
                    store.calcNetworkBalance('desmos')

                    // Calc delegations price
                    store.calcDelegationsPrice('desmos')

                    // Calc rewards price
                    store.calcRewardsPrice('desmos')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Crescent hub
        // Set wallet address
        store.setWallet('crescent', toBech32('cre', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('crescent')

        // Get network tokens
        store.getNetworkTokens('crescent').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('crescent')

            if(store.networks.crescent.status){
                // Get network data
                let crescentData = store.getNetworkData('crescent')

                Promise.all([crescentData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('crescent')

                    // Calc network balance
                    store.calcNetworkBalance('crescent')

                    // Calc delegations price
                    store.calcDelegationsPrice('crescent')

                    // Calc rewards price
                    store.calcRewardsPrice('crescent')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })


        //======== Omniflix hub
        // Set wallet address
        store.setWallet('omniflix', toBech32('omniflix', fromBech32(store.wallets.cosmoshub).data))

        // Get status
        store.getNetworkStatus('omniflix')

        // Get network tokens
        store.getNetworkTokens('omniflix').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('omniflix')

            if(store.networks.omniflix.status){
                // Get network data
                let omniflixData = store.getNetworkData('omniflix')

                Promise.all([omniflixData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('omniflix')

                    // Calc network balance
                    store.calcNetworkBalance('omniflix')

                    // Calc delegations price
                    store.calcDelegationsPrice('omniflix')

                    // Calc rewards price
                    store.calcRewardsPrice('omniflix')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })
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
        position: fixed;
        z-index: 89;
        top: 132px;
        left: 0;

        width: 100%;

        transition: top .2s linear;
        pointer-events: none;
    }


    .notifications .data
    {
        font-size: 14px;
        line-height: 150%;

        display: flex;

        width: 1159px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding: 19px 20px;

        transition: .2s linear;

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



    .notifications.stuck
    {
        z-index: 91;
        top: 31px;
    }

    .notifications.stuck .data
    {
        width: calc(100% - 747px);
        padding-top: 10px;
        padding-bottom: 10px;

        transform: translateX(-152px);
    }

</style>