/*

title: uptime monitoring Application
Description: A RESTful API to monitor up or down time of user defined links.

*/

// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const enviroment = require("./helpers/enviroments.js");
const data = require("./lib/data.js");

// app object = module scaffolding
const app = {};

//@todo: pore muche dibo.
// data.delete("test", "newFile", (err) => {
//   console.log(err);
// });

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(enviroment.port, () => {
    console.log(`listneing to port number: ${enviroment.port}`);
  });
};

//handle request and response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();
