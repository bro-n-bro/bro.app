<template>
    <transition name="fade" mode="out-in" appear type="animation">
    <section class="notifications">
        <div class="cont">
            <div class="data">
                <div class="icon">
                    <svg><use xlink:href="/sprite.svg#ic_notification"></use></svg>
                </div>

                <span>{{ store.tooltip }}</span>
            </div>
        </div>
    </section>
    </transition>
</template>


<script setup>
    import { onMounted } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()


    onMounted(() => {
        // Sticky notification
        const notificatios = document.querySelector('.notifications')

        notificatios.stickyEvent = () => {
            setTimeout(() => {
                window.scrollY > 32
                    ? notificatios.classList.add('stuck')
                    : notificatios.classList.remove('stuck')
            })
        }

        document.addEventListener('DOMContentLoaded', notificatios.stickyEvent)
        document.addEventListener('scroll', notificatios.stickyEvent)
    })
</script>


<style>
    .notifications
    {
        position: fixed;
        z-index: 89;
        top: 132px;
        left: 0;

        width: 100%;

        transition: top .2s linear;
        pointer-events: none;
    }


    .notifications .data
    {
        font-size: 14px;
        line-height: 150%;

        display: flex;

        width: 1159px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding: 19px 20px;

        transition: .2s linear;

        border-radius: 20px;
        background: #141414;

        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;
        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    .notifications .icon
    {
        display: flex;

        width: 52px;
        height: 52px;

        border: 1px solid rgba(217, 217, 217, .1);
        border-radius: 50%;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .notifications .icon svg
    {
        display: block;

        width: 30px;
        height: 30px;
    }

    .notifications .icon + *
    {
        width: calc(100% - 67px);
        margin-left: auto;
    }

    .notifications span
    {
        display: -webkit-box;
        overflow: hidden;

        text-overflow: ellipsis;

        align-self: center;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }



    .notifications.stuck
    {
        z-index: 91;
        top: 31px;
    }

    .notifications.stuck .data
    {
        width: calc(100% - 747px);
        padding-top: 10px;
        padding-bottom: 10px;

        transform: translateX(-152px);
    }

</style>