# Til

### Prerequisites

In order to run this project you will need to have installed

- [Elixir](https://elixir-lang.org/install.html) - Backend compiler
- [Phoenix](https://phoenixframework.readme.io/v0.13.1/docs/installation) - Backend WEB framework
- [Postgres](https://www.postgresql.org/download/) - Database
- [Docker](https://docs.docker.com/get-docker/) - In order to run project with docker

### Setup

- `git clone <this repo>`

- `cd til`

#### Backend

- go to project -> `cd backend`

- setup environments base on `.env.template` - ask for needed secrets

##### Run with Docker

- build -> `docker-compose build`

- run -> `docker-compose up`

##### Development setup

- download dependencies -> `mix deps.get`

- setup database -> `mix ecto.setup`

- start project -> `iex -S mix phx.server`

#### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

- go to project -> `cd frontend`

##### Development setup

- install dependencies -> `npm install`

- start project -> `npm start`

- open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the tests

#### Backend

- In order to run tests you need to go through raw project setup, and then -> `mix test`

#### Frontend

- run tests -> `npm test`

## Deployment

Comming soon

## Versioning

Comming soon
