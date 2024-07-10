import { CurrentWeatherProps, WeatherData, Main } from "../assets/types";
import { endpoints } from "../assets/endpoints";
import { useState, useEffect } from "react";

export default function CurrentWeather( { data, coords, setCoords, apiKey, units }: CurrentWeatherProps ) {
  const [weatherData, setWeatherData] = useState<any>({});

  console.log(weatherData)

  useEffect(() => {
    if (data[0]) {
      setCoords({ lat: data[0].lat, lon: data[0].lon });
    }
  }, [data, setCoords]);


  useEffect(() => {
    const coordsToWeather = async () => {
      if (coords.lat && coords.lon) {
        try {
          const response = await fetch(endpoints.getWeatherByCoords(coords.lat, coords.lon, apiKey, units));
          if (!response.ok) {
            throw new Error(`Network response not OK: ${response.statusText}`);
          }
          const data : WeatherData = await response.json();
          setWeatherData(data);
          console.table(data)
        } catch (error) {
          console.error(error);
        }
      }
    };

    coordsToWeather();
  }, [coords, apiKey, units]);


  if (typeof weatherData === 'object' && weatherData !== null) {
    if (weatherData.main) {
      return (
        <main>
          <div className="main-weather flex-col flex text-white mt-4">
            <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
            <section className="flex flex-row">
              <h3 className="text-5xl">{Math.round(weatherData.main.temp)}°</h3>
            </section>
            <span className="text-lg">Feels like {Math.round(weatherData.main.feels_like)}°</span>
          </div>
        </main>
      );
    }
  }

  return null;
}
