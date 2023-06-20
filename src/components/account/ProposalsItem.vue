<template>
    <router-link :to="`/${store.currentNetwork}/proposal/${props.proposal.id}`" class="proposal">
        <div class="network_logo">
            <img :src="`/${store.currentNetwork}_logo.png`" alt="">
        </div>

        <!-- <pre>{{ props.proposal }}</pre> -->

        <div class="status">
            <div v-if="props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'" class="violet">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_status_deposite"></use></svg>
                <span>{{ $t('message.account_proposals_status_deposite') }}</span>
            </div>

            <div v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'" class="blue">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_status_voting"></use></svg>
                <span>{{ $t('message.account_proposals_status_voting') }}</span>
            </div>

            <div v-if="props.proposal.status == 'PROPOSAL_STATUS_PASSED'" class="green">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_status_passed"></use></svg>
                <span>{{ $t('message.account_proposals_status_passed') }}</span>
            </div>

            <div v-if="props.proposal.status == 'PROPOSAL_STATUS_REJECTED'" class="red">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_status_rejected"></use></svg>
                <span>{{ $t('message.account_proposals_status_rejected') }}</span>
            </div>
        </div>

        <div class="date" v-if="props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
            <vue-countdown :time="dateCalc(proposal.deposit_end_time) - new Date()" v-slot="{ days, hours, minutes, seconds }">
                {{ days }}D : {{ hours }}H : {{ minutes }}M : {{ seconds }}S
            </vue-countdown>
        </div>

        <div class="date" v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
            <vue-countdown :time="dateCalc(proposal.voting_end_time) - new Date()" v-slot="{ days, hours, minutes, seconds }">
                {{ days }}D : {{ hours }}H : {{ minutes }}M : {{ seconds }}S
            </vue-countdown>
        </div>

        <div class="date" v-if="props.proposal.status == 'PROPOSAL_STATUS_PASSED' || proposal.status == 'PROPOSAL_STATUS_REJECTED'">
            <div>{{ $t('message.proposal_date_label_default') }}</div>
            <div><timeago :datetime="dateCalc(proposal.voting_end_time)" autoUpdate /></div>
        </div>

        <div class="name">#{{ props.proposal.id }} {{ props.proposal.title }}</div>

        <div class="desc">{{ props.proposal.description }}</div>

        <div class="progress" v-if="props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'">
            <div class="bar">
                <div class="violet" :style="`width: ${$filters.toFixed(props.proposal.deposit / store.networks[store.currentNetwork].exponent / store.networks[store.currentNetwork].proposal_need * 100, 2)}%;`"></div>
            </div>

            <div class="funds">
                <div>
                    <div class="label">{{ $t('message.proposal_deposite_label_collected') }}</div>

                    <div class="val">
                        {{ $filters.toFixed(props.proposal.deposit / store.networks[store.currentNetwork].exponent, 0) }}
                        {{ store.networks[store.currentNetwork].token_name }}
                    </div>
                </div>

                <div>
                    <div class="label">{{ $t('message.proposal_deposite_label_necessary') }}</div>

                    <div class="val">
                        {{ store.networks[store.currentNetwork].proposal_need }}
                        {{ store.networks[store.currentNetwork].token_name }}
                    </div>
                </div>
            </div>
        </div>

        <div class="progress" v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'">
            <div class="bar">
                <div class="yes green" :style="`width: ${getProgressPercents(props.proposal.tally_yes)}%;`"></div>
                <div class="no orange" :style="`width: ${getProgressPercents(props.proposal.tally_no)}%;`"></div>
                <div class="nwv red" :style="`width: ${getProgressPercents(props.proposal.tally_no_with_veto)}%;`"></div>
            </div>

            <div class="exp">
                <div class="yes green">
                    <div class="label">{{ $t('message.proposal_voting_label_yes') }}</div>
                    <div class="val">{{ getProgressPercents(props.proposal.tally_yes) }}%</div>
                </div>

                <div class="no orange">
                    <div class="label">{{ $t('message.proposal_voting_label_no') }}</div>
                    <div class="val">{{ getProgressPercents(props.proposal.tally_no) }}%</div>
                </div>

                <div class="nwv red">
                    <div class="label">{{ $t('message.proposal_voting_label_nwv') }}</div>
                    <div class="val">{{ getProgressPercents(props.proposal.tally_no_with_veto) }}%</div>
                </div>
            </div>
        </div>

        <div class="progress" v-if="props.proposal.status == 'PROPOSAL_STATUS_PASSED' || proposal.status == 'PROPOSAL_STATUS_REJECTED'">
            <div class="bar">
                <div class="yes green" :style="`width: ${getProgressPercentsWithAbstain(props.proposal.tally_yes)}%;`"></div>
                <div class="no orange" :style="`width: ${getProgressPercentsWithAbstain(props.proposal.tally_no)}%;`"></div>
                <div class="nwv red" :style="`width: ${getProgressPercentsWithAbstain(props.proposal.tally_no_with_veto)}%;`"></div>
            </div>

            <div class="exp">
                <div class="yes green">
                    <div class="label">{{ $t('message.proposal_voting_label_yes') }}</div>
                    <div class="val">{{ getProgressPercentsWithAbstain(props.proposal.tally_yes) }}%</div>
                </div>

                <div class="no orange">
                    <div class="label">{{ $t('message.proposal_voting_label_no') }}</div>
                    <div class="val">{{ getProgressPercentsWithAbstain(props.proposal.tally_no) }}%</div>
                </div>

                <div class="nwv red">
                    <div class="label">{{ $t('message.proposal_voting_label_nwv') }}</div>
                    <div class="val">{{ getProgressPercentsWithAbstain(props.proposal.tally_no_with_veto) }}%</div>
                </div>

                <div class="abstain grey">
                    <div class="label">{{ $t('message.proposal_voting_label_abstain') }}</div>
                    <div class="val">{{ getProgressPercentsWithAbstain(props.proposal.tally_abstain) }}%</div>
                </div>
            </div>
        </div>

        <!-- <div class="likes">
            <button class="like btn">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_like"></use></svg>
                <span>True 1598</span>
            </button>

            <button class="dislike btn">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_dislike"></use></svg>
                <span>False 1200</span>
            </button>
        </div> -->
    </router-link>
