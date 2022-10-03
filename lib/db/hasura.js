export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      issuer
      email
    }
  }
`
  const response = await fetchGraphQL(operationsDoc, 'isNewUser', { issuer }, token)

  return response?.data?.users?.length === 0
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation addNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
        publicAddress
      }
    }
  }
`

  const { issuer, email, publicAddress } = metadata
  const response = await fetchGraphQL(
    operationsDoc,
    'addNewUser',
    { issuer, email, publicAddress },
    token
  )

  return response
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
`

  const response = await fetchGraphQL(
    operationsDoc,
    'findVideoIdByUserId',
    { userId, videoId },
    token
  )
  return response?.data?.stats
}

export async function insertStats(token, { userId, videoId, favourited, watched }) {
  const operationsDoc = `
  mutation insertStats($userId: String! , $videoId: String! , $favourited: Int! , $watched: Boolean!) {
    insert_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      videoId: $videoId, 
      watched: $watched
    }) {
        favourited
        id
        userId
        videoId
        watched
    }
  }
`

  return await fetchGraphQL(
    operationsDoc,
    'insertStats',
    { userId, videoId, favourited, watched },
    token
  )
}

export async function updateStats(token, { userId, videoId, favourited, watched }) {
  const operationsDoc = `
mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
  
  update_stats(
    _set: {watched: $watched, favourited: $favourited},  
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}
    }) {
    returning {
      favourited,
      userId,
      watched,
      videoId
    }
  }
}
`

  return await fetchGraphQL(
    operationsDoc,
    'updateStats',
    { favourited, userId, watched, videoId },
    token
  )
}

export async function getWatchedVideos(token, userId) {
  console.log('userID', userId)
  const operationsDoc = `
  query getWatched($userId: String!) {
    stats(where: {
        watched: {_eq: true},
        userId: {_eq: $userId}
      }) {
      videoId
    }
  }
`

  const response = await fetchGraphQL(operationsDoc, 'getWatched', { userId }, token)
  return response?.data?.stats
}
export async function getMyFavourited(token, userId) {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    stats(where: {
       favourited: {_eq: 1},
       userId: {_eq: $userId}
      }) {
      videoId
    }
  }
`

  const response = await fetchGraphQL(
    operationsDoc,
    'favouritedVideos',
    { userId },
    token
  )
  console.log('response*******', response)
  return response?.data?.stats
}

export async function fetchGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName
    })
  })

  return await result.json()
}

/*
This is an example snippet - you should consider tailoring it
to your service.
*/

//insert
