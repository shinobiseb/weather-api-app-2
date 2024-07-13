import { CurrentWeatherProps, WeatherData } from "../assets/types";
import { endpoints } from "../assets/endpoints";
import { useState, useEffect } from "react";
import { clothing } from "../assets/clothing";

export default function CurrentWeather( { data, coords, setCoords, apiKey, units }: CurrentWeatherProps ) {
  const [weatherData, setWeatherData] = useState<any>({});  

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
          console.table(data)
        } catch (error) {
          console.error(error);
        }
      }
    };

    coordsToWeather();
  }, [coords, apiKey, units]);

  const [temp, setTemp] = useState(0)
  const [weatherCondition, setWeatherCondition] = useState<Array<string | null>>([])
  const [clothingSuggestion, setClothingSuggestion] = useState('')
  
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

  function summarizeWindSpeed(windSpeed : number) {
    if (windSpeed < 5) {
        return "slightly windy";
    } else if (windSpeed >= 5 && windSpeed < 15) {
        return "breezy";
    } else {
        return "very windy";
    }
  }

  useEffect(()=> {
    if (weatherData) {
      isWeatherCondition();
      if (weatherData.main) {
        setTemp(Math.round(weatherData.main.temp));
        getClothingRecommendation(temp)
      }
    }
  }, [weatherData, temp])

  const hasWeatherCondition = weatherCondition.length > 0;
  const conditionMessage = hasWeatherCondition ? `Beware of ${weatherCondition[0]}` : null;

  if (!data) {
    return (
      <main className="flex flex-col justify-center w-full items-center">
        <h1 className="text-3xl bold">Dang!</h1>
        <h2 className="text-xl">No found data!</h2>
        <p>Please verify location submitted or search for a different location.</p>
      </main>
    );
  }

  if (typeof weatherData === 'object' && weatherData !== null) {
    if (weatherData.main) {
      return (
        <main id="CurrentWeather">
          <div className="main-weather flex-col flex text-white">
            <h2 className="text-2xl font-bold">{weatherData.name}</h2>
            <section className="flex flex-row">
              <h3 className="text-5xl">{Math.round(weatherData.main.temp)}°</h3>
            </section>
            <span className="text-lg">Feels like {Math.round(weatherData.main.feels_like)}°</span>
            <p className="text-md">
              The wind speed is <span className="italic">({weatherData.wind.speed}mph)</span>, or {summarizeWindSpeed(weatherData.wind.speed)}.
            </p>
          </div>
          <section id="clothing-section">
            <h3 className="text-xl font-semibold">Clothing Recommendation:</h3>
            <span className="text-lg"> {clothingSuggestion} </span>
            {conditionMessage && <span>{conditionMessage}</span>}
          </section>
          <section>
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
