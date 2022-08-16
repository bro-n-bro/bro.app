<template>
    <div class="user">
        <div class="icon">
            <svg><use xlink:href="/sprite.svg#ic_wallet"></use></svg>
        </div>

        <div class="name">{{ store.userName }}</div>

        <div class="photo">
            <img :src="store.avatar" alt="" v-if="store.avatar">
        </div>
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>


<style scoped>
.user
{
    color: #fff;
    font-size: 14px;
    line-height: 17px;

    display: flex;

    margin-left: 40px;
    padding: 15px 10px;

    text-align: left;

    border-radius: 20px;
    background: #141414;

    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}


.user .icon
{
    display: flex;

    width: 40px;
    height: 40px;
    margin-right: 10px;

    border-radius: 50%;
    background: #950fff;

    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}

.user .icon svg
{
    display: block;

    width: 20px;
    height: 20px;
}


.user .photo
{
    position: relative;

    overflow: hidden;

    width: 40px;
    height: 40px;
    margin-left: 26px;

    border-radius: 50%;
    background: #353535;
}

.user .photo img
{
    position: absolute;
    top: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 100%;

    border-radius: inherit;

    object-fit: cover;
}













</style>