import { ChangeEvent, useRef } from 'react';
import { InputProps } from '../assets/types';

const Input: React.FC<InputProps> = ({ setCoords, apiEndpoint, setData }) => {

  const handleChange = (setState: React.Dispatch<React.SetStateAction<{ lat: number, lon: number }>>, target: 'lat' | 'lon') => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const number = parseInt(value, 10);
  
      setState((prevState) => ({
          ...prevState,
          [target]: number
      }));  
  };
  

  const latRef = useRef<HTMLInputElement | null>(null);
  const lonRef = useRef<HTMLInputElement | null>(null);

  const setCoordsOnClick = () => {
    const latInput = latRef.current?.value;
    const lonInput = lonRef.current?.value;
    if(latInput !== undefined && lonInput !== undefined) {
      setCoords({
        lat: parseInt(latInput),
        lon: parseInt(lonInput)
      })
    }
  };

  const getWeather  = async ( apiEndpoint : string ) => {

    fetch(apiEndpoint)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response not OK')
        }
        return response.json()
      })
      .then(data => {
        setData(data)
      })
      .catch( error => {
        console.error('Error Alert!', error)
      })
  }

  function finalSearchFunction() {
    setCoordsOnClick()
    getWeather(apiEndpoint)
  }

  return (
    <div className='w-full flex flex-row justify-center'>
      <input 
        onChange={handleChange(setCoords, 'lat')}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        ref={latRef}
        placeholder='Latitude'
      />
      <input 
        onChange={handleChange(setCoords, 'lon')}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        ref={lonRef}
        placeholder='Longitude'
      />
      <button onClick={finalSearchFunction} className="confirm bg-white px-2 p-1 rounded-md text-black">Confirm</button>
    </div>
  );
};

export default Input;
