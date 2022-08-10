import { Day, localizeDay } from '../model/day';
import { WeatherKind, WeatherMapping } from '../model/weatherKind';
import styles from './card-day.module.scss';
import cardStyles from './card.module.scss';
import { WeatherIcon } from './weather-icon';

export type CardDayProps = {
    day: Day,
    minTemp: number,
    maxTemp: number,
    weather: WeatherKind
}

const CardDay : React.FC<CardDayProps> = (props) => {
  return (
    <div className={styles.cardDay}>
      <h3 className={styles.cardDayName}>{ localizeDay(props.day) }</h3>
      <WeatherIcon weather={props.weather} classes={[cardStyles.cardSvg]}/>
      <p className={styles.cardDayTempInfo}>
        <span className={styles.cardDayMinTemp}>{props.minTemp}°</span> - <span className={styles.cardDayMaxTemp}>{props.maxTemp}°</span>
      </p>
    </div>
  )
}

export default CardDay;