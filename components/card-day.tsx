import { IconType } from 'react-icons';
import { WiDaySunny } from 'react-icons/wi';
import { Day, localizeDay } from '../model/day';
import { Weather, WeatherMapping } from '../model/weather';
import styles from './card-day.module.scss';
import cardStyles from './card.module.scss';

const weatherToIco: WeatherMapping<IconType> = {
    'Sunny': WiDaySunny
}

export type CardDayProps = {
    day: Day,
    minTemp: number,
    maxTemp: number,
    weather: Weather
}

const CardDay : React.FC<CardDayProps> = (props) => {
  const Ico = weatherToIco[props.weather]
  
  return (
    <div className={styles.cardDay}>
      <h3 className={styles.cardDayName}>{ localizeDay(props.day) }</h3>
      <Ico className={cardStyles.cardSvg}/>
      <p className={styles.cardDayTempInfo}>
        <span className={styles.cardDayMinTemp}>{props.minTemp}°</span> - <span className={styles.cardDayMaxTemp}>{props.maxTemp}°</span>
      </p>
    </div>
  )
}

export default CardDay;