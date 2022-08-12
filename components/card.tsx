import styles from './card.module.scss';
import CardDay from './card-day';
import { localizeWeather } from '../model/weatherKind';
import { CityId, DailyWeatherState, useCity, WeatherState } from '../store/store';
import { WeatherIcon } from './weather-icon';
import { AiOutlineLoading } from "react-icons/ai";
import { allDays, Day } from '../model/day';
import { matchLoadable } from '../model/fetchable';
import { useForecastApi } from '../store/weatherApi';

export type CardProps = {
  city: CityId
}

type DayDate = {
  day: Day,
  weatherDay: DailyWeatherState | undefined
}

function listNextDays(weatherState: WeatherState | undefined): DayDate[] {
  const today = new Date();
  const days: DayDate[] = [];

  for (let i = 0; i < 5; i++) {
    const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const dayName = allDays[day.getDay()]
    const isoDate = day.toISOString().split('T')[0]
    days.push({
      day: dayName,
      weatherDay: weatherState?.dailyWeather?.find(d => d.date === isoDate)
    });
  }

  return days;
}

const Card: React.FC<CardProps> =  (props) => {
  const cityState = useCity(props.city)
  const weatherState = useForecastApi(cityState.id)
  const maybeWeatherState = weatherState.data
  const now = (new Date()).toLocaleTimeString('fr-FR', { timeZone: cityState.timezone, timeStyle: 'short' }); 
  const weatherDays = listNextDays(maybeWeatherState);

  const weatherIcon = matchLoadable(weatherState, {
    loaded: (weatherState: WeatherState) => {
      return <WeatherIcon weather={weatherState.currentWeather} classes={[styles.cardSvg, styles.big]}/>;
    },
    loading: (oldData: WeatherState | undefined) => {
      return <AiOutlineLoading className={`${styles.cardSvg} ${styles.big} ${styles.rotateAnim}`}/>;
    },
    error: (oldData: WeatherState | undefined, msg: string) => {
      return <div className={styles.errorMessage}>Désolé, nous n{"'"}avons pas pu {oldData ? 'actualiser' : 'charger'} les données {":("}</div>;
    },
  })

  return (
    <div className={styles.card}>
    <div className={styles.cardTodayInfo}>
      <h2 className={styles.cardCityName}>{cityState.name}</h2>
      <div className={styles.cardIcon}>
        {weatherIcon}
        {maybeWeatherState ? <p className={styles.cardIconTxt}>{ localizeWeather(maybeWeatherState.currentWeather) }</p> : undefined}
      </div>
      <div className={styles.cardCurrentWeather}>
        {maybeWeatherState ? <div className={styles.cardCurrentTemp}>{maybeWeatherState.currentTemperature}°</div> : undefined}
        { maybeWeatherState ? <p className={styles.cardCurrentMinMaxTemp}> <span className={styles.cardCurrentMin}>min {maybeWeatherState.minTemperature}°</span> - max <span className={styles.cardCurrentMax}>{maybeWeatherState.maxTemperature}°</span> </p> : undefined }
        <div className={styles.cardCurrentTime}>{now}</div>
      </div>
    </div>
    <div className={styles.cardWeekInfo}>
      {weatherDays.map(({ day, weatherDay }) => (
        <CardDay key={day} day={day} weatherInfo={weatherDay}/>
      ))}
    </div>
  </div>
  )
}

export default Card;

