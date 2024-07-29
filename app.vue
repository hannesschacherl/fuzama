<template>
  <div class="overflow-x-hidden judson-regular overflow-y-auto">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Judson:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
});
</script>

<style>
.judson-regular {
  font-family: "Judson", serif;
  font-weight: 400;
  font-style: normal;
}

.judson-bold {
  font-family: "Judson", serif;
  font-weight: 700;
  font-style: normal;
}

.judson-regular-italic {
  font-family: "Judson", serif;
  font-weight: 400;
  font-style: italic;
}

</style>