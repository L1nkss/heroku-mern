const jwt = require("jsonwebtoken");

const authJwt = function (req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};
module.exports = authJwt;
