import { CurrentWeatherProps, WeatherData } from "../assets/types";
import { endpoints } from "../assets/endpoints";
import { useState, useEffect } from "react";
import { clothing } from "../assets/clothing";

export default function CurrentWeather( { data, coords, setCoords, apiKey, units }: CurrentWeatherProps ) {
  const [weatherData, setWeatherData] = useState<any>({});  

  useEffect(() => {
    if (data[0]) {
      setCoords({ lat: data[0].lat, lon: data[0].lon });
    } else if (data.lat && data.lon) {
      setCoords({ lat: data.lat, lon: data.lon })
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

    case (temp >= 40 && temp < 60):
      setClothingSuggestion(clothing.coldWeather);
      break;

    case (temp >= 60 && temp < 80):
      setClothingSuggestion(clothing.mildWeather);
      break;

    case (temp >= 80):
      setClothingSuggestion(clothing.hotWeather);
      break;

      default:
        return 'Clothing recommendation not available';
    }
  }

  useEffect(()=> {
    if (weatherData) {
      isWeatherCondition();
      if (weatherData.main) {
        setTemp(Math.round(weatherData.main.temp));
        getClothingRecommendation(temp)
        console.log(clothingSuggestion)
      }
    }
  }, [weatherData, temp])

  const hasWeatherCondition = weatherCondition.length > 0;
  const conditionMessage = hasWeatherCondition ? `Beware of ${weatherCondition[0]}` : null;


  if (typeof weatherData === 'object' && weatherData !== null) {
    if (weatherData.main) {
      return (
        <main>
          <div className="main-weather flex-col flex text-white mt-4">
            <h2 className="text-2xl font-bold">{weatherData.name}</h2>
            <section className="flex flex-row">
              <h3 className="text-5xl">{Math.round(weatherData.main.temp)}°</h3>
            </section>
            <span className="text-lg">Feels like {Math.round(weatherData.main.feels_like)}°</span>
          </div>
          <section>
            <h3 className="text-xl font-semibold mt-4">Clothing Recommendation:</h3>
            <span className="text-lg"> {clothingSuggestion} </span>
            {conditionMessage && <span>{conditionMessage}</span>}
          </section>
        </main>
      );
    }
  }

  return null;
}
