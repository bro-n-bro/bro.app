<template>
    <component :is="layout" />


    <notifications width="272px">
        <template #body="props">
            <div class="notification">
                <button class="close" @click="close">
                    <svg><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <div class="icon green" v-if="props.item.type == 'success'">
                    <svg><use xlink:href="/sprite.svg#ic_notification_success"></use></svg>
                </div>

                <div class="icon red" v-if="props.item.type == 'error'">
                    <svg><use xlink:href="/sprite.svg#ic_notification_error"></use></svg>
                </div>

                <div class="icon" v-if="!props.item.type">
                    <svg><use xlink:href="/sprite.svg#ic_notification_progress"></use></svg>
                </div>

                <div class="title"> {{ props.item.title }}</div>

                <div class="text" v-html="props.item.text"></div>
            </div>
        </template>
    </notifications>
</template>


<script setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute(),
        layout = computed(() => route.meta.layout || 'default-layout')
</script>
