<template>
    <div class="main">
        <!-- Header -->
        <Header />

        <!-- Router view -->
        <RouterView />
    </div>

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    // Components
    import Header  from '../components/Header.vue'
    import Feedback  from '../components/Feedback.vue'
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


    .error_info .back_btn
    {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        line-height: 19px;

        display: inline-block;

        margin-top: 40px;
        padding: 17px 30px;

        transition: box-shadow .2s linear;
        vertical-align: top;
        text-decoration: none;

        border-radius: 20px;
        background: #950fff;
    }

    .error_info .back_btn:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }
</style>