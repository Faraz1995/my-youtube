import { useState } from 'react'
import { motion } from 'framer-motion'
import cls from 'classnames'
import Image from 'next/image'
import styles from './card.module.css'

function Card(props) {
  const {
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80',
    size = 'medium',
    id
  } = props

  const [imgSrc, setImgSrc] = useState(imgUrl)
  const handleOnErrorImg = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'
    )
  }
  const classMap = {
    large: styles.largeItem,
    medium: styles.mediumItem,
    small: styles.smallItem
  }

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          onError={handleOnErrorImg}
          src={imgSrc}
          alt='movie'
          layout='fill'
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  )
}

export default Card