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

            store.$patch({
                wallets: {
                    'cosmos': accounts[0].address,
                    'bostrom': toBech32('bostrom', fromBech32(accounts[0].address).data),
                    'osmo': toBech32('osmo', fromBech32(accounts[0].address).data),
                    'juno': toBech32('juno', fromBech32(accounts[0].address).data),
                    'emoney': toBech32('emoney', fromBech32(accounts[0].address).data),
                    'stars': toBech32('stars', fromBech32(accounts[0].address).data),
                    'gravity': toBech32('gravity', fromBech32(accounts[0].address).data),
                    'evm': toBech32('evm', fromBech32(accounts[0].address).data),
                    'cre': toBech32('cre', fromBech32(accounts[0].address).data),
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


            // // Networks
            // await fetch(`https://lcd.cosmoshub-4.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.cosmos}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'cosmosvaloper106yp7zw35wftheyyv9f9pe69t8rteumjrx52jg'){
            //                     store.$patch((state) => { state.networks.cosmos.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.bostrom.bronbro.io/cosmos/distribution/v1beta1/delegators/bostrom1ke7kxdn29w2lrxt9dzusa6shvmwd8xm9gxm2zf/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'bostromvaloper1ydc5fy9fjdygvgw36u49yj39fr67pd9m5qexm8'){
            //                     store.$patch((state) => { state.networks.bostrom.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.osmosis-1.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.osmo}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'osmovaloper13tk45jkxgf7w0nxquup3suwaz2tx483xe832ge'){
            //                     store.$patch((state) => { state.networks.osmo.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.juno-1.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.juno}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'junovaloper1quqxfrxkycr0uzt4yk0d57tcq3zk7srm7sm6r8'){
            //                     store.$patch((state) => { state.networks.juno.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.emoney-3.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.emoney}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'emoneyvaloper149vyxd36kxpg46rralaw6eejv4d9daqc3nv642'){
            //                     store.$patch((state) => { state.networks.emoney.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.stargaze-1.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.stars}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'starsvaloper1y58hfnm90r4efhlydx0gavz57lvm7k6uulkg3h'){
            //                     store.$patch((state) => { state.networks.stars.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.gravity-bridge-3.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.gravity}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'gravityvaloper1vyd4k5j636erx5y5kdqghdu3rfjtwc48vdc7r6'){
            //                     store.$patch((state) => { state.networks.gravity.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.crescent-1.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.cre}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'crevaloper1c96vvme4k42zlvkc56fslmdpa2qj6u80xvqwau'){
            //                     store.$patch((state) => { state.networks.cre.status = true })
            //                 }
            //             })
            //         }
            //     })

            // await fetch(`https://lcd.omniflixhub-1.bronbro.io/cosmos/distribution/v1beta1/delegators/${store.wallets.omniflix}/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.validators.length){
            //             data.validators.forEach(el => {
            //                 if(el == 'omniflixvaloper1e8grpphncncw9hrutyvnlv77n5dejwcne58zk4'){
            //                    store.$patch((state) => { state.networks.omniflix.status = true })
            //                 }
            //             })
            //         }
            //     })


            // // Health
            // await fetch('https://rpc.bronbro.io/bro_data/')
			// 	.then(response => response.json())
			// 	.then(data => {
            //         data.infos.forEach(el => {
            //             if(el.network == 'cosmoshub'){
            //                 store.$patch((state) => {
            //                     state.networks.cosmos.health = el.health
            //                     state.networks.cosmos.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.cosmos.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.cosmos.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.cosmos.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.cosmos.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.cosmos.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.cosmos.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'bostrom'){
            //                 store.$patch((state) => {
            //                     state.networks.bostrom.health = el.health
            //                     state.networks.bostrom.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.bostrom.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.bostrom.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.bostrom.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.bostrom.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.bostrom.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.bostrom.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'osmosis'){
            //                 store.$patch((state) => {
            //                     state.networks.osmo.health = el.health
            //                     state.networks.osmo.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.osmo.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.osmo.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.osmo.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.osmo.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.osmo.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.osmo.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'juno'){
            //                 store.$patch((state) => {
            //                     state.networks.juno.health = el.health
            //                     state.networks.juno.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.juno.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.juno.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.juno.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.juno.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.juno.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.juno.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'emoney'){
            //                 store.$patch((state) => {
            //                     state.networks.emoney.health = el.health
            //                     state.networks.emoney.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.emoney.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.emoney.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.emoney.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.emoney.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.emoney.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.emoney.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'stargaze'){
            //                 store.$patch((state) => {
            //                     state.networks.stars.health = el.health
            //                     state.networks.stars.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.stars.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.stars.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.stars.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.stars.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.stars.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.stars.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'gravity'){
            //                 store.$patch((state) => {
            //                     state.networks.gravity.health = el.health
            //                     state.networks.gravity.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.gravity.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.gravity.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.gravity.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.gravity.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.gravity.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.gravity.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'evmos'){
            //                 store.$patch((state) => {
            //                     state.networks.evm.health = el.health
            //                     state.networks.evm.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.evm.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.evm.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.evm.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.evm.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.evm.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.evm.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'crescent'){
            //                 store.$patch((state) => {
            //                     state.networks.cre.health = el.health
            //                     state.networks.cre.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.cre.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.cre.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.cre.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.cre.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.cre.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.cre.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'omniflix'){
            //                 store.$patch((state) => {
            //                     state.networks.omniflix.health = el.health
            //                     state.networks.omniflix.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.omniflix.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.omniflix.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.omniflix.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.omniflix.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.omniflix.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.omniflix.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }

            //             if(el.network == 'desmos'){
            //                 store.$patch((state) => {
            //                     state.networks.desmos.health = el.health
            //                     state.networks.desmos.apr = el.apr

            //                     switch (true) {
            //                         case el.health >= 0 && el.health < 7:
            //                             state.networks.desmos.health_color = 'red'
            //                             break
            //                         case el.health >= 7 && el.health < 13:
            //                             state.networks.desmos.health_color = 'orange'
            //                             break
            //                         case el.health >= 13:
            //                             state.networks.desmos.health_color = 'green'
            //                             break
            //                     }

            //                     switch (true) {
            //                         case el.apr < 0.15:
            //                             state.networks.desmos.speed = 4
            //                             break
            //                         case el.apr >= 0.15 && el.apr < 4:
            //                             state.networks.desmos.speed = 4.28378 - 1.89189 * el.apr
            //                             break
            //                         case el.apr >= 4:
            //                             state.networks.desmos.speed = 0.5
            //                             break
            //                     }
            //                 })
            //             }
            //         })
            // })


            // // Delegations
            // await fetch(`https://lcd.bostrom.bronbro.io/cosmos/staking/v1beta1/delegations/bostrom1ke7kxdn29w2lrxt9dzusa6shvmwd8xm9gxm2zf`)
            //     .then(response => response.json())
            //     .then(data => {
            //         data.delegation_responses.forEach(el => {
            //             // Delegations sum
            //             store.$patch((state) => state.networks.bostrom.delegations_sum += parseFloat(el.balance.amount))
            //         })
            //     })


            // // Validators
            // await fetch(`https://lcd.bostrom.bronbro.io/cosmos/staking/v1beta1/delegators/bostrom1ke7kxdn29w2lrxt9dzusa6shvmwd8xm9gxm2zf/validators`)
            //     .then(response => response.json())
            //     .then(data => {
            //         // Validators
            //         store.$patch((state) => {
            //             state.networks.bostrom.validators.push(data.validators.find(e => e.operator_address == 'bostromvaloper1ydc5fy9fjdygvgw36u49yj39fr67pd9m5qexm8'))
            //         })

            //         // Annual provision
            //         store.networks.bostrom.validators.forEach(e => {
            //             e.annual_provision = store.networks.bostrom.delegations_sum * store.networks.bostrom.apr * (1 - e.commission.commission_rates.rate)

            //             // Total annual provision
            //             store.$patch((state) => state.networks.bostrom.total_annual_provision += e.annual_provision)
            //         })

            //         // RPDE
            //         store.$patch((state) => state.networks.bostrom.RPDE = (state.networks.bostrom.total_annual_provision / 365.3).toFixed(2))

            //         // Personal APR
            //         store.$patch((state) => state.networks.bostrom.personal_APR = (state.networks.bostrom.total_annual_provision / store.networks.bostrom.delegations_sum * 100).toFixed(2))
            //     })


            // // Price
            // await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bostrom&vs_currencies=usd`)
            //     .then(response => response.json())
            //     .then(data => {
            //         store.$patch((state) => state.networks.bostrom.price = data.bostrom.usd.toFixed(20))
            //         store.$patch((state) => state.networks.bostrom.price_usdt = data.bostrom.usd * state.networks.bostrom.delegations_sum)
            //     })

            //  await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd`)
            //     .then(response => response.json())
            //     .then(data => {
            //         store.$patch((state) => state.networks.bostrom.price_atom = state.networks.bostrom.price / data.cosmos.usd * state.networks.bostrom.delegations_sum)
            //     })

            //  await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
            //     .then(response => response.json())
            //     .then(data => {
            //         store.$patch((state) => state.networks.bostrom.price_eth = state.networks.bostrom.price / data.ethereum.usd * state.networks.bostrom.delegations_sum)
            //     })

            //  await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
            //     .then(response => response.json())
            //     .then(data => {
            //         store.$patch((state) => state.networks.bostrom.price_btc = state.networks.bostrom.price / data.bitcoin.usd * state.networks.bostrom.delegations_sum)
            //     })


            //  // Availabel
            // await fetch(`https://lcd.bostrom.cybernode.ai/cosmos/bank/v1beta1/balances/bostrom1ke7kxdn29w2lrxt9dzusa6shvmwd8xm9gxm2zf`)
            //     .then(response => response.json())
            //     .then(data => {
            //         let result = data.balances.find(e => e.denom == 'boot')

            //         store.$patch((state) => state.networks.bostrom.availabel = result.amount)
            //         store.$patch((state) => state.networks.bostrom.availabel_percents = 100 - result.amount / state.networks.bostrom.delegations_sum * 100)
            //     })


            // // Account balance
            // var balance_usdt = 0,
            //     balance_atom = 0,
            //     balance_eth = 0,
            //     balance_btc = 0

            // for (let network in store.networks) {
            //     balance_usdt += store.networks[network].price_usdt
            //     balance_atom += store.networks[network].price_atom
            //     balance_eth += store.networks[network].price_eth
            //     balance_btc += store.networks[network].price_btc

            //     store.$patch((state) => state.balance_usdt = balance_usdt.toFixed(0))
            //     store.$patch((state) => state.balance_atom = balance_atom.toFixed(2))
            //     store.$patch((state) => state.balance_eth = balance_eth.toFixed(5))
            //     store.$patch((state) => state.balance_btc = balance_btc.toFixed(5))

            //     // store.$patch((state) => state.RPDE += store.networks[network].RPDE)
            //     // store.$patch((state) => state.personal_APR += store.networks[network].personal_APR)
            // }
        }
    })


    // Event "set notification"
    emitter.on('setNotification', function(notice) {
        store.$patch({ tooltip: notice })
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