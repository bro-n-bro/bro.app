<template>
    <section class="proposals">
        <div class="head">
            <div class="title">
                <a href="/">{{ $t('message.account_proposals_title') }}</a>
            </div>

            <button class="create_btn">
                {{ $t('message.create_btn') }}
            </button>
        </div>

        <div class="titles">
            <div class="col_network">
                {{ $t('message.account_proposals_col_network') }}
            </div>

            <div class="col_name">
                {{ $t('message.account_proposals_col_name') }}
            </div>

            <div class="col_number"></div>

            <div class="col_type">
                {{ $t('message.account_proposals_col_type') }}
            </div>

            <div class="col_status">
                {{ $t('message.account_proposals_col_status') }}
            </div>
        </div>

        <div class="items">
            <a href="/" class="item">
                <div class="col_network">
                    <div class="logo">
                        <img src="/cosmoshub_logo.png" alt="">
                    </div>
                    <div>Cosmos Hub</div>
                </div>

                <div class="col_name">
                    <div class="name">Interchain Info Funding</div>
                </div>

                <div class="col_number">№343</div>

                <div class="col_type">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_proposal_CommunityPoolSpend"></use></svg>
                </div>

                <div class="col_status">
                    {{ $t('message.account_proposals_status_deposite') }}
                </div>
            </a>

            <a href="/" class="item">
                <div class="col_network">
                    <div class="logo">
                        <img src="/cosmoshub_logo.png" alt="">
                    </div>
                    <div>Cosmos Hub</div>
                </div>

                <div class="col_name">
                    <div class="name">v9-Lambda</div>
                </div>

                <div class="col_number">№343</div>

                <div class="col_type">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_proposal_ParameterChange"></use></svg>
                </div>

                <div class="col_status blue">
                    {{ $t('message.account_proposals_status_voting') }}
                </div>
            </a>

            <a href="/" class="item">
                <div class="col_network">
                    <div class="logo">
                        <img src="/cosmoshub_logo.png" alt="">
                    </div>
                    <div>Cosmos Hub</div>
                </div>

                <div class="col_name">
                    <div class="name">Spacebox - Tool for chain Indexation and Storage in the Cosmos Hub</div>
                </div>

                <div class="col_number">№343</div>

                <div class="col_type">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_proposal_UpdateSmartContract"></use></svg>
                </div>

                <div class="col_status green">
                    {{ $t('message.account_proposals_status_passed') }}
                </div>
            </a>

            <a href="/" class="item">
                <div class="col_network">
                    <div class="logo">
                        <img src="/cosmoshub_logo.png" alt="">
                    </div>
                    <div>Cosmos Hub</div>
                </div>

                <div class="col_name">
                    <div class="name">Fund notional to work on the Cosmos Hub</div>
                </div>

                <div class="col_number">№343</div>

                <div class="col_type">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_proposal_SoftwareUpgrade"></use></svg>
                </div>

                <div class="col_status red">
                    {{ $t('message.account_proposals_status_rejected') }}
                </div>
            </a>

            <a href="/" class="item">
                <div class="col_network">
                    <div class="logo">
                        <img src="/cosmoshub_logo.png" alt="">
                    </div>
                    <div>Cosmos Hub</div>
                </div>

                <div class="col_name">
                    <div class="name">Fund notional to work on the Cosmos Hub</div>
                </div>

                <div class="col_number">№343</div>

                <div class="col_type">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_proposal_Text"></use></svg>
                </div>

                <div class="col_status white">
                    {{ $t('message.account_proposals_status_voting') }}
                </div>
            </a>
        </div>

        <button class="spoler_btn">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>
    </section>
</template>


<style scoped>
    .proposals
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .proposals .col_network
    {
        width: 168px;
        min-width: 168px;
    }

    .proposals .col_name
    {
        width: 100%;
    }

    .proposals .col_number
    {
        width: 68px;
        min-width: 68px;
    }

    .proposals .col_type
    {
        width: 60px;
        min-width: 60px;
    }

    .proposals .col_status
    {
        width: 140px;
        min-width: 140px;
    }


    .proposals .head
    {
        display: flex;

        margin-bottom: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .proposals .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;
    }


    .proposals .title a
    {
        color: currentColor;

        display: flex;

        text-decoration: none;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .proposals .create_btn
    {
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;

        margin-left: auto;
        padding: 14px 20px;

        transition: background .2s linear;

        border-radius: 16px;
        background: #950fff;
    }

    .proposals .create_btn:hover
    {
        background: #7700e1;
    }


    .proposals .titles
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        margin-bottom: 8px;
        padding-bottom: 7px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: nowrap;
    }

    .proposals .titles > *
    {
        padding: 8px 10px;
    }


    .proposals .items > * + *
    {
        margin-top: 5px;
    }

    .proposals .items > * + *:before
    {
        position: absolute;
        top: -3px;
        left: 0;

        display: block;

        width: 100%;
        height: 1px;

        content: '';
        pointer-events: none;

        background: rgba(255, 255, 255, .05);
    }


    .proposals .item
    {
        color: currentColor;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        position: relative;

        display: flex;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 8px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .proposals .item > *
    {
        display: flex;

        padding: 8px 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .proposals .item .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .proposals .item .logo img
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

    .proposals .item .logo + *
    {
        width: calc(100% - 32px);
    }


    .proposals .item .name
    {
        overflow: hidden;

        width: 100%;

        text-overflow: ellipsis;
    }


    .proposals .item .col_number
    {
        color: #484747;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;

        white-space: nowrap;
    }


    .proposals .item .col_type .icon
    {
        color: #950fff;

        display: block;

        width: 20px;
        height: 20px;
    }


    .proposals .item .col_status
    {
        color: #464646;
    }

    .proposals .item .col_status.blue
    {
        color: #0343e8;
    }

    .proposals .item .col_status.green
    {
        color: #1bc562;
    }

    .proposals .item .col_status.red
    {
        color: #eb5757;
    }

    .proposals .item .col_status.white
    {
        color: #fff;
    }


    .proposals .item:hover
    {
        background: #191919;
    }


    .proposals .spoler_btn
    {
        position: absolute;
        right: 0;
        bottom: -18px;
        left: 0;

        display: flex;

        width: 36px;
        height: 36px;
        margin: auto;

        transition: background .2s linear;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .proposals .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .proposals .spoler_btn:hover
    {
        background: #950fff;
    }



    @media print, (max-width: 1899px)
    {
        .proposals .col_network
        {
            width: 148px;
            min-width: 148px;
        }

        .proposals .col_number
        {
            width: 56px;
            min-width: 56px;
        }

        .proposals .col_type
        {
            width: 52px;
            min-width: 52px;
        }

        .proposals .col_status
        {
            width: 124px;
            min-width: 124px;
        }
    }

</style>