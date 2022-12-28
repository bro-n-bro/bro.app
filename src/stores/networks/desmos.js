const network = {
    name: 'Desmos',
    status: false,
    lcd_api: 'https://lcd.desmos-mainnet.bronbro.io',
    rpc_api: 'https://rpc.desmos-mainnet.bronbro.io',
    websocket_url: 'wss://rpc.websocket.bronbro.io:443/websocket',
    validator: 'desmosvaloper1sykf8q94l8q8mqstf64ptuvp74ueyehxpgcq76',
    denom: 'udsm',
    token_name: 'DSM',
    chainId: 'desmos-mainnet',
    coingecko_api: 'desmos',

    health: 0,
    health_color: 'grey',

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

    rewards_tokens: 0,
    rewards_percents: 0,

    rewards_price: 0,
    rewards_price_usdt: 0,
    rewards_price_atom: 0,
    rewards_price_eth: 0,
    rewards_price_btc: 0,

    validators: [],
    delegations: [],
    rewards: [],

    RPDE: 0,
    RPDE_usdt: 0,
    RPDE_atom: 0,
    RPDE_eth: 0,
    RPDE_btc: 0,

    RPDE_year_usdt: 0,
    RPDE_year_atom: 0,
    RPDE_year_eth: 0,
    RPDE_year_btc: 0,

    price: 0,
    price_usdt: 0,
    price_atom: 0,
    price_eth: 0,
    price_btc: 0,

    balance_usdt: 0,
    balance_atom: 0,
    balance_eth: 0,
    balance_btc: 0,

    apr: 0,
    apy: 0,
    personal_APR: 0,

    speed: 0,
    total_annual_provision: 0,
    exponent: 1000000,
    tokens_sum: 0,
    unbonding_time: 0,

    restake: {
        address: 'desmos1vaycuz987q8g8lw6kuvy4fp7dfy7yp093rj9av',
        run_time: '19:37',
        minimum_reward: 100000
    }
}

export default network