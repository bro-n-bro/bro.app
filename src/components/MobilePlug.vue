<template>
    <div class="mobile_plug">
        <div class="image">
            <img src="/mobile_plug_img.svg" alt="">
        </div>

        <div class="title">{{ $t('message.mobile_plug_title') }}</div>

        <div class="desc">{{ $t('message.mobile_plug_desc') }}</div>
    </div>
</template>


<style scope>
    .mobile_plug
    {
        color: #f2f2f2;
        line-height: 19px;

        display: flex;

        text-align: center;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        flex: 1 0 auto;
    }


    .mobile_plug .image
    {
        width: 100%;
        margin-bottom: 16px;
    }

    .mobile_plug .image img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;
        margin-right: auto;
        margin-left: auto;
    }


    .mobile_plug .title
    {
        font-size: 36px;
        font-weight: 600;
        line-height: 90%;

        width: 100%;

        letter-spacing: -.02em;
        text-transform: uppercase;
    }


    .mobile_plug .desc
    {
        width: 100%;
        margin-top: 16px;
    }

</style>