const network = {
    name: 'Evmos',
    status: false,
    lcd_api: 'https://lcd.evmos-9001-2.bronbro.io',
    rpc_api: 'https://rpc.evmos-9001-2.bronbro.io',
    validator: 'evmosvaloper1ce4vh0e5kanlgc7z0rhcemvd8erjnfzcyfecl7',
    denom: 'aevmos',
    token_name: 'EVMOS',
    chainId: 'evmos_9001-2',
    coingecko_api: 'evmos',

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

    rewards_validators: [],

    rewards_price: 0,
    rewards_price_usdt: 0,
    rewards_price_atom: 0,
    rewards_price_eth: 0,
    rewards_price_btc: 0,

    validators: [],
    delegations: [],

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
    personal_APR: 0,

    speed: 0,
    total_annual_provision: 0,
    exponent: 1000000000000000000,
    tokens_sum: 0,
    unbonding_time: 0,
    gas: '250000'
}

export default network