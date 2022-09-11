<template>
    <section class="modal success" id="success_modal">
        <div class="modal_content">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('close_manage_success_modal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <div class="icon">
                    <img src="../assets/images/success_modal.svg" alt="">
                </div>

                <div class="title">
                    {{ $t('message.manage_modal_success_title') }}
                </div>

                <div class="desc">
                    {{ $t('message.manage_modal_success_desc') }}
                </div>

                <div class="btns">
                    <div><button class="btn close_btn" @click.prevent="emitter.emit('close_manage_success_modal')">
                        {{ $t('message.manage_modal_back_btn') }}
                    </button></div>
                </div>
            </div>
        </div>

        <div class="overlay" @click.prevent="emitter.emit('close_manage_success_modal')"></div>
    </section>
</template>


<script setup>
    import { inject } from 'vue'

    const emitter = inject('emitter')
</script>