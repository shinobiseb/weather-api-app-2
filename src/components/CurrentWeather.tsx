import { CurrentWeatherProps } from "../assets/types";
import { endpoints } from "../assets/endpoints";
import { useState, useEffect } from "react";

export default function CurrentWeather( { data, coords, setCoords, apiKey, units }: CurrentWeatherProps ) {
  const [weatherData, setWeatherData] = useState<any>({});

  // Update coords based on fetched data
  useEffect(() => {
    if (data[0]) {
      setCoords({ lat: data[0].lat, lon: data[0].lon });
    }
  }, [data, setCoords]);

  // Fetch weather data when coords change
  useEffect(() => {
    const coordsToWeather = async () => {
      if (coords.lat && coords.lon) {
        try {
          const response = await fetch(endpoints.getWeatherByCoords(coords.lat, coords.lon, apiKey, units));
          if (!response.ok) {
            throw new Error(`Network response not OK: ${response.statusText}`);
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    coordsToWeather();
  }, [coords, apiKey, units]);

  // Render weather data if available
  if (typeof weatherData === 'object' && weatherData !== null) {
    if (weatherData.main) {
      return (
        <main>
          <div className="main-weather flex-row flex text-white">
            <span>{weatherData.main.temp}</span>
            <span>{weatherData.sys.country}</span>
            <span>{weatherData.name}</span>
          </div>
        </main>
      );
    }
  }

  return null;
}
