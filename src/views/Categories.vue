<template>
  <div class="categories">
    <main class="md:p-8 flex flex-col md:flex-row">
      <aside class="m-auto flex flex-col mx-4 mt-8 md:w-1/3">
        <h2 class="text-lg font-bold mb-2">Классы кораблей</h2>
        <template class="block md:hidden">
          <Dropdown :title="currentType?.title || 'Выберите класс'">
            <TypesMenu />
          </Dropdown>
        </template>
        <TypesMenu class="hidden md:block" />
        <h2 class="text-lg font-bold mb-2 mt-2">Нации</h2>
        <template class="block md:hidden">
          <Dropdown :title="currentNation?.title || 'Выберите нацию'">
            <NationsMenu />
          </Dropdown>
        </template>
        <NationsMenu class="hidden md:block" />
      </aside>
      <ShipsTable class="w-full md:w-2/3 mx-4" :vehicles="filteredVehicles" />
    </main>
  </div>
</template>

<script setup lang="ts">
import TypesMenu from "@/components/TypesMenu.vue";
import NationsMenu from "@/components/NationsMenu.vue";
import Dropdown from "@/components/blocks/Dropdown.vue";
import ShipsTable from "@/components/blocks/ShipsTable.vue";
import { useStore } from "@/store";
import { ComputedRef, computed } from "vue";
import { INation, IVehicle, IVehicleType } from "@/types/interfaces";

const store = useStore();

const currentType: ComputedRef<IVehicleType | null> = computed(
  () => store.state.currentType
);

const currentNation: ComputedRef<INation | null> = computed(
  () => store.state.currentNation
);

const getFilteredVehicles = store.getters.getFilteredVehicles;

const filteredVehicles: ComputedRef<IVehicle[]> = computed(() =>
  getFilteredVehicles()
);
</script>
