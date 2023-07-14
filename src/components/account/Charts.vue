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
    <ChartStakeLiquide v-if="chartActive == 1 || chartActive == 2" :chartActive="chartActive" />
    <!-- <ChartStake v-if="chartActive == 1" />

    <ChartLiquide v-if="chartActive == 2" /> -->

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
    import ChartStakeLiquide from '@/components/account/charts/ChartStakeLiquide.vue'
    // import ChartStake from '@/components/account/charts/ChartStake.vue'
    // import ChartLiquide from '@/components/account/charts/ChartLiquide.vue'
    import ChartAccounts from '@/components/account/charts/ChartAccounts.vue'
    import ChartAssets from '@/components/account/charts/ChartAssets.vue'
    import ChartNetworks from '@/components/account/charts/ChartNetworks.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        loading = store.demo ? ref(false) : ref(true),
        chartActive = ref(1)


    onBeforeMount(async () => {
        // Get data
        if(!store.demo) {
            await getData()
        }
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


    // Event "change active chart"
    emitter.on('changeActiveChart', chartIndex => chartActive.value = chartIndex)
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