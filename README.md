# Tasks Planner - Backend

This application allows a user to add new tasks, see and update existing tasks. This requires a user to login as an exisiting user or register to the application if he/she is a new user.

The application consists of web client made in React along with a Express based API server. The server interacts with data layer in form of a MongoDB instance running on mLab (using a database cloud provider for the sake of simplicity).

The project demo can be seen here-> https://youtu.be/Wmh8t4urQCI

### Setting Up and Running

#### Frontend (Web Client)

- Clone the [repository](https://github.com/shantanutomar/hcs_challenge_frontend).
- Install all the required dependencies using `npm install`.
- Run a development server of web client using `npm start`. This will start web local server on `http://localhost:3000/`
- A static production build can be made using `npm run build`.

#### Backend (API server)

- Clone the [repository](https://github.com/shantanutomar/hcsChallengeBackend).
- Install all the required dependencies using `npm install`.
- Run the development server using `npm run start-dev`. This will expose the server on port 4000
- No database server is required to be run as we are a database as a service solution (_mLab_) for managing our data layer. We could have also used a local mongoDB instance.
