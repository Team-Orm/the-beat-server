const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).send({ error: "unauthorized" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).send({ message: "unauthorized" });
  }
}

module.exports = verifyToken;
