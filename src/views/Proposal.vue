<template>
    <div class="loader_wrap" v-if="loading">
        <div class="loader"><span></span></div>
    </div>

    <section class="proposal_info" v-else>
        <div class="cont middle">
            <div class="back_btn">
                <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/proposals/all'" class="btn">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>
            </div>

            <!-- <pre>{{ proposal }}</pre>
            <pre>{{ currentVote }}</pre> -->

            <div class="row">
                <div class="data">
                    <div class="head">
                        <div v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'" class="status violet">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_status_deposite"></use></svg>
                            <span>{{ $t('message.account_proposals_status_deposite') }}</span>
                        </div>

                        <div v-if="proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'" class="status blue">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_status_voting"></use></svg>
                            <span>{{ $t('message.account_proposals_status_voting') }}</span>
                        </div>

                        <div v-if="proposal.status == 'PROPOSAL_STATUS_PASSED'" class="status green">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_status_passed"></use></svg>
                            <span>{{ $t('message.account_proposals_status_passed') }}</span>
                        </div>

                        <div v-if="proposal.status == 'PROPOSAL_STATUS_REJECTED'" class="status red">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_status_rejected"></use></svg>
                            <span>{{ $t('message.account_proposals_status_rejected') }}</span>
                        </div>

                        <div class="type">
                            <svg class="icon"><use :xlink:href="`/sprite.svg#ic_proposal_${proposal.proposal_type}`"></use></svg>
                            <span>{{ proposal.proposal_type }}</span>
                        </div>

                        <div class="name">
                            <div class="logo">
                                <img :src="`/${proposal.network}_logo.png`" alt="">
                            </div>

                            <div class="number">#{{ proposal.id }}</div>

                            <div>{{ proposal.title }}</div>
                        </div>

                        <div class="proposer">
                            <span>{{ $t('message.proposal_proposer_label') }}:</span>

                            <a :href="`https://www.mintscan.io/${store.networks[proposal.network].mintscanAlias}/validators/${proposal.proposer_address}`" target="_blank" rel="noopener nofollow" v-if="proposal.moniker">
                                {{ proposal.moniker }}
                            </a>

                            <a :href="`https://www.mintscan.io/${store.networks[proposal.network].mintscanAlias}/account/${proposal.proposer_address}`" target="_blank" rel="noopener nofollow" v-else>
                                {{ proposal.proposer_address }}
                            </a>
                        </div>
                    </div>

                    <div class="tabs">
                        <div class="row">
                            <button class="btn active">{{ $t('message.proposal_tab1') }}</button>
                            <button class="btn">{{ $t('message.proposal_tab2') }}</button>
                        </div>
                    </div>

                    <div>
                        <div class="description" :class="{'active': showDescription}" @click.self="showDescription = !showDescription">
                            <div class="title">{{ $t('message.proposal_desc_title') }}</div>

                            <div class="text_block" v-html="parseMarkdown(proposal.description)"></div>

                            <div class="icon">
                                <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="info">
                    <div class="sticky">
                        <div class="current_vote" v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                            <div class="label">{{ $t('message.proposal_current_vote_title') }}</div>

                            <template v-if="currentVote.votes.length">
                                <template v-if="currentVote.votes[0].option == 'VOTE_OPTION_YES'">
                                <div class="val green">{{ $t('message.proposal_vote_result_yes_label') }}</div>
                                </template>

                                <template v-if="currentVote.votes[0].option == 'VOTE_OPTION_NO'">
                                    <div class="val yellow">{{ $t('message.proposal_vote_result_no_label') }}</div>
                                </template>

                                <template v-if="currentVote.votes[0].option == 'VOTE_OPTION_NO_WITH_VETO'">
                                    <div class="val red">{{ $t('message.proposal_vote_result_nwv_label') }}</div>
                                </template>
                            </template>
                        </div>


                        <div class="vote" v-if="proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
                            <button class="btn green">Yes</button>
                            <button class="btn yellow">No</button>
                            <button class="btn red">No with veto</button>
                            <button class="btn grey">Abstain</button>
                        </div>


                        <div class="deposit_status" v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                            <div class="title">
                                {{ $t('message.proposal_deposit_status_title') }}

                                <button class="refresh_btn" @click.prevent="refreshProposalData">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_refresh"></use></svg>
                                    <span>{{ $t('message.refresh_btn') }}</span>
                                </button>
                            </div>

                            <div class="chart">
                                <div class="percents">
                                    <span v-if="store.networks[proposal.network].proposal_need <= (proposal.deposit / store.networks[proposal.network].exponent)">100%</span>
                                    <span v-else>{{ $filters.toFixed(store.networks[proposal.network].proposal_need / (proposal.deposit / store.networks[proposal.network].exponent) * 100, 2) }}%</span>
                                </div>

                                <Doughnut :data="chartData" :options="chartOptions" />
                            </div>

                            <button class="deposit_btn">
                                {{ $t('message.deposit_btn') }}
                            </button>
                        </div>


                        <div class="details">
                            <div class="title">{{ $t('message.proposal_details_title') }}</div>

                            <div class="row">
                                <div class="item" v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                                    <div class="label">{{ $t('message.proposal_details_deposit_label') }}</div>

                                    <div class="val">
                                        <vue-countdown :time="dateCalc(proposal.deposit_end_time) - new Date()" v-slot="{ days, hours, minutes, seconds }">
                                            {{ days }}D : {{ hours }}H : {{ minutes }}M : {{ seconds }}S
                                        </vue-countdown>
                                    </div>
                                </div>

                                <div class="item" v-else>
                                    <div class="label">{{ $t('message.proposal_details_voting_label') }}</div>

                                    <div class="val">
                                        {{ proposal.voting_end_time }}
                                        <!-- <vue-countdown :time="dateCalc(proposal.voting_end_time) - new Date()" v-slot="{ days, hours, minutes, seconds }">
                                            {{ days }}D : {{ hours }}H : {{ minutes }}M : {{ seconds }}S
                                        </vue-countdown> -->
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="label">{{ $t('message.proposal_details_submit_label') }}</div>

                                    <div class="val">
                                        {{ proposal.submit_time }}
                                        <!-- <timeago :datetime="dateCalc(proposal.submit_time)" autoUpdate /> -->
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="label">{{ $t('message.proposal_details_total_label') }}</div>

                                    <div class="val">
                                        {{ proposal.deposit / store.networks[proposal.network].exponent }}
                                        {{ store.networks[proposal.network].token_name }}
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="label">{{ $t('message.proposal_details_initial_label') }}</div>

                                    <div class="val">
                                        {{ proposal.init_deposit / store.networks[proposal.network].exponent }}
                                        {{ store.networks[proposal.network].token_name }}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="vote_info" v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                            <div class="head">
                                <div class="title">{{ $t('message.proposal_vote_details_title') }}</div>

                                <button class="refresh_btn" @click.prevent="refreshProposalData">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_refresh"></use></svg>
                                    <span>{{ $t('message.refresh_btn') }}</span>
                                </button>
                            </div>

                            <div class="chart">
                                <div class="final_status">
                                    <div class="label">Final Status:</div>

                                    <div class="val green" v-if="proposal.status == 'PROPOSAL_STATUS_PASSED'">Passed</div>
                                    <div class="val red" v-if="proposal.status == 'PROPOSAL_STATUS_REJECTED'">Rejected</div>
                                </div>

                                <Doughnut :data="chartData" :options="chartOptions" />
                            </div>

                            <div class="row">
                                <div class="turnout">
                                    {{ $t('message.proposal_vote_info_turnout_label') }}: 34%
                                </div>

                                <div class="total">
                                    {{ $t('message.proposal_vote_info_total_vote_label') }}:
                                    {{ (proposal.VOTE_OPTION_YES + proposal.VOTE_OPTION_NO + proposal.VOTE_OPTION_NO_WITH_VETO + proposal.VOTE_OPTION_ABSTAIN).toLocaleString()  }}
                                </div>
                            </div>

                            <div class="exp">{{ $t('message.proposal_vote_info_minimum') }}</div>
                        </div>


                        <div class="vote_result" v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                            <div class="row">
                                <div class="item">
                                    <div class="val green">
                                        {{ $t('message.proposal_vote_result_yes_label') }} {{ getProgressPercents(proposal.tally_yes) }}%
                                    </div>

                                    <div class="tokens_count">
                                        {{ Number($filters.toFixed(proposal.tally_yes / store.networks[proposal.network].exponent, 2)).toLocaleString('en-US') }}
                                        {{ store.networks[proposal.network].token_name }}
                                    </div>

                                    <div class="votes_count">
                                        {{ proposal.VOTE_OPTION_YES.toLocaleString('en-US') }}
                                        {{ $t('message.proposal_vote_result_votes_label') }}
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="val yellow">
                                        {{ $t('message.proposal_vote_result_no_label') }} {{ getProgressPercents(proposal.tally_no) }}%
                                    </div>

                                    <div class="tokens_count">
                                        {{ Number($filters.toFixed(proposal.tally_no / store.networks[proposal.network].exponent, 2)).toLocaleString('en-US') }}
                                        {{ store.networks[proposal.network].token_name }}
                                    </div>

                                    <div class="votes_count">
                                        {{ proposal.VOTE_OPTION_NO.toLocaleString('en-US') }}
                                        {{ $t('message.proposal_vote_result_votes_label') }}
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="val red">
                                        {{ $t('message.proposal_vote_result_nwv_label') }} {{ getProgressPercents(proposal.tally_no_with_veto) }}%
                                    </div>

                                    <div class="tokens_count">
                                        {{ Number($filters.toFixed(proposal.tally_no_with_veto / store.networks[proposal.network].exponent, 2)).toLocaleString('en-US') }}
                                        {{ store.networks[proposal.network].token_name }}
                                    </div>

                                    <div class="votes_count">
                                        {{ proposal.VOTE_OPTION_NO_WITH_VETO.toLocaleString('en-US') }}
                                        {{ $t('message.proposal_vote_result_votes_label') }}
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="val">
                                        {{ $t('message.proposal_vote_result_abstain_label') }} {{ getProgressPercents(proposal.tally_abstain) }}%
                                    </div>

                                    <div class="tokens_count">
                                        {{ Number($filters.toFixed(proposal.tally_abstain / store.networks[proposal.network].exponent, 2)).toLocaleString('en-US') }}
                                        {{ store.networks[proposal.network].token_name }}
                                    </div>

                                    <div class="votes_count">
                                        {{ proposal.VOTE_OPTION_ABSTAIN.toLocaleString('en-US') }}
                                        {{ $t('message.proposal_vote_result_votes_label') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onMounted, onBeforeMount, inject, ref, reactive, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'
    import hcSticky from 'hc-sticky'
    import { fromBech32, toBech32 } from '@cosmjs/encoding'
    import { generateAddress } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    import { marked } from 'marked'

    ChartJS.register(ArcElement)


    const store = useGlobalStore(),
        router = useRouter(),
        i18n = inject('i18n'),
        loading = ref(true),
        showDescription = ref(false),
        proposal = ref({}),
        currentVote = ref({ votes: [] }),
        userTimeZone = new Date().getTimezoneOffset() / 60 * -1,
        chartOptions = reactive({
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false
            },
            animation: {
                duration: 200
            },
            transitions: {
                active: {
                    animation: {
                        duration: 200
                    }
                }
            }
        }),
        chartColors = ['#1BC562', '#C5811B', '#EB5757', '#888888'],
        depositChartColors = ['#950FFF', '#353535'],
        chartDatasets = reactive([]),
        chartData = computed(() => ({
            datasets: [{
                data: chartDatasets,
                backgroundColor: proposal.value.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? depositChartColors : chartColors,
                borderColor: 'transparent',
                borderWidth: 0,
                hoverBackgroundColor: proposal.value.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? depositChartColors : chartColors,
                hoverBorderColor: proposal.value.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? depositChartColors : chartColors,
                borderAlign: 'inner',
                cutout: '84%'
            }]
        }))


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_proposal_page')

        // Set loader
        loading.value = true

        // Get proposal data
        await getProposalData()
    })


    onMounted(() => {
        // Sticky element
        let stickyElements = document.querySelectorAll('.sticky')

        stickyElements.forEach(el => new hcSticky(el, { top: 118 }))
    })


    // Get proposal data
    async function getProposalData() {
        try {
            await fetch(`https://rpc.bronbro.io/gov/proposal/${store.proposal_id}`)
                .then(res => res.json())
                .then(async response => {
                    proposal.value = response

                    // Set chart datasets
                    if(proposal.value.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD') {
                        let remnant = store.networks[proposal.value.network].proposal_need - proposal.value.deposit

                        chartDatasets.push(proposal.value.deposit)

                        if(remnant > 0) {
                            chartDatasets.push(remnant)
                        }
                    } else {
                        chartDatasets.push(proposal.value.tally_yes)
                        chartDatasets.push(proposal.value.tally_no)
                        chartDatasets.push(proposal.value.tally_no_with_veto)
                        chartDatasets.push(proposal.value.tally_abstain)
                    }

                    // Get valoper moniker
                    let valoperAddress = toBech32(store.networks[proposal.value.network].address_prefix + 'valoper', fromBech32(proposal.value.proposer_address).data)

                    try {
                        await fetch(`https://rpc.bronbro.io/validators?address=${generateAddress(store.networks[proposal.value.network].address_prefix, store.account.currentWallet)}&proposal_id=${proposal.value.id}`)
                            .then(res => res.json())
                            .then(validator => proposal.value.moniker = validator.moniker)
                    } catch (error) {
                        console.log(error)
                    }

                    // Get user current vote
                    try {
                        await fetch(`https://rpc.bronbro.io/account/votes/${valoperAddress}`)
                            .then(res => res.json())
                            .then(vote => currentVote.value = vote)
                    } catch (error) {
                        console.log(error)
                    }

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Refresh proposal data
    async function refreshProposalData() {
        // Set loader
        loading.value = true

        // Clear data
        depositChartDatasets.length = 0

        // Get proposal data
        await getProposalData()
    }


    // Date calc
    function dateCalc(date) {
        let currentDate = new Date(date)

        return new Date(currentDate.setHours(currentDate.getHours() + userTimeZone))
    }


    // Parse markdown
    function parseMarkdown(data) {
        return marked.parse(data)
    }


    // Get progress percents with abstain
    function getProgressPercents(value) {
        let sum = proposal.value.tally_abstain + proposal.value.tally_no + proposal.value.tally_no_with_veto + proposal.value.tally_yes

        return (value / sum * 100).toFixed(2)
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


    .validators .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 0;

        background: none;
    }



    .data
    {
        width: calc(100% - 373px);
        padding: 32px;

        border-radius: 30px;
        background: #0d0d0d;
    }


    .data .head
    {
        display: flex;

        margin-bottom: 32px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .data .head .status
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;

        padding: 7px 5px;

        border: 1px solid;
        border-radius: 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .data .head .status.green
    {
        color: #1bc562;

        background: rgba(27, 197, 98, .05);
    }

    .data .head .status.blue
    {
        color: #0343e8;

        background: rgba(3, 67, 232, .05);
    }

    .data .head .status.violet
    {
        color: #950fff;

        background: rgba(149, 15, 255, .05);
    }

    .data .head .status.red
    {
        color: #eb5757;

        background: rgba(235, 87, 87, .05);
    }

    .data .head .status .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .data .head .type
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;

        margin-left: 8px;
        padding: 7px 5px;

        border: 1px solid;
        border-radius: 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .data .head .type .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .data .head .name
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 120%;

        display: flex;

        width: 100%;
        margin-top: 24px;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: nowrap;
    }

    .data .head .name .logo
    {
        position: relative;

        overflow: hidden;

        width: 36px;
        min-width: 36px;
        height: 36px;

        border-radius: 50%;
    }

    .data .head .name .logo img
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

    .data .head .name .number
    {
        margin-left: 8px;

        white-space: nowrap;
    }

    .data .head .name .number + *
    {
        width: 100%;
        margin-left: 8px;
    }


    .data .head .proposer
    {
        color: #555;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: flex;

        margin-top: 8px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .data .head .proposer a
    {
        color: #950fff;

        margin-left: 8px;

        white-space: nowrap;
    }


    .data .tabs
    {
        margin-bottom: 32px;
        padding-bottom: 32px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }


    .data .tabs .row
    {
        display: flex;

        margin-left: -8px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .data .tabs .btn
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        min-width: 109px;
        margin-left: 8px;
        padding: 7px;

        transition: .2s linear;

        border: 1px solid ;
        border-radius: 10px;
    }

    .data .tabs .btn:hover,
    .data .tabs .btn.active
    {
        color: #000;

        border-color: #fff;
        background: #fff;
    }


    .data .description
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

    .data .description:after
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


    .data .description .title
    {
        font-size: 16px;
        font-weight: 500;
        line-height: 100%;

        margin-bottom: 16px;

        pointer-events: none;
    }

    .data .description .text_block
    {
        width: calc(100% - 48px);

        pointer-events: none;
    }


    .data .description .icon
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

    .data .description .icon svg
    {
        display: block;

        width: 32px;
        height: 32px;

        transition: transform .2s linear;
    }


    .data .description.active
    {
        height: auto;

        cursor: auto;
    }

    .data .description.active:after
    {
        display: none;
    }
    .data .description.active .icon svg
    {
        transform: rotate(-180deg);
    }


    .info
    {
        width: 353px;
        max-width: 100%;
        margin-left: auto;
        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .info .current_vote
    {
        font-weight: 500;
        line-height: 100%;

        display: flex;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .current_vote .green
    {
        color: #1bc562;
    }


    .info .vote
    {
        display: flex;

        margin-top: 16px;
        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }


    .info .vote .btn
    {
        font-size: 14px;
        line-height: 100%;

        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
        padding: 8px;

        transition: background .2s linear;

        border-radius: 10px;
        background: #353535;
    }

    .info .vote .btn.green
    {
        background: #1bc562;
    }

    .info .vote .btn.yellow
    {
        background: #c5811b;
    }

    .info .vote .btn.red
    {
        background: #eb5757;
    }


    .info .deposit_status .title
    {
        font-weight: 500;
        line-height: 100%;

        display: flex;

        margin-bottom: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .info .refresh_btn
    {
        color: #950fff;
        font-size: 14px;
        line-height: 20px;

        display: flex;

        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .refresh_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .info .deposit_btn
    {
        font-size: 14px;
        line-height: 100%;

        display: block;

        width: 100%;
        margin-top: 16px;
        padding: 8px;

        border-radius: 10px;
        background: #950fff;
    }


    .info .details
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .info .details .title
    {
        font-weight: 500;
        line-height: 100%;

        margin-bottom: 16px;
    }


    .info .details .row
    {
        margin-bottom: -8px;
        margin-left: -8px;

        align-items: stretch;
        align-content: stretch;
    }

    .info .details .row > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .info .details .item
    {
        min-height: 81px;
        padding: 8px;

        border-radius: 10px;
        background: #191919;
    }


    .info .details .label
    {
        color: #555;
        font-size: 12px;
        line-height: 100%;

        margin-bottom: 8px;
    }


    .info .details .val
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 110%;
    }


    .info .vote_info
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .info .vote_info .head
    {
        display: flex;

        margin-bottom: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .info .vote_info .title
    {
        font-weight: 500;
        line-height: 100%;
    }


    .info .chart
    {
        position: relative;

        width: 200px;
        height: 200px;
        margin: 0 auto;
    }


    .info .chart .percents
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 100%;

        position: absolute;

        display: flex;

        width: 100%;
        height: 100%;

        text-align: center;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .info .chart .final_status
    {
        position: absolute;

        display: flex;

        width: 100%;
        height: 100%;

        text-align: center;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .chart .final_status .label
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        width: 100%;
    }

    .info .chart .final_status .val
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;
    }

    .info .chart .final_status .val.green
    {
        color: #1bc562;
    }

    .info .chart .final_status .val.yellow
    {
        color: #c5811b;
    }

    .info .chart .final_status .val.red
    {
        color: #eb5757;
    }


    .info .vote_info .turnout
    {
        color: #eb5757;
        font-size: 12px;
        line-height: 15px;

        margin-top: 16px;
        padding: 7px;

        border: 1px solid;
        border-radius: 8px;
    }


    .info .vote_info .total
    {
        color: #950fff;
        font-size: 12px;
        line-height: 15px;

        margin-top: 16px;
        margin-left: auto;
        padding: 7px;

        border: 1px solid;
        border-radius: 8px;
    }


    .info .vote_info .exp
    {
        color: #555;
        font-size: 12px;
        line-height: 15px;

        margin-top: 8px;
    }


    .info .vote_info .refresh_btn
    {
        color: #950fff;
        font-size: 14px;
        line-height: 20px;

        display: flex;

        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .vote_info .refresh_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .info .vote_result
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }

    .info .vote_result .row
    {
        margin-bottom: -8px;
        margin-left: -8px;

        align-items: stretch;
        align-content: stretch;
    }

    .info .vote_result .row > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .info .vote_result .item
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        padding: 8px;

        border-radius: 10px;
        background: #191919;
    }

    .info .vote_result .item > * + *
    {
        margin-top: 8px;
    }


    .info .vote_result .item .val
    {
        font-size: 16px;
        font-weight: 500;

        text-transform: uppercase;
    }

    .info .vote_result .item .green
    {
        color: #1bc562;
    }

    .info .vote_result .item .yellow
    {
        color: #c5811b;
    }

    .info .vote_result .item .red
    {
        color: #eb5757;
    }

</style>