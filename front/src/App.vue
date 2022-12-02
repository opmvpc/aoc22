<script setup lang="ts">
import Bench from "./components/Bench.vue";
</script>

<template>
  <div class="bg-gray-900 min-h-screen p-3">
    <div class="container mx-auto">
      <header>
        <nav class="py-4">
          <h1 class="text-5xl text-gray-200 font-serif font-bold">
            🎄 AoC 2022
          </h1>
        </nav>
      </header>
      <main>
        <Bench />
      </main>
    </div>
  </div>
</template>
