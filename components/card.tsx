import { WiDaySunny } from 'react-icons/wi';
import styles from './card.module.scss';
import CardDay from './card-day';
import { localizeWeather } from '../model/weather';


const Card: React.FC<{}> =  (props) => {
  return (
    <div className={styles.card}>
    <div className={styles.cardTodayInfo}>
      <h2 className={styles.cardCityName}>Paris</h2>
      <div className={styles.cardIcon}>
        <WiDaySunny className={`${styles.cardSvg} ${styles.big}`}/>
        <p className={styles.cardIconTxt}>{ localizeWeather('Sunny') }</p>
      </div>
      <div className={styles.cardCurrentWeather}>
        <div className={styles.cardCurrentTemp} >30°</div>
        <div className={styles.cardCurrentTime}>18:10</div>
      </div>
    </div>
    <div className={styles.cardWeekInfo}>

      <CardDay day='Monday' minTemp={20} maxTemp={30} weather='Sunny' />
      <CardDay day='Tuesday' minTemp={20} maxTemp={30} weather='Sunny' />
      <CardDay day='Wednesday' minTemp={20} maxTemp={30} weather='Sunny' />
      <CardDay day='Thursday' minTemp={20} maxTemp={30} weather='Sunny' />
      <CardDay day='Friday' minTemp={20} maxTemp={30} weather='Sunny' />
    </div>
  </div>
  )
}

export default Card;

