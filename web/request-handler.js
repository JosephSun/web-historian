var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require("request");
var url = require('url');
var helpers = require('./http-helpers');

var getSite = function(request, response){
  //url.parse, turns a url string into an object (ex: {pathname: 'urlString'})
  var urlPath = url.parse(request.url).pathname;
   // '/' means index.html, setting up for a special case
    if (urlPath === '/') { urlPath = '/index.html'; }
    //NOTE: Will do after finishing http-helpers
    helpers.serveAssets(response, urlPath, function() {
      // trim leading slash if present
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1)}
        //check the site.text file for the user-submitted urlString
      archive.isUrlInList(urlPath, function(found){
        //if urlString is in the site.txt file 
        if (found) {
          //NOTE:Will complete after finishing http-helpers
          helpers.sendRedirect(response, '/loading.html');
        } else {//else
          //NOTE:Will complete after finishing http-helpers
          helpers.send404(response);
        }
      });
    });
};

var saveSite = function(request, response){
  helpers.collectData(request, function(data) {
    //NOTE:Will complete after finishing http-helpers
    var url = JSON.parse(data).url.replace('http://', '');
    // check sites.txt for web site
    archive.isUrlInList(url, function(found){
      if (found) { // found site
        // check if site is on disk
        archive.isUrlArchived(url, function(exists) {
          if (exists) {
            // redirect to site page (/www.google.com)
            helpers.sendRedirect(response, '/' + url);
          } else {
            // Redirect to loading.html
            helpers.sendRedirect(response, '/loading.html');
          }
        });
      } else { // not found
        // add to sites.txt
        archive.addUrlToList(url, function(){
          // Redirect to loading.html
          helpers.sendRedirect(response, '/loading.html');
        });
      }
    });
  });
};

/*exports.handleRequest = function (req, res) {

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
*/
  // res.end(archive.paths.list);
};
