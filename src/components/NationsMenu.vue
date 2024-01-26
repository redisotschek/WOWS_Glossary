<template>
  <ul
    class="py-2 text-sm text-gray-200"
    aria-labelledby="dropdownDefaultButton"
  >
    <li
      v-for="nation in nations"
      :key="nation?.name"
      @click="setCurrentNation(nation)"
      class="flex px-4 py-2 text-gray-800 hover:text-black cursor-pointer items-center"
      :style="{ backgroundColor: nation?.color }"
      :class="{
        active: isActive(nation?.name),
      }"
    >
      <img
        class="mr-2"
        :src="nation.icons.default"
        :alt="nation?.title || nation?.name"
      />
      {{ nation?.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { INation } from "@/types/interfaces";
import { ComputedRef, computed } from "vue";
import CategoryLink from "@/components/blocks/CategoryLink.vue";
import { useStore } from "@/store";
const store = useStore();

function isActive(name: string) {
  return store.state.currentNation?.name === name;
}

function setCurrentNation(nation: INation) {
  store.commit("setCurrentNation", nation);
}

const nations: ComputedRef<INation[]> = computed(() => store.state.allNations);
</script>
