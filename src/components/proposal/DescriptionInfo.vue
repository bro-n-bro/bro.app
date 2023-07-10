<template>
    <section class="description" :class="{ active: showDescription }" @click.self="showDescription = !showDescription">
        <div class="title">{{ $t('message.proposal_desc_title') }}</div>

        <div class="icon">
            <svg><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>

        <div class="text_block" v-html="parseMarkdown(props.proposal.description)"></div>

        <div class="features">
            <div v-if="props.proposal.content.plan && props.proposal.content.plan.height.length">
                <div class="label">{{ $t('message.proposal_feature_height_label') }}</div>

                <div class="val">{{ props.proposal.content.plan.height }}</div>
            </div>

            <div v-if="props.proposal.content.plan && props.proposal.content.plan.info.length">
                <div class="label">{{ $t('message.proposal_feature_info_label') }}</div>

                <div class="val full_w">
                    <pre>{{ JSON.parse(props.proposal.content.plan.info) }}</pre>
                </div>
            </div>

            <div v-if="props.proposal.content.plan && props.proposal.content.plan.name.length">
                <div class="label">{{ $t('message.proposal_feature_name_label') }}</div>

                <div class="val">{{ props.proposal.content.plan.name }}</div>
            </div>

            <div v-if="props.proposal.content.plan && props.proposal.content.plan.time.length">
                <div class="label">{{ $t('message.proposal_feature_time_label') }}</div>

                <div class="val">{{ props.proposal.content.plan.time }}</div>
            </div>

            <div v-if="props.proposal.content.changes.length && props.proposal.content.changes[0].key">
                <div class="label">{{ $t('message.proposal_feature_changes_key_label') }}</div>

                <div class="val">{{ props.proposal.content.changes[0].key }}</div>
            </div>

            <div v-if="props.proposal.content.changes.length && props.proposal.content.changes[0].subspace">
                <div class="label">{{ $t('message.proposal_feature_changes_subspace_label') }}</div>

                <div class="val">{{ props.proposal.content.changes[0].subspace }}</div>
            </div>

            <div v-if="props.proposal.content.changes.length && props.proposal.content.changes[0].value">
                <div class="label">{{ $t('message.proposal_feature_changes_value_label') }}</div>

                <div class="val">{{ props.proposal.content.changes[0].value }}</div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { ref } from 'vue'
    import { marked } from 'marked'


    const props = defineProps(['proposal']),
        showDescription = ref(true)


    // Parse markdown
    function parseMarkdown(data) {
        return marked.parse(data)
    }
</script>


<style scoped>
    .description
    {
        position: relative;

        overflow: hidden;

        height: 128px;
        padding: 16px;

        cursor: pointer;
        transition: height .2s linear;

        border-radius: 10px;
        background: #191919;
    }

    .description:after
    {
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        content: '';

        background:    -moz-linear-gradient(top,  rgba(25,25,25,0) 0%, rgba(25,25,25,1) 100%);
        background: -webkit-linear-gradient(top,  rgba(25,25,25,0) 0%,rgba(25,25,25,1) 100%);
        background:         linear-gradient(to bottom,  rgba(25,25,25,0) 0%,rgba(25,25,25,1) 100%);
    }


    .description .title
    {
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;

        margin-bottom: 16px;

        pointer-events: none;
    }

    .description .text_block
    {
        width: calc(100% - 48px);

        pointer-events: none;
    }


    .description .features > *
    {
        font-size: 14px;
        line-height: 100%;

        display: flex;

        margin-top: 16px;

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }


    .description .features .label
    {
        width: 168px;
        padding-right: 16%;
    }

    .description .features .val
    {
        width: calc(100% - 168px);
        margin-left: auto;
    }

    .description .features .val.full_w
    {
        width: 100%;
        margin-top: 12px;
    }


    .description .features pre
    {
        line-height: 20px;

        display: block;
        overflow: auto;

        width: 100%;
        max-height: 200px;
        padding: 8px;

        border-radius: 8px;
        background: #282828;
    }

    .description .features pre::-webkit-scrollbar
    {
        width: 4px;
        height: 4px;
    }


    .description .icon
    {
        position: absolute;
        z-index: 3;
        top: 48px;
        right: 16px;

        display: flex;

        width: 32px;
        height: 32px;

        pointer-events: none;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .description .icon svg
    {
        display: block;

        width: 32px;
        height: 32px;

        transition: transform .2s linear;
    }


    .description.active
    {
        height: auto;

        cursor: auto;
    }

    .description.active:after
    {
        display: none;
    }

    .description.active .icon svg
    {
        transform: rotate(-180deg);
    }
</style>