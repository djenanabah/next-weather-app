import { Day, localizeDay } from '../model/day';
import { WeatherKind, WeatherMapping } from '../model/weatherKind';
import { DailyWeatherState } from '../store/store';
import styles from './card-day.module.scss';
import cardStyles from './card.module.scss';
import { WeatherIcon } from './weather-icon';

export type CardDayProps = {
    day: Day,
    weatherInfo: DailyWeatherState | undefined
}

const CardDay : React.FC<CardDayProps> = (props) => {
  if (props.weatherInfo) {
    return <div className={styles.cardDay}>
      <h3 className={styles.cardDayName}>{ localizeDay(props.day) }</h3>
      <WeatherIcon weather={props.weatherInfo.weather} classes={[cardStyles.cardSvg]}/>
      <p className={styles.cardDayTempInfo}>
        <span className={styles.cardDayMinTemp}>{props.weatherInfo.min}°</span> - <span className={styles.cardDayMaxTemp}>{props.weatherInfo.max}°</span>
      </p>
    </div>
  } else {
    return <div className={styles.cardDay}>
      <h3 className={styles.cardDayName}>{ localizeDay(props.day) }</h3>
    </div>
  }
}

export default CardDay;