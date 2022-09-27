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

    <transition name="fade" mode="out-in" appear type="animation">
    <ManageSuccessModal v-if="store.showManageSuccessModal" />
    </transition>
</template>


<script setup>
    import Header  from '../components/Header.vue'
    import ManageModal  from '../components/ManageModal.vue'
    import ManageSuccessModal  from '../components/ManageSuccessModal.vue'

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
            await fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${store.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`)
                .then(response => response.json())
                .then(data => {
                    data.txs
                        ? store.$patch((state) => state.account.avatar = 'https://ipfs.io/ipfs/' + data.txs[0].tx.value.msg[0].value.links[0].to)
                        : store.$patch((state) => state.account.avatar = `https://robohash.org/${store.account.userName.toLowerCase()}?set=set4`)
                })


            // Networks status
            for (let network in store.networks) {
                await fetch(`${store.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${store.wallets[network]}/validators`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.validators && data.validators.length){
                            data.validators.forEach(el => {
                                if(el == store.networks[network].validator){
                                    store.$patch((state) => state.networks[network].status = true)
                                }
                            })
                        }
                    })
            }


            // Networks health
            await fetch('https://rpc.bronbro.io/bro_data/')
				.then(response => response.json())
				.then(data => {
                    data.infos.forEach(el => {
                        if(store.networks[el.network]){
                            store.$patch((state) => {
                                state.networks[el.network].health = el.health
                                state.networks[el.network].apr = el.apr

                                switch (true) {
                                    case el.health >= 0 && el.health < 7:
                                        state.networks[el.network].health_color = 'red'
                                        break
                                    case el.health >= 7 && el.health < 13:
                                        state.networks[el.network].health_color = 'orange'
                                        break
                                    case el.health >= 13:
                                        state.networks[el.network].health_color = 'green'
                                        break
                                }

                                switch (true) {
                                    case el.apr < 0.15:
                                        state.networks[el.network].speed = 4
                                        break
                                    case el.apr >= 0.15 && el.apr < 4:
                                        state.networks[el.network].speed = 4.28378 - 1.89189 * el.apr
                                        break
                                    case el.apr >= 4:
                                        state.networks[el.network].speed = 0.5
                                        break
                                }
                            })
                        }
                    })
            })


            // Networks delegations tokens
            for (let network in store.networks) {
                if(store.networks[network].status){
                    await fetch(`${store.networks[network].lcd_api}/cosmos/staking/v1beta1/delegations/${store.wallets[network]}`)
                        .then(response => response.json())
                        .then(data => {
                            if(data.delegation_responses){
                                // Delegations tokens
                                let sum = 0
                                data.delegation_responses.forEach(el => sum += parseFloat(el.balance.amount))

                                store.$patch((state) => state.networks[network].delegations_tokens = sum / state.networks[network].exponent)

                                if(network == 'bostrom') {
                                    store.$patch((state) => state.networks.bostrom.delegations_tokens = sum)
                                }
                            }
                        })
                }
            }


            // Network rewords tokens
            for (let network in store.networks) {
                if(store.networks[network].status){
                    await fetch(`${store.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${store.wallets[network]}/rewards`)
                        .then(response => response.json())
                        .then(data => store.$patch((state) => {
                            state.networks[network].rewards_tokens = parseFloat(data.total[0].amount) / state.networks[network].exponent

                            if(network == 'bostrom') {
                                store.$patch((state) => state.networks.bostrom.rewards_tokens = parseFloat(data.total[0].amount))
                            }
                        }))
                }
            }


            // Network availabel tokens
            for (let network in store.networks) {
                await fetch(`${store.networks[network].lcd_api}/cosmos/bank/v1beta1/balances/${store.wallets[network]}`)
                    .then(response => response.json())
                    .then(data => {
                        let result = data.balances.find(e => e.denom == store.networks[network].denom)

                        if(data.balances && data.balances.length && typeof result !== "undefined"){
                            store.$patch((state) => state.networks[network].availabel_tokens = parseFloat(result.amount) / state.networks[network].exponent)

                            if(network == 'bostrom') {
                                store.$patch((state) => state.networks.bostrom.availabel_tokens = parseFloat(result.amount))
                            }
                        }

                        store.$patch((state) => state.networks[network].tokens_sum = state.networks[network].availabel_tokens + state.networks[network].delegations_tokens + state.networks[network].rewards_tokens)

                        store.$patch((state) => state.networks[network].delegations_percents = state.networks[network].delegations_tokens * 100 / state.networks[network].tokens_sum)
                        store.$patch((state) => state.networks[network].rewards_percents = state.networks[network].rewards_tokens * 100 / state.networks[network].tokens_sum)
                    })
            }


            // ATOM price
            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => store.$patch((state) => state.ATOM_price = data.cosmos.usd))

            // ETH price
            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => store.$patch((state) => state.ETH_price = data.ethereum.usd))

            // BTC price
            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => store.$patch((state) => state.BTC_price = data.bitcoin.usd))

            // Network price
            for (let network in store.networks) {
                if(store.networks[network].status){
                    await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${store.networks[network].coingecko_api}&vs_currencies=usd`)
                        .then(response => response.json())
                        .then(data => {
                            if(data[store.networks[network].coingecko_api].usd){
                                store.$patch((state) => state.networks[network].price = data[store.networks[network].coingecko_api].usd)

                                store.$patch((state) => state.networks[network].price_usdt = data[store.networks[network].coingecko_api].usd)
                                store.$patch((state) => state.networks[network].price_atom = state.networks[network].price / state.ATOM_price)
                                store.$patch((state) => state.networks[network].price_eth = state.networks[network].price / state.ETH_price)
                                store.$patch((state) => state.networks[network].price_btc = state.networks[network].price / state.BTC_price)
                            }
                        })
                }
            }


            // Network balance
            for (let network in store.networks) {
                store.$patch((state) => state.networks[network].balance_usdt = state.networks[network].tokens_sum * state.networks[network].price)
                store.$patch((state) => state.networks[network].balance_atom = state.networks[network].tokens_sum * state.networks[network].price_atom)
                store.$patch((state) => state.networks[network].balance_eth = state.networks[network].tokens_sum * state.networks[network].price_eth)
                store.$patch((state) => state.networks[network].balance_btc = state.networks[network].tokens_sum * state.networks[network].price_btc)
            }


            // Delegations/Rewards price
            for (let network in store.networks) {
                // Delegations
                store.$patch((state) => state.networks[network].delegations_price = state.networks[network].delegations_tokens * state.networks[network].price)
                store.$patch((state) => state.networks[network].delegations_price_usdt = state.networks[network].delegations_tokens * state.networks[network].price_usdt)
                store.$patch((state) => state.networks[network].delegations_price_atom = state.networks[network].delegations_tokens * state.networks[network].price_atom)
                store.$patch((state) => state.networks[network].delegations_price_eth = state.networks[network].delegations_tokens * state.networks[network].price_eth)
                store.$patch((state) => state.networks[network].delegations_price_btc = state.networks[network].delegations_tokens * state.networks[network].price_btc)

                // Rewards
                store.$patch((state) => state.networks[network].rewards_price = state.networks[network].rewards_tokens * state.networks[network].price)
                store.$patch((state) => state.networks[network].rewards_price_usdt = state.networks[network].rewards_tokens * state.networks[network].price_usdt)
                store.$patch((state) => state.networks[network].rewards_price_atom = state.networks[network].rewards_tokens * state.networks[network].price_atom)
                store.$patch((state) => state.networks[network].rewards_price_eth = state.networks[network].rewards_tokens * state.networks[network].price_eth)
                store.$patch((state) => state.networks[network].rewards_price_btc = state.networks[network].rewards_tokens * state.networks[network].price_btc)
            }


            // Networks data
            for (let network in store.networks) {
                if(store.networks[network].status){
                    await fetch(`${store.networks[network].lcd_api}/cosmos/staking/v1beta1/delegators/${store.wallets[network]}/validators`)
                        .then(response => response.json())
                        .then(data => {
                            // Validators
                            if(data.validators.length){
                                store.$patch((state) => state.networks[network].validators.push(data.validators.find(e => e.operator_address == state.networks[network].validator)))
                            }

                            // Annual provision
                            store.networks[network].validators.forEach(el => {
                                el.annual_provision = store.networks[network].delegations_tokens * store.networks[network].apr * (1 - el.commission.commission_rates.rate)

                                // Total annual provision
                                store.$patch((state) => state.networks[network].total_annual_provision += el.annual_provision)
                            })

                            // RPDE
                            store.$patch((state) => state.networks[network].RPDE = state.networks[network].total_annual_provision / 365.3)

                            store.$patch((state) => state.networks[network].RPDE_usdt = state.networks[network].price_usdt * state.networks[network].RPDE)
                            store.$patch((state) => state.networks[network].RPDE_atom = state.networks[network].price_atom * state.networks[network].RPDE)
                            store.$patch((state) => state.networks[network].RPDE_eth = state.networks[network].price_eth * state.networks[network].RPDE)
                            store.$patch((state) => state.networks[network].RPDE_btc = state.networks[network].price_btc * state.networks[network].RPDE)

                            store.$patch((state) => state.networks[network].RPDE_year_usdt = state.networks[network].RPDE_usdt * 365.3)
                            store.$patch((state) => state.networks[network].RPDE_year_atom = state.networks[network].RPDE_atom * 365.3)
                            store.$patch((state) => state.networks[network].RPDE_year_eth = state.networks[network].RPDE_eth * 365.3)
                            store.$patch((state) => state.networks[network].RPDE_year_btc = state.networks[network].RPDE_btc * 365.3)

                            // Personal APR
                            store.$patch((state) => state.networks[network].personal_APR = state.networks[network].total_annual_provision / store.networks[network].delegations_tokens * 100)
                        })
                }
            }


            // Account balance
            for (let network in store.networks) {
                store.$patch((state) => state.account.delegations_price += store.networks[network].delegations_price)

                store.$patch((state) => state.account.balance_usdt += store.networks[network].balance_usdt)
                store.$patch((state) => state.account.balance_atom += store.networks[network].balance_atom)
                store.$patch((state) => state.account.balance_eth += store.networks[network].balance_eth)
                store.$patch((state) => state.account.balance_btc += store.networks[network].balance_btc)

                store.$patch((state) => state.account.RPDE_usdt += store.networks[network].RPDE_usdt)
                store.$patch((state) => state.account.RPDE_atom += store.networks[network].RPDE_atom)
                store.$patch((state) => state.account.RPDE_eth += store.networks[network].RPDE_eth)
                store.$patch((state) => state.account.RPDE_btc += store.networks[network].RPDE_btc)
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
    emitter.on('open_manage_modal', async function(modal_data) {
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
</script>


<style>
.notifications
{
    margin-bottom: 30px;
}


.notifications .data
{
    font-size: 14px;  line-height: 150%;  display: flex;  align-content: flex-start;  align-items: flex-start;  flex-wrap: wrap;  justify-content: space-between;  width: 953px;  max-width: 100%;  margin-right: auto;  margin-left: auto;  padding: 20px;  border-radius: 20px;  background: #141414;  font-feature-settings: 'pnum' on, 'lnum' on;
}


.notifications .icon
{
    display: flex;  align-content: center;  align-items: center;  flex-wrap: wrap;  justify-content: center;  width: 52px;  height: 52px;  border: 1px solid rgba(217, 217, 217, .1);  border-radius: 50%;
}

.notifications .icon svg
{
    display: block;  width: 30px;  height: 30px;
}

.notifications .icon + *
{
    width: calc(100% - 67px);  margin-left: auto;
}

.notifications span
{
    display: -webkit-box;  overflow: hidden;  align-self: center;  -webkit-box-orient: vertical;  text-overflow: ellipsis;  -webkit-line-clamp: 2;
}

</style>