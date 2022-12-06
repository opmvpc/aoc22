<script setup lang="ts">
import { BenchApi } from "@/sevices/BenchApi";
import type Result from "../types/Result";
import { onMounted, ref, type Ref } from "vue";
import XButton from "./XButton.vue";

const results: Ref<Map<string, Result | null>> = ref(new Map());
const times: Ref<number> = ref(100);

const days = ref(0);

const run = async (day: number) => {
  addResult(day, 1, 1);
  addResult(day, 1, 2);
  addResult(day, 2, 1);
  addResult(day, 2, 2);
};

const addResult = async (day: number, part: number, fileNumber: number) => {
  let result = await BenchApi.results(day, part, fileNumber, times.value);
  const key = getKey(day, part, fileNumber);
  results.value.set(key, result);
};

const getKey = (day: number, part: number, fileNumber: number) => {
  return `${day}-${part}-${fileNumber}`;
};

const runAll = () => {
  for (let day = 1; day <= days.value; day++) {
    run(day);
  }
};

const resultClass = (result: Result | null | undefined) => {
  if (result === undefined || result === null) {
    return "";
  }
  if (result.result === result.expectedResult) {
    return "text-blue-700";
  }
  return "text-red-700";
};

onMounted(async () => {
  days.value = await BenchApi.days();
  runAll();
});
</script>

<template>
  <header
    class="mb-4 sticky top-0 left-0 z-10 backdrop-blur-md pt-4 shadow-xl w-full px-3"
  >
    <nav class="container mx-auto flex flex-col space-y-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <img class="w-20 h-20" src="/logo.png" alt="avatar" />
          <h1 class="text-5xl text-gray-200 font-serif font-bold">AoC 2022</h1>
        </div>
        <div>
          <a
            href="https://github.com/opmvpc/aoc22"
            class="text-gray-200 hover:text-gray-400 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
      </div>
      <div
        class="bg-white/30 hover:bg-white/40 shadow-md p-4 rounded-md text-gray-900 flex justify-between transition-all"
      >
        <div class="flex space-x-2">
          <label class="font-bold" for="times">Times</label>
          <input
            class="rounded-md px-2 font-mono bg-white/10 shadow-inner hover:bg-white/30 focus:bg-white/30 transition-all focus:outline-none"
            type="number"
            v-model="times"
          />
        </div>
        <XButton @click="runAll()">Run all</XButton>
      </div>
      <div></div>
    </nav>
  </header>
  <main class="container mx-auto px-3">
    <div class="flex flex-col space-y-4">
      <ul class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <li
          v-for="day in days"
          class="bg-white/30 hover:bg-white/40 shadow-md p-4 rounded-md text-gray-900 flex flex-col space-y-4 transition-all"
        >
          <div class="font-bold">Day {{ day }}</div>
          <div v-for="part in 2">
            <div v-for="fileNumber in 2">
              <div class="grid grid-cols-6 gap-3">
                <div>{{ part }} - {{ fileNumber }}</div>
                <div class="col-span-3 font-mono tabular-nums text-right">
                  <div
                    class="text-red-700"
                    v-if="
                      results.has(getKey(day, part, fileNumber)) &&
                      results.get(getKey(day, part, fileNumber)) === null
                    "
                  >
                    not implemented
                  </div>
                  <span v-else>
                    {{
                      results
                        .get(getKey(day, part, fileNumber))
                        ?.time.toFixed(6) ?? "?"
                    }}
                    ms
                  </span>
                </div>
                <div
                  class="col-span-2 font-mono tabular-nums text-right"
                  :class="
                    resultClass(results.get(getKey(day, part, fileNumber)))
                  "
                >
                  {{
                    results.get(getKey(day, part, fileNumber))?.result ?? "?"
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <XButton @click="run(day)">Run</XButton>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
