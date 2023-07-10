<template>
    <button class="btn_up" @click="scrollTop()" :style="{'display': activeBlock}">
        <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_ver"></use></svg>
    </button>
</template>



<script setup>
    import { ref, onMounted } from 'vue'

    const activeBlock = ref('none')


    onMounted(() => {
        window.addEventListener('scroll', () => {
            let scrolled = window.pageYOffset,
                coords = document.documentElement.clientHeight

            scrolled > coords
                ? activeBlock.value = 'flex'
                : activeBlock.value = 'none'
        })
    })


    // Scroll to top
    function scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
</script>