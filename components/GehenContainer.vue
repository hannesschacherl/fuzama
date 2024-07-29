<template>
    <div
        class="divide-y divide-gray-200 dark:divide-black overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow w-full h-full"
    >
        <div class="px-4 py-5 sm:px-6 text-4xl flex justify-between dark:text-white">
            Gehen
        </div>
        <div
            class="px-4 py-5 sm:p-6 grid grid-cols-[minmax(160px,_1fr),_5rem] grid-rows-2 gap-2 w-full h-[calc(100%-80px)]"
        >
            <!-- Content goes here -->

            <!-- TIME INPUT -->
            <form class="w-full h-full col-span-1">
                <div class="relative w-full h-full">
                    <div
                        class="absolute bottom-0 right-[0.09rem] end-0 top-0 flex items-center pe-3.5 pointer-events-none"
                    >
                        <svg
                            class="w-9 h-9 bg-[#F3F4F6] dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="time"
                        id="time"
                        class="bg-gray-50 border h-full text-4xl leading-none border-gray-300 text-gray-900 rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        min="00:00"
                        max="23:59"
                        v-model="inputTime"
                        required
                        @keydown.enter="applyTime"
                    />
                </div>
            </form>
            <!-- TIME INPUT -->

            <!-- TIME INPUT BUTTON -->
            <div
                @click="applyTimeRefFunc"
                class="w-full h-full col-span-1 text-black dark:text-white flex items-center justify-center dark:bg-[#009999] bg-[#00c1b6] rounded-lg font-bold cursor-pointer text-xl md:text-4xl"
            >
                Go
            </div>
            <!-- TIME INPUT BUTTON -->

            <!-- TIME OUTPUT -->
            <div
                class="overflow-hidden rounded-lg col-span-2 bg-white dark:bg-gray-700 shadow p-3 flex gap-6 items-center flex-row h-min"
            >
                <img
                    src="./../public/svg/GoWhite.svg"
                    alt="goNow"
                    class="svg-goal hidden dark:block w-10"
                />
                <img
                    src="./../public/svg/GoBlack.svg"
                    alt="goNow"
                    class="svg-goal dark:hidden w-10"
                />
                <div>
                    <dt
                        class="truncate text-2xl font-medium text-gray-500 dark:text-gray-300"
                    >
                        Zeitänderung
                    </dt>
                    <dd
                        class="mt-1 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
                    >
                        {{ goTime }}
                    </dd>
                </div>
            </div>
            <!-- TIME OUTPUT -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const goTime = ref('0h 0m');
const inputTime = ref('00:00')


const props = defineProps({
    time: {
        type: Object as PropType<{ hh: number; mm: number }>,
        required: true,
    },
});

const emit = defineEmits(['update-time']);

const timeValue = ref('');
const confirmedValue = ref(0);
const confirmedValue2 = ref(0);

const applyTimeRef = ref<() => void>();
const applyTimeRefFunc = () => {
    if (applyTimeRef.value) {
        applyTimeRef.value();
    }
};

const applyTime = () => {
    if (
        inputTime.value === '00:00' ||
        inputTime.value === '' ||
        isNaN(parseInt(inputTime.value.split(':')[0])) ||
        isNaN(parseInt(inputTime.value.split(':')[1]))
    ) {
        return;
    }

    confirmedValue.value = parseInt(inputTime.value.split(':')[0]);
    confirmedValue2.value = parseInt(inputTime.value.split(':')[1]);
    computeTimeDelta();
};
function computeTimeDelta() {
    if (confirmedValue.value === 0) {
        return;
    }

    const nowTotalMinutes = confirmedValue.value * 60 + confirmedValue2.value;
    const startTotalMinutes = props.time.hh * 60 + props.time.mm;
    const workedTotalMinutes = nowTotalMinutes - startTotalMinutes;    
    if (workedTotalMinutes <= 4 * 60) {
        refactorDeficit(workedTotalMinutes - 7 * 60);
    } else if (
        4 * 60 < workedTotalMinutes &&
        workedTotalMinutes <= 4 * 60 + 15
    ) {
        refactorDeficit(-(3 * 60));
    } else if (
        4 * 60 + 15 < workedTotalMinutes &&
        workedTotalMinutes <= 6 * 60 + 15
    ) {
        refactorDeficit(workedTotalMinutes - (7 * 60 + 15));
    } else if (
        6 * 60 + 15 < workedTotalMinutes &&
        workedTotalMinutes <= 6 * 60 + 45
    ) {
        refactorDeficit(-60);
    } else if (
        6 * 60 + 45 < workedTotalMinutes &&
        workedTotalMinutes <= 7 * 60 + 45
    ) {
        refactorDeficit(workedTotalMinutes - (7 * 60 + 45));
    } else if (7 * 60 + 45 < workedTotalMinutes) {
        refactorDeficit(workedTotalMinutes - (7 * 60 + 45));
    }
}
const refactorDeficit = (time: number) => {
    console.log(time);
    
    const hours = ref(0);
    const minutes = ref(0);
    const neg = ref(false)
    if(time < 0){
        neg.value = true;
    }

    time = Math.abs(time);
    hours.value = Math.floor(time / 60);
    minutes.value = time % 60;

    if(neg.value){
        goTime.value = `-${hours.value}h ${minutes.value}m`;
        return;
    } else {
        goTime.value = `+${hours.value}h ${minutes.value}m`;
    }
}
applyTimeRef.value = applyTime;

onMounted(() => {
    if (props.time) {
        confirmedValue.value = props.time.hh;
        confirmedValue2.value = props.time.mm;
        timeValue.value = `${props.time.hh
            .toString()
            .padStart(2, '0')}:${props.time.mm.toString().padStart(2, '0')}`;
    }
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    if(localStorage.getItem('startHH') && localStorage.getItem('startMM') && localStorage.getItem('creationDate') === currentDate) {
        props.time.hh = parseInt(localStorage.getItem('startHH')!);
        props.time.mm = parseInt(localStorage.getItem('startMM')!);
    }
});
</script>

<style scoped></style>
