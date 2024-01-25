<template>
  <ul>
    <CategoryLink
      v-for="vehicleType in types"
      :title="vehicleType?.title"
      :key="vehicleType?.name"
      :to="{
        name: 'type',
        params: { type: vehicleType.name },
      }"
    >
      <img
        :src="vehicleType.icons.default"
        :alt="vehicleType?.title || vehicleType?.name"
      />
    </CategoryLink>
  </ul>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import { IVehicleType } from "@/types/interfaces";
import CategoryLink from "@/components/blocks/CategoryLink.vue";
import { useStore } from "@/store";
const store = useStore();

const title = "Vehicle Types";

const types: ComputedRef<IVehicleType[]> = computed(() => store.state.allTypes);
</script>
