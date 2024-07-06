export const endpoints = {
    getWeatherByCoords: (lat: number | null, lon: number | null, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string => {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`;
    }
};
