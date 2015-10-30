var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  index: path.join(__dirname, '../web/public/index.html'),
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  //takes two arguments(file path, callback). callback reads the data(sites) from specified file path.
  fs.readFile(exports.paths.list, function(err, sites) {
    //sites is the buffered information (series of numbers)
    sites = sites.toString().split('\n');
    //Line above converts the numbers to string. 
    if( callback ){//if callback is not undefined
      callback(sites);//invoke callback on string. 
    }
  });
};

exports.isUrlInList = function(urlString, callback){
  //call readListOfUrls. Sites is a collection
  exports.readListOfUrls(function(sites) {
    //_.any is the alias of some. site in the anonymous function on the line under this is one single site url. i is the index of where it is.
    var found = _.any(sites, function(site, i) { 
      //return true if we have that urlString (site) 
      return site.match(urlString)//
    });
    //apply the callback to the true boolean
    callback(found);
  });
};

exports.addUrlToList = function(urlString, callback){
  //apend data to a file, creating the file if it does not yet exist. data can be a string or a buffer.
  fs.appendFile(exports.paths.list, urlString + '\n', function(err, file){
    callback();
  });
};

exports.isUrlArchived = function(urlString,callback){
  //sitePath will equal the path to the site that we have
  var sitePath = path.join(exports.paths.archivedSites, url);
  //checks whether the path exists. 
   fs.exists(sitePath, function(exists) {
    //exists will either be true or false; 
     callback(exists);
   });
};

exports.downloadUrls = function(urlStrings){
  //loops through the urlStrings collection
  _.each(urlStrings, function (urlString) {
    //if the urlString does not exist, end that iteration
    if (!urlString) { return; }
    //if it does exist then, NOTE: Need to research this a lot more. https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options //go to the readable.pipe(destination[,options])
    request('http://' + urlString).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + urlString));
  });
};
