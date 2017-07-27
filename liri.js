//write the code you need to grab the data from keys.js. Then store the keys in a variable.
//DON'T FORGET TO NOTE THIS IS IN THE CURRENT DIR WITH./
var keys = require('./keys.js');
// console.log(keys.twitterKeys.consumer_key);
//test to make sure they are loading here
console.log(keys);

//Make it so liri.js can take in one of the following commands:
// node liri.js my-tweets
//This will show your last 20 tweets and when they were created at in your terminal/bash window.
// var Twitter = require('twitter');
 
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });


// spotify-this-song
//command should be:  node liri.js spotify-this-song '<song name here>'

// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });



// movie-this
//node liri.js movie-this '<movie name here>'
//Be sure to put in the key info for the movie api 
//FORMAT:  http://www.omdbapi.com/?apikey=[yourkey]&
var request = require('request');
//tetsign full api call?
var queryUrl= "http://www.omdbapi.com/?apikey=40e9cece&t=";
//capture the title posted by the user 
var title = process.argv[3];




request('http://www.omdbapi.com/?apikey=[moviekeys]&', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});



//might use const instead of var?


// do-what-it-says
//node liri.js do-what-it-says
//need the built-in fs package here
var fs = require('fs');



//store the commands the user enters and call the value/action linked to them
// var command = process.argv[2];
// var value = process.argv[3];


//FUNCTIONS FOR EACH COMMAND 
//switch block to help liri figure out what to do in each case for the calls 

switch (action) {
  case "movie-this":
    movie();
    break;

  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    music();
    break;

  case "do-what-it-says":
    random();
    break;
}


//takes in the title entered by the user and sends back title, year, rotten rating,
// country produced, language, plot, actors 
function movie(){
    //captures the name of the movie in the 4th position
    var movieName = process.argv[3];
    //builds the URL based on the info from the user 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece"
    //console.log the result to test this
    console.log(queryUrl);





}


function tweets(){

}

function music(){

}

function random(){

}







//RESOURCES and QUESTIONS 
//https://www.npmjs.com/package/twitter
// twitter rest api info here:  https://www.npmjs.com/package/twitter
// npm for omdb for later exploration:  https://www.npmjs.com/package/omdb
// 
// 
// 
// 
// 
// TO DO (IN CAPS)
//DOUBLE CHECK API/URL BUILDS IN BROWSER