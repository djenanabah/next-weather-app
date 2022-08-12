import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/card'
import SearchCity from '../components/search-city'
import { useCitiesSearch } from '../store/cityApi'
import { useListCities } from '../store/store'
import styles from '../styles/App.module.scss'

const App: NextPage = () => {
  const list = useListCities()

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.searchBar}>
        <SearchCity />
      </div>

      <div className={styles.cardList}>
        {list.map(city => (
          <Card city={city} key={`${city}`}/>
        ))}
      </div>
    </div>
  )
}

export default App
