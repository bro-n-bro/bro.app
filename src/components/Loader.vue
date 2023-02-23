<template>
    <div class="default_loader_wrap">
        <div class="loader-wheel">
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
            <span class="loader-wheel__spoke"></span>
        </div>
    </div>
</template>


<style scoped>
    .default_loader_wrap
    {
        position: absolute;
        z-index: 90;

        display: flex;

        width: 100%;
        height: 100%;
        margin: auto;

        inset: 0;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .loader-wheel
    {
        font-size: 64px;

        position: relative;

        width: 100%;
        height: 100%;
    }

    .loader-wheel__spoke
    {
        position: absolute;
        top: 50%;
        left: 50%;

        display: block;

        width: .02em;
        height: .075em;

        transform-origin: left top;
        animation: fade .6s linear infinite;

        opacity: 0;
        border-radius: .05em;
        background: #fff;
    }

    @keyframes fade
    {
        from
        {
            opacity: 1;
        }
        to
        {
            opacity: 0;
        }
    }

    .loader-wheel__spoke:nth-child(1)
    {
        transform: rotate(0deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(2)
    {
        transform: rotate(30deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(3)
    {
        transform: rotate(60deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(4)
    {
        transform: rotate(90deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(5)
    {
        transform: rotate(120deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(6)
    {
        transform: rotate(150deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(7)
    {
        transform: rotate(180deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(8)
    {
        transform: rotate(210deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(9)
    {
        transform: rotate(240deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(10)
    {
        transform: rotate(270deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(11)
    {
        transform: rotate(300deg) translate(-50%, 70%);
    }
    .loader-wheel__spoke:nth-child(12)
    {
        transform: rotate(330deg) translate(-50%, 70%);
    }

    .loader-wheel__spoke:nth-child(2)
    {
        animation-delay: .05s;
    }
    .loader-wheel__spoke:nth-child(3)
    {
        animation-delay: .1s;
    }
    .loader-wheel__spoke:nth-child(4)
    {
        animation-delay: .15s;
    }
    .loader-wheel__spoke:nth-child(5)
    {
        animation-delay: .2s;
    }
    .loader-wheel__spoke:nth-child(6)
    {
        animation-delay: .25s;
    }
    .loader-wheel__spoke:nth-child(7)
    {
        animation-delay: .3s;
    }
    .loader-wheel__spoke:nth-child(8)
    {
        animation-delay: .35s;
    }
    .loader-wheel__spoke:nth-child(9)
    {
        animation-delay: .4s;
    }
    .loader-wheel__spoke:nth-child(10)
    {
        animation-delay: .45s;
    }
    .loader-wheel__spoke:nth-child(11)
    {
        animation-delay: .5s;
    }
    .loader-wheel__spoke:nth-child(12)
    {
        animation-delay: .55s;
    }

</style>