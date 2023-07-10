<template>
    <div class="tabs">
        <button class="btn" :class="{'active': chartActive == 1}" @click.prevent="chartActive = 1" @mouseover="emitter.emit('setNotification', $t('message.notice_account_charts_tab_stake'))">
            {{ $t('message.account_charts_tab_stake') }}
        </button>

        <button class="btn" :class="{'active': chartActive == 2}" @click.prevent="chartActive = 2" @mouseover="emitter.emit('setNotification', $t('message.notice_account_charts_tab_liquide'))">
            {{ $t('message.account_charts_tab_liquide') }}
        </button>

        <button class="btn" :class="{'active': chartActive == 3}" @click.prevent="chartActive = 3" @mouseover="emitter.emit('setNotification', $t('message.notice_account_charts_tab_accounts'))">
            {{ $t('message.account_charts_tab_accounts') }}
        </button>

        <button class="btn" :class="{'active': chartActive == 4}" @click.prevent="chartActive = 4" @mouseover="emitter.emit('setNotification', $t('message.notice_account_charts_tab_assets'))">
            {{ $t('message.account_charts_tab_assets') }}
        </button>

        <button class="btn" :class="{'active': chartActive == 5}" @click.prevent="chartActive = 5" @mouseover="emitter.emit('setNotification', $t('message.notice_account_charts_tab4'))">
            {{ $t('message.account_charts_tab_networks') }}
        </button>
    </div>


    <div class="loader_wrap" v-if="loading">
        <div class="loader"><span></span></div>
    </div>


    <template v-else>
    <ChartStake v-if="chartActive == 1" />

    <ChartLiquide v-if="chartActive == 2" />

    <ChartAccounts v-if="chartActive == 3" />

    <ChartAssets v-if="chartActive == 4" />

    <ChartNetworks v-if="chartActive == 5" />
    </template>
</template>


