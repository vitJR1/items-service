## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## RUN

create `.env.docker` file 

run 
```bash
docker compose up -d
```

/login

login: admin
password: admin

/auth/update-password
policy: `String1!`
{
  minLength: 8,
  minUppercase: 1,
  minSymbols: 1,
  minNumbers: 1,
  minLowercase: 1,
};

