<template>
    <section class="connected_addresses">
        <div class="title">
            {{ $t('message.account_connected_addresses_title') }}

            <button class="all_btn">
                <div class="check">
                    <svg><use xlink:href="/sprite.svg#ic_check"></use></svg>
                </div>
                <span>{{ $t('message.account_connected_addresses_all') }}</span>
            </button>
        </div>

        <div class="list">
            <!-- <pre>{{ store.account.moonPassport }}</pre> -->
            <!-- <pre>{{ store.account.moonPassportOwner }}</pre> -->

            <div><div class="item"
                :class="{'active': store.account.moonPassportOwnerAddress == generateAddress('bostrom', store.account.currentWallet)}"
                @click.prevent="selectWallet(store.account.moonPassportOwnerAddress)"
            >
                <div class="name">
                    {{ store.account.moonPassportOwner.extension.nickname }}
                </div>
            </div></div>

            <template v-for="(item, index) in store.account.moonPassportOwner.extension.addresses" :key="index" v-if="store.account.moonPassportOwner.extension.addresses">
            <div><div class="item" v-if="item.address.substring(0, 2) != '0x' || item.address.substring(0, 5) != 'terra'"
                @click.self="selectWallet(item.address)"
                :class="{
                    'duplicate': isDuplicate(item.address),
                    'active': store.account.currentWallet == generateAddress('bostrom', item.address)
                }"
            >
                <div class="tooltip">
                    {{ $t('message.account_duplicate_ext') }}
                </div>

                <div class="name">
                    <span v-if="item.label">{{ item.label }}</span>
                    <span v-else>{{ item.address.slice(0, 13) + '...' + item.address.slice(-6) }}</span>
                </div>

                <button class="edit_btn" @click.prevent="showEditForm" v-if="store.account.moonPassportOwnerAddress == store.wallets.bostrom" @mouseover="emitter.emit('setNotification', $t('message.notice_edit_address'))">
                    <svg><use xlink:href="/sprite.svg#ic_edit"></use></svg>
                </button>

                <button class="remove_btn" @click.prevent="openDeleteAddressModal(item.address)" v-if="store.account.moonPassportOwnerAddress == store.wallets.bostrom" @mouseover="emitter.emit('setNotification', $t('message.notice_delete_address'))">
                    <svg><use xlink:href="/sprite.svg#ic_remove"></use></svg>
                </button>

                <svg class="icon"><use xlink:href="/sprite.svg#ic_duplicate"></use></svg>

                <EditAddressName :address="item.address" :name="item.label ? item.label : `${item.address.slice(0, 13)}...${item.address.slice(-6)}`"/>
            </div></div>
            </template>
        </div>

        <button class="add_btn" @click.prevent="openAddAddressModal" :class="{'disabled': store.account.moonPassportOwner.extension.addresses && store.account.moonPassportOwner.extension.addresses.length >= 8}">
            <span>{{ $t('message.add_address_btn') }}</span>
            <svg class="icon"><use xlink:href="/sprite.svg#ic_plus"></use></svg>
        </button>


        <!-- Add address modal -->
        <AddAddressModal v-if="store.showAddAddressModal" />


        <!-- Delete address modal -->
        <DeleteAddressModal v-if="store.showDeleteAddressModal" />
    </section>
</template>


<script setup>
    import { inject, onBeforeMount, onBeforeUpdate } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { generateAddress } from '@/utils'

    // Components
    import AddAddressModal from '@/components/modal/AddAddressModal.vue'
    import DeleteAddressModal from '@/components/modal/DeleteAddressModal.vue'
    import EditAddressName from '@/components/account/EditAddressName.vue'

    const store = useGlobalStore(),
        emitter = inject('emitter')

    var uniqWallets = []


    onBeforeMount(() => {
        // Create uniq wallets array
        createUniwWalletsArray()
    })


    onBeforeUpdate(() => {
        // Clear array
        uniqWallets = []

        // Create uniq wallets array
        createUniwWalletsArray()
    })


    // Create uniq wallets array
    function createUniwWalletsArray() {
        uniqWallets[store.account.moonPassportOwnerAddress] = true

        if(store.account.moonPassportOwner.extension.addresses) {
            store.account.moonPassportOwner.extension.addresses.forEach(address => {
                let tempBostromAddress = generateAddress('bostrom', address.address)

                if (!uniqWallets[tempBostromAddress]) {
                    uniqWallets[tempBostromAddress] = false
                }
            })
        }
    }


    // Check address
    function isDuplicate(address) {
        let result = false

        !uniqWallets[generateAddress('bostrom', address)]
            ? uniqWallets[generateAddress('bostrom', address)] = true
            : result = true

        return result
    }


    // Select wallet
    function selectWallet(address) {
        store.account.currentWallet = generateAddress('bostrom', address)
    }


    // Show edit form
    function showEditForm() {
        let _self = event.target

        _self.closest('.item').classList.add('editing')

        // Focus on input
        setTimeout(() => _self.closest('.item').querySelector('.input').focus())
    }


    // Open add address modal
    function openAddAddressModal() {
        store.showAddAddressModal = true

        document.body.classList.add('lock')
    }


    // Open delete address modal
    function openDeleteAddressModal(address) {
        store.currentDeleteAddress = address
        store.showDeleteAddressModal = true

        document.body.classList.add('lock')
    }


    // Event "close add address modal"
    emitter.on('closeAddAddressModal', () => {
        if(store.needReload) {
            // Reload page
            window.location.reload()
        } else {
            store.showAddAddressModal = false

            document.body.classList.remove('lock')
        }
    })


    // Event "close delete address modal"
    emitter.on('closeDeleteAddressModal', () => {
        store.showDeleteAddressModal = false

        document.body.classList.remove('lock')
    })
