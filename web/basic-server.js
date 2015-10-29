var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");

// Why do you think we have this here?Note: We don't know. 
// HINT: It has to do with what's in .gitignore
initialize();
var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
//console.log('module.parent', module.parent);// this comes out to null. Meaning that we go through the else body. 

if (module.parent) {//The api is not clear here. This is not a good api so far. Like for realz. 
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

