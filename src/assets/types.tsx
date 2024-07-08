export type InputProps = {
    apiEndpoint: string;
    setData: React.Dispatch<React.SetStateAction<Object | null>>;
    setCityName: React.Dispatch<React.SetStateAction<string>>;
    cityName : string
    setApiEndpoint: React.Dispatch<React.SetStateAction<string>>;
    apiKey : string
}

export interface EndpointReq {
    (lat: number, lon: number, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string;
}

export type CurrentWeatherProps = {
    data: any;
    coords : { lat: number | null, lon: number | null };
    setCoords: React.Dispatch<React.SetStateAction<{ lat: number | null; lon: number | null }>>;
    apiKey : string;
    units : 'standard' | 'metric' | 'imperial';
}

export type SetFunction = (value: string) => void;