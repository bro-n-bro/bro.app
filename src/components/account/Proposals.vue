<template>
    <section class="proposals">
        <div class="head">
            <div class="title">
                {{ $t('message.account_proposals_title') }}
            </div>

            <div class="all_link">
                <router-link :to="`/proposals/${store.currentNetwork}`" class="link">
                    {{ $t('message.btn_see_more') }} &rarr;
                </router-link>
            </div>
        </div>

        <div class="titles">
            <div class="col_network">
                {{ $t('message.account_proposals_col_network') }}
            </div>

            <div class="col_name">
                {{ $t('message.account_proposals_col_name') }}
            </div>

            <div class="col_number"></div>

            <div class="col_type">
                {{ $t('message.account_proposals_col_type') }}
            </div>

            <div class="col_status">
                {{ $t('message.account_proposals_col_status') }}
            </div>
        </div>

        <div class="loader_wrap" v-if="!loading">
            <div class="loader"><span></span></div>
        </div>

        <div class="items" v-else>
            <!-- <pre>{{ data.proposals }}</pre> -->

            <template v-for="(proposal, index) in proposals" :key="index">
            <!-- <router-link :to="`/proposal/${proposal.id}`" class="item" :class="{'hide': index >= 5 && !data.showAll}" v-if="proposal.id != '796' || proposal.status != 'PROPOSAL_STATUS_VOTING_PERIOD'"> -->
            <router-link :to="`/${store.currentNetwork}/proposal/${proposal.id}`" class="item" :class="{ 'hide': index >= 5 && !showAll }">
                <div class="col_network">
                    <template v-if="index < 1">
                    <div class="logo">
                        <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                    </div>

                    <div>{{ store.networks[store.currentNetwork].name }}</div>
                    </template>
                </div>

                <div class="col_name">
                    <div class="name">{{ proposal.title }}</div>
                </div>

                <div class="col_number">№{{ proposal.id }}</div>

                <div class="col_type">
                    <svg class="icon"><use :xlink:href="`/sprite.svg#ic_proposal_${proposal.proposal_type}`"></use></svg>
                </div>

                <div class="col_status">
                    <span v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">{{ $t('message.account_proposals_status_deposite') }}</span>
                    <span v-if="proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'" class="blue">{{ $t('message.account_proposals_status_voting') }}</span>
                    <span v-if="proposal.status == 'PROPOSAL_STATUS_PASSED'" class="green">{{ $t('message.account_proposals_status_passed') }}</span>
                    <span v-if="proposal.status == 'PROPOSAL_STATUS_REJECTED'" class="red">{{ $t('message.account_proposals_status_rejected') }}</span>
                </div>
            </router-link>
            </template>
        </div>

        <button class="spoler_btn" :class="{ 'active': showAll }" @click.prevent="showAll = !showAll" v-if="proposals.length > 5">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>
    </section>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        loading = ref(false),
        proposals = ref([]),
        showAll = ref(false)


    onBeforeMount(() => {
        // Get proposals
        try {
            fetch('https://rpc.bronbro.io/gov/proposals')
                .then(res => res.json())
                .then(response => {
                    proposals.value = response.proposals

                    // Hide loader
                    loading.value = true
                })
        } catch (error) {
            console.log(error)
        }
    })
</script>


<style scoped>
    .proposals
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .proposals .col_network
    {
        width: 148px;
        min-width: 148px;
    }

    .proposals .col_name
    {
        width: 100%;
    }

    .proposals .col_number
    {
        width: 56px;
        min-width: 56px;
    }

    .proposals .col_type
    {
        width: 52px;
        min-width: 52px;
    }

    .proposals .col_status
    {
        width: 124px;
        min-width: 124px;
    }


    .proposals .head
    {
        display: flex;

        margin-bottom: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .proposals .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;
    }


    .proposals .all_link
    {
        color: #950fff;
        font-size: 14px;
        line-height: 100%;

        margin-left: auto;
    }


    .proposals .all_link .link
    {
        color: currentColor;

        white-space: nowrap;
        text-decoration: none;
    }


    .proposals .titles
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        margin-bottom: 8px;
        padding-bottom: 7px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: nowrap;
    }

    .proposals .titles > *
    {
        padding: 8px 10px;
    }


    .proposals .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 20px 0 0;

        background: none;
    }


    .proposals .items > * + *
    {
        margin-top: 5px;
    }

    .proposals .items > * + *:before
    {
        position: absolute;
        top: -3px;
        left: 0;

        display: block;

        width: 100%;
        height: 1px;

        content: '';
        pointer-events: none;

        background: rgba(255, 255, 255, .05);
    }


    .proposals .item
    {
        color: currentColor;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;

        position: relative;

        display: flex;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 8px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .proposals .item.hide
    {
        display: none;
    }

    .proposals .item > *
    {
        display: flex;

        padding: 8px 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .proposals .item .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .proposals .item .logo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;

        object-fit: cover;
    }

    .proposals .item .logo + *
    {
        width: calc(100% - 32px);
    }


    .proposals .item .name
    {
        overflow: hidden;

        width: 100%;

        text-overflow: ellipsis;
    }


    .proposals .item .col_number
    {
        color: #484747;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;

        transition: color .2s linear;
        white-space: nowrap;
    }


    .proposals .item .col_type .icon
    {
        color: #950fff;

        display: block;

        width: 20px;
        height: 20px;

        transition: color .2s linear;
    }


    .proposals .item .col_status > *
    {
        color: #950fff;

        transition: color .2s linear;
    }

    .proposals .item .col_status .blue
    {
        color: #0343e8;
    }

    .proposals .item .col_status .green
    {
        color: #1bc562;
    }

    .proposals .item .col_status .red
    {
        color: #eb5757;
    }


    .proposals .item:hover
    {
        background: #191919;
    }

    .proposals .item:hover .col_number,
    .proposals .item:hover .col_type .icon,
    .proposals .item:hover .col_status > *
    {
        color: #fff !important;
    }


    .proposals .spoler_btn
    {
        position: absolute;
        right: 0;
        bottom: -18px;
        left: 0;

        display: flex;

        width: 36px;
        height: 36px;
        margin: auto;

        transition: background .2s linear;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposals .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;

        transition: transform .2s linear;
    }

    .proposals .spoler_btn:hover
    {
        background: #950fff;
    }

    .proposals .spoler_btn.active .icon
    {
        transform: rotate(180deg);
    }

</style>