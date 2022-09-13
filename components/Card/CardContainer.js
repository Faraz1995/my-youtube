import Card from './Card'
import styles from './cardContainer.module.css'

function CardContainer(props) {
  const { title, videos=[], size } = props
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((item, index) => (
          <Card key={index} id={index} imgUrl={item.imgUrl} size={size} />
        ))}
      </div>
    </section>
  )
}

export default CardContainer
