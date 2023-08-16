<template>
    <button class="get_tour_btn" @click.prevent="store.tour = true">
        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_feedback"></use></svg>
    </button>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore()
</script>


<style scoped>
    .get_tour_btn
    {
        position: fixed;
        z-index: 90;
        right: 24px;
        bottom: 108px;

        display: flex;

        width: 76px;
        height: 76px;

        transition: background .2s linear;

        border-radius: 32px;
        background: #282828;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .get_tour_btn .icon
    {
        display: block;

        width: 40px;
        height: 40px;
    }


    .get_tour_btn:hover
    {
        background: #7700e1;
    }



    @media print, (max-width: 1279px)
    {
        .get_tour_btn
        {
            bottom: 96px;

            width: 64px;
            height: 64px;

            border-radius: 20px;
        }


        .get_tour_btn .icon
        {
            width: 32px;
            height: 32px;
        }
    }



    @media print, (max-width: 767px)
    {
        .get_tour_btn
        {
            right: 12px;
            bottom: 80px;

            width: 60px;
            height: 60px;

            border-radius: 18px;
        }


        .get_tour_btn .icon
        {
            width: 30px;
            height: 30px;
        }
    }
</style>