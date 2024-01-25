<template>
  <div class="flex flex-col md:flex-row w-full px-5 bg-gray-400">
    <aside class="text-left md:w-1/3 py-5">
      <div><b>Название:</b> {{ vehicle.title }}</div>
      <div><b>Уровень:</b> {{ vehicle.level }}</div>
      <div>
        <b>Нация:</b>
        <CategoryLink
          :title="nation.title"
          :to="{
            name: 'nation',
            params: { nation: nation.name },
          }"
          :bgColor="nation.color"
        >
          <img :src="nation.icons?.default" :alt="nation?.title" />
        </CategoryLink>
      </div>
      <div>
        <b>Класс:</b>
        <CategoryLink
          :title="type.title"
          :to="{
            name: 'type',
            params: { type: type.name },
          }"
          :bgColor="nation.color"
        >
          <img :src="type.icons?.default" :alt="type?.title" />
        </CategoryLink>
      </div>
      <img class="m-auto" :src="vehicle.icons.default" :alt="vehicle.id" />
    </aside>
    <main class="text-wrap md:w-2/3 py-5">
      {{ vehicle.description }}
    </main>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import CategoryLink from "@/components/blocks/CategoryLink.vue";
import { INation, IVehicle, IVehicleType } from "@/types/interfaces";
import { useStore } from "@/store";
const store = useStore();
const getNationByName = store.getters.getNationByName;
const getVehicleTypeByName = store.getters.getTypeByName;

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const vehicle: ComputedRef<IVehicle> = computed(() => {
  return store.getters.getVehicleById(props.id);
});
const nation: ComputedRef<INation> = computed(() => {
  return getNationByName(vehicle.value.nation.name);
});
const type: ComputedRef<IVehicleType> = computed(() => {
  return getVehicleTypeByName(vehicle.value.type.name);
});
</script>
