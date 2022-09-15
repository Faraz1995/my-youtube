import React from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import clsx from 'classnames'
import styles from '../../styles/video.module.css'
function Video() {
  Modal.setAppElement('#__next')
  const router = useRouter()

  const { videoId } = router.query

  const video = {
    title: 'title',
    publishTime: '1995-01-21',
    description:
      'desc...  Quo culpa saepe quos nam dolore in labore obcaecati nulla eum exercitationem sed',
    channelTitle: 'channel',
    viewCount: 2000
  }

  console.log(videoId)

  const { title, publishTime, description, channelTitle, viewCount } = video

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel='watch the video'
        onRequestClose={() => {
          router.back()
          console.log('close')
        }}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id='ytplayer'
          type='text/html'
          width='100%'
          height='360'
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder='0'
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.descContainer}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.countContainer}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.subTitleText}>Cast: </span>
                <span className={styles.value}>{channelTitle}</span>
              </p>

              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.subTitleText}>View Count: </span>
                <span className={styles.value}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Video