</template>


<script setup>
    import { reactive } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        props = defineProps(['proposal']),
        data = reactive({
            userTimeZone: new Date().getTimezoneOffset() / 60 * -1
        })


    // Date calc
    function dateCalc(date) {
        let currentDate = new Date(date)

        return new Date(currentDate.setHours(currentDate.getHours() + data.userTimeZone))
    }


    // Get progress percents
    function getProgressPercents(value) {
        let sum = props.proposal.tally_no + props.proposal.tally_no_with_veto + props.proposal.tally_yes

        return (value / sum * 100).toFixed(2)
    }


    // Get progress percents with abstain
    function getProgressPercentsWithAbstain(value) {
        let sum = props.proposal.tally_abstain + props.proposal.tally_no + props.proposal.tally_no_with_veto + props.proposal.tally_yes

        return (value / sum * 100).toFixed(2)
    }
</script>


<style scoped>
    .proposal
    {
        color: currentColor;

        display: flex;

        padding: 10px;

        transition: border-color .2s linear;
        text-decoration: none;

        border: 1px solid transparent;
        border-radius: 13px;
        background: #0d0d0d;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .proposal .network_logo
    {
        width: 32px;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 16px;

        border-radius: 50%;
    }

    .proposal .network_logo img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;

        object-fit: cover;
    }


    .proposal .status
    {
        font-size: 12px;
        line-height: 130%;

        margin-bottom: 16px;
    }

    .proposal .status div
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

    .proposal .status div.blue
    {
        color: #0343e8;

        background: rgba(3, 67, 232, .05);
    }

    .proposal .status div.green
    {
        color: #1bc562;

        background: rgba(27, 197, 98, .05);
    }

    .proposal .status div.red
    {
        color: #eb5757;

        background: rgba(235, 87, 87, .05);
    }

    .proposal .status div.violet
    {
        color: #950fff;

        background: rgba(149, 15, 255, .05);
    }


    .proposal .status .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .proposal .date
    {
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

    .proposal .date > * + *
    {
        margin-left: 4px;
    }


    .proposal .name
    {
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;

        overflow: hidden;

        width: 100%;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .proposal .desc
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


    .proposal .progress
    {
        width: 100%;
        margin-top: 8px;
    }


    .proposal .progress .bar
    {
        display: flex;
        overflow: hidden;

        height: 8px;

        border-radius: 4px;
        background: #353535;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }

    .proposal .progress .bar > *
    {
        height: 8px;
    }

    .proposal .progress .bar > *.green
    {
        background: #1bc562;
    }

    .proposal .progress .bar > *.orange
    {
        background: #c5811b;
    }

    .proposal .progress .bar > *.red
    {
        background: #eb5757;
    }

    .proposal .progress .bar > *.violet
    {
        background: #950fff;
    }


    .proposal .progress .exp
    {
        display: flex;

        margin-top: 8px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }

    .proposal .progress .exp > *
    {
        width: 100%;
        padding: 4px;

        border-radius: 7px;
        background: #191919;
    }

    .proposal .progress .exp > * + *
    {
        margin-left: 8px;
    }


    .proposal .progress .exp .label
    {
        color: #555;
        font-size: 12px;
        line-height: 100%;

        margin-bottom: 4px;
    }

    .proposal .progress .exp .green .label
    {
        color: #1bc562;
    }

    .proposal .progress .exp .orange .label
    {
        color: #c5811b;
    }

    .proposal .progress .exp .red .label
    {
        color: #eb5757;
    }


    .proposal .progress .exp .val
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 100%;
    }


    .proposal .progress .funds
    {
        font-size: 12px;
        line-height: 17px;

        margin-top: 8px;
    }


    .proposal .progress .funds > *
    {
        display: flex;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposal .progress .funds > * + *
    {
        margin-top: 4px;
    }

    .proposal .progress .funds .label
    {
        color: #555;
    }


    .proposal .progress .funds .val
    {
        white-space: nowrap;
    }


    .proposal .likes
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

    .proposal .likes .btn
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;

        padding: 8px;

        transition: .2s linear;

        border-radius: 14px;
        background: #191919;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .proposal .likes .btn.like
    {
        color: #950fff;
    }

    .proposal .likes .btn.dislike
    {
        color: #eb5757;
    }

    .proposal .likes .btn + .btn
    {
        margin-left: 8px;
    }

    .proposal .likes .btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }

    .proposal .likes .btn span
    {
        display: none;
    }

    .proposal .likes .btn.active span
    {
        display: block;
    }


    .proposal .likes .btn.like:hover
    {
        color: #fff;

        background: #950fff;
    }


    .proposal .likes .btn.dislike:hover
    {
        color: #fff;

        background: #eb5757;
    }


    .proposal:hover
    {
        border-color: #950fff;
    }

</style>