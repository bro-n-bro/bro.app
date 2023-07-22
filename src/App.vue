<template>
    <div class="loader_wrap" v-if="!store.isAppFullLoaded">
        <div class="loader"><span></span></div>
    </div>


    <component :is="layout" v-else />


    <notifications width="280px" group="default">
        <template #body="props">
            <div class="notification">
                <div class="icon green" v-if="props.item.type == 'success'">
                    <svg><use xlink:href="@/assets/sprite.svg#ic_notification_success"></use></svg>
                </div>

                <div class="icon red" v-if="props.item.type == 'error'">
                    <svg><use xlink:href="@/assets/sprite.svg#ic_notification_error"></use></svg>
                </div>

                <div class="icon" v-if="!props.item.type">
                    <svg><use xlink:href="@/assets/sprite.svg#ic_notification_progress"></use></svg>
                </div>

                <div v-if="props.item.data.chain && props.item.data.tx_type">
                    <div class="chain">{{ props.item.data.chain }}</div>
                    <div class="tx_type">{{ props.item.data.tx_type }}</div>
                </div>

                <div class="title">{{ props.item.title }}</div>

                <div class="text" v-html="props.item.text" v-if="props.item.text"></div>

                <div class="explorer" v-if="props.item.data.tx_hash">
                    <a :href="`https://www.mintscan.io/cosmos/txs/${props.item.data.tx_hash}`" target="_blank" rel="noopener nofollow">
                        <span>{{ $t('message.notification_explorer_link') }}</span>
                        <svg><use xlink:href="@/assets/sprite.svg#ic_link_arrow"></use></svg>
                    </a>
                </div>
            </div>
        </template>
    </notifications>
</template>


<script setup>
    import { computed, onBeforeMount, inject } from 'vue'
    import { useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'
    import { useTitle } from '@vueuse/core'


    const route = useRoute(),
        layout = computed(() => route.meta.layout || 'default-layout'),
        store = useGlobalStore(),
        i18n = inject('i18n'),
        router = useRouter(),
        emitter = inject('emitter'),
        title = useTitle()


    onBeforeMount(() => {
        // Set title
        title.value = i18n.global.t('message.page_title')


        // Change Keplr account
		window.addEventListener('keplr_keystorechange', () => {
			// Reload page
			if(!store.showAddAddressModal) {
				window.location.reload()
			}
		})
    })


    // Event "init APP"
    emitter.on('initApp', async () => {
        window.keplr
            ? router.push('/')
            : router.push('/keplr_error')
    })


    // Event "set notification"
    emitter.on('setNotification', notice => {
        // Tooltip animation finish
        store.tooltipAnimate = false

        // Update tooltip text
        store.tooltip = notice

        // Tooltip Animation start
        setTimeout(() => store.tooltipAnimate = true, 10)
    })
</script>
