export type InputProps = {
    setCoords: React.Dispatch<React.SetStateAction<{lat: number, lon: number}>>,
    apiEndpoint: string;
    setData: React.Dispatch<React.SetStateAction<Object | null>>
}

export interface EndpointReq {
    (lat: number, lon: number, APIKey: string, units: 'standard' | 'metric' | 'imperial'): string;
}

export type SetFunction = (value: string) => void;