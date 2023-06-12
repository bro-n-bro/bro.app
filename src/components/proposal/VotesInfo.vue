<template>
    <div class="loader_wrap" v-if="loading">
        <div class="loader"><span></span></div>
    </div>

    <section class="votes_info" v-else>
        <div class="votes">
            <div class="filter">
                <button class="btn" :class="{ active: currentFilter == 'All' }" @click.prevent="currentFilter = 'All'">
                    {{ $t('message.proposal_votes_filter_all') }} {{ validators.delegators.length }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'Yes' }" @click.prevent="currentFilter = 'Yes'">
                    {{ $t('message.proposal_votes_filter_yes') }} {{ getFilterCount('Yes') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'No' }" @click.prevent="currentFilter = 'No'">
                    {{ $t('message.proposal_votes_filter_no') }} {{ getFilterCount('No') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'NWV' }" @click.prevent="currentFilter = 'NWV'">
                    {{ $t('message.proposal_votes_filter_nwv') }} {{ getFilterCount('NWV') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'Abstain' }" @click.prevent="currentFilter = 'Abstain'">
                    {{ $t('message.proposal_votes_filter_abstain') }} {{ getFilterCount('Abstain') }}
                </button>

                <!-- <button class="btn" :class="{ active: currentFilter == 'weighted' }" @click.prevent="currentFilter = 'weighted'">Weighted 2</button> -->
                <!-- <button class="btn" :class="{ active: currentFilter == 'note_vote' }" @click.prevent="currentFilter = 'note_vote'">Did not vote 72</button> -->
            </div>

            <div class="table_wrap">
                <table>
                    <thead>
                        <tr>
                            <th class="validator">{{ $t('message.proposal_votes_th_validator') }}</th>
                            <th class="validator_vote">{{ $t('message.proposal_votes_th_validator_vote') }}</th>
                            <th class="most_voted">{{ $t('message.proposal_votes_th_most_voted') }}</th>
                            <th class="community_votes">{{ $t('message.proposal_votes_th_community_votes') }}</th>
                        </tr>
                    </thead>
                </table>

                <div class="scroll">
                    <table>
                        <tbody>
                            <tr v-for="(validator, index) in filterValidators(currentFilter)" :key="index">
                                <td class="validator">
                                    <div>
                                        <div class="logo">
                                            <img :src="`${validator.mintscan_avatar_url}`" alt="">
                                            <div class="rank">{{ validator.voting_power_rank }}</div>
                                        </div>

                                        <div class="moniker">
                                            <span>{{ validator.moniker }}</span>
                                            <div class="tooltip">{{ validator.moniker }}</div>
                                        </div>
                                    </div>
                                </td>

                                <td class="validator_vote">
                                    <a :href="`https://www.mintscan.io/${store.networks[props.proposal.network].mintscanAlias}/txs/${validator.vote_tx_hash}`" target="_blank" rel="noopener nofollow">
                                        <span v-if="validator.validator_option == 'VOTE_OPTION_YES'">{{ $t('message.proposal_vote_yes_btn') }}</span>
                                        <span v-if="validator.validator_option == 'VOTE_OPTION_NO'">{{ $t('message.proposal_vote_no_btn') }}</span>
                                        <span v-if="validator.validator_option == 'VOTE_OPTION_ABSTAIN'">{{ $t('message.proposal_vote_abstain_btn') }}</span>
                                    </a>
                                </td>

                                <td class="most_voted">
                                    <span v-if="validator.most_voted == 'VOTE_OPTION_YES'">Yes</span>
                                    <span v-if="validator.most_voted == 'VOTE_OPTION_NO'">No</span>
                                    <span v-if="validator.most_voted == 'VOTE_OPTION_ABSTAIN'">Abstain</span>
                                </td>

                                <td class="community_votes">
                                    <div class="bar">
                                        <div class="nwv" :style="`width: ${calcPercents(validator.operator_address, 'NWM')}%;`" v-if="calcPercents(validator.operator_address, 'NWM')">
                                            <div class="tooltip">{{ $filters.toFixed(calcPercents(validator.operator_address, 'NWM'), 2) }}% — No with veto</div>
                                        </div>

                                        <div class="yes" :style="`width: ${calcPercents(validator.operator_address, 'Yes')}%;`" v-if="calcPercents(validator.operator_address, 'Yes')">
                                            <div class="tooltip">{{ $filters.toFixed(calcPercents(validator.operator_address, 'Yes'), 2) }}% — Yes</div>
                                        </div>

                                        <div class="no" :style="`width: ${calcPercents(validator.operator_address, 'No')}%;`" v-if="calcPercents(validator.operator_address, 'No')">
                                            <div class="tooltip">{{ $filters.toFixed(calcPercents(validator.operator_address, 'No'), 2) }}% — No</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <Depositors :depositors="props.depositors" :proposal="props.proposal" />
    </section>

    <!-- <pre>{{ validators }}</pre> -->
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Depositors from '../../components/proposal/Depositors.vue'


    const props = defineProps(['depositors', 'proposal']),
        store = useGlobalStore(),
        loading = ref(true),
        validators = ref({}),
        currentFilter = ref('All')


    onBeforeMount(async () => {
        // Get proposal votes data
        await getVotesData()
    })


    // Get proposal data
    async function getVotesData() {
        try {
            await fetch(`https://rpc.bronbro.io/gov/votes/${store.proposal_id}/validators-info`)
                .then(res => res.json())
                .then(async response => {
                    // Set data
                    validators.value = response

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Get filter count
    function getFilterCount(status) {
        let result = []

        if(status == 'Yes') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_YES')
        }

        if(status == 'No') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_NO')
        }

        if(status == 'NWV') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_NWV')
        }

        if(status == 'Abstain') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_ABSTAIN')
        }

        return result.length
    }


    // Get filter count
    function filterValidators(status) {
        let result = validators.value.delegators

        // Set filter
        currentFilter.value = status

        if(status == 'Yes') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_YES')
        }

        if(status == 'No') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_NO')
        }

        if(status == 'NWV') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_NWV')
        }

        if(status == 'Abstain') {
            result = validators.value.delegators.filter(el => el.validator_option == 'VOTE_OPTION_ABSTAIN')
        }

        // Sort before return
        return result.sort((a, b) => {
            if (a.voting_power_rank > b.voting_power_rank) { return 1 }
            if (a.voting_power_rank < b.voting_power_rank) { return -1 }
            return 0
        })
    }


    // Calc percents
    function calcPercents(operator_address, status) {
        let result = 0,
            validator = validators.value.delegators.find(el => el.operator_address == operator_address),
            sum = validator.delegators_shares_option_yes + validator.delegators_shares_option_nwv + validator.delegators_shares_option_no

        if(status == 'Yes') {
            result = validator.delegators_shares_option_yes / sum * 100
        }

        if(status == 'NWM') {
            result = validator.delegators_shares_option_nwv / sum * 100
        }

        if(status == 'No') {
            result = validator.delegators_shares_option_no / sum * 100
        }

        return result
    }
