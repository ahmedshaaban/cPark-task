VAI Task
=============

#### to run app via docker-compose:

The base url is localhost:3000 

1. open the docker-compose file and add your env in the environment section but leave the DB_HOST & PORT as it is
2. `docker-compose build`
3. `docker-compose up`

----

#### to run app native:

## Setup backend

1. `cd backend`
2. open .env.example and edit your env variables then remove .example from the extenstion file        
3. `npm i`
4. seed the database `./node_modules/babel-cli/bin/babel-node.js init-db.js`
5. `npm start`
----

## Setup frontend

The base url is localhost:3000 

1. `cd frontend`
2. open package.json in the proxy part replace `backend` with `localhost` like the following example
    ```  "proxy": "http://localhost:8080"```        
3. `yarn install`
4. `yarn start`
----

#### to test backend:

1. `npm test`
       
