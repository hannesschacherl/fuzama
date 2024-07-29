<template>
    <div class="grid grid-rows-4 gap-2 w-full h-full bg-[#D9D9D9] p-6 rounded-md">
        <div class="row-span-1 flex items-center w-full h-full text-8xl pb-4">
            Gehen
        </div>
        <div class="grid grid-cols-2 grid-rows-1 gap-6 w-full h-full">
            <div class="col-span-1 row-span-1 h-full w-full flex items-center justify-center">
                <input
                v-model="inputValue"
                type="text"
                id="inputField"
                placeholder="HH"
                class="shadow appearance-none bg-[#9d9d9d] rounded w-[100%] h-[100%] py-2 px-3 text-black text-4xl placeholder:text-gray-300 font-bold text-center leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div class="col-span-1 row-span-1 h-full w-full flex items-center justify-center">
                <input
                v-model="inputValue"
                type="text"
                id="inputField"
                placeholder="MM"
                class="shadow appearance-none bg-[#9d9d9d] rounded w-[100%] h-[100%] py-2 px-3 text-black text-4xl placeholder:text-gray-300 font-bold text-center leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
        <div class="col-span-1 row-span-1 h-full w-full flex items-center py-1">
            <div class="flex items-center justify-center w-full h-full bg-[#009999] rounded font-bold cursor-pointer text-xl md:text-4xl">Go</div>
        </div>
        <div class="w-full h-full bg-[#9d9d9d] rounded flex items-center justify-center text-4xl">
            {{timeDiff}}
        </div>

    </div>
</template>

<script setup lang="ts">
const timeDiff = ref("-4h 30m");
</script>

<style scoped>

</style>