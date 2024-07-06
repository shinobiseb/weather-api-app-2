import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import './index.css';

function App() {

  const APIKey = import.meta.env.VITE_API_KEY


  return (
    <div className='p-4 bg-black h-screen w-full text-white'>
      <Header/>
      <CurrentWeather/>
    </div>
  )
}

export default App
