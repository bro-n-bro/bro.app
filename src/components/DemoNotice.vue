<template>
    <div class="demo_notice">
        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_notice2"></use></svg>

        <span>{{ $t('message.demo_notice_text') }}</span>

        <div class="sep">—</div>

        <router-link to="/create_passport">
            {{ $t('message.demo_notice_link') }}
        </router-link>
    </div>
</template>


<style scoped>
    .demo_notice
    {
        font-weight: 500;

        display: flex;

        width: calc(100% - 40px);
        margin: 0 auto 20px;
        padding: 14px;

        text-align: center;

        border-radius: 14px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .demo_notice .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 8px;
    }


    .demo_notice .sep
    {
        margin: 0 8px;
    }


    .demo_notice a
    {
        color: currentColor;

        margin-left: 6px;

        text-decoration: none;

        border-bottom: 1px solid;
    }

</style>