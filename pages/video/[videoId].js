import React from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import styles from '../../styles/video.module.css'
function Video() {
  Modal.setAppElement('#__next')
  const router = useRouter()

  const { videoId } = router.query

  console.log(videoId)

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
        <div>modal body</div>
      </Modal>
    </div>
  )
}

export default Video
