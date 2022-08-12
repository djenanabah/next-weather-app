import { CityEntry } from "./cityEntry"

export type CityApiSuccessResponse = {
    status: 'success'
    cities: CityEntry[]
}

export type CityApiErrorResponse = {
    status: 'error'
    error: string
}

export type CityApiRequest = {
    name: string
}