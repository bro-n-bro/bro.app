import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CyberClient } from '@cybercongress/cyber-js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { fromBech32, toBech32 } from '@cosmjs/encoding'

// Account
import account from '@/stores/account'

// Networks
import evmos from '@/stores/networks/evmos'
import cosmoshub from '@/stores/networks/cosmoshub'
import bostrom from '@/stores/networks/bostrom'
import osmosis from '@/stores/networks/osmosis'
import juno from '@/stores/networks/juno'
import emoney from '@/stores/networks/emoney'
import stargaze from '@/stores/networks/stargaze'
import gravity from '@/stores/networks/gravity'
import crescent from '@/stores/networks/crescent'
import omniflix from '@/stores/networks/omniflix'
import desmos from '@/stores/networks/desmos'
import stride from '@/stores/networks/stride'


const networks = {
    cosmoshub,
    bostrom,
    osmosis,
    juno,
    emoney,
    stargaze,
    gravity,
    evmos,
    crescent,
    omniflix,
    desmos,
    stride
}

window.localStorage.setItem('account', JSON.stringify(account))
window.localStorage.setItem('networks', JSON.stringify(networks))


export const useGlobalStore = defineStore('global', {
    state: () => ({
        CONTRACT_ADDRESS_PASSPORT: 'bostrom1xut80d09q0tgtch8p0z4k5f88d3uvt8cvtzm5h3tu3tsy4jk9xlsfzhxel',
        node: null,
        IPFSStatus: false,
        recalc: true,
        auth: useLocalStorage('auth', false),
        currency: useLocalStorage('currency', 'BTC'),
        wallets: {},
        tooltip: '',
        lastTXS: '',
        manageError: '',
        jsCyber: null,

        BTC_price: 0,
        ETH_price: 0,
        ATOM_price: 0,

        account,
        networks,

        showManageModal: false,
        showManageSuccessModal: false,
        showManageErrorModal: false,
        showManageRejectModal: false,
        loaderManageModal: false,
        showCurrencyDropdown: false,

        networkManageModal: 'cosmoshub'
    }),

    actions: {
        // Pre connect
        async preConnect() {
            // Keplr connect
            const chainId = 'cosmoshub-4'

            window.keplr.enable(chainId)

            // Cosmos singer
            const offlineSigner = await window.getOfflineSigner(chainId),
                accounts = await offlineSigner.getAccounts(),
                key = await window.keplr.getKey(chainId)


            // Pre wallets
            this.$patch({
                wallets: {
                    'cosmoshub': accounts[0].address,
                    'bostrom': toBech32('bostrom', fromBech32(accounts[0].address).data)
                }
            })


            // Set user info
            this.setUserInfo({
                userName: key.name,
                auth: true
            })
        },


        // Set user info
        async setUserInfo(user) {
            this.account.userName = user.userName
            this.auth = user.auth

            // Start IPFS
            if (!this.node) {
                await this.startIPFS()
            }

            // Get avatar
            if (this.node) {
                this.getAvatar()
            }
        },


        // IPFS
        async startIPFS() {
            this.node = await Ipfs.create({
                // repo: 'ipfs-repo-cyber',
                init: true,
                start: true,
                relay: {
                    enabled: true,
                    hop: {
                        enabled: true,
                    },
                },
                EXPERIMENTAL: {
                    pubsub: true,
                },
                config: {
                    Addresses: {
                        Swarm: [
                            // '/dns4/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
                            // '/dns6/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
                            '/dns4/ws-star.discovery.cybernode.ai/tcp/443/wss/p2p-webrtc-star',
                            // '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB',
                        ],
                    },
                    Bootstrap: [
                        // '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB'
                        '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB',
                        // '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
                        // '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
                    ],
                },
            })

            if (this.node !== null) {
                this.IPFSStatus = true
            }
        },


        // Avatar
        async getAvatar() {
            try {
                const tendermintClient = await Tendermint34Client.connect('https://rpc.bostrom.cybernode.ai'),
                    content = []

                this.jsCyber = new CyberClient(tendermintClient)

                const response = await this.jsCyber.queryContractSmart(
                    this.CONTRACT_ADDRESS_PASSPORT,
                    {
                        active_passport: {
                            address: this.wallets.bostrom
                        }
                    }
                )

                for await (const file of this.node.get(response.extension.avatar)) {
                    if (file.content) {
                        for await (const chunk of file.content) {
                            content.push(chunk)
                        }
                    }
                }

                let image = URL.createObjectURL(new Blob(content, {
                    type: 'image/jpeg'
                }))

                this.account.avatar = image
            } catch (error) {
                console.log(error)

                fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${this.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`)
                    .then(response => response.json())
                    .then(data => {
                        data.txs
                            ? this.account.avatar = 'https://ipfs.io/ipfs/' + data.txs[0].tx.value.msg[0].value.links[0].to
                            : this.account.avatar = `https://robohash.org/${this.account.userName.toLowerCase()}?set=set4`
                    })
            }
        },


        // Generate network address
        setWallet(network, address) {
            this.wallets[network] = address
        },


        // Reset state
        reset() {
            // Load from localstorage
            let defaultAccount = JSON.parse(window.localStorage.getItem('account')),
                defaultNetworks = JSON.parse(window.localStorage.getItem('networks'))

            // Clear state
            Object.assign(this, {
                account: defaultAccount,
                networks: defaultNetworks
            })

            // Update avatar
            this.getAvatar()
        },


        // Networks status
        async getNetworkStatus(network) {
            await fetch(`${this.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${this.wallets[network]}/validators`)
                .then(response => response.json())
                .then(data => {
                    if (data.validators && data.validators.length) {
                        data.validators.forEach(el => {
                            if (el == this.networks[network].validator) {
                                this.networks[network].status = true
                            }
                        })
                    }
                })
        },


        // Networks tokens
        async getNetworkTokens(network) {
            // Delegations tokens
            await fetch(`${this.networks[network].lcd_api}/cosmos/staking/v1beta1/delegations/${this.wallets[network]}`)
                .then(response => response.json())
                .then(data => {
                    if (data.delegation_responses) {
                        let sum = 0

                        data.delegation_responses.forEach(el => {
                            sum += parseFloat(el.balance.amount)

                            this.networks[network].delegations[el.delegation.validator_address] = el.delegation.shares / this.networks[network].exponent
                        })

                        this.networks[network].delegations_tokens = sum / this.networks[network].exponent
                    }
                })


            // Rewards tokens
            await fetch(`${this.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${this.wallets[network]}/rewards`)
                .then(response => response.json())
                .then(data => {
                    if (data.total.length) {
                        let result = data.total.find(el => el.denom == this.networks[network].denom)

                        this.networks[network].rewards_tokens = parseFloat(result.amount) / this.networks[network].exponent
                    }
                })


            // Availabel/IBC tokens
            await fetch(`${this.networks[network].lcd_api}/cosmos/bank/v1beta1/balances/${this.wallets[network]}`)
                .then(response => response.json())
                .then(data => {
                    let availabel = data.balances.find(e => e.denom == this.networks[network].denom),
                        ibc = data.balances.filter(e => e.denom.includes('ibc/'))

                    if (data.balances && data.balances.length && typeof availabel !== "undefined") {
                        // Availabel tokens
                        this.networks[network].availabel_tokens = parseFloat(availabel.amount) / this.networks[network].exponent

                        // IBC tokens
                        ibc.forEach(el => {
                            fetch(`${this.networks[network].lcd_api}/ibc/apps/transfer/v1/denom_traces/${el.denom.substr(4)}`)
                                .then(response => response.json())
                                .then(data => {
                                    let baseDenom = data.denom_trace.base_denom,
                                        baseNetwork = ''

                                    for (const tempNetwork in this.networks) {
                                        if (this.networks[tempNetwork].denom == baseDenom) {
                                            baseNetwork = tempNetwork
                                        }
                                    }

                                    // Add tokens
                                    this.networks[baseNetwork].ibc_tokens += parseFloat(el.amount) / this.networks[baseNetwork].exponent

                                    // Calc network tokens sum
                                    this.calcNetworkTokensSum(baseNetwork)
                                })
                        })
                    }
                })
        },


        calcNetworkTokensSum(network) {
            this.networks[network].tokens_sum = this.networks[network].availabel_tokens + this.networks[network].delegations_tokens + this.networks[network].rewards_tokens + this.networks[network].ibc_tokens

            // Percents
            if (this.networks[network].tokens_sum) {
                this.networks[network].delegations_percents = this.networks[network].delegations_tokens * 100 / this.networks[network].tokens_sum
                this.networks[network].rewards_percents = this.networks[network].rewards_tokens * 100 / this.networks[network].tokens_sum
                this.networks[network].ibc_percents = this.networks[network].ibc_tokens * 100 / this.networks[network].tokens_sum
                this.networks[network].availabel_percents = this.networks[network].availabel_tokens * 100 / this.networks[network].tokens_sum
            }
        },


        // Network data
        async getNetworkData(network) {
            await fetch(`${this.networks[network].lcd_api}/cosmos/staking/v1beta1/delegators/${this.wallets[network]}/validators`)
                .then(response => response.json())
                .then(data => {
                    // Validators
                    if (data.validators.length) {
                        this.networks[network].validators.push(data.validators.find(e => e.operator_address == this.networks[network].validator))

                        // Annual provision
                        this.networks[network].validators.forEach(el => {
                            el.annual_provision = this.networks[network].delegations_tokens * this.networks[network].apr * (1 - el.commission.commission_rates.rate)

                            // Total annual provision
                            this.networks[network].total_annual_provision += el.annual_provision
                        })

                        // RPDE
                        this.networks[network].RPDE = this.networks[network].total_annual_provision / 365.3

                        // Personal APR
                        this.networks[network].personal_APR = this.networks[network].total_annual_provision / this.networks[network].delegations_tokens * 100
                    }
                })
        },


        // Network balance
        calcNetworkRPDEInCurrency(network) {
            this.networks[network].RPDE_usdt = this.networks[network].price_usdt * this.networks[network].RPDE
            this.networks[network].RPDE_atom = this.networks[network].price_atom * this.networks[network].RPDE
            this.networks[network].RPDE_eth = this.networks[network].price_eth * this.networks[network].RPDE
            this.networks[network].RPDE_btc = this.networks[network].price_btc * this.networks[network].RPDE

            this.networks[network].RPDE_year_usdt = this.networks[network].RPDE_usdt * 365.3
            this.networks[network].RPDE_year_atom = this.networks[network].RPDE_atom * 365.3
            this.networks[network].RPDE_year_eth = this.networks[network].RPDE_eth * 365.3
            this.networks[network].RPDE_year_btc = this.networks[network].RPDE_btc * 365.3
        },


        // Network balance
        calcNetworkBalance(network) {
            this.networks[network].balance_usdt = this.networks[network].tokens_sum * this.networks[network].price_usdt
            this.networks[network].balance_atom = this.networks[network].tokens_sum * this.networks[network].price_atom
            this.networks[network].balance_eth = this.networks[network].tokens_sum * this.networks[network].price_eth
            this.networks[network].balance_btc = this.networks[network].tokens_sum * this.networks[network].price_btc
        },


        // Network delegations price
        calcDelegationsPrice(network) {
            this.networks[network].delegations_price = this.networks[network].delegations_tokens * this.networks[network].price
            this.networks[network].delegations_price_usdt = this.networks[network].delegations_tokens * this.networks[network].price_usdt
            this.networks[network].delegations_price_atom = this.networks[network].delegations_tokens * this.networks[network].price_atom
            this.networks[network].delegations_price_eth = this.networks[network].delegations_tokens * this.networks[network].price_eth
            this.networks[network].delegations_price_btc = this.networks[network].delegations_tokens * this.networks[network].price_btc
        },


        // Network rewards price
        calcRewardsPrice(network) {
            this.networks[network].rewards_price = this.networks[network].rewards_tokens * this.networks[network].price
            this.networks[network].rewards_price_usdt = this.networks[network].rewards_tokens * this.networks[network].price_usdt
            this.networks[network].rewards_price_atom = this.networks[network].rewards_tokens * this.networks[network].price_atom
            this.networks[network].rewards_price_eth = this.networks[network].rewards_tokens * this.networks[network].price_eth
            this.networks[network].rewards_price_btc = this.networks[network].rewards_tokens * this.networks[network].price_btc
        },


        // Networks info
        getNetworksInfo() {
            fetch('https://rpc.bronbro.io/bro_data/')
                .then(response => response.json())
                .then(data => {
                    data.infos.forEach(el => {
                        if (this.networks[el.network]) {
                            this.networks[el.network].health = el.health
                            this.networks[el.network].apr = el.apr

                            this.networks[el.network].price = el.price
                            this.networks[el.network].price_usdt = el.price
                            this.networks[el.network].price_atom = el.price / this.ATOM_price
                            this.networks[el.network].price_eth = el.price / this.ETH_price
                            this.networks[el.network].price_btc = el.price / this.BTC_price

                            switch (true) {
                                case el.health >= 0 && el.health < 7:
                                    this.networks[el.network].health_color = 'red'
                                    break
                                case el.health >= 7 && el.health < 13:
                                    this.networks[el.network].health_color = 'orange'
                                    break
                                case el.health >= 13:
                                    this.networks[el.network].health_color = 'green'
                                    break
                            }

                            switch (true) {
                                case el.apr < 0.15:
                                    this.networks[el.network].speed = 4
                                    break
                                case el.apr >= 0.15 && el.apr < 4:
                                    this.networks[el.network].speed = 4.28378 - 1.89189 * el.apr
                                    break
                                case el.apr >= 4:
                                    this.networks[el.network].speed = 0.5
                                    break
                            }
                        }
                    })
                })
        },


        // Currencies price
        async getCurrenciesPrice() {
            await fetch('https://rpc.bronbro.io/get_prices/')
                .then(response => response.json())
                .then(data => {
                    this.ATOM_price = parseFloat(data.cosmos)
                    this.ETH_price = parseFloat(data.ethereum)
                    this.BTC_price = parseFloat(data.bitcoin)

                    this.getNetworksInfo()
                })
        },


        // Account balance
        updateAccountBalance() {
            // Recalc
            for (let network in this.networks) {
                this.calcNetworkTokensSum(network)
                this.calcNetworkBalance(network)
            }

            this.account.delegations_price = 0

            this.account.balance_usdt = 0
            this.account.balance_atom = 0
            this.account.balance_eth = 0
            this.account.balance_btc = 0

            this.account.RPDE_usdt = 0
            this.account.RPDE_atom = 0
            this.account.RPDE_eth = 0
            this.account.RPDE_btc = 0

            for (let network in this.networks) {
                this.account.delegations_price += this.networks[network].delegations_price

                this.account.balance_usdt += this.networks[network].balance_usdt
                this.account.balance_atom += this.networks[network].balance_atom
                this.account.balance_eth += this.networks[network].balance_eth
                this.account.balance_btc += this.networks[network].balance_btc

                this.account.RPDE_usdt += this.networks[network].RPDE_usdt
                this.account.RPDE_atom += this.networks[network].RPDE_atom
                this.account.RPDE_eth += this.networks[network].RPDE_eth
                this.account.RPDE_btc += this.networks[network].RPDE_btc
            }

            if (this.account.delegations_price != 0) {
                this.account.personal_APR = this.account.RPDE_usdt * 365.3 / this.account.delegations_price * 100
            }

            this.recalc = false
        },


        // Update network
        async updateNetwork(network) {
            this.networks[network].validators = []
            this.networks[network].total_annual_provision = 0

            if (network == 'desmos') {
                // Desmos singer
                const offlineSignerDesmos = await window.getOfflineSigner('desmos-mainnet'),
                    accountsDesmos = await offlineSignerDesmos.getAccounts()

                // Set wallet address
                this.setWallet('desmos', accountsDesmos[0].address)
            }

            if (network == 'crescent') {
                // Crescent singer
                const offlineSignerCrescent = await window.getOfflineSigner('crescent-1'),
                    accountsCrescent = await offlineSignerCrescent.getAccounts()

                // Set wallet address
                this.setWallet('crescent', accountsCrescent[0].address)
            }

            if (network == 'omniflix') {
                // Omniflix hub singer
                const offlineSignerOmniflix = await window.getOfflineSigner('omniflixhub-1'),
                    accountsOmniflix = await offlineSignerOmniflix.getAccounts()

                // Set wallet address
                this.setWallet('crescent', accountsOmniflix[0].address)
            }

            // Get status
            this.getNetworkStatus(network)

            // Get network tokens
            this.getNetworkTokens(network).then(() => {
                // Calc network tokens sum
                this.calcNetworkTokensSum(network)

                if (this.networks[network].status) {
                    // Get network data
                    let networkData = this.getNetworkData(network)

                    Promise.all([networkData]).then(() => {
                        // Calc network RPDE
                        this.calcNetworkRPDEInCurrency(network)

                        // Calc network balance
                        this.calcNetworkBalance(network)

                        // Calc delegations price
                        this.calcDelegationsPrice(network)

                        // Calc rewards price
                        this.calcRewardsPrice(network)

                        // Update account balance
                        this.updateAccountBalance()
                    })
                }
            })
        }
    }
})
