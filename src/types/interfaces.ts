
export interface IVehicleType {
    readonly name: string,
    readonly title: string,
    readonly icons: {
        default: string
    }
}

export interface INation {
    readonly name: string,
    readonly title: string,
    readonly color: string,
    readonly icons: {
        default: string
    }
}

export enum IVEHICLE_KEYS {
    id = "id",
    name = "name",
    title = "title",
    description = "description",
    icons = "icons",
    level = "level",
    type = "type",
    nation = "nation"
}

export type IVehicleSortableKeys = IVEHICLE_KEYS.level | IVEHICLE_KEYS.type | IVEHICLE_KEYS.nation


export interface IVehicle {
    readonly [IVEHICLE_KEYS.id]: string,
    readonly [IVEHICLE_KEYS.name]: string,
    readonly [IVEHICLE_KEYS.title]: string,
    readonly [IVEHICLE_KEYS.description]: string,
    readonly [IVEHICLE_KEYS.icons]: {
        readonly default: string
    },
    readonly [IVEHICLE_KEYS.level]: number,
    readonly [IVEHICLE_KEYS.type]: IVehicleFieldWithName,
    readonly [IVEHICLE_KEYS.nation]: IVehicleFieldWithName
}

export type IVehicleFieldWithName = {
    readonly name: string
}