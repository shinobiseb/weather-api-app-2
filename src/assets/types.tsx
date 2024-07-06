export type InputProps = {
    setCoords: React.Dispatch<React.SetStateAction<{lat: number, lon: number}>>,
    apiEndpoint: string;
}

export type SetFunction = (value: string) => void;