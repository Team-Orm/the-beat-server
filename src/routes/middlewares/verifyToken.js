const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).send({ message: "Unauthorized user" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).send({ message: "Unauthorized user" });
  }
}

module.exports = verifyToken;
