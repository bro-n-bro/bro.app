<template>
    <Header />

    <RouterView />
</template>


<script setup>
    import Header  from '../components/Header.vue'

    import { RouterView } from 'vue-router'
</script>


<style>
    .error_info
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


    .error_info .img
    {
        display: block;

        max-width: 50%;
        margin: 0 auto 40px;
    }


    .error_info .title
    {
        color: #fff;
        font-size: 52px;
        font-weight: 600;
        line-height: 63px;

        width: 937px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
    }

</style>