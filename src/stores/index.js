import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'


const account = {
    userName: useLocalStorage('userName', ''),
    avatar: useLocalStorage('avatar', ''),
    delegations_price: 0,
    balance_usdt: 0,
    balance_atom: 0,
    balance_eth: 0,
    balance_btc: 0,
    personal_APR: 0,
    RPDE_usdt: 0,
    RPDE_atom: 0,
    RPDE_eth: 0,
    RPDE_btc: 0
}


const networks = {
    'cosmoshub': {
        name: 'Cosmos hub',
        status: false,
        lcd_api: 'https://lcd.cosmoshub-4.bronbro.io',
        rpc_api: 'https://rpc.cosmoshub-4.bronbro.io/',
        validator: 'cosmosvaloper106yp7zw35wftheyyv9f9pe69t8rteumjrx52jg',
        coingecko_api: 'cosmos',
        denom: 'uatom',
        token_name: 'ATOM',
        chainId: 'cosmoshub-4',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'bostrom': {
        name: 'Bostrom',
        status: false,
        lcd_api: 'https://lcd.bostrom.bronbro.io',
        rpc_api: 'https://rpc.bostrom.bronbro.io',
        validator: 'bostromvaloper1ydc5fy9fjdygvgw36u49yj39fr67pd9m5qexm8',
        coingecko_api: 'bostrom',
        denom: 'boot',
        token_name: 'MBOOT',
        chainId: 'bostrom',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'osmosis': {
        name: 'Osmosis',
        status: false,
        lcd_api: 'https://lcd.osmosis-1.bronbro.io',
        rpc_api: 'https://rpc.osmosis-1.bronbro.io',
        validator: 'osmovaloper13tk45jkxgf7w0nxquup3suwaz2tx483xe832ge',
        coingecko_api: 'osmosis',
        denom: 'uosmo',
        token_name: 'OSMO',
        chainId: 'osmosis-1',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'juno': {
        name: 'Juno',
        status: false,
        lcd_api: 'https://lcd.juno-1.bronbro.io',
        rpc_api: 'https://rpc.juno-1.bronbro.io',
        validator: 'junovaloper1quqxfrxkycr0uzt4yk0d57tcq3zk7srm7sm6r8',
        coingecko_api: 'juno-network',
        denom: 'ujuno',
        token_name: 'JUNO',
        chainId: 'juno-1',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'emoney': {
        name: 'E-money',
        status: false,
        lcd_api: 'https://lcd.emoney-3.bronbro.io',
        rpc_api: 'https://rpc.emoney-3.bronbro.io',
        validator: 'emoneyvaloper149vyxd36kxpg46rralaw6eejv4d9daqc3nv642',
        coingecko_api: 'e-money',
        denom: 'ungm',
        token_name: 'NGM',
        chainId: 'emoney-3',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'stargaze': {
        name: 'Stargaze',
        status: false,
        lcd_api: 'https://lcd.stargaze-1.bronbro.io',
        rpc_api: 'https://rpc.stargaze-1.bronbro.io',
        validator: 'starsvaloper1y58hfnm90r4efhlydx0gavz57lvm7k6uulkg3h',
        coingecko_api: 'stargaze',
        denom: 'ustars',
        token_name: 'STAR',
        chainId: 'stargaze-1',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'gravity': {
        name: 'G-Bridge',
        status: false,
        lcd_api: 'https://lcd.gravity-bridge-3.bronbro.io',
        rpc_api: 'https://rpc.gravity-bridge-3.bronbro.io',
        validator: 'gravityvaloper1vyd4k5j636erx5y5kdqghdu3rfjtwc48vdc7r6',
        coingecko_api: 'graviton',
        denom: 'ugraviton',
        token_name: 'GRAV',
        chainId: 'gravity-bridge-3',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'evmos': {
        name: 'Evmos',
        status: false,
        lcd_api: 'https://lcd.evmos-9001-2.bronbro.io',
        rpc_api: 'https://rpc.evmos-9001-2.bronbro.io',
        validator: 'evmosvaloper1ce4vh0e5kanlgc7z0rhcemvd8erjnfzcyfecl7',
        coingecko_api: 'evmos',
        denom: 'aevmos',
        token_name: 'EVMOS',
        chainId: 'evmos_9001-2',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000000000000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'crescent': {
        name: 'Crescent hub',
        status: false,
        lcd_api: 'https://lcd.crescent-1.bronbro.io',
        rpc_api: 'https://rpc.crescent-1.bronbro.io',
        validator: 'crevaloper1c96vvme4k42zlvkc56fslmdpa2qj6u80xvqwau',
        coingecko_api: 'crescent-network',
        denom: 'ucre',
        token_name: 'CRE',
        chainId: 'crescent-1',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'omniflix': {
        name: 'Omniflix hub',
        status: false,
        lcd_api: 'https://lcd.omniflixhub-1.bronbro.io',
        rpc_api: 'https://rpc.omniflixhub-1.bronbro.io',
        validator: 'omniflixvaloper1e8grpphncncw9hrutyvnlv77n5dejwcne58zk4',
        coingecko_api: 'omniflix-network',
        denom: 'uflix',
        token_name: 'FLIX',
        chainId: 'omniflixhub-1',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'desmos': {
        name: 'Desmos',
        status: false,
        lcd_api: 'https://lcd.desmos-mainnet.bronbro.io',
        rpc_api: 'https://rpc.desmos-mainnet.bronbro.io',
        validator: 'desmosvaloper1sykf8q94l8q8mqstf64ptuvp74ueyehxpgcq76',
        coingecko_api: 'desmos',
        denom: 'udsm',
        token_name: 'DSM',
        chainId: 'desmos-mainnet',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    },
    'stride': {
        name: 'Stride',
        status: false,
        lcd_api: 'https://lcd.stride-1.bronbro.io',
        rpc_api: 'https://rpc.stride-1.bronbro.io',
        validator: 'stridevaloper1hl95uhecs4rwe0g432mknz2tsl84f0ltexpzc3',
        coingecko_api: 'stride',
        denom: 'ustrd',
        token_name: 'STRD',
        chainId: 'stride-1',
        health: 0,
        health_color: 'grey',
        apr: 0,
        speed: 0,
        ibc_tokens: 0,
        ibc_percents: 0,
        availabel_tokens: 0,
        availabel_percents: 0,
        delegations_tokens: 0,
        delegations_percents: 0,
        delegations_price: 0,
        delegations_price_usdt: 0,
        delegations_price_atom: 0,
        delegations_price_eth: 0,
        delegations_price_btc: 0,
        validators: [],
        total_annual_provision: 0,
        RPDE: 0,
        RPDE_usdt: 0,
        RPDE_atom: 0,
        RPDE_eth: 0,
        RPDE_btc: 0,
        RPDE_year_usdt: 0,
        RPDE_year_atom: 0,
        RPDE_year_eth: 0,
        RPDE_year_btc: 0,
        personal_APR: 0,
        price: 0,
        price_usdt: 0,
        price_atom: 0,
        price_eth: 0,
        price_btc: 0,
        balance_usdt: 0,
        balance_atom: 0,
        balance_eth: 0,
        balance_btc: 0,
        exponent: 1000000,
        rewards_tokens: 0,
        rewards_price: 0,
        rewards_price_usdt: 0,
        rewards_price_atom: 0,
        rewards_price_eth: 0,
        rewards_price_btc: 0,
        rewards_percents: 0,
        tokens_sum: 0,
        unbonding_time: 0
    }
}

window.localStorage.setItem('account', JSON.stringify(account))
window.localStorage.setItem('networks', JSON.stringify(networks))


export const useGlobalStore = defineStore('global', {
    state: () => ({
        node: null,
        IPFSStatus: false,
        auth: useLocalStorage('auth', false),
        currency: useLocalStorage('currency', 'BTC'),
        wallets: {},
        tooltip: '',
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
        networkManageModal: 'cosmoshub',
        lastTXS: '',
        manageError: ''
    }),

    actions: {
        // Reset account/networks state
        reset() {
            let defaultAccount = JSON.parse(window.localStorage.getItem('account')),
                defaultNetworks = JSON.parse(window.localStorage.getItem('networks'))

            defaultAccount.userName = useLocalStorage('userName', '')
            defaultAccount.avatar = useLocalStorage('avatar', '')

            Object.assign(this, {
                account: defaultAccount,
                networks: defaultNetworks
            })
        },


        // Avatar
        getAvatar() {
            fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${this.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`)
                .then(response => response.json())
                .then(data => {
                    data.txs
                        ? this.account.avatar = 'https://ipfs.io/ipfs/' + data.txs[0].tx.value.msg[0].value.links[0].to
                        : this.account.avatar = `https://robohash.org/${this.account.userName.toLowerCase()}?set=set4`
                })
        },


        // Networks health
        getNetworksHealth(network) {
            fetch('https://rpc.bronbro.io/bro_data/')
                .then(response => response.json())
                .then(data => {
                    data.infos.forEach(el => {
                        if (this.networks[el.network]) {
                            this.networks[el.network].health = el.health
                            this.networks[el.network].apr = el.apr

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
        getCurrenciesPrice() {
            // ATOM price
            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => this.ATOM_price = data.cosmos.usd)

            // ETH price
            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => this.ETH_price = data.ethereum.usd)

            // BTC price
            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => this.BTC_price = data.bitcoin.usd)
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


        // Networks delegations tokens
        async getNetworkDelegationTokens(network) {
            await fetch(`${this.networks[network].lcd_api}/cosmos/staking/v1beta1/delegations/${this.wallets[network]}`)
                .then(response => response.json())
                .then(data => {
                    if (data.delegation_responses) {
                        let sum = 0

                        data.delegation_responses.forEach(el => sum += parseFloat(el.balance.amount))

                        this.networks[network].delegations_tokens = sum / this.networks[network].exponent

                        if (network == 'bostrom') {
                            this.networks.bostrom.delegations_tokens = sum
                        }
                    }
                })
        },


        // Network rewards tokens
        async getNetworkRewardTokens(network) {
            await fetch(`${this.networks[network].lcd_api}/cosmos/distribution/v1beta1/delegators/${this.wallets[network]}/rewards`)
                .then(response => response.json())
                .then(data => {
                    if (data.total.length) {
                        this.networks[network].rewards_tokens = parseFloat(data.total[0].amount) / this.networks[network].exponent

                        if (network == 'bostrom') {
                            this.networks.bostrom.rewards_tokens = parseFloat(data.total[0].amount)
                        }
                    }
                })
        },


        // Network availabel tokens
        async getNetworkAvailabelTokens(network) {
            await fetch(`${this.networks[network].lcd_api}/cosmos/bank/v1beta1/balances/${this.wallets[network]}`)
                .then(response => response.json())
                .then(data => {
                    let availabel = data.balances.find(e => e.denom == this.networks[network].denom),
                        ibc = data.balances.filter(e => e.denom.includes('ibc/'))

                    // Availabel tokens
                    if (data.balances && data.balances.length && typeof availabel !== "undefined") {
                        this.networks[network].availabel_tokens = parseFloat(availabel.amount) / this.networks[network].exponent

                        if (network == 'bostrom') {
                            this.networks.bostrom.availabel_tokens = parseFloat(availabel.amount)
                        }
                    }

                    // IBC tokens
                    if (data.balances && data.balances.length && typeof ibc !== "undefined") {
                        ibc.forEach(el => {
                            this.networks[network].ibc_tokens += parseFloat(el.amount) / this.networks[network].exponent

                            if (network == 'bostrom') {
                                this.networks[network].ibc_tokens += parseFloat(el.amount)
                            }
                        })
                    }

                    this.networks[network].tokens_sum = this.networks[network].availabel_tokens + this.networks[network].delegations_tokens + this.networks[network].rewards_tokens + this.networks[network].ibc_tokens

                    this.networks[network].delegations_percents = this.networks[network].delegations_tokens * 100 / this.networks[network].tokens_sum
                    this.networks[network].rewards_percents = this.networks[network].rewards_tokens * 100 / this.networks[network].tokens_sum
                    this.networks[network].ibc_percents = this.networks[network].ibc_tokens * 100 / this.networks[network].tokens_sum
                    this.networks[network].availabel_percents = this.networks[network].availabel_tokens * 100 / this.networks[network].tokens_sum
                })
        },


        // Network price
        async getNetworkPrice(network) {
            await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${this.networks[network].coingecko_api}&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => {
                    if (data[this.networks[network].coingecko_api].usd) {
                        this.networks[network].price = data[this.networks[network].coingecko_api].usd

                        this.networks[network].price_usdt = data[this.networks[network].coingecko_api].usd
                        this.networks[network].price_atom = this.networks[network].price / this.ATOM_price
                        this.networks[network].price_eth = this.networks[network].price / this.ETH_price
                        this.networks[network].price_btc = this.networks[network].price / this.BTC_price
                    }
                })
        },


        // Network balance
        getNetworkBalance(network) {
            this.networks[network].balance_usdt = this.networks[network].tokens_sum * this.networks[network].price
            this.networks[network].balance_atom = this.networks[network].tokens_sum * this.networks[network].price_atom
            this.networks[network].balance_eth = this.networks[network].tokens_sum * this.networks[network].price_eth
            this.networks[network].balance_btc = this.networks[network].tokens_sum * this.networks[network].price_btc
        },


        // Network delegations price
        getDelegationsPrice(network) {
            this.networks[network].delegations_price = this.networks[network].delegations_tokens * this.networks[network].price
            this.networks[network].delegations_price_usdt = this.networks[network].delegations_tokens * this.networks[network].price_usdt
            this.networks[network].delegations_price_atom = this.networks[network].delegations_tokens * this.networks[network].price_atom
            this.networks[network].delegations_price_eth = this.networks[network].delegations_tokens * this.networks[network].price_eth
            this.networks[network].delegations_price_btc = this.networks[network].delegations_tokens * this.networks[network].price_btc
        },


        // Network rewards price
        getRewardsPrice(network) {
            this.networks[network].rewards_price = this.networks[network].rewards_tokens * this.networks[network].price
            this.networks[network].rewards_price_usdt = this.networks[network].rewards_tokens * this.networks[network].price_usdt
            this.networks[network].rewards_price_atom = this.networks[network].rewards_tokens * this.networks[network].price_atom
            this.networks[network].rewards_price_eth = this.networks[network].rewards_tokens * this.networks[network].price_eth
            this.networks[network].rewards_price_btc = this.networks[network].rewards_tokens * this.networks[network].price_btc
        },


        // Network data
        async getNetworkData(network) {
            await fetch(`${this.networks[network].lcd_api}/cosmos/staking/v1beta1/delegators/${this.wallets[network]}/validators`)
                .then(response => response.json())
                .then(data => {
                    // Validators
                    if (data.validators.length) {
                        this.networks[network].validators.push(data.validators.find(e => e.operator_address == this.networks[network].validator))
                    }

                    // Annual provision
                    this.networks[network].validators.forEach(el => {
                        el.annual_provision = this.networks[network].delegations_tokens * this.networks[network].apr * (1 - el.commission.commission_rates.rate)

                        // Total annual provision
                        this.networks[network].total_annual_provision += el.annual_provision
                    })

                    // RPDE
                    this.networks[network].RPDE = this.networks[network].total_annual_provision / 365.3

                    this.networks[network].RPDE_usdt = this.networks[network].price_usdt * this.networks[network].RPDE
                    this.networks[network].RPDE_atom = this.networks[network].price_atom * this.networks[network].RPDE
                    this.networks[network].RPDE_eth = this.networks[network].price_eth * this.networks[network].RPDE
                    this.networks[network].RPDE_btc = this.networks[network].price_btc * this.networks[network].RPDE

                    this.networks[network].RPDE_year_usdt = this.networks[network].RPDE_usdt * 365.3
                    this.networks[network].RPDE_year_atom = this.networks[network].RPDE_atom * 365.3
                    this.networks[network].RPDE_year_eth = this.networks[network].RPDE_eth * 365.3
                    this.networks[network].RPDE_year_btc = this.networks[network].RPDE_btc * 365.3

                    // Personal APR
                    this.networks[network].personal_APR = this.networks[network].total_annual_provision / this.networks[network].delegations_tokens * 100
                })
        },


        // Account balance
        getAccountBalance(network) {
            this.account.delegations_price += this.networks[network].delegations_price

            this.account.balance_usdt += this.networks[network].balance_usdt
            this.account.balance_atom += this.networks[network].balance_atom
            this.account.balance_eth += this.networks[network].balance_eth
            this.account.balance_btc += this.networks[network].balance_btc

            this.account.RPDE_usdt += this.networks[network].RPDE_usdt
            this.account.RPDE_atom += this.networks[network].RPDE_atom
            this.account.RPDE_eth += this.networks[network].RPDE_eth
            this.account.RPDE_btc += this.networks[network].RPDE_btc
        },


        // Update one network
        async updateNetwork(network) {
            await this.getNetworkDelegationTokens(network)
            await this.getNetworkRewardTokens(network)
            await this.getNetworkAvailabelTokens(network)
            await this.getNetworkPrice(network)

            this.getNetworkBalance(network)
            this.getDelegationsPrice(network)
            this.getRewardsPrice(network)

            await this.getNetworkData(network)

            this.getAccountBalance(network)
        }
    }
})
