<template>
    <component :is="layout" />

    <notifications width="276px" v-for="(network, index) in store.networks" :key="index" :group="network.denom">
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

                <div>
                    <div class="chain">{{ props.item.data.chain }}</div>
                    <div class="tx_type">{{ props.item.data.tx_type }}</div>
                </div>

                <div class="title">{{ props.item.title }}</div>

                <div class="text" v-html="props.item.text"></div>

                <div class="explorer" v-if="props.item.data.tx_hash">
                    <a :href="`https://www.mintscan.io/${store.networkManageModal}/txs/${props.item.data.tx_hash}`" target="_blank" rel="noopener nofollow">
                        <span>{{ $t('message.notification_explorer_link') }}</span>
                        <svg><use xlink:href="/sprite.svg#ic_link_arrow"></use></svg>
                    </a>
                </div>
            </div>
        </template>
    </notifications>
</template>


<script setup>
    import { computed, onMounted, inject } from 'vue'
    import { useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'

    const route = useRoute(),
        layout = computed(() => route.meta.layout || 'default-layout'),
        store = useGlobalStore(),
        i18n = inject('i18n')


    onMounted(() => {
        // Set title
        document.title = i18n.global.t('message.page_title')
    })
</script>
