<template>
    <div
        class="divide-y divide-gray-200 dark:divide-black dark:text-white overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow w-full h-full"
    >
        <div class="px-4 py-5 sm:px-6 text-4xl flex justify-between">
            <div>Tabelle</div>
        </div>
        <div class="w-full h-[260px] overflow-y-auto overflow-x-hidden">
            <!-- Content goes here -->
            <div
                v-if="!isNarrowScreen"
                v-for="(time, index) in times"
                :key="index"
                class="w-full py-3 text-2xl lg:text-3xl xl:text-4xl even:bg-gray-300 dark:even:bg-gray-700 grid grid-cols-3 flex-row justify-between"
            >
                <div class="w-full h-full text-center">{{ time.time }}</div>
                <div class="w-full h-full text-center">
                    {{ time.worked }}
                </div>
                <div class="w-full h-full text-center">{{ time.change }}</div>
            </div>
            <div
                v-else
                v-for="(time, index2) in times"
                :key="index2"
                class="w-full py-3 text-2xl lg:text-3xl xl:text-4xl even:bg-gray-300 dark:even:bg-gray-700 grid grid-cols-2 flex-row justify-between"
            >
                <div class="w-full h-full text-center">{{ time.time }}</div>
                <div class="w-full h-full text-center">{{ time.change }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type PropType } from 'vue';

const goTime = ref('0h 0m');
const times = ref(
    Array.from({ length: 37 }, () => ({ time: '', worked: '', change: '' })),
);
times.value[0].time = 'Zeit';
times.value[0].worked = 'Gearbeitet';
times.value[0].change = 'Gehen';

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

const computeTable = () => {
    const startTime = props.time.hh * 60 + props.time.mm;

    for (let i = 1; i < times.value.length; i++) {
        const currentTime = startTime + (i - 1) * 15;

        const workedTime = currentTime - startTime;

        times.value[i].time = `${Math.floor(currentTime / 60)
            .toString()
            .padStart(2, '0')}:${(currentTime % 60)
            .toString()
            .padStart(2, '0')}`;
        times.value[i].worked = `${Math.floor(workedTime / 60)}h ${
            workedTime % 60
        }m`;

        if (workedTime <= 4 * 60) {
            times.value[i].change = refactorDeficit(workedTime - 7 * 60);
        } else if (4 * 60 < workedTime && workedTime <= 4 * 60 + 15) {
            times.value[i].change = refactorDeficit(-(3 * 60));
        } else if (4 * 60 + 15 < workedTime && workedTime <= 6 * 60 + 15) {
            times.value[i].change = refactorDeficit(workedTime - (7 * 60 + 15));
        } else if (6 * 60 + 15 < workedTime && workedTime <= 6 * 60 + 45) {
            times.value[i].change = refactorDeficit(-60);
        } else if (6 * 60 + 45 < workedTime && workedTime <= 7 * 60 + 45) {
            times.value[i].change = refactorDeficit(workedTime - (7 * 60 + 45));
        } else if (7 * 60 + 45 < workedTime) {
            times.value[i].change = refactorDeficit(workedTime - (7 * 60 + 45));
        }
    }
};

watch(
    () => [props.time.hh, props.time.mm],
    (newValues, oldValues) => {
        computeTable();
    },
    { immediate: true },
);

function refactorDeficit(time: number) {
    const hours = Math.floor(Math.abs(time) / 60);
    const minutes = Math.abs(time) % 60;
    const sign = time < 0 ? '-' : '+';
    return `${sign}${hours}h ${minutes}m`;
}
const screenWidth = ref(0);
const isNarrowScreen = computed(() => screenWidth.value < 350);

onMounted(() => {
    if (props.time) {
        confirmedValue.value = props.time.hh;
        confirmedValue2.value = props.time.mm;
        timeValue.value = `${props.time.hh
            .toString()
            .padStart(2, '0')}:${props.time.mm.toString().padStart(2, '0')}`;
        computeTable();
    }
    screenWidth.value = window.innerWidth;
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    if(localStorage.getItem('startHH') && localStorage.getItem('startMM') && localStorage.getItem('creationDate') === currentDate) {        
        confirmedValue.value = parseInt(localStorage.getItem('startHH')!);
        confirmedValue2.value = parseInt(localStorage.getItem('startMM')!);
        timeValue.value = `${localStorage.getItem('startHH')!.padStart(2, '0')}:${localStorage.getItem('startMM')!.padStart(2, '0')}`;
        props.time.hh = parseInt(localStorage.getItem('startHH')!);
        props.time.mm = parseInt(localStorage.getItem('startMM')!);       
    }


    const isNarrowScreen = computed(() => screenWidth.value < 350);
    window.addEventListener('resize', updateScreenWidth);
});
const updateScreenWidth = () => {
        screenWidth.value = window.innerWidth;
    };
onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
});
</script>

<style scoped></style>
