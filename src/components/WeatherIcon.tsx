import { useState, useEffect, FC } from 'react';
import { WeatherIconProps } from '../assets/types';
import {
  WiCloudy,
  WiDayCloudy,
  WiDayLightning,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiCloudyGusts,
  WiDayThunderstorm,
  WiRain,
  WiSnow,
  WiFog
} from 'react-icons/wi';


const getWeatherIcon = (description: string): JSX.Element => {
  const lowerDesc = description.toLowerCase();
  
  switch (lowerDesc) {
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
      return <WiDayThunderstorm size={200}/>;
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return <WiDayLightning size={200}/>;
    case 'light intensity drizzle':
    case 'drizzle':
    case 'heavy intensity drizzle':
    case 'light intensity drizzle rain':
    case 'drizzle rain':
    case 'heavy intensity drizzle rain':
    case 'shower rain and drizzle':
    case 'heavy shower rain and drizzle':
    case 'shower drizzle':
      return <WiDayCloudy size={200}/>;
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'extreme rain':
    case 'freezing rain':
    case 'light intensity shower rain':
    case 'shower rain':
    case 'heavy intensity shower rain':
    case 'ragged shower rain':
      return <WiRain size={200}/>;
    case 'light snow':
    case 'snow':
    case 'heavy snow':
    case 'sleet':
    case 'light shower sleet':
    case 'shower sleet':
    case 'light rain and snow':
    case 'rain and snow':
    case 'light shower snow':
    case 'shower snow':
    case 'heavy shower snow':
      return <WiSnow size={200}/>;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'sand/ dust whirls':
    case 'fog':
    case 'sand':
    case 'dust':
    case 'volcanic ash':
    case 'squalls':
    case 'tornado':
      return <WiFog size={200}/>;
    case 'clear sky':
      return <WiDaySunny size={200}/>;
    case 'few clouds':
      return <WiDaySunnyOvercast size={200}/>;
    case 'scattered clouds':
    case 'broken clouds':
    case 'overcast clouds':
      return <WiCloudy size={200}/>;
    case 'tropical storm':
    case 'hurricane':
    case 'cold':
    case 'hot':
    case 'windy':
    case 'hail':
      return <WiCloudyGusts size={200}/>;
    default:
      return <WiDaySunny size={200}/>;
  }
};

export const WeatherIcon: FC<WeatherIconProps> = ({ description }) => {
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setIcon(getWeatherIcon(description));
  }, [description]);

  return <div id='WeatherIconDiv' className='w-1/2'>{icon}</div>;
};
