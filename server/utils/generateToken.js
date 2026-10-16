const jwt = require("jsonwebtoken");

function generateToken(user, rememberMe = false) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from server/.env");
  }

  const expiresIn = rememberMe ? "7d" : "12h";

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    secret,
    {
      expiresIn,
      issuer: "eduschoolhub",
      audience: "eduschoolhub-client",
    }
  );
}

module.exports = generateToken;