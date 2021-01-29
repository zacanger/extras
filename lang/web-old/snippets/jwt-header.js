const
  header = {
  'alg' : 'HS256'
, 'typ' : 'JWT'
}
, headerB64 = btoa(JSON.stringify(header))
, payload = { // our actual claims (content)
  'name'  : 'John Doe'
, 'admin' : true
}
, payloadB64 = btoa(JSON.stringify(payload))
, signature = signatureCreatingFunction(headerB64 + '.' + payloadB64)
, signatureB64 = btoa(signature)
, jwt = headerB64 + '.' + payloadB64 + '.' + signatureB64

// and a way to check
;[headerB64, payloadB64, signatureB64] = jwt.split('.')
if (atob(signatureB64) === signatureCreatingFunction(headerB64 + '.' + payloadB64) {
  // good
} else {
  // no good
}

