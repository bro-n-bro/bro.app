<template>
    <footer>
        <div class="cont row">
            <div class="text">
                <span>{{ $t('message.footer_contact') }}</span>

                <img src="@/assets/ic_and.svg" alt="">

                <span>{{ $t('message.footer_support') }}</span>
            </div>


            <a href="https://github.com/bro-n-bro/spacebox" target="_blank" rel="noopener nofollow" class="powered">
                <img src="@/assets/spacebox_logo.svg" alt="">
                <span>{{ $t('message.footer_powered') }}</span>
            </a>


            <div class="socials">
                <a href="https://github.com/bro-n-bro" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_social_github"></use></svg>
                </a>

                <a href="https://t.me/bro_n_bro_community" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_social_telegram"></use></svg>
                </a>

                <a href="https://twitter.com/Bro_n_Bro" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_social_twitter"></use></svg>
                </a>

                <a href="https://keybase.io/bronbroio" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_social_keybase"></use></svg>
                </a>

                <a href="https://cyb.ai/network/bostrom/contract/bostrom1ndwqfv2skglrmsqu4wlneepthyrquf9r7sx6r0" target="_blank" rel="noopener nofollow">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_social_cyb"></use></svg>
                </a>
            </div>
        </div>
    </footer>
</template>


<style scoped>
    footer
    {
        margin-top: 60px;
        padding: 23px 0 24px;

        border-top: 1px solid rgba(255, 255, 255, .1);
    }


    footer .text
    {
        font-size: 18px;
        line-height: 22px;

        display: flex;

        align-self: center;
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



    footer .powered
    {
        color: currentColor;
        font-size: 18px;

        display: flex;

        margin: 0 auto;

        align-self: center;
        text-decoration-line: underline;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    footer .powered img
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-right: 8px;
    }



    footer .socials
    {
        display: flex;

        margin-right: 100px;

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



    @media print, (max-width: 1439px)
    {
        footer .powered
        {
            font-size: 16px;
        }
    }



    @media print, (max-width: 1279px)
    {
        footer .text
        {
            font-size: 16px;
            line-height: 20px;
        }


        footer .powered
        {
            font-size: 14px;
        }


        footer .socials
        {
            margin-right: 92px;
        }
    }



    @media print, (max-width: 1023px)
    {
        footer
        {
            padding-bottom: 28px;
        }


        footer .powered
        {
            width: 100%;
            margin-top: 10px;

            justify-content: flex-start;
            order: 3;
        }


        footer .socials
        {
            margin-left: auto;
        }
    }



    @media print, (max-width: 767px)
    {
        footer
        {
            padding-bottom: 20px;
        }


        footer .text
        {
            font-size: 14px;
        }


        footer .socials
        {
            width: 100%;
            margin-top: 20px;
            margin-right: 0;
        }


        footer .powered
        {
            margin-top: 20px;
        }
    }

</style>