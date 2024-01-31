<template>
    <div class="sticky">
        <div class="loader_wrap" v-if="loading">
            <div class="loader"><span></span></div>
        </div>


        <div class="current_account" v-if="store.account.wallets.length">
            <div class="label">
                {{ $t('message.proposal_current_account_title') }}
            </div>

            <button class="btn current" :class="{ active: showAccountDropdown }" @click.prevent="showAccountDropdown = !showAccountDropdown">
                <span>{{ getCurrentAccount() }}</span>
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
            </button>

            <transition name="fadeUp" mode="out-in">
            <div class="dropdown" v-if="showAccountDropdown">
                <template v-for="(wallet, index) in store.account.wallets" :key="index">
                <div v-if="getCurrentAccount() != wallet.nickname">
                    <button class="btn" @click.prevent="selectWallet(wallet.address)">
                        {{ wallet.nickname }}
                    </button>
                </div>
                </template>
            </div>
            </transition>
        </div>


        <div class="current_vote" v-if="props.proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
            <div class="label">
                {{ $t('message.proposal_current_vote_title') }}
            </div>

            <template v-if="props.currentVote.value && props.currentVote.value.votes.length">
                <template v-if="props.currentVote.value.votes[0].option == 'VOTE_OPTION_YES'">
                <div class="val green">{{ $t('message.proposal_vote_result_yes_label') }}</div>
                </template>

                <template v-if="props.currentVote.value.votes[0].option == 'VOTE_OPTION_NO'">
                    <div class="val yellow">{{ $t('message.proposal_vote_result_no_label') }}</div>
                </template>

                <template v-if="props.currentVote.value.votes[0].option == 'VOTE_OPTION_NO_WITH_VETO'">
                    <div class="val red">{{ $t('message.proposal_vote_result_nwv_label') }}</div>
                </template>
            </template>

            <div class="val grey" v-else>{{ $t('message.proposal_vote_result_no_vote_label') }}</div>
        </div>


        <div class="vote" v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'" :class="{ disabled: store.account.currentWallet != generateAddress('bostrom', store.Keplr.account.address) }">
            <div class="loader_wrap" v-if="voteLoading">
                <div class="loader"><span></span></div>
            </div>

            <button class="btn green" @click.prevent="setVote(1)">
                {{ $t('message.proposal_vote_yes_btn') }}
            </button>

            <button class="btn yellow" @click.prevent="setVote(3)">
                {{ $t('message.proposal_vote_no_btn') }}
            </button>

            <button class="btn red" @click.prevent="setVote(4)">
                {{ $t('message.proposal_vote_nwv_btn') }}
            </button>

            <button class="btn grey" @click.prevent="setVote(2)">
                {{ $t('message.proposal_vote_abstain_btn') }}
            </button>

            <div class="tooltip" v-if="store.account.currentWallet != generateAddress('bostrom', store.Keplr.account.address)">
                {{ $t('message.proposal_add_vote_exp') }}
            </div>
        </div>


        <div class="deposit_status" v-if="props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
        <!-- <div class="deposit_status"> -->
            <div class="title">
                {{ $t('message.proposal_deposit_status_title') }}

                <button class="refresh_btn" @click.prevent="refreshProposalData">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_refresh"></use></svg>
                    <span>{{ $t('message.btn_refresh') }}</span>
                </button>
            </div>

            <div class="chart">
                <div class="percents">
                    {{ $filters.toFixed(formatTokenAmount(props.proposal.deposit, store.networks[store.currentNetwork].token_name) / store.networks[props.proposal.network].proposal_need * 100, 2) }}%
                </div>

                <Doughnut ref="chart" :data="chartData" :options="chartOptions" />
            </div>

            <button class="deposit_btn" @click.prevent="showDepositModal = !showDepositModal" :class="{ disabled: store.account.currentWallet != generateAddress('bostrom', store.Keplr.account.address) }">
                <div class="tooltip" v-if="store.account.currentWallet != generateAddress('bostrom', store.Keplr.account.address)">
                    {{ $t('message.proposal_add_vote_exp') }}
                </div>

                {{ $t('message.btn_deposit') }}
            </button>
        </div>


        <div class="details">
            <div class="title">{{ $t('message.proposal_details_title') }}</div>

            <div class="row">
                <div class="item" v-if="props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
                    <div class="label">
                        {{ $t('message.proposal_details_deposit_label') }}
                    </div>

                    <div class="val">
                        <vue-countdown :time="dateCalc(props.proposal.deposit_end_time) - new Date()" v-slot="{ days, hours, minutes, seconds }">
                            {{ days }}D : {{ hours }}H : {{ minutes }}M : {{ seconds }}S
                        </vue-countdown>
                    </div>
                </div>

                <div class="item" v-else>
                    <div class="label">{{ $t('message.proposal_details_voting_label') }}</div>

                    <div class="val">
                        {{ props.proposal.voting_end_time }}
                    </div>
                </div>

                <div class="item">
                    <div class="label">{{ $t('message.proposal_details_submit_label') }}</div>

                    <div class="val">
                        {{ props.proposal.submit_time }}
                    </div>
                </div>

                <div class="item">
                    <div class="label">{{ $t('message.proposal_details_total_label') }}</div>

                    <div class="val">
                        {{ formatTokenAmount(props.proposal.deposit, store.networks[store.currentNetwork].token_name) }}
                        {{ formatTokenName(store.networks[store.currentNetwork].token_name) }}
                    </div>
                </div>

                <div class="item">
                    <div class="label">{{ $t('message.proposal_details_initial_label') }}</div>

                    <div class="val">
                        {{ formatTokenAmount(props.proposal.init_deposit, store.networks[store.currentNetwork].token_name) }}
                        {{ formatTokenName(store.networks[store.currentNetwork].token_name) }}
                    </div>
                </div>
            </div>
        </div>


        <div class="vote_info" v-if="props.proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
            <div class="head">
                <div class="title">
                    {{ $t('message.proposal_vote_details_title') }}
                </div>

                <button class="refresh_btn" @click.prevent="refreshProposalData">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_refresh"></use></svg>
                    <span>{{ $t('message.btn_refresh') }}</span>
                </button>
            </div>

            <div class="chart">
                <div class="final_status">
                    <div class="label" v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
                        {{ $t('message.proposal_vote_info_current_status_label') }}:
                    </div>

                    <div class="label" v-else>
                        {{ $t('message.proposal_vote_info_final_status_label') }}:
                    </div>

                    <div class="val green" v-if="props.proposal.status == 'PROPOSAL_STATUS_PASSED'">
                        {{ $t('message.proposal_vote_info_status_passed') }}
                    </div>

                    <div class="val red" v-if="props.proposal.status == 'PROPOSAL_STATUS_REJECTED'">
                        {{ $t('message.proposal_vote_info_status_rejected') }}
                    </div>

                    <template v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
                    <div class="val green" v-if="isQuorum()">
                        {{ $t('message.proposal_vote_info_status_passing') }}
                    </div>

                    <div class="val red" v-else>
                        {{ $t('message.proposal_vote_info_status_rejecting') }}
                    </div>
                    </template>
                </div>

                <Doughnut :data="chartData" :options="chartOptions" />
            </div>

            <div class="row">
                <div class="turnout" :class="{ green: calcTurnout() > 40 }" v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
                    {{ $t('message.proposal_vote_info_turnout_label') }}:
                    {{ calcTurnout() }}%
                </div>

                <div class="total">
                    {{ $t('message.proposal_vote_info_total_vote_label') }}:
                    {{ (props.proposal.VOTE_OPTION_YES + props.proposal.VOTE_OPTION_NO + props.proposal.VOTE_OPTION_NO_WITH_VETO + props.proposal.VOTE_OPTION_ABSTAIN).toLocaleString('en-US')  }}
                </div>
            </div>

            <div class="exp" v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
                {{ $t('message.proposal_vote_info_minimum', {
                    amount: Number($filters.toFixed(formatTokenAmount(props.stakingPool.amount, store.networks[store.currentNetwork].token_name) * 0.4, 2)).toLocaleString('en-US'),
                    denom: formatTokenName(store.networks[store.currentNetwork].token_name)
                })}}
            </div>
        </div>


        <div class="vote_result" v-if="props.proposal.status != 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
            <div class="row">
                <div class="item">
                    <div class="val green">
                        {{ $t('message.proposal_vote_result_yes_label') }} {{ getProgressPercents(props.proposal.tally_yes) }}%
                    </div>

                    <div class="tokens_count">
                        {{ Number($filters.toFixed(formatTokenAmount(props.proposal.tally_yes, store.networks[store.currentNetwork].token_name), 2)).toLocaleString('en-US') }}
                        {{ formatTokenName(store.networks[store.currentNetwork].token_name) }}
                    </div>

                    <div class="votes_count">
                        {{ props.proposal.VOTE_OPTION_YES.toLocaleString('en-US') }}
                        {{ $t('message.proposal_vote_result_votes_label') }}
                    </div>
                </div>

                <div class="item">
                    <div class="val yellow">
                        {{ $t('message.proposal_vote_result_no_label') }} {{ getProgressPercents(props.proposal.tally_no) }}%
                    </div>

                    <div class="tokens_count">
                        {{ Number($filters.toFixed(formatTokenAmount(props.proposal.tally_no, store.networks[store.currentNetwork].token_name), 2)).toLocaleString('en-US') }}
                        {{ formatTokenName(store.networks[store.currentNetwork].token_name) }}
                    </div>

                    <div class="votes_count">
                        {{ props.proposal.VOTE_OPTION_NO.toLocaleString('en-US') }}
                        {{ $t('message.proposal_vote_result_votes_label') }}
                    </div>
                </div>

                <div class="item">
                    <div class="val red">
                        {{ $t('message.proposal_vote_result_nwv_label') }} {{ getProgressPercents(props.proposal.tally_no_with_veto) }}%
                    </div>

                    <div class="tokens_count">
                        {{ Number($filters.toFixed(formatTokenAmount(props.proposal.tally_no_with_veto, store.networks[store.currentNetwork].token_name), 2)).toLocaleString('en-US') }}
                        {{ formatTokenName(store.networks[store.currentNetwork].token_name) }}
                    </div>

                    <div class="votes_count">
                        {{ props.proposal.VOTE_OPTION_NO_WITH_VETO.toLocaleString('en-US') }}
                        {{ $t('message.proposal_vote_result_votes_label') }}
                    </div>
                </div>

                <div class="item">
                    <div class="val">
                        {{ $t('message.proposal_vote_result_abstain_label') }} {{ getProgressPercents(props.proposal.tally_abstain) }}%
                    </div>

                    <div class="tokens_count">
                        {{ Number($filters.toFixed(formatTokenAmount(props.proposal.tally_abstain, store.networks[store.currentNetwork].token_name), 2)).toLocaleString('en-US') }}
                        {{ formatTokenName(store.networks[store.currentNetwork].token_name) }}
                    </div>

                    <div class="votes_count">
                        {{ props.proposal.VOTE_OPTION_ABSTAIN.toLocaleString('en-US') }}
                        {{ $t('message.proposal_vote_result_votes_label') }}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <DepositModal v-if="showDepositModal && store.account.currentWallet == generateAddress('bostrom', store.Keplr.account.address)" :proposal="props.proposal" />
