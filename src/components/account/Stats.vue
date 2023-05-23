<template>
    <section class="stats">
        <!-- <pre>{{ data }}</pre> -->

        <div class="row">
            <div class="item">
                <div class="label">{{ $t('message.account_APR') }}</div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>{{ $filters.toFixed(data.apr * 100, 2) }}%</div>
            </div>


            <div class="item">
                <div class="label">{{ $t('message.account_voting_power') }}</div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>{{ $filters.toFixed(data.voting_power * 100, 8) }}</div>
            </div>


            <div class="item">
                <div class="label">{{ $t('message.account_passport_value') }}</div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>
                    <template v-if="store.currency == 'USDT'">
                    {{ $filters.toFixed(store.account.totalPrice_usdt, 2) }}
                    </template>

                    <template v-if="store.currency == 'ATOM'">
                    {{ $filters.toFixed(store.account.totalPrice_atom, 2) }}
                    </template>

                    <template v-if="store.currency == 'ETH'">
                    {{ $filters.toFixed(store.account.totalPrice_eth, 4) }}
                    </template>

                    <template v-if="store.currency == 'BTC'">
                    {{ $filters.toFixed(store.account.totalPrice_btc, 5) }}
                    </template>

                    {{ store.currency }}
                </div>
            </div>


            <div class="item">
                <div class="label">{{ $t('message.account_RPDE') }}</div>

                <div class="loader_wrap" v-if="loading">
                    <div class="loader"><span></span></div>
                </div>

                <div class="val" v-else>{{ $filters.toFixed(data.rpde, 5) }}</div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    const store = useGlobalStore(),
        loading = ref(true),
        data = ref({})


    onBeforeMount(async () => {
        // Get data
        await getData()
    })


    // Monitor of current wallet changes
    watch(() => store.account.currentWallet, async () => {
        // Get data
        await getData()
    })


    // Get data
    async function getData() {
        // Set loader
        loading.value = true

        for (const wallet of store.account.wallets) {
            // Get cosmos hub data
            let cosmosHubAddress = generateAddress(store.networks[store.currentNetwork].address_prefix, wallet.address)

            try {
                await fetch(`https://rpc.bronbro.io/account/account_info/${cosmosHubAddress}`)
                    .then(res => res.json())
                    .then(response => {
                         // Set network info
                        let currentNetworkInWallet = wallet.networks.find(network => network.name == 'cosmoshub')

                        currentNetworkInWallet.info = response
                    })

                // Calc wallet info
                wallet.info.voting_power = 0
                wallet.info.RPDE = 0

                for (const network of wallet.networks) {

                    wallet.info.voting_power += network.info.voting_power
                    wallet.info.RPDE += (network.info.rpde.amount / Math.pow(10, network.info.rpde.exponent)) * network.info.rpde.price
                }
            } catch (error) {
                console.log(error)
            }
        }


        // Calc account info
        store.account.info.voting_power = 0
        store.account.info.RPDE = 0

        for (const wallet of store.account.wallets) {
            store.account.info.voting_power += wallet.voting_power
            store.account.info.RPDE += wallet.RPDE
        }


        // Set current data
        let currentWallet = store.account.wallets.find(el => el.address == store.account.currentWallet),
            currentNetwork = currentWallet.networks.find(network => network.name == 'cosmoshub')

        if(store.currentWallet != 'all') {
            data.value = {
                apr: currentNetwork.info.apr,
                voting_power: currentWallet.info.voting_power,
                rpde: currentWallet.info.RPDE
            }
        }


        // Hide loader
        loading.value = false

        // let currentAddress = generateAddress(store.networks[store.currentNetwork].address_prefix, wallet.address)

        // try {
        //     await fetch(`https://rpc.bronbro.io/account/account_info/${currentAddress}`)
        //         .then(res => res.json())
        //         .then(response => {
        //             // Set data
        //             data.value = response

        //             // Hide loader
        //             loading.value = false
        //         })
        // } catch (error) {
        //     console.log(error)
        // }
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
        background: #0d0d0d;
    }


    .label
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        width: 100%;
        margin-bottom: 8px;
    }


    .val
    {
        font-size: 20px;
        font-weight: 700;
        line-height: 100%;

        white-space: nowrap;
    }


    .loader_wrap
    {
        position: relative;

        height: auto;
        margin: 8px auto -4px;

        background: none;
    }

    .loader
    {
        width: 23px;
        height: 23px;
    }

</style>