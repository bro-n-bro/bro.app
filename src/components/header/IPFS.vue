<template>
    <div class="ipfs_status" :class="{ green: store.IPFSStatus }" @mouseover="emitter.emit('setNotification', $t('message.ipfs_notice'))">
        <div>{{ $t('message.ipfs') }}</div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n'),
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
    font-size: 15px;  font-weight: 500;  line-height: 18px;  position: relative;  padding-left: 21px;  color: #eb5757;
}

.ipfs_status.green
{
    color: #1bc562;
}


.ipfs_status:before
{
    position: absolute;  top: 0;  bottom: 0;  left: 0;  display: block;  width: 11px;  height: 11px;  margin: auto;  content: '';  border-radius: 50%;  background: currentColor;
}

</style>