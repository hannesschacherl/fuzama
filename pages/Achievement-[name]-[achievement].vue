<template>
    <div class="w-screen min-h-[550px] h-screen">
        <div
            class="h-full w-full overflow-y-auto rounded-lg bg-gray-600 flex items-center justify-center gap-8"
        >
            <div
                v-if="achievementValid"
                class="flex flex-col items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12"
            >
                <h3
                    class="text-4xl sm:text-4xl md:text-6xl lg:text-8xl font-semibold leading-6 text-[#009999] text-center"
                >
                    Achievement
                </h3>
                <div
                    class="container mx-auto sm:px-6 lg:px-8 text-white text-xl sm:text-xl md:text-3xl lg:text-5xl text-center"
                >
                    {{ name }} hat einen Erfolg freigeschaltet!
                </div>
                <div
                    class="relative block sm:w-full md:w-full lg:w-2/3 xl:w-2/3 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
                >
                    <img
                        v-if="achievement === '853e8c5d07e64187814647e094235159'"
                        src="./../public/svg/Achievements/853e8c5d07e64187814647e094235159.svg"
                        alt="Achievement"
                        class="w-1/5 mx-auto"
                    />
                    <span
                        class="mt-2 block text-2xl font-semibold text-white"
                        >{{
                            achievements.find(
                                (a) =>
                                    (a.id) ===
                                    (
                                        Array.isArray(achievement)
                                            ? achievement[0]
                                            : achievement
                                    ),
                            )?.name
                        }}
                    </span>
                    <span
                        class="mt-2 block text-xl text-white"
                        >{{
                            achievements.find(
                                (a) =>
                                    a.id ===
                                    (Array.isArray(achievement)
                                        ? achievement[0]
                                        : achievement),
                            )?.description
                        }}
                    </span>
                </div>
            </div>
            <div
                v-else
                class="text-center flex flex-col justify-center items-center"
            >
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M39.4285 67.9999L61.1428 46.2856M61.1428 67.9999L39.4285 46.2856"
                        stroke="white"
                        stroke-width="10"
                        stroke-linecap="round"
                    />
                    <path
                        d="M91.6666 49.1581C91.6666 38.1899 91.6666 32.7058 88.4603 29.1411C88.1657 28.8132 87.8537 28.5012 87.5257 28.2062C83.9607 25.0002 78.477 25.0002 67.5087 25.0002H65.9516C61.1445 25.0002 58.7412 25.0002 56.5016 24.3617C55.2712 24.011 54.0849 23.5198 52.967 22.8978C50.932 21.7655 49.2324 20.0659 45.8332 16.6668L43.5403 14.3741C42.4012 13.2349 41.8316 12.6652 41.233 12.169C38.6521 10.0295 35.486 8.71804 32.1481 8.40591C31.3739 8.3335 30.5683 8.3335 28.9572 8.3335C25.28 8.3335 23.4414 8.3335 21.9099 8.62245C15.1679 9.8945 9.89425 15.1681 8.62221 21.9101C8.33325 23.4416 8.33325 25.2802 8.33325 28.9575M91.6303 66.6668C91.4807 76.9985 90.7145 82.8556 86.7849 86.7851C81.9037 91.6668 74.0466 91.6668 58.3332 91.6668H41.6666C25.9531 91.6668 18.0964 91.6668 13.2148 86.7851C8.33325 81.9039 8.33325 74.0468 8.33325 58.3335V45.8335"
                        stroke="white"
                        stroke-width="10"
                        stroke-linecap="round"
                    />
                </svg>

                <h3
                    class="mt-2 text-md font-semibold text-white sm:text-lg md:text-xl lg:text-2xl"
                >
                    Achievement nicht gefunden
                </h3>
                <p
                    class="mt-1 text-md text-gray-400 sm:text-lg md:text-xl lg:text-2xl"
                >
                    Diese Errungenschaft ist nicht in der Datenbank vorhanden.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const achievement = route.params.achievement;
const name = route.params.name;

const achievements = ref([
    {
        id: '853e8c5d07e64187814647e094235159',
        name: 'Mitarbeiter des Monats',
        description: 'Komme vor 07:30 Uhr zur Arbeit',
    },
]);

const achievementValid = ref(false);

if (
    achievements.value.find(
        (a) =>
            a.id ===
            (Array.isArray(achievement) ? achievement[0] : achievement),
    )
) {
    achievementValid.value = true;
}
</script>

<style scoped></style>
