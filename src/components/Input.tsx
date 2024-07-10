import { ChangeEvent, useRef, useEffect, useState } from 'react';
import { InputProps, WeatherData } from '../assets/types';
import { endpoints } from '../assets/endpoints';

const Input: React.FC<InputProps> = ({setCityName, cityName , apiEndpoint, apiKey, setData, setApiEndpoint }) => {

  const [ search, setSearch] = useState('')

  const cityNameRef = useRef(null)

  const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState( value )
  }

  switch(search) {
    case 'cityName':
      setApiEndpoint( endpoints.getCoordsByCityName (cityName, apiKey));
      break
  }

  const getWeather = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`Network response not OK: ${response.statusText}`);
      }
      const data : WeatherData = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  function finalSearchFunction() {
    if (Number.isNaN(parseInt(cityName))) {
      getWeather(apiEndpoint)
    } else {
      setApiEndpoint(endpoints.getWeatherByZip(parseInt(cityName), apiKey))
      getWeather(apiEndpoint)
    }
  }

  return (
    <div className='w-full flex flex-row justify-center text-black'>
      <input 
        onChange={handleChange(setCityName)}
        placeholder='City Name'
        className='px-2 border-black border w-20 rounded-md' 
        type="text"
        ref={cityNameRef}
      />
      
      <button onClick={finalSearchFunction} className="confirm bg-white px-2 p-1 rounded-md">Confirm</button>
    </div>
  );
};

export default Input;
