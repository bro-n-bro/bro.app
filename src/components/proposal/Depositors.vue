<template>
    <div class="depositors">
        <div class="title">
            {{ $t('message.proposal_depositors_title') }}
        </div>

        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th>{{ $t('message.proposal_depositors_th_depositor') }}</th>
                        <th>{{ $t('message.proposal_depositors_th_tx_hash') }}</th>
                        <th>{{ $t('message.proposal_depositors_th_amount') }}</th>
                        <th>{{ $t('message.proposal_depositors_th_time') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(depositor, index) in props.depositors" :key="index">
                        <td class="depositor">{{ depositor.depositor_address.slice(0, 8) + '...' + depositor.depositor_address.slice(-8) }}</td>

                        <td class="tx_hash">
                            <a :href="`https://www.mintscan.io/${store.networks[props.proposal.network].mintscanAlias}/txs/${depositor.tx_hash}`" target="_blank" rel="noopener nofollow">
                                <span>{{ depositor.tx_hash }}</span>
                            </a>
                        </td>

                        <td class="amount">
                            {{ parseInt($filters.toFixed(depositor.coins[0].amount / Math.pow(10, depositor.coins[0].exponent), 6)) }}.<small>{{ $filters.toFixed(depositor.coins[0].amount / Math.pow(10, depositor.coins[0].exponent), 6).split('.')[1] }}</small>
                            {{ store.networks[props.proposal.network].token_name }}
                        </td>

                        <td class="date">
                            <div class="ago">
                                <timeago :datetime="dateCalc(depositor.timestamp)" autoUpdate />
                            </div>

                            <div>({{ depositor.timestamp }})</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- <pre>{{ props.depositors }}</pre> -->
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const props = defineProps(['depositors', 'proposal']),
        store = useGlobalStore(),
        userTimeZone = new Date().getTimezoneOffset() / 60 * -1


    // Date calc
    function dateCalc(date) {
        let currentDate = new Date(date)

        return new Date(currentDate.setHours(currentDate.getHours() + userTimeZone))
    }
</script>


<style scoped>
    .title
    {
        font-weight: 500;
        line-height: 100%;

        margin-bottom: 16px;
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

        text-align: left;
        vertical-align: middle;
    }

    table th:last-child
    {
        text-align: right;
    }


    table td
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        padding: 5px 8px;

        text-align: left;
        vertical-align: middle;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }

    table td:last-child
    {
        text-align: right;
    }


    table td.depositor
    {
        width: 320px;

        table-layout: fixed;

        white-space: nowrap;
    }


    table td.tx_hash a
    {
        color: currentColor;

        transition: color .2s linear;
        text-decoration: none;
    }

    table td.tx_hash a:hover
    {
        color: #950fff;
    }


    table td.tx_hash span
    {
        display: block;
        overflow: hidden;

        width: 300px;
        max-width: 100%;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    table td.amount
    {
        font-weight: 400;

        width: 172px;

        table-layout: fixed;

        white-space: nowrap;
    }

    table td.amount small
    {
        font-size: 12px;
        line-height: 15px;
    }


    table td.date
    {
        color: #555;
        font-size: 12px;
        font-weight: 400;
        line-height: 100%;

        width: 216px;

        table-layout: fixed;

        white-space: nowrap;
    }

    table td.date .ago
    {
        color: #fff;
        font-size: 14px;
        line-height: 100%;

        margin-bottom: 6px;
    }

</style>