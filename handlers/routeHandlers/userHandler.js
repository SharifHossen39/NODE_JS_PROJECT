/*
title: user handler
Description: Handler to handle to user related route.
*/

//dependencies

const data = require("../../lib/data.js");
const { hash } = require("../../helpers/utilities.js");
const { parseJSON } = require("../../helpers/utilities.js");

//module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedmethods = ["get", "post", "put", "delete"];
  if (acceptedmethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
handler._user = {};

handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean"
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    //make sure the user does not already exist
    data.read("users", phone, (err) => {
      if (err) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, { message: "user was created succesfully" });
          } else {
            callback(500, { error: "could not create users" });
          }
        });
      } else {
        callback(500, { error: "there was a problem in server side" });
      }
    });
  } else {
    callback(400, { error: "You have a problem in your request" });
  }
};
handler._user.get = (requestProperties, callback) => {
  //check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    //look-up the user
    data.read("users", phone, (err, u) => {
      if (!err && u) {
        const user = { ...parseJSON(u) };
        delete user.password;
        callback(200, user);
      } else {
        callback(404, { error: "requested user not found" });
      }
    });
  } else {
    callback(404, { error: "requested user not found" });
  }
};
handler._user.put = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  if (phone) {
    if (firstName || lastName || password) {
      //look-up the user
      data.read("users", phone, (err, uData) => {
        const userData = {...uData};
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.firstName = hash(password);
          }
          //update the data in file
          data.update("users", phone, userData, (err) => {
            if (!err) {
              callback(200, { message: "user updated succesfully" });
            } else {
              callback(500, { error: "There was a problem in the server side" });
            }
          });
        } else {
          callback(400, { error: "You have a problem in request" });
        }
      });
    } else {
      callback(400, { error: "You have a problem in request" });
    }
  } else {
    callback(400, { error: "Please enter a valid phone number" });
  }
};
handler._user.delete = (requestProperties, callback) => {};

module.exports = handler;
