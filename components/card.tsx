import { WiDaySunny } from 'react-icons/wi';
import styles from './card.module.scss';
import CardDay from './card-day';
import { localizeWeather } from '../model/weatherKind';
import { CityId, DailyWeatherState, useCity, useListCities, WeatherState } from '../store/store';
import { WeatherIcon } from './weather-icon';
import { allDays, Day } from '../model/day';

export type CardProps = {
  city: CityId
}

type DayDate = {
  day: Day,
  weatherDay: DailyWeatherState
}

function listNextDays(weatherState: WeatherState): DayDate[] {
  const today = new Date();
  const days: DayDate[] = [];

  for (let i = 0; i < 5; i++) {
    const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const dayName = allDays[day.getDay()]
    const isoDate = day.toISOString().split('T')[0]
    days.push({
      day: dayName,
      weatherDay: weatherState.dailyWeather.find(d => d.date === isoDate)!
    });
  }

  return days;
}

const Card: React.FC<CardProps> =  (props) => {
  const cityState = useCity(props.city)
  const weatherState = cityState.weather
  const now = (new Date()).toLocaleTimeString('fr-FR', { timeZone: cityState.timezone, timeStyle: 'short' }); 
  const weatherDays = listNextDays(weatherState);

  return (
    <div className={styles.card}>
    <div className={styles.cardTodayInfo}>
      <h2 className={styles.cardCityName}>{cityState.name}</h2>
      <div className={styles.cardIcon}>
        <WeatherIcon weather={weatherState.currentWeather} classes={[styles.cardSvg, styles.big]}/>
        <p className={styles.cardIconTxt}>{ localizeWeather(weatherState.currentWeather) }</p>
      </div>
      <div className={styles.cardCurrentWeather}>
        <div className={styles.cardCurrentTemp}>{weatherState.currentTemperature}°</div>
        <p className={styles.cardCurrentMinMaxTemp}>
          <span className={styles.cardCurrentMin}>min {weatherState.minTemperature}°</span> - max <span className={styles.cardCurrentMax}>{weatherState.maxTemperature}°</span>
        </p>
        <div className={styles.cardCurrentTime}>{now}</div>
      </div>
    </div>
    <div className={styles.cardWeekInfo}>
      {weatherDays.map(({ day, weatherDay }) => (
        <CardDay key={day} day={day} minTemp={weatherDay.min} maxTemp={weatherDay.max} weather={weatherDay.weather}/>
      ))}
    </div>
  </div>
  )
}

export default Card;

