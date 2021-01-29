import fetch from 'node-fetch'

/*
 * Dead simple Hashicorp Vault client for Node and Browser.
 * It can only get secrets.
 * Example usage:
 * First have the above environment variables set.
 *
 * import vault from './this-file'
 * vaultClient = vault({ token, user, pass, uri })
 * // uri is required
 * // either user + pass or token is required
 *
 * const somePassword = await vaultClient('path/to/password')
 *
 * vaultClient('path/to/password')
 *   .then((password) => {
 *     doSomeThing(password)
 *   })
 */

const vault = ({ token, user, pass, uri }) => {
  const cache = {}
  let headers = {}

  if (token) {
    headers = { 'x-vault-token': token }
  } else if (user && pass) {
    const path = `${uri}/v1/auth/userpass/login/${user}`
    const body = JSON.stringify({ password: pass })
    fetch(path, {
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ auth }) => auth.client_token)
      .then((token) => {
        headers = { 'x-vault-token': token }
      })
      .catch((err) => {
        console.error(err)
      })
  } else {
    console.error('No Vault authentication method available')
  }

  return (secretPath) => {
    if (cache[secretPath]) {
      return cache[secretPath]
    }

    return fetch(`${uri}/v1/secret/${secretPath}`, {
      headers: {
        ...headers,
        accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        cache[secretPath] = data
        return data
      })
  }
}

export default vault
