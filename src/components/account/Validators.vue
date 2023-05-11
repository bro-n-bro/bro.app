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

        <div class="loader_wrap" v-if="loading">
            <div class="loader"><span></span></div>
        </div>

        <div class="items" v-else>
            <!-- <pre>{{ wallets }}</pre> -->

            <div v-for="(wallet, index) in wallets" :key="index" class="item" :class="{'hide': index >= 3 && !showAll}" v-if="wallets.length">
                <div class="col_account_name">
                    {{ wallet.address.slice(0, 8) + '...' + wallet.address.slice(-5) }}
                </div>

                <div class="col_network">
                    <div class="logo">
                        <img :src="`/${store.currentNetwork}_logo.png`" alt="">
                    </div>

                    <div>{{ store.networks[store.currentNetwork].name }}</div>
                </div>

                <div class="col_validator" @click.prevent="toggleActiveClass">
                    <div class="logo" v-for="(validator, validators_index) in wallet.validatorsReverse" :key="validators_index">
                        <img :src="validator.avatar_url" alt="">
                    </div>

                    <svg class="arr"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
                </div>

                <div class="col_percent"></div>

                <div class="col_percent">
                    {{ $filters.toFixed(wallet.totalTokens / totalPassportTokens * 100, 2) }} %
                </div>

                <div class="item sub_item" v-for="(validator, validators_index) in wallet.validators" :key="validators_index">
                    <div class="col_account_name"></div>
                    <div class="col_network"></div>

                    <div class="col_validator">
                        <div class="logo">
                            <img :src="validator.avatar_url" alt="">
                        </div>

                        <div class="name" @click.prevent="openValidatorModal(validator)">
                            {{ validator.moniker }}
                        </div>

                        <div class="amount">
                            <span>{{ $filters.toFixed(validator.coin.amount / store.networks[store.currentNetwork].exponent, 3) }}</span> {{ store.networks[store.currentNetwork].token_name }}
                        </div>
                    </div>

                    <div class="col_percent">
                        {{ $filters.toFixed(validator.coin.amount / wallet.totalTokens * 100, 2) }} %
                    </div>

                    <div class="col_percent">
                        {{ $filters.toFixed(validator.coin.amount / totalPassportTokens * 100, 2) }} %
                    </div>
                </div>
            </div>
        </div>

        <button class="spoler_btn" :class="{'active': showAll}" @click.prevent="showAll = !showAll" v-if="wallets.length > 4">
            <svg class="icon"><use xlink:href="/sprite.svg#ic_arr_down"></use></svg>
        </button>


        <!-- Validator modal -->
        <Suspense>
        <ValidatorModal v-if="showValidatorModal" :validator="validatorInfo" />
        </Suspense>
    </section>
</template>


