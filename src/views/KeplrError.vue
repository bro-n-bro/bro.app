<template>
    <section class="wallet_error">
        <div class="cont">
            <img src="../assets/images/wallet_error.svg" alt="" class="img">

            <div class="title" v-html="$t('message.keplr_error_title')"></div>

            <div class="link">
                <a href="https://www.keplr.app/download" target="_blank" rel="noopener nofollow">
                    <img src="../assets/images/keplr_logo.png" alt="" class="icon">
                    <span>{{ $t('message.keplr_install_btn') }}</span>
                </a>
            </div>
        </div>
    </section>
</template>


<style>
.wallet_error
{
    display: flex;

    padding-bottom: 100px;

    text-align: center;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    flex: 1 0 auto;
}


.wallet_error .img
{
    display: block;

    max-width: 50%;
    margin: 0 auto 20px;
}


.wallet_error .title
{
    color: #fff;
    font-size: 52px;
    font-weight: 600;
    line-height: 63px;
}


.wallet_error .link
{
    display: flex;

    margin-top: 40px;

    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
}


.wallet_error .link a
{
    color: #fff;
    font-weight: 600;
    line-height: 19px;

    display: flex;

    margin: 0 auto;
    padding: 13px 30px;

    text-decoration: none;

    border-radius: 20px;
    background: #950fff;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


.wallet_error .link a .icon
{
    display: block;

    width: 27px;
    height: 27px;
    margin-right: 6px;
}

</style>