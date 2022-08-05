import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/App.module.scss'
import { WiDaySunny, WiDayCloudyHigh } from "react-icons/wi";

const App: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.cardList}>
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
      </div>
    </div>
  )
}

export default App
