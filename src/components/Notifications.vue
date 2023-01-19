<template>
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
</template>


<script setup>
    // import { onMounted } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>


<style>
.notifications
{
    width: calc(100% - 720px);
}


.notifications .data
{
    font-size: 14px;
    line-height: 150%;

    display: flex;

    min-height: 70px;
    padding: 10px 20px 10px 10px;

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
    -webkit-line-clamp: 3;
}

</style>