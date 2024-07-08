import Header from './components/Header';
import Input from './components/Input';
import CurrentWeather from './components/CurrentWeather';
import './index.css';
import { useState, useEffect } from 'react';
import { endpoints } from './assets/endpoints';

function App() {
  const APIKey = import.meta.env.VITE_API_KEY
  const [coords, setCoords] = useState<{ lat: number | null, lon: number | null}>({ lat: null, lon: null})
  const [ cityName, setCityName ] = useState('')
  const [tempType, setTempType] = useState('imperial' as const)
  const [apiEndpoint, setApiEndpoint] = useState(
    endpoints.getCoordsByCityName(
      cityName, APIKey
    )
  )
  const [data, setData] = useState<Object | null>({})

  useEffect(() => {
    const endpoint = endpoints.getCoordsByCityName(
      cityName, APIKey
    )
    setApiEndpoint(endpoint);
  }, [cityName, tempType]);

  console.log(apiEndpoint)

  return (
    <div className='p-4 bg-black h-screen w-full text-white'>
      <Header/>
      <Input 
        apiEndpoint={apiEndpoint}
        setApiEndpoint={setApiEndpoint}
        setData={setData}
        setCityName={setCityName}
        cityName={cityName}
        apiKey={APIKey}
      />
      <CurrentWeather
        setCoords={setCoords}
        coords={coords}
        data={data}
        apiKey={APIKey}
        units={tempType}
      />
    </div>
  )
}

export default App
