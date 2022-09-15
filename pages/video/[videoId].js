import React from 'react'
import { useRouter } from 'next/router'

function Video() {
  const router = useRouter()

  const { videoId } = router.query

  console.log(videoId)

  return <div>[video]</div>
}

export default Video
