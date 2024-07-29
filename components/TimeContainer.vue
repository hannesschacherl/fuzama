<template>
    <div
        class="divide-y divide-gray-200 dark:divide-black dark:text-white overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow w-full h-full"
    >
        <div class="px-4 py-5 sm:px-6 text-4xl flex justify-between">
            <div>Heute</div>
            <div class="flex">
                <TrophyButton />
                <DarkModeButton />
            </div>
        </div>
        <div
            class="px-4 py-5 sm:p-6 grid grid-cols-[1fr,_5rem] grid-rows-[85px,_100px_100px] md:grid-cols-[160px,_5rem,_1fr] md:grid-rows-2 gap-2 w-full h-[calc(100%-81.5px)] overflow-hidden"
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
                        class="bg-gray-50 no-time-picker-icon border h-full text-4xl leading-none border-gray-300 text-gray-900 rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        min="00:00"
                        max="23:59"
                        v-model="timeValue"
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

            <!-- PROGRESS BAR -->
            <div
                class="w-full h-full flex flex-col justify-center col-start-1 row-start-2 col-span-2 md:col-span-1 md:col-start-3 md:row-start-1"
            >
                <div class="flex justify-between mb-1">
                    <span
                        class="text-2xl font-medium text-black dark:text-white"
                        >Fortschritt</span
                    >
                    <span class="text-lg font-medium text-black dark:text-white"
                        >{{ Math.round(parseInt(progressBarWidth)) }}%</span
                    >
                </div>
                <div
                    class="w-full bg-[#F3F4F6] rounded-lg h-12 dark:bg-gray-700"
                >
                    <div
                        class="dark:bg-[#009999] bg-[#00c1b6] h-12 rounded-lg ProgressBar"
                        :style="{ width: progressBarWidth }"
                    ></div>
                </div>
            </div>
            <!-- PROGRESS BAR -->

            <!-- STATS -->
            <div class="w-full h-full col-span-2 md:col-span-3">
                <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div
                        v-for="item in stats"
                        :key="item.name"
                        class="overflow-hidden rounded-lg bg-white dark:bg-gray-700 shadow p-3 flex gap-6 items-center flex-row h-min"
                    >
                        <img
                            v-if="item.name == 'Endzeit'"
                            src="./../public/svg/CheckWhite.svg"
                            alt="goal"
                            class="svg-goal hidden dark:block"
                        />
                        <img
                            v-if="item.name == 'Jetzt gehen'"
                            src="./../public/svg/GoWhite.svg"
                            alt="goNow"
                            class="svg-goal hidden dark:block"
                        />
                        <img
                            v-if="item.name == 'Endzeit'"
                            src="./../public/svg/CheckBlack.svg"
                            alt="goal"
                            class="svg-goal dark:hidden"
                        />
                        <img
                            v-if="item.name == 'Jetzt gehen'"
                            src="./../public/svg/GoBlack.svg"
                            alt="goNow"
                            class="svg-goal dark:hidden"
                        />
                        <div>
                            <dt
                                class="truncate text-2xl font-medium text-gray-500 dark:text-gray-300"
                            >
                                {{ item.name }}
                            </dt>
                            <dd
                                class="mt-1 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
                            >
                                {{ item.stat }}
                            </dd>
                        </div>
                    </div>
                </dl>
            </div>
            <!-- STATS -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Define the type for the stats array items
interface StatItem {
    name: string;
    stat: string;
}

// Initialize stats with the defined type
const stats = ref<StatItem[]>([
    { name: 'Endzeit', stat: '--:--' },
    { name: 'Jetzt gehen', stat: '0h 0m' },
]);

const props = defineProps({
    time: {
        type: Object as PropType<{ hh: number; mm: number }>,
        required: true,
    },
});

const emit = defineEmits(['update-time']);

const setProgress = (value: { hh: number; mm: number }) => {
    emit('update-time', value);
};

const timeValue = ref('');
const confirmedValue = ref(0);
const confirmedValue2 = ref(0);

const progressBarWidth = ref('0%');

const applyTimeRef = ref<() => void>();
const applyTimeRefFunc = () => {
    if (applyTimeRef.value) {
        applyTimeRef.value();
    }
};

