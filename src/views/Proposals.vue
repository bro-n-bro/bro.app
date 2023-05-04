<template>
    <section class="proposals_page">
        <div class="cont middle">
            <div class="back_btn">
                <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/account/all'" class="btn">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>
            </div>

            <div class="grid row">
                <section class="col">
                    <!-- Networks -->
                    <Networks class="sticky" />
                </section>


                <section class="col_main">
                    <div class="head sticky">
                        <div class="title">
                            {{ $t('message.account_proposals_title') }}
                        </div>
                    </div>

                    <!-- <pre>{{ data.proposals }}</pre> -->

                    <div class="loader_wrap" v-if="!loading">
                        <div class="loader"><span></span></div>
                    </div>

                    <div class="proposals" v-else>
                        <ProposalsItem v-for="(proposal, index) in data.proposals" :key="index" :proposal="proposal" />
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
                    <div class="filter sticky">
                        <div class="title">
                            {{ $t('message.filter_title') }}
                        </div>

                        <div class="items">
                            <button class="btn active">
                                <span>{{ $t('message.account_proposals_status_all') }}</span>
                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn">
                                <span>{{ $t('message.account_proposals_status_deposite') }}</span>
                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn">
                                <span>{{ $t('message.account_proposals_status_passed') }}</span>
                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn">
                                <span>{{ $t('message.account_proposals_status_rejected') }}</span>
                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button>

                            <button class="btn">
                                <span>{{ $t('message.account_proposals_status_voting') }}</span>
                                <svg class="icon"><use xlink:href="/sprite.svg#ic_check"></use></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Button up -->
                    <ButtonUp class="btn_up">
                        <template #default>
                        <svg class="icon"><use xlink:href="/sprite.svg#ic_arrow_ver"></use></svg>
                        </template>
                    </ButtonUp>
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'
    import hcSticky from 'hc-sticky'

    // Components
    import Networks from '../components/account/Networks.vue'
    import ProposalsItem from '../components/account/ProposalsItem.vue'
    import ButtonUp from 'vue-button-up'

    const store = useGlobalStore(),
        router = useRouter(),
        loading = ref(false),
        data = reactive({
            limit: 10,
            offset: 0,
            loading: false,
            allReceived: false,
            showButtonUp: false,
            proposals: []
        })


    onMounted(async () => {
        // Get proposals
        try {
            await fetch(`https://rpc.bronbro.io/gov/proposals?limit=${data.limit}&offset=${data.offset}`)
                .then(res => res.json())
                .then(response => {
                    data.proposals = response.proposals

                    // Hide loader
                    loading.value = true
                })
        } catch (error) {
            console.log(error)
        }


        // Load more proposals
        function scrollTracking(entries) {
            for (const entry of entries) {
                if (entry.intersectionRatio >= 1 && !data.loading && !data.allReceived) {
                    loadMoreProposals()
                }
            }
        }

        let observer = new IntersectionObserver(scrollTracking, {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        })

        observer.observe(document.querySelector('.load_more_area'))


        // Sticky element
        let stickyElements = document.querySelectorAll('.sticky')

        stickyElements.forEach(el => new hcSticky(el, { top: 118 }))
    })


    // Load more proposals
    async function loadMoreProposals() {
        data.loading = true
        data.offset = data.offset + data.limit

        await fetch(`https://rpc.bronbro.io/gov/proposals?limit=${data.limit}&offset=${data.offset}`)
            .then(res => res.json())
            .then(response => {
                data.loading = false

                response.proposals.length
                    ? data.proposals = data.proposals.concat(response.proposals)
                    : data.allReceived = true
            })
    }
</script>


<style scoped>
    .back_btn
    {
        margin-bottom: 20px;
    }


    .back_btn .btn
    {
        color: currentColor;

        display: flex;

        width: 36px;
        height: 36px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        justify-content: space-between;
        align-items: stretch;
        align-content: stretch;
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
        position: relative;
        z-index: 9;

        display: flex;

        margin-top: -28px;
        padding: 28px 0 20px;

        background: var(--bg);

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .head .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 100%;
    }


    .head .create_link
    {
        color: currentColor;
        font-size: 16px;
        font-weight: 500;
        line-height: 110%;

        display: block;

        margin-left: auto;
        padding: 14px 20px;

        transition: background .2s linear;
        text-decoration: none;

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

        margin-bottom: -20px;
        margin-left: -20px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }

    .proposals > *
    {
        width: calc(50% - 20px);
        margin-bottom: 20px;
        margin-left: 20px;
    }



    .load_more_area
    {
        width: 100%;
        height: 1px;
    }



    .filter
    {
        padding: 16px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .filter .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 24px;
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
        color: currentColor;

        position: fixed;
        right: auto;
        bottom: 200px;

        width: 48px;
        height: 48px;

        transition: background .2s linear;
        text-decoration: none;

        opacity: 1;
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

</style>