</script>


<style scoped>
    .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 0;

        background: none;
    }



    .votes_info > * + *
    {
        margin-top: 40px;
    }



    .filter
    {
        display: flex;

        margin-bottom: 8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .filter > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .filter .btn
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        padding: 9px 8px;

        transition: .2s linear;

        border-radius: 10px;
        background: #282828;
    }

    .filter .btn:hover,
    .filter .btn.active
    {
        color: #fff;

        background: #950fff;
    }



    .scroll
    {
        overflow: auto;

        max-height: 388px;
    }

    .scroll::-webkit-scrollbar
    {
        width: 2px;
        height: 2px;
    }



    .table_wrap
    {
        overflow: auto;

        max-width: 100%;
    }


    table
    {
        width: 100%;

        border-spacing: 0;
        border-collapse: collapse;
    }


    table th
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        padding: 10px 8px 18px;

        text-align: center;
        vertical-align: middle;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }

    table th:first-child
    {
        text-align: left;
    }

    table th:last-child
    {
        padding-right: 10px;
    }


    table td
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        padding: 6px 8px;

        text-align: left;
        vertical-align: middle;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }


    table td a
    {
        color: currentColor;

        transition: color .2s linear;
        text-decoration: none;
    }

    table td a:hover
    {
        color: #950fff;
    }



    table td.validator
    {
        width: 250px;
        min-width: 250px;
        max-width: 250px;

        table-layout: fixed;
    }


    table td.validator > div
    {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    table td.validator .logo
    {
        position: relative;

        display: flex;

        width: 30px;
        height: 30px;

        border-radius: 50%;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    table td.validator .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: inherit;
    }


    table td.validator .rank
    {
        color: #fff;
        font-size: 10px;
        line-height: 14px;

        position: absolute;
        top: -5px;
        right: -8px;

        width: 22px;
        height: 14px;

        text-align: center;

        border-radius: 10px;
        background: #950fff;
    }


    table td.validator .moniker
    {
        position: relative;

        display: inline-block;

        max-width: calc(100% - 38px);
        margin-left: 8px;

        vertical-align: middle;
        white-space: nowrap;
    }

    table td.validator .moniker span
    {
        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }


    table td.validator .moniker .tooltip
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        bottom: 100%;
        left: 50%;

        display: none;

        margin-bottom: 8px;
        padding: 8px;

        transform: translateX(-50%);

        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    }

    table td.validator .moniker .tooltip:before
    {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;

        display: block;

        width: 29px;
        height: 7px;
        margin: 0 auto;

        content: '';

        background: url(@/assets/images/tooltip_tail.svg) 50% 0/100% 100% no-repeat;
    }


    table td.validator .moniker:hover .tooltip
    {
        display: block;
    }


    table .validator_vote
    {
        width: 140px;
        min-width: 140px;

        table-layout: fixed;

        text-align: center;
    }


    table .most_voted
    {
        width: 191px;
        min-width: 191px;

        table-layout: fixed;

        text-align: center;
    }


    table .community_votes
    {
        width: 435px;
        min-width: 435px;

        table-layout: fixed;
    }


    table td .bar
    {
        display: flex;

        height: 8px;

        border-radius: 8px;
        background: #282828;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    table td .bar > *
    {
        position: relative;
        /* min-width: 20px; */

        height: 8px;
    }

    table td .bar > *:first-child
    {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    table td .bar > *:last-child
    {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }


    table td .bar .nwv
    {
        background: #eb5757;
    }


    table td .bar .yes
    {
        background: #1bc562;
    }


    table td .bar .no
    {
        background: #c5811b;
    }


    table td .bar .tooltip
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        bottom: 100%;
        left: 50%;

        display: none;

        margin-bottom: 8px;
        padding: 8px;

        transform: translateX(-50%);
        white-space: nowrap;

        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    }


    table td .bar .tooltip:before
    {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;

        display: block;

        width: 29px;
        height: 7px;
        margin: 0 auto;

        content: '';

        background: url(@/assets/images/tooltip_tail.svg) 50% 0/100% 100% no-repeat;
    }

    table td .bar > *.no .tooltip
    {
        right: 0;
        left: auto;

        transform: none;
    }

    table td .bar > *.no .tooltip:before
    {
        margin-right: 0;
    }


    table tr:first-child td .bar .tooltip
    {
        top: 100%;
        bottom: auto;

        margin-top: 8px;
        margin-bottom: 0;
    }

    table tr:first-child td .bar .tooltip:before
    {
        top: auto;
        bottom: 100%;

        transform: rotate(180deg);
    }


    table td .bar > *:hover .tooltip
    {
        display: block;
    }

</style>