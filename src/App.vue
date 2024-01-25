<template>
  <main class="p-8">
    <nav class="text-left">
      <router-link to="/" exact-active-class="home">Домой</router-link>
    </nav>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { VEHICLES_QUERY, TYPES_QUERY, NATIONS_QUERY } from "./graphql/queries";
import { watchEffect } from "vue";
import { useStore } from "./store";
const store = useStore();

if (!store.state.allVehicles.length) {
  const { result } = useQuery(VEHICLES_QUERY);

  watchEffect(() => {
    if (result.value?.vehicles) {
      store.commit("setVehicles", result.value.vehicles);
    }
  });
}

if (!store.state.allTypes.length) {
  const { result } = useQuery(TYPES_QUERY);

  watchEffect(() => {
    if (result.value?.vehicleTypes) {
      store.commit("setTypes", result.value.vehicleTypes);
    }
  });
}

if (!store.state.allNations.length) {
  const { result } = useQuery(NATIONS_QUERY);

  watchEffect(() => {
    if (result.value?.nations) {
      store.commit("setNations", result.value.nations);
    }
  });
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #e5e5f7;
  background-image: radial-gradient(#444cf7 2px, #e5e5f7 2px);
  background-size: 40px 40px;
}

.home {
  color: #444cf7;
}

ul {
  list-style-type: none;
}

* {
  user-select: none;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
