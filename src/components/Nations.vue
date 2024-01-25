<template>
  <ul>
    <CategoryLink
      v-for="nation in nations"
      :key="nation.name"
      :title="nation?.title"
      :to="{
        name: 'nation',
        params: { nation: nation.name },
      }"
      :bgColor="nation.color"
    >
      <img :src="nation.icons?.default" :alt="nation?.title" />
    </CategoryLink>
  </ul>
</template>

<script setup lang="ts">
import { INation } from "@/types/interfaces";
import { ComputedRef, computed } from "vue";
import CategoryLink from "@/components/blocks/CategoryLink.vue";
import { useStore } from "@/store";
const store = useStore();

const title = "Nations";
const nations: ComputedRef<INation[]> = computed(() => store.state.allNations);
</script>
