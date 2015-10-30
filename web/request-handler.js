var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require("request");
// var httpHelpers = require('http-helpers.js')
// require more modules/folders here!
// '/', index.html
var fs = require('fs');

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   list: path.join(__dirname, '../archives/sites.txt')
// };

exports.handleRequest = function (req, res) {

  if(req.method === "GET"){
    if(req.url === "/"){
      fs.readFile(archive.paths.index, function(err, data){
        if(err){
          throw err;
        }
        res.write(data)
        res.end()
      });
    // }else if(!archive.isUrlInList(req.url)){
    //   res.writeHead(400);
    //   res.end();
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, function(err, data){
        if (err){
          // console.log("ERROR ERROR ERROR", err)
          // res.writeHead(404) //{'Content-Type': 'text/html','Content-Length':data.length})
          // res.end();
          throw err; 
        }else {
          res.write(data);
          res.end();
        }
      });
    }
  } else if(req.method === "POST"){
    if(req.url === '/'){
      fs.writeFile(archive.paths.list,req.url ,function(err, data){
        if (err) {throw err}

      });
    } else {
    //open that file inside of archieve. 
    // if (archive.isUrlArchived() && archive.isUrlInList()){
      //USE fs.readFile for reading all these lists 
      console.log("req.url", req.url)
      fs.writeFile(archive.paths.list,req.url,function (err, data){//where test.html put some variable that will have our file
          // res.writeHead(302, {'Content-Type': 'text/html','Content-Length':data.length});//same for content type value.
          if (err) {throw err}
     }) 
    }

    // }else {//When a url does not exist
    //   request(req.url, function (error, response, body) {
    //     if (!error) {
    //       //Here is where we will add the downloaded page to the archive. The downloaded page should be body. We also add the url. 
    //       archive.downloadUrls(req.url, body);//
    //     } else {
    //       console.log("We’ve encountered an error: " + error);
    //     }
    //   });
      
    // }
  }

  // res.end(archive.paths.list);
};
