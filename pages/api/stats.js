import jwt from 'jsonwebtoken'
import { findVideoIdByUser } from '../../lib/db/hasura'

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token
      if (!token) {
        res.status(403).send({})
      } else {
        const videoId = req.query.videoId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.issuer
        const findVideoId = await findVideoIdByUser(userId, videoId, token)
        res.send({ msg: 'it works', findVideoId })
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
