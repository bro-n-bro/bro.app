<template>
    <section class="error_info">
        <div class="cont">
            <img src="../assets/images/error_404.svg" alt="" class="img">

            <div class="title" v-html="$t('message.error_title_404')"></div>

            <router-link to="/" class="back_btn">{{ $t('message.back_home_btn') }}</router-link>
        </div>
    </section>
</template>