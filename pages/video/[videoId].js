import React from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import clsx from 'classnames'
import { getVideoById } from '../../lib/videos'
import styles from '../../styles/video.module.css'

export async function getStaticProps() {
  // const video = {
  //   title: 'title',
  //   publishTime: '1995-01-21',
  //   description:
  //     'desc...  Quo culpa saepe quos nam dolore in labore obcaecati nulla eum exercitationem sed',
  //   channelTitle: 'channel',
  //   viewCount: 2000
  // }

  const videoId = 'iyFe0M0zQ0g'

  const videoArray = await getVideoById(videoId)

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {}
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10 // In seconds
  }
}

export async function getStaticPaths() {
  const listOfVideos = ['iyFe0M0zQ0g', 'CZ1CATNbXg0', 'rNk1Wi8SvNc']

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

function Video({ video }) {
  Modal.setAppElement('#__next')
  const router = useRouter()

  const { videoId } = router.query

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
