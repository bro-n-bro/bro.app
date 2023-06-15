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

            <!-- <pre>{{ proposal }}</pre> -->
            <!-- <pre>{{ currentVote }}</pre> -->
            <!-- <pre>{{ stakingPool }}</pre> -->

            <div class="row">
                <div class="data">
                    <HeadInfo :proposal="proposal" />


                    <Depositors :depositors="proposal.depositors" :proposal="proposal" v-if="proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'" />


                    <div class="tabs" v-if="proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                        <div class="row">
                            <button class="btn" :class="{ active: activeTab == 'tab1' }" @click="activeTab = 'tab1'">
                                {{ $t('message.proposal_tab1') }}
                            </button>

                            <button class="btn" :class="{ active: activeTab == 'tab2' }" @click="activeTab = 'tab2'">
                                {{ $t('message.proposal_tab2') }}
                            </button>
                        </div>
                    </div>


                    <div v-if="activeTab == 'tab1'">
                        <Description :proposal="proposal" />
                    </div>


                    <div v-if="activeTab == 'tab2'">
                        <VotesInfo :depositors="proposal.depositors" :proposal="proposal" />
                    </div>
                </div>


                <div class="info">
                    <Info :proposal="proposal" :chartDatasets="chartDatasets" :currentVote="currentVote" :stakingPool="stakingPool" />
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { onBeforeMount, inject, ref, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'
    import { fromBech32, toBech32 } from '@cosmjs/encoding'
    import { generateAddress } from '@/utils'

    // Components
    import HeadInfo from '../components/proposal/HeadInfo.vue'
    import Description from '../components/proposal/DescriptionInfo.vue'
    import VotesInfo from '../components/proposal/VotesInfo.vue'
    import Depositors from '../components/proposal/Depositors.vue'
    import Info from '../components/proposal/ProposalInfo.vue'


    var store = useGlobalStore(),
        router = useRouter(),
        i18n = inject('i18n'),
        loading = ref(true),
        emitter = inject('emitter'),
        proposal = ref({}),
        activeTab = ref('tab1'),
        chartDatasets = reactive([]),
        currentVote = reactive({ votes: [] }),
        stakingPool =  ref({})


    onBeforeMount(async () => {
        // Set default notification
        store.tooltip = i18n.global.t('message.notice_default_proposal_page')

        // Get proposal data
        await getProposalData()
    })


    // Get proposal data
    async function getProposalData() {
        try {
            await fetch(`https://rpc.bronbro.io/gov/proposal/${store.proposal_id}`)
                .then(res => res.json())
                .then(async response => {
                    // Set data
                    proposal.value = response


                    // Set chart datasets
                    if(proposal.value.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD') {
                        let remnant = store.networks[proposal.value.network].proposal_need - (proposal.value.deposit / store.networks[proposal.value.network].exponent)

                        chartDatasets.push(proposal.value.deposit / store.networks[proposal.value.network].exponent)

                        if(remnant > 0) {
                            chartDatasets.push(remnant)
                        }
                    } else {
                        chartDatasets.push(proposal.value.tally_yes)
                        chartDatasets.push(proposal.value.tally_no)
                        chartDatasets.push(proposal.value.tally_no_with_veto)
                        chartDatasets.push(proposal.value.tally_abstain)
                    }


                    // Get user current vote
                    getCurrentVote()


                    // Get stacking pool
                    if(proposal.value.status == 'PROPOSAL_STATUS_VOTING_PERIOD') {
                        try {
                            fetch('https://rpc.bronbro.io/distribution/staking_pool')
                                .then(res => res.json())
                                .then(data => stakingPool.value = data)
                        } catch (error) {
                            console.log(error)
                        }
                    }


                    // Get valoper moniker
                    if(proposal.value.proposer_address.length) {
                        let valoperAddress = toBech32(store.networks[proposal.value.network].address_prefix + 'valoper', fromBech32(proposal.value.proposer_address).data)

                        try {
                            fetch(`https://rpc.bronbro.io/validators/${valoperAddress}`)
                                .then(res => res.json())
                                .then(validator => proposal.value.moniker = validator.moniker)
                        } catch (error) {
                            console.log(error)
                        }
                    }


                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Get user current vote
    async function getCurrentVote() {
        try {
            await fetch(`https://rpc.bronbro.io/account/votes/${generateAddress(store.networks[proposal.value.network].address_prefix, store.account.currentWallet)}?proposal_id=${proposal.value.id}`)
                .then(res => res.json())
                .then(vote => currentVote.value = vote)
        } catch (error) {
            console.log(error)
        }
    }


    // Event "refresh Proposal Data"
    emitter.on('refreshProposalData', async () => {
        // Clear data
        chartDatasets = reactive([])

        // Get proposal data
        await getProposalData()

        // Send "refreshProposalDataFinished" event
        emitter.emit('refreshProposalDataFinished')
    })


    // Event "refresh user current vote"
    emitter.on('refreshUserCurrentVote', async () => {
        // Clear data
        currentVote.value = reactive({ votes: [] })

        // Get proposal data
        getCurrentVote()
    })
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



    .data
    {
        width: calc(100% - 373px);
        padding: 32px;

        border-radius: 30px;
        background: #0d0d0d;
    }


    .data .head + .depositors
    {
        margin-bottom: 40px;
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



    .info
    {
        position: relative;

        width: 353px;
        max-width: 100%;
        margin-left: auto;
        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }

</style>