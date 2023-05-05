<template>
    <section class="proposal_info">
        <div class="cont middle">
            <div class="back_btn">
                <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/proposals/all'" class="btn">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_arrow_hor"></use></svg>
                </router-link>
            </div>

            <div class="row">
                <div class="data">
                    <div class="head">
                        <div class="status green">
                            <svg class="icon"><use xlink:href="/sprite.svg#ic_status_passed"></use></svg>
                            <span>Passed</span>
                        </div>

                        <div class="type">
                            <svg class="icon"><use :xlink:href="`/sprite.svg#ic_proposal_Text`"></use></svg>
                            <span>Text</span>
                        </div>

                        <div class="name">
                            <div class="logo">
                                <img src="/juno_logo.png" alt="">
                            </div>

                            <div class="number">#271</div>

                            <div>CORRECTED: Make JUNO Carbon Neutral by Purchasing </div>
                        </div>

                        <div class="proposer">
                            <div>Eco-Credits</div>

                            <div class="address">
                                <span>Proposer:</span>
                                <a href="/" target="_blank" rel="noopener nofollow">juno13zsvgc24x5rg5ey06ext4rfu4huq0e9v5stf59</a>
                            </div>
                        </div>
                    </div>

                    <div class="tabs">
                        <div class="row">
                            <button class="btn active">Proposal data</button>
                            <button class="btn">Votes</button>
                        </div>
                    </div>

                    <div>
                        <div class="description">

                        </div>
                    </div>
                </div>

                <div class="info">
                    <div class="sticky">
                        <div class="current_vote">
                            <div class="label">Your current vote:</div>

                            <div class="val green">Yes</div>
                        </div>

                        <div class="vote">
                            <button class="btn green">Yes</button>
                            <button class="btn yellow">No</button>
                            <button class="btn red">No with veto</button>
                            <button class="btn grey">Abstain</button>
                        </div>

                        <div class="details">
                            <div class="title">Proposal Details</div>

                            <div class="row">
                                <div class="item">
                                    <div class="label">Voting Time</div>
                                    <div class="val">3D:12H:22M:54S</div>
                                </div>

                                <div class="item">
                                    <div class="label">Submit Time</div>
                                    <div class="val">2D:5H:22M:54S</div>
                                </div>

                                <div class="item">
                                    <div class="label">Total Deposit</div>
                                    <div class="val">1,060 JUNO</div>
                                </div>

                                <div class="item">
                                    <div class="label">Initial Deposit</div>
                                    <div class="val">200 JUNO</div>
                                </div>
                            </div>
                        </div>

                        <div class="vote_info">
                            <div class="head">
                                <div class="title">Vote details</div>

                                <button class="refresh_btn">
                                    <svg class="icon"><use xlink:href="/sprite.svg#ic_refresh"></use></svg>
                                    <span>Refresh</span>
                                </button>
                            </div>

                            <div class="chart">

                            </div>

                            <div class="row">
                                <div class="turnout">Turnout: 34%</div>

                                <div class="total">Total Vote: 45</div>
                            </div>

                            <div class="exp">Minimum of staked 80,606,158.088430 ATOM (40%) need to vote for this proposal to pass</div>
                        </div>

                        <div class="vote_result">
                            <div class="row">
                                <div class="item">
                                    <div class="val green">Yes 34%</div>

                                    <div class="tokens_count">60,735,207.69 ATOM</div>

                                    <div class="votes_count">12,000 votes</div>
                                </div>

                                <div class="item">
                                    <div class="val yellow">no 37.16%</div>

                                    <div class="tokens_count">60,735,207.69 ATOM</div>

                                    <div class="votes_count">12,000 votes</div>
                                </div>

                                <div class="item">
                                    <div class="val red">nwv 0.17%</div>

                                    <div class="tokens_count">60,735,207.69 ATOM</div>

                                    <div class="votes_count">12,000 votes</div>
                                </div>

                                <div class="item">
                                    <div class="val">abstain 26.73%</div>

                                    <div class="tokens_count">60,735,207.69 ATOM</div>

                                    <div class="votes_count">12,000 votes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import hcSticky from 'hc-sticky'

    const router = useRouter()


    onMounted(async () => {
        // Sticky element
        let stickyElements = document.querySelectorAll('.sticky')

        stickyElements.forEach(el => new hcSticky(el, { top: 118 }))
    })
</script>


