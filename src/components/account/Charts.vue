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
    import { onBeforeMount, ref, inject, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress, formatTokenAmount, formatAmountToCurrentDenom, formatTokenPrice } from '@/utils'

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
        !store.demo
            ? await getData()
            : getDemoData()
    })


    // Get data
    async function getData() {
        // Set loader
        loading.value = true

        for (const wallet of store.account.wallets) {
            for (const network of wallet.networks) {
                try {
                    // Set network info
                    await fetch(`${store.networks[network.name].index_api}/account/account_balance/${generateAddress(store.networks[network.name].address_prefix, wallet.address)}`)
                        .then(res => res.json())
                        .then(response => {
                            // Clear previous data
                            network.total = reactive({
                                liquid: 0,
                                staked: 0,
                                unbonding: 0,
                                rewards: 0,
                                outside: 0,
                                ibc: 0,
                                liquid_rewards: 0
                            })
                            network.totalRewardsPrice = 0
                            network.totalTokensPrice = 0
                            network.groupByDenom = []


                            // Clean data
                            if(response.liquid && response.liquid.native) {
                                for (let i = response.liquid.native.length - 1; i >= 0; i--) {
                                    if (response.liquid.native[i].symbol === null || !('exponent' in response.liquid.native[i]) || !response.liquid.native[i].price) {
                                        response.liquid.native.splice(i, 1)
                                    }
                                }
                            }

                            if(response.liquid && response.liquid.ibc) {
                                for (let i = response.liquid.ibc.length - 1; i >= 0; i--) {
                                    if (response.liquid.ibc[i].symbol === null || !('exponent' in response.liquid.ibc[i]) || !response.liquid.ibc[i].price) {
                                        response.liquid.ibc.splice(i, 1)
                                    }
                                }
                            }

                            if(response.staked) {
                                for (let i = response.staked.length - 1; i >= 0; i--) {
                                    if (response.staked[i].symbol === null || !('exponent' in response.staked[i]) || !response.staked[i].price) {
                                        response.staked.splice(i, 1)
                                    }
                                }
                            }

                            if(response.unbonding) {
                                for (let i = response.unbonding.length - 1; i >= 0; i--) {
                                    if (response.unbonding[i].symbol === null || !('exponent' in response.unbonding[i]) || !response.unbonding[i].price) {
                                        response.unbonding.splice(i, 1)
                                    }
                                }
                            }

                            if(response.rewards) {
                                for (let i = response.rewards.length - 1; i >= 0; i--) {
                                    if (response.rewards[i].symbol === null || !('exponent' in response.rewards[i]) || !response.rewards[i].price) {
                                        response.rewards.splice(i, 1)
                                    }
                                }
                            }


                            // Calc liquid native tokens
                            if(response.liquid && response.liquid.native) {
                                response.liquid.native.forEach(el => {
                                    let amount = formatTokenAmount(el.amount, el.symbol),
                                        amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                                    // Sum total
                                    network.total.liquid += amount
                                    network.total.liquid_rewards += amount

                                    // Calc tokens price
                                    network.totalTokensPrice += amount * formatTokenPrice(el.price, el.symbol)

                                    // Group by denom
                                    let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                                    if(duplicate) {
                                        duplicate.amount += amount
                                        duplicate.amountCurrentDenom += amountCurrentDenom
                                    } else {
                                        network.groupByDenom.push({
                                            'amount': amount,
                                            'amountCurrentDenom': amountCurrentDenom,
                                            'logo': el.logo,
                                            'symbol': el.symbol
                                        })
                                    }
                                })
                            }

                            // Calc ibc tokens
                            if(response.liquid && response.liquid.ibc) {
                                response.liquid.ibc.forEach(el => {
                                    let amount = formatTokenAmount(el.amount, el.symbol),
                                        amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                                    // Sum total
                                    network.total.ibc += amountCurrentDenom

                                    // Calc tokens price
                                    network.totalTokensPrice += amount * formatTokenPrice(el.price, el.symbol)

                                    // Group by denom
                                    let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                                    if(duplicate) {
                                        duplicate.amount += amount
                                        duplicate.amountCurrentDenom += amountCurrentDenom
                                    } else {
                                        network.groupByDenom.push({
                                            'amount': amount,
                                            'amountCurrentDenom': amountCurrentDenom,
                                            'logo': el.logo,
                                            'symbol': el.symbol
                                        })
                                    }
                                })
                            }

                            // Calc staked tokens
                            if(response.staked) {
                                response.staked.forEach(el => {
                                    let amount = formatTokenAmount(el.amount, el.symbol),
                                        amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                                    // Sum total
                                    network.total.staked += amount

                                    // Calc tokens price
                                    network.totalTokensPrice += amount * formatTokenPrice(el.price, el.symbol)

                                    // Group by denom
                                    let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                                    if(duplicate) {
                                        duplicate.amount += amount
                                        duplicate.amountCurrentDenom += amountCurrentDenom
                                    } else {
                                        network.groupByDenom.push({
                                            'amount': amount,
                                            'amountCurrentDenom': amountCurrentDenom,
                                            'logo': el.logo,
                                            'symbol': el.symbol
                                        })
                                    }
                                })
                            }

                            // Calc unbonding tokens
                            if(response.unbonding) {
                                response.unbonding.forEach(el => {
                                    let amount = formatTokenAmount(el.amount, el.symbol),
                                        amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                                    // Sum total
                                    network.total.unbonding += amount

                                    // Calc tokens price
                                    network.totalTokensPrice += amount * formatTokenPrice(el.price, el.symbol)

                                    // Group by denom
                                    let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                                    if(duplicate) {
                                        duplicate.amount += amount
                                        duplicate.amountCurrentDenom += amountCurrentDenom
                                    } else {
                                        network.groupByDenom.push({
                                            'amount': amount,
                                            'amountCurrentDenom': amountCurrentDenom,
                                            'logo': el.logo,
                                            'symbol': el.symbol
                                        })
                                    }
                                })
                            }

                            // Calc rewards tokens
                            if(response.rewards) {
                                response.rewards.forEach(el => {
                                    let amount = formatTokenAmount(el.amount, el.symbol),
                                        amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                                    // Sum total
                                    network.total.rewards += amount

                                    // Calc tokens rewards price
                                    network.totalRewardsPrice += amount * formatTokenPrice(el.price, el.symbol)

                                    // Calc tokens price
                                    network.totalTokensPrice += amount * formatTokenPrice(el.price, el.symbol)

                                    // Group by denom
                                    if (store.prices.find(e => e.symbol == el.symbol)) {
                                        let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                                        if(duplicate) {
                                            duplicate.amount += amount
                                            duplicate.amountCurrentDenom += amountCurrentDenom
                                        } else {
                                            network.groupByDenom.push({
                                                'amount': amount,
                                                'amountCurrentDenom': amountCurrentDenom,
                                                'logo': el.logo,
                                                'symbol': el.symbol
                                            })
                                        }
                                    }
                                })
                            }

                            // Set network data
                            network.address = response.address

                            network.total.liquid_rewards = network.total.liquid + network.total.rewards

                            network.balance = {
                                liquid: {
                                    native: response.liquid && response.liquid.native ? response.liquid.native : null,
                                    ibc: response.liquid && response.liquid.ibc ? response.liquid.ibc : null
                                },
                                staked: response.staked,
                                unbonding: response.unbonding,
                                rewards: response.rewards
                            }

                            // Sort data
                            network.groupByDenom.sort((a, b) => {
                                if (a.amountCurrentDenom > b.amountCurrentDenom) { return -1 }
                                if (a.amountCurrentDenom < b.amountCurrentDenom) { return 1 }
                                return 0
                            })
                        })
                } catch (error) {
                    console.error(error)
                }
            }
        }

        // Total tokens price
        store.account.totalTokensPrice = 0

        for (let wallet of store.account.wallets) {
            wallet.totalTokensPrice = 0

            for (let network of wallet.networks) {
                // Sum wallet total tokens price
                wallet.totalTokensPrice += network.totalTokensPrice

                // Sum account total tokens price
                store.account.totalTokensPrice += network.totalTokensPrice
            }
        }

        // Total rewards price
        store.account.totalRewardsPrice = 0

        for (let wallet of store.account.wallets) {
            wallet.totalRewardsPrice = 0

            for (let network of wallet.networks) {
                // Sum wallet total rewards price
                wallet.totalRewardsPrice += network.totalRewardsPrice

                // Sum account total rewards price
                store.account.totalRewardsPrice += network.totalRewardsPrice
            }
        }

        // Hide loader
        loading.value = false
    }


    // Get demo data
    function getDemoData() {
        // Set loader
        loading.value = true

        for (const wallet of store.account.wallets) {
            for (const network of wallet.networks) {
                // Clear previous data
                network.total = reactive({
                    liquid: 0,
                    staked: 0,
                    unbonding: 0,
                    rewards: 0,
                    outside: 0,
                    ibc: 0,
                    liquid_rewards: 0
                })
                network.totalRewardsPrice = 0
                network.totalTokensPrice = 0
                network.groupByDenom = []


                // Calc liquid tokens
                if(network.balance.liquid && network.balance.liquid.native) {
                    network.balance.liquid.native.forEach(el => {
                        let amount = formatTokenAmount(el.amount, el.symbol),
                            amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                        // Sum total
                        network.total.liquid += amount
                        network.total.liquid_rewards += amount

                        // Calc tokens price
                        network.totalTokensPrice += amount * formatTokenPrice(store.prices.find(e => e.symbol == el.symbol).price, el.symbol)

                        // Group by denom
                        let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                        if(duplicate) {
                            duplicate.amount += amount
                            duplicate.amountCurrentDenom += amountCurrentDenom
                        } else {
                            network.groupByDenom.push({
                                'amount': amount,
                                'amountCurrentDenom': amountCurrentDenom,
                                'logo': el.logo,
                                'symbol': el.symbol
                            })
                        }
                    })
                }


                // Calc ibc tokens
                if(network.balance.liquid && network.balance.liquid.ibc) {
                    network.balance.liquid.ibc.forEach(el => {
                        let amount = formatTokenAmount(el.amount, el.symbol),
                            amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                        // Sum total
                        network.total.ibc += amountCurrentDenom

                        // Calc tokens price
                        network.totalTokensPrice += amount * formatTokenPrice(store.prices.find(e => e.symbol == el.symbol).price, el.symbol)

                        // Group by denom
                        let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                        if(duplicate) {
                            duplicate.amount += amount
                            duplicate.amountCurrentDenom += amountCurrentDenom
                        } else {
                            network.groupByDenom.push({
                                'amount': amount,
                                'amountCurrentDenom': amountCurrentDenom,
                                'logo': el.logo,
                                'symbol': el.symbol
                            })
                        }
                    })
                }


                // Calc staked tokens
                if(network.balance.staked) {
                    network.balance.staked.forEach(el => {
                        let amount = formatTokenAmount(el.amount, el.symbol),
                            amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                        // Sum total
                        network.total.staked += amount

                        // Calc tokens price
                        network.totalTokensPrice += amount * formatTokenPrice(store.prices.find(e => e.symbol == el.symbol).price, el.symbol)

                        // Group by denom
                        let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                        if(duplicate) {
                            duplicate.amount += amount
                            duplicate.amountCurrentDenom += amountCurrentDenom
                        } else {
                            network.groupByDenom.push({
                                'amount': amount,
                                'amountCurrentDenom': amountCurrentDenom,
                                'logo': el.logo,
                                'symbol': el.symbol
                            })
                        }
                    })
                }


                // Calc unbonding tokens
                if(network.balance.unbonding) {
                    network.balance.unbonding.forEach(el => {
                        let amount = formatTokenAmount(el.amount, el.symbol),
                            amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                        // Sum total
                        network.total.unbonding += amount

                        // Calc tokens price
                        network.totalTokensPrice += amount * formatTokenPrice(store.prices.find(e => e.symbol == el.symbol).price, el.symbol)

                        // Group by denom
                        let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                        if(duplicate) {
                            duplicate.amount += amount
                            duplicate.amountCurrentDenom += amountCurrentDenom
                        } else {
                            network.groupByDenom.push({
                                'amount': amount,
                                'amountCurrentDenom': amountCurrentDenom,
                                'logo': el.logo,
                                'symbol': el.symbol
                            })
                        }
                    })
                }


                // Calc rewards tokens
                if(network.balance.rewards) {
                    network.balance.rewards.forEach(el => {
                        let amount = formatTokenAmount(el.amount, el.symbol),
                            amountCurrentDenom = formatAmountToCurrentDenom(amount, el.symbol)

                        // Sum total
                        network.total.rewards += amount

                        // Calc tokens rewards price
                        network.totalRewardsPrice += amount * formatTokenPrice(store.prices.find(e => e.symbol == el.symbol).price, el.symbol)

                        // Calc tokens price
                        network.totalTokensPrice += amount * formatTokenPrice(store.prices.find(e => e.symbol == el.symbol).price, el.symbol)

                        // Group by denom
                        if (store.prices.find(e => e.symbol == el.symbol)) {
                            let duplicate = network.groupByDenom.find(e => e.symbol == el.symbol)

                            if(duplicate) {
                                duplicate.amount += amount
                                duplicate.amountCurrentDenom += amountCurrentDenom
                            } else {
                                network.groupByDenom.push({
                                    'amount': amount,
                                    'amountCurrentDenom': amountCurrentDenom,
                                    'logo': el.logo,
                                    'symbol': el.symbol
                                })
                            }
                        }
                    })
                }


                // Set network data
                network.total.liquid_rewards = network.total.liquid + network.total.rewards

                // Sort data
                network.groupByDenom.sort((a, b) => {
                    if (a.amountCurrentDenom > b.amountCurrentDenom) { return -1 }
                    if (a.amountCurrentDenom < b.amountCurrentDenom) { return 1 }
                    return 0
                })
            }
        }


        // Total tokens price
        store.account.totalTokensPrice = 0

        for (let wallet of store.account.wallets) {
            wallet.totalTokensPrice = 0

            for (let network of wallet.networks) {
                // Sum wallet total tokens price
                wallet.totalTokensPrice += network.totalTokensPrice

                // Sum account total tokens price
                store.account.totalTokensPrice += network.totalTokensPrice
            }
        }

        // Total rewards price
        store.account.totalRewardsPrice = 0

        for (let wallet of store.account.wallets) {
            wallet.totalRewardsPrice = 0

            for (let network of wallet.networks) {
                // Sum wallet total rewards price
                wallet.totalRewardsPrice += network.totalRewardsPrice

                // Sum account total rewards price
                store.account.totalRewardsPrice += network.totalRewardsPrice
            }
        }

        console.log(store.account)

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
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;

        width: 100%;
        margin-bottom: 24px;
    }


    .tabs .btn
    {
        font-weight: 500;
        line-height: 100%;

        display: block;

        width: 100%;
        padding: 10px 0 9px;

        text-align: left;
        transition: .2s linear;
        color: #b3b3b3;
        border-bottom: 1px solid #555;
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



    @media print, (max-width: 1599px)
    {
        .tabs .btn
        {
            min-height: 56px;
        }
    }



    @media print, (max-width: 767px)
    {
        .tabs .btn
        {
            min-height: 52px;
        }
    }



    @media print, (max-width: 479px)
    {
        .tabs
        {
            display: block;
            overflow: auto;

            width: calc(100% + 28px);
            margin: 0 -14px 20px;
            padding: 0 14px;

            white-space: nowrap;

            scrollbar-color: transparent transparent !important;
            scrollbar-width: thin !important;
        }

        .tabs::-webkit-scrollbar
        {
            display: none;

            width: 0 !important;
            height: 0 !important;

            background-color: transparent !important;
        }

        .tabs::-webkit-scrollbar-thumb
        {
            background-color: transparent !important;
        }


        .tabs .btn
        {
            display: inline-block;

            width: 120px;
            max-width: none;
            margin: 0;

            vertical-align: top;
        }
    }
</style>