</template>


<script setup>
    import { ref, reactive, inject, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    import { generateAddress, prepareTx, sendTx, formatTokenName, formatTokenAmount } from '@/utils'

    import { Chart as ChartJS, ArcElement } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    // Components
    import DepositModal from '../../components/modal/DepositModal.vue'


    ChartJS.register(ArcElement)


    var props = defineProps(['proposal', 'chartDatasets', 'currentVote', 'stakingPool']),
        store = useGlobalStore(),
        notification = useNotification(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        loading = ref(false),
        voteLoading = ref(false),
        showAccountDropdown = ref(false),
        showDepositModal = ref(false),
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
        chart = ref(null),
        chartColors = ['#1BC562', '#C5811B', '#EB5757', '#888888'],
        depositChartColors = ['#950FFF', '#353535'],
        chartData = computed(() => ({
            datasets: [{
                data: props.chartDatasets,
                backgroundColor: props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? depositChartColors : chartColors,
                borderColor: 'transparent',
                borderWidth: 0,
                hoverBackgroundColor: props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? depositChartColors : chartColors,
                hoverBorderColor: props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? depositChartColors : chartColors,
                borderAlign: 'inner',
                cutout: '84%'
            }]
        }))


    // Get current account
    function getCurrentAccount() {
        let { nickname } = store.account.wallets.find(wallet => wallet.address == store.account.currentWallet)

        return nickname
    }


    // Select wallet
    function selectWallet(address) {
        // Hide loader
        voteLoading.value = false

        // Set current wallet
        store.account.currentWallet = generateAddress('bostrom', address)

        // Refresh user current vote
        emitter.emit('refreshUserCurrentVote')

        // Hide dropdown
        showAccountDropdown.value = false
    }


    // Date calc
    function dateCalc(date) {
        let currentDate = new Date(date)

        return new Date(currentDate.setHours(currentDate.getHours() + userTimeZone))
    }


    // Get progress percents with abstain
    function getProgressPercents(value) {
        let sum = props.proposal.tally_abstain + props.proposal.tally_no + props.proposal.tally_no_with_veto + props.proposal.tally_yes

        return (value / sum * 100).toFixed(2)
    }


    // Calc turnout
    function calcTurnout() {
        let sum = props.proposal.tally_abstain + props.proposal.tally_no + props.proposal.tally_no_with_veto + props.proposal.tally_yes

        return (sum / props.stakingPool.amount * 100).toFixed(2)
    }


    // Check quorum
    function isQuorum() {
        let result = ''

        calcTurnout() > 40 && (props.proposal.tally_no_with_veto / (props.proposal.tally_no + props.proposal.tally_yes + props.proposal.tally_no_with_veto) > 0.334 && (props.proposal.tally_yes / (props.proposal.tally_no + props.proposal.tally_yes + props.proposal.tally_no_with_veto)) > 0.5)
            ? result = true
            : result = false

        return result
    }


    // Refresh proposal data
    async function refreshProposalData() {
        // Set loader
        loading.value = true

        // Send "refreshProposalData" event
        emitter.emit('refreshProposalData')
    }


    // Set vote
    async function setVote(option) {
        // Show loader
        voteLoading.value = true


        // Show notification
        notification.notify({
            group: 'default',
            duration: -100,
            title: i18n.global.t('message.notification_proposal_vote_process')
        })


        try{
            // Message
            let msgAny = [{
                typeUrl: '/cosmos.gov.v1beta1.MsgVote',
                value: {
                    proposalId: props.proposal.id,
                    voter: store.Keplr.account.address,
                    option: option
                }
            }]


            // Prepare Tx
            let prepareResult = await prepareTx(msgAny, false, props.proposal.network)


            // Send Tx
            let result = await sendTx(prepareResult)

            console.log(result)


            if(result.code != 0){
                // Show notification
                notification.notify({
                    group: 'default',
                    clean: true
                })

                notification.notify({
                    group: 'default',
                    title: i18n.global.t('message.notification_failed_title'),
                    text: i18n.global.t(`message.notification_tx_error_${result.code}`),
                    type: 'error',
                    data: {
                        chain: props.proposal.network,
                        tx_type: i18n.global.t('message.notification_action_proposal_vote')
                    }
                })

                return false
            }


            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                group: 'default',
                title: i18n.global.t('message.notification_successful_title'),
                type: 'success',
                data: {
                    chain: props.proposal.network,
                    tx_type: i18n.global.t('message.notification_action_proposal_vote')
                }
            })


            // Refresh user current vote
            emitter.emit('refreshUserCurrentVote')


            // Hide loader
            voteLoading.value = false
        } catch (error) {
            console.error(error)


            // Show notification
            notification.notify({
                group: 'default',
                clean: true
            })

            notification.notify({
                group: store.networks[props.proposal.network].denom,
                title: i18n.global.t('message.notification_failed_title'),
                text: i18n.global.t('message.notification_tx_error_rejected'),
                type: 'error',
                data: {
                    chain: props.proposal.network,
                    tx_type: i18n.global.t('message.notification_action_proposal_vote')
                }
            })


            // Hide loader
            voteLoading.value = false
        }
    }


    // Event "refresh Proposal Data Finished"
    emitter.on('refreshProposalDataFinished', async () => {
        // Hide loader
        loading.value = false
    })


    // Event "close Deposit Modal"
    emitter.on('closeDepositModal', () => {
        showDepositModal.value = false
    })
