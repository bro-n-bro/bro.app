<template>
    <section class="abilities">
        <div class="title">
            {{ $t('message.account_abilities_title') }}
        </div>

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
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>


<style scoped>
    .abilities
    {
        width: calc(100% - 324px);
        margin-left: auto;
    }


    .abilities .title
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;

        margin-bottom: 8px;
    }


    .abilities .items
    {
        display: flex;

        margin-bottom: -8px;
        margin-left: -8px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: wrap;
    }

    .abilities .items > *
    {
        width: calc(25% - 8px);
        margin-bottom: 8px;
        margin-left: 8px;
    }


    .abilities .item
    {
        color: #555;
        font-size: 14px;
        line-height: 100%;

        padding: 10px;

        border-radius: 10px;
        background: #141414;
    }


    .abilities .item .icon
    {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .abilities .item .icon img
    {
        display: block;

        max-width: 100%;
        height: 46px;
        max-height: 100%;
        margin-bottom: 8px;
    }


    @media print, (max-width: 1899px)
    {
        .abilities .items > *
        {
            width: calc(33.333% - 8px);
        }
    }

</style>