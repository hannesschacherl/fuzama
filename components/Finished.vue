<template>
    <div v-if="isLargeScreen" class="w-screen h-screen relative bg-[#F3F4F6] dark:bg-gray-900">
        <button
            type="button"
            class="inline-flex z-10 items-center absolute top-2 left-2 gap-x-2 rounded-md bg-[#009999] px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-[#1a8787] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="router.back()"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
            </svg>

            Zurück
        </button>

        <div
            class="dark:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center justify-center text-8xl lg:text-[10rem] text-center"
        >
            <div class="font-bold text-[#009999]">Zeit</div>
            <div>zu</div>
            <div>gehen!</div>
        </div>
        <Firework class="absolute bottom-0 left-[50%] translate-x-[-50%]" />
    </div>
    <div v-else class="p-2 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-screen">
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
</template>

<script setup lang="ts">
import Firework from '~/components/Firework.vue';
const isLargeScreen = ref(true);
const router = useRouter();


function checkScreenWidth() {
    isLargeScreen.value = window.innerWidth >= 320;
};

onMounted(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenWidth);
});
</script>

<style scoped></style>
