REST API facade template for microservices that interacts with the MultiversX blockchain.

## Quick start

1. Run `npm install` in the project directory
2. Optionally make edits to `config.yaml` or create `config.custom.yaml` for each microservice

## Dependencies

1. Redis Server is required to be installed [docs](https://redis.io/).
2. MySQL Server is required to be installed [docs](https://dev.mysql.com/doc/refman/8.0/en/installing.html).
3. MongoDB Server is required to be installed [docs](https://docs.mongodb.com/).

You can run `docker-compose up` in a separate terminal to use a local Docker container for all these dependencies.

After running the sample, you can stop the Docker container with `docker-compose down`

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

This is used for scanning the transactions from MultiversX Blockchain.

### `Queue Worker`

This is used for concurrently processing heavy jobs.

## Available Scripts

This is a MultiversX project built on Nest.js framework.

### `npm run start:mainnet`

​
Runs the app in the production mode.
Make requests to [http://localhost:3001](http://localhost:3001).

Redis Server is required to be installed.

## Running the api

```bash
# development watch mode on devnet
$ npm run start:devnet:watch

# development debug mode on devnet
$ npm run start:devnet:debug

# development mode on devnet
$ npm run start:devnet

# production mode
$ npm run start:mainnet
```

## Running the transactions-processor

```bash
# development watch mode on devnet
$ npm run start:transactions-processor:devnet:watch

# development debug mode on devnet
$ npm run start:transactions-processor:devnet:debug

# development mode on devnet
$ npm run start:transactions-processor:devnet

# production mode
$ npm run start:transactions-processor:mainnet
```

## Running the queue-worker

```bash
# development watch mode on devnet
$ npm run start:queue-worker:devnet:watch

# development debug mode on devnet
$ npm run start:queue-worker:devnet:debug

# development mode on devnet
$ npm run start:queue-worker:devnet

# production mode
$ npm run start:queue-worker:mainnet
```

Requests can be made to http://localhost:3001 for the api. The app will reload when you'll make edits (if opened in watch mode). You will also see any lint errors in the console.​

### `npm run test`

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
