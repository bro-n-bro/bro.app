<template>
    <section class="head">
        <div v-if="props.proposal.status == 'PROPOSAL_STATUS_DEPOSIT_PERIOD'" class="status violet">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_status_deposite"></use></svg>
            <span>{{ $t('message.account_proposals_status_deposite') }}</span>
        </div>

        <div v-if="props.proposal.status == 'PROPOSAL_STATUS_VOTING_PERIOD'" class="status blue">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_status_voting"></use></svg>
            <span>{{ $t('message.account_proposals_status_voting') }}</span>
        </div>

        <div v-if="props.proposal.status == 'PROPOSAL_STATUS_PASSED'" class="status green">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_status_passed"></use></svg>
            <span>{{ $t('message.account_proposals_status_passed') }}</span>
        </div>

        <div v-if="props.proposal.status == 'PROPOSAL_STATUS_REJECTED'" class="status red">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_status_rejected"></use></svg>
            <span>{{ $t('message.account_proposals_status_rejected') }}</span>
        </div>

        <div class="suspicious" v-if="checkProposalSuspicious(props.proposal)">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_suspicious"></use></svg>
            <span>{{ $t('message.account_proposals_suspicious_tooltip') }}</span>
        </div>


        <div class="type">
            <svg class="icon" v-if="props.proposal.proposal_type == 'Text'"><use xlink:href="@/assets/sprite.svg#ic_proposal_Text"></use></svg>
            <svg class="icon" v-if="props.proposal.proposal_type == 'CommunityPoolSpend'"><use xlink:href="@/assets/sprite.svg#ic_proposal_CommunityPoolSpend"></use></svg>
            <svg class="icon" v-if="props.proposal.proposal_type == 'SoftwareUpgrade'"><use xlink:href="@/assets/sprite.svg#ic_proposal_SoftwareUpgrade"></use></svg>
            <svg class="icon" v-if="props.proposal.proposal_type == 'ParameterChange'"><use xlink:href="@/assets/sprite.svg#ic_proposal_ParameterChange"></use></svg>

            <svg class="icon" v-if="props.proposal.proposal_type != 'Text' && props.proposal.proposal_type != 'CommunityPoolSpend' && props.proposal.proposal_type != 'SoftwareUpgrade' && props.proposal.proposal_type != 'ParameterChange'"><use xlink:href="@/assets/sprite.svg#ic_proposal_UpdateSmartContract"></use></svg>

            <span>{{ props.proposal.proposal_type }}</span>
        </div>


        <div class="name">
            <div class="logo">
                <img :src="`/${props.proposal.network}_logo.png`" alt="">
            </div>

            <div>#{{ props.proposal.id }} {{ props.proposal.title }}</div>
        </div>


        <div class="proposer">
            <span>{{ $t('message.proposal_proposer_label') }}:</span>

            <a :href="`https://www.mintscan.io/${store.networks[props.proposal.network].mintscanAlias}/validators/${props.proposal.moniker}`" target="_blank" rel="noopener nofollow" v-if="proposal.moniker">
                {{ props.proposal.moniker }}
            </a>

            <a :href="`https://www.mintscan.io/${store.networks[props.proposal.network].mintscanAlias}/account/${props.proposal.proposer_address}`" target="_blank" rel="noopener nofollow" v-else>
                {{ props.proposal.proposer_address }}
            </a>
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'
    import { checkProposalSuspicious } from '@/utils'


    const props = defineProps(['proposal']),
        store = useGlobalStore()
</script>


<style scoped>
    .head
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-bottom: 32px;
    }


    .head .status
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        padding: 7px 5px;

        border: 1px solid;
        border-radius: 10px;
    }

    .head .status.green
    {
        color: #1bc562;
        background: rgba(27, 197, 98, .05);
    }

    .head .status.blue
    {
        color: #0343e8;
        background: rgba(3, 67, 232, .05);
    }

    .head .status.violet
    {
        color: #950fff;
        background: rgba(149, 15, 255, .05);
    }

    .head .status.red
    {
        color: #eb5757;
        background: rgba(235, 87, 87, .05);
    }

    .head .status .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .head .suspicious
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        height: 32px;
        margin-left: 8px;
        padding: 0 5px;

        color: #c5811b;
        border: 1px solid;
        border-radius: 10px;
        background: rgba(197, 129, 27, .05);
    }


    .head .suspicious .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .head .type
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-left: 8px;
        padding: 7px 5px;

        border: 1px solid;
        border-radius: 10px;
    }

    .head .type .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .head .name
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 120%;

        display: flex;
        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;
        justify-content: flex-start;

        width: 100%;
        margin-top: 24px;
    }

    .head .name .logo
    {
        position: relative;

        overflow: hidden;

        width: 36px;
        min-width: 36px;
        height: 36px;

        border-radius: 50%;
    }

    .head .name .logo img
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

    .head .name .logo + *
    {
        width: 100%;
        margin-left: 8px;
    }


    .head .proposer
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-top: 8px;

        color: #555;
    }

    .head .proposer a
    {
        margin-left: 8px;

        white-space: nowrap;

        color: #950fff;
    }



    @media print, (max-width: 1359px)
    {
        .head .name
        {
            font-size: 30px;
        }
    }



    @media print, (max-width: 1023px)
    {
        .head .name .logo
        {
            width: 32px;
            min-width: 32px;
            height: 32px;
        }


        .head .name
        {
            font-size: 27px;
        }
    }



    @media print, (max-width: 767px)
    {
        .head
        {
            margin-bottom: 24px;
        }


        .head .name
        {
            font-size: 24px;

            flex-wrap: wrap;
        }


        .head .name .number + *
        {
            width: 100%;
            margin-top: 4px;
            margin-left: 0;
        }


        .head .proposer span
        {
            width: 100%;
        }

        .head .proposer a
        {
            margin-left: 0;
        }
    }



    @media print, (max-width: 479px)
    {
        .head .name
        {
            font-size: 22px;
        }


        .head .name .logo
        {
            width: 28px;
            min-width: 28px;
            height: 28px;
        }


        .head .proposer
        {
            margin-top: 12px;
        }

        .head .proposer a
        {
            display: block;
            overflow: hidden;

            width: 307px;

            text-overflow: ellipsis;
        }
    }
</style>