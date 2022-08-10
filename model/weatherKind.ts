export type WeatherKind = 'Sunny';

export type WeatherMapping<T> = {
    [K in WeatherKind]: T
};

export function localizeWeather(weather: WeatherKind): string {
    switch (weather) {
        case 'Sunny':
            return 'Ensoleillé';
    }
}
