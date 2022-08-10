import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { WeatherKind } from "../model/weatherKind";
import { EqArrayByRef } from "../utils/Eq";

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
    weather: WeatherState;
}

export type State = {
    cities: CityState[];
}

const defaultState: State = {
    cities: [
        {
            id: 1,
            name: "Paris",
            timezone: "Europe/Paris",
            weather: {
                currentTemperature: 10,
                minTemperature: 5,
                maxTemperature: 15,
                currentWeather: 'Clear',
                dailyWeather: [
                    {
                        date: "2022-08-10",
                        min: 10,
                        max: 20,
                        weather: 'Clear'
                    },
                    {
                        date: "2022-08-11",
                        min: 12,
                        max: 22,
                        weather: 'Cloudy'
                    },
                    {
                        date: "2022-08-12",
                        min: 14,
                        max: 24,
                        weather: 'Rain'
                    },
                    {
                        date: "2022-08-13",
                        min: 16,
                        max: 26,
                        weather: 'Snow'
                    },
                    {
                        date: "2022-08-14",
                        min: 18,
                        max: 28,
                        weather: 'Thunderstorm'
                    },
                    {
                        date: "2022-08-15",
                        min: 20,
                        max: 30,
                        weather: 'Clear'
                    }
                ]
            }
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
  }
});

export type RootState = ReturnType<typeof store.getState>;

export function useListCities(): CityId[] {
    return useSelector((s: RootState) => s.weather.cities.map(c => c.id), EqArrayByRef);
}

export function useCity(id: CityId): CityState {
    return useSelector((s: RootState) => s.weather.cities.find(c => c.id === id)!);
}
