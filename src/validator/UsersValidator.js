const jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.JWT_SECRET_KEY;

module.exports.validateUser = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], privateKey, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ...err,
        message: "Sorry, it seems you haven't login. Try login again.",
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  });
};
module.exports.validateAdmin = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], privateKey, (err, decoded) => {
    if (decoded.email == "thanh@gg" && !err) {
      req.user_id = decoded.id;
      next();
    } else {
      res.status(401).json({
        ...err,
        message: "Sorry, you're not an admin.",
      });
    }
  });
};
