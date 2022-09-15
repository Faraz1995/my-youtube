import Link from 'next/link'

import Card from './Card'
import styles from './cardContainer.module.css'

function CardContainer(props) {
  const { title, videos = [], size } = props
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((item, index) => (
          <Link key={index} href={`/video/${item.id}`}>
            <Card id={index} imgUrl={item.imgUrl} size={size} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CardContainer
