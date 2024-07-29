<template>
    <div>
        <button
            id="achievement-toggle"
            type="button"
            class="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 outline-none focus:outline-none rounded-lg text-sm p-2.5"
        >
        <div class="group dark:text-white">
                <div class="dark:bg-transparent">

                    <svg
                        id="achievement-toggle-off"
                        class="hidden w-5 h-5 dark:bg-transparent"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                            <path
                                d="M71.8563 90.6127H27.9188C26.1907 90.6127 24.7938 92.0127 24.7938 93.7377C24.7938 95.4627 26.1907 96.8627 27.9188 96.8627H71.8563C73.5813 96.8627 74.9813 95.4627 74.9813 93.7377C74.9813 92.0127 73.5845 90.6127 71.8563 90.6127ZM99.347 11.8783C99.0501 10.4252 97.7688 9.38145 96.2876 9.38145H80.9907V6.2627C80.9907 4.5377 79.5907 3.1377 77.8657 3.1377H21.6626C19.9345 3.1377 18.5376 4.5377 18.5376 6.2627V9.38145H3.71571C2.23446 9.38145 0.950082 10.4252 0.653207 11.8783C0.562582 12.3283 -1.53429 23.2783 4.55008 30.7408C8.05008 35.0314 13.397 37.2752 20.4188 37.4752C24.422 49.3064 34.4876 58.0689 46.6095 59.3752V81.1439H37.2563C35.5282 81.1439 34.1313 82.5439 34.1313 84.2689C34.1313 85.9939 35.5282 87.3939 37.2563 87.3939H62.5188C64.2438 87.3939 65.6438 85.9939 65.6438 84.2689C65.6438 82.5439 64.2438 81.1439 62.5188 81.1439H52.8595V59.3783C65.0032 58.0971 75.0907 49.3377 79.1032 37.4939C86.3626 37.3877 91.8688 35.1252 95.4501 30.7377C101.534 23.2752 99.4376 12.3283 99.347 11.8752V11.8783ZM9.41571 26.8127C6.65008 23.4439 6.36883 18.4721 6.51258 15.6314H18.5407V26.1814C18.5407 27.8689 18.697 29.5189 18.9251 31.1408C14.6595 30.7439 11.4563 29.3033 9.41571 26.8127ZM74.7407 26.1814C74.7407 41.1314 63.5376 53.2971 49.7688 53.2971C35.9938 53.2971 24.7876 41.1314 24.7876 26.1814V9.3877H74.7438L74.7407 26.1814ZM90.5876 26.8127C88.472 29.3939 85.1157 30.8627 80.6001 31.1939C80.8345 29.5564 80.9907 27.8908 80.9907 26.1814V15.6314H93.4907C93.6313 18.4752 93.3532 23.4439 90.5845 26.8127H90.5876Z"
                                class="fill-current"
                            />
                        <defs>
                            <clipPath id="clip0_47_30">
                                <rect width="100" height="100" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div class="group dark:text-white">
                <div class="dark:bg-transparent">

                    <svg
                        id="achievement-toggle-on"
                        class="hidden w-5 h-5 dark:bg-transparent"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_47_30)">
                            <path
                                d="M71.8563 90.6127H27.9188C26.1907 90.6127 24.7938 92.0127 24.7938 93.7377C24.7938 95.4627 26.1907 96.8627 27.9188 96.8627H71.8563C73.5813 96.8627 74.9813 95.4627 74.9813 93.7377C74.9813 92.0127 73.5845 90.6127 71.8563 90.6127ZM99.347 11.8783C99.0501 10.4252 97.7688 9.38145 96.2876 9.38145H80.9907V6.2627C80.9907 4.5377 79.5907 3.1377 77.8657 3.1377H21.6626C19.9345 3.1377 18.5376 4.5377 18.5376 6.2627V9.38145H3.71571C2.23446 9.38145 0.950082 10.4252 0.653207 11.8783C0.562582 12.3283 -1.53429 23.2783 4.55008 30.7408C8.05008 35.0314 13.397 37.2752 20.4188 37.4752C24.422 49.3064 34.4876 58.0689 46.6095 59.3752V81.1439H37.2563C35.5282 81.1439 34.1313 82.5439 34.1313 84.2689C34.1313 85.9939 35.5282 87.3939 37.2563 87.3939H62.5188C64.2438 87.3939 65.6438 85.9939 65.6438 84.2689C65.6438 82.5439 64.2438 81.1439 62.5188 81.1439H52.8595V59.3783C65.0032 58.0971 75.0907 49.3377 79.1032 37.4939C86.3626 37.3877 91.8688 35.1252 95.4501 30.7377C101.534 23.2752 99.4376 12.3283 99.347 11.8752V11.8783ZM9.41571 26.8127C6.65008 23.4439 6.36883 18.4721 6.51258 15.6314H18.5407V26.1814C18.5407 27.8689 18.697 29.5189 18.9251 31.1408C14.6595 30.7439 11.4563 29.3033 9.41571 26.8127ZM74.7407 26.1814C74.7407 41.1314 63.5376 53.2971 49.7688 53.2971C35.9938 53.2971 24.7876 41.1314 24.7876 26.1814V9.3877H74.7438L74.7407 26.1814ZM90.5876 26.8127C88.472 29.3939 85.1157 30.8627 80.6001 31.1939C80.8345 29.5564 80.9907 27.8908 80.9907 26.1814V15.6314H93.4907C93.6313 18.4752 93.3532 23.4439 90.5845 26.8127H90.5876Z"
                                class="fill-current"
                            />
                            <path
                                d="M5 95L95 5"
                                class="stroke-red-500"
                                stroke-width="10"
                                stroke-linecap="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_47_30">
                                <rect width="100" height="100" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    const achievementToggleOn = document.getElementById(
        'achievement-toggle-on',
    );
    const achievementToggleOff = document.getElementById(
        'achievement-toggle-off',
    );

    // Initialize the correct icon display based on previous settings
    if (localStorage.getItem('achievement-mode') === 'on') {
        if (achievementToggleOn) {
            achievementToggleOn.classList.remove('hidden');
        }
    } else {
        if (achievementToggleOff) {
            achievementToggleOff.classList.remove('hidden');
        }
    }

    const achievementToggleBtn = document.getElementById('achievement-toggle');

    if (achievementToggleBtn && achievementToggleOn && achievementToggleOff) {
        achievementToggleBtn.addEventListener('click', function () {
            // toggle icons inside button
            achievementToggleOn.classList.toggle('hidden');
            achievementToggleOff.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('achievement-mode')) {
                if (localStorage.getItem('achievement-mode') === 'off') {
                    document.documentElement.classList.add('achievement');
                    localStorage.setItem('achievement-mode', 'on');
                } else {
                    document.documentElement.classList.remove('achievement');
                    localStorage.setItem('achievement-mode', 'off');
                }
            } else {
                if (
                    document.documentElement.classList.contains('achievement')
                ) {
                    document.documentElement.classList.remove('achievement');
                    localStorage.setItem('achievement-mode', 'off');
                } else {
                    document.documentElement.classList.add('achievement');
                    localStorage.setItem('achievement-mode', 'on');
                }
            }
        });
    }
});
</script>

<style scoped></style>
