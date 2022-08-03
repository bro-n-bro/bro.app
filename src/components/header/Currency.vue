<template>
    <div class="currency">
        <button class="btn" :class="{ active: showDropdown }" @click.prevent="showDropdown = !showDropdown">
            <span>BTC</span>
            <svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>

        <div class="dropdown">
            <div><button class="btn active">BTC</button></div>
            <div><button class="btn">ETH</button></div>
            <div><button class="btn">ATOM</button></div>
            <div><button class="btn">USDT</button></div>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'

    const showDropdown = ref(false)
</script>



<style scoped>
.currency
{
    position: relative;

    margin-left: 60px;
}


.currency .btn
{
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;

    display: flex;

    pointer-events: auto;

    justify-content: flex-start;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
}

.currency .btn svg
{
    display: block;

    width: 15px;
    height: 15px;
    margin-left: 10px;
}


.currency .dropdown
{
    position: absolute;
    z-index: 5;
    top: 100%;
    left: -9px;

    display: none;

    width: 90px;
    margin-top: 7px;
    padding: 6px 4px;

    border-radius: 10px;
    background: #101010;
}

.currency .dropdown > * + *
{
    margin-top: 5px;
}

.currency .btn.active + .dropdown
{
    display: block;
}


.currency .dropdown .btn
{
    font-size: 12px;
    line-height: 15px;

    display: block;

    width: 100%;
    padding: 4px;

    transition: background .2s linear;
    text-align: left;
    pointer-events: auto;

    border-radius: 7px;
}

.currency .dropdown .btn:hover,
.currency .dropdown .btn.active
{
    background: #191919;
}


</style>