<template>
    <section class="account_info">
        <div class="cont">
            <div class="grid row">
                <section class="col">
                    <section class="networks">
                        <div class="title">Networks</div>

                        <div class="list">
                            <div class="network active">
                                <div class="logo">
                                    <img src="/cosmoshub_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">Cosmos Hub</div>
                                    <div class="token">ATOM</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>


                <section class="col_main">
                    <section class="main_data">
                        <div class="contract_address">
                            <div class="title">Contract address</div>

                            <div class="address">bostrom1dk0jg69lqwxt52dvnkus9ypckfs6x2el4e4h4p</div>
                        </div>

                        <div class="row">
                            <div class="charts">
                                <div class="avatar">
                                    <!-- <img :src="store.account.avatar" alt=""> -->
                                </div>
                            </div>


                            <div class="abilities">
                                <div class="title">Abilities</div>

                                <div class="items">
                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>Staking</div>
                                    </div>

                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>Swapping</div>
                                    </div>

                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>Pooling</div>
                                    </div>

                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>Bridge</div>
                                    </div>

                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>Liquid providing</div>
                                    </div>

                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>Cyber linking</div>
                                    </div>

                                    <div class="item">
                                        <div class="icon">
                                            <img src="/ic_abilities.svg" alt="">
                                        </div>
                                        <div>NFT</div>
                                    </div>
                                </div>
                            </div>


                            <div class="charts_exp">
                                <div class="item color1">Staked</div>
                                <div class="item color2">Outside</div>
                                <div class="item color3">Liquid tokens </div>
                                <div class="item color4">Not staked</div>
                                <div class="item color5">Rewards</div>
                            </div>
                        </div>
                    </section>


                    <section class="stats">
                        <div class="row">
                            <div class="item">
                                <div class="label">APR</div>
                                <div class="val">1111</div>
                            </div>

                            <div class="item">
                                <div class="label">Voting power</div>
                                <div class="val">1111</div>
                            </div>

                            <div class="item">
                                <div class="label">RPDE</div>
                                <div class="val">1111</div>
                            </div>
                        </div>
                    </section>


                    <section class="validators">
                        <div class="title">Validators</div>

                        <div class="titles">
                            <div class="col_network">Network</div>
                            <div class="col_validator">Validator</div>
                            <div class="col_percent">Percent</div>
                        </div>

                        <div class="items">
                            <div class="item">
                                <div class="col_network">
                                    <div class="logo">
                                        <img src="/cosmoshub_logo.png" alt="">
                                    </div>
                                    <div>Cosmos Hub</div>
                                </div>

                                <div class="col_validator">
                                    <div class="number"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>

                                <div class="col_percent">15%</div>
                            </div>

                            <div class="item">
                                <div class="col_network">
                                    <div class="logo">
                                        <img src="/cosmoshub_logo.png" alt="">
                                    </div>
                                    <div>Cosmos Hub</div>
                                </div>

                                <div class="col_validator">
                                    <div class="number"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>

                                <div class="col_percent">15%</div>
                            </div>

                            <div class="item">
                                <div class="col_network">
                                    <div class="logo">
                                        <img src="/cosmoshub_logo.png" alt="">
                                    </div>
                                    <div>Cosmos Hub</div>
                                </div>

                                <div class="col_validator">
                                    <div class="number"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>

                                <div class="col_percent">15%</div>
                            </div>
                        </div>

                        <button class="spoler_btn">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                        </button>
                    </section>


                    <section class="proposals">
                        <div class="head">
                            <div class="title">
                                <a href="/">Proposals ⟶</a>
                            </div>

                            <button class="create_btn">Create</button>
                        </div>

                        <div class="titles">
                            <div class="col_network">Network</div>
                            <div class="col_name">Name</div>
                            <div class="col_number"></div>
                            <div class="col_type">Type</div>
                            <div class="col_status">Status</div>
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

                                <div class="col_status">Deposit period</div>
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

                                <div class="col_status blue">Voting period</div>
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

                                <div class="col_status green">Passed</div>
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

                                <div class="col_status red">Rejected</div>
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

                                <div class="col_status white">Voting period</div>
                            </a>
                        </div>

                        <button class="spoler_btn">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                        </button>
                    </section>
                </section>


                <section class="col">
                    <section class="connected_addresses">
                        <div class="title">Connected addresses</div>

                        <div class="list">
                            <div class="item">
                                <div class="health orange"></div>

                                <div class="name">Ivan Zhigalo</div>

                                <button class="remove_btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_remove"></use></svg>
                                </button>
                            </div>

                            <div class="item">
                                <div class="health red"></div>

                                <div class="name">Valentin Prikolistov</div>

                                <button class="remove_btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_remove"></use></svg>
                                </button>
                            </div>

                            <div class="item">
                                <div class="health green"></div>

                                <div class="name">Artem Aferistov</div>

                                <button class="remove_btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_remove"></use></svg>
                                </button>
                            </div>

                            <div class="item">
                                <div class="health green"></div>

                                <div class="name">Masha Kozlova</div>

                                <button class="remove_btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_remove"></use></svg>
                                </button>
                            </div>
                        </div>

                        <button class="add_btn">
                            <span>Add address</span>
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_plus"></use></svg>
                        </button>

                        <button class="spoler_btn">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                        </button>
                    </section>
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>

