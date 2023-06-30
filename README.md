# House of Games API

## Background

A REST API for boardgame reviews developed as a solo project during Northcoders Bootcamp.

<!-- A version of this app is hosted [here](https://nc-games-portfolio.herokuapp.com/api). -->

## Setup Process

If you want to develop this project you will first need to:

1. Fork a copy to your GitHub account
2. Clone the repo to your local machine
   ```
   git clone urlForYourFork
   ```
3. Install dependencies

   ```
   npm install
   ```

4. Set up .env files
   To use your clone you will need to create two .env files.

   - .env.test
   - .env.development

   Into each add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names).

5. The test system will seed a test database for you, just run:
   ```
   npm test
   ```
6. To seed the development database run :
   ```
   npm run seed
   ```
7. You can now start the app locally (note: use ctrl+c to kill the server):
   ```
   npm run start
   ```
8. All done! You can now make requests to your server with a programmes such as [Insomnia](https://insomnia.rest/).

## Structure

### Built using:

- [Node.js](https://nodejs.org/en/about/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Full TDD using:

- [Jest](https://jestjs.io/)

### Minimum Requirements

- Node.js v18.2.0
- Postgres v12.11

## Enjoy!
