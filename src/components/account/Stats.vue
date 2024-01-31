<template>
    <section class="stats">
        <!-- <pre>{{ data }}</pre> -->

        <div class="row">
            <div class="item">
                <div class="label">
                    {{ $t('message.account_APR') }}
                </div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>
                    {{ $filters.toFixed(APR * 100, 2) }}%
                </div>
            </div>


            <div class="item">
                <div class="label">
                    {{ $t('message.account_rewards') }}
                </div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>
                    {{ '~' + $filters.toFixed(currencyСonversion(totalRewardTokens, store.networks[store.currentNetwork].token_name), 2) }}

                    <div class="currency">{{ store.currentCurrency }}</div>
                </div>
            </div>


            <div class="item">
                <div class="label">
                    {{ $t('message.account_passport_value') }}
                </div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>
                    {{ '~' + totalTokensPrice }}

                    <div class="currency">{{ store.currentCurrency }}</div>
                </div>
            </div>


            <div class="item">
                <div class="label">
                    {{ $t('message.account_RPDE') }}
                </div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>
                    {{ '~' + $filters.toFixed(currencyСonversion(RPDE, store.networks[store.currentNetwork].token_name), 2) }}

                    <div class="currency">{{ store.currentCurrency }}</div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { ref, onBeforeMount, watch, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress, currencyСonversion, formatTokenAmount } from '@/utils'

    const store = useGlobalStore(),
        loading = store.demo ? ref(false) : ref(true),
        APR = !store.demo ? ref(0) : ref(0.2125),
        totalRewardTokens = !store.demo ? ref(0) : ref(10.016),
        totalTokensPrice = !store.demo ? ref(0) : ref(150.18),
        RPDE = !store.demo ? ref(0) : ref(0.4)


    onBeforeMount(async () => {
        // Get data
        if(!store.demo) {
            await getData()
        }
    })


    watch(computed(() => store.currentNetwork), async () => {
        // Get data
        if(!store.demo) {
            await getData()
        }
    })


    // Get data
    async function getData() {
        // Set loader
        loading.value = true

        // Reset data
        APR.value = 0
        totalTokensPrice.value = 0
        RPDE.value = 0
        store.account.info.RPDE = 0

        for (const wallet of store.account.wallets) {
            // Reset data
            wallet.RPDE = 0

            // Get network data
            for (let network of wallet.networks) {
                try {
                    // Set network info
                    await fetch(`${store.networks[network.name].index_api}/account/account_info/${generateAddress(store.networks[network.name].address_prefix, wallet.address)}`)
                        .then(res => res.json())
                        .then(response => network.info = response)
                } catch (error) {
                    console.error(error)
                }

                // Calc wallet RPDE
                wallet.RPDE += formatTokenAmount(network.info.rpde.amount, network.info.rpde.symbol)
            }

            // Calc account RPDE
            store.account.info.RPDE += wallet.RPDE
        }


        // Set current APR
        if (store.currentNetwork != 'all') {
            // Get current walllet
            let currentWallet = {}

            store.account.currentWallet != 'all'
                ? currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)
                : currentWallet = store.account.wallets[0]

            // Get current network
            let currentNetwork = currentWallet.networks.find(el => el.name == store.currentNetwork)

            // Set current APR
            APR.value = currentNetwork.info.apr
        }


        // Set current passport value
        if (store.account.currentWallet == 'all') {
            if (store.currentNetwork == 'all') {
                // Account RPDE
                totalTokensPrice.value = store.account.totalTokensPrice
            } else {
                store.account.wallets.forEach(wallet => {
                    // Network
                    let network = wallet.networks.find(el => el.name == store.currentNetwork)

                    // Sum network in all wallets Total tokens price
                    totalTokensPrice.value += network.totalTokensPrice
                })
            }
        } else {
            if (store.currentNetwork == 'all') {
                // Get current walllet
                let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)

                // Current wallet Total tokens price
                RPDE.value = currentWallet.totalTokensPrice
            } else {
                // Get current walllet
                let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)

                // Get current network
                let currentNetwork = currentWallet.networks.find(el => el.name == store.currentNetwork)

                // Current network Total tokens price
                totalTokensPrice.value = currentNetwork.totalTokensPrice
            }
        }


        // Set current RPDE
        if (store.account.currentWallet == 'all') {
            if (store.currentNetwork == 'all') {
                // Account RPDE
                RPDE.value = store.account.info.RPDE
            } else {
                store.account.wallets.forEach(wallet => {
                    // Network
                    let network = wallet.networks.find(el => el.name == store.currentNetwork)

                    // Sum network in all wallets RPDE
                    RPDE.value += network.info.RPDE
                })
            }
        } else {
            if (store.currentNetwork == 'all') {
                // Get current walllet
                let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)

                // Current wallet RPDE
                RPDE.value = currentWallet.RPDE
            } else {
                // Get current walllet
                let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet)

                // Get current network
                let currentNetwork = currentWallet.networks.find(el => el.name == store.currentNetwork)

                // Current network RPDE
                RPDE.value = currentNetwork.info.RPDE
            }
        }


        // Hide loader
        loading.value = false
    }
</script>


<style scoped>
    .row
    {
        margin-bottom: -20px;
        margin-left: -20px;

        align-items: stretch;
        align-content: stretch;
    }

    .row > *
    {
        width: calc(25% - 20px);
        margin-bottom: 20px;
        margin-left: 20px;
    }


    .item
    {
        padding: 16px 8px;

        text-align: center;

        border-radius: 20px;
        background: #171717;
    }


    .label
    {
        color: #F2F2F2;
        font-size: 14px;

        width: 100%;
        margin-bottom: 8px;
    }


    .val
    {
        font-size: 24px;
        font-weight: 700;
        line-height: 100%;

        white-space: nowrap;
    }


    .val .currency
    {
        color: #555;
        font-size: var(--font_size);
        font-weight: 400;
        line-height: 100%;

        margin-top: 8px;
    }


    .loader_wrap
    {
        position: relative;

        height: auto;
        margin: 20px auto 4px;

        background: none;
    }

    .loader
    {
        width: 24px;
        height: 24px;
    }



    @media print, (max-width: 1599px)
    {
        .row
        {
            margin-bottom: -12px;
            margin-left: -12px;
        }

        .row > *
        {
            width: calc(25% - 12px);
            margin-bottom: 12px;
            margin-left: 12px;
        }


        .val
        {
            font-size: 22px;
        }
    }



    @media print, (max-width: 1439px)
    {
        .val
        {
            font-size: 20px;
        }
    }



    @media print, (max-width: 767px)
    {
        .row
        {
            margin-bottom: -10px;
            margin-left: -10px;
        }

        .row > *
        {
            width: calc(50% - 10px);
            margin-bottom: 10px;
            margin-left: 10px;
        }


        .val
        {
            font-size: 22px;
        }
    }
</style>