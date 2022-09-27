<template>
    <button class="connect_btn" @click.prevent="emitter.emit('connectWallet')">
        <div class="icon">
            <svg><use xlink:href="/sprite.svg#ic_wallet"></use></svg>
        </div>

        <span>{{ $t('message.connect_wallet') }}</span>
    </button>
</template>


<script setup>
    import { inject } from 'vue'

    const emitter = inject('emitter')
</script>


<style scoped>
.connect_btn
{
    font-size: 18px;  font-weight: 600;  line-height: 22px;  display: flex;  align-content: center;  align-items: center;  flex-wrap: wrap;  justify-content: space-between;  width: 243px;  max-width: 100%;  margin-left: 40px;  padding: 15px 10px;  text-align: left;  color: #fff;  border-radius: 20px;  background: #141414;
}


.connect_btn .icon
{
    display: flex;  align-content: center;  align-items: center;  flex-wrap: wrap;  justify-content: center;  width: 40px;  height: 40px;  border-radius: 50%;  background: #950fff;
}

.connect_btn .icon svg
{
    display: block;  width: 18px;  height: 18px;
}


.connect_btn span
{
    width: calc(100% - 50px);
}

</style>