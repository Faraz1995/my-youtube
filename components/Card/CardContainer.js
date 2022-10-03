import Link from 'next/link'
import cls from 'classnames'
import Card from './Card'
import styles from './cardContainer.module.css'

function CardContainer(props) {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((item, index) => (
          <Link key={item.id} href={`/video/${item.id}`}>
            <a>
              <Card
                id={index}
                imgUrl={item.imgUrl}
                size={size}
                shouldScale={shouldScale}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CardContainer
