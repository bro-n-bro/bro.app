<template>
    <section class="dashboard">
        <div class="cont">
            <div class="row">
                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/evmos_logo.png" alt="">
                    </div>

                    <div>Evmos</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/juno_logo.png" alt="">
                    </div>

                    <div>Juno</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/cosmos_logo.png" alt="">
                    </div>

                    <div>Cosmos</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/bostrom_logo.png" alt="">
                    </div>

                    <div>Bostrom</div>

                    <div class="shadow grey"></div>
                </div>
            </div>


            <div class="row">
                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/e-money_logo.png" alt="">
                    </div>

                    <div>E-money</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/desmos_logo.png" alt="">
                    </div>

                    <div>Desmos</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="account">
                    <button class="connect_wallet_btn" @click.prevent="emitter.emit('connectWallet')" v-if="!store.auth">
                        {{ $t('message.connect_wallet') }}
                    </button>

                    <template v-else>
                        <div class="user_name">{{ store.userName }}</div>

                        <div class="balance">0.1000 {{ store.currency }}</div>

                        <div class="stats">
                            <div>
                                <div class="label">RPDE</div>
                                <div class="val">0</div>
                            </div>

                            <div>
                                <div class="label">Personal APR</div>
                                <div class="val">0%</div>
                            </div>
                        </div>

                        <a href="/" class="details_btn">Details</a>
                    </template>

                    <div class="shadow"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/osmosis_logo.png" alt="">
                    </div>

                    <div>Osmosis</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/crescent_logo.png" alt="">
                    </div>

                    <div>Crescent hub</div>

                    <div class="shadow grey"></div>
                </div>
            </div>


            <div class="row">
                <div class="network hidden"></div>

                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/g-bridge_logo.png" alt="">
                    </div>

                    <div>G-Bridge</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/stargaze_logo.png" alt="">
                    </div>

                    <div>Stargaze</div>

                    <div class="shadow grey"></div>
                </div>


                <div class="network empty">
                    <div class="logo">
                        <img src="../assets/images/omniflix_logo.png" alt="">
                    </div>

                    <div>Omniflix hub</div>

                    <div class="shadow grey"></div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const emitter = inject('emitter'),
          store = useGlobalStore()
</script>


<style scoped>
.dashboard
{
    padding-bottom: 24px;
}


.dashboard .row
{
    margin-bottom: -7px;
    margin-left: -7px;

    justify-content: center;
}

.dashboard .row + .row
{
    margin-top: -82px;
}


.dashboard .row > *
{
    width: calc(20% - 7px);
    margin-bottom: 7px;
    margin-left: 7px;
}


.dashboard .row > *
{
    color: #fff;

    position: relative;
    z-index: 3;

    display: flex;
    flex-direction: column;

    width: 280px;
    height: 324px;
    padding: 40px 38px 52px;

    pointer-events: none;
}

.dashboard .row > *:before
{
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 100%;

    content: '';

    background: #141414;

    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}


.dashboard .shadow
{
    position: absolute;
    z-index: -2;
    top: -3px;
    left: -3px;

    display: block;

    width: calc(100% + 6px);
    height: calc(100% + 6px);

    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}


.dashboard .shadow:after
{
    position: absolute;
    top: -24px;
    left: -24px;

    display: block;

    width: calc(100% + 48px);
    height: calc(100% + 48px);

    content: '';
    -webkit-animation: spin 3s linear infinite;
       -moz-animation: spin 3s linear infinite;
            animation: spin 3s linear infinite;
}

.dashboard .row > *:nth-child(2) .shadow:after
{
    animation-duration: .5s;
}

.dashboard .row > *:nth-child(3) .shadow:after
{
    animation-duration: 4s;
}

.dashboard .row > *:nth-child(4) .shadow:after
{
    animation-duration: 8s;
}

