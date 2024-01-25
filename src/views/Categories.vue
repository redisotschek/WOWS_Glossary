<template>
  <div class="categories">
    <h1 class="text-xl font-bold">Категории</h1>
    <div class="flex flex-col md:flex-row md:justify-around">
      <h2 class="md:hidden text-lg font-bold mb-5">Классы кораблей</h2>
      <VehicleTypes class="md:w-1/3" />
      <h2 class="md:hidden text-lg font-bold mb-5">Нации</h2>
      <Nations class="md:w-2/3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VehicleTypes from "@/components/VehicleTypes.vue";
import Nations from "@/components/Nations.vue";
</script>
