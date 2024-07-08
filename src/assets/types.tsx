export type InputProps = {
    setCoords: React.Dispatch<React.SetStateAction<{lat: number | null, lon: number | null}>>,
    apiEndpoint: string;
    setData: React.Dispatch<React.SetStateAction<Object | null>>;
    coords: {lat: number | null, lon: number | null};
    setCityName: React.Dispatch<React.SetStateAction<string>>;
    setApiEndpoint: React.Dispatch<React.SetStateAction<string>>
}

export interface EndpointReq {
    (lat: number, lon: number, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string;
}

export type CurrentWeatherProps = {
    data: any
}

export type SetFunction = (value: string) => void;