<script setup>
    import { onBeforeMount, reactive, ref, inject, watch } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    // Components
    import ValidatorModal from '@/components/modal/ValidatorModal.vue'

    const store = useGlobalStore(),
        emitter = inject('emitter'),
        loading = ref(true),
        showValidatorModal = ref(false),
        validatorInfo = ref({})

    var wallets = reactive([]),
        totalPassportTokens = 0,
        showAll = false


    onBeforeMount(async () => {
        // Clear data
        wallets = reactive([])

        // Get data
        store.account.currentWallet == 'all'
            ? await getAllData()
            : await getAddressData()
    })


    // Monitor of current wallet changes
    watch(() => store.account.currentWallet, async () => {
        // Clear data
        wallets = reactive([])

        // Get data
        store.account.currentWallet == 'all'
            ? await getAllData()
            : await getAddressData()
    })


    // Get address data
    async function getAddressData() {
        // Set loader
        loading.value = true

        // Get validators for current wallet
        try {
            let currentAddress = generateAddress(store.networks[store.currentNetwork].address_prefix, store.account.currentWallet)

            await fetch(`https://rpc.bronbro.io/account/validators/${currentAddress}`)
                .then(res => res.json())
                .then(response => {
                    if(response.validators.length) {
                        let totalTokens = 0

                        // Calc total totalTokens
                        response.validators.forEach(validator => totalTokens += validator.coin.amount)

                        // Sort and set
                        wallets.push({
                            address: currentAddress,
                            totalTokens,
                            validators: response.validators.sort((a, b) => {
                                if (a.coin.amount > b.coin.amount) { return -1 }
                                if (a.coin.amount < b.coin.amount) { return 1 }
                                return 0
                            }),
                            validatorsReverse: response.validators.sort((a, b) => {
                                if (a.coin.amount > b.coin.amount) { return 1 }
                                if (a.coin.amount < b.coin.amount) { return -1 }
                                return 0
                            })
                        })

                        // Math total passport tokens
                        response.validators.forEach(validator => totalPassportTokens += validator.coin.amount)
                    }

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Get all data
    async function getAllData() {
        // Set loader
        loading.value = true

        // Get validators for main wallet
        try {
            let ownerAddress = generateAddress(store.networks[store.currentNetwork].address_prefix, store.account.moonPassportOwner)

            await fetch(`https://rpc.bronbro.io/account/validators/${ownerAddress}`)
                .then(res => res.json())
                .then(response => {
                    let totalTokens = 0

                    // Calc total totalTokens
                    response.validators.forEach(validator => totalTokens += validator.coin.amount)

                    // Sort and set
                    wallets.push({
                        address: ownerAddress,
                        totalTokens,
                        validators: response.validators.sort((a, b) => {
                            if (a.coin.amount > b.coin.amount) { return -1 }
                            if (a.coin.amount < b.coin.amount) { return 1 }
                            return 0
                        })
                    })

                    // Math total passport tokens
                    response.validators.forEach(validator => totalPassportTokens += validator.coin.amount)

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.log(error)
        }

        // Get validators other wallets
        if(store.account.owner.moonPassport.extension.addresses) {
            store.account.owner.moonPassport.extension.addresses.forEach(async address => {
                let generatedAddress = generateAddress(store.networks[store.currentNetwork].address_prefix, address.address)

                if(generatedAddress != store.account.moonPassportOwner && !wallets[generatedAddress]) {
                    try {
                        await fetch(`https://rpc.bronbro.io/account/validators/${generatedAddress}`)
                            .then(res => res.json())
                            .then(response => {
                                // Sort
                                wallets[generatedAddress] = response.validators.sort((a, b) => {
                                    if (a.coin.amount > b.coin.amount) { return -1 }
                                    if (a.coin.amount < b.coin.amount) { return 1 }
                                    return 0
                                })

                                // Math total passport tokens
                                wallets[generatedAddress].forEach(el => totalPassportTokens += el.coin.amount)
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        }
    }


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.closest('.item').classList.toggle('active')
    }


    // Open validator modal
    function openValidatorModal(validator) {
        validatorInfo.value = validator
        showValidatorModal.value = true

        document.body.classList.add('lock')
    }


    // Event "close validator modal"
    emitter.on('closeValidatorModal', () => {
        showValidatorModal.value = false

        document.body.classList.remove('lock')
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
        width: 140px;
        min-width: 140px;
    }

    .validators .col_validator
    {
        width: calc(100% - 468px);
    }

    .validators .col_percent
    {
        width: 92px;
        min-width: 92px;

        text-align: right;
    }


    .validators .titles
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        margin-bottom: 8px;
        padding-bottom: 7px;

        border-bottom: 1px solid rgba(255, 255, 255, .05);

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .validators .titles > *
    {
        padding: 8px;
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

        transition: background .2s linear;

        border-radius: 8px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .validators .item > *
    {
        display: flex;

        padding: 8px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .validators .sub_item
    {
        display: none;

        width: 100%;
        padding-right: 0;
        padding-left: 0;

        border-top: 1px solid rgba(255, 255, 255, .05);
        border-radius: 0;
    }


    .validators .item > *.col_account_name
    {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .validators .item > *.col_validator
    {
        flex-direction: row-reverse;

        cursor: pointer;

        justify-content: flex-end;
    }

    .validators .sub_item > *.col_validator
    {
        flex-direction: row;

        justify-content: flex-start;
    }

    .validators .sub_item > *.col_validator > *
    {
        cursor: default;

        order: 0 !important;
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

        border: 1px solid #0d0d0d;
        border-radius: 50%;

        order: 2;
    }

    .validators .item .logo + .logo
    {
        margin-right: -6px;
    }

    .validators .item .col_network .logo + *
    {
        width: calc(100% - 32px);
        margin-left: auto;

        transition: opacity .2s linear;
        pointer-events: none;

        opacity: 0;

        order: 5;
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


    .validators .item .arr
    {
        color: #555;

        display: block;

        width: 16px;
        height: 16px;
        margin-left: auto;

        transition: transform .2s linear;
    }


    .validators .item .name
    {
        overflow: hidden;

        width: calc(100% - 127px);
        margin-left: auto;

        cursor: pointer;
        transition: color .2s linear;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .validators .item .name:hover
    {
        color: #950fff;
    }


    .validators .item .amount
    {
        color: #555;
        font-size: 10px;
        line-height: 12px;

        width: 87px;
        margin-left: auto;

        text-align: right;
        white-space: nowrap;
    }

    .validators .item .amount span
    {
        color: #fff;
    }


    .validators .item:hover
    {
        background: #191919;
    }


    .validators .item.active .col_network .logo + *
    {
        opacity: 1;
    }

    .validators .item.active .arr
    {
        transform: rotate(180deg);
    }

    .validators .item.active .sub_item
    {
        display: flex;
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