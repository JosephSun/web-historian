var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require("request");
// var httpHelpers = require('http-helpers.js')
// require more modules/folders here!
// '/', index.html


// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   list: path.join(__dirname, '../archives/sites.txt')
// };

exports.handleRequest = function (req, res) {
  if(req.method === "GET"){
    // res.writeHead()
    //check if we have the req.url. check by use of archieve helper functions.
      //if true
        //
  } else if(req.method === "POST"){
    //open that file inside of archieve. 
    if (archive.isUrlArchived() && archive.isUrlInList()){
      //USE fs.readFile for reading all these lists 
      fs.readFile(archive.paths.archivedSites + '/' + req.url,function (err, data){//where test.html put some variable that will have our file
          response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});//same for content type value.
          response.write(data);
          response.end();
     }) 
    }else {//When a url does not exist
      request(req.url, function (error, response, body) {
        if (!error) {
          //Here is where we will add the downloaded page to the archive. The downloaded page should be body. We also add the url. 
          archive.downloadUrls(req.url, body);//
        } else {
          console.log("We’ve encountered an error: " + error);
        }
      });
      
    }
  }

  res.end(archive.paths.list);
};
