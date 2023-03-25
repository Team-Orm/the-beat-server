const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

exports.localRegister = async (req, res, next) => {
  const { password, uid, displayName, photoURL } = req.body;

  try {
    let user = await User.findOne({ uid });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ password }, process.env.SECRET_KEY);

    if (!user) {
      user = await User.create({
        name: displayName,
        uid,
        photoURL,
        password: hashedPassword,
        token,
      });
    }

    res.status(201).send({ result: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.localLogin = async (req, res, next) => {
  const { password, uid } = req.body;

  try {
    const user = await User.findOne({ uid });
    const isHashed = await bcrypt.compare(password, user.password);

    if (!user || !isHashed) {
      return res
        .status(400)
        .send({ message: "No user with that email or password" });
    }

    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    await User.deleteOne({ email });

    res.status(204).send({ result: "delete" });
  } catch (err) {
    next(err);
  }
};
