//write the code you need to grab the data from keys.js. Then store the keys in a variable.

var twitterKeys = require('twitterKeys');

//from the documentation 
//var Twitter = require('twitter');




//Make it so liri.js can take in one of the following commands:

// node liri.js my-tweets
//This will show your last 20 tweets and when they were created at in your terminal/bash window.



// spotify-this-song
//node liri.js spotify-this-song '<song name here>'





// movie-this
//node liri.js movie-this '<movie name here>'
//* Title of the movie.
//* Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
//* Actors in the movie.

// do-what-it-says
//node liri.js do-what-it-says

var command = process.argv[2];
var value = process.argv[3];


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



function movie(){

}


function tweets(){

}

function music(){

}

function random(){

}







//RESOURCES and QUESTIONS 
//https://www.npmjs.com/package/twitter
////do I need to load the fs package here?