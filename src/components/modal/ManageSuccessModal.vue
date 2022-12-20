<template>
    <section class="modal success" id="success_modal">
        <transition name="fadeUp" mode="out-in" appear type="animation">
        <div class="modal_content" @click.self="emitter.emit('close_manage_success_modal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('close_manage_success_modal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <div class="icon">
                    <img src="@/assets/images/success_modal.svg" alt="">
                </div>

                <div class="title" v-html="$t('message.manage_modal_success_title', { network: store.networkManageModal, hash: store.lastTXS })"></div>

                <div class="btns">
                    <div><button class="btn close_btn" @click.prevent="emitter.emit('close_manage_success_modal')">
                        {{ $t('message.manage_modal_success_back_btn') }}
                    </button></div>
                </div>
            </div>
        </div>
        </transition>

        <transition name="fade" mode="out-in" appear type="animation">
        <div class="overlay"></div>
        </transition>
    </section>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const emitter = inject('emitter'),
        store = useGlobalStore()
</script>