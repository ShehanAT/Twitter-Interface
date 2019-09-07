# Twitter-Interface
### TreeHouse Full Stack Javascript Techdegree Project Unit 7

### Live version url: https://agile-thicket-44316.herokuapp.com/

### Instructions to run locally:


1. Go to https://developer.twitter.com/, sign in or sign up, then create a new project and get your credentials by clicking the ```Keys and Tokens``` tab of your app dashboard. You will also need to make a Google project with OAuth2 credentials, more info on that [here](https://developers.google.com/identity/protocols/OAuth2)
2. Clone master branch git repo 
3. Follow instructions for enabling HTTPS on localhost by following [this guide](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/)
4. run ```mkdir certs``` in the project root directory, add ```server.key``` and ```server.crt``` from step 3 to ```certs``` folder. 
3. create a ```.env``` file in the project root directory and add the following variables:
  * ```CONSUMERKEY```: this should contain the API key value obtained from step 1
  * ```CONSUMERSECRET```: this should contain the API secret key value obtained from step 1
  * ```ACCESSTOKEN```: this should contain the Access token value obtained from step 1
  * ```ACCESSTOKENSECRET```: this should contain the Access token secret value obtained from step 1
  * ```SESSIONSECRET```: this should contain any string of your choosing, it's for express sessions.
  * ```GOOGLE_CLIENT_ID```: this should contain your Google client id, found in your Google Cloud Console, ```Credentials``` section.
  * ```GOOGLE_CLIENT_SECRET```: this should contain your Google client secret.
  * ```GOOGLE_REDIRECT_URI```: this should contain your Google redirect URI.
4. navigate to the root directory and run ```npm install``` 
5. run ```npm start``` in root directory to start backend
6. navigate to ```client``` folder and run ```npm run start:dev``` to start front-end client 
7. Then run npm install in the console
8. Finally npm start to start the server 

### Then run npm install in the console
### Finally npm start to start the server 


Google Scopes for the project:
https://mail.google.com/
https://www.googleapis.com/auth/gmail.compose


