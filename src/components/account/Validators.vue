<template>
    <section class="validators">
        <div class="title">
            {{ $t('message.account_validators_title') }}
        </div>

        <div class="titles">
            <div class="col_account_name">
                {{ $t('message.account_validators_col_account_name') }}
            </div>

            <div class="col_network">
                {{ $t('message.account_validators_col_network') }}
            </div>

            <div class="col_validator">
                {{ $t('message.account_validators_col_validator') }}
            </div>

            <div class="col_percent">
                {{ $t('message.account_validators_col_account_percent') }}
            </div>

            <div class="col_percent">
                {{ $t('message.account_validators_col_passport_percent') }}
            </div>
        </div>

        <div class="loader_wrap" v-if="!loading">
            <div class="loader"><span></span></div>
        </div>

        <div class="items" v-else>
            <!-- <pre>{{ data.validators }}</pre> -->

            <div v-for="(validator, index) in data.validators" :key="index" class="item" :class="{'hide': index >= 3 && !data.showAll}">
                <div class="col_account_name">
                    <template v-if="index < 1">
                    {{ validator.delegator_address.slice(0, 8) + '...' + validator.delegator_address.slice(-5) }}
                    </template>
                </div>

                <div class="col_network">
                    <template v-if="index < 1">
                    <div class="logo">
                        <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                    </div>
                    <div>{{ store.networks[store.currentNetwork].name }}</div>
                    </template>
                </div>

                <div class="col_validator">
                    <div class="name" @click.prevent="emitter.emit('openValidatorModal', validator)">
                        {{ validator.moniker }}
                    </div>
                </div>

                <div class="col_percent">{{ $filters.toFixed(validator.coin.amount / data.totalTokens * 100, 2) }} %</div>
                <div class="col_percent">{{ $filters.toFixed(validator.coin.amount / data.totalTokens * 100, 2) }} %</div>
            </div>
        </div>

        <button class="spoler_btn" :class="{'active': data.showAll}" @click.prevent="data.showAll = !data.showAll" v-if="data.validators.length > 5">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>
    </section>
</template>


<script setup>
    import { onMounted, reactive, ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore(),
        emitter = inject('emitter'),
        loading = ref(false),
        data = reactive({
            validators: [],
            totalTokens: 0,
            showAll: false
        })


    onMounted(async () => {
        // Get validators
        try {
            await fetch(`https://rpc.bronbro.io/account/validators/${store.wallets.cosmoshub}`)
                .then(res => res.json())
                .then(response => {
                    // Sort
                    data.validators = response.sort((a, b) => {
                        if (a.coin.amount > b.coin.amount) { return -1 }
                        if (a.coin.amount < b.coin.amount) { return 1 }
                        return 0
                    })

                    // Math total tokens
                    data.validators.forEach(el => data.totalTokens += el.coin.amount)

                    // Hide loader
                    loading.value = true
                })
        } catch (error) {
            console.log(error)
        }
    })
</script>


<style scoped>
    .validators
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .validators .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        margin-bottom: 16px;
    }


    .validators .col_account_name,
    .validators .col_network
    {
        width: 148px;
        min-width: 148px;
    }

    .validators .col_validator
    {
        width: 100%;
    }

    .validators .col_percent
    {
        width: 100px;
        min-width: 100px;

        text-align: right;
    }


    .validators .titles
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        padding-bottom: 7px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: nowrap;
    }

    .validators .titles > *
    {
        padding: 8px 10px;
    }


    .validators .loader_wrap
    {
        position: relative;

        height: auto;
        padding: 20px 0 0;

        background: none;
    }


    .validators .items > * + *
    {
        margin-top: 5px;
    }

    .validators .items > * + *:before
    {
        position: absolute;
        top: -3px;
        left: 0;

        display: block;

        width: 100%;
        height: 1px;

        content: '';
        pointer-events: none;

        background: rgba(255, 255, 255, .05);
    }


    .validators .item
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        position: relative;

        display: flex;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .validators .item > *
    {
        display: flex;

        padding: 8px 10px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .validators .item > *.col_account_name
    {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .validators .item > *.col_percent
    {
        justify-content: flex-end;
    }


    .validators .item .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 8px;

        border-radius: 50%;
    }

    .validators .item .logo img
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

    .validators .item .logo + *
    {
        width: calc(100% - 32px);
    }


    .validators .item .name
    {
        overflow: hidden;

        width: 100%;

        cursor: pointer;
        transition: color .2s linear;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .validators .item .name:hover
    {
        color: #950fff;
    }


    .validators .spoler_btn
    {
        position: absolute;
        right: 0;
        bottom: -18px;
        left: 0;

        display: flex;

        width: 36px;
        height: 36px;
        margin: auto;

        transition: background .2s linear;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .validators .spoler_btn .icon
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .validators .spoler_btn:hover
    {
        background: #950fff;
    }

</style>