<template>
  <div class="categories flex md:flex-row flex-col justify-around">
    <aside class="md:w-1/3">
      <h2 class="text-lg font-bold mb-5">Нации</h2>
      <Nations />
    </aside>
    <section class="md:w-2/3">
      <h2 class="text-lg font-bold mb-5">
        Корабли нации {{ nationByName(nation)?.title || nation }}
      </h2>
      <ShipsTable :vehicles="vehicles" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Nations from "@/components/Nations.vue";
import ShipsTable from "@/components/blocks/ShipsTable.vue";
import { useStore } from "@/store";
import { computed } from "vue";

const props = defineProps({
  nation: String,
});

const store = useStore();

const vehiclesByNation = store.getters.getVehiclesByNation;
const nationByName = store.getters.getNationByName;

const vehicles = computed(() => vehiclesByNation(props.nation));
</script>
