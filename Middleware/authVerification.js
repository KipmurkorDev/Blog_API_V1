const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function decryptToken(token) {
  try {
    const result = jwt.verify(token, process.env.JWT_KEY);
    return result;
  } catch (ex) {
    console.error(token, ex);
    return false;
  }
}
const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).json({ error: "Missing authorization header" });

    const [bearer, token] = authorization.split(" ");

    if (bearer != "Bearer")
      return res.status(401).json({ error: "Malformed authorization" });

    const result = decryptToken(token);
    if (!result) return res.status(401).json({ error: "Invalid token" });
    res.locals.author = result.author;
    next();
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: ex.message });
  }
};

module.exports = auth;
