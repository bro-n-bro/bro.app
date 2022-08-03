<template>
    <div class="ipfs_status" :class="{ green: store.IPFSStatus }">
        <div>{{ $t('message.ipfs') }}</div>

        <div class="hover">{{ $t('message.ipfs_tooltip') }}</div>
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        node = Ipfs.create({
        // repo: 'ipfs-repo-cyber',
        init: true,
        start: true,
        relay: {
            enabled: true,
            hop: {
                enabled: true,
            },
        },
        EXPERIMENTAL: {
            pubsub: true,
        },
        config: {
            Addresses: {
                Swarm: [
                    // '/dns4/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
                    // '/dns6/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
                    '/dns4/ws-star.discovery.cybernode.ai/tcp/443/wss/p2p-webrtc-star',
                    // '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB',
                ],
            },
            Bootstrap: [
                // '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB'
                '/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB',
                // '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
                // '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
            ],
        },
    })

    if (node !== null) {
        store.$patch({ node: node })
        store.$patch({ IPFSStatus: true })
    }
</script>


<style scoped>
    .ipfs_status
    {
        color: #eb5757;
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;

        position: relative;

        padding-left: 21px;
    }

    .ipfs_status.green
    {
        color: #1bc562;
    }


    .ipfs_status .hover
    {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;

        position: absolute;
        top: 100%;
        right: -40px;

        visibility: hidden;

        width: 220px;
        margin-top: 36px;
        padding: 11px 19px;

        transition: .2s linear;
        text-align: right;
        pointer-events: none;

        opacity: 0;
        border-radius: 20px;
        background: #353535;
    }

    .ipfs_status.green:hover .hover
    {
        visibility: visible;

        margin-top: 16px;

        opacity: 1;
    }


    .ipfs_status:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        display: block;

        width: 11px;
        height: 11px;
        margin: auto;

        content: '';

        border-radius: 50%;
        background: currentColor;
    }

</style>