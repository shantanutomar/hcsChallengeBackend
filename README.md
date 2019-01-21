# HealthCareSystems - Tasks App

This application allows a user to add new tasks, see and update existing tasks. This requires a user to login as an exisiting user or register to the application if he/she is a new user.

The application consists of web client made in React along with a Express based API server. The server interacts with data layer in form of a MongoDB instance running on mLab (using a database cloud provider for the sake of simplicity).

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

#### Packages Used

- material-ui : The react material UI library that provides different Components that implements Google's Material Design
- axios : Promise based HTTP client for the browser and node.js
- final-form : Library provides all the form based validations for fields
- redux : State maintainance library used for maintaining app state and authentication flows
- redux-persist : Library which Persist and rehydrate a redux store. Maintains the state in localstorage of the browser
