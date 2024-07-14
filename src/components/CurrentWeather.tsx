import { CurrentWeatherProps, WeatherData } from "../assets/types";
import { endpoints } from "../assets/endpoints";
import { useState, useEffect } from "react";
import { clothing } from "../assets/clothing";
import { WeatherIcon } from "./WeatherIcon";
import ClothingIcon from "../components/ClothingIcon"; 

export default function CurrentWeather( { data, coords, setCoords, apiKey, units }: CurrentWeatherProps ) {

  const [weatherData, setWeatherData] = useState<any>({}); 
  const [weatherDescription, setWeatherDescription] = useState<string>("clear sky");

  useEffect(() => {
    if(data !== null) {
      if (data[0]) {
        setCoords({ lat: data[0].lat, lon: data[0].lon });
      } else if (data.lat && data.lon) {
        setCoords({ lat: data.lat, lon: data.lon })
      }
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
          console.table(data);
          if (data.weather && data.weather.length > 0) {
            setWeatherDescription(data.weather[0].description);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    coordsToWeather();
  }, [coords, apiKey, units]);

  const [temp, setTemp] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState<Array<string | null>>([]);
  const [clothingSuggestion, setClothingSuggestion] = useState('');

  function isWeatherCondition() {
    if (!weatherData) {
      return;
    }
    let conditions = '';
  
    // Check for rain
    if (weatherData.rain) {
      conditions += 'rainy ';
    }
  
    // Check for wind
    if (weatherData.wind && weatherData.wind.speed > 25) {
      conditions += 'windy ';
    }
  
    // Check for snow
    if (weatherData.snow) {
      conditions += 'snowy ';
    }
  
    // Trim any extra spaces and update state if conditions are not empty
    const trimmedConditions = conditions.trim();
    if (trimmedConditions) {
      setWeatherCondition(current => [...current, ...trimmedConditions.split(' ')]);
    }
  }

  function getClothingRecommendation(temp: number) {
    switch (true) {
      case (temp < 40):
        setClothingSuggestion(clothing.veryCold);
        break;
      case (temp >= 40 && temp < 50):
        setClothingSuggestion(clothing.coldWeather);
        break;
      case (temp >= 50 && temp < 80):
        setClothingSuggestion(clothing.mildWeather);
        break;
      case (temp >= 80):
        setClothingSuggestion(clothing.hotWeather);
        break;
      default:
        return 'Clothing recommendation not available';
    }
  }

  function summarizeWindSpeed(windSpeed: number) {
    if (windSpeed < 5) {
      return "slightly windy";
    } else if (windSpeed >= 5 && windSpeed < 15) {
      return "breezy";
    } else {
      return "very windy";
    }
  }

  useEffect(() => {
    if (weatherData) {
      isWeatherCondition();
      if (weatherData.main) {
        setTemp(Math.round(weatherData.main.temp));
        getClothingRecommendation(temp);
      }
    }
  }, [weatherData, temp]);

  const hasWeatherCondition = weatherCondition.length > 0;
  const conditionMessage = hasWeatherCondition ? `Beware of ${weatherCondition[0]}` : null;

  if (!data) {
    return (
      <main className="flex flex-col justify-center w-full items-center">
        <h1 className="text-3xl bold">Dang!</h1>
        <h2 className="text-xl">No data found!</h2>
        <p>Please verify location submitted or search for a different location.</p>
      </main>
    );
  }

  if (typeof weatherData === 'object' && weatherData !== null) {
    if (weatherData.main) {
      return (
        <main id="CurrentWeather">
          <div className="main-weather flex-col flex text-white">
            <main className="flex flex-row w-full justify-between">
              <section className="flex flex-col justify-center items-center w-1/2">
                <h2 className="text-7xl">{Math.round(weatherData.main.temp)}°</h2>
                <h3 className="text-md">{weatherData.name}</h3>
              </section>
              <WeatherIcon description={weatherDescription} />
            </main>
            
            <p className="text-md mb-5">
              Wind Speed: <span className="italic">({weatherData.wind.speed}mph)</span>, or {summarizeWindSpeed(weatherData.wind.speed)}.
            </p>
          </div>
          <section id="clothing-section">
            <h3 className="text- font-semibold">Clothing Recommendation:</h3>
            <span className="text-lg"> {clothingSuggestion} </span>
            {conditionMessage && <span>{conditionMessage}</span>}
          </section>
        </main>
      );
    }
  }

  return (
    <main className="flex flex-col justify-center w-full items-center">
      <section className="flex flex-col w-4/5">
        <h1 className="text-3xl bold text-center">Hello!</h1>
        <p>To find the current weather in a specific area, enter the zip code or city name in the input box above.</p>
      </section>
    </main>
  );
}
