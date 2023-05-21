import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CyberClient } from '@cybercongress/cyber-js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { fromBech32, toBech32 } from '@cosmjs/encoding'
import * as IPFS from 'ipfs-core'
import { generateAddress } from '@/utils'

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


// Config
import desmosConfig from '@/config/chain/desmos'
import crescentConfig from '@/config/chain/crescent'
import omniflixConfig from '@/config/chain/omniflix'


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
        CONSTITUTION_HASH: 'QmcHB9GKHAKCLQhmSj71qNJhENJJg8Gymd1PvvsCQBhG7M',
        appLoaded: false,
        node: false,
        IPFSStatus: false,
        recalc: true,
        connected: false,
        auth: false,
        needReload: false,
        currency: useLocalStorage('currency', 'USDT'),
        wallets: {},
        tooltip: '',
        lastTXS: '',
        manageError: '',
        jsCyber: null,
        constitutionStatus: null,

        BTC_price: 0,
        ETH_price: 0,
        ATOM_price: 0,

        account,
        networks,

        showManageModal: false,
        showManageSuccessModal: false,
        showManageErrorModal: false,
        showManageRejectModal: false,
        showConstitutionModal: false,
        showAddProposalModal: false,
        showMakeChoice: true,
        showAddAddressModal: false,
        showDeleteAddressModal: false,

        manageModalnetwork: '',
        ref: '',
        currentNetwork: '',
        currentDeleteAddress: '',

        colors: ['#950FFF', '#1BC562', '#EB5757', '#0343E8', '#F79400', '#DB11D3'],

        validatorInfo: {}
    }),

    actions: {
        // Connect wallet
        async connectWallet(updateOwnerMoonPassport = true, updateAvatar = true) {
            // Keplr connect
            let chainId = 'cosmoshub-4'

            await window.keplr.enable(chainId)

            // Cosmos singer
            let offlineSigner = await window.getOfflineSignerAuto(chainId),
                accounts = await offlineSigner.getAccounts(),
                key = await window.keplr.getKey(chainId)

            // Evmos Singer
            let offlineSignerEvmos = await window.getOfflineSigner(this.networks.evmos.chainId),
                accountsEvmos = await offlineSignerEvmos.getAccounts()

            // Add chains
            let checkChains = [
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


            // Desmos Singer
            let accountsDesmos = {}


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
                    await window.keplr.experimentalSuggestChain(checkChains[i].config).then(() => this.updateNetwork(checkChains[i].name))
                }
            }

            // Set keplr offline signer
            this.activeKeplrAddress = accounts[0].address

            // Pre wallets
            this.$patch({
                wallets: {
                    'cosmoshub': accounts[0].address,
                    'bostrom': toBech32('bostrom', fromBech32(accounts[0].address).data),
                    'evmos': accountsEvmos[0].address,
                    'desmos': accountsDesmos[0].address
                }
            })

            // Set connected status
            this.connected = true

            // Get moon passport
            await this.getMoonPassport()

            if (updateOwnerMoonPassport && this.account.moonPassport) {
                // Set owner to localStorage
                this.account.moonPassportOwnerAddress = this.account.moonPassport.owner

                // Set current wallet
                this.account.currentWallet = this.account.moonPassportOwnerAddress

                // Set owner moon passport
                this.account.moonPassportOwner = this.account.moonPassport
            }

            // Get owner moon passport
            if (updateOwnerMoonPassport && this.account.moonPassportOwnerAddress) {
                await this.getOwnerMoonPassport()
            }

            // Set user info
            this.setUserInfo({
                userName: key.name,
                auth: true
            }, updateAvatar)
        },


        // Get moon passport
        async getMoonPassport() {
            try {
                let tendermintClient = await Tendermint34Client.connect(this.networks.bostrom.rpc_api)

                this.jsCyber = new CyberClient(tendermintClient)

                this.account.moonPassport = await this.jsCyber.queryContractSmart(
                    this.CONTRACT_ADDRESS_PASSPORT,
                    {
                        active_passport: {
                            address: this.wallets.bostrom
                        }
                    }
                )
            } catch (error) {
                console.log(error)

                // Clear passport
                this.account.moonPassport = null
            }
        },


        // Get owner moon passport
        async getOwnerMoonPassport() {
            try {
                // Get data
                let tendermintClient = await Tendermint34Client.connect(this.networks.bostrom.rpc_api)

                this.jsCyber = new CyberClient(tendermintClient)

                this.account.moonPassportOwner = await this.jsCyber.queryContractSmart(
                    this.CONTRACT_ADDRESS_PASSPORT,
                    {
                        active_passport: {
                            address: this.account.moonPassportOwnerAddress
                        }
                    }
                )

                // Set owner wallet
                this.account.wallets.push({
                    address: this.account.moonPassportOwner.owner,
                    nickname: this.account.moonPassportOwner.extension.nickname,
                    networks: []
                })

                // Set other wallets
                if(this.account.moonPassportOwner.extension.addresses){
                    this.account.moonPassportOwner.extension.addresses.forEach(address => {
                        let result = this.account.wallets.find(el => el.address == generateAddress('bostrom', address.address))

                        if(typeof result === 'undefined') {
                            this.account.wallets.push({
                                address: generateAddress('bostrom', address.address),
                                nickname: address.label,
                                networks: []
                            })
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },


        // Set user info
        async setUserInfo(user, updateAvatar) {
            this.account.userName = user.userName
            this.auth = user.auth

            if (updateAvatar) {
                // Set robohash avatar
                this.account.moonPassportOwner
                    ? this.account.avatar = `https://robohash.org/${this.account.moonPassportOwner.extension.nickname.toLowerCase()}?set=set4`
                    : this.account.avatar = `https://robohash.org/${this.account.userName.toLowerCase()}?set=set4`

                // Start IPFS
                if (!this.node) {
                    await this.startIPFS()
                }

                // Get avatar
                if (this.node.isOnline()) {
                    this.getAvatar()
                }
            }
        },


        // IPFS
        async startIPFS() {
            this.node = await IPFS.create({
                repo: 'ipfs-repo-cyber',
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
                            '/dns4/ws-star.discovery.cybernode.ai/tcp/443/wss/p2p-webrtc-star',
                            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                        ],
                    },
                    Bootstrap: [
                        '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB',
                        '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                        '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
                        '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
                        '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
                        '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
                        '/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
                        '/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
                        '/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS',
                        '/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN',
                    ]
                }
            })

            if (this.node.isOnline()) {
                this.IPFSStatus = true
            }
        },


        // Avatar
        async getAvatar() {
            let avatarStatus = false,
                delay = 5000

            // Getting avatar from gateway
            setTimeout(() => {
                if (!avatarStatus) {
                    this.account.avatar = `https://gateway.ipfs.cybernode.ai/ipfs/${this.account.moonPassportOwner.extension.avatar}`
                }
            }, delay)

            // Getting avatar from ipfs node
            if(this.account.moonPassportOwner) {
                let content = []

                for await (let chunk of this.node.cat(this.account.moonPassportOwner.extension.avatar)) {
                    content.push(chunk)
                }

                this.account.avatar = URL.createObjectURL(new Blob(content, { type: 'image/jpeg' }))

                avatarStatus = true
            }
        },


        // Generate network address
        setWallet(network, address) {
            this.wallets[network] = address
        },


        // Reset state
        // async reset () {
        //     // Load from localstorage
        //     let defaultAccount = JSON.parse(window.localStorage.getItem('account')),
        //         defaultNetworks = JSON.parse(window.localStorage.getItem('networks'))

        //     this.connected = false
        //     this.showManageModal = false
        //     this.showManageSuccessModal = false
        //     this.showManageErrorModal = false
        //     this.showManageRejectModal = false
        //     this.loaderManageModal = false
        //     this.showConstitutionModal = false
        //     this.constitutionStatus = null

        //     // Clear state
        //     Object.assign(this, {
        //         account: defaultAccount,
        //         networks: defaultNetworks
        //     })
        // },


        // Connect to network websocket
        // connectNetworkWebsocket(network) {
        //     this.networks[network].websocket = new WebSocket(this.networks[network].websocket_url)
        // },


        // Networks status
        async getNetworkStatus(network) {
            try {
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
            } catch (error) {
                console.log(error)
            }
        },


        // Get network delegations tokens
        async getNetworkDelegationsTokens(network) {
            try {
                await fetch(`${this.networks[network].lcd_api}/cosmos/staking/v1beta1/delegations/${this.wallets[network]}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.delegation_responses) {
                            let sum = 0

                            data.delegation_responses.forEach(el => {
                                sum += parseFloat(el.balance.amount)

                                this.networks[network].delegations.push({
                                    'operator_address': el.delegation.validator_address,
                                    'amount': parseFloat(el.delegation.shares) / this.networks[network].exponent
                                })
                            })

                            this.networks[network].delegations_tokens = sum / this.networks[network].exponent
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        },


        // Get network rewards tokens
        async getNetworkRewardsTokens(network) {
            try {
                await fetch(`${this.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${this.wallets[network]}/rewards`)
                    .then(response => response.json())
                    .then(data => {
                        if (this.networks[network].rewards_tokens && !data.total.length) {
                            setTimeout(async () => await this.updateNetwork(network), 1000)
                        } else if (data.total.length) {
                            let result = data.total.find(el => el.denom == this.networks[network].denom)

                            // Set rewards
                            this.networks[network].rewards_tokens = parseFloat(result.amount) / this.networks[network].exponent

                            // Set a rewards from each validator
                            for (let i in data.rewards) {
                                if (data.rewards[i].reward.length) {
                                    let rewards = data.rewards[i].reward.find(el => el.denom == this.networks[network].denom)

                                    this.networks[network].rewards.push({
                                        'operator_address': data.rewards[i].validator_address,
                                        'amount': parseFloat(rewards.amount) / this.networks[network].exponent
                                    })
                                }
                            }
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        },


        // Get network availabel/IBC tokens
        async getNetworkAvailabelIBCTokens(network) {
            try {
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
                                        for (const tempNetwork in this.networks) {
                                            if (this.networks[tempNetwork].denom == data.denom_trace.base_denom) {
                                                // Add tokens
                                                this.networks[tempNetwork].ibc_tokens += parseFloat(el.amount) / this.networks[tempNetwork].exponent

                                                // Calc network tokens sum
                                                this.calcNetworkTokensSum(tempNetwork)
                                            }
                                        }
                                    })
                            })
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        },


        // Networks tokens
        async getNetworkTokens(network) {
            // Get network delegations tokens
            await this.getNetworkDelegationsTokens(network)

            // Get network rewards tokens
            await this.getNetworkRewardsTokens(network)

            // Get network availabel/IBC tokens
            await this.getNetworkAvailabelIBCTokens(network)
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

            if (network == 'bostrom') {
                this.networks.bostrom.balance_usdt = this.networks.bostrom.tokens_sum * this.networks.bostrom.exponent * this.networks.bostrom.price_usdt
                this.networks.bostrom.balance_atom = this.networks.bostrom.tokens_sum * this.networks.bostrom.exponent * this.networks.bostrom.price_atom
                this.networks.bostrom.balance_eth = this.networks.bostrom.tokens_sum * this.networks.bostrom.exponent * this.networks.bostrom.price_eth
                this.networks.bostrom.balance_btc = this.networks.bostrom.tokens_sum * this.networks.bostrom.exponent * this.networks.bostrom.price_btc
            }
        },


        // Network delegations price
        calcDelegationsPrice(network) {
            this.networks[network].delegations_price = this.networks[network].delegations_tokens * this.networks[network].price
            this.networks[network].delegations_price_usdt = this.networks[network].delegations_tokens * this.networks[network].price_usdt
            this.networks[network].delegations_price_atom = this.networks[network].delegations_tokens * this.networks[network].price_atom
            this.networks[network].delegations_price_eth = this.networks[network].delegations_tokens * this.networks[network].price_eth
            this.networks[network].delegations_price_btc = this.networks[network].delegations_tokens * this.networks[network].price_btc

            if (network == 'bostrom') {
                this.networks.bostrom.delegations_price = this.networks.bostrom.delegations_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price
                this.networks.bostrom.delegations_price_usdt = this.networks.bostrom.delegations_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_usdt
                this.networks.bostrom.delegations_price_atom = this.networks.bostrom.delegations_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_atom
                this.networks.bostrom.delegations_price_eth = this.networks.bostrom.delegations_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_eth
                this.networks.bostrom.delegations_price_btc = this.networks.bostrom.delegations_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_btc
            }
        },


        // Network rewards price
        calcRewardsPrice(network) {
            this.networks[network].rewards_price = this.networks[network].rewards_tokens * this.networks[network].price
            this.networks[network].rewards_price_usdt = this.networks[network].rewards_tokens * this.networks[network].price_usdt
            this.networks[network].rewards_price_atom = this.networks[network].rewards_tokens * this.networks[network].price_atom
            this.networks[network].rewards_price_eth = this.networks[network].rewards_tokens * this.networks[network].price_eth
            this.networks[network].rewards_price_btc = this.networks[network].rewards_tokens * this.networks[network].price_btc

            if (network == 'bostrom') {
                this.networks.bostrom.rewards_price = this.networks.bostrom.rewards_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price
                this.networks.bostrom.rewards_price_usdt = this.networks.bostrom.rewards_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_usdt
                this.networks.bostrom.rewards_price_atom = this.networks.bostrom.rewards_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_atom
                this.networks.bostrom.rewards_price_eth = this.networks.bostrom.rewards_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_eth
                this.networks.bostrom.rewards_price_btc = this.networks.bostrom.rewards_tokens * this.networks.bostrom.exponent * this.networks.bostrom.price_btc
            }
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
                            this.networks[el.network].apy = Math.pow(1 + (el.apr.toFixed(2) / 365), 365) - 1

                            this.networks[el.network].price = this.prices.find(e => e.display == el.denom).price
                            this.networks[el.network].price_usdt = this.prices.find(e => e.display == el.denom).price
                            this.networks[el.network].price_atom = this.prices.find(e => e.display == el.denom).price / this.ATOM_price
                            this.networks[el.network].price_eth = this.prices.find(e => e.display == el.denom).price / this.ETH_price
                            this.networks[el.network].price_btc = this.prices.find(e => e.display == el.denom).price / this.BTC_price

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
            await fetch('https://rpc.bronbro.io/price_feed_api/tokens/')
                .then(response => response.json())
                .then(data => {
                    this.prices = data

                    let ATOM = data.find(el => el.symbol == 'ATOM'),
                        BTC = data.find(el => el.symbol == 'WBTC'),
                        ETH = data.find(el => el.symbol == 'WETH')

                    this.ATOM_price = ATOM.price
                    this.ETH_price = BTC.price
                    this.BTC_price = ETH.price

                    // Networks info
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
            this.networks[network].delegations = []
            this.networks[network].rewards = []
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
