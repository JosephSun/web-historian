var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require("request");
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  request(url, function (error, response, body) {
    if (!error) {
      //Here is where we will add the downloaded page to the archive. The downloaded page should be body. We also add the url. 
      //down
        
    } else {
      console.log("We’ve encountered an error: " + error);
    }
  } );
  res.end(archive.paths.list);
};
