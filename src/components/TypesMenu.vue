<template>
  <ul
    class="py-2 text-sm text-gray-200"
    aria-labelledby="dropdownDefaultButton"
  >
    <li
      v-for="vehicleType in types"
      :key="vehicleType?.name"
      @click="setCurrentType(vehicleType)"
      class="flex px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:text-white cursor-pointer items-center"
      :class="{
        active: isActive(vehicleType?.name),
      }"
    >
      <img
        class="mr-2"
        :src="vehicleType.icons.default"
        :alt="vehicleType?.title || vehicleType?.name"
      />
      {{ vehicleType?.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import { IVehicleType } from "@/types/interfaces";

import { useStore } from "@/store";
const store = useStore();

function isActive(name: string) {
  return store.state.currentType?.name === name;
}

function setCurrentType(type: IVehicleType) {
  store.commit("setCurrentType", type);
}
const types: ComputedRef<IVehicleType[]> = computed(() => store.state.allTypes);
</script>

<style lang="scss">
$link-select: #7ee;
.active {
  border-left: 4px solid $link-select;
}
</style>
