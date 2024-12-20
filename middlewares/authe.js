// yeh middleware user ko check krke btayega ki yeh autorized user h yaa nhii
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token; //reading that token

  if (!token) {
    return res.status(401).json({
      message: "unauthorised",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "unauthorised",
    });
  }
}

module.exports = auth;
