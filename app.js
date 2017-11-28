var express = require('express');
const Twit = require('twit');//twitter API package
const fs = require('fs');
var app = express();
const pug = require('pug');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var config = require('./config.js');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
var T = new Twit(config);//configuring the config.js with the Twitter API to check for validation


app.set('port', 3000);
//loading view engine
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + ""));
app.use(express.static(__dirname + '/views'));

app.use('/static', express.static('public'));


var followers = []; //big list of arrays used to store the API data
var timeline = [];
var timeline_time = [];
var recieved_dms = [];
var recieved_dms_time = [];
var tweets = {};
var dmprofile_img = [];
var dms = [];
var sent_dms = [];
var sent_dms_time = [];
var main_dms = [];
var followersCount;
var screen_Name;
var profile_img;
var profileBackground;
var loadData = Promise.defer(); //Making a defered promise object
var promise = loadData.promise; //promise object


promise.then((value) => { //using then to collect API data 
    T.get('friends/list', {
        count: 5
    }, function(err, data, response) {
        followers.push(data);
    })
    T.get('statuses/user_timeline', {
        count: 5
    }, function(err, data, response) { //using twitter API to get user timeline info
        for (var i = 0; i < 5; i++) {
            timeline.push(data[i]);
            timeline_time.push(data[i].created_at.slice(0, 11) + data[i].created_at.slice(26, 30) + data[i].created_at.slice(10, 20));

        }
        profileBackground = timeline[0].user.profile_banner_url; //extracting and storing profile image url
        followersCount = timeline[0].user.friends_count; //extracting and storingfriends count
        screen_Name = timeline[0].user.screen_name; //extracting and storing scree name
        profile_img = timeline[0].user.profile_image_url; //extracting and storing profile image url 
    });
    T.get('direct_messages', {
        count: 5
    }, function(err, data, response) { //using twitter API to get user direct messages
        for (var i = 0; i < 5; i++) {
            recieved_dms.push(data[i].text);
            recieved_dms_time.push(data[i].created_at.slice(0, 11) + data[i].created_at.slice(26, 30)); //formating the data to YYYY-MM-DD
        }
        dms.push(data);
    });
    T.get('direct_messages/sent', {
        count: 5
    }, function(err, data, response) { //using twitter API to get direct messages that were sent by the user
        for (var i = 0; i < data.length; i++) {
            sent_dms.push(data[i].text);
            sent_dms_time.push(data[i].created_at.slice(0, 11) + data[i].created_at.slice(26, 30)); //formating the data to YYYY-MM-DD
        }

    });
    app.get('/', function(req, res, next) { //get request for the home page
        res.render('./partials/layout.pug', {
            profileBackground,
            timeline_time,
            recieved_dms_time,
            sent_dms_time,
            recieved_dms,
            sent_dms,
            dmprofile_img,
            followers,
            timeline,
            dms,
            followersCount,
            screen_Name,
            profile_img,
            sent_dms
        }); //sending all the stored array info to the layout.pug
    });
    app.post('/', function(req, res, next) { //post request for when the tweet button is clicked 
        res.cookie('username', req.body.username);
        T.post('statuses/update', {
            status: req.body.username
        }, function(err, data, response) { //tweeting the message in the input field to Twitter
            T.get('statuses/user_timeline', {
                count: 5
            }, function(err, data, response) { //getting the 5 most recent tweets from the user's account
                timeline = [];
                timeline_time = [];
                followersCount;
                screen_Name;
                profile_img;

                for (var i = 0; i < 5; i++) {//looping through 5 messages and pushing them into an array
                    timeline.push(data[i]);
                    timeline_time.push(data[i].created_at.slice(0, 11) + data[i].created_at.slice(26, 30) + data[i].created_at.slice(10, 20));

                }

                followersCount = timeline[0].user.followers_count;
                screen_Name = timeline[0].user.screen_name;
                profile_img = timeline[0].user.profile_image_url;
                res.render('./partials/layout.pug', {//sending the API data stored in arrays to layout.pug
                    profileBackground,
                    timeline_time,
                    recieved_dms_time,
                    sent_dms_time,
                    recieved_dms,
                    sent_dms,
                    dmprofile_img,
                    followers,
                    timeline,
                    dms,
                    followersCount,
                    screen_Name,
                    profile_img,
                    sent_dms
                });
            });

        })
    })
    app.use((err, res, body) => {//rending error page if invalid url is typed
        var err = new Error('Not Found');
        err.status = 404;
        res.status(404).render('error/error.pug');
    });


}).catch((value) => {//if error occurs render the error page
    app.use((req, res) => {
        res.status(404).render('error/error.pug');
    });
});


app.listen(app.get('port'), function() {//app listening 
    (function funcOne(input) {//function that checks internet connectivity
        var request = require('request');
        request.post('https://www.google.ca/', {
            json: true,
            body: input
        }, function(err, res, body) {
            if (!err && res.statusCode === 405) {
                loadData.resolve();
            } else {//if offline logs error message and renders error page
                console.log(err);
                app.use((req, res) => {
                    res.status(404).render('error/error.pug');
                });
            }
        });
    })();
    console.log('Im listening on port: ' + app.get('port'));//server up message
});
