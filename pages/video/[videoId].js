import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import clsx from 'classnames'
import NavBar from '../../components/NavBar/NavBar'
import { getVideoById } from '../../lib/videos'
import styles from '../../styles/video.module.css'
import Like from '../../components/icons/Like'
import DisLike from '../../components/icons/DisLike'

export async function getStaticProps(context) {
  const { videoId } = context.params

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
  const [like, setLike] = useState(false)
  const [disLike, setDisLike] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getStat = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: 'get'
      })
      const data = await response.json()
      if (data.length > 0) {
        const favourited = data[0].favourited
        if (favourited === 1) {
          setLike(true)
        } else if (favourited === 0) {
          setDisLike(true)
        }
      }
    }
    getStat()
  }, [])

  const { videoId } = router.query

  const { title, publishTime, description, channelTitle, statistics, viewCount } = video

  const likeApiCall = async (favourited) => {
    return await fetch('/api/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        videoId,
        favourited
      })
    })
  }
  const handleLikeToggle = async () => {
    const prevLikeStatus = like
    setLike(!prevLikeStatus)
    setDisLike(false)

    const response = await likeApiCall(!prevLikeStatus ? 1 : 0)
    const data = await response.json()
  }
  const handleDislikeToggle = async () => {
    const prevDisLikeStatus = disLike

    setDisLike(!prevDisLikeStatus)
    setLike(false)

    const response = await likeApiCall(!prevDisLikeStatus ? 0 : 1)
    const data = await response.json()
  }
  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel='watch the video'
        onRequestClose={() => {
          router.back()
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
        <div className={styles.likeDislikeBtnWrapper}>
          <button onClick={handleLikeToggle}>
            <div className={styles.btnContainer}>
              <Like selected={like} />
            </div>
          </button>
          <button onClick={handleDislikeToggle}>
            <div className={styles.btnContainer}>
              <DisLike selected={disLike} />
            </div>
          </button>
        </div>
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
