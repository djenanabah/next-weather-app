export type Weather = 'Sunny';

export type WeatherMapping<T> = {
    [K in Weather]: T
};

export function localizeWeather(weather: Weather): string {
    switch (weather) {
        case 'Sunny':
            return 'Ensoleillé';
    }
}