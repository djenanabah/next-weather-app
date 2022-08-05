import { WiDaySunny } from 'react-icons/wi';
import styles from '../styles/components/CardItem.module.scss';


const cardItem: React.FC<{}> =  (props) => {

  return (
    <div className={styles.cardItem}>
    <div className={styles.cardItemTodayInfo}>
      <h2>Paris</h2>
      <div className={styles.cardItemIcon}>
        <WiDaySunny className={`${styles.cardItemSvg} ${styles.big}`}/>
        <p>Météo clair</p>
      </div>
      <div className={styles.cardItemCurrentWeather}>
        <p>30°C</p>
        <p>18:10</p>
      </div>
    </div>
    <div className={styles.cardItemWeekInfo}>
      <div className={styles.cardItemWeekday}>
        <h3>Lundi</h3>
        <WiDaySunny className={styles.cardItemSvg}/>
        <p><span>20</span> - <span>30</span></p>
      </div>
      <div className={styles.cardItemWeekday}>
        <h3>Mardi</h3>
        <WiDaySunny className={styles.cardItemSvg}/>
        <p><span>20</span> - <span>30</span></p>
      </div>
      <div className={styles.cardItemWeekday}>
        <h3>Mercredi</h3>
        <WiDaySunny className={styles.cardItemSvg}/>
        <p><span>20</span> - <span>30</span></p>
      </div>
      <div className={styles.cardItemWeekday}>
        <h3>Jeudi</h3>
        <WiDaySunny className={styles.cardItemSvg}/>
        <p><span>20</span> - <span>30</span></p>
      </div>
    </div>
  </div>
  )
}

export default cardItem;

