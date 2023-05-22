import { useGlobalStore } from '@/stores'

import { Registry } from '@cosmjs/proto-signing'
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import { toUtf8, fromBech32, toBech32 } from '@cosmjs/encoding'
import { createWasmAminoConverters } from "@cosmjs/cosmwasm-stargate";

import {
    createTxMsgDelegate,
    createTxMsgBeginRedelegate,
    createTxMsgWithdrawDelegatorReward,
    createTxMsgStakeAuthorization,
    createTxMsgStakeRevokeAuthorization
} from '@evmos/transactions'

import { createTxRaw } from '@evmos/proto'
import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@evmos/provider'


// Generate wallet
export const generateAddress = (prefix, address) => {
    return toBech32(prefix, fromBech32(address).data)
}


// Get networks data
export const getNetworksData = async () => {
    let store = useGlobalStore()


    // Get currencies price
    let promiseCurrencies = await store.getCurrenciesPrice()


    //======== Evmos
    try{
        // Get status
        store.getNetworkStatus('evmos')

        // Get network tokens
        store.getNetworkTokens('evmos').then(() => {
            // Calc network tokens sum
            store.calcNetworkTokensSum('evmos')

            if(store.networks.evmos.status){
                // Get network data
                let promiseData = store.getNetworkData('evmos')

                Promise.all([promiseData, promiseCurrencies]).then(() => {
                    // Calc network RPDE
                    store.calcNetworkRPDEInCurrency('evmos')

                    // Calc network balance
                    store.calcNetworkBalance('evmos')

                    // Calc delegations price
                    store.calcDelegationsPrice('evmos')

                    // Calc rewards price
                    store.calcRewardsPrice('evmos')

                    // Update account balance
                    store.updateAccountBalance()
                })
            }
        })
    } catch(error) {
        console.log(error)
    }


    //======== JUNO
    // Set wallet address
    store.setWallet('juno', toBech32('juno', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('juno')

    // Get network tokens
    store.getNetworkTokens('juno').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('juno')

        if(store.networks.juno.status){
            // Get network data
            let junoData = store.getNetworkData('juno')

            Promise.all([junoData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('juno')

                // Calc network balance
                store.calcNetworkBalance('juno')

                // Calc delegations price
                store.calcDelegationsPrice('juno')

                // Calc rewards price
                store.calcRewardsPrice('juno')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Cosmos hub
    // Get status
    store.getNetworkStatus('cosmoshub')

    // Get network tokens
    store.getNetworkTokens('cosmoshub').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('cosmoshub')

        if(store.networks.cosmoshub.status){
            // Get network data
            let cosmoshubData = store.getNetworkData('cosmoshub')

            Promise.all([cosmoshubData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('cosmoshub')

                // Calc network balance
                store.calcNetworkBalance('cosmoshub')

                // Calc delegations price
                store.calcDelegationsPrice('cosmoshub')

                // Calc rewards price
                store.calcRewardsPrice('cosmoshub')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Bostrom
    // Set wallet address
    store.setWallet('bostrom', toBech32('bostrom', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('bostrom')

    // Connect to network websocket
    // store.connectNetworkWebsocket('bostrom')

    // store.networks.bostrom.websocket.onopen = () => {
    //     store.networks.bostrom.websocket.send(JSON.stringify({ "jsonrpc": "2.0", "method": "subscribe", "params": ["tm.event = 'Tx'"], "id": 0 }))
    // }

    // Get network tokens
    store.getNetworkTokens('bostrom').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('bostrom')

        if(store.networks.bostrom.status){
            // Get network data
            let bostromData = store.getNetworkData('bostrom')

            Promise.all([bostromData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('bostrom')

                // Calc network balance
                store.calcNetworkBalance('bostrom')

                // Calc delegations price
                store.calcDelegationsPrice('bostrom')

                // Calc rewards price
                store.calcRewardsPrice('bostrom')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Osmosis
    // Set wallet address
    store.setWallet('osmosis', toBech32('osmo', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('osmosis')

    // Get network tokens
    store.getNetworkTokens('osmosis').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('osmosis')

        if(store.networks.emoney.status){
            // Get network data
            let osmosisData = store.getNetworkData('osmosis')

            Promise.all([osmosisData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('osmosis')

                // Calc network balance
                store.calcNetworkBalance('osmosis')

                // Calc delegations price
                store.calcDelegationsPrice('osmosis')

                // Calc rewards price
                store.calcRewardsPrice('osmosis')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== E-money
    // Set wallet address
    store.setWallet('emoney', toBech32('emoney', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('emoney')

    // Get network tokens
    store.getNetworkTokens('emoney').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('emoney')

        if(store.networks.emoney.status){
            // Get network data
            let emoneyData = store.getNetworkData('emoney')

            Promise.all([emoneyData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('emoney')

                // Calc network balance
                store.calcNetworkBalance('emoney')

                // Calc delegations price
                store.calcDelegationsPrice('emoney')

                // Calc rewards price
                store.calcRewardsPrice('emoney')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Gravity bridge
    // Set wallet address
    store.setWallet('gravity', toBech32('gravity', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('gravity')

    // Get network tokens
    store.getNetworkTokens('gravity').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('gravity')

        if(store.networks.gravity.status){
            // Get network data
            let gravityData = store.getNetworkData('gravity')

            Promise.all([gravityData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('gravity')

                // Calc network balance
                store.calcNetworkBalance('gravity')

                // Calc delegations price
                store.calcDelegationsPrice('gravity')

                // Calc rewards price
                store.calcRewardsPrice('gravity')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Stargaze
    // Set wallet address
    store.setWallet('stargaze', toBech32('stars', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('stargaze')

    // Get network tokens
    store.getNetworkTokens('stargaze').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('stargaze')

        if(store.networks.stargaze.status){
            // Get network data
            let stargazeData = store.getNetworkData('stargaze')

            Promise.all([stargazeData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('stargaze')

                // Calc network balance
                store.calcNetworkBalance('stargaze')

                // Calc delegations price
                store.calcDelegationsPrice('stargaze')

                // Calc rewards price
                store.calcRewardsPrice('stargaze')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Stride
    // Set wallet address
    store.setWallet('stride', toBech32('stride', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('stride')

    // Get network tokens
    store.getNetworkTokens('stride').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('stride')

        if(store.networks.stride.status){
            // Get network data
            let strideData = store.getNetworkData('stride')

            Promise.all([strideData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('stride')

                // Calc network balance
                store.calcNetworkBalance('stride')

                // Calc delegations price
                store.calcDelegationsPrice('stride')

                // Calc rewards price
                store.calcRewardsPrice('stride')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    // ======== Desmos
    // Get status
    store.getNetworkStatus('desmos')

    // Get network tokens
    store.getNetworkTokens('desmos').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('desmos')

        if(store.networks.desmos.status){
            // Get network data
            let desmosData = store.getNetworkData('desmos')

            Promise.all([desmosData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('desmos')

                // Calc network balance
                store.calcNetworkBalance('desmos')

                // Calc delegations price
                store.calcDelegationsPrice('desmos')

                // Calc rewards price
                store.calcRewardsPrice('desmos')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Crescent hub
    // Set wallet address
    store.setWallet('crescent', toBech32('cre', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('crescent')

    // Get network tokens
    store.getNetworkTokens('crescent').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('crescent')

        if(store.networks.crescent.status){
            // Get network data
            let crescentData = store.getNetworkData('crescent')

            Promise.all([crescentData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('crescent')

                // Calc network balance
                store.calcNetworkBalance('crescent')

                // Calc delegations price
                store.calcDelegationsPrice('crescent')

                // Calc rewards price
                store.calcRewardsPrice('crescent')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    //======== Omniflix hub
    // Set wallet address
    store.setWallet('omniflix', toBech32('omniflix', fromBech32(store.wallets.cosmoshub).data))

    // Get status
    store.getNetworkStatus('omniflix')

    // Get network tokens
    store.getNetworkTokens('omniflix').then(() => {
        // Calc network tokens sum
        store.calcNetworkTokensSum('omniflix')

        if(store.networks.omniflix.status){
            // Get network data
            let omniflixData = store.getNetworkData('omniflix')

            Promise.all([omniflixData, promiseCurrencies]).then(() => {
                // Calc network RPDE
                store.calcNetworkRPDEInCurrency('omniflix')

                // Calc network balance
                store.calcNetworkBalance('omniflix')

                // Calc delegations price
                store.calcDelegationsPrice('omniflix')

                // Calc rewards price
                store.calcRewardsPrice('omniflix')

                // Update account balance
                store.updateAccountBalance()
            })
        }
    })


    // Open manage modal from url
    if (store.networkManageModal) {
        emitter.emit('openManageModal')
    }
}


// Prepare Tx
export const prepareTx = async (msg, gasSimulate = true) => {
    let store = useGlobalStore()

    // Create request
    let offlineSigner = await window.getOfflineSignerAuto(store.networks[store.networkManageModal].chainId)

    Object.assign(offlineSigner, {
        signAmino: offlineSigner.signAmino ?? offlineSigner.sign
    })

    // RPC endpoint
    let rpcEndpoint = store.networks[store.networkManageModal].rpc_api

    // Client
    let client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner)

    // Simulate gas
    if (gasSimulate) {
        var gasUsed = store.networkManageModal != 'emoney' ? '0' : store.networks.emoney.gas

        if (store.networkManageModal != 'emoney') {
            gasUsed = await client.simulate(store.wallets[store.networkManageModal], msg)
        }
    }

    let fee = {
        amount: [{
            denom: store.networks[store.networkManageModal].denom,
            amount: '0'
        }],
        gas: gasSimulate ? Math.round(gasUsed * 1.3).toString() : '1000000'
    }

    // MENO
    let memo = store.ref ? `bro.${store.ref}` : 'bro.app'

    // Sign transaction
    let txRaw = await client.sign(store.wallets[store.networkManageModal], msg, fee, memo)

    return { txRaw, client }
}



// Prepare EVMOS Tx
export const prepareEVMOSTx = async (params, base_account, TxType) => {
    let store = useGlobalStore()

    // Chain
    let chain = {
        chainId: 9001,
        cosmosChainId: store.networks.evmos.chainId,
    }

    // Sender
    let sender = {
        accountAddress: store.wallets.evmos,
        sequence: base_account.sequence,
        accountNumber: base_account.account_number,
        pubkey: base_account.pub_key.key,
    }

    // Fee
    let fee = {
        amount: '0',
        denom: store.networks.evmos.denom,
        gas: store.networks.evmos.gas,
    }

    // Memo
    let memo = store.ref ? `bro.${store.ref}` : 'bro.app'

    if (TxType == 'delegate') {
        var msg = createTxMsgDelegate(chain, sender, fee, memo, params)
    }

    if (TxType == 'redelegate') {
        var msg = createTxMsgBeginRedelegate(chain, sender, fee, memo, params)
    }

    if (TxType == 'claim') {
        var msg = createTxMsgWithdrawDelegatorReward(chain, sender, fee, memo, params)
    }

    if (TxType == 'restake_enable') {
        var msg = createTxMsgStakeAuthorization(chain, sender, fee, memo, params)
    }

    if (TxType == 'restake_disable') {
        var msg = createTxMsgStakeRevokeAuthorization(chain, sender, fee, memo, params)
    }

    let sign = await window?.keplr?.signDirect(
        store.networks.evmos.chainId,
        sender.accountAddress,
        {
            bodyBytes: msg.signDirect.body.serializeBinary(),
            authInfoBytes: msg.signDirect.authInfo.serializeBinary(),
            chainId: store.networks.evmos.chainId,
            accountNumber: sender.accountNumber,
        },
        { isEthereum: true }
    )

    let rawTx = createTxRaw(sign.signed.bodyBytes, sign.signed.authInfoBytes, [
        new Uint8Array(Buffer.from(sign.signature.signature, 'base64'))
    ])

    return rawTx
}



// Send Tx
export const sendTx = async ({ txRaw, client }) => {
    // Encode TxRaw
    let txBytes = TxRaw.encode(txRaw).finish()

    // Broadcast Tx
    let result = await client.broadcastTx(txBytes, client.broadcastTimeoutMs, client.broadcastPollIntervalMs)

    return result
}



// Send EVMOS Tx
export const sendEVMOSTx = async txRaw => {
    let store = useGlobalStore()

    // Broadcast it
    let postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: generatePostBodyBroadcast(txRaw),
    }

    let broadcastPost = await fetch(`${store.networks.evmos.lcd_api}${generateEndpointBroadcast()}`, postOptions)

    let result = await broadcastPost.json()

    return result
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
                    sender: store.wallets.bostrom,
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
                sender: store.wallets.bostrom,
                contract: store.CONTRACT_ADDRESS_PASSPORT,
                msg: toUtf8(JSON.stringify(params)),
                funds
            })
        })
    }

    // Sign transaction
    let txRaw = await client.sign(store.wallets.bostrom, messages, fee, memo)

    return { txRaw, client }
}