const updateProgressBar = (): void => {
    if (confirmedValue.value === 0 && confirmedValue2.value === 0) {
        return;
    }
    const startTimeInMinutes =
        confirmedValue.value * 60 + confirmedValue2.value;
    const endTimeInMinutes = startTimeInMinutes + 7 * 60 + 45;

    const currentDate = new Date();
    const currentTimeInMinutes =
        currentDate.getHours() * 60 + currentDate.getMinutes();

    let progress = 0;

    if (
        currentTimeInMinutes >= startTimeInMinutes &&
        currentTimeInMinutes <= endTimeInMinutes
    ) {
        const elapsedTime = currentTimeInMinutes - startTimeInMinutes;
        const totalTime = endTimeInMinutes - startTimeInMinutes;
        progress = (elapsedTime / totalTime) * 100;
    } else if (currentTimeInMinutes > endTimeInMinutes) {
        progress = 100;
    }

    let color: string;
    if (progress <= 5) {
        color = '#f63a0f';
    } else if (progress <= 25) {
        color = '#f27011';
    } else if (progress <= 50) {
        color = '#f2b01e';
    } else if (progress <= 75) {
        color = '#f2d31b';
    } else {
        color = '#86e01e';
    }
    const progressBar = document.querySelector('.ProgressBar') as HTMLElement;
    if (progressBar) {
        progressBar.style.backgroundColor = color;
    }
    progressBarWidth.value = `${progress.toFixed(2)}%`;
};

const applyTime = () => {
    if (
        timeValue.value === '' ||
        isNaN(parseInt(timeValue.value.split(':')[0])) ||
        isNaN(parseInt(timeValue.value.split(':')[1]))
    ) {
        return;
    }

    confirmedValue.value = parseInt(timeValue.value.split(':')[0]);
    confirmedValue2.value = parseInt(timeValue.value.split(':')[1]);
    setProgress({ hh: confirmedValue.value, mm: confirmedValue2.value });

    updateProgressBar();
    computeEndTime(confirmedValue.value, confirmedValue2.value);
    computeTimeDelta();

    // Store values in local storage
    const currentDate = new Date().toISOString().split('T')[0]; // format as YYYY-MM-DD
    localStorage.setItem('startHH', confirmedValue.value.toString());
    localStorage.setItem('startMM', confirmedValue2.value.toString());
    localStorage.setItem('creationDate', currentDate);
};

function computeEndTime(hh: number, mm: number) {
    const startTotalMinutes = hh * 60 + mm;
    const endTotalMinutes = startTotalMinutes + 7 * 60 + 45;
    stats.value[0].stat = `${Math.floor(endTotalMinutes / 60) % 24}:${(
        endTotalMinutes % 60
    )
        .toString()
        .padStart(2, '0')}`;
}

function computeTimeDelta() {
    if (confirmedValue.value === 0) {
        return;
    }

    const now = new Date();
    const nowTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const startTotalMinutes = confirmedValue.value * 60 + confirmedValue2.value;
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
    setTimeout(() => computeTimeDelta(), 1000);
}

const refactorDeficit = (time: number) => {
    const hours = ref(0);
    const minutes = ref(0);
    const neg = ref(false);
    if (time < 0) {
        neg.value = true;
    }

    time = Math.abs(time);
    hours.value = Math.floor(time / 60);
    minutes.value = time % 60;

    if (neg.value) {
        stats.value[1].stat = `-${hours.value}h ${minutes.value}m`;
        return;
    } else {
        stats.value[1].stat = `+${hours.value}h ${minutes.value}m`;
    }
};
applyTimeRef.value = applyTime;

const checkLocalStorage = () => {
    const storedStartHH = localStorage.getItem('startHH');
    const storedStartMM = localStorage.getItem('startMM');
    const storedDate = localStorage.getItem('creationDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (storedStartHH && storedStartMM && storedDate === currentDate) {
        confirmedValue.value = parseInt(storedStartHH, 10);
        confirmedValue2.value = parseInt(storedStartMM, 10);
        timeValue.value = `${confirmedValue.value
            .toString()
            .padStart(2, '0')}:${confirmedValue2.value
            .toString()
            .padStart(2, '0')}`;
        updateProgressBar();
        computeEndTime(confirmedValue.value, confirmedValue2.value);
        computeTimeDelta();
    } else {
        localStorage.removeItem('startHH');
        localStorage.removeItem('startMM');
        localStorage.removeItem('creationDate');
    }
};

onMounted(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('creationDate');

    if (storedDate !== currentDate) {
        localStorage.removeItem('startHH');
        localStorage.removeItem('startMM');
        localStorage.removeItem('creationDate');
    } else {
        checkLocalStorage();
    }
});
</script>

<style scoped>
.svg-goal {
    height: 3rem;
    width: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    flex-shrink: 1;
}
.Progress {
    visibility: hidden;
    height: 70%;
    border-radius: 0.2rem;
    outline: none;
    border: none;
    width: 95%;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.05)
    );
    transition: 0.4s linear;
    transition-property: width, background-color;
}
/* Entfernt das Zeitpicker-Icon in Webkit-basierten Browsern (z.B. Chrome, Safari) */
.no-time-picker-icon::-webkit-calendar-picker-indicator {
    display: none;
}

/* Entfernt das Zeitpicker-Icon in Firefox */
.no-time-picker-icon::-moz-focus-inner {
    border: 0;
}
</style>
