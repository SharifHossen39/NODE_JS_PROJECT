/* 

title: uptime monitoring Application
Description: A RESTful API to monitor up or down time of user defined links.

*/

//dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes.js");
const { notFoundHandler } = require("../handlers/routeHandlers/notFoundHandler.js");
const { parseJSON } = require("../helpers/utilities.js");

//module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  //request handle
  //get the url and parsed it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimedpath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimedpath,
    method,
    queryStringObject,
    headerObject,
  };
  const decoder = new StringDecoder("utf-8");

  let realData = "";

  const chosenHandler = routes[trimedpath] ? routes[trimedpath] : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body = parseJSON(realData);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);
      // return the final response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
