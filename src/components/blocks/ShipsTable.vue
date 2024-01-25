<template>
  <table class="m-auto bg-gray-400 p-5">
    <thead>
      <tr>
        <th></th>
        <th>Название</th>
        <template v-for="field in sortableKeys" :key="field.key">
          <th class="cursor-pointer" @click="sortTable(field.key)">
            {{ field.caption }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vehicle in sortedVehicles" :key="vehicle.id">
        <td class="m-auto">
          <img class="h-10" :src="vehicle.icons.default" />
        </td>
        <td class="m-auto">
          <router-link
            :to="{
              name: 'vehicle',
              params: { id: vehicle.id },
            }"
            >{{ vehicle?.title || vehicle?.name }}
          </router-link>
        </td>
        <td class="m-auto">{{ vehicle.level }}</td>
        <td class="m-auto">
          <router-link
            :to="{
              name: 'nation',
              params: { nation: vehicle.nation.name },
            }"
          >
            {{ getNationByName(vehicle.nation.name)?.title }}
          </router-link>
        </td>
        <td class="m-auto">
          <router-link
            :to="{
              name: 'type',
              params: { type: vehicle.type.name },
            }"
          >
            {{ getVehicleTypeByName(vehicle.type.name)?.title }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed, PropType, Ref } from "vue";
import {
  IVehicle,
  IVehicleFieldWithName,
  IVehicleSortableKeys,
  IVEHICLE_KEYS,
} from "@/types/interfaces";
import { useStore } from "@/store";
const store = useStore();
const getNationByName = store.getters.getNationByName;
const getVehicleTypeByName = store.getters.getTypeByName;

const props = defineProps({
  vehicles: {
    type: Array as PropType<IVehicle[]>,
    required: true,
  },
});

const sortableKeys: Ref<Array<{ key: IVEHICLE_KEYS; caption: string }>> = ref([
  { key: IVEHICLE_KEYS.level, caption: "Уровень" },
  { key: IVEHICLE_KEYS.nation, caption: "Нация" },
  { key: IVEHICLE_KEYS.type, caption: "Класс" },
]);
let sortColumn: Ref<IVehicleSortableKeys> = ref(IVEHICLE_KEYS.level);
let sortOrder = ref("asc");

function hasName(obj: IVehicle[keyof IVehicle]): obj is IVehicleFieldWithName {
  return obj.hasOwnProperty("name");
}

const sortedVehicles = computed(() => {
  if (!sortColumn.value) return props.vehicles.slice();

  const sorted = props.vehicles.slice().sort((a: IVehicle, b: IVehicle) => {
    const aComparedField = a[sortColumn.value];
    const bComparedField = b[sortColumn.value];
    const aValue: string | number = hasName(aComparedField)
      ? aComparedField.name
      : aComparedField;
    const bValue: string | number = hasName(bComparedField)
      ? bComparedField.name
      : bComparedField;

    if (sortOrder.value === "asc") {
      return typeof aValue === "string" && typeof bValue === "string"
        ? aValue.localeCompare(bValue)
        : +aValue - +bValue;
    } else {
      return typeof aValue === "string" && typeof bValue === "string"
        ? bValue.localeCompare(aValue)
        : +bValue - +aValue;
    }
  });

  return sorted;
});

const sortTable = (column: string) => {
  if (sortColumn.value && sortColumn.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column as IVehicleSortableKeys;
    sortOrder.value = "asc";
  }
};
</script>

<style lang="scss">
th,
td {
  padding: 15px;
  color: black;
}
</style>
