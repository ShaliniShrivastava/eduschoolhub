
const jwt = require("jsonwebtoken");

const STANDARD_TOKEN_EXPIRY = "12h";
const REMEMBER_ME_TOKEN_EXPIRY = "7d";
const REMEMBER_ME_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function createAccessToken(user, rememberMe = false) {
  if (!user?._id || !user?.role) {
    throw new Error("A valid user is required to create an access token.");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: rememberMe
        ? REMEMBER_ME_TOKEN_EXPIRY
        : STANDARD_TOKEN_EXPIRY,
      algorithm: "HS256",
    }
  );
}

function getAccessCookieOptions(rememberMe = false) {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  if (rememberMe) {
    options.maxAge = REMEMBER_ME_COOKIE_MAX_AGE;
  }

  return options;
}

function issueAccessCookie(res, user, rememberMe = false) {
  const token = createAccessToken(user, rememberMe);

  res.cookie(
    "accessToken",
    token,
    getAccessCookieOptions(rememberMe)
  );
}

function clearAccessCookie(res) {
  res.clearCookie("accessToken", getAccessCookieOptions());
}

module.exports = {
  createAccessToken,
  getAccessCookieOptions,
  issueAccessCookie,
  clearAccessCookie,
};