</script>


<style scoped>
    .connected_addresses
    {
        position: relative;

        padding: 14px 14px 24px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .connected_addresses .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        display: flex;

        margin-bottom: 20px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .connected_addresses .all_btn
    {
        font-size: 14px;
        line-height: 17px;

        display: flex;

        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .all_btn .check
    {
        display: flex;

        width: 20px;
        height: 20px;
        margin-right: 8px;

        border-radius: 7px;
        background: #464646;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .all_btn .check svg
    {
        display: block;

        width: 16px;
        height: 16px;

        transition: opacity .2s linear;

        opacity: 0;
    }

    .connected_addresses .all_btn.active .check svg
    {
        opacity: 1;
    }


    .connected_addresses .list
    {
        display: flex;
        flex-direction: column;
    }


    .connected_addresses .list > *
    {
        position: relative;
    }

    .connected_addresses .list > * + *
    {
        margin-top: 8px;
    }


    .connected_addresses .item
    {
        color: rgba(255,255,255,.7);

        position: relative;

        display: flex;

        min-height: 42px;
        padding: 10px;

        cursor: pointer;
        transition: .2s linear;

        border-radius: 14px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .connected_addresses .item.hide
    {
        display: none;
    }

    .connected_addresses .item > *
    {
        pointer-events: none;
    }


    .connected_addresses .tooltip
    {
        font-size: 12px;
        line-height: 100%;

        position: absolute;
        z-index: 9;
        right: -41px;
        bottom: 100%;

        display: none;

        margin-bottom: 8px;
        padding: 8px;

        border-radius: 8px;
        background: #282828;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    }

    .connected_addresses .tooltip:before
    {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;

        display: block;

        width: 29px;
        height: 7px;
        margin: 0 auto;

        content: '';

        background: url(@/assets/images/tooltip_tail.svg) 50% 0/100% 100% no-repeat;
    }


    .connected_addresses .name
    {
        font-size: 14px;
        line-height: 20px;

        overflow: hidden;

        width: 100%;
        margin-right: auto;
        padding-right: 8px;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .connected_addresses .item > .icon
    {
        color: #eb5757;

        display: none;

        width: 16px;
        min-width: 16px;
        height: 16px;
        margin-left: 8px;
    }


    .connected_addresses .edit_btn
    {
        color: #555;

        display: none;

        width: 16px;
        min-width: 16px;
        height: 16px;
        margin-left: 8px;

        transition: color .2s linear;
        pointer-events: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .edit_btn svg
    {
        display: block;

        width: 100%;
        height: 100%;
    }

    .connected_addresses .edit_btn:hover
    {
        color: #fff;
    }


    .connected_addresses .remove_btn
    {
        color: #555;

        display: none;

        width: 18px;
        min-width: 18px;
        height: 18px;
        margin-left: 8px;

        transition: color .2s linear;
        pointer-events: auto;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .remove_btn svg
    {
        display: block;

        width: 100%;
        height: 100%;
    }

    .connected_addresses .remove_btn:hover
    {
        color: #fff;
    }


    .connected_addresses .item form
    {
        display: none;

        pointer-events: auto;
    }

    .connected_addresses .item.editing form
    {
        display: block;
    }


    .connected_addresses .list > *:hover .item
    {
        color: #fff;

        background: #212121;
    }

    .connected_addresses .list > *:hover .item .remove_btn,
    .connected_addresses .list > *:hover .item .edit_btn
    {
        display: flex;
    }


    .connected_addresses .item.active
    {
        color: #fff;

        cursor: default;

        background: #141414;
        box-shadow: inset 0 0 0 1px #950fff;
    }


    .connected_addresses .item.duplicate
    {
        color: #fff;

        cursor: default;
        pointer-events: none;

        box-shadow: none;
    }

    .connected_addresses .item.duplicate > .icon,
    .connected_addresses .list > *:hover .item.duplicate .tooltip
    {
        display: block;
    }


    .connected_addresses .add_btn
    {
        font-size: 14px;
        line-height: 110%;

        display: flex;

        width: 100%;
        margin-top: 16px;
        padding: 8px;

        transition: background .2s linear;

        border-radius: 10px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .connected_addresses .add_btn .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-left: 8px;
    }

    .connected_addresses .add_btn.disabled
    {
        pointer-events: none;

        opacity: .3;
    }

    .connected_addresses .add_btn:hover
    {
        background: #7700e1;
    }



    @media print, (max-width: 1899px)
    {
        .connected_addresses .title
        {
            font-size: 27px;
            line-height: 33px;
        }
    }

</style>