<style scoped>
    .back_btn
    {
        margin-bottom: 20px;
    }


    .back_btn .btn
    {
        color: currentColor;

        display: flex;

        width: 36px;
        height: 36px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
    }


    .back_btn .btn:hover
    {
        background: #950fff;
    }



    .data
    {
        width: calc(100% - 373px);
        padding: 32px;

        border-radius: 30px;
        background: #0d0d0d;
    }


    .data .head
    {
        display: flex;

        margin-bottom: 32px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .data .head .status
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;

        padding: 7px 5px;

        border: 1px solid;
        border-radius: 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .data .head .status.green
    {
        color: #1bc562;

        background: rgba(27, 197, 98, .05);
    }

    .data .head .status .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .data .head .type
    {
        font-size: 12px;
        line-height: 130%;

        display: flex;

        margin-left: 8px;
        padding: 7px 5px;

        border: 1px solid;
        border-radius: 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .data .head .type .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .data .head .name
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 120%;

        display: flex;

        width: 100%;
        margin-top: 24px;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: nowrap;
    }

    .data .head .name .logo
    {
        position: relative;

        overflow: hidden;

        width: 36px;
        min-width: 36px;
        height: 36px;

        border-radius: 50%;
    }

    .data .head .name .logo img
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

    .data .head .name .number
    {
        margin-left: 8px;

        white-space: nowrap;
    }

    .data .head .name .number + *
    {
        width: 100%;
        margin-left: 8px;
    }


    .data .head .proposer
    {
        font-size: 32px;
        font-weight: 500;
        line-height: 120%;

        margin-top: 8px;
    }

    .data .head .proposer .address
    {
        color: #555;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: flex;

        margin-top: 8px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .data .head .proposer .address a
    {
        color: #950fff;

        margin-left: 8px;

        white-space: nowrap;
    }


    .data .tabs
    {
        margin-bottom: 32px;
        padding-bottom: 32px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }


    .data .tabs .row
    {
        display: flex;

        margin-left: -8px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .data .tabs .btn
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        min-width: 109px;
        margin-left: 8px;
        padding: 7px;

        transition: .2s linear;

        border: 1px solid ;
        border-radius: 10px;
    }

    .data .tabs .btn:hover,
    .data .tabs .btn.active
    {
        color: #000;

        border-color: #fff;
        background: #fff;
    }


    .data .description
    {
        padding: 16px;

        border-radius: 10px;
        background: #191919;
    }


    .info
    {
        width: 353px;
        max-width: 100%;
        margin-left: auto;
        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .info .current_vote
    {
        font-weight: 500;
        line-height: 100%;

        display: flex;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .current_vote .green
    {
        color: #1bc562;
    }


    .info .vote
    {
        display: flex;

        margin-top: 16px;
        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }


    .info .vote .btn
    {
        font-size: 14px;
        line-height: 100%;

        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
        padding: 8px;

        transition: background .2s linear;

        border-radius: 10px;
        background: #353535;
    }

    .info .vote .btn.green
    {
        background: #1bc562;
    }

    .info .vote .btn.yellow
    {
        background: #c5811b;
    }

    .info .vote .btn.red
    {
        background: #eb5757;
    }


    .info .details
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .info .details .title
    {
        font-weight: 500;
        line-height: 100%;

        margin-bottom: 16px;
    }


    .info .details .row
    {
        margin-bottom: -8px;
        margin-left: -8px;

        align-items: stretch;
        align-content: stretch;
    }

    .info .details .row > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .info .details .item
    {
        min-height: 81px;
        padding: 8px;

        border-radius: 10px;
        background: #191919;
    }


    .info .details .label
    {
        color: #555;
        font-size: 12px;
        line-height: 100%;

        margin-bottom: 8px;
    }


    .info .details .val
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 110%;
    }


    .info .vote_info
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    .info .vote_info .head
    {
        display: flex;

        margin-bottom: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .info .vote_info .title
    {
        font-weight: 500;
        line-height: 100%;
    }


    .info .vote_info .chart
    {
        position: relative;

        width: 200px;
        height: 200px;
        margin: 0 auto 16px;
    }


    .info .vote_info .turnout
    {
        color: #eb5757;
        font-size: 12px;
        line-height: 15px;

        padding: 7px;

        border: 1px solid;
        border-radius: 8px;
    }


    .info .vote_info .total
    {
        color: #950fff;
        font-size: 12px;
        line-height: 15px;

        margin-left: auto;
        padding: 7px;

        border: 1px solid;
        border-radius: 8px;
    }


    .info .vote_info .exp
    {
        color: #555;
        font-size: 12px;
        line-height: 15px;

        margin-top: 8px;
    }


    .info .vote_info .refresh_btn
    {
        color: #950fff;
        font-size: 14px;
        line-height: 20px;

        display: flex;

        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .info .vote_info .refresh_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 6px;
    }


    .info .vote_result
    {
        margin-top: 16px;
        padding-top: 16px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }






    .info .vote_result .row
    {
        margin-bottom: -8px;
        margin-left: -8px;

        align-items: stretch;
        align-content: stretch;
    }

    .info .vote_result .row > *
    {
        width: calc(50% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .info .vote_result .item
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        padding: 8px;

        border-radius: 10px;
        background: #191919;
    }

    .info .vote_result .item > * + *
    {
        margin-top: 8px;
    }


    .info .vote_result .item .val
    {
        font-size: 16px;
        font-weight: 500;

        text-transform: uppercase;
    }

    .info .vote_result .item .green
    {
        color: #1bc562;
    }

    .info .vote_result .item .yellow
    {
        color: #c5811b;
    }

    .info .vote_result .item .red
    {
        color: #eb5757;
    }

</style>