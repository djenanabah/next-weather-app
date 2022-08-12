import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CityApiRequest, CityApiSuccessResponse } from '../model/cityApiModel';
import { CityEntry } from '../model/cityEntry';
import { Fetchable } from '../model/fetchable';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    searchCityByName: builder.query<CityApiSuccessResponse,CityApiRequest>({
      query: params => {
        return {
            url: '/searchCityByName',
            params,
        }},
    }),
  }),
})

export const { useSearchCityByNameQuery } = cityApi

export function useCitiesSearch(cityName: string): Fetchable<CityEntry[]> {
    const response = useSearchCityByNameQuery({ name: cityName }, { skip: cityName === '' })

    const data = response.currentData ? response.currentData.cities : undefined

    if (response.isError) {
        return {
            kind: 'error',
            data: data,
            error: 'unknown error'
        }
    } else if (response.isLoading || !data) {
        return {
            kind: 'loading',
            data: data
        }
    } else {
        return {
            kind: 'loaded',
            data: data
        }
    }
}