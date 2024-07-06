import Header from './components/Header';
import Input from './components/Input';
import CurrentWeather from './components/CurrentWeather';
import './index.css';
import { useState, useEffect } from 'react';
import { endpoints } from './assets/endpoints';

function App() {
  const APIKey = import.meta.env.VITE_API_KEY
  const [coords, setCoords] = useState<{ lat: number | null, lon: number | null}>({ lat: null, lon: null})
  const [tempType, setTempType] = useState('imperial' as const)
  const [apiEndpoint, setApiEndpoint] = useState(
    endpoints.getWeatherByCoords( coords.lat, coords.lon, APIKey, tempType)
  )
  const [data, setData] = useState<Object | null>({})

  useEffect(() => {
    const endpoint = endpoints.getWeatherByCoords(coords.lat, coords.lon, APIKey, tempType);
    setApiEndpoint(endpoint);
  }, [coords, tempType]);

  return (
    <div className='p-4 bg-black h-screen w-full text-white'>
      <Header/>
      <Input 
      setCoords={setCoords} 
      apiEndpoint={apiEndpoint} 
      setData={setData}
      coords={coords}
      />
      <CurrentWeather
        data={data}
      />
    </div>
  )
}

export default App
