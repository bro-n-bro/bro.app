<template>
    <section class="make_choise">
        <div class="cont">
            <div class="data">
                <div class="thumb">
                    <img src="../../assets/images/make_choise.png" alt="">
                </div>

                <div class="title">
                    {{ $t('message.choice_title') }}
                </div>

                <div class="btns">
                    <button class="btn" @click.prevent="close">
                        {{ $t('message.no_btn') }}
                    </button>

                    <router-link to="/create_passport" class="btn yes_btn">
                        {{ $t('message.yes_btn') }}
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore()


    // Close modal
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
        padding-top: 40px;

        text-align: center;

        background: rgba(0,0,0,.86);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .make_choise .data
    {
        width: 473px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding: 20px;

        border-radius: 30px;
        background: #141414;
    }


    .make_choise .thumb
    {
        color: #464646;

        display: flex;

        height: 335px;
        margin-bottom: 40px;
        padding: 20px;

        border-radius: 20px;
        background: linear-gradient(219.08deg, #3b0268 22.41%, #950fff 99.38%);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .make_choise .thumb img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;
    }


    .make_choise .title
    {
        font-size: 24px;
        font-weight: 500;
        line-height: 120%;
    }


    .make_choise .btns
    {
        display: flex;

        margin-top: 24px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .make_choise .btns .btn
    {
        color: #fff;
        font-weight: 500;
        line-height: 19px;

        display: block;

        width: calc(50% - 5px);
        padding: 14px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 14px;
        background: #353535;
    }

    .make_choise .btns .btn.yes_btn
    {
        background: #950fff;
    }


    .make_choise .btns .btn:hover
    {
        background: #464646;
    }

    .make_choise .btns .btn.yes_btn:hover
    {
        background: #7700e1;
    }

</style>
