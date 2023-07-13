<template>
    <div class="tour" v-if="tourShow" :class="[tourPosition]" :style="{
        top: tourCoordinates.top + 'px',
        right: tourCoordinates.right + 'px',
        bottom: tourCoordinates.bottom + 'px',
        left: tourCoordinates.left + 'px',
        margin: tourCoordinates.margin
    }">
        <button class="close_btn" @click.prevent="closeTour()">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
        </button>

        <div class="step step0" :class="{'show': currentStep == 0}">
            <div class="title">Let's get to know each other</div>

            <div class="desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al</div>
        </div>

        <div class="step step1" :class="{'show': currentStep == 1}">
            <div class="title">Let's get to know each other</div>

            <div class="desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al</div>
        </div>

        <div class="step step2" :class="{'show': currentStep == 2}">
            <div class="title">Let's get to know each other</div>

            <div class="desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al</div>
        </div>

        <div class="step step2" :class="{'show': currentStep == 3}">
            <div class="title">Let's get to know each other</div>

            <div class="desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al</div>
        </div>

        <div class="step step2" :class="{'show': currentStep == 4}">
            <div class="title">Let's get to know each other</div>

            <div class="desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al</div>
        </div>

        <div class="step step2" :class="{'show': currentStep == 5}">
            <div class="title">Let's get to know each other</div>

            <div class="desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al</div>
        </div>

        <div class="bullets">
            <div v-for="(step, index) in steps" :key="index" :class="{'active': currentStep == index}" @click.prevent="selectStep(currentStep = index)"></div>
        </div>

        <div class="btns">
            <button class="btn prev_btn" @click.prevent="selectStep(currentStep--)">
                {{ $t('message.btn_back') }}
            </button>

            <button class="btn next_btn" @click.prevent="selectStep(currentStep++)" v-if="currentStep < (steps.length - 1)">
                {{ $t('message.btn_next') }}
            </button>

            <button class="btn done_btn" @click.prevent="closeTour()" v-else>
                {{ $t('message.btn_done') }}
            </button>
        </div>
    </div>

    <div class="tour_overlay" @click.prevent="closeTour()"></div>
</template>


