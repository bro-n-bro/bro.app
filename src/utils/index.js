import { useGlobalStore } from '@/stores'

import { SigningStargateClient } from '@cosmjs/stargate'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

import {
    createTxMsgDelegate,
    createTxMsgBeginRedelegate,
    createTxMsgWithdrawDelegatorReward,
    createTxMsgStakeAuthorization,
    createTxMsgStakeRevokeAuthorization
} from '@evmos/transactions'

import { createTxRaw } from '@evmos/proto'
import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@evmos/provider'


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

    // Send transaction
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