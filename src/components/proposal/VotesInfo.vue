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

                <button class="btn" :class="{ active: currentFilter == 'note_vote' }" @click.prevent="currentFilter = null">
                    {{ $t('message.proposal_votes_filter_null') }} {{ getFilterCount(null) }}
                </button>
            </div>

            <div class="table_wrap">
                <div class="titles">
                    <div class="validator">{{ $t('message.proposal_votes_th_validator') }}</div>
                    <div class="validator_vote">{{ $t('message.proposal_votes_th_validator_vote') }}</div>
                    <div class="most_voted">{{ $t('message.proposal_votes_th_most_voted') }}</div>
                    <div class="community_votes">{{ $t('message.proposal_votes_th_community_votes') }}</div>
                </div>

                <div class="scroll" :class="{ with_your_validator: walletValidators.length }">
                    <div class="item" v-for="(validator, index) in filterValidators(currentFilter)" :key="index" :class="{ first: checkValidator(validator.operator_address) }">
                        <div class="validator">
                            <div class="logo">
                                <img :src="`${validator.mintscan_avatar_url}`" :alt="validator.moniker" @error="imageLoadError">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_user"></use></svg>
                                <div class="rank">{{ validator.voting_power_rank }}</div>
                            </div>

                            <div>
                                <div><div class="moniker">
                                    <span>{{ validator.moniker }}</span>
                                    <div class="tooltip">{{ validator.moniker }}</div>
                                </div></div>

                                <div class="sticker" v-if="checkValidator(validator.operator_address)">
                                    {{ $t('message.proposal_votes_validator_sticker') }}
                                </div>
                            </div>
                        </div>

                        <div class="validator_vote">
                            <a :href="`https://www.mintscan.io/${store.networks[props.proposal.network].mintscanAlias}/txs/${validator.vote_tx_hash}`" target="_blank" rel="noopener nofollow">
                                <span v-if="validator.validator_option == 'VOTE_OPTION_YES'">{{ $t('message.proposal_vote_yes') }}</span>
                                <span v-if="validator.validator_option == 'VOTE_OPTION_NO'">{{ $t('message.proposal_vote_no') }}</span>
                                <span v-if="validator.validator_option == 'VOTE_OPTION_ABSTAIN'">{{ $t('message.proposal_vote_abstain') }}</span>
                                <span v-if="validator.validator_option == 'VOTE_OPTION_NO_WITH_VETO'">{{ $t('message.proposal_vote_nwv') }}</span>
                                <span v-if="!validator.validator_option.length">&mdash;</span>
                            </a>
                        </div>

                        <div class="most_voted">
                            <span v-if="validator.most_voted == 'VOTE_OPTION_YES'">{{ $t('message.proposal_vote_yes') }}</span>
                            <span v-if="validator.most_voted == 'VOTE_OPTION_NO'">{{ $t('message.proposal_vote_no') }}</span>
                            <span v-if="validator.most_voted == 'VOTE_OPTION_ABSTAIN'">{{ $t('message.proposal_vote_abstain') }}</span>
                            <span v-if="validator.most_voted == 'VOTE_OPTION_NO_WITH_VETO'">{{ $t('message.proposal_vote_nwv') }}</span>
                            <span v-if="!validator.most_voted.length">&mdash;</span>
                        </div>

                        <div class="community_votes">
                            <div class="bar">
                                <div class="empty" v-if="validator.most_voted == 'VOTE_OPTION_ABSTAIN'"></div>

                                <template v-else>
                                <div class="nwv" :style="`width: ${calcPercents(validator.operator_address, 'NWM')}%;`" v-if="calcPercents(validator.operator_address, 'NWM')"></div>

                                <div class="yes" :style="`width: ${calcPercents(validator.operator_address, 'Yes')}%;`" v-if="calcPercents(validator.operator_address, 'Yes')"></div>

                                <div class="no" :style="`width: ${calcPercents(validator.operator_address, 'No')}%;`" v-if="calcPercents(validator.operator_address, 'No')"></div>

                                <div class="tooltip">
                                    <div class="yes">
                                        <template v-if="calcPercents(validator.operator_address, 'Yes') < 1 && calcPercents(validator.operator_address, 'Yes') > 0">
                                        &lt;1% — {{ $t('message.proposal_vote_yes') }};
                                        </template>

                                        <template v-else>
                                        {{ $filters.toFixed(calcPercents(validator.operator_address, 'Yes'), 2) }}% — {{ $t('message.proposal_vote_yes') }};
                                        </template>
                                    </div>

                                    <div class="no">
                                        <template v-if="calcPercents(validator.operator_address, 'No') < 1 && calcPercents(validator.operator_address, 'No') > 0">
                                        &lt;1% — {{ $t('message.proposal_vote_no') }};
                                        </template>

                                        <template v-else>
                                        {{ $filters.toFixed(calcPercents(validator.operator_address, 'No'), 2) }}% — {{ $t('message.proposal_vote_no') }};
                                        </template>
                                    </div>

                                    <div class="nwv">
                                        <template v-if="calcPercents(validator.operator_address, 'NWM') < 1 && calcPercents(validator.operator_address, 'NWM') > 0">
                                        &lt;1% — {{ $t('message.proposal_vote_nwv') }};
                                        </template>

                                        <template v-else>
                                        {{ $filters.toFixed(calcPercents(validator.operator_address, 'NWM'), 2) }}% — {{ $t('message.proposal_vote_nwv') }};
                                        </template>
                                    </div>
                                </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Depositors :depositors="props.depositors" :proposal="props.proposal" />
    </section>

    <!-- <pre>{{ validators }}</pre> -->
    <!-- <pre>{{ walletValidators }}</pre> -->
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    // Components
    import Depositors from './Depositors.vue'


    const props = defineProps(['depositors', 'proposal']),
        store = useGlobalStore(),
        loading = ref(true),
        validators = ref([]),
        walletValidators = ref([]),
        currentFilter = ref('All')


    onBeforeMount(async () => {
        // Get proposal votes data
        await getVotesData()

        // Get validators for current wallet
        await getValidatorsWallet()
    })


    // Replacement of the logo if it is not present
    function imageLoadError(event) {
        event.target.classList.add('hide')
    }


    // Get proposal data
    async function getVotesData() {
        try {
            await fetch(`https://rpc.bronbro.io/gov/votes/${store.currentProposalId}/validators-info`)
                .then(res => res.json())
                .then(async response => {
                    // Clean data
                    for (let i = response.delegators.length - 1; i >= 0; i--) {
                        if (response.delegators[i].voting_power_rank > 180) {
                            response.delegators.splice(i, 1)
                        }
                    }

                    // Set data
                    validators.value = response

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.error(error)
        }
    }


    // Get validators for current wallet
    async function getValidatorsWallet() {
        try {
            let currentAddress = generateAddress(store.networks[store.currentNetwork].address_prefix, store.account.currentWallet)

            await fetch(`https://rpc.bronbro.io/account/validators/${currentAddress}`)
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    if(response.validators.length) {
                        // Set data
                        walletValidators.value = response.validators
                    }
                })
        } catch (error) {
            console.error(error)
        }
    }


    // Check validator in current wallet
    function checkValidator(operator_address) {
        let result = walletValidators.value.find(el => el.operator_address == operator_address)

        return result
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

        if(status == null) {
            result = validators.value.delegators.filter(el => el.validator_option == '')
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

        if(status == null) {
            result = validators.value.delegators.filter(el => el.validator_option == '')
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

        if(sum) {
            if(status == 'Yes') {
                result = validator.delegators_shares_option_yes / sum * 100
            }

            if(status == 'NWM') {
                result = validator.delegators_shares_option_nwv / sum * 100
            }

            if(status == 'No') {
                result = validator.delegators_shares_option_no / sum * 100
            }
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
        color: #fff;
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
        display: flex;
        overflow: auto;
        flex-direction: column;

        width: 100%;
        max-height: 609px;
        padding-bottom: 8px;

        scrollbar-color: #950fff var(--bg);
        scrollbar-width: thin;
    }

    .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;
    }
    .scroll::-webkit-scrollbar
    {
        width: 4px;
        height: 4px;

        background-color: var(--bg);
    }

    .scroll::-webkit-scrollbar-thumb
    {
        border-radius: 5px;
        background-color: #950fff;
    }


    .titles
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        padding-right: 6px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }

    .titles > *
    {
        padding: 10px 8px 18px;

        text-align: center;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }

    .titles > *:first-child
    {
        text-align: left;
    }

    .titles > *:last-child
    {
        padding-right: 10px;
    }


    .item
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: flex;

        width: 100%;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
        order: 3;
    }

    .item.first
    {
        order: 1;
    }


    .item > *
    {
        display: flex;

        min-height: 60px;
        padding: 8px;

        text-align: center;

        border-bottom: 1px solid rgba(255, 255, 255, .05);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .item a
    {
        color: currentColor;

        transition: color .2s linear;
        text-decoration: none;
    }

    .item a:hover
    {
        color: #950fff;
    }



    .table_wrap .validator
    {
        width: 250px;
        min-width: 250px;
        max-width: 250px;
    }


    .item .validator
    {
        text-align: left;

        justify-content: space-between;
    }


    .item .validator .logo
    {
        position: relative;

        display: flex;

        width: 30px;
        height: 30px;

        border-radius: 50%;
        background: #282828;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .item .validator .logo img
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

    .item .validator .logo img.hide
    {
        display: none;
    }

    .item .validator .logo .icon
    {
        display: block;

        width: 18px;
        height: 18px;
    }

    .item .validator .logo + *
    {
        width: calc(100% - 46px);
    }


    .item .validator .rank
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


    .item .validator .moniker
    {
        position: relative;

        display: inline-block;

        max-width: 100%;

        vertical-align: top;
        white-space: nowrap;
    }

    .item .validator .moniker span
    {
        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }


    .item .validator .sticker
    {
        font-size: 10px;
        line-height: 100%;

        display: inline-block;

        margin-top: 4px;
        padding: 4px;

        vertical-align: top;

        border: 1px solid #950fff;
        border-radius: 10px;
    }


    .item .validator .moniker .tooltip
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

    .item .validator .moniker .tooltip:before
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


    .item .validator .moniker:hover .tooltip
    {
        display: block;
    }


    .table_wrap .validator_vote
    {
        width: 140px;
        min-width: 140px;

        text-align: center;
    }


    .table_wrap .most_voted
    {
        width: 191px;
        min-width: 191px;

        text-align: center;
    }


    .table_wrap .community_votes
    {
        width: 100%;
    }


    .item .bar
    {
        position: relative;

        display: flex;

        width: 100%;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .item .bar > *
    {
        position: relative;

        height: 8px;
        /* min-width: 20px; */

        border-radius: 8px;
    }

    .item .bar > *.empty
    {
        background: rgba(255, 255, 255, .05);
    }

    .item .bar > * + *
    {
        margin-left: 4px;
    }


    .item .bar .nwv
    {
        background: #eb5757;
    }


    .item .bar .yes
    {
        background: #1bc562;
    }


    .item .bar .no
    {
        background: #c5811b;
    }


    .item .bar .tooltip
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        bottom: 100%;
        left: 50%;

        display: none;

        height: auto;
        margin-bottom: 18px;
        padding: 8px;

        transform: translateX(-50%);
        white-space: nowrap;

        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .item .bar .tooltip:before
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


    .scroll:not(.with_your_validator) .item:first-child .validator .moniker .tooltip,
    .scroll:not(.with_your_validator) .item:first-child .bar .tooltip,
    .item.first .validator .moniker .tooltip,
    .item.first .bar .tooltip
    {
        top: 100%;
        bottom: auto;

        margin-top: 8px;
        margin-bottom: 0;
    }

    .scroll:not(.with_your_validator) .item:first-child .validator .moniker .tooltip:before,
    .scroll:not(.with_your_validator) .item:first-child .bar .tooltip:before,
    .item.first .validator .moniker .tooltip:before,
    .item.first .bar .tooltip:before
    {
        top: auto;
        bottom: 100%;

        transform: rotate(180deg);
    }


    .item .bar .tooltip > *
    {
        position: relative;

        padding-left: 10px;

        background: none;
    }


    .item .bar .tooltip > *:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        display: block;

        width: 6px;
        height: 6px;
        margin: auto;

        content: '';

        border-radius: 50%;
    }

    .item .bar .tooltip > *.nwv:before
    {
        background: #eb5757;
    }


    .item .bar .tooltip > *.yes:before
    {
        background: #1bc562;
    }


    .item .bar .tooltip > *.no:before
    {
        background: #c5811b;
    }


    .item .bar .tooltip > * + *
    {
        margin-left: 8px;
    }


    .table_wrap .community_votes:hover .tooltip
    {
        display: flex;
    }



    @media print, (max-width: 1023px)
    {
        .titles,
        .item
        {
            width: 960px;
        }
    }



    @media print, (max-width: 767px)
    {
        .filter .btn
        {
            font-size: 13px;

            padding: 8px;
        }


        .scroll
        {
            max-height: 304px;
        }
    }

</style>