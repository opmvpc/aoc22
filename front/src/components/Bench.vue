<script setup lang="ts">
import { BenchApi } from "@/sevices/BenchApi";
import type Result from "../types/Result";
import { ref, type Ref } from "vue";

const results: Ref<Map<string, Result>> = ref(new Map());
const times: Ref<number> = ref(100);

const run = async (day: number) => {
  addResult(day, 1, 1);
  addResult(day, 1, 2);
  addResult(day, 2, 1);
  addResult(day, 2, 2);
};

const addResult = async (day: number, part: number, fileNumber: number) => {
  let result = await BenchApi.results(day, part, fileNumber, times.value);
  const key = getKey(day, part, fileNumber);
  if (result !== null) {
    results.value.set(key, result);
  }
};

const getKey = (day: number, part: number, fileNumber: number) => {
  return `${day}-${part}-${fileNumber}`;
};

const runAll = () => {
  for (let day = 1; day <= 25; day++) {
    run(day);
  }
};
</script>

<template>
  <header
    class="mb-4 sticky top-0 left-0 z-10 backdrop-blur-md pt-4 shadow-xl w-full px-3"
  >
    <nav class="container mx-auto flex flex-col space-y-4">
      <h1 class="text-5xl text-gray-200 font-serif font-bold">🎄 AoC 2022</h1>
      <div
        class="backdrop-blur-lg bg-white/30 shadow-md p-4 rounded-md text-gray-900 flex justify-between"
      >
        <div class="flex space-x-2">
          <label class="font-bold" for="times">Times</label>
          <input
            class="border border-gray-300 rounded-md px-2 font-mono backdrop-blur-lg bg-white/10"
            type="number"
            v-model="times"
          />
        </div>
        <button
          class="backdrop-blur-lg bg-white/10 px-4 py-1 text-sm rounded"
          @click="runAll()"
        >
          Run all
        </button>
      </div>
      <div></div>
    </nav>
  </header>
  <main class="container mx-auto">
    <div class="flex flex-col space-y-4">
      <ul class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <li
          v-for="day in 25"
          class="backdrop-blur-lg bg-white/30 shadow-md p-4 rounded-md text-gray-900 flex flex-col space-y-4"
        >
          <div class="font-bold">Day {{ day }}</div>
          <div v-for="part in 2">
            <div v-for="fileNumber in 2">
              <div class="grid grid-cols-5 gap-3">
                <div>{{ part }} - {{ fileNumber }}</div>
                <div class="col-span-3 font-mono tabular-nums text-right">
                  {{
                    results
                      .get(getKey(day, part, fileNumber))
                      ?.time.toFixed(6) ?? "?"
                  }}
                  ms
                </div>
                <div
                  class="font-mono tabular-nums text-right"
                  :class="
                    results.get(getKey(day, part, fileNumber))?.result ===
                    results.get(getKey(day, part, fileNumber))?.expectedResult
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                >
                  {{ results.get(getKey(day, part, fileNumber))?.result }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class="backdrop-blur-lg bg-white/10 px-4 py-1 text-sm rounded"
              @click="run(day)"
            >
              Run
            </button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
