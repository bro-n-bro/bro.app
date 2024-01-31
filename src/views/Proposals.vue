<template>
    <section class="proposals_page">
        <div class="cont middle">
            <div class="back_btn">
                <router-link :to="`/account/${store.currentNetwork}?demo=true`" class="btn" v-if="store.demo">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>

                <router-link :to="`/account/${store.currentNetwork}`" class="btn" v-else>
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>
            </div>


            <div class="grid row">
                <section class="col">
                    <!-- Networks -->
                    <Networks />
                </section>


                <section class="col_main">
                    <div class="head">
                        <div class="title">
                            {{ $t('message.account_proposals_title') }}
                        </div>
                    </div>

                    <!-- <pre>{{ data.proposals }}</pre> -->

                    <div class="loader_wrap" v-if="loading">
                        <div class="loader"><span></span></div>
                    </div>

                    <div class="proposals" v-else>
                        <ProposalsItem v-for="(proposal, index) in data.proposals" :key="index" :proposal="proposal" />
                    </div>


                    <div class="empty" v-if="!loading && !data.proposals.length">
                        <img src="@/assets/images/empty_proposals.svg" alt="">

                        <div class="title">{{ $t('message.proposals_empty_title') }}</div>
                    </div>


                    <template v-if="data.proposals.length">
                    <div class="loader_wrap" v-if="data.loading">
                        <div class="loader"><span></span></div>
                    </div>

                    <div class="load_more_area"></div>
                    </template>
                </section>


                <section class="col">
                    <!-- Filter -->
                    <div class="filter">
                        <div class="title" @click.prevent="toggleActiveClass">
                            <span>{{ $t('message.filter_title') }}</span>

                            <svg class="arr"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
                        </div>

                        <div class="items" :class="{ lock: lockFilter }">
                            <button class="btn" :class="{'active': !data.filter.length}" @click.prevent="resetFilter">
                                <span>{{ $t('message.account_proposals_status_all') }}</span>
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn" :class="{'active': data.filter_deposit}" @click.prevent="setFilter('deposit')">
                                <span>{{ $t('message.account_proposals_status_deposite') }}</span>
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn" :class="{'active': data.filter_passed}" @click.prevent="setFilter('passed')">
                                <span>{{ $t('message.account_proposals_status_passed') }}</span>
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn" :class="{'active': data.filter_rejected}" @click.prevent="setFilter('rejected')">
                                <span>{{ $t('message.account_proposals_status_rejected') }}</span>
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn" :class="{'active': data.filter_voting}" @click.prevent="setFilter('voting')">
                                <span>{{ $t('message.account_proposals_status_voting') }}</span>
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Button up -->
                    <ButtonUp />
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onBeforeMount, reactive, ref, inject, watch, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useUrlSearchParams } from '@vueuse/core'

    // Components
    import Networks from '../components/account/Networks.vue'
    import ProposalsItem from '../components/account/ProposalsItem.vue'
    import ButtonUp from '../components/ButtonUp.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        loading = ref(true),
        lockFilter = ref(false),
        urlParams = useUrlSearchParams('history'),
        data = reactive({
            loading: false,
            allReceived: false,
            showButtonUp: false,
            filter_deposit: false,
            filter_voting: false,
            filter_passed: false,
            filter_rejected: false,
            filter: ''
        })


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_proposals_page')

        // Get proposals
        try {
            store.proposalsFilter
                ? await setFilter(store.proposalsFilter)
                : await getProposals()
        } catch (error) {
            console.error(error)
        }
    })


    watch(computed(() => store.currentNetwork), async () => {
        // Show loader
        loading.value = true

        // Clear data
        data.proposals = []
        data.offset = 0
        data.limit = 10

        // Get proposals
        try {
            store.proposalsFilter
                ? await setFilter(store.proposalsFilter)
                : await getProposals()
        } catch (error) {
            console.error(error)
        }
    })


    // Load more proposals
    async function loadMoreProposals() {
        data.loading = true
        data.offset = data.offset + data.limit

        // Get proposals
        await getProposals(true)
    }


    // Set filter
    async function setFilter(status) {
        let urlFilter = '',
            statuses = status.split('-')

        for (status of statuses) {
            if(status == 'deposit') {
                data.filter_deposit = !data.filter_deposit
            }

            if(status == 'voting') {
                data.filter_voting = !data.filter_voting
            }

            if(status == 'passed') {
                data.filter_passed = !data.filter_passed
            }

            if(status == 'rejected') {
                data.filter_rejected = !data.filter_rejected
            }
        }

        data.filter = ''

        if(data.filter_deposit) {
            if(urlFilter.length) { urlFilter += '-' }
            urlFilter += 'deposit'
            data.filter += ',PROPOSAL_STATUS_DEPOSIT_PERIOD'
        }

        if(data.filter_voting) {
            if(urlFilter.length) { urlFilter += '-' }
            urlFilter += 'voting'
            data.filter += ',PROPOSAL_STATUS_VOTING_PERIOD'
        }

        if(data.filter_passed) {
            if(urlFilter.length) { urlFilter += '-' }
            urlFilter += 'passed'
            data.filter += ',PROPOSAL_STATUS_PASSED'
        }

        if(data.filter_rejected) {
            if(urlFilter.length) { urlFilter += '-' }
            urlFilter += 'rejected'
            data.filter += ',PROPOSAL_STATUS_REJECTED'
        }

        // Set params to URL
        urlParams.filter = urlFilter

        data.allReceived = false

        // Get proposals
        await getProposals()
    }


    // Reset filter
    async function resetFilter() {
        data.allReceived = false
        data.filter_deposit = false
        data.filter_voting = false
        data.filter_passed = false
        data.filter_rejected = false
        data.filter = ''

        // Get proposals
        await getProposals()
    }


    // Get proposals
    async function getProposals(loadMore = false) {
        // Lock filter
        lockFilter.value = true

        let url = ''

        if(!loadMore) {
            // Show loader
            loading.value = true

            // Clear data
            data.proposals = []
            data.offset = 0
            data.limit = 10
        }

        !data.filter.length
            ? url = `${store.networks[store.currentNetwork].index_api}/gov/proposals?limit=${data.limit}&offset=${data.offset}`

            : url = `${store.networks[store.currentNetwork].index_api}/gov/proposals?limit=${data.limit}&offset=${data.offset}&status__in=${data.filter.substring(1)}`

        await fetch(url)
            .then(res => res.json())
            .then(response => {
                response.proposals.length
                    ? data.proposals = data.proposals.concat(response.proposals)
                    : data.allReceived = true

                if (response.proposals.length < data.limit) {
                    data.allReceived = true
                }

                if (!loadMore) {
                    // Hide loader
                    loading.value = false
                } else {
                    // Hide loader
                    data.loading = false
                }

                // Lock filter
                lockFilter.value = false
            })

        // Load more proposals
        observer.observe(document.querySelector('.load_more_area'))
    }


    // Load more proposals
    function scrollTracking(entries) {
        for (const entry of entries) {
            if (entry.intersectionRatio >= 1 && !data.loading && !data.allReceived) {
                loadMoreProposals()
            }
        }
    }

    var observer = new IntersectionObserver(scrollTracking, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    })


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.classList.toggle('active')
    }