</script>


<style scoped>
    .sticky
    {
        position: sticky;
        top: 118px;
    }

    .current_account
    {
        position: relative;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-bottom: 16px;
        padding-bottom: 16px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }


    .current_account .label
    {
        font-weight: 500;
        line-height: 100%;
    }


    .current_account .current
    {
        font-size: 14px;
        line-height: 100%;

        position: relative;

        display: block;

        width: 158px;
        height: 28px;
        margin-left: auto;
        padding: 6px 26px 6px 6px;

        text-align: left;

        border-radius: 6px;
        background: #191919;
    }

    .current_account .current .icon
    {
        position: absolute;
        top: 0;
        right: 6px;
        bottom: 0;

        display: block;

        width: 16px;
        height: 16px;
        margin: auto;

        transition: transform .2s linear;
    }

    .current_account .current.active .icon
    {
        transform: rotate(180deg);
    }


    .current_account .dropdown
    {
        position: absolute;
        z-index: 9;
        top: 100%;
        right: 0;

        width: 158px;
        max-width: 100%;
        margin-top: -13px;
        padding: 4px;

        border-radius: 6px;
        background: #1c1c1c;
    }

    .current_account .dropdown > * + *
    {
        margin-top: 4px;
    }


    .current_account .dropdown .btn
    {
        font-size: 12px;
        line-height: 15px;

        display: block;

        width: 100%;
        padding: 6px 4px;

        transition: background .2s linear;
        text-align: left;

        border-radius: 6px;
    }

    .current_account .dropdown .btn:hover
    {
        background: #232323;
    }



    .current_vote
    {
        font-weight: 500;
        line-height: 100%;

        position: relative;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .current_vote .val::first-letter
    {
        text-transform: uppercase;
    }

    .current_vote .green
    {
        color: #1bc562;
    }

    .current_vote .grey
    {
        color: #555;
    }


    .vote
    {
        position: relative;

        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-top: 16px;
        margin-bottom: -8px;
        margin-left: -8px;
    }


    .vote .tooltip
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        top: 50%;
        left: 50%;

        display: block;

        margin-bottom: 8px;
        padding: 8px;

        transform: translate(-50%, calc(-50% - 4px));
        white-space: nowrap;

        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    }

    .connected_addresses .tooltip:before
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


    .vote .btn
    {
        font-size: 14px;
        line-height: 100%;

        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
        padding: 8px;

        transition: .2s linear;

        border-radius: 10px;
        background: #353535;
    }

    .vote.disabled .btn
    {
        pointer-events: none;

        opacity: .3;
    }

    .vote .btn.green
    {
        background: #1bc562;
    }

    .vote .btn.yellow
    {
        background: #c5811b;
    }

    .vote .btn.red
    {
        background: #eb5757;
    }


    .deposit_status .title
    {
        font-weight: 500;
        line-height: 100%;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-bottom: 16px;
    }


    .refresh_btn
    {
        font-size: 14px;
        line-height: 20px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-left: auto;

        color: #950fff;
    }

    .refresh_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .deposit_btn
    {
        font-size: 14px;
        line-height: 100%;

        position: relative;

        display: block;

        width: 100%;
        margin-top: 16px;
        padding: 10px;

        transition: background .2s linear;
        text-align: center;

        border-radius: 10px;
        background: #950fff;
    }

    .deposit_btn.disabled
    {
        cursor: default;
        pointer-events: none;

        color: rgba(255,255,255,.5);
        background: rgba(149, 15, 255, .5);
    }

    .deposit_btn .tooltip
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        bottom: 100%;
        left: 50%;

        margin-bottom: 8px;
        padding: 8px;

        transform: translateX(-50%);
        white-space: nowrap;

        color: #fff;
        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    }

    .deposit_btn .tooltip:before
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


    .deposit_btn:hover
    {
        background: #7700e1;
    }


    .details
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .details .title
    {
        font-weight: 500;
        line-height: 100%;

        margin-bottom: 16px;
    }


    .details .row
    {
        align-content: stretch;
        align-items: stretch;

        margin-bottom: -8px;
        margin-left: -8px;
    }

    .details .row > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .details .item
    {
        min-height: 81px;
        padding: 8px;

        border-radius: 10px;
        background: #191919;
    }


    .details .label
    {
        font-size: 12px;
        line-height: 100%;

        margin-bottom: 8px;

        color: #555;
    }


    .details .val
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 110%;
    }


    .vote_info
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .vote_info .head
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-bottom: 16px;
    }


    .vote_info .title
    {
        font-weight: 500;
        line-height: 100%;
    }


    .chart
    {
        position: relative;

        width: 200px;
        height: 200px;
        margin: 0 auto;
    }


    .chart .percents
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 100%;

        position: absolute;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 100%;
        height: 100%;

        text-align: center;
    }


    .chart .final_status
    {
        position: absolute;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 100%;
        height: 100%;

        text-align: center;
    }

    .chart .final_status .label
    {
        font-size: 14px;
        line-height: 17px;

        width: 100%;

        color: #555;
    }

    .chart .final_status .val
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;
    }

    .chart .final_status .val.green
    {
        color: #1bc562;
    }

    .chart .final_status .val.yellow
    {
        color: #c5811b;
    }

    .chart .final_status .val.red
    {
        color: #eb5757;
    }


    .vote_info > .row
    {
        justify-content: center;
    }


    .vote_info .turnout
    {
        font-size: 12px;
        line-height: 15px;

        margin-top: 16px;
        margin-right: auto;
        padding: 7px;

        color: #eb5757;
        border: 1px solid;
        border-radius: 8px;
    }

    .vote_info .turnout.green
    {
        color: #1bc562;
    }


    .vote_info .total
    {
        font-size: 12px;
        line-height: 15px;

        margin-top: 16px;
        padding: 7px;

        color: #950fff;
        border: 1px solid;
        border-radius: 8px;
    }


    .vote_info .exp
    {
        font-size: 12px;
        line-height: 15px;

        margin-top: 8px;

        color: #555;
    }


    .vote_info .refresh_btn
    {
        font-size: 14px;
        line-height: 20px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-left: auto;

        color: #950fff;
    }

    .vote_info .refresh_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .vote_result
    {
        margin-top: 16px;
        padding-top: 16px;
        padding-bottom: 14px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }

    .vote_result .row
    {
        align-content: stretch;
        align-items: stretch;

        margin-bottom: -8px;
        margin-left: -8px;
    }

    .vote_result .row > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .vote_result .item
    {
        font-size: 14px;
        line-height: 100%;

        padding: 8px;

        color: #555;
        border-radius: 10px;
        background: #191919;
    }

    .vote_result .item > * + *
    {
        margin-top: 8px;
    }


    .vote_result .item .val
    {
        font-size: 16px;
        font-weight: 500;

        text-transform: uppercase;
    }

    .vote_result .item .green
    {
        color: #1bc562;
    }

    .vote_result .item .yellow
    {
        color: #c5811b;
    }

    .vote_result .item .red
    {
        color: #eb5757;
    }




    @media print, (max-width: 1359px)
    {
        .details .val
        {
            font-size: 13px;
        }


        .chart .final_status .val,
        .chart .percents
        {
            font-size: 30px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .vote .btn,
        .details .row > *,
        .vote_result .row > *
        {
            width: calc(25% - 8px);
        }
    }



    @media print, (max-width: 767px)
    {
        .vote .btn,
        .details .row > *,
        .vote_result .row > *
        {
            width: calc(50% - 8px);
        }
    }



    @media print, (max-width: 479px)
    {
        .chart .final_status .val,
        .chart .percents
        {
            font-size: 28px;
        }
    }
</style>