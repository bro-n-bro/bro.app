<template>
    <section class="account_info">
        <div class="cont middle">
            <div class="back_btn">
                <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/account/all'" class="btn">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_arrow_hor"></use></svg>
                    <span>{{ $t('message.back_btn') }}</span>
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

                        <router-link to="/proposals/create" class="create_link">
                            {{ $t('message.create_btn') }}
                        </router-link>
                    </div>

                    <div class="loader_wrap" v-if="!loading">
                        <div class="loader"><span></span></div>
                    </div>

                    <div class="proposals" v-else>
                        <router-link :to="`/proposal/${proposal.id}`" class="proposal" v-for="(proposal, index) in data.proposals" :key="index">
                            <!-- <pre>{{ proposal }}</pre> -->

                            <div class="network_logo">
                                <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                            </div>

                            <div class="status">
                                <div v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'" class="violet">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_status_deposite"></use></svg>
                                    <span>{{ $t('message.account_proposals_status_deposite') }}</span>
                                </div>

                                <div v-if="proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'" class="blue">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_status_voting"></use></svg>
                                    <span>{{ $t('message.account_proposals_status_voting') }}</span>
                                </div>

                                <div v-if="proposal.status == 'PROPOSAL_STATUS_PASSED'" class="green">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_status_passed"></use></svg>
                                    <span>{{ $t('message.account_proposals_status_passed') }}</span>
                                </div>

                                <div v-if="proposal.status == 'PROPOSAL_STATUS_REJECTED'" class="red">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_status_rejected"></use></svg>
                                    <span>{{ $t('message.account_proposals_status_rejected') }}</span>
                                </div>
                            </div>

                            <div class="date" v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                                <div>{{ $t('message.proposal_date_label_deposite') }}</div>
                                <!-- <div><timeago :datetime="new Date(proposal.deposite_end_time)" autoUpdate /></div> -->
                            </div>

                            <div class="date" v-if="proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
                                <div>{{ $t('message.proposal_date_label_voting') }}</div>
                                <!-- <div><timeago :datetime="new Date(proposal.deposite_end_time)" autoUpdate /></div> -->
                            </div>

                            <div class="date" v-if="proposal.status == 'PROPOSAL_STATUS_PASSED' || proposal.status == 'PROPOSAL_STATUS_REJECTED'">
                                <div>{{ $t('message.proposal_date_label_default') }}</div>
                                <div><timeago :datetime="new Date(proposal.voting_end_time)" autoUpdate /></div>
                            </div>

                            <div class="name">#{{ proposal.id }} {{ proposal.title }}</div>

                            <div class="desc">{{ proposal.description }}</div>

                            <div class="likes">
                                <button class="like btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_like"></use></svg>
                                    <span>True 1598</span>
                                </button>

                                <button class="dislike btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_dislike"></use></svg>
                                    <span>False 1200</span>
                                </button>
                            </div>
                        </router-link>
                    </div>


                    <template v-if="data.proposals.length">
                    <div class="loader_wrap" v-if="data.loading">
                        <div class="loader"><span></span></div>
                    </div>

                    <button class="load_more_btn" @click.prevent="loadMoreProposals" v-else>
                        {{ $t('message.load_more_btn') }}
                    </button>
                    </template>
                </section>


                <section class="col">
                    <!-- Filter -->
                    <div class="filter">
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
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onMounted, reactive, inject, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'

    // Components
    import Networks from '../components/account/Networks.vue'

    const store = useGlobalStore(),
        router = useRouter(),
        loading = ref(false),
        data = reactive({
            limit: 10,
            offset: 0,
            loading: false,
            proposals: []
        })


    onMounted(async () => {
        // Get proposals
        try {
            await fetch(`https://rpc.bronbro.io/gov/proposals?limit=${data.limit}&offset=${data.offset}`)
                .then(res => res.json())
                .then(response => {
                    data.proposals = response

                    // Hide loader
                    loading.value = true
                })
        } catch (error) {
            console.log(error)
        }
    })


    // Load more proposals
    async function loadMoreProposals() {
        data.loading = true
        data.offset = data.limit
        data.limit += 10

        await fetch(`https://rpc.bronbro.io/gov/proposals?limit=${data.limit}&offset=${data.offset}`)
            .then(res => res.json())
            .then(response => {
                data.proposals = data.proposals.concat(response)
                data.loading = false
            })
    }
</script>


<style scoped>
    .back_btn
    {
        color: #f2f2f2;
        font-size: 12px;
        line-height: 15px;

        display: flex;

        margin-bottom: 20px;
    }


    .back_btn .btn
    {
        color: currentColor;

        display: flex;

        text-decoration: none;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
        margin-right: 10px;
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
        display: flex;

        margin-bottom: 20px;

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


    .proposals .proposal
    {
        color: currentColor;

        display: flex;

        padding: 10px;

        text-decoration: none;

        border-radius: 14px;
        background: #0d0d0d;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .proposals .proposal .network_logo
    {
        width: 32px;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 16px;

        border-radius: 50%;
    }

    .proposals .proposal .network_logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;

        object-fit: cover;
    }


    .proposals .proposal .status
    {
        font-size: 12px;
        line-height: 130%;

        margin-bottom: 16px;
    }

    .proposals .proposal .status div
    {
        display: flex;

        padding: 7px 5px;

        border: 1px solid currentColor;
        border-radius: 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposals .proposal .status div.blue
    {
        color: #0343e8;

        background: rgba(3, 67, 232, .05);
    }

    .proposals .proposal .status div.green
    {
        color: #1bc562;

        background: rgba(27, 197, 98, .05);
    }

    .proposals .proposal .status div.red
    {
        color: #eb5757;

        background: rgba(235, 87, 87, .05);
    }

    .proposals .proposal .status div.violet
    {
        color: #950fff;

        background: rgba(149, 15, 255, .05);
    }


    .proposals .proposal .status .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .proposals .proposal .date
    {
        color: #464646;
        font-size: 12px;
        line-height: 130%;

        display: flex;

        margin-bottom: 16px;
        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposals .proposal .date > * + *
    {
        margin-left: 4px;
    }


    .proposals .proposal .name
    {
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;

        overflow: hidden;

        width: 100%;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .proposals .proposal .desc
    {
        color: #fff;
        font-size: 12px;
        line-height: 140%;

        display: -webkit-box;
        overflow: hidden;

        width: 100%;
        margin-top: 8px;

        opacity: .7;

        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }


    .proposals .proposal .likes
    {
        display: flex;

        width: 100%;
        margin-top: 8px;
        padding: 3px 0;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposals .proposal .likes .btn
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;

        padding: 8px;

        border-radius: 14px;
        background: #191919;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposals .proposal .likes .btn.like
    {
        color: #950fff;
    }

    .proposals .proposal .likes .btn.dislike
    {
        color: #eb5757;
    }

    .proposals .proposal .likes .btn + .btn
    {
        margin-left: 8px;
    }

    .proposals .proposal .likes .btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }

    .proposals .proposal .likes .btn span
    {
        display: none;
    }

    .proposals .proposal .likes .btn.active span
    {
        display: block;
    }



    .load_more_btn
    {
        color: currentColor;
        font-size: 16px;
        font-weight: 500;
        line-height: 110%;

        display: block;

        width: 100%;
        margin-top: 20px;
        padding: 14px 20px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 16px;
        background: #950fff;
    }

    .load_more_btn:hover
    {
        background: #7700e1;
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

</style>