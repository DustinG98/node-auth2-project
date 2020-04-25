module.exports = (req, res, next) =>  {
    if (req.headers.token) {
      next();
    } else {
      res.status(401).json({ message: 'you shall not pass!!' });
    }
  }
