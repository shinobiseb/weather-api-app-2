import Header from './components/Header';
import Input from './components/Input';
import CurrentWeather from './components/CurrentWeather';
import './index.css';
import { useState } from 'react';
import { endpoints } from './assets/endpoints';

function App() {
  const APIKey = import.meta.env.VITE_API_KEY
  const [coords, setCoords] = useState({ lat: 0, lon: 0})
  const [tempType, setTempType] = useState('imperial' as const)
  const [apiEndpoint, setApiEndpoint] = useState(
    endpoints.getWeatherByCoords( coords.lat, coords.lat, APIKey, tempType)
  )
  const [data, setData] = useState<Object | null>({})
  console.log(data)

  return (
    <div className='p-4 bg-black h-screen w-full text-white'>
      <Header/>
      <Input setCoords={setCoords} apiEndpoint={apiEndpoint} setData={setData}/>
      <CurrentWeather/>
    </div>
  )
}

export default App
