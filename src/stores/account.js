import { useLocalStorage } from '@vueuse/core'

const account = {
    userName: null,
    tempUserName: useLocalStorage('tempUserName'),
    avatar: null,
    signature: null,
    demo: false,

    moonPassport: null,
    moonPassportOwnerAddress: useLocalStorage('moonPassportOwnerAddress'),
    moonPassportOwner: null,

    currentWallet: useLocalStorage('currentWallet'),
    wallets: [],
    info: {
        RPDE: 0
    },

    total: {
        liquid: 0,
        staked: 0,
        unbonding: 0,
        rewards: 0,
        outside: 0,
        ibc: 0,
    },
    totalTokensPrice: 0,
}

export default account