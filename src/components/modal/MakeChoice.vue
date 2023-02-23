<template>
    <section class="make_choise">
        <div class="cont">
            <div class="data">
                <svg class="icon"><use xlink:href="/sprite.svg#ic_lock"></use></svg>

                <div class="title">
                    {{ $t('message.choice_title') }}
                </div>

                <div class="btns">
                    <button class="btn blue" @click.prevent="close">
                        <span>{{ $t('message.no_btn') }}</span>
                        <img src="../../assets/images/pill_blue.png" alt="">
                    </button>

                    <router-link to="/create_passport" class="btn red">
                        <span>{{ $t('message.yes_btn') }}</span>
                        <img src="../../assets/images/pill_red.png" alt="">
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()

    function close() {
        store.showMakeChoice = false
    }
</script>


<style>
    .make_choise
    {
        position: fixed;
        z-index: 90;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 100%;
        padding-bottom: 100px;

        text-align: center;

        background: rgba(0,0,0,.86);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .make_choise .data
    {
        width: 508px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
    }


    .make_choise .icon
    {
        color: #464646;

        display: block;

        width: 144px;
        height: 144px;
        margin: 0 auto 30px;
    }


    .make_choise .title
    {
        font-size: 30px;
        font-weight: 700;
        line-height: 110%;
    }


    .make_choise .btns
    {
        display: flex;

        margin-top: 30px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .make_choise .btns .btn
    {
        color: #fff;
        font-weight: 500;
        line-height: 19px;

        display: flex;

        width: 212px;
        height: 47px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 14px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .make_choise .btns .btn.blue
    {
        background: #0343e8;
    }

    .make_choise .btns .btn.red
    {
        background: #eb5757;
    }


    .make_choise .btns .btn + .btn
    {
        margin-left: 10px;
    }


    .make_choise .btns .btn img
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-left: 10px;
    }


    .make_choise .btns .btn.blue:hover
    {
        background: #0025ca;
    }

    .make_choise .btns .btn.red:hover
    {
        background: #cd3939;
    }

</style>
