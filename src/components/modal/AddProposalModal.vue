<template>
    <section class="modal" id="add_proposal_modal">
        <div class="modal_content" @click.self="emitter.emit('closeAddProposalModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeAddProposalModal')">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_close"></use></svg>
                </button>

                <div class="modal_title">
                    {{ $t('message.add_proposal_modal_title') }}
                </div>

                <form class="form" @submit.prevent="submitHandler">
                    <div class="line type">
                        <div class="label">
                            {{ $t('message.add_proposal_label_type') }}
                        </div>

                        <div class="field">
                            <div class="current">
                                <svg class="icon"><use xlink:href="/sprite.svg#ic_proposal_Text"></use></svg>
                                <span>{{ $t('message.add_proposal_type_Text') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">
                            {{ $t('message.add_proposal_label_title') }}
                        </div>

                        <div class="field">
                            <input type="text" class="input">
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">
                            {{ $t('message.add_proposal_label_descriptin') }}
                        </div>

                        <div class="field">
                            <textarea name=""></textarea>
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">{{ $t('message.add_proposal_label_deposit') }}, {{ store.networks[store.currentNetwork].token_name }}</div>

                        <div class="field">
                            <input type="number" class="input">
                        </div>
                    </div>

                    <div class="submit">
                        <button type="submit" class="submit_btn">
                            {{ $t('message.add_proposal_submit_btn') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const emitter = inject('emitter'),
        store = useGlobalStore()


    function submitHandler() {

    }
</script>


<style scoped>
    #add_proposal_modal .modal_title
    {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;

        margin-bottom: 30px;
        padding: 6px 52px 6px 0;
    }


    #add_proposal_modal .modal_content .data > .close_btn
    {
        top: 20px;
    }


    .form .line
    {
        margin-bottom: 8px;
    }


    .form .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;

        margin-bottom: 8px;
    }


    .form .field
    {
        position: relative;
    }


    .form .type .current
    {
        display: flex;

        height: 55px;
        padding: 0 9px 2px;

        border: 1px solid transparent;
        border-radius: 17px;
        background: #191919;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .form .type .current .icon
    {
        display: block;

        width: 24px;
        height: 24px;
    }

    .form .type .current span
    {
        width: calc(100% - 32px);
    }


    .form .input
    {
        color: #aaa;
        font-family: var(--font_family);
        font-size: var(--font_size);

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 9px 2px;

        transition: border-color .2s linear;

        border: 1px solid transparent;
        border-radius: 17px;
        background: #191919;
    }

    .form textarea
    {
        color: #aaa;
        font-family: var(--font_family);
        font-size: var(--font_size);

        display: block;

        width: 100%;
        height: 160px;
        padding: 13px 9px;

        resize: none;
        transition: border-color .2s linear;

        border: 1px solid transparent;
        border-radius: 17px;
        background: #191919;
    }

    .form textarea::-webkit-scrollbar
    {
        width: 5px;
        height: 5px;
    }


    .form .input:focus,
    .form textarea:focus
    {
        border-color: #950fff;
    }


    .form .submit
    {
        padding-top: 20px;
    }


    .form .submit_btn
    {
        color: #fff;
        font-weight: 500;
        line-height: 19px;

        display: block;

        width: 100%;
        padding: 16px;

        transition: background .2s linear;

        border-radius: 14px;
        background: #950fff;
    }

    .form .submit_btn:hover
    {
        background: #7700e1;
    }

</style>