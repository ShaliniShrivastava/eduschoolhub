
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRY = "15m";
const STANDARD_REFRESH_TOKEN_EXPIRY = "12h";
const REMEMBER_ME_REFRESH_TOKEN_EXPIRY = "7d";

const ACCESS_COOKIE_MAX_AGE = 15 * 60 * 1000;
const REMEMBER_ME_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function validateUser(user) {
  if (!user?._id || !user?.role) {
    throw new Error("A valid user is required.");
  }
}

function getTokenOptions(expiresIn) {
  return {
    expiresIn,
    algorithm: "HS256",
    issuer: "eduschoolhub",
    audience: "eduschoolhub-client",
  };
}

function createAccessToken(user) {
  validateUser(user);

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
      tokenType: "access",
    },
    process.env.JWT_SECRET,
    getTokenOptions(ACCESS_TOKEN_EXPIRY)
  );
}

function createRefreshToken(user, rememberMe = false) {
  validateUser(user);

  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not configured.");
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
      tokenType: "refresh",
      rememberMe: rememberMe === true,
    },
    process.env.JWT_REFRESH_SECRET,
    getTokenOptions(
      rememberMe
        ? REMEMBER_ME_REFRESH_TOKEN_EXPIRY
        : STANDARD_REFRESH_TOKEN_EXPIRY
    )
  );
}

function getCookieBaseOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
}

function getAccessCookieOptions(rememberMe = false) {
  const options = getCookieBaseOptions();

  if (rememberMe) {
    options.maxAge = ACCESS_COOKIE_MAX_AGE;
  }

  return options;
}

function getRefreshCookieOptions(rememberMe = false) {
  const options = getCookieBaseOptions();

  if (rememberMe) {
    options.maxAge = REMEMBER_ME_COOKIE_MAX_AGE;
  }

  return options;
}

function issueAccessCookie(res, user, rememberMe = false) {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user, rememberMe);

  res.cookie(
    "accessToken",
    accessToken,
    getAccessCookieOptions(rememberMe)
  );

  res.cookie(
    "refreshToken",
    refreshToken,
    getRefreshCookieOptions(rememberMe)
  );
}

function verifyRefreshToken(token) {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not configured.");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET,
    {
      algorithms: ["HS256"],
      issuer: "eduschoolhub",
      audience: "eduschoolhub-client",
    }
  );

  if (
    decoded.tokenType !== "refresh" ||
    !decoded.userId
  ) {
    throw new Error("Invalid refresh token.");
  }

  return decoded;
}

function clearAccessCookie(res) {
  res.clearCookie("accessToken", getAccessCookieOptions());
  res.clearCookie("refreshToken", getRefreshCookieOptions());
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  getAccessCookieOptions,
  getRefreshCookieOptions,
  issueAccessCookie,
  verifyRefreshToken,
  clearAccessCookie,
};
