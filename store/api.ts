import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Fetchable } from '../model/fetchable';
import { wmoToWeather } from '../model/weatherKind';
import { CityId, useCity, WeatherState } from './store';

export type Location = {
    latitude: number;
    longitude: number;
    timezone: string;
}

type ForecastParams = {
    latitude: number;
    longitude: number;
    timezone: string;
    current_weather: 'true';
}

type ForecastReponse = {
    current_weather: {
        temperature: number;
        weathercode: number;
    },
    daily:{
        time: string[],
        weathercode: number[],
        temperature_2m_max: number[],
        temperature_2m_min: number[]
    }
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1' }),
  endpoints: (builder) => ({
    getWeatherByLocation: builder.query<ForecastReponse,Location>({
      query: location => {
        const params: ForecastParams = {
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone,
            current_weather: 'true',
        }
        return {
            url: '/forecast?daily=weathercode,temperature_2m_max,temperature_2m_min',
            params,
        }},
    }),
  }),
})

// https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin

// https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.351&timezone=Europe%2FBerlin&daily=weathercode%2Ctemperature_2m_max%2Ctemperature_2m_min&current_weather=true
// auto-generated based on the defined endpoints
export const { useGetWeatherByLocationQuery } = weatherApi

function weatherStateFromResponse(response: ForecastReponse): WeatherState {
    return {
        currentTemperature: response.current_weather.temperature,
        minTemperature: response.daily.temperature_2m_min[0],
        maxTemperature: response.daily.temperature_2m_max[0],
        currentWeather: wmoToWeather(response.daily.weathercode[0]),
        dailyWeather: response.daily.time.map((date, index) => ({
            date,
            min: response.daily.temperature_2m_min[index],
            max: response.daily.temperature_2m_max[index],
            weather: wmoToWeather(response.daily.weathercode[index]),
        }))
    }
}

export function useForecastApi(cityId: CityId): Fetchable<WeatherState> {
    const city = useCity(cityId);
    const params = {
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
    }

    const response = useGetWeatherByLocationQuery(params)
    const data = response.currentData ? weatherStateFromResponse(response.currentData) : undefined

    if (response.isError) {
        return {
            kind: 'error',
            oldData: data,
            error: 'unknown error'
        }
    } else if (response.isLoading || !data) {
        return {
            kind: 'loading',
            oldData: data
        }
    } else {
        return {
            kind: 'loaded',
            data: data
        }
    }
}