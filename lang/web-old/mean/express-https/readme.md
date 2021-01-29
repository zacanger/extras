* generate a private key: `openssl genrsa -out key.pem 1024`
* generate certificate signing request: `openssl req -new -key key.pm -out csr.pem`
* generate self-signed certificate: `openssl x509 -req -in csr.pem -signkey key.pem -out cert.pm`

you could also send the csr to a CA to be signed

