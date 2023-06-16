import { useLocalStorage } from '@vueuse/core'

const account = {
    userName: '',
    avatar: '',
    tempUserName: useLocalStorage('tempUserName'),
    signature: '',

    moonPassport: null,
    moonPassportOwnerAddress: useLocalStorage('moonPassportOwnerAddress'),
    moonPassportOwner: null,

    wallets: [],
    info: {},
    currentWallet: useLocalStorage('currentWallet'),

    balance_usdt: 0,
    balance_atom: 0,
    balance_eth: 0,
    balance_btc: 0,

    RPDE_usdt: 0,
    RPDE_atom: 0,
    RPDE_eth: 0,
    RPDE_btc: 0,

    totalPrice_usdt: 0,
    totalPrice_atom: 0,
    totalPrice_eth: 0,
    totalPrice_btc: 0,

    totalRewards_usdt: 0,
    totalRewards_eth: 0,
    totalRewards_btc: 0,
    totalRewards_atom: 0,

    personal_APR: 0,
    delegations_price: 0
}

export default account