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

                <button class="btn" :class="{ active: currentFilter == 'Yes', disabled: !getFilterCount('Yes') }" @click.prevent="currentFilter = 'Yes'">
                    {{ $t('message.proposal_votes_filter_yes') }} {{ getFilterCount('Yes') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'No', disabled: !getFilterCount('No') }" @click.prevent="currentFilter = 'No'">
                    {{ $t('message.proposal_votes_filter_no') }} {{ getFilterCount('No') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'NWV', disabled: !getFilterCount('NWV') }" @click.prevent="currentFilter = 'NWV'">
                    {{ $t('message.proposal_votes_filter_nwv') }} {{ getFilterCount('NWV') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'Abstain', disabled: !getFilterCount('Abstain') }" @click.prevent="currentFilter = 'Abstain'">
                    {{ $t('message.proposal_votes_filter_abstain') }} {{ getFilterCount('Abstain') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'weighted', disabled: !getFilterCount('Weighted') }" @click.prevent="currentFilter = 'weighted'">
                    {{ $t('message.proposal_votes_filter_weighted') }} {{ getFilterCount('Weighted') }}
                </button>

                <button class="btn" :class="{ active: currentFilter == 'note_vote', disabled: !getFilterCount(null) }" @click.prevent="currentFilter = null">
                    {{ $t('message.proposal_votes_filter_null') }} {{ getFilterCount(null) }}
                </button>
            </div>


            <div class="table_wrap">
                <div class="titles">
                    <div class="validator">{{ $t('message.proposal_votes_th_validator') }}</div>
                    <div class="validator_vote">{{ $t('message.proposal_votes_th_validator_vote') }}</div>
                    <div class="most_voted">{{ $t('message.proposal_votes_th_most_voted') }}</div>

                    <div class="community_votes">
                        {{ $t('message.proposal_votes_th_community_votes') }}

                        <div class="tooltip">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>

                            <div class="text">
                                {{ $t('message.proposal_votes_community_votes_tooltip') }}
                            </div>
                        </div>
                    </div>

                    <div class="percents">
                        <span v-html="$t('message.proposal_votes_th_percents')"></span>

                        <div class="tooltip">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>

                            <div class="text">
                                {{ $t('message.proposal_votes_percents_tooltip') }}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="scroll" :class="{ with_your_validator: walletValidators.length }">
                    <div class="item" v-for="(validator, index) in filterValidators(currentFilter)" :key="index" :class="{ first: checkValidator(validator.operator_address), last: !validator.voting_power_rank }">
                        <div class="validator">
                            <div class="logo">
                                <img :src="`${validator.mintscan_avatar_url}`" :alt="validator.moniker" @error="imageLoadError">

                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_user"></use></svg>

                                <div class="rank">
                                    <span v-if="!validator.voting_power_rank">{{ $t('message.proposal_votes_validator_no_active') }}</span>
                                    <span v-else>{{ validator.voting_power_rank }}</span>
                                </div>
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
                            <a v-if="Object.keys(validator.validator_option).length" :href="`https://www.mintscan.io/${store.networks[props.proposal.network].mintscanAlias}/txs/${validator.vote_tx_hash}`" target="_blank" rel="noopener nofollow">
                                <span v-if="validator.validator_option.VOTE_OPTION_YES">{{ $t('message.proposal_vote_yes') }}</span>
                                <span v-if="validator.validator_option.VOTE_OPTION_NO">{{ $t('message.proposal_vote_no') }}</span>
                                <span v-if="validator.validator_option.VOTE_OPTION_ABSTAIN">{{ $t('message.proposal_vote_abstain') }}</span>
                                <span v-if="validator.validator_option.VOTE_OPTION_NO_WITH_VETO">{{ $t('message.proposal_vote_nwv') }}</span>
                            </a>

                            <span v-else>&mdash;</span>
                        </div>

                        <div class="most_voted">
                            <span v-if="validator.most_voted == 'VOTE_OPTION_YES'">{{ $t('message.proposal_vote_yes') }}</span>
                            <span v-if="validator.most_voted == 'VOTE_OPTION_NO'">{{ $t('message.proposal_vote_no') }}</span>
                            <span v-if="validator.most_voted == 'VOTE_OPTION_ABSTAIN'">{{ $t('message.proposal_vote_abstain') }}</span>
                            <span v-if="validator.most_voted == 'VOTE_OPTION_NO_WITH_VETO'">{{ $t('message.proposal_vote_nwv') }}</span>
                            <span v-if="validator.most_voted == 'DID_NOT_VOTE'">&mdash;</span>
                        </div>

                        <div class="community_votes">
                            <div class="empty" v-if="validator.most_voted == 'DID_NOT_VOTE'">
                                {{ $t('message.proposal_vote_did_not_vote') }}
                            </div>

                            <div class="bar" v-else>
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
                            </div>
                        </div>

                        <div class="percents">
                            <span v-if="validator.voting_power > 0">
                                <template v-if="calcCommunityPercents(validator) < 0.01">&lt;0.01%</template>
                                <template v-else>{{ $filters.toFixed(calcCommunityPercents(validator), 2) }}%</template>
                            </span>

                            <span v-else>0%</span>
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
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_YES)
        }

        if(status == 'No') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_NO)
        }

        if(status == 'NWV') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_NO_WITH_VETO)
        }

        if(status == 'Abstain') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_ABSTAIN)
        }

        if(status == 'Weighted') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_WEIGHTED)
        }

        if(status == null) {
            result = validators.value.delegators.filter(el => Object.keys(el.validator_option).length === 0)
        }

        return result.length
    }


    // Get filter count
    function filterValidators(status) {
        let result = validators.value.delegators

        // Set filter
        currentFilter.value = status

        if(status == 'Yes') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_YES)
        }

        if(status == 'No') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_NO)
        }

        if(status == 'NWV') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_NO_WITH_VETO)
        }

        if(status == 'Abstain') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_ABSTAIN)
        }

        if(status == 'Weighted') {
            result = validators.value.delegators.filter(el => el.validator_option.VOTE_OPTION_WEIGHTED)
        }

        if(status == null) {
            result = validators.value.delegators.filter(el => Object.keys(el.validator_option).length === 0)
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


    function calcCommunityPercents(validator) {
        return (validator.delegators_shares_option_abstain + validator.delegators_shares_option_no + validator.delegators_shares_option_nwv + validator.delegators_shares_option_yes) / Math.pow(10, store.networks[store.currentNetwork].exponent) / validator.voting_power * 100
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
        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-bottom: 8px;
        margin-left: -8px;
    }

    .filter > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .filter .btn
    {
        font-size: 14px;
        line-height: 100%;

        padding: 9px 8px;

        transition: .2s linear;

        color: #fff;
        border-radius: 10px;
        background: #282828;
    }

    .filter .btn.disabled
    {
        pointer-events: none;

        opacity: .35;
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
        font-size: 14px;
        line-height: 17px;

        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;

        padding-right: 6px;

        color: #555;
    }

    .titles > *
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        padding: 10px 8px 18px;

        text-align: center;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }

    .titles > *:first-child
    {
        justify-content: flex-start;

        text-align: left;
    }

    .titles > *:last-child
    {
        padding-right: 10px;
    }


    .titles .tooltip
    {
        position: relative;

        margin-left: 8px;
    }


    .titles .tooltip .icon
    {
        display: block;

        width: 14px;
        height: 14px;

        color: #fff;
    }


    .titles .tooltip .text
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        bottom: 100%;
        left: 50%;

        display: none;

        width: 164px;
        margin-bottom: 8px;
        padding: 8px;

        transform: translateX(-50%);
        text-align: center;
        pointer-events: none;

        color: #fff;
        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    }

    .titles .tooltip .text:before
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

    .titles .tooltip:hover .text
    {
        display: block;
    }


    .item
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;
        order: 3;

        width: 100%;
    }

    .item.first
    {
        order: 1;
    }

    .item.last
    {
        order: 5;
    }


    .item > *
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        min-height: 60px;
        padding: 8px;

        text-align: center;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }


    .item a
    {
        transition: color .2s linear;
        text-decoration: none;

        color: currentColor;
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
        justify-content: space-between;

        text-align: left;
    }


    .item .validator .logo
    {
        position: relative;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 30px;
        height: 30px;

        border-radius: 50%;
        background: #282828;
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
        font-size: 10px;
        line-height: 14px;

        position: absolute;
        top: -5px;
        left: 18px;

        min-width: 22px;
        height: 14px;
        padding: 0 4px;

        text-align: center;
        white-space: nowrap;

        color: #fff;
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
        width: 120px;
        min-width: 120px;

        text-align: center;
    }


    .table_wrap .most_voted
    {
        width: 120px;
        min-width: 120px;

        text-align: center;
    }


    .table_wrap .community_votes
    {
        width: 100%;
    }


    .table_wrap .percents
    {
        justify-content: flex-start;

        width: 124px;
        min-width: 124px;
    }


    .table_wrap .community_votes .empty
    {
        text-align: center;
    }


    .item .bar
    {
        position: relative;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: flex-start;

        width: 100%;
    }

    .item .bar > *
    {
        position: relative;

        height: 8px;

        border-radius: 8px;
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
        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: center;

        height: auto;
        margin-bottom: 18px;
        padding: 8px;

        transform: translateX(-50%);
        white-space: nowrap;

        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
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