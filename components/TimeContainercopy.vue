<template>
    <div
        class="grid gap-2 grid-cols-[1fr,1fr,5rem] grid-rows-5 md:grid-rows-4 md:grid-cols-[minmax(50px,_1fr),5rem,3fr] lg:grid-cols-[minmax(50px,_1fr),5rem,4fr] lg:grid-rows-3 w-full h-full bg-[#d9d9d9] p-6 rounded-2xl"
    >
        <div
            class="w-full h-full col-span-3 row-start-1 col-start-1 flex items-center p-2 text-7xl"
        >
            Heute
        </div>
        <div
            class="h-full w-full flex items-center justify-center lg:col-start-1 lg:row-start-2 md:col-start-1 md:row-start-2"
        >
            <input
                v-model="inputValue"
                type="text"
                id="inputField"
                placeholder="HH"
                class="shadow appearance-none outline-none bg-[#9d9d9d] rounded-lg w-full h-full py-2 px-3 text-black text-4xl placeholder:text-gray-300 font-bold text-center leading-tight focus:-none focus:shadow-"
            />
        </div>
        <div
            class="h-full w-full flex items-center justify-center lg:col-start-1 lg:row-start-3 md:col-start-1 md:row-start-3"
        >
            <input
                v-model="inputValue2"
                type="text"
                id="inputField"
                placeholder="MM"
                class="shadow appearance-none bg-[#9d9d9d] rounded-lg w-full h-full py-2 px-3 text-black text-4xl placeholder:text-gray-300 font-bold text-center leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div
            @click="applyTimeRefFunc()"
            class="w-full h-full flex items-center justify-center md:col-start-2 md:row-start-2 md:row-span-2 lg:col-start-2 lg:row-start-2 lg:row-span-2 bg-[#009999] rounded-lg font-bold cursor-pointer text-xl md:text-4xl"
        >
            Go
        </div>
        <div
            class="w-full h-full md:col-start-1 md:row-start-4 md:col-span-3 lg:col-span-1 lg:col-start-3 lg:row-start-2 sm:row-span-1 sm:col-span-3 row-span-1 col-span-3"
        >
            <div class="bg-[#9d9d9d] rounded-md w-full h-full flex items-center px-2">
                <div class="Progress"></div>
            </div>
        </div>
        <div
            class="w-full h-full row-span-2 md:pb-0 lg:pb-2 grid grid-cols-1 grid-rows-2 col-span-3 sm:grid-cols-2 sm:grid-rows-1 sm:col-span-3 md:col-span-1 md:grid-cols-1 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 md:col-start-3 md:row-start-2 md:row-span-2 lg:col-start-3 lg:row-start-3"
        >
            <div
                class="w-full h-full bg-[#9d9d9d] rounded-lg flex items-center overflow-hidden justify-between"
            >
                <img
                    src="./../assets/svg/goal.svg"
                    alt="goal"
                    class="svg-goal p-2"
                />
                <div v-if="endHH !== -1" class="flex text-4xl font-bold">
                    <div>{{ endHH }}</div>
                    :
                    <div>{{ endMM }}</div>
                </div>
                <div></div>
            </div>

            <div
                class="w-full h-full bg-[#9d9d9d] rounded-lg flex items-center overflow-hidden justify-between"
            >
                <img
                    src="./../assets/svg/go-to-work-svgrepo-com.svg"
                    alt="goal"
                    class="svg-goal p-2"
                />
                <div class="flex text-4xl">
                    <div>{{ timeDeficit }}</div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const props = defineProps({
  time: {
    type: Object as PropType<{ hh: number; mm: number }>,
    required: true,
  },
});

const emit = defineEmits(['update-time']);

const setProgress = (value: {hh: number, mm: number}) => {
  emit('update-time', value);
};
const inputValue = ref('');
const inputValue2 = ref('');

const confirmedValue = ref(0);
const confirmedValue2 = ref(0);

const endHH = ref(-1);
const endMM = ref(-1);

const timeDeficit = ref('');

