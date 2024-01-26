<template>
  <div class="categories mt-8">
    <div class="logo m-auto h-16"></div>
    <main class="md:p-8 flex flex-col md:flex-row">
      <aside class="flex flex-col mx-4 md:w-1/3">
        <h2 class="text-lg font-bold mb-2 text-gray-400">Классы кораблей</h2>
        <template class="block md:hidden">
          <Dropdown :title="currentType?.title || 'Выберите класс'">
            <TypesMenu />
          </Dropdown>
        </template>
        <TypesMenu class="hidden md:block" />
        <h2 class="text-lg font-bold mb-2 mt-2 text-gray-400">Нации</h2>
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

<style>
.logo {
  background-image: url(https://wows-web-static.wgcdn.co/wowsp/4e074004/browserAssets/2ce5d09cad314970.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
}
</style>