</script>


<style>
    .account_info .grid
    {
        justify-content: space-between;
    }


    .account_info .col
    {
        width: 353px;
        max-width: 100%;
    }


    .account_info .col_main
    {
        width: calc(100% - 746px);
    }

    .account_info .col_main > * + *
    {
        margin-top: 24px;
    }



    .account_info .networks
    {
        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .account_info .networks .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 20px;
    }


    .account_info .networks .list > * + *
    {
        margin-top: 4px;
    }


    .account_info .networks .network
    {
        display: flex;

        padding: 10px;

        transition: background .2s linear;

        border-radius: 14px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .account_info .networks .logo
    {
        position: relative;

        overflow: hidden;

        width: 40px;
        height: 40px;

        border-radius: 50%;
    }


    .account_info .networks .logo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .account_info .networks .logo + *
    {
        width: calc(100% - 54px);
        margin-left: auto;
    }


    .account_info .networks .name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;
    }


    .account_info .networks .token
    {
        color: #555;
        font-size: 12px;
        line-height: 15px;

        margin-top: 6px;

        text-transform: uppercase;
    }


    .account_info .networks .network:hover,
    .account_info .networks .network.active
    {
        background: #141414;
    }



    .account_info .main_data
    {
        padding: 20px;

        border-radius: 20px;
        background: #0d0d0d;
    }



    .account_info .contract_address
    {
        margin-bottom: 24px;
    }


    .account_info .contract_address .title
    {
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;

        margin-bottom: 8px;
    }


    .account_info .contract_address .address
    {
        color: rgba(255,255,255,.7);
        font-size: 14px;
        line-height: 20px;

        position: relative;

        overflow: hidden;

        padding: 10px 10px 10px 30px;

        white-space: nowrap;
        text-overflow: ellipsis;

        border-radius: 10px;
        background: #141414;

        text-decoration-line: underline;
    }


    .account_info .contract_address .address:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 11px;

        display: block;

        width: 11px;
        height: 12px;
        margin: auto;

        content: '';

        background: #950fff;

        clip-path: polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%);
    }



    .account_info .charts
    {
        position: relative;

        width: 291px;
        max-width: 100%;
        height: 291px;
    }


    .account_info .avatar
    {
        position: absolute;
        z-index: 9;

        width: 203px;
        height: 203px;
        margin: auto;

        border-radius: 50%;

        inset: 0;
    }

    .account_info .avatar img
    {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;
    }



    .account_info .abilities
    {
        width: calc(100% - 307px);
        margin-left: auto;
    }


    .account_info .abilities .title
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;

        margin-bottom: 8px;
    }


    .account_info .abilities .items
    {
        display: flex;

        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }

    .account_info .abilities .items > *
    {
        width: calc(25% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .account_info .abilities .item
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        padding: 10px;

        border-radius: 10px;
        background: #141414;
    }


    .account_info .abilities .item .icon
    {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .account_info .abilities .item .icon img
    {
        display: block;

        max-width: 100%;
        height: 46px;
        max-height: 100%;
        margin-bottom: 8px;
    }



    .account_info .charts_exp
    {
        display: flex;

        margin-top: 24px;
        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .account_info .charts_exp > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .account_info .charts_exp .item
    {
        font-size: 12px;
        line-height: 100%;

        position: relative;

        padding: 8px 8px 8px 26px;

        border-radius: 10px;
        background: #141414;
    }

    .account_info .charts_exp .item:before
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 8px;

        display: block;

        width: 10px;
        height: 10px;
        margin: auto;

        content: '';

        border-radius: 50%;
    }

    .account_info .charts_exp .item.color1:before
    {
        background: #950fff;
    }

    .account_info .charts_exp .item.color2:before
    {
        background: #c5811b;
    }

    .account_info .charts_exp .item.color3:before
    {
        background: #eb5757;
    }

    .account_info .charts_exp .item.color4:before
    {
        background: #c5811b;
    }

    .account_info .charts_exp .item.color5:before
    {
        background: #1bc562;
    }



    .account_info .stats .row
    {
        margin-bottom: -20px;
        margin-left: -20px;

        align-items: stretch;
        align-content: stretch;
    }

    .account_info .stats .row > *
    {
        width: calc(33.333% - 20px);
        margin-bottom: 20px;
        margin-left: 20px;
    }


    .account_info .stats .item
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


    .account_info .stats .label
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        width: 100%;
        margin-bottom: 8px;
    }


    .account_info .stats .val
    {
        font-size: 36px;
        font-weight: 700;
        line-height: 100%;

        white-space: nowrap;
    }



    .account_info .validators
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .account_info .validators .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 16px;
    }


    .account_info .validators .col_network,
    .account_info .validators .col_validator
    {
        width: 100%;
    }

    .account_info .validators .col_percent
    {
        width: 72px;
        min-width: 72px;
    }


    .account_info .validators .titles
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        padding-bottom: 7px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: nowrap;
    }

    .account_info .validators .titles > *
    {
        padding: 8px 10px;
    }


    .account_info .validators .items
    {
        counter-reset: number;
    }

    .account_info .validators .items > * + *
    {
        margin-top: 5px;
    }

    .account_info .validators .items > * + *:before
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


    .account_info .validators .item
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        position: relative;

        display: flex;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .account_info .validators .item > *
    {
        display: flex;

        padding: 8px 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .account_info .validators .item .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .account_info .validators .item .logo img
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

    .account_info .validators .item .logo + *
    {
        width: calc(100% - 32px);
    }


    .account_info .validators .item .number
    {
        color: #484747;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;

        margin-right: 8px;

        white-space: nowrap;
    }

    .account_info .validators .item .number:before
    {
        content: counter(number) '.';
        counter-increment: number;
    }


    .account_info .validators .item .name
    {
        overflow: hidden;

        width: 100%;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .account_info .validators .spoler_btn
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


    .account_info .validators .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .account_info .validators .spoler_btn:hover
    {
        background: #950fff;
    }



    .account_info .proposals
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .account_info .proposals .col_network
    {
        width: 168px;
        min-width: 168px;
    }

    .account_info .proposals .col_name
    {
        width: 100%;
    }

    .account_info .proposals .col_number
    {
        width: 68px;
        min-width: 68px;
    }

    .account_info .proposals .col_type
    {
        width: 60px;
        min-width: 60px;
    }

    .account_info .proposals .col_status
    {
        width: 140px;
        min-width: 140px;
    }


    .account_info .proposals .head
    {
        display: flex;

        margin-bottom: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .account_info .proposals .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;
    }


    .account_info .proposals .title a
    {
        color: currentColor;

        display: flex;

        text-decoration: none;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .account_info .proposals .create_btn
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

    .account_info .proposals .create_btn:hover
    {
        background: #7700e1;
    }


    .account_info .proposals .titles
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

    .account_info .proposals .titles > *
    {
        padding: 8px 10px;
    }


    .account_info .proposals .items > * + *
    {
        margin-top: 5px;
    }

    .account_info .proposals .items > * + *:before
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


    .account_info .proposals .item
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

    .account_info .proposals .item > *
    {
        display: flex;

        padding: 8px 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .account_info .proposals .item .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .account_info .proposals .item .logo img
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

    .account_info .proposals .item .logo + *
    {
        width: calc(100% - 32px);
    }


    .account_info .proposals .item .name
    {
        overflow: hidden;

        width: 100%;

        text-overflow: ellipsis;
    }


    .account_info .proposals .item .col_number
    {
        color: #484747;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;

        white-space: nowrap;
    }


    .account_info .proposals .item .col_type .icon
    {
        color: #950fff;

        display: block;

        width: 20px;
        height: 20px;
    }


    .account_info .proposals .item .col_status
    {
        color: #464646;
    }

    .account_info .proposals .item .col_status.blue
    {
        color: #0343e8;
    }

    .account_info .proposals .item .col_status.green
    {
        color: #1bc562;
    }

    .account_info .proposals .item .col_status.red
    {
        color: #eb5757;
    }

    .account_info .proposals .item .col_status.white
    {
        color: #fff;
    }


    .account_info .proposals .item:hover
    {
        background: #191919;
    }


    .account_info .proposals .spoler_btn
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


    .account_info .proposals .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .account_info .proposals .spoler_btn:hover
    {
        background: #950fff;
    }



    .account_info .connected_addresses
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .account_info .connected_addresses .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 20px;
    }


    .account_info .connected_addresses .list > * + *
    {
        margin-top: 8px;
    }


    .account_info .connected_addresses .item
    {
        display: flex;

        padding: 10px;

        border-radius: 14px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .account_info .connected_addresses .health
    {
        width: 14px;
        height: 16px;
        margin-right: 9px;
        margin-left: 1px;

        clip-path: polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%);
    }

    .account_info .connected_addresses .health.orange
    {
        background: linear-gradient(180deg, #ff650f 0%, rgba(96, 24, 2, .3) 100%);
    }

    .account_info .connected_addresses .health.red
    {
        background: linear-gradient(180deg, #ff0f0f 0%, rgba(87, 0, 0, .3) 100%);
    }

    .account_info .connected_addresses .health.green
    {
        background: linear-gradient(180deg, #5cff0f 0%, rgba(0, 47, 5, .3) 100%);
    }


    .account_info .connected_addresses .name
    {
        color: rgba(255,255,255,.7);
        font-size: 14px;
        line-height: 20px;

        width: calc(100% - 48px);

        text-decoration: underline;
    }


    .account_info .connected_addresses .remove_btn
    {
        color: #555;

        display: flex;

        width: 16px;
        height: 16px;
        margin-left: auto;

        transition: color .2s linear;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .account_info .connected_addresses .remove_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }

    .account_info .connected_addresses .remove_btn:hover
    {
        color: #950fff;
    }


    .account_info .connected_addresses .add_btn
    {
        font-size: 14px;
        line-height: 110%;

        display: flex;

        width: 100%;
        margin-top: 16px;
        padding: 8px;

        transition: background .2s linear;

        border-radius: 10px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .account_info .connected_addresses .add_btn .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-left: 8px;
    }

    .account_info .connected_addresses .add_btn:hover
    {
        background: #7700e1;
    }


    .account_info .connected_addresses .spoler_btn
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


    .account_info .connected_addresses .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .account_info .connected_addresses .spoler_btn:hover
    {
        background: #950fff;
    }



    @media print, (max-width: 1899px)
    {
        .account_info .abilities .items > *
        {
            width: calc(33.333% - 8px);
        }



        .account_info .proposals .col_network
        {
            width: 148px;
            min-width: 148px;
        }

        .account_info .proposals .col_number
        {
            width: 56px;
            min-width: 56px;
        }

        .account_info .proposals .col_type
        {
            width: 52px;
            min-width: 52px;
        }

        .account_info .proposals .col_status
        {
            width: 124px;
            min-width: 124px;
        }
    }

</style>