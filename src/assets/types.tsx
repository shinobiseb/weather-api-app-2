export type InputProps = {
    setCoords: React.Dispatch<React.SetStateAction<{lat: number | null, lon: number | null}>>,
    apiEndpoint: string;
    setData: React.Dispatch<React.SetStateAction<Object | null>>;
    coords: {lat: number | null, lon: number | null}
}

export interface EndpointReq {
    (lat: number, lon: number, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string;
}

export type CurrentWeatherProps = {
    data: any
}

export type SetFunction = (value: string) => void;