</script>


<style scoped>
    .back_btn
    {
        margin-bottom: 20px;
    }


    .back_btn .btn
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 36px;
        height: 36px;

        transition: background .2s linear;
        text-decoration: none;

        color: currentColor;
        border-radius: 50%;
        background: #141414;
    }


    .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
    }


    .back_btn .btn:hover
    {
        background: #950fff;
    }


    .grid
    {
        align-content: stretch;
        align-items: stretch;
        justify-content: space-between;
    }


    .col
    {
        position: relative;

        width: 353px;
        max-width: 100%;
    }

    .col_main
    {
        width: calc(100% - 746px);
    }


    .head
    {
        position: sticky;
        z-index: 9;
        top: 118px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-top: -28px;
        padding: 28px 0 20px;

        background: var(--bg);
    }


    .head .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 100%;
    }


    .head .create_link
    {
        font-size: 16px;
        font-weight: 500;
        line-height: 110%;

        display: block;

        margin-left: auto;
        padding: 14px 20px;

        transition: background .2s linear;
        text-decoration: none;

        color: currentColor;
        border-radius: 16px;
        background: #950fff;
    }

    .head .create_link:hover
    {
        background: #7700e1;
    }


    .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 20px 0 0;

        background: none;
    }



    .proposals
    {
        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-bottom: -20px;
        margin-left: -20px;
    }

    .proposals > *
    {
        width: calc(50% - 20px);
        margin-bottom: 20px;
        margin-left: 20px;
    }



    .empty
    {
        padding: 36px 68px;

        text-align: center;
    }


    .empty img
    {
        display: block;

        max-width: 50%;
        margin: 0 auto 24px;
    }


    .empty .title
    {
        font-size: 30px;
        font-weight: 600;

        width: 553px;
        max-width: 100%;
        margin: 0 auto;
    }



    .load_more_area
    {
        width: 100%;
        height: 1px;
    }



    .filter
    {
        position: sticky;
        top: 118px;

        padding: 16px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .filter .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        pointer-events: none;
    }

    .filter .title > *
    {
        pointer-events: none;
    }


    .filter .title .arr
    {
        display: none;

        width: 18px;
        height: 18px;
        margin-left: 8px;

        transition: transform .2s linear;
    }

    .filter .title.active .arr
    {
        transform: rotate(180deg);
    }


    .filter .items
    {
        padding-top: 24px;

        transition: opacity .2s linear;
    }

    .filter .items.lock
    {
        pointer-events: none;

        opacity: .5;
    }

    .filter .items > * + *
    {
        margin-top: 8px;
    }


    .filter .btn
    {
        font-size: 14px;
        line-height: 100%;

        position: relative;

        display: block;

        width: 100%;
        padding: 11px 40px 10px 10px;

        transition: .2s linear;
        text-align: left;

        border-radius: 12px;
        background: #141414;
    }

    .filter .btn .icon
    {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;

        display: block;

        width: 16px;
        height: 16px;
        margin: auto;

        transition: opacity .2s linear;

        opacity: 0;
    }


    .filter .btn:hover,
    .filter .btn.active
    {
        background: #950fff;
    }

    .filter .btn.active .icon
    {
        opacity: 1;
    }



    .btn_up
    {
        position: fixed;
        right: auto;
        bottom: 200px;

        display: none;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 48px;
        height: 48px;

        transition: background .2s linear;
        text-decoration: none;

        opacity: 1;
        color: currentColor;
        border-radius: 16px;
        background: #950fff;
    }


    .btn_up .icon
    {
        display: block;

        width: 40px;
        height: 40px;
        margin: 4px;
    }


    .btn_up:hover
    {
        background: #7700e1;
    }



    @media print, (max-width: 1899px)
    {
        .filter .title,
        .head .title,
        .empty .title
        {
            font-size: 27px;
            line-height: 33px;
        }
    }



    @media print, (max-width: 1599px)
    {
        .col
        {
            width: 324px;
        }

        .col_main
        {
            width: calc(100% - 696px);
        }


        .filter .title,
        .head .title,
        .empty .title
        {
            font-size: 26px;
            line-height: 32px;
        }
    }



    @media print, (max-width: 1439px)
    {
        .col
        {
            width: 300px;
        }

        .col_main
        {
            width: calc(100% - 648px);
        }


        .filter .title,
        .head .title,
        .empty .title
        {
            font-size: 24px;
            line-height: 30px;
        }
    }



    @media print, (max-width: 1359px)
    {
        .col
        {
            width: 280px;
        }

        .col_main
        {
            width: calc(100% - 600px);
        }
    }



    @media print, (max-width: 1279px)
    {
        .col,
        .col_main
        {
            width: 100%;
        }

        .col_main
        {
            order: 3;
        }


        .head
        {
            margin-top: 0;
            padding: 20px 0;

            background: none;
        }


        .filter
        {
            padding: 14px;
        }


        .filter .title
        {
            margin: 0;

            pointer-events: auto;
        }

        .filter .title .arr
        {
            display: block;
        }


        .filter .items
        {
            display: none;

            padding-top: 20px;
        }

        .filter .title.active ~ .items
        {
            display: block;
        }


        .btn_up
        {
            display: none !important;
        }
    }



    @media print, (max-width: 1023px)
    {
        .filter .title,
        .head .title,
        .empty .title
        {
            font-size: 22px;
            line-height: 28px;
        }
    }



    @media print, (max-width: 767px)
    {
        .main_data
        {
            padding: 14px;
        }


        .filter .title,
        .head .title,
        .empty .title
        {
            font-size: 20px;
            line-height: 26px;
        }


        .proposals
        {
            margin-left: 0;
        }


        .proposals > *
        {
            width: 100%;
            margin-left: 0;
        }


        .empty
        {
            padding: 36px;
        }
    }



    @media print, (max-width: 479px)
    {
        .empty
        {
            padding: 40px 0;
        }
    }
</style>