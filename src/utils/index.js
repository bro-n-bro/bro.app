import { useGlobalStore } from '@/stores'
import { Registry } from '@cosmjs/proto-signing'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate'
import { createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import { toUtf8, fromBech32, toBech32 } from '@cosmjs/encoding'


// Generate address
export const generateAddress = (prefix, address) => {
    return toBech32(prefix, fromBech32(address).data)
}


// Create Keplr offline singer
export const createKeplrOfflineSinger = async chainId => {
    let store = useGlobalStore()

    // Get Keplr network enable
    await window.keplr.enable(chainId)

    // Set Offline Singer
    store.Keplr.offlineSinger = await window.getOfflineSignerAuto(chainId)

    // Set Keplr account
    let accounts = await store.Keplr.offlineSinger.getAccounts()
    store.Keplr.account = accounts[0]

    // Set Keplr key
    store.Keplr.key = await window.keplr.getKey(chainId)

    // Set Keplr connected status
    store.isKeplrConnected = true
}



// Prepare create passport Tx
export const preparePassportTx = async params => {
    let store = useGlobalStore()

    // Register type
    let typeRegistry = new Registry([
        ['/cosmwasm.wasm.v1.MsgExecuteContract', MsgExecuteContract]
    ])

    // Amino types
    let aminoTypes = new AminoTypes({
        ...createWasmAminoConverters()
    })

    // Create request
    await window.keplr.enable(store.networks.bostrom.chainId)

    let offlineSigner = await window.getOfflineSignerAuto(store.networks.bostrom.chainId)

    // RPC endpoint
    let rpcEndpoint = store.networks.bostrom.rpc_api

    // Client
    let client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner, {
        registry: typeRegistry,
        aminoTypes
    })

    // Fee
    let fee = {
        amount: [{
            denom: store.networks.bostrom.denom,
            amount: '0'
        }],
        gas: '1000000'
    }

    // MENO
    let memo = store.ref ? `bro.${store.ref}` : 'bro.app'

    // Funds
    let funds = []

    // Params
    let messages = []

    if(Array.isArray(params)) {
        params.forEach(el => {
            messages.push({
                typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
                value: MsgExecuteContract.fromPartial({
                    sender: generateAddress('bostrom', store.Keplr.account.address),
                    contract: store.CONTRACT_ADDRESS_PASSPORT,
                    msg: toUtf8(JSON.stringify(el)),
                    funds
                })
            })
        })
    } else {
        messages.push({
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: MsgExecuteContract.fromPartial({
                sender: generateAddress('bostrom', store.Keplr.account.address),
                contract: store.CONTRACT_ADDRESS_PASSPORT,
                msg: toUtf8(JSON.stringify(params)),
                funds
            })
        })
    }

    // Sign transaction
    let txRaw = await client.sign(generateAddress('bostrom', store.Keplr.account.address), messages, fee, memo)

    return { txRaw, client }
}



// Prepare Tx
export const prepareTx = async (msg, gasSimulate = true, chain = store.currentNetwork) => {
    let store = useGlobalStore()

    // Create request
    let offlineSigner = await window.getOfflineSignerAuto(store.networks[chain].chainId)

    Object.assign(offlineSigner, {
        signAmino: offlineSigner.signAmino ?? offlineSigner.sign
    })

    // RPC endpoint
    let rpcEndpoint = store.networks[chain].rpc_api

    // Client
    let client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner)

    // Simulate gas
    if (gasSimulate) {
        gasUsed = await client.simulate(generateAddress(store.networks[chain].address_prefix, store.account.currentWallet), msg)
    }

    let fee = {
        amount: [{
            denom: store.networks[chain].denom,
            amount: '0'
        }],
        gas: gasSimulate ? Math.round(gasUsed * 1.3).toString() : '1000000'
    }

    // MENO
    let memo = store.ref ? `bro.${store.ref}` : 'bro.app'

    // Sign transaction
    let txRaw = await client.sign(generateAddress(store.networks[chain].address_prefix, store.account.currentWallet), msg, fee, memo)

    return { txRaw, client }
}



// Send Tx
export const sendTx = async ({ txRaw, client }) => {
    // Encode TxRaw
    let txBytes = TxRaw.encode(txRaw).finish()

    // Broadcast Tx
    let result = await client.broadcastTx(txBytes, client.broadcastTimeoutMs, client.broadcastPollIntervalMs)

    return result
}



// Currency conversion
export const currencyСonversion = (amount, currency) => {
    let store = useGlobalStore(),
        tokenPrice = formatTokenPrice(store.prices.find(el => el.symbol == currency).price, currency),
        toPrice = 1

    if (store.currentCurrency != 'USDT') {
        currency = store.currentCurrency

        if (currency == 'BTC') {
            currency = formatTokenName('BTC')
        }

        toPrice = formatTokenPrice(store.prices.find(el => el.symbol == currency).price, currency)
    }

    return amount * (tokenPrice / toPrice)
}



// Formating token name
export const formatTokenName = (tokenName) => {
    let store = useGlobalStore(),
        newTokenName = ''

    newTokenName = store.formatableTokens.find(el => el.tokenName == tokenName)

    return newTokenName ? newTokenName.formatTokenName : tokenName
}


// Formating token amount
export const formatTokenAmount = (amount, tokenName) => {
    let store = useGlobalStore(),
        formatAmount = 0,
        formatableToken = store.formatableTokens.find(el => el.tokenName == tokenName)

    formatableToken
        ? formatAmount = amount / Math.pow(10, formatableToken.exponent)
        : formatAmount = amount / Math.pow(10, store.prices.find(el => el.symbol == tokenName).exponent)

    return formatAmount
}


// Formating token amount to current denom
export const formatAmountToCurrentDenom = (amount, tokenName) => {
    let store = useGlobalStore()

    return amount * (store.prices.find(e => e.symbol == tokenName).price / store.prices.find(e => e.symbol == store.networks[store.currentNetwork].token_name).price)
}


// Formating token price
export const formatTokenPrice = (price, tokenName) => {
    let store = useGlobalStore(),
        formatPrice = 0,
        formatableToken = store.formatableTokens.find(el => el.tokenName == tokenName)

    formatableToken
        ? formatPrice = price * Math.pow(10, formatableToken.exponent)
        : formatPrice = price

    return formatPrice
}