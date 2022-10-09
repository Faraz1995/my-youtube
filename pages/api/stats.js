import { findVideoIdByUser, insertStats, updateStats } from '../../lib/db/hasura'
import { verifyToken } from '../../lib/utils'

export default async function stats(req, res) {
  try {
    const token = req.cookies.token
    if (token.length === 0) {
      res.status(403).send({})
    } else {
      const { videoId } = req.method === 'POST' ? req.body : req.query
      if (videoId) {
        const userId = await verifyToken(token)
        const foundVideo = await findVideoIdByUser(token, userId, videoId)
        const videoExists = foundVideo?.length > 0
        if (req.method === 'POST') {
          const { favourited, watched = true } = req.body

          if (videoExists) {
            try {
              //found it , update it
              const info = {
                favourited,
                watched,
                userId,
                videoId
              }
              const response = await updateStats(token, info)
              res.send({ msg: 'it works', data: response })
            } catch (error) {
              console.log('sth went wrong updating', error)
              res.status(500).send({ msg: error })
            }
          } else {
            // no video found in stats , add it
            const info = {
              favourited,
              watched,
              userId,
              videoId
            }
            const response = await insertStats(token, info)
            res.send({ msg: 'it works', data: response })
          }
        } else {
          // get
          if (videoExists) {
            res.send(foundVideo)
          } else {
            res.status(400)
            res.send({ msg: 'not found' })
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error })
    console.log('sth went wrong stat api', error)
  }
}
