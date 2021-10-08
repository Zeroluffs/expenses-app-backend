const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.header("authorization");
  if (typeof token !== "undefined") {
    const bearerToken = token.split(" ")[1];
    req.token = bearerToken;
    next();
  }
};
module.exports = verifyToken;
