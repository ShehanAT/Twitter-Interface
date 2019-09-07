# Twitter-Interface
### TreeHouse Full Stack Javascript Techdegree Project Unit 7

### Live version url: https://agile-thicket-44316.herokuapp.com/

### Instructions to run locally:


1. Go to https://developer.twitter.com/, sign in or sign up, then create a new project and get your credentials by clicking the ```Keys and Tokens``` tab of your app dashboard. 
2. Clone master branch git repo 
3. Follow instructions for enabling HTTPS on localhost by following [this guide](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/)
4. run ```mkdir certs``` in the project root directory, add ```server.key``` and ```server.crt``` from step 3 to ```certs``` folder. 
3. create a ```.env``` file in the project root directory and add the following variables:
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
* 08/09/2019: added ```Sign in with Google``` button to App component UI.
* 08/10/2019: fixed OAuth functionality on dev environments(https://localhost:3000) for both Twitter and Google, sent backend Twitter data to client using socket.io instead of http request(it is faster), added gmail snippet fetching functionality(so far only shows snippet, internal date, and id for 10 latest emails)
* 08/11/2019: improved App component UI(picked color scheme for Twitter and Gmail sections), add data propogation using GoogleContents component
* 08/12/2019: relevant info on gmail cards is complete, added logout button for each side, fixed logout button position



Google Scopes for the project:
https://mail.google.com/
https://www.googleapis.com/auth/gmail.compose


