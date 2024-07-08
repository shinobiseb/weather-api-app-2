export const endpoints = {
    getWeatherByCoords: (lat: number | null, lon: number | null, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string => {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`;
    },
    getWeatherByZip: (zip: number | null, apiKey: string): string => {
        return `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`;
    },
    getCoordsByCityName: (cityName: string | null, apiKey: string): string => {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${apiKey}`;
    },
};
