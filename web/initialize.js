var fs = require('fs');
var archive = require('../helpers/archive-helpers');

/*Note: May need to change all of these syncs to async*/
// Sync is ok here because this is called just once on startup.
module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync("./archives")) {//checks if file exists
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync("./archives"); //Makes file
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync("./archives/sites.txt")) {
    // We use fs.openSync to create the file
    var file = fs.openSync("./archives/sites.txt", "w");/*This opens a file, w specifically opens a file for writing. If the file exists then it is truncated(replaced??)*/
    //NOTE: Maybe we store the original index site here during initialization
    fs.closeSync(file);//API is unclear
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync("./archives/sites")) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync("./archives/sites");//Makes file
  }
  console.log('*************************************************************rgsfbreegeregerge888*888***idegfieudf')
  archive.readListOfUrls();
  console.log('7&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&Apple juice')
};
