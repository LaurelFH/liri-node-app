//write the code you need to grab the data from keys.js. Then store the keys in a variable.
//DON'T FORGET TO NOTE THIS IS IN THE CURRENT DIR WITH./
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var SpotifyWebApi = require('spotify-web-api-node');
var Twitter = require('twitter');
var fs = require('fs');
//test to make sure they are loading here
// console.log(keys.twitterKeys.consumer_key);
// console.log(keys.spotifyKeys);



//store the commands the user enters and call the value/action linked to them
// var command = process.argv[2];
// var value = process.argv[3];

//////////////FUNCTIONS FOR EACH COMMAND 
//switch block to help liri figure out what to do in each case for the calls 
var command = process.argv[2];

switch (command) {
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
    // movie-this
    //node liri.js movie-this '<movie name here>'
    //Be sure to put in the key info for the movie api 
    //FORMAT:  http://www.omdbapi.com/?apikey=[yourkey]&  

    //capture the title posted by the user 
    //double check what to do if more than one word movie title!!!! 
    var title = process.argv[3];
    //testing full api call?
    var queryUrl= "http://www.omdbapi.com/?apikey="+keys.movieKeys.apikey +"&t=" + title;
    //make sure the url works
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred 
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        // console.log('body:', body); // Print the HTML for the Google homepage. 
        var movieInfo = JSON.parse(body);
        //print out specific info from the body

        console.log("Title: " + movieInfo.Title);
        console.log("Year: " + movieInfo.Year);
        console.log("IMDB Rating: " + movieInfo.Ratings[2].Value);
        console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
        console.log("Country: " + movieInfo.Country);
        console.log("Language: " + movieInfo.Language);
        console.log("Plot: " + movieInfo.Plot);

      });
}


function tweets(){

//Make it so liri.js can take in one of the following commands:
// node liri.js my-tweets
//This will show your last 20 tweets and when they were created at in your terminal/bash window.

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
 //check my username for that account may not have the spaces/underscores
 var userName= "OurLadyofMemes"
var params = {screen_name: userName, count: 20, include_rts: true};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   //making sure I got the tweets loaded
   for(var i = 0; i <= tweets.length; i++){
    console.log(tweets[i].text);
     console.log(tweets[i].created_at);
   }//ends my for loop
    // console.log(response);
    // var tweetInfo = JSON.parse(response);
    // console.log(tweetInfo.text);
  }//ends the if not an error statement
  // //console.log the text of the tweets from the JSON?
  // console.log(tweets.text);
});
}//ends tweet function 

function music(){
// spotify-this-song
//command should be:  node liri.js spotify-this-song song name here
//variable to capture the song title?
  var songTitle = process.argv[3];

  var spotifyApi = new SpotifyWebApi({
    clientId: keys.spotifyKeys.client_key,
    clientSecret: keys.spotifyKeys.client_secret
  });

// //version that contians a wrapper
//   spotifyApi.searchTracks(songTitle)
//     .then(function(data) {
//      console.log('Search by Song title', data);
//      // console.log(data);
//       }, function(err) {
//         console.error("Something went wrong with the request", err);
//       });

    // //reading the response-- check key/value names! 
    // var songInfo = JSON.parse(data);
    // console.log(data.name);
    // console.log(songInfo.preview_url);
    // console.log(songInfo.year);

// //double check the token problem with the other version with 401 error:
// //https://github.com/thelinmichael/spotify-web-api-node/issues/86
//   // When our access token will expire
// var tokenExpirationEpoch;
// var authorizationCode = 
// // First retrieve an access token
// spotifyApi.authorizationCodeGrant(authorizationCode)
//   .then(function(data) {

//     // Set the access token and refresh token
//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);

//     // Save the amount of seconds until the access token expired
//     tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
//     console.log('Retrieved token. It expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
//   }, function(err) {
//     console.log('Something went wrong when retrieving the access token!', err.message);
//   });

// // Continually print out the time left until the token expires..
// var numberOfTimesUpdated = 0;

// setInterval(function() {
//   console.log('Time left: ' + Math.floor((tokenExpirationEpoch - new Date().getTime() / 1000)) + ' seconds left!');

//   // OK, we need to refresh the token. Stop printing and refresh.
//   if (++numberOfTimesUpdated > 5) {
//     clearInterval(this);

//     // Refresh token and print the new time to expiration.
//     spotifyApi.refreshAccessToken()
//       .then(function(data) {
//         tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
//         console.log('Refreshed token. It now expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
//       }, function(err) {
//         console.log('Could not refresh the token!', err.message);
//       });
//   }
// }, 1000);


  //version that returns an object 
  var spotify = new Spotify({
    id: keys.spotifyKeys.client_key,
    secret: keys.spotifyKeys.client_secret
  });

  
   //spotify built in call below
  spotify.search({ type: 'track', query: songTitle}, function(err, body) {
    if (err) {
      return console.log('Error occurred: ' + err );
    }

  // console.log(songTitle);
  // console.log(spotify);
  console.log(body.tracks.items[0]);
  var songInfo = JSON.stringify(body);
  // console.log(body.tracks);
  // var songInfo = JSON.Stringify(body);
  // console.log(songInfo.name);
  // console.log(body.artists);
  // console.log(songInfo.items[0]);
  // console.log(songInfo.artists.items);
  });
//console log all of the spotify data here; FIND THE JSON FORMAT 
// o Artist(s)
// o The song's name
// o A preview link of the song from Spotify
// o The album that the song is from
//// • If no song is provided then your program will default to "The Sign" by Ace of Base.
   // console.log(data.album.name);

}

