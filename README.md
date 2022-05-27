# vanityAzero
An API service to generate mnemonic and addresses for new Aleph Zero accounts.

# Roadmap
- [x] Basic test API
- [x] Generate mnemonic API
- [x] Generate address API
- [x] keyring pair API (for dex)
- [x] Swagger UI support
- [x] Docker integration for pre-prod / prod env
- [x] Python, JS, Rust examples for API use


# Installation and Testing Guide

The following is the installation guideline for vanityAzero.
## Local Machine
1. Clone this repo
```
$ git clone https://github.com/azerocommunityresources/vanityAzero.git
```

2. Install the requirements (assuming you already have node configured)
```
$ npm i
```

3. Run the server
```
$ npm start

OR

$ node server/index.js
```

## Using Docker

1. Clone this repo
```
$ git clone https://github.com/azerocommunityresources/vanityAzero.git
```

2. Build the dockerfile
```
$ docker build -t vazero .
```

3. Run the server
```
$ docker run --rm -it  -p 127.0.0.1:3001:3001 vazero
```

## Documentation

The documentation can be found at ```http://localhost.com/api-docs```

**NOTE:** Please do not forget to port forward your container localhost.