const applyTimeRef = ref();
const applyTimeRefFunc = () => {
    if(applyTimeRef.value){
        applyTimeRef.value();
    }
}

onMounted(() => {
    let buttonClicked = false;
    const inputHH = ref (-1)
    const inputMM = ref (-1)
    const applyTime = () => {
    if (
        inputValue.value === '' ||
        inputValue2.value === '' ||
        isNaN(parseInt(inputValue.value)) ||
        isNaN(parseInt(inputValue2.value)) ||
        parseInt(inputValue.value) < 0 ||
        parseInt(inputValue.value) > 23 ||
        parseInt(inputValue2.value) < 0 ||
        parseInt(inputValue2.value) > 59
    ) {    
        return;
    }
    confirmedValue.value = parseInt(inputValue.value);
    confirmedValue2.value = parseInt(inputValue2.value);
    setProgress({hh: confirmedValue.value, mm: confirmedValue2.value});
    inputHH.value = parseInt(inputValue.value);
    inputMM.value = parseInt(inputValue2.value);
    buttonClicked = true;
    computeEndTime(parseInt(inputValue.value), parseInt(inputValue2.value));
    getDelta();
};
applyTimeRef.value = applyTime;
const computeEndTime = (hh: number, mm: number) => {
    const startTotalMinutes = hh * 60 + mm;
    const endTotalMinutes = startTotalMinutes + 7 * 60 + 45;

    endHH.value = Math.floor(endTotalMinutes / 60) % 24;
    endMM.value = endTotalMinutes % 60;
    const now = new Date();
    updateProgressBar(
        ((now.getHours() * 60 + now.getMinutes() - startTotalMinutes) /
            (7 * 60 + 45)) *
            100
    );
    
};
const getDelta = () => {    
    if (
        confirmedValue.value === -1
    ) {
        return;
    }
    
    const now = new Date();
    const nowTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const startTotalMinutes = confirmedValue.value * 60 + confirmedValue2.value;
    const workedTotalMinutes = nowTotalMinutes - startTotalMinutes;
    if(workedTotalMinutes <= (4*60)){
        refactorDeficit(workedTotalMinutes - (7*60));
    } else if((4*60) < workedTotalMinutes && workedTotalMinutes <= (4*60 + 15)){
        refactorDeficit(-(3*60))
    } else if((4*60 + 15) < workedTotalMinutes && workedTotalMinutes <= (6*60 + 15)){
        refactorDeficit((workedTotalMinutes) - (7*60 + 15));
    } else if((6*60 + 15) < workedTotalMinutes && workedTotalMinutes <= (6*60 + 45)){
        refactorDeficit(-60)
    } else if((6*60 + 45) < workedTotalMinutes && workedTotalMinutes <= (7*60 + 45)){
        refactorDeficit((workedTotalMinutes ) - (7*60 + 45));
    } else if((7*60 + 45) < workedTotalMinutes){
        refactorDeficit(workedTotalMinutes - (7*60 + 45));
    }
    setTimeout(() => getDelta(), 10000);
}
const refactorDeficit = (time: number) => {    
    const hours = ref(0);
    if(time < 0){
        hours.value = Math.ceil(time / 60);
    } else {
        hours.value = Math.floor(time / 60);
    }
    const minutes = Math.abs(time % 60);
    timeDeficit.value = `${hours.value}h ${minutes}m`;
}

function updateProgressBar(progress: number): void {
  const progressBar = document.querySelector('.Progress') as HTMLElement;

  if (!progressBar) return;

  progress = Math.max(0, Math.min(100, progress));

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
  progressBar.style.visibility = 'visible';
  progressBar.style.width = `${progress}%`;
  progressBar.style.backgroundColor = color;
}
const initProgressBar = () => {
    const progressbar = document.querySelector('.Progress') as HTMLElement;
    if (!progressbar) return;
    progressbar.style.width = '0%';
    progressbar.style.visibility = 'hidden';    
}
initProgressBar();
})
</script>

<style scoped>
.svg-goal {
    height: 80%;
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
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;
  transition-property: width, background-color;
}

</style>
