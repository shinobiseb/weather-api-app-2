export const endpoints = {
    getWeatherByCoords: (lat: number, lon: number, APIKey: string): string => {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    },
};
