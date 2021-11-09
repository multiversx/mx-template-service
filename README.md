REST API facade template for microservices that interacts with the Elrond blockchain.

## Quick start

1. Run `npm install` in the project directory
2. Optionally make edits to `config.yaml` or create `config.custom.yaml`

## Available Features

These features can be enabled/disabled in config file

### `Public API`

Endpoints that can be used by anyone (public endpoints).

### `Private API`

Endpoints that are not exposed on the internet
For example: We do not want to expose our metrics and cache interactions to anyone (/metrics /cache)

### `Cache Warmer`

This is used to keep the application cache in sync with new updates.

### `Transaction Processor`

This is used for scanning the transactions from Elrond Blockchain.

### `Queue Worker`

This is used for bull module and concurrency processing worker queues.

## Available Scripts

This is an Elrond project built on Nest.js framework.

### `npm run start:mainnet`

​
Runs the app in the production mode.
Make requests to [http://localhost:3001](http://localhost:3001).

Redis Server is required to be installed.

## Running the app

```bash
# development watch mode
$ npm run start:watch

# development debug mode
$ npm run start:debug

# development mode
$ npm run start:devnet

# production mode
$ npm run start:mainnet
```

Requests can be made to http://localhost:3001. The app will reload when you'll make edits (if opened in watch mode). You will also see any lint errors in the console.​

### `npm run test`

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
