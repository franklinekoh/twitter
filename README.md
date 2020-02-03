## twitter API
A set of API endpoint that mimics basic twitter features

### Requirement
-   Nodejs
-   sql
-   redis

### Local Setup
-   `cp` `.env.example` to `.env` and set your environment variables.
-   in your terminal, cd to app root
-   run `npm install`
-   run  `npm start`

### test
-   Follow the instructions in the Local Section Setup Above.
-   run `npx sequelize-cli db:migrate`
-   run `npm test`
-   if you experience eslint errors run 'npm pretest -- -- fix'
-   visit `http://localhost:${APP_PORT}` 

### Live Url

- https://frozen-tor-36953.herokuapp.com/

