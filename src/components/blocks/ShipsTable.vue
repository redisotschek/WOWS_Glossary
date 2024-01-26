<template>
  <table class="w-full mt-8 text-sm text-left rtl:text-right text-gray-400">
    <thead class="uppercase bg-gray-700">
      <tr>
        <th scope="col" class="py-3"></th>
        <th scope="col" class="py-3">Название</th>
        <template v-for="field in sortableKeys" :key="field.key">
          <th scope="col" class="cursor-pointer" @click="sortTable(field.key)">
            {{ field.caption }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="!vehicles.length"
        class="text-center text-xl w-full font-bold m-auto"
      >
        <td></td>
        <td></td>
        <td>Нет данных</td>
        <td></td>
        <td></td>
      </tr>
      <template v-else
        ><tr
          v-for="vehicle in sortedVehicles"
          :key="vehicle.id"
          @click="setCurrentVehicle(vehicle)"
          class="text-lg bg-gray-800 border-gray-600 cursor-pointer max-h-10 border-b"
        >
          <td>
            <img class="h-10" :src="vehicle.icons.default" />
          </td>
          <td>
            {{ vehicle?.title || vehicle?.name }}
          </td>
          <td>{{ vehicle.level }}</td>
          <td>
            {{ getNationByName(vehicle.nation.name)?.title }}
          </td>
          <td>
            {{ getVehicleTypeByName(vehicle.type.name)?.title }}
          </td>
        </tr></template
      >
    </tbody>
  </table>
  <Popup
    v-if="showPopup"
    @close="closePopup"
    :title="`${currentVehicle?.title}, Уровень ${currentVehicle?.level}`"
  >
    <div class="text-white">
      <img
        class="w-full"
        :src="currentVehicle?.icons?.default"
        :alt="currentVehicle?.title"
      />
      <div class="text-xl text-white font-bold">
        {{ getNationByName(currentVehicle?.nation.name)?.title }}
        {{ getVehicleTypeByName(currentVehicle?.type.name)?.title }}
      </div>
      <p class="p-2 text-justify">
        {{ currentVehicle?.description || "Нет описания" }}
      </p>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/Popup.vue";
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
const currentVehicle: Ref<IVehicle | null> = ref(null);
const showPopup: Ref<boolean> = ref(false);

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

function setCurrentVehicle(vehicle: IVehicle) {
  currentVehicle.value = vehicle;
  openPopup();
}

function openPopup() {
  showPopup.value = true;
}

function closePopup() {
  currentVehicle.value = null;
  showPopup.value = false;
}
</script>

<style lang="scss"></style>
