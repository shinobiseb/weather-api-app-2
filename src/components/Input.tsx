import { ChangeEvent, useRef, useEffect } from 'react';
import { InputProps, WeatherData } from '../assets/types';
import { endpoints } from '../assets/endpoints';

const Input: React.FC<InputProps> = ({ setSearchValue, searchValue, apiEndpoint, apiKey, setData, setApiEndpoint }) => {
  const searchValueRef = useRef(null);

  // ---------------handleChange Function---------------
  const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(value);
  };

  // ---------------getWeather Function---------------
  const getWeather = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`Network response not OK: ${response.statusText}`);
      }
      const data: WeatherData = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // ---------------useEffect---------------
  useEffect(() => {
    if (Number.isNaN(parseInt(searchValue))) {
      setApiEndpoint(endpoints.getCoordsByCityName(searchValue, apiKey));
      console.log('City Name Endpoint Updated: ', searchValue);
    } else {
      setApiEndpoint(endpoints.getCoordsByZip(parseInt(searchValue), apiKey));
      console.log('ZipCode Endpoint Updated: ', searchValue);
    }
  }, [searchValue]);

  // ---------------finalSearchFunction---------------
  function finalSearchFunction() {
    if (Number.isNaN(parseInt(searchValue))) {
      getWeather(apiEndpoint);
      console.log('City Name Entry');
    } else {
      setApiEndpoint(endpoints.getCoordsByZip(parseInt(searchValue), apiKey));
      console.log('Zip Entry');
      getWeather(apiEndpoint);
    }
  }

  // --------------- Return---------------
  return (
    <div className='w-full flex flex-row justify-center text-black'>
      <input 
        onChange={handleChange(setSearchValue)}
        placeholder='City Name'
        className='px-2 border-black border w-20 rounded-md'
        type="text"
        ref={searchValueRef}
      />
      
      <button onClick={finalSearchFunction} className="confirm bg-white px-2 p-1 rounded-md">Confirm</button>
    </div>
  );
};

export default Input;
