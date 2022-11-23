const config = {
    chainId: 'omniflixhub-1',
    chainName: 'omniflixhub',
    rpc: 'https://omniflixhub-rpc.skynetvalidators.com',
    rest: 'https://omniflixhub-api.skynetvalidators.com',
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: 'omniflix',
        bech32PrefixAccPub: 'omniflix' + 'pub',
        bech32PrefixValAddr: 'omniflix' + 'valoper',
        bech32PrefixValPub: 'omniflix' + 'valoperpub',
        bech32PrefixConsAddr: 'omniflix' + 'valcons',
        bech32PrefixConsPub: 'omniflix' + 'valconspub',
    },
    currencies: [
        {
            coinDenom: 'FLIX',
            coinMinimalDenom: 'uflix',
            coinDecimals: 6,
            coinGeckoId: 'omniflix-network',
        },
    ],
    feeCurrencies: [
        {
            coinDenom: 'FLIX',
            coinMinimalDenom: 'uflix',
            coinDecimals: 6,
            coinGeckoId: 'omniflix-network',
            gasPriceStep: {
                low: 0.001,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: 'FLIX',
        coinMinimalDenom: 'uflix',
        coinDecimals: 6,
        coinGeckoId: 'omniflix-network',
    }
}

export default config