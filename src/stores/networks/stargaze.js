const network = {
    name: 'Stargaze',
    status: false,
    lcd_api: 'https://lcd.stargaze-1.bronbro.io',
    rpc_api: 'https://rpc.stargaze-1.bronbro.io',
    validator: 'starsvaloper1y58hfnm90r4efhlydx0gavz57lvm7k6uulkg3h',
    denom: 'ustars',
    token_name: 'STARS',
    chainId: 'stargaze-1',
    coingecko_api: 'stargaze',

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
        address: 'stars1grfk7t0k42yxpwqhr7kt4te7j73m2a3vke2d2h',
        run_time: '19:37',
        minimum_reward: 100000
    }
}

export default network