<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        currentStep = ref(0),
        tourShow = ref(false),
        tourPosition = ref(''),
        tourCoordinates = reactive({
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            left: 'auto',
            margin: 'auto',
        }),
        steps = [
            {
                selector: '.networks',
                position: 'right-start'
            },
            {
                selector: '.connected_addresses',
                position: 'left-start'
            },
            {
                selector: '.main_data',
                position: 'bottom'
            },
            {
                selector: '.stats',
                position: 'bottom'
            },
            {
                selector: '.validators',
                position: 'bottom'
            },
            {
                selector: '.proposals',
                position: 'right-start'
            },
        ]


    onMounted(() => {
        // Start tour
        selectStep()
    })


    function selectStep() {
        // Get current element
        let block = document.querySelector(steps[currentStep.value].selector),
            blockCoordinates = block.getBoundingClientRect()

        // Remove tour_selected class
        steps.forEach(el => document.querySelector(el.selector).classList.remove('tour_selected'))

        // Bring element to first layer
        block.classList.add('tour_selected')

        // Set coordinates for tour block
        tourPosition.value = steps[currentStep.value].position

        switch (steps[currentStep.value].position) {
            case 'right-start':
                tourCoordinates.top = blockCoordinates.top + window.scrollY
                tourCoordinates.right = 'auto'
                tourCoordinates.bottom = 'auto'
                tourCoordinates.left = blockCoordinates.left + window.scrollX + block.offsetWidth,
                tourCoordinates.margin = 'auto auto auto 15px'
                break;

            case 'left-start':
                tourCoordinates.top = blockCoordinates.top + window.scrollY
                tourCoordinates.right = 'auto'
                tourCoordinates.bottom = 'auto'
                tourCoordinates.left = blockCoordinates.left + window.scrollX - 280,
                tourCoordinates.margin = 'auto auto auto -15px'
                break;

            case 'bottom':
                tourCoordinates.top = blockCoordinates.top + window.scrollY + block.offsetHeight
                tourCoordinates.right = 0
                tourCoordinates.bottom = 'auto'
                tourCoordinates.left = 0,
                tourCoordinates.margin = '15px auto auto auto'
                break;

            default:
                tourCoordinates.top = 'auto'
                tourCoordinates.right = 'auto'
                tourCoordinates.bottom = 'auto'
                tourCoordinates.left = 'auto',
                tourCoordinates.margin = 'auto'
                break;
        }

        block.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })

        // Show tour block
        tourShow.value = true
    }


    // Tour done
    function closeTour() {
        // Hide tour
        store.tour = false
        tourShow.value = false

        // Scroll on top
        document.querySelector('.wrap').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
</script>


<style scoped>
    .tour_overlay
    {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: rgba(0, 0, 0, .8);
    }



    .tour
    {
        position: absolute;
        z-index: 1010;

        width: 280px;
        padding: 11px;

        border: 1px solid rgba(255, 255, 255, .1);
        border-radius: 12px;
        background: #141414;
    }


    .tour:before
    {
        position: absolute;

        display: none;

        width: 9px;
        height: 22px;
        margin: auto;

        content: '';

        background: url(@/assets/images/tourguide_tail.svg) 0 0 no-repeat;
    }

    .tour.right-start:before
    {
        top: 0;
        right: 100%;
        bottom: 0;

        display: block;

        transform: rotate(180deg);
    }

    .tour.left-start:before
    {
        top: 0;
        bottom: 0;
        left: 100%;

        display: block;
    }

    .tour.bottom:before
    {
        top: 0;
        right: 0;
        bottom: 100%;
        left: 0;

        display: block;

        margin-top: -15px;

        transform: rotate(-90deg);
    }


    .tour .close_btn
    {
        position: absolute;
        top: 11px;
        right: 11px;

        display: flex;

        width: 24px;
        height: 24px;

        transition: color .2s linear;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .tour .close_btn .icon
    {
        display: block;

        width: 24px;
        height: 24px;
    }

    .tour .close_btn:hover
    {
        color: #950fff;
    }


    .tour .step
    {
        display: none;
    }

    .tour .step.show
    {
        display: block;
    }


    .tour .step .title
    {
        font-size: 18px;
        font-weight: 600;

        padding-right: 31px;
    }


    .tour .step .desc
    {
        font-size: 14px;
        line-height: 120%;

        margin-top: 8px;

        opacity: .8;
    }


    .tour .bullets
    {
        display: flex;

        margin-top: 16px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .tour .bullets > *
    {
        width: 6px;
        height: 6px;

        cursor: pointer;
        transition: background .2s linear;

        border-radius: 50%;
        background: #353535;
    }

    .tour .bullets > * + *
    {
        margin-left: 8px;
    }


    .tour .bullets > *:hover,
    .tour .bullets > *.active
    {
        background: #950fff;
    }


    .tour .btns
    {
        display: flex;

        margin-top: 16px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .tour .btns .btn
    {
        font-size: 12px;

        display: block;

        width: calc(50% - 4px);

        transition: .2s linear;

        border-radius: 140px;
    }


    .tour .btns .btn.prev_btn
    {
        color: #555;

        padding: 9px 15px;

        border: 1px solid #282828;
    }

    .tour .btns .btn.prev_btn:hover
    {
        color: #fff;

        border-color: #fff;
    }


    .tour .btns .btn.next_btn,
    .tour .btns .btn.done_btn
    {
        color: #fff;

        padding: 10px 16px;

        background: #950fff;
    }

    .tour .btns .btn.next_btn:hover,
    .tour .btns .btn.done_btn:hover
    {
        background: #7700e1;
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }

</style>