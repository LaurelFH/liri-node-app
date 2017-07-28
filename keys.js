console.log('these keys have loaded');
console.log("Enter all Ziri requests with quotation marks" + " ex.'Pay the Man' or 'The Blind Side'");

//info for all of the api keys 

//TWITTER
exports.twitterKeys = {
  consumer_key: 'NQpY09a5HHSkwf9sGsgcBhHz2',
  consumer_secret: 'z9DLqZMMM1GC8leobbkucVHac1zRk5h5cgo4uebdBZo535mWp8',
  access_token_key: '889956923751235584-vfKBFTz8jy5iUs6zyKY3xSiyN9BDFxX',
  access_token_secret: 'xVrvvscUEfD6nI4dFZc4EtZ8bh0W9fEzcYTDFZDGbJTvj',
}


// SPOTIFY
//may need new access token if using th web node one 
exports.spotifyKeys = {
  client_key: '7fdeef013079450483a01bf3ffae5ed5',
  client_secret: 'caebaac2804b4ceb8eecf25b801c10f2',
 // redirectUri: 'http://localhost:3000/callback',
 }



// //OMDB
//doube check the format for this one (since the key is now in the liri doc)
exports.movieKeys = {
  apikey: '40e9cece',
}


