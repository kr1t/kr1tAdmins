<script setup>
const textQr = ref('text')
const textBarcode = ref('text')

const { useMakeImage } = useApiUtils()
const { makeQr, makeBarcode } = useMakeImage()
</script>

<template>
    <line-liff name="arm">
        <div class="flex flex-wrap mt-5">
            <div class="w-1/2 p-4">
                <div
                    class=" bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 h-full">
                    <div :class="$style.imgHeight">
                        <img :src="makeQr(textQr)">
                    </div>

                    <div class="border-gray-200 border p-4 rounded-lg">
                        {{ makeQr(textQr) }}
                    </div>

                    <input v-model="textQr" type="text"
                        class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                </div>
            </div>
            <div class="w-1/2 p-4 ">
                <div
                    class="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 h-full">
                    <div :class="$style.imgHeight" class="flex items-center justify-center">
                        <img :src="makeBarcode(textBarcode)">
                    </div>

                    <div class="border-gray-200 border p-4 rounded-lg ">
                        {{ makeBarcode(textBarcode) }}
                    </div>

                    <input v-model="textBarcode" type="text"
                        class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                </div>
            </div>
        </div>
    </line-liff>
</template>

<style module>
.imgHeight {
    height: 300px;
    text-align: center;
}

.imgHeight img {
    display: inline-block;
}
</style>

<route lang="yaml">
meta:
  middleware: [auth]
</route>

