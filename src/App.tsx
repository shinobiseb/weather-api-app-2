import Header from './components/Header';
import Input from './components/Input';
import CurrentWeather from './components/CurrentWeather';
import './index.css';
import { useState } from 'react';

function App() {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)

  const key = import.meta.env.VITE_API_KEY
  const apiEndpoint : string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  
  return (
    <div className='p-4 bg-black h-screen w-full text-white'>
      <Header/>
      <Input setLat={setLat} setLon={setLon}/>
      <CurrentWeather/>
    </div>
  )
}

export default App
