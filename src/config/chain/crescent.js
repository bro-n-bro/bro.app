const config = {
    chainId: 'crescent-1',
    chainName: 'crescent',
    rpc: 'https://mainnet.crescent.network:26657',
    rest: 'https://mainnet.crescent.network:1317',
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: 'cre',
        bech32PrefixAccPub: 'cre' + 'pub',
        bech32PrefixValAddr: 'cre' + 'valoper',
        bech32PrefixValPub: 'cre' + 'valoperpub',
        bech32PrefixConsAddr: 'cre' + 'valcons',
        bech32PrefixConsPub: 'cre' + 'valconspub',
    },
    currencies: [
        {
            coinDenom: 'CRE',
            coinMinimalDenom: 'ucre',
            coinDecimals: 6,
            coinGeckoId: 'crescent-network',
        },
    ],
    feeCurrencies: [
        {
            coinDenom: 'CRE',
            coinMinimalDenom: 'ucre',
            coinDecimals: 6,
            coinGeckoId: 'crescent-network',
            gasPriceStep: {
                low: 0.001,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: 'CRE',
        coinMinimalDenom: 'ucre',
        coinDecimals: 6,
        coinGeckoId: 'crescent-network',
    }
}

export default config