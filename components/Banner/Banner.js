import Image from 'next/image'
import styles from './banner.module.css'

function Banner({ title, subTitle, imgUrl }) {
  const handlePlayClick = () => {}
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.nSeriesContainer}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S </p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.btnContainer}>
            <button className={styles.playBtn} onClick={handlePlayClick}>
              <Image
                src={'/static/play_arrow.svg'}
                alt='play'
                width={'32px'}
                height={'32px'}
              />
              <span className={styles.btnText}> Play </span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
        }}
      ></div>
    </div>
  )
}

export default Banner
