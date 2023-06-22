//dependencies
const crypto = require("crypto");
const enviroments = require("./enviroments");

// module scaffolding
const utilities = {};

//parse JSON object to string

utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

//hashing
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", enviroments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = utilities;
