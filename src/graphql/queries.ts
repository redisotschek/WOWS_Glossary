import { gql } from '@apollo/client/core'

export const VEHICLES_QUERY = gql`
    query {
        vehicles {
            id
            name
            title
            description
            icons {
                default
            }
            level
            type {
                name
            }
            nation {
                name
            }
        }
    }
`

export const TYPES_QUERY = gql`
    query {
        vehicleTypes {
            name
            title
            icons {
                default
            }
        }
    }
`

export const NATIONS_QUERY = gql`
    query {
        nations {
            name
            title
            color
            icons {
                default
            }
        }
    }
`