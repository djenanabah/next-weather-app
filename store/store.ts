import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { setupListeners } from '@reduxjs/toolkit/query'
import { WeatherKind } from "../model/weatherKind";
import { EqArrayByRef } from "../utils/eq";
import { weatherApi } from "./weatherApi";
import { cityApi } from "./cityApi";

export type AddCityAction = {
    id: CityId;
    name: string;
    timezone: string;
    latitude: number;
    longitude: number;
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
            id: 2988507,
            name: "Paris",
            timezone: "Europe/Paris",
            longitude: 2.3488,
            latitude: 48.85341,
        }
    ]
}

const weatherSlice = createSlice({
  name: "weather",
  initialState: defaultState,
  reducers: {
    addCity: (state: State, action: PayloadAction<AddCityAction>) => {
        const findResult = state.cities.find(city => city.id === action.payload.id);
        if (!findResult) {
            state.cities.push(action.payload)
        }
    }
  },
});

export function dispatchAddCity(city: AddCityAction) { 
    store.dispatch(weatherSlice.actions.addCity(city));
}

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, cityApi.middleware),
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
