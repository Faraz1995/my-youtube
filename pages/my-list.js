import Head from 'next/head'
import CardContainer from '../components/Card/CardContainer'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/myList.module.css'
import { fetchFavouritedVideos } from '../lib/videos'
import redirectUser from '../utils/redirectUser'

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context)

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const videos = await fetchFavouritedVideos(userId, token)
  return {
    props: {
      myListVideos: videos
    }
  }
}
function MyList({ myListVideos }) {
  return (
    <div>
      <Head>
        <title>my list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.cardsWrapper}>
          <CardContainer
            title={'My list'}
            videos={myListVideos}
            size={'medium'}
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  )
}

export default MyList
