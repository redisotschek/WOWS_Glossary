// store.ts
import { IVehicleType, INation, IVehicle } from '@/types/interfaces'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  allVehicles: IVehicle[],
  allTypes: IVehicleType[],
  allNations: INation[],
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    allVehicles: [],
    allTypes: [],
    allNations: [],
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
    }
  },
  getters: {
    getVehiclesByType(state: State) {
      return (type: string) => {
        return state.allVehicles.filter(vehicle => vehicle.type.name === type)
      }
    },
    getVehiclesByNation(state: State) {
      return (nation: string) => {
        return state.allVehicles.filter(vehicle => vehicle.nation.name === nation)
      }
    },
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
    getVehicleById(state: State) {
      return (id: string) => {
        console.log(id);

        return state.allVehicles.find(vehicle => vehicle.id == id)
      }
    }
  },
  actions: {},
})

export function useStore() {
  return baseUseStore(key)
}