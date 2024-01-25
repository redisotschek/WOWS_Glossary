<template>
  <div class="categories flex md:flex-row flex-col justify-around">
    <aside class="md:w-1/3">
      <h2 class="text-lg font-bold mb-5">Классы кораблей</h2>
      <VehicleTypes />
    </aside>
    <section class="md:w-2/3">
      <h2 class="text-lg font-bold mb-5">
        Корабли класса {{ typeByName(type)?.title || type }}
      </h2>
      <ShipsTable :vehicles="vehicles" />
    </section>
  </div>
</template>

<script setup lang="ts">
import VehicleTypes from "@/components/VehicleTypes.vue";
import ShipsTable from "@/components/blocks/ShipsTable.vue";
import { useStore } from "@/store";
import { computed } from "vue";

const props = defineProps({
  type: String,
});

const store = useStore();

const vehiclesByType = store.getters.getVehiclesByType;
const typeByName = store.getters.getTypeByName;

const vehicles = computed(() => vehiclesByType(props.type));
</script>
