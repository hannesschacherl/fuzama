<template>
    <div
        class="w-screen h-max min-h-screen bg-[#F3F4F6] dark:bg-gray-900 flex items-center justify-center overflow-x-auto"
    >
        <div
            v-if="isLargeScreen"
            class="w-full h-full p-4 sm:p-12 grid xl:grid-cols-5 xl:grid-rows-2 gap-8 grid-cols-3 grid-rows-[550px,_330px,_330px] sm:grid-rows-[430px,_330px,_330px] md:grid-cols-2 md:grid-rows-2 overflow-x-hidden overflow-y-auto"
        >
            <TimeContainer
                :time="time"
                @update-time="updateTime"
                class="xl:col-span-5 xl:row-span-1 md:col-span-2 sm:row-span-1 col-span-3 row-span-1 w-full h-full overflow-y-auto"
            />
            <!-- <AchievementsContainer class="hidden xl:grid h-full w-full xl:col-span-2 bg-blue-200 col-span-3 row-span-2" /> -->
            <GehenContainer
                :time="time"
                @update-time="updateTime"
                class="xl:col-span-2 xl:row-span-1 md:col-span-1 md:row-span-1 col-span-3 row-span-1"
            />
            <TimeTable
                :time="time"
                @update-time="updateTime"
                class="xl:col-span-3 xl:row-span-1 md:col-span-1 md:row-span-1 col-span-3 row-span-1"
            />
        </div>
        <div v-else class="p-2">
            <div
                class="shadow-xl flex p-4 outline outline-red-800 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
            >
                <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                    />
                </svg>
                <span class="sr-only">Danger</span>
                <div>
                    <span class="font-medium">Application display error:</span>
                    <ul class="mt-1.5 list-disc list-inside">
                        <li>
                            Application is not supported on devices with a
                            screen width of less than 320px.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                        >
                            <div>
                                <div
                                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                                >
                                    <CheckIcon
                                        class="h-6 w-6 text-green-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle
                                        as="h3"
                                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                                        >Errungenschaft
                                        freigeschaltet</DialogTitle
                                    >
                                    <div class="mt-2 flex flex-col gap-4">
                                        <p class="text-sm text-gray-500 dark:text-white text-left">
                                            Sie haben die Errungenschaft
                                            {{ errungenschaft }} freigeschaltet.
                                            Zum speichern als PDF Ihren Namen
                                            eingeben und "Weiter" auswählen.
                                        </p>
                                        <div>
                                            <div class="relative">
                                                <label
                                                    for="name"
                                                    class="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-700 dark:text-white px-1 text-xs font-medium text-gray-900"
                                                    >Name</label
                                                >
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="nameinput"
                                                    v-model="name"
                                                    class="block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                                                    placeholder="Jane Smith"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                            >
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-[#009999] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#33cccc] outline-none sm:col-start-2"
                                    @click="achievementContinue()"
                                >
                                    Weiter
                                </button>
                                <button
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 dark:ring-0 dark:text-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                    @click="open = false"
                                    ref="cancelButtonRef"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/24/outline';

const errungenschaft = ref('');
const errungenschaftID = ref('');

const open = ref(false);

const isLargeScreen = ref(true);
let time = ref({ hh: 0, mm: 0 });

const achievements = ref([
    {
        id: '853e8c5d07e64187814647e094235159',
        name: 'Mitarbeiter des Monats',
        description: 'Komme vor 07:30 Uhr zur Arbeit',
    },
]);

watch(time, (newTime) => {
    if(localStorage.getItem('achievement-mode') === 'on'){
        if (newTime.hh === 7 && newTime.mm < 30) {
            triggerAchievement('853e8c5d07e64187814647e094235159');
        }
    }
});

const triggerAchievement = (id: string) => {
    errungenschaftID.value = achievements.value.find((a) => a.id === id)?.id || '';
    errungenschaft.value = achievements.value.find((a) => a.id === id)?.name || '';
    open.value = true;
};

const achievementContinue = () => {
    if(name.value === ''){
        const nameInput = document.getElementById('nameinput');
        if (nameInput) {            
            nameInput.classList.add('ring-red-500');
            return;
        }
    }
    open.value = false;
    const newPath = `/achievement-${name.value}-${errungenschaftID.value}`;
    navigateTo(`${newPath}`);
};

const updateTime = (newTime: { hh: number; mm: number }) => {
    time.value = newTime;
    console.log('time updated');
};

const checkScreenWidth = () => {
    isLargeScreen.value = window.innerWidth >= 320;
};

const name = ref('');

onMounted(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenWidth);
});
</script>

<style scoped></style>
