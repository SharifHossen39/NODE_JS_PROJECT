/*
title: not found handler
Description: not found handler
*/

//module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties,callback) => {
  callback(404, {
    message: "Your requested url was not found",
  });
};

module.exports = handler;
