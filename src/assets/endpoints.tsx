export const endpoints = {
    getWeatherByCoords: (lat: number, lon: number, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string => {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`;
    },
    getForecastByCoords: (lat: number, lon: number, APIKey: string): string => {
      return `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    },
    getCoordsByZip: (zip: string, apiKey: string): string => { // Renamed function
      return `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`;
    },
    getCoordsByCityName: (cityName: string, apiKey: string): string => {
      return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${apiKey}`;
    },
  };
  