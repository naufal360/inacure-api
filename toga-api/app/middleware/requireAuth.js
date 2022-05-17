const requireAuth = (req, res, next) => {
  const token = req.headers.Authorization;
  console.log(token);
};

module.exports = requireAuth;
