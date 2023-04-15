<template>
    <section class="account_info">
        <div class="cont middle">
            <div class="grid row">
                <section class="col">
                    <!-- Networks -->
                    <Networks />
                </section>


                <section class="col_main">
                    <section class="main_data">
                        <!-- Contract address -->
                        <!-- <ContractAddress /> -->

                        <!-- Charts -->
                        <Charts />
                    </section>


                    <!-- Stats -->
                    <Suspense>
                    <Stats />
                    </Suspense>


                    <!-- Validators -->
                    <Validators />


                    <!-- Proposals -->
                    <Proposals />
                </section>


                <section class="col">
                    <!-- Connected addresses -->
                    <ConnectedAddresses />
                </section>
            </div>
        </div>
    </section>
</template>


<script setup>
    // Components
    import Networks from '../components/account/Networks.vue'
    // import ContractAddress from '../components/account/ContractAddress.vue'
    import Charts from '../components/account/Charts.vue'
    import Stats from '../components/account/Stats.vue'
    import Validators from '../components/account/Validators.vue'
    import Proposals from '../components/account/Proposals.vue'
    import ConnectedAddresses from '../components/account/ConnectedAddresses.vue'
</script>


<style scoped>
    .grid
    {
        justify-content: space-between;
    }


    .col
    {
        width: 353px;
        max-width: 100%;
    }


    .col_main
    {
        width: calc(100% - 746px);
    }

    .col_main > * + *
    {
        margin-top: 24px;
    }



    .main_data
    {
        padding: 20px;

        border-radius: 20px;
        background: #0d0d0d;
    }
</style>