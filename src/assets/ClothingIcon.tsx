import { useState, useEffect, FC } from 'react';
import { 
  IoShirtOutline,
  IoThermometerOutline,
  IoSnowOutline,
  IoSunnyOutline,
  IoRainyOutline,
  IoPartlySunnyOutline,
  IoThunderstormOutline,
  IoCloudyOutline,
  IoLeafOutline
} from 'react-icons/io5';

interface ClothingIconProps {
  recommendation: string;
  size?: number;
}

const getClothingIcon = (recommendation: string, size: number): JSX.Element => {
  const lowerRec = recommendation.toLowerCase();

  switch (lowerRec) {
    case 'very cold':
      return <IoSnowOutline size={size} />;
    case 'cold weather':
      return <IoThermometerOutline size={size} />;
    case 'mild weather':
      return <IoLeafOutline size={size} />;
    case 'hot weather':
      return <IoSunnyOutline size={size} />;
    case 'rainy':
      return <IoRainyOutline size={size} />;
    case 'windy':
      return <IoPartlySunnyOutline size={size} />;
    case 'thunderstorm':
      return <IoThunderstormOutline size={size} />;
    case 'cloudy':
      return <IoCloudyOutline size={size} />;
    default:
      return <IoShirtOutline size={size} />;
  }
};

const ClothingIcon: FC<ClothingIconProps> = ({ recommendation, size = 50 }) => {
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setIcon(getClothingIcon(recommendation, size));
  }, [recommendation, size]);

  return <div>{icon}</div>;
};

export default ClothingIcon;
