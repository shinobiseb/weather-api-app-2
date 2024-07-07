import { CurrentWeatherProps } from "../assets/types";

export default function CurrentWeather( fetchedData : any ) {

  const data = fetchedData.data

  if(Object.keys(data).length !== 0) {
    console.log(data)
  }
  
  if(data.main) {
    return (
      <main>
          <div className="main-weather flex-row flex text-white">
              <span>{data.main.temp}</span>
              <span>{data.sys.country}</span>
              <span>{data.name}</span>
          </div>
      </main>
    )
  } else {
    return null
  }
}
