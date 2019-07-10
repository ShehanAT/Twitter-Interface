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


### Updates:
* Since GET direct_messages has been depriciated GET direct_messages/events/list will be used instead
* Adding search for tweets feature in the near future
