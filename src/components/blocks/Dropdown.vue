<template>
  <button
    id="dropdown-button"
    @click="toggleDropdown"
    class="justify-between w-full hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:focus:ring-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button"
  >
    {{ title || "Выберите категорию" }}
    <svg
      class="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  <div
    v-show="isVisible"
    id="dropdown"
    class="z-10 divide-y divide-gray-100 rounded-lg shadow w-full"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isVisible: Ref<boolean> = ref(false);

const toggleDropdown = () => {
  isVisible.value = !isVisible.value;
};
</script>
