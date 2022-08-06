import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/card'
import styles from '../styles/App.module.scss'

const App: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.cardList}>
        <Card/>
      </div>
    </div>
  )
}

export default App
