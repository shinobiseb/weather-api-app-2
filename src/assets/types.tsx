export type InputProps = {
    apiEndpoint: string;
    setData: React.Dispatch<React.SetStateAction<Object | null>>;
    setCityName: React.Dispatch<React.SetStateAction<string>>;
    cityName: string;
    setApiEndpoint: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
}

export interface EndpointReq {
    (lat: number, lon: number, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string;
}

export type CurrentWeatherProps = {
    data: any;
    coords: { lat: number | null; lon: number | null };
    setCoords: React.Dispatch<React.SetStateAction<{ lat: number | null; lon: number | null }>>;
    apiKey: string;
    units: 'standard' | 'metric' | 'imperial';
}

export type SetFunction = (value: string) => void;

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
}

export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
