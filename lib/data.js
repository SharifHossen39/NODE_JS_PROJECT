//dependencies
const fs = require("fs");
const path = require("path");

const lib = {};

lib.basedir = path.join(__dirname, "/../.data/");

lib.create = (dir, file, data, callback) => {
  //open file for writing
  fs.open(lib.basedir + dir + "/" + file + ".json", "wx", (err1, fileDescriptor) => {
    if (!err1 && fileDescriptor) {
      //covert data to string
      const stringData = JSON.stringify(data);

      //write data to file then close it.
      fs.writeFile(fileDescriptor, stringData, (err2) => {
        if (!err2) {
          fs.close(fileDescriptor, (err3) => {
            if (!err3) {
              callback("false");
            } else {
              callback("Error to close file");
            }
          });
        } else {
          callback("Error writing to new file");
        }
      });
    } else {
      callback("could not create new file, it may already exist");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(lib.basedir + dir + "/" + file + ".json", "utf-8", (err, data) => {
    callback(err, data);
  });
};

lib.update = (dir, file, data, callback) => {
  //file open for writing
  fs.open(lib.basedir + dir + "/" + file + ".json", "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert the data to string
      const stringData = JSON.stringify(data);

      //truncate the file to add updated data
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          //write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              //close the file
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback("False");
                } else {
                  callback("Error to close file");
                }
              });
            } else {
              callback("Error write to file occurs");
            }
          });
        } else {
          callback("Error in truncating file");
        }
      });
    } else {
      callback("Error on updating. File may exist");
    }
  });
};

lib.delete = (dir, file, callback) => {
  //unlink file
  fs.unlink(lib.basedir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("Error file deleting");
    }
  });
};

module.exports = lib;
