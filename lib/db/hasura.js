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
  console.log('login new user', response)

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
  console.log('add new user', response)

  return response
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
