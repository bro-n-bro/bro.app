<template>
    <footer>
        <div class="cont row">
            <div class="text">
                <span>{{ $t('message.footer_contact') }}</span>
                <img src="/ic_and.svg" alt="">
                <span>{{ $t('message.footer_support') }}</span>
            </div>

            <div class="socials">
                <a href="https://github.com/bro-n-bro" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_social_github"></use></svg>
                </a>

                <a href="https://t.me/bro_n_bro_community" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_social_telegram"></use></svg>
                </a>

                <a href="https://twitter.com/Bro_n_Bro" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_social_twitter"></use></svg>
                </a>

                <a href="https://keybase.io/bro_n_bro" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_social_keybase"></use></svg>
                </a>

                <a href="https://cyb.ai/network/bostrom/contract/bostrom1ndwqfv2skglrmsqu4wlneepthyrquf9r7sx6r0" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="/sprite.svg#ic_social_cyb"></use></svg>
                </a>
            </div>
        </div>
    </footer>
</template>


<style scoped>
    footer
    {
        margin-top: 60px;
        padding: 20px 0 40px;

        border-top: 1px solid rgba(255, 255, 255, .1);
    }


    footer .text
    {
        font-size: 18px;
        line-height: 22px;

        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    footer .text > * + *
    {
        margin-left: 10px;
    }


    footer .text img
    {
        display: block;
    }



    footer .socials
    {
        display: flex;

        margin-right: 100px;
        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    footer .socials a
    {
        color: currentColor;

        display: block;

        transition: color .2s linear;
        text-decoration: none;
    }

    footer .socials a + a
    {
        margin-left: 10px;
    }


    footer .socials .icon
    {
        display: block;

        width: 28px;
        height: 28px;
    }


    footer .socials a:hover
    {
        color: #950fff;
    }


    footer .socials a:active
    {
        color: #7700e1;
    }

</style>