import { IconType } from 'react-icons';
import { WiDaySunny } from 'react-icons/wi';
import { WeatherKind, WeatherMapping } from '../model/weatherKind';

const weatherToIco: WeatherMapping<IconType> = {
    'Sunny': WiDaySunny
  }

export type weatherIconProps = {
    weather: WeatherKind;
    classes?: string[];
}

export const WeatherIcon: React.FC<weatherIconProps> = (props) => {
    const Ico = weatherToIco[props.weather]
    const classes = props.classes ? props.classes : []
    return <Ico className={classes.join(' ')}/>
}