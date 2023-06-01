<template>
    <MobilePlug v-if="WW < 1280" />

    <template v-else>
    <div class="loader_wrap" v-if="!store.appLoaded">
        <div class="loader"><span></span></div>
    </div>

    <component :is="layout" v-else />

    <notifications width="280px" v-for="(network, index) in store.networks" :key="index" :group="network.denom">
        <template #body="props">
            <div class="notification">
                <div class="icon green" v-if="props.item.type == 'success'">
                    <svg><use xlink:href="/sprite.svg#ic_notification_success"></use></svg>
                </div>

                <div class="icon red" v-if="props.item.type == 'error'">
                    <svg><use xlink:href="/sprite.svg#ic_notification_error"></use></svg>
                </div>

                <div class="icon" v-if="!props.item.type">
                    <svg><use xlink:href="/sprite.svg#ic_notification_progress"></use></svg>
                </div>

                <div v-if="props.item.data.chain && props.item.data.tx_type">
                    <div class="chain">{{ props.item.data.chain }}</div>
                    <div class="tx_type">{{ props.item.data.tx_type }}</div>
                </div>

                <div class="title">{{ props.item.title }}</div>

                <div class="text" v-html="props.item.text" v-if="props.item.text"></div>

                <div class="explorer" v-if="props.item.data.tx_hash">
                    <template v-if="store.networkManageModal == 'cosmoshub'">
                    <a :href="`https://www.mintscan.io/cosmos/txs/${props.item.data.tx_hash}`" target="_blank" rel="noopener nofollow">
                        <span>{{ $t('message.notification_explorer_link') }}</span>
                        <svg><use xlink:href="/sprite.svg#ic_link_arrow"></use></svg>
                    </a>
                    </template>

                    <template v-else-if="store.networkManageModal == 'gravity'">
                    <a :href="`https://www.mintscan.io/gravity-bridge/txs/${props.item.data.tx_hash}`" target="_blank" rel="noopener nofollow">
                        <span>{{ $t('message.notification_explorer_link') }}</span>
                        <svg><use xlink:href="/sprite.svg#ic_link_arrow"></use></svg>
                    </a>
                    </template>

                    <template v-else>
                    <a :href="`https://www.mintscan.io/${store.networkManageModal}/txs/${props.item.data.tx_hash}`" target="_blank" rel="noopener nofollow">
                        <span>{{ $t('message.notification_explorer_link') }}</span>
                        <svg><use xlink:href="/sprite.svg#ic_link_arrow"></use></svg>
                    </a>
                    </template>
                </div>
            </div>
        </template>
    </notifications>


    <notifications width="280px" group="default">
        <template #body="props">
            <div class="notification">
                <div class="icon green" v-if="props.item.type == 'success'">
                    <svg><use xlink:href="/sprite.svg#ic_notification_success"></use></svg>
                </div>

                <div class="icon red" v-if="props.item.type == 'error'">
                    <svg><use xlink:href="/sprite.svg#ic_notification_error"></use></svg>
                </div>

                <div class="icon" v-if="!props.item.type">
                    <svg><use xlink:href="/sprite.svg#ic_notification_progress"></use></svg>
                </div>

                <div class="title">{{ props.item.title }}</div>

                <div class="text" v-html="props.item.text" v-if="props.item.text"></div>
            </div>
        </template>
    </notifications>
    </template>
</template>


<script setup>
    import { computed, onBeforeMount, inject, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'

    // Components
    import MobilePlug from '@/components/MobilePlug.vue'


    const route = useRoute(),
        layout = computed(() => route.meta.layout || 'default-layout'),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter')

    let WW = ref(window.innerWidth)


    onBeforeMount(() => {
        // Set title
        document.title = i18n.global.t('message.page_title')

        // Window resize
        window.addEventListener('resize', () => WW.value = window.innerWidth)
    })


    // Event "connect wallet"
    emitter.on('connectWallet', async () => await store.connectWallet())


    // Event "set notification"
    emitter.on('setNotification', notice => {
        // Animation finish
        store.tooltipAnimate = false

        // Update text
        store.tooltip = notice

        // Animation start
        setTimeout(() => store.tooltipAnimate = true, 10)
    })


    // Event "open manage modal"
    emitter.on('openManageModal', async function(modal_data = { network: store.networkManageModal }) {
        await fetch(`${store.networks[modal_data.network].lcd_api}/cosmos/staking/v1beta1/params`)
            .then(response => response.json())
            .then(data => {
                store.showManageModal = true,
                store.manageModalNetwork = modal_data.network,
                store.validatorManageModal = modal_data.validator,
                store.networks[modal_data.network].unbonding_time = parseInt(data.params.unbonding_time)

                document.body.classList.add('lock')
            })
    })


    // Event "close manage modal"
    emitter.on('closeManageModal', function() {
        store.showManageModal = false
        state.networkManageModal = ''
        store.validatorManageModal = {}

        document.body.classList.remove('lock')
    })


    // Event "open manage success modal"
    emitter.on('openManageSuccessModal', async function() {
        store.showManageSuccessModal = true

        document.body.classList.add('lock')
    })


    // Event "close manage success modal"
    emitter.on('closeManageSuccessModal', function() {
        store.showManageSuccessModal = false

        document.body.classList.remove('lock')
    })


    // Event "open manage error modal"
    emitter.on('openManageErrorModal', async function() {
        store.showManageErrorModal = true

        document.body.classList.add('lock')
    })


    // Event "close manage error modal"
    emitter.on('closeManageErrorModal', function() {
        store.showManageErrorModal = false

        document.body.classList.remove('lock')
    })
</script>
