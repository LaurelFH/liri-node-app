//write the code you need to grab the data from keys.js. Then store the keys in a variable.
//DON'T FORGET TO NOTE THIS IS IN THE CURRENT DIR WITH./
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var SpotifyWebApi = require('spotify-web-api-node');
var Twitter = require('twitter');
//test to make sure they are loading here
// console.log(keys.twitterKeys.consumer_key);
// console.log(keys.spotifyKeys);



// do-what-it-says
//node liri.js do-what-it-says
//need the built-in fs package here
var fs = require('fs');



//store the commands the user enters and call the value/action linked to them
// var command = process.argv[2];
// var value = process.argv[3];


//FUNCTIONS FOR EACH COMMAND 
//switch block to help liri figure out what to do in each case for the calls 
var action = process.argv[2];

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
    console.log(queryUrl);

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



}

function music(){
// spotify-this-song
//command should be:  node liri.js spotify-this-song song name here
//variable to capture the song title?
  var songTitle = process.argv[3];

  // var spotifyApi = new SpotifyWebApi({
  //   clientId: keys.spotifyKeys.client_key,
  //   clientSecret: keys.spotifyKeys.client_secret
  // });

  // spotifyApi.searchTracks(songTitle)
  //   .then(function(data) {
  //    console.log('Search by Song title', data.body);
  //     }, function(err) {
  //       console.error("Something went wrong with the request", err);
  //     });
    //reading the response-- check key/value names! 
    // var songInfo = JSON.parse(body);
    // console.log(songInfo.name);
    // console.log(songInfo.preview_url);
    // console.log(songInfo.year);
//double check the token problem with the other version with 401 error:
//https://github.com/thelinmichael/spotify-web-api-node/issues/86
  var spotify = new Spotify({
    id: keys.spotifyKeys.client_key,
    secret: keys.spotifyKeys.client_secret
  });

  
   //spotify built in call below
  spotify.search({ type: 'artist', query: songTitle}, function(err, body) {
    if (err) {
      return console.log('Error occurred: ' + err );
    }
  console.log(body); 
  // var songInfo = JSON.parse(body);
  var songInfo = JSON.stringify(body);
  console.log(songInfo.name);

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
// TO DO (IN CAPS)
//DOUBLE CHECK API/URL BUILDS IN BROWSER