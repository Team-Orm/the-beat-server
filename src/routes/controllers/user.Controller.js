const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res, next) => {
  const { accessToken, uid, displayName, photoURL } = req.body;
 
  if (!accessToken || !uid || !displayName || !photoURL) {
    return res.status(401).send({ message: "Invalid user" });
  }

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        name: displayName,
        uid,
        photoURL,
      });
    }

    const users = await User.find();

    const token = jwt.sign({ accessToken }, process.env.SECRET_KEY);

    res.status(201).send({ users, token });
  } catch (err) {
    next(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    if (req.session) {
      await req.session.destroy();
    }
    res.clearCookie("jwt");

    res.status(204).send({ result: "ok" });
  } catch (err) {
    next(err);
  }
};
