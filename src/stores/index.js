import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CyberClient } from '@cybercongress/cyber-js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { generateAddress, createKeplrOfflineSinger } from '@/utils'

// Account
import account from '@/stores/account'

// Networks
import cosmoshub from '@/stores/networks/cosmoshub'
import bostrom from '@/stores/networks/bostrom'

// Demo data
import DemoAccount from '@/demo/Account.json'
import DemoKeplr from '@/demo/Keplr.json'

const networks = {
    cosmoshub,
    bostrom,
    crescent: {
        name: 'Crescent hub',
        address_prefix: 'cre',
    },
    evmos: {
        name: 'Evmos',
        address_prefix: 'evmos',
    },
    gravity: {
        name: 'G-Bridge',
        address_prefix: 'gravity',
    },
    juno: {
        name: 'Juno',
        address_prefix: 'juno',
    },
    omniflix: {
        name: 'OmniFlix Network',
        address_prefix: 'omniflix',
    },
    osmosis: {
        name: 'Osmosis',
        address_prefix: 'osmo',
    },
    stargaze: {
        name: 'Stargaze',
        address_prefix: 'stars',
    },
    stride: {
        name: 'Stride',
        address_prefix: 'stride',
    },
}


export const useGlobalStore = defineStore('global', {
    state: () => ({
        CONTRACT_ADDRESS_PASSPORT: 'bostrom1xut80d09q0tgtch8p0z4k5f88d3uvt8cvtzm5h3tu3tsy4jk9xlsfzhxel',
        CONSTITUTION_HASH: 'QmcHB9GKHAKCLQhmSj71qNJhENJJg8Gymd1PvvsCQBhG7M',

        isAppFullLoaded: false,
        isKeplrConnected: false,
        isAuth: false,

        referer: null,
        demo: false,
        tour: true,

        currentNetwork: null,
        currentProposalId: null,
        currentDeleteAddress: null,
        currentCurrency: useLocalStorage('currency', 'USDT'),

        tooltip: null,
        tooltipAnimate: false,

        IPFSNode: null,
        Keplr: {},

        account,
        networks,

        showConstitutionModal: false,
        showAddAddressModal: false,
        showDeleteAddressModal: false,

        prices: null,
        lastTXS: null,
        validatorInfo: null,
        needReload: false,

        networkColors: {
            BOOT: '#25FF25',
            EVMOS: '#ED4E33',
            STARS: '#E94A9D',
            STRD: '#E94A9D',
            JUNO: '#F0827D',
            CRE: '#FFB04A',
            GRAV: '#0036C1',
            OSMO: '#7900E1',
            NGM: '#00646F',
            ATOM: '#2E314B',
            DSM: '#F98256',
            FLIX: '#F19E22',
            AKT: '#ED3324',
            MNTL: '#F5B31D',
            AXL: '#459CEF',
            BAND: '#4022DD',
            BCNA: '#52B489',
            BTSG: '#EA335F',
            CANTO: '#74F8A2',
            HUAHUA: '#E5AB55',
            CMDX: '#FE4350',
            CORE: '#25D695',
            CRO: '#0F2C70',
            CUDOS: '#950FFF',
            FET: '#2D4BA9',
            INJ: '#363FEC',
            IRIS: '#6627BB',
            IXO: '#00D2FF',
            KAVA: '#FF232F',
            XKI: '#0000F5',
            DARC: '#4D7ABD',
            KUJI: '#E53935',
            KYVE: '#76C4B2',
            LIKE: '#B9EFE7',
            LUM: '#3374E5',
            MARS: '#AC061A',
            MED: '#3A71E2',
            NOBLE: '#9CB0FF',
            NYX: '#E57937',
            NOM: '#353340',
            PASG: '#DF5936',
            XPRT: '#D22F26',
            HASH: '#437BDA',
            QSR: '#7C2ED4',
            QCK: '#BF5822',
            REGEN: '#9CCAAF',
            ATOLO: '#56BBF8',
            SCRT: '#6594D6',
            DVPN: '#315DF6',
            CTK: '#D9AC5C',
            ROWAN: '#B1A062',
            SOMM: '#674FD1',
            FIS: '#6F5CEF',
            IOV: '#3063B7',
            TORI: '#5476F7',
            TGD: '#FFFFFF',
            UMEE: '#FDA9FF',
            XPLA: '#00B1FF'
        },
    }),


    actions: {
        // Currencies price
        async getCurrenciesPrice() {
            try {
                await fetch('https://rpc.bronbro.io/price_feed_api/tokens/')
                    .then(response => response.json())
                    .then(data => this.prices = data)
            } catch (error) {
                console.log(error)
            }
        },


        // Init demo
        initDemo() {
            this.Keplr = DemoKeplr
            this.account = DemoAccount

            this.isAppFullLoaded = true
            this.isKeplrConnected = true
            this.isAuth = true
            this.IPFSNode = true
        },


        // Init APP
        async initApp(updateOwnerMoonPassport = true, updateAvatar = true) {
            // Keplr connect
            await createKeplrOfflineSinger('cosmoshub-4')

            // Set jsCyber
            let tendermintClient = await Tendermint34Client.connect(this.networks.bostrom.rpc_api)

            this.jsCyber = new CyberClient(tendermintClient)

            // Get moon passport
            await this.getMoonPassport()

            if (updateOwnerMoonPassport && this.account.moonPassport && this.account.moonPassportOwnerAddress != this.account.moonPassport.owner) {
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
            this.setUserInfo(updateAvatar)
        },


        // Get moon passport
        async getMoonPassport() {
            try {
                // Get passport data
                this.account.moonPassport = await this.jsCyber.queryContractSmart(
                    this.CONTRACT_ADDRESS_PASSPORT,
                    {
                        active_passport: {
                            address: generateAddress('bostrom', this.Keplr.account.address)
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
                // Get passport data
                this.account.moonPassportOwner = await this.jsCyber.queryContractSmart(
                    this.CONTRACT_ADDRESS_PASSPORT,
                    {
                        active_passport: {
                            address: this.account.moonPassportOwnerAddress
                        }
                    }
                )

                // Networks info
                // let cosmoshubInfo = {
                //     name: 'cosmoshub',
                //     color: '#2E314B',
                //     price: this.prices.find(el => el.symbol == 'ATOM').price,
                //     total: {
                //         liquid: 0,
                //         staked: 0,
                //         unbonding: 0,
                //         rewards: 0,
                //         outside: 0,
                //         ibc: 0,
                //         liquid_rewards: 0
                //     },
                //     totalTokens: 0,
                //     balance: {
                //         liquid: {
                //             native: null,
                //             ibc: null
                //         },
                //         staked: null,
                //         unbonding: null,
                //         rewards: null,
                //         groupByDenom: []
                //     }
                // }

                // Set owner wallet
                this.account.wallets = []

                this.account.wallets.push({
                    address: this.account.moonPassportOwner.owner,
                    nickname: this.account.moonPassportOwner.extension.nickname,
                    info: {},
                    totalTokens: 0,
                    networks: [
                        {
                            name: 'cosmoshub',
                            color: '#2E314B',
                            price: this.prices.find(el => el.symbol == 'ATOM').price,
                            total: {
                                liquid: 0,
                                staked: 0,
                                unbonding: 0,
                                rewards: 0,
                                outside: 0,
                                ibc: 0,
                                liquid_rewards: 0
                            },
                            totalTokens: 0,
                            balance: {
                                liquid: {
                                    native: null,
                                    ibc: null
                                },
                                staked: null,
                                unbonding: null,
                                rewards: null,
                                groupByDenom: []
                            }
                        }
                    ]
                })

                // Set other wallets
                if (this.account.moonPassportOwner.extension.addresses){
                    this.account.moonPassportOwner.extension.addresses.forEach(address => {
                        if (address.address.substring(0, 2) != '0x' && address.address.substring(0, 5) != 'terra') {
                            let result = this.account.wallets.find(el => el.address == generateAddress('bostrom', address.address))

                            if (typeof result === 'undefined') {
                                this.account.wallets.push({
                                    address: generateAddress('bostrom', address.address),
                                    nickname: address.label,
                                    info: {},
                                    totalTokens: 0,
                                    networks: [
                                        {
                                            name: 'cosmoshub',
                                            color: '#2E314B',
                                            price: this.prices.find(el => el.symbol == 'ATOM').price,
                                            total: {
                                                liquid: 0,
                                                staked: 0,
                                                unbonding: 0,
                                                rewards: 0,
                                                outside: 0,
                                                ibc: 0,
                                                liquid_rewards: 0
                                            },
                                            totalTokens: 0,
                                            balance: {
                                                liquid: {
                                                    native: null,
                                                    ibc: null
                                                },
                                                staked: null,
                                                unbonding: null,
                                                rewards: null,
                                                groupByDenom: []
                                            }
                                        }
                                    ]
                                })
                            }
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },


        // Set user info
        async setUserInfo(updateAvatar) {
            this.account.userName = this.Keplr.key.name
            this.isAuth = true

            if (updateAvatar) {
                // Set robohash avatar
                this.account.moonPassportOwner
                    ? this.account.avatar = `https://robohash.org/${this.account.moonPassportOwner.extension.nickname.toLowerCase()}?set=set4`
                    : this.account.avatar = `https://robohash.org/${this.account.userName.toLowerCase()}?set=set4`

                // Start IPFS
                if (!this.IPFSNode) {
                    this.IPFSNode = await Ipfs.create()
                }


                // Get avatar
                if (this.IPFSNode) {
                    this.getAvatar()
                }
            }
        },


        // Avatar
        async getAvatar() {
            let avatarStatus = false,
                delay = 5000

            // Getting avatar from gateway
            setTimeout(() => {
                if (!avatarStatus && this.account.moonPassportOwner) {
                    this.account.avatar = `https://gateway.ipfs.cybernode.ai/ipfs/${this.account.moonPassportOwner.extension.avatar}`

                    avatarStatus = true
                }
            }, delay)

            // Getting avatar from ipfs node
            if(this.account.moonPassportOwner) {
                let content = []

                for await (let chunk of this.IPFSNode.cat(this.account.moonPassportOwner.extension.avatar)) {
                    content.push(chunk)
                }

                if (content.length) {
                    this.account.avatar = URL.createObjectURL(new Blob(content, { type: 'image/jpeg' }))

                    avatarStatus = true
                }
            }
        },
    }
})
