import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { setupListeners } from '@reduxjs/toolkit/query'
import { Fetchable } from "../model/fetchable";
import { WeatherKind } from "../model/weatherKind";
import { EqArrayByRef } from "../utils/Eq";
import { weatherApi } from "./api";

export type CreateTodoAction = {
};

export type CityId = number;

export type DailyWeatherState = {
    date: string;
    min: number;
    max: number;
    weather: WeatherKind;
}

export type WeatherState = {
    currentTemperature: number;
    minTemperature: number;
    maxTemperature: number;
    currentWeather: WeatherKind;
    dailyWeather: DailyWeatherState[];
}

export type CityState = {
    id: CityId;
    name: string;
    timezone: string;
    latitude: number;
    longitude: number;
}

export type State = {
    cities: CityState[];
}

const defaultState: State = {
    cities: [
        {
            id: 1,
            name: "Paris",
            timezone: "Europe/Berlin",
            latitude: 48.8567,
            longitude: 2.3510,
        }
    ]
}

const weatherSlice = createSlice({
  name: "weather",
  initialState: defaultState,
  reducers: {
    createTodo: (state: State, action: PayloadAction<CreateTodoAction>) => {
      console.log('todo')
    }
  },
});

export function dispatchCreateTodo() {
  store.dispatch(weatherSlice.actions.createTodo({}));
}

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export function useListCities(): CityId[] {
    return useSelector((s: RootState) => s.weather.cities.map(c => c.id), EqArrayByRef);
}

export function useCity(id: CityId): CityState {
    return useSelector((s: RootState) => s.weather.cities.find(c => c.id === id)!);
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
