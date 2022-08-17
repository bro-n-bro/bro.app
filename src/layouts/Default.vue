<template>
    <Header />

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

    <RouterView />
</template>


<script setup>
    import Header  from '../components/Header.vue'

    import { inject, onMounted } from 'vue'
    import { RouterView } from 'vue-router'
    import { useGlobalStore } from '@/stores'
    import { SigningCosmosClient } from '@cosmjs/launchpad'
    import { fromBech32, toBech32 } from '@cosmjs/encoding'

    const emitter = inject('emitter'),
        i18n = inject('i18n'),
        store = useGlobalStore()


    onMounted(() => {
        store.tooltip = i18n.global.t('message.notice_default')
    })


    // Event "connect wallet"
    emitter.on('connectWallet', async () => {
        const chainId = 'cosmoshub-4'

        window.keplr.enable(chainId)

        const offlineSigner = window.getOfflineSigner(chainId),
            accounts = await offlineSigner.getAccounts(),
            key = await window.keplr.getKey(chainId)

        if (key) {
            // Update store
            store.$patch({ userName: key.name })
            store.$patch({ auth: true })

            const cosmJS = new SigningCosmosClient(
                'https://lcd-cosmoshub.keplr.app/rest',
                accounts[0].address,
                offlineSigner,
            )

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
                    // 'evmos': toBech32('evm', fromBech32(accounts[0].address).data),
                    'crescent': toBech32('cre', fromBech32(accounts[0].address).data),
                    'omniflix': toBech32('omniflix', fromBech32(accounts[0].address).data),
                    'desmos': toBech32('desmos', fromBech32(accounts[0].address).data),
                }
            })


            // Avatar
            await fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${store.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`)
                .then(response => response.json())
                .then(data => {
                    data.txs
                        ? store.$patch({ avatar: 'https://ipfs.io/ipfs/' + data.txs[0].tx.value.msg[0].value.links[0].to })
                        : store.$patch({ avatar: `https://robohash.org/${store.userName.toLowerCase()}?set=set4` })
                })


            // Networks data
            for (let network in store.networks) {
                await fetch(`${store.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${store.wallets[network]}/validators`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.validators && data.validators.length){
                            data.validators.forEach(el => {
                                if(el == store.networks[network].validator){
                                    store.$patch((state) => { state.networks[network].status = true })
                                }
                            })
                        }
                    })

                // await fetch(`${store.networks.bostrom.lcd_api}/cosmos/distribution/v1beta1/delegators/bostrom1ke7kxdn29w2lrxt9dzusa6shvmwd8xm9gxm2zf/validators`)
                //     .then(response => response.json())
                //     .then(data => {
                //         if(data.validators.length){
                //             data.validators.forEach(el => {
                //                 if(el == store.networks.bostrom.validator){
                //                     store.$patch((state) => { state.networks.bostrom.status = true })
                //                 }
                //             })
                //         }
                //     })
            }


            // Health
            await fetch('https://rpc.bronbro.io/bro_data/')
				.then(response => response.json())
				.then(data => {
                    data.infos.forEach(el => {
                        if(el.network != 'evmos'){
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


            // Delegations
            for (let network in store.networks) {
                await fetch(`${store.networks[network].lcd_api}/cosmos/staking/v1beta1/delegations/${store.wallets[network]}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.delegation_responses){
                            data.delegation_responses.forEach(el => {
                                // Delegations sum
                                store.$patch((state) => state.networks[network].delegations_sum += parseFloat(el.balance.amount))
                            })
                        }
                    })
            }


            // Validators
            for (let network in store.networks) {
                await fetch(`${store.networks[network].lcd_api}/cosmos/staking/v1beta1/delegators/${store.wallets[network]}/validators`)
                    .then(response => response.json())
                    .then(data => {
                        // Validators
                        if(data.validators.length){
                            store.$patch((state) => {
                                state.networks[network].validators.push(data.validators.find(e => e.operator_address == state.networks[network].validator))
                            })
                        }

                        // Annual provision
                        store.networks[network].validators.forEach(el => {
                            el.annual_provision = store.networks[network].delegations_sum * store.networks[network].apr * (1 - el.commission.commission_rates.rate)

                            // Total annual provision
                            store.$patch((state) => state.networks[network].total_annual_provision += el.annual_provision)
                        })

                        // RPDE
                        store.$patch((state) => state.networks[network].RPDE = (state.networks[network].total_annual_provision / 365.3).toFixed(2))

                        // Personal APR
                        store.$patch((state) => state.networks[network].personal_APR = (state.networks[network].total_annual_provision / store.networks[network].delegations_sum * 100).toFixed(2))
                    })
            }


            // Price
            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => {
                    store.$patch((state) => state.ATOM_price = data.cosmos.usd)
                })

            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => {
                    store.$patch((state) => state.ETH_price = data.ethereum.usd)
                })

            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => {
                    store.$patch((state) => state.BTC_price = data.bitcoin.usd)
                })

            for (let network in store.networks) {
                await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${store.networks[network].coingecko_api}&vs_currencies=usd`)
                    .then(response => response.json())
                    .then(data => {
                        if(data[store.networks[network].coingecko_api].usd){
                            store.$patch((state) => state.networks[network].price = data[store.networks[network].coingecko_api].usd.toFixed(20))
                            store.$patch((state) => state.networks[network].price_usdt = data[store.networks[network].coingecko_api].usd * state.networks[network].delegations_sum)

                            store.$patch((state) => state.networks[network].price_atom = state.networks[network].price / state.ATOM_price * state.networks[network].delegations_sum)
                            store.$patch((state) => state.networks[network].price_eth = state.networks[network].price / state.ETH_price * state.networks[network].delegations_sum)
                            store.$patch((state) => state.networks[network].price_btc = state.networks[network].price / state.BTC_price * state.networks[network].delegations_sum)
                        }
                    })
            }


             // Availabel
             for (let network in store.networks) {
                await fetch(`${store.networks[network].lcd_api}/cosmos/bank/v1beta1/balances/${store.wallets[network]}`)
                    .then(response => response.json())
                    .then(data => {
                        let result = data.balances.find(e => e.denom == store.networks[network].denom)

                        if(data.balances && data.balances.length && result){
                            store.$patch((state) => state.networks[network].availabel = result.amount)
                            store.$patch((state) => state.networks[network].availabel_percents = 100 - result.amount / state.networks[network].delegations_sum * 100)
                        }
                    })
            }


            // Account balance
            var balance_usdt = 0,
                balance_atom = 0,
                balance_eth = 0,
                balance_btc = 0

            for (let network in store.networks) {
                balance_usdt += store.networks[network].price_usdt
                balance_atom += store.networks[network].price_atom
                balance_eth += store.networks[network].price_eth
                balance_btc += store.networks[network].price_btc

                store.$patch((state) => state.balance_usdt = balance_usdt.toFixed(0))
                store.$patch((state) => state.balance_atom = balance_atom.toFixed(2))
                store.$patch((state) => state.balance_eth = balance_eth.toFixed(5))
                store.$patch((state) => state.balance_btc = balance_btc.toFixed(5))

                // store.$patch((state) => state.RPDE += store.networks[network].RPDE)
                // store.$patch((state) => state.personal_APR += store.networks[network].personal_APR)
            }
        }
    })


    // Event "set notification"
    emitter.on('setNotification', function(notice) {
        store.$patch({ tooltip: notice })
    })
</script>


<style>
`.notifications
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

    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    font-feature-settings: 'pnum' on, 'lnum' on;
}


.notifications .icon
{
    display: flex;

    width: 52px;
    height: 52px;

    border: 1px solid rgba(217, 217, 217, .1);
    border-radius: 50%;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
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
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

</style>