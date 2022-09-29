import jwt from 'jsonwebtoken'
import { findVideoIdByUser, insertStats, updateStats } from '../../lib/db/hasura'

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token
      if (token.length === 0) {
        res.status(403).send({})
      } else {
        console.log('body****', req.body)
        const { videoId, favourited, watched = true } = req.body
        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
          const userId = decodedToken.issuer
          console.log(userId, 'user********')
          const videoExists = await findVideoIdByUser(token, userId, videoId)
          console.log('video exists', videoExists)
          if (videoExists) {
            try {
              //found it , update it
              const info = {
                favourited,
                watched,
                userId,
                videoId
              }
              console.log('info', info)
              const response = await updateStats(token, info)
              console.log('response', response)
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
        }
      }
    } catch (error) {
      res.status(500).send({ msg: error })
      console.log('sth went wrong stat api', error)
    }
  } else {
    //bad request
    res.status(400).send({ msg: 'bad request' })
  }
}
