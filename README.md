# Twitter-Interface
### TreeHouse Full Stack Javascript Techdegree Project Unit 7

### Live version url: https://agile-thicket-44316.herokuapp.com/

### Instructions to run locally:
1. Go to https://developer.twitter.com/, sign in or sign up, then create a new project and get your credentials by clicking the ```Keys and Tokens``` tab of your app dashboard. 
2. Clone master branch git repo 
3. create a ```.env``` file in the root directory and add the following variables:
  * ```CONSUMERKEY```: this should contain the API key value obtained from step 1
  * ```CONSUMERSECRET```: this should contain the API secret key value obtained from step 1
  * ```ACCESSTOKEN```: this should contain the Access token value obtained from step 1
  * ```ACCESSTOKENSECRET```: this should contain the Access token secret value obtained from step 1
  * ```SESSIONSECRET```: this should contain any string of your choosing, it's for express sessions.
4. navigate to the root directory and run ```npm install``` 
5. run ```npm start``` in root directory to start backend
6. navigate to ```client``` folder and run ```npm run start:dev``` to start front-end client 

### Then run npm install in the console
### Finally npm start to start the server 

### Logs:
* Added create-react-app client for React frontend:white_check_mark:
* use #allow-insecure-localhost on chrome to bypass invalid certificate for https://localhost error:white_check_mark:
* Create a custom twitter interface in Twitter component then inject api data to it :white_check_mark:
* need to figure out how to pass api data to child component in order to display the api data:white_check_mark:
* create attractive twitter interface to render the api data in:white_check_mark:
* style main component App.js:white_check_mark:
* upload to heroku:white_check_mark:



### Future Plans:
* Update Content component, implement more styling for App, Twitter and Content components

