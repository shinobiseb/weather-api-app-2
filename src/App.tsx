import Header from './components/Header';
import Input from './components/Input';
import CurrentWeather from './components/CurrentWeather';
import './index.css';
import { useEffect, useState } from 'react';
import { endpoints } from './assets/endpoints';

function App() {
  const APIKey = import.meta.env.VITE_API_KEY;
  const [coords, setCoords] = useState<{ lat: number | null, lon: number | null}>({ lat: null, lon: null });
  const [searchValue, setSearchValue] = useState('');
  const [tempType, setTempType] = useState('imperial' as const);
  const [apiEndpoint, setApiEndpoint] = useState(
    endpoints.getCoordsByCityName(
      searchValue, APIKey
    )
  );
  const [data, setData] = useState<Object | null>({});

  useEffect(()=> {
    setTempType('imperial')
    console.log('Data from App.tsx: ', data);
  }, [data])

  return (
    <div className='p-2 bg-black h-screen w-full text-white'>
      <Header/>
      <Input 
        apiEndpoint={apiEndpoint}
        setApiEndpoint={setApiEndpoint}
        setData={setData}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
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
  );
}

export default App;
