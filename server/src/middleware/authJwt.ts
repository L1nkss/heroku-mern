const jwt = require("jsonwebtoken");

const authJwt = function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    req.email = decoded.email;
    next();
  });
};
module.exports = authJwt;
