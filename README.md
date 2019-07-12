# Twitter-Interface
### TreeHouse Full Stack Javascript Techdegree Project Unit 7
### This project needs a config.js file in the root directory of this format:

```
module.exports =  {
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
   };
```
### Then run npm install in the console
### Finally npm start to start the server 

### Logs:
* Added create-react-app client for React frontend:white_check_mark:
* use #allow-insecure-localhost on chrome to bypass invalid certificate for https://localhost error:white_check_mark:
* Config project with webpack then use pug-as-jsx library to transcompile pug to jsx for Twitter component
