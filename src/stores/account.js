import { useLocalStorage } from '@vueuse/core'

const account = {
    userName: '',
    avatar: '',
    moonPassport: null,
    moonPassportOwner: useLocalStorage('moonPassportOwner', ''),
    signature: '',

    owner: {},
    currentWallet: useLocalStorage('currentWallet', ''),

    balance_usdt: 0,
    balance_atom: 0,
    balance_eth: 0,
    balance_btc: 0,

    RPDE_usdt: 0,
    RPDE_atom: 0,
    RPDE_eth: 0,
    RPDE_btc: 0,

    personal_APR: 0,
    delegations_price: 0
}

export default account