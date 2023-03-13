<template>
    <section class="stats">
        <div class="row">
            <div class="item">
                <div class="label">{{ $t('message.account_APR') }}</div>
                <div class="val">1111</div>
            </div>

            <div class="item">
                <div class="label">{{ $t('message.account_voting_power') }}</div>
                <div class="val">1111</div>
            </div>

            <div class="item">
                <div class="label">{{ $t('message.account_RPDE') }}</div>
                <div class="val">1111</div>
            </div>
        </div>
    </section>
</template>


<style scoped>
    .stats .row
    {
        margin-bottom: -20px;
        margin-left: -20px;

        align-items: stretch;
        align-content: stretch;
    }

    .stats .row > *
    {
        width: calc(33.333% - 20px);
        margin-bottom: 20px;
        margin-left: 20px;
    }


    .stats .item
    {
        display: flex;

        padding: 16px;

        text-align: center;

        border-radius: 20px;
        background: #0d0d0d;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .stats .label
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        width: 100%;
        margin-bottom: 8px;
    }


    .stats .val
    {
        font-size: 36px;
        font-weight: 700;
        line-height: 100%;

        white-space: nowrap;
    }

</style>