const config = {
    chainId: 'desmos-mainnet',
    chainName: 'desmos',
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
        },
    ],
    feeCurrencies: [
        {
            coinDenom: 'DSM',
            coinMinimalDenom: 'udsm',
            coinDecimals: 6,
            coinGeckoId: 'desmos',
            gasPriceStep: {
                low: 0.001,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: 'DSM',
        coinMinimalDenom: 'udsm',
        coinDecimals: 6,
        coinGeckoId: 'desmos',
    }
}

export default config