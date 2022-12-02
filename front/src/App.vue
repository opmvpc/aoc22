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
  background: radial-gradient(ellipse at top, rgb(20 184 166), rgb(17 24 39)),
    radial-gradient(ellipse at bottom, rgb(29 78 216), rgb(17 24 39));
}
</style>
