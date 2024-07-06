import { ChangeEvent, useRef, useEffect } from 'react';
import { InputProps } from '../assets/types';

const Input: React.FC<InputProps> = ({ setCoords, apiEndpoint, setData, coords }) => {

  const handleChange = (setState: React.Dispatch<React.SetStateAction<{ lat: number | null, lon: number | null }>>, target: 'lat' | 'lon') => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const number = parseFloat(value);

      setState((prevState) => ({
          ...prevState,
          [target]: isNaN(number) ? null : number
      }));  
  };
  
  const latRef = useRef<HTMLInputElement | null>(null);
  const lonRef = useRef<HTMLInputElement | null>(null);

  const setCoordsOnClick = () => {
    const latInput = latRef.current?.value;
    const lonInput = lonRef.current?.value;
    
    if (latInput !== undefined && latInput !== null && lonInput !== undefined && lonInput !== null) {
      const latFloat = parseFloat(latInput);
      const lonFloat = parseFloat(lonInput);

      if (isNaN(latFloat) || isNaN(lonFloat)) {
        console.error('Invalid latitude or longitude');
        return;
      }
      setCoords({
        lat: latFloat,
        lon: lonFloat
      });
    }
  };

  const getWeather = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`Network response not OK: ${response.statusText}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  function finalSearchFunction() {
    setCoordsOnClick();
    if (coords.lat !== null && coords.lon !== null) {
      getWeather(apiEndpoint);
    }
  }

  return (
    <div className='w-full flex flex-row justify-center text-black'>
      <input 
        onChange={handleChange(setCoords, 'lat')}
        className='px-2 border-black border w-20 rounded-md' 
        type="number"
        ref={latRef}
        placeholder='Latitude'
      />
      <input 
        onChange={handleChange(setCoords, 'lon')}
        className='px-2 border-black border w-20 rounded-md' 
        type="number"
        ref={lonRef}
        placeholder='Longitude'
      />
      {/* <select name="units" id="">
        <option value="imperial">F</option>
        <option value="metric">C</option>
      </select> */}
      
      <button onClick={finalSearchFunction} className="confirm bg-white px-2 p-1 rounded-md">Confirm</button>
    </div>
  );
};

export default Input;
