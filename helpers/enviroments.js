/*
description: handling enviroment variables.
*/

const enviroments = {};

enviroments.staging = {
  port: 3000,
  env: "staging",
  secretKey: "asdfghjklasdfghjjk",
};

enviroments.production = {
  port: 5000,
  env: "production",
  secretKey: "jsdhcbwkejrhfgwerjcbhwekjh",
};

//determine which enviroment was passed
const currentEnviroment = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//expoprt corresponding enviroment
const enviromentToExport =
  typeof enviroments[currentEnviroment] == "object" ? enviroments[currentEnviroment] : enviroments.staging;

module.exports = enviromentToExport;
