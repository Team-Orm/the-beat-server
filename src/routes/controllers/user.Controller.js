const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res, next) => {
  const { accessToken, uid, displayName, photoURL } = req.body;

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
