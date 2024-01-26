// store.ts
import { IVehicleType, INation, IVehicle } from '@/types/interfaces'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  allVehicles: IVehicle[],
  allTypes: IVehicleType[],
  allNations: INation[],
  currentType: IVehicleType | null,
  currentNation: INation | null,
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    allVehicles: [],
    allTypes: [],
    allNations: [],
    currentType: null,
    currentNation: null,
  },
  mutations: {
    setVehicles(state: State, vehicles: IVehicle[]) {
      state.allVehicles = vehicles
    },
    setNations(state: State, nations: INation[]) {
      state.allNations = nations
    },
    setTypes(state: State, types: IVehicleType[]) {
      state.allTypes = types
    },
    setCurrentType(state: State, type: IVehicleType) {
      if (type.name === state.currentType?.name) {
        state.currentType = null
        return
      }
      state.currentType = type
    },
    setCurrentNation(state: State, nation: INation) {
      if (nation.name === state.currentNation?.name) {
        state.currentNation = null
        return
      }
      state.currentNation = nation
    }
  },
  getters: {
    getNationByName(state: State) {
      return (name: string) => {
        return state.allNations.find(nation => nation.name === name)
      }
    },
    getTypeByName(state: State) {
      return (name: string) => {
        return state.allTypes.find(type => type.name === name)
      }
    },
    getFilteredVehicles(state: State) {
      // both type and nation could be null
      return () => {
        if (state.currentType?.name && state.currentNation?.name) {
          return state.allVehicles.filter(vehicle => vehicle.type.name === state.currentType?.name && vehicle.nation.name === state.currentNation?.name)
        } else if (state.currentType?.name) {
          return state.allVehicles.filter(vehicle => vehicle.type.name === state.currentType?.name)
        } else if (state.currentNation?.name) {
          return state.allVehicles.filter(vehicle => vehicle.nation.name === state.currentNation?.name)
        } else {
          return state.allVehicles
        }
      }

    }
  },
  actions: {},
})

export function useStore() {
  return baseUseStore(key)
}