<script setup>
    import { onBeforeMount, ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    // Components
    import ChartStake from '@/components/account/charts/ChartStake.vue'
    import ChartLiquide from '@/components/account/charts/ChartLiquide.vue'
    import ChartAccounts from '@/components/account/charts/ChartAccounts.vue'
    import ChartAssets from '@/components/account/charts/ChartAssets.vue'
    import ChartNetworks from '@/components/account/charts/ChartNetworks.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        loading = ref(true),
        chartActive = ref(1)


    onBeforeMount(async () => {
        // Get data
        await getData()
    })


    // Get data
    async function getData() {
        // Set loader
        loading.value = true

        // Get cosmos hub data
        const cosmosNetworkPrice = store.prices.find(el => el.symbol == 'ATOM').price

        for (let wallet of store.account.wallets) {
            try {
                await fetch(`https://rpc.bronbro.io/account/account_balance/${generateAddress(store.networks.cosmoshub.address_prefix, wallet.address)}`)
                    .then(res => res.json())
                    .then(response => {
                        let totals = {
                            liquid: 0,
                            staked: 0,
                            unbonding: 0,
                            rewards: 0,
                            outside: 0,
                            ibc: 0,
                            liquid_rewards: 0
                        },
                        groupByDenom = []


                        // Clean data
                        if(response.liquid && response.liquid.native) {
                            for (let i = response.liquid.native.length - 1; i >= 0; i--) {
                                if (response.liquid.native[i].symbol === null || response.liquid.native[i].exponent === null || response.liquid.native[i].price === null) {
                                    response.liquid.native.splice(i, 1)
                                }
                            }
                        }

                        if(response.liquid && response.liquid.ibc) {
                            for (let i = response.liquid.ibc.length - 1; i >= 0; i--) {
                                if (response.liquid.ibc[i].symbol === null || response.liquid.ibc[i].exponent === null || response.liquid.ibc[i].price === null) {
                                    response.liquid.ibc.splice(i, 1)
                                }
                            }
                        }

                        if(response.staked) {
                            for (let i = response.staked.length - 1; i >= 0; i--) {
                                if (response.staked[i].symbol === null || response.staked[i].exponent === null || response.staked[i].price === null) {
                                    response.staked.splice(i, 1)
                                }
                            }
                        }

                        if(response.unbonding) {
                            for (let i = response.unbonding.length - 1; i >= 0; i--) {
                                if (response.unbonding[i].symbol === null || response.unbonding[i].exponent === null || response.unbonding[i].price === null) {
                                    response.unbonding.splice(i, 1)
                                }
                            }
                        }

                        if(response.rewards) {
                            for (let i = response.rewards.length - 1; i >= 0; i--) {
                                if (response.rewards[i].symbol === null || response.rewards[i].exponent === null || response.rewards[i].price === null) {
                                    response.rewards.splice(i, 1)
                                }
                            }
                        }


                        // Calc liquid tokens
                        if(response.liquid && response.liquid.native) {
                            response.liquid.native.forEach(el => {
                                // Sum total
                                totals.liquid += el.amount
                                totals.liquid_rewards += el.amount

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent)
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent),
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc ibc tokens
                        if(response.liquid && response.liquid.ibc) {
                            response.liquid.ibc.forEach(el => {
                                // Convert to current denom
                                el.amountCurrentDenom = el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)

                                // Sum total
                                totals.ibc += parseFloat(el.amountCurrentDenom * Math.pow(10, store.networks.cosmoshub.exponent))

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent)
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent),
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc staked tokens
                        if(response.staked) {
                            response.staked.forEach(el => {
                                // Sum total
                                totals.staked += el.amount

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent)
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent),
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc unbonding tokens
                        if(response.unbonding) {
                            response.unbonding.forEach(el => {
                                // Sum total
                                totals.unbonding += el.amount

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent)
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent),
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }

                        // Calc rewards tokens
                        if(response.rewards) {
                            response.rewards.forEach(el => {
                                // Convert to current denom
                                el.amountCurrentDenom = el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)

                                // Sum total
                                if(el.amount * Math.pow(10, el.exponent) >= 1) {
                                    totals.rewards += parseFloat(el.amountCurrentDenom * Math.pow(10, store.networks.cosmoshub.exponent))
                                }

                                totals.liquid_rewards = totals.liquid + totals.rewards

                                // Group by denom
                                let duplicate = groupByDenom.find(e => e.symbol == el.symbol)

                                if(duplicate) {
                                    duplicate.amount += (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent)
                                } else {
                                    groupByDenom.push({
                                        'amount': (el.amount / Math.pow(10, el.exponent) * (el.price / cosmosNetworkPrice)) * Math.pow(10, store.networks.cosmoshub.exponent),
                                        'logo': el.logo,
                                        'symbol': el.symbol
                                    })
                                }
                            })
                        }


                        // Set data in network
                        let currentNetworkInWallet = wallet.networks.find(network => network.name == 'cosmoshub')

                        currentNetworkInWallet.address = response.address
                        currentNetworkInWallet.total = totals

                        currentNetworkInWallet.totalTokens = 0
                        currentNetworkInWallet.totalTokens += totals.liquid + totals.staked + totals.unbonding + totals.rewards + totals.outside + totals.ibc

                        currentNetworkInWallet.balance = {
                            liquid: {
                                native: response.liquid && response.liquid.native ? response.liquid.native : null,
                                ibc: response.liquid && response.liquid.ibc ? response.liquid.ibc : null
                            },
                            staked: response.staked,
                            unbonding: response.unbonding,
                            rewards: response.rewards,
                            groupByDenom: groupByDenom.sort((a, b) => {
                                if (a.amount > b.amount) { return -1 }
                                if (a.amount < b.amount) { return 1 }
                                return 0
                            })
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }


        // Sum wallet total tokens
        for (let wallet of store.account.wallets) {
            wallet.totalTokens = 0

            for (let network of wallet.networks) {
                wallet.totalTokens += network.totalTokens
            }
        }


        // Sum account total tokens
        store.account.totalTokens = 0

        for (let wallet of store.account.wallets) {
            store.account.totalTokens += wallet.totalTokens
        }


        // Hide loader
        loading.value = false
    }


    // Set actual data
    function setActualData() {
        if(store.account.currentWallet != 'all') {
            // Get current walllet data
            // currentData.value = store.account.wallets.find(el => el.address == store.account.currentWallet)

            // Get current network data
            // currentNetwork.value = currentData.value.networks.find(el => el.name == 'cosmoshub')

            // Calc charts totals
            // totalChartFirst.value = currentNetwork.value.total.staked + currentNetwork.value.total.liquid_rewards + currentNetwork.value.total.unbonding

            // currentNetwork.value.balance.groupByDenom.forEach(el => totalChartThird.value += el.amount)


            // Set data for first chart
            // chartDatasetsFirst.push(currentNetwork.value.total.staked)
            // chartDatasetsFirst.push(currentNetwork.value.total.liquid_rewards)
            // chartDatasetsFirst.push(currentNetwork.value.total.unbonding)


            // Set data for second chart
            // chartDatasetsSecond.push(currentNetwork.value.total.liquid)
            // chartDatasetsSecond.push(currentNetwork.value.total.ibc)
            // chartDatasetsSecond.push(currentNetwork.value.total.rewards)


            // Set data for third chart
            // currentNetwork.value.balance.groupByDenom.forEach(el => {
            //     chartDatasetsThird.push(el.amount)

            //     let color = store.networkColors[el.symbol]

            //     if(el.symbol.substring(0, 2) == 'st') {
            //         color = store.networkColors.STRD
            //     }

            //     if(el.symbol.substring(0, 3) == 'stk') {
            //         color = store.networkColors.XPRT
            //     }

            //     if(el.symbol.substring(0, 1) == 'q') {
            //         color = store.networkColors.QCK
            //     }

            //     chartColorsThird.push(color)
            // })


            // Set data for fourth chart
            // currentData.value.networks.forEach(network => {
            //     chartDatasetsFourth.push(network.totalPrice_usdt)
            //     chartColorsFourth.push(network.color)
            // })
        } else {
            let totals = {
                liquid: 0,
                staked: 0,
                unbonding: 0,
                rewards: 0,
                outside: 0,
                ibc: 0,
                liquid_rewards: 0
            },
            allGroupByDenom = []


            // Get current walllet data
            // for (let wallet of store.account.wallets) {
            //     currentData.value.totalPrice_usdt += wallet.totalPrice_usdt,
            //     currentData.value.totalPrice_eth += wallet.totalPrice_eth,
            //     currentData.value.totalPrice_btc += wallet.totalPrice_btc,
            //     currentData.value.totalPrice_atom += wallet.totalPrice_atom
            // }

            // Get current network data
            currentNetwork.value = store.account.wallets[0].networks.find(el => el.name == 'cosmoshub')


            // Calc charts totals
            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    if(network.name == 'cosmoshub') {
                        totals.liquid += network.total.liquid,
                        totals.staked += network.total.staked ,
                        totals.unbonding += network.total.unbonding,
                        totals.rewards += network.total.rewards,
                        totals.outside += network.total.outside,
                        totals.ibc += network.total.ibc,
                        totals.liquid_rewards += network.total.liquid_rewards

                        network.balance.groupByDenom.forEach(el => totalChartThird.value += el.amount)
                    }
                }
            }

            // totalChartFirst.value = totals.staked + totals.liquid_rewards + totals.unbonding


            // Balance
            let i = 0

            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    if(network.name == 'cosmoshub') {
                        // Concat ibc
                        if(i && network.balance.liquid.ibc != null) {
                            network.balance.liquid.ibc.forEach(el => {
                                if(currentNetwork.value.balance.liquid.ibc != null) {
                                    let duplicate = currentNetwork.value.balance.liquid.ibc.find(e => e.symbol == el.symbol)

                                    duplicate
                                        ? duplicate.amount += el.amount
                                        : currentNetwork.value.balance.liquid.ibc.push(el)
                                } else {
                                    currentNetwork.value.balance.liquid.ibc = []
                                    currentNetwork.value.balance.liquid.ibc.push(el)
                                }
                            })
                        }

                        // Group by denom
                        network.balance.groupByDenom.forEach(el => {
                            let duplicate = allGroupByDenom.find(e => e.symbol == el.symbol)

                            if(duplicate) {
                                duplicate.amount += el.amount
                            } else {
                                allGroupByDenom.push({
                                    'amount': el.amount,
                                    'logo': el.logo,
                                    'symbol': el.symbol
                                })
                            }
                        })

                        i++
                    }
                }
            }

            allGroupByDenom.sort((a, b) => {
                if (a.amount > b.amount) { return -1 }
                if (a.amount < b.amount) { return 1 }
                return 0
            })


            // Set data for first chart
            // chartDatasetsFirst.push(totals.staked)
            // chartDatasetsFirst.push(totals.liquid_rewards)
            // chartDatasetsFirst.push(totals.unbonding)


            // Set data for second chart
            // chartDatasetsSecond.push(totals.liquid)
            // chartDatasetsSecond.push(totals.ibc)
            // chartDatasetsSecond.push(totals.rewards)


            // Set data for first/second legends
            // currentNetwork.value.total = totals


            // Set data for third chart
            allGroupByDenom.forEach(el => {
                chartDatasetsThird.push(el.amount)

                let color = store.networkColors[el.symbol]

                if(el.symbol.substring(0, 2) == 'st') {
                    color = store.networkColors.STRD
                }

                if(el.symbol.substring(0, 3) == 'stk') {
                    color = store.networkColors.XPRT
                }

                if(el.symbol.substring(0, 1) == 'q') {
                    color = store.networkColors.QCK
                }

                chartColorsThird.push(color)
            })


            // Set data for third legends
            currentNetwork.value.balance.groupByDenom = allGroupByDenom


            // Set data for fourth chart
            let cosmosHubWalletTotalPrice_usdt = 0,
                cosmosHubWalletTotalPrice_atom = 0,
                cosmosHubWalletTotalPrice_btc = 0,
                cosmosHubWalletTotalPrice_eth = 0

            for (let wallet of store.account.wallets) {
                for (let network of wallet.networks) {
                    if(network.name == 'cosmoshub') {
                        cosmosHubWalletTotalPrice_usdt += network.totalPrice_usdt
                        cosmosHubWalletTotalPrice_atom += network.totalPrice_atom
                        cosmosHubWalletTotalPrice_btc += network.totalPrice_ubttc
                        cosmosHubWalletTotalPrice_eth += network.totalPrice_eth
                    }
                }
            }

            // Set data for fourth legends
            currentData.value.networks.push({
                name: 'cosmoshub',
                totalPrice_usdt: cosmosHubWalletTotalPrice_usdt,
                totalPrice_eth: cosmosHubWalletTotalPrice_eth,
                totalPrice_btc: cosmosHubWalletTotalPrice_btc,
                totalPrice_atom: cosmosHubWalletTotalPrice_atom
            })

            // Set data to chart
            chartDatasetsFourth.push(cosmosHubWalletTotalPrice_usdt)
            chartColorsFourth.push(currentNetwork.value.color)
        }
    }
</script>


<style scoped>
    .tabs
    {
        display: flex;

        width: 100%;
        margin-bottom: 24px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }


    .tabs .btn
    {
        color: #555;
        font-size: 16px;
        line-height: 100%;

        display: block;

        width: 100%;
        min-height: 62px;
        padding: 10px 0 9px;

        text-align: center;

        border-bottom: 1px solid rgba(255, 255, 255, .1);
    }

    .tabs .btn + .btn
    {
        margin-left: 4px;
    }

    .tabs .btn:hover,
    .tabs .btn.active
    {
        color: #950fff;

        border-color: #950fff;
    }


    .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 0;

        background: none;
    }

</style>