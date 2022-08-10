export type WeatherKind = 'Clear' | 'Cloudy' | 'Rain' | 'Snow' | 'Thunderstorm';

export type WeatherMapping<T> = {
    [K in WeatherKind]: T
};

//  WMO
// 0 	        Clear sky
// 1, 2, 3 	    Mainly clear, partly cloudy, and overcast
// 45, 48 	    Fog and depositing rime fog
// 51, 53, 55 	Drizzle: Light, moderate, and dense intensity
// 56, 57 	    Freezing Drizzle: Light and dense intensity
// 61, 63, 65 	Rain: Slight, moderate and heavy intensity
// 66, 67 	    Freezing Rain: Light and heavy intensity
// 71, 73, 75 	Snow fall: Slight, moderate, and heavy intensity
// 77 	        Snow grains
// 80, 81, 82 	Rain showers: Slight, moderate, and violent
// 85, 86 	    Snow showers slight and heavy
// 95    	    Thunderstorm: Slight or moderate
// 96, 99    	Thunderstorm with slight and heavy hail

const wmoMapping: Record<number, WeatherKind> = {
    0: 'Clear',
    1: 'Clear',
    2: 'Cloudy',
    3: 'Cloudy',
    45: 'Cloudy',
    48: 'Cloudy',
    51: 'Rain',
    53: 'Rain',
    55: 'Rain',
    56: 'Rain',
    57: 'Rain',
    61: 'Rain',
    63: 'Rain',
    65: 'Rain',
    66: 'Rain',
    67: 'Rain',
    71: 'Snow',
    73: 'Snow',
    75: 'Snow',
    77: 'Snow',
    80: 'Rain',
    81: 'Rain',
    82: 'Rain',
    85: 'Snow',
    86: 'Snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm'
};

export function wmoToWeather(wmo: number): WeatherKind {
    return wmoMapping[wmo];
}

export function localizeWeather(weather: WeatherKind): string {
    switch (weather) {
        case 'Clear':
            return 'Ciel dégagé';
        case 'Cloudy':
            return 'Nuageux';
        case 'Rain':
            return 'Pluie';
        case 'Snow':
            return 'Neige';
        case 'Thunderstorm':
            return 'Orage';
    }
}
