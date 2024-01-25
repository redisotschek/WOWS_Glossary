<template>
  <router-link
    :to="to"
    active-class="border-l-4 border-black"
    class="flex justify-start align-middle p-2 m-2 bg-gray-400 rounded-sm"
    :style="{ backgroundColor: bgColor }"
  >
    <slot></slot>
    <h3 class="pl-2 text-lg font-bold text-black">{{ title }}</h3>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss">
h3 {
  line-height: 1.5;
}

.active {
  background-color: red;
}
</style>
