parking system using nodejs, mongodb and docker
=============

an app that will display the last and closest reports sent by the community to an API server.

Create a Frontend app using React Native, that will enable the user to send reports to the server and display the list of those reports, filtered by time and/or distance.

## Structure of a report

A report is a timed gospatial record. It has the following fields:

| Name      | Type          | Description                       |
|-----------|---------------|-----------------------------------|
| _id       | `ObjectID`    | Unique ID for the record          |
| title     | `String`      | Title of the record               |
| time      | `Datetime`    | Date and time of the record       |
| position  | `Coordinates` | Latitude/Longitude of the report  |

## Frontend base

The app has two views: The "Report View" and the "List of Reports". This app should be runnable directly (in one command) for the reviewer.

### Report View

Form that allows the user to send a new Report to the server. The user can only choose a title and a time for the report.

Position is retrieved using the geolocation of the phone.

### List of Reports

List of reports previously sent to the server. The list can be ordered by time (last report first) or by distance (closest first).

## Backend base

The backend is a REST API. Use Express or Restify to handle requests from the clients.
The API connects to a mongoDB server (local of remote, as you want).

There are two mandatory endpoints:

| Path                | Method  | Desciption                  |
|---------------------|---------|-----------------------------|
| `/report`           | POST    | Register a new report in DB |
| `/report/:lat/:long`| GET     | Get the list of reports     |

The list of reports depends on the position: `lat` is the latitude and `long` the longitude. We only want the reports around the user (Max 10km of distance).

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
       
