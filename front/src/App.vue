<script setup lang="ts">
import Bench from "./components/Bench.vue";
</script>

<template>
  <div class="background bg-gray-900 min-h-screen pb-3">
    <Bench />
  </div>
</template>

<style>
.background {
  background: radial-gradient(ellipse at top, rgb(249 115 22), transparent),
    radial-gradient(ellipse at bottom, rgb(217 70 239), transparent);
}
</style>
