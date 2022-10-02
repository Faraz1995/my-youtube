import Head from 'next/head'
import CardContainer from '../components/Card/CardContainer'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/myList.module.css'

function MyList() {
  return (
    <div>
      <Head>
        <title>my list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.cardsWrapper}>
          <CardContainer title={'My list'} videos={[]} size={'large'} />
        </div>
      </main>
    </div>
  )
}

export default MyList
