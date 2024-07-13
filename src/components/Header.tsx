import { FaBars } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center mb-2 ">
        <h1 className='header-title text-xl'>
            WeatherApp
        </h1>
        <FaBars/>
    </header>
  )
}
