const config = {
    chainId: 'desmos-mainnet',
    chainName: 'Desmos',
    rpc: 'https://rpc.mainnet.desmos.network',
    rest: 'https://api.mainnet.desmos.network',
    bip44: {
        coinType: 852,
    },
    bech32Config: {
        bech32PrefixAccAddr: 'desmos',
        bech32PrefixAccPub: 'desmos' + 'pub',
        bech32PrefixValAddr: 'desmos' + 'valoper',
        bech32PrefixValPub: 'desmos' + 'valoperpub',
        bech32PrefixConsAddr: 'desmos' + 'valcons',
        bech32PrefixConsPub: 'desmos' + 'valconspub',
    },
    currencies: [
        {
            coinDenom: 'DSM',
            coinMinimalDenom: 'udsm',
            coinDecimals: 6,
            coinGeckoId: 'cosmos',
            coinImageUrl: 'https://app.osmosis.zone/tokens/dsm.svg'
        },
    ],
    features: [
        'stargate',
        'ibc-transfer',
        'no-legacy-stdTx',
        'ibc-go'
    ],
    feeCurrencies: [
        {
            coinDenom: 'DSM',
            coinMinimalDenom: 'udsm',
            coinDecimals: 6,
            coinGeckoId: 'desmos',
            gasPriceStep: {
                low: 0.002,
                average: 0.025,
                high: 0.03
            },
        },
    ],
    stakeCurrency: {
        coinDenom: 'DSM',
        coinMinimalDenom: 'udsm',
        coinDecimals: 6,
        coinGeckoId: 'desmos',
    },
    beta: true
}

export default config