.dashboard .shadow.green:after
{
    background:    -moz-linear-gradient(top, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
    background: -webkit-linear-gradient(top, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
    background:         linear-gradient(to bottom, rgba(92, 255, 15, 1) 0%, rgba(0, 47, 5, .3) 100%);
}

.dashboard .shadow.orange:after
{
    background:    -moz-linear-gradient(top, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
    background: -webkit-linear-gradient(top, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
    background:         linear-gradient(to bottom, rgba(255, 101, 15, 1) 0%, rgba(96, 24, 2, .3) 100%);
}

.dashboard .shadow.red:after
{
    background:    -moz-linear-gradient(top, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
    background: -webkit-linear-gradient(top, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
    background:         linear-gradient(to bottom, rgba(255, 15, 15, 1) 0%, rgba(87, 0, 0, .3) 100%);
}

.dashboard .shadow.grey:after
{
    background: #212121;
}


.dashboard .head
{
    display: flex;

    width: 100%;
    margin-bottom: 20px;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


.dashboard .logo
{
    display: flex;

    width: 30px;
    height: 30px;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


.dashboard .logo img
{
    display: block;

    max-width: 100%;
    max-height: 100%;
}


.dashboard .name
{
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;

    max-width: calc(100% - 40px);
    margin-left: 10px;
}


.dashboard .tokens
{
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;

    margin-bottom: 10px;

    text-align: center;
    white-space: nowrap;

    font-feature-settings: 'pnum' on, 'lnum' on;
}


.dashboard .progress
{
    height: 13px;
    margin-bottom: 12px;

    border-radius: 20px;
    background: #0b2272;
}

.dashboard .progress .bar
{
    height: 13px;

    border-radius: 20px;
    background: #4075fd;
}


.dashboard .stats
{
    font-size: 12px;
    line-height: 15px;

    width: 100%;
    margin-bottom: 20px;
}


.dashboard .stats > *
{
    display: flex;

    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
}

.dashboard .stats > * + *
{
    margin-top: 7px;
    padding-top: 6px;

    border-top: 1px solid rgba(255, 255, 255, .05);
}


.dashboard .stats .label
{
    position: relative;

    margin-right: 10px;
}


.dashboard .stats .val
{
    font-weight: 500;
}


.dashboard .details_btn,
.dashboard .delegate_btn
{
    color: currentColor;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;

    display: block;

    margin: auto auto 0;
    padding: 9px 29px 10px;

    transition: .2s linear;
    text-decoration: none;
    pointer-events: auto;

    border: 1px solid #353535;
    border-radius: 40px;
}

.dashboard .delegate_btn,
.dashboard .details_btn:hover
{
    color: #fff;

    border-color: #950fff;
    background: #950fff;
}



.dashboard .network.empty
{
    color: #464646;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;

    flex-direction: row;

    text-align: center;

    align-items: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
}


.dashboard .network.empty .logo
{
    position: relative;

    display: flex;

    width: 60px;
    height: 60px;
    margin: 0 auto 10px;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}

.dashboard .network.empty .logo + div
{
    width: 100%;
}

.dashboard .network.empty .logo img
{
    display: block;

    max-width: 100%;
    max-height: 100%;

    border-radius: 50%;
}

.dashboard .network.empty .logo:after
{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 100%;

    content: '';

    border-radius: 50%;
    background: rgba(20, 20, 20, .8);
}



.dashboard .network.hidden:before
{
    display: none;
}



.dashboard .row > *.disabled
{
    color: #464646;
}

.dashboard .disabled .logo:after
{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 100%;

    content: '';

    opacity: .8;
    border-radius: inherit;
    background: #141414;
}

.dashboard .disabled .progress,
.dashboard .disabled .progress .bar
{
    background: #282828;
}



.dashboard .row > *.account:before
{
    background: #3c0666;
}


.dashboard .account
{
    position: relative;
}


.dashboard .account .user_name
{
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;

    overflow: hidden;

    width: 102px;
    margin: 0 auto 20px;

    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
}


.dashboard .account .balance
{
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;

    margin-bottom: 18px;

    text-align: center;

    font-feature-settings: 'pnum' on, 'lnum' on;
}


.dashboard .account .connect_wallet_btn
{
    color: #000;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: block;

    width: 128px;
    height: 35px;
    margin: auto;

    transition: .2s linear;
    pointer-events: auto;

    border-radius: 50px;
    background: #fff;
}

.dashboard .account .connect_wallet_btn:hover
{
    color: #fff;

    background: #950fff;
}


.dashboard .account .shadow:after
{
    background: #950fff;
}
</style>