function random(){
//Using the fs Node package, LIRI will take the text inside of random.txt 
//and then use it to call one of LIRI's commands.
//double chek the position of the commands 
//node liri.js do-what-it-says then another command?
// var command = process.argv[3];

fs.readFile("random.txt", "utf8", function(error, data){
  //error message
  if(error){
    console.log("there was a problem reading this file:" + error);
  }
    //prints out the content of data
    console.log(data);
    //turn data into an object or array?
    var dataArr = [];
    var data = data.split(",");
    // dataArr.push(data);
    // console.log(dataArr);
    // console.log(data);

    //take the first index and store it as a new command?
    var newCommand = dataArr[1];
    // console.log(newCommand); 
   
});

//using append etc. to make liri call on one of the other functions?
  //take the values from the text file, and call one of the functions based on the info?
//call the switch statement again

  // var command = process.argv[2];

  //  fs.appendFile("random.txt", command, function(error){
  //   if(error){
  //     console.log("there was an error:" + error);
  //   } else{

  //             switch (command) {
  //         case "movie-this":
  //           movie();
  //           break;

  //         case "my-tweets":
  //           tweets();
  //           break;

  //         case "spotify-this-song":
  //           music();
  //           break;

  //         case "do-what-it-says":
  //           random();
  //           break;
  //       }

  //   }//ends the else

  //  })//ends the appendfile

//set up an if/else functino to do this?







}







//RESOURCES and QUESTIONS 
//https://www.npmjs.com/package/twitter
// twitter rest api info here:  https://www.npmjs.com/package/twitter
// npm for omdb for later exploration:  https://www.npmjs.com/package/omdb
// data that returns for the spotify api:  https://developer.spotify.com/web-api/endpoint-reference/
// more on data for the spotify api track info JSON:  https://developer.spotify.com/web-api/get-track/
// https://developer.spotify.com/web-api/search-item/
// More on endpoints for twitter:  https://dev.twitter.com/rest/reference
// Sample response from JSON: https://dev.twitter.com/rest/reference/get/statuses/user_timeline
//ADD THIS PACKAGE:  https://github.com/thelinmichael/spotify-web-api-node/blob/master/README.md
// more on fs: https://www.w3schools.com/nodejs/nodejs_filesystem.asp 
//https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm
//able to use jquery in node: https://stackoverflow.com/questions/1801160/can-i-use-jquery-with-node-js
//https://www.npmjs.com/package/jquery
//fix token problem in spotify:?  http://jkaufman.io/spotify-auth-react-router/
//https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/access-token-refresh.js
//https://stackoverflow.com/questions/39887342/how-can-i-get-an-access-token-spotify-api
//https://developer.spotify.com/web-api/authorization-guide/
//
//
//https://github.com/thelinmichael/spotify-web-api-node/issues/86
//TO DO (IN CAPS)
//DOUBLE CHECK API/URL BUILDS IN BROWSER