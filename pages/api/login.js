import jwt from 'jsonwebtoken'
import { isNewUser, createNewUser } from '../../lib/db/hasura'
import { magicAdmin } from '../../lib/magic'
import { setTokenCookie } from '../../lib/cookies'
export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization
      const didToken = auth ? auth.substr(7) : ''

      //WyIweDE5NjgwZTdkMWNmMjJhYjhjOTMxZGU1MDcwNzBmYTk2MzE3YzgyNTM0MjhmZGM2OTFhZjViMWM1OGJhMDUzNmE0MjIwZDFkMjBlNTZkM2FkY2Y4NTU4NThlMjg4ZTE5Yzc2NTRiZmE3MTg3NTA2MDYzOTBmNTA5Y2Q2MWFmMWJkMWIiLCJ7XCJpYXRcIjoxNjYzODU4OTk0LFwiZXh0XCI6MTY2Mzg1OTg5NCxcImlzc1wiOlwiZGlkOmV0aHI6MHg5ZmE1QzFmNTU5RjdCZDIyRDc1MkZkMTMyNEY0NzkzY0JmMzUwNDFEXCIsXCJzdWJcIjpcInVpWVVEUW4yVUVwT3IxNGxHa1huSi1RT1VqWmRoUHRFWC1oaFdPZzJzVW89XCIsXCJhdWRcIjpcIk5tNVc0TFFHVEczcXRWVGNSUk9RamFNeDkzM0dMSGJ2U3NsS045dmsydVE9XCIsXCJuYmZcIjoxNjYzODU4OTk0LFwidGlkXCI6XCI4YTMzOTg4MS00NjRhLTQ5NDItOTc0Yy0zODgxOWEyZDllMWZcIixcImFkZFwiOlwiMHg2YzM1YWFkNGQ1YjNlYjM2MDZiZWIzNGY5ZjFkMjFkNTdhOWExNTk4OGNlNGM4MWU5ZGZhZjcwNzNkNDQ3NjJiMzYxMTgwYjk2ZjM1ZGIxMTk4MWNmZWI4NjVlZTRkOTQyMmM1NWE0OWNkMWZkZWJlNTMxZjBiYmZkYjc3OTg3YTFjXCJ9Il0=
      const metadata = await magicAdmin.users.getMetadataByToken(didToken)

      //create jwt
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`
          }
        },
        process.env.JWT_SECRET
      )

      console.log({ token })
      const isNewUserQuery = await isNewUser(token, metadata.issuer)
      isNewUserQuery && await createNewUser(token, metadata)
      const cookie = setTokenCookie(token, res)
      console.log('coookie', cookie)
      res.send({ done: true })
    } catch (error) {
      console.log('sth went wrong login api*****', error)
      res.status(500).send({ done: false })
    }
  } else {
    res.send({ done: false })
  }
}
