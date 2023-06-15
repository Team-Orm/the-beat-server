const mockedVerifyToken = (req, res, next) => {
  req.user = {
    id: "test-user-id",
  };
  next();
};

module.exports = {
  mockedVerifyToken,
};
