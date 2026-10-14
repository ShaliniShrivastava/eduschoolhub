
const { OAuth2Client } = require("google-auth-library");

function getGoogleClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();

  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID is not configured.");
  }

  return new OAuth2Client(clientId);
}

async function verifyGoogleIdToken(idToken) {
  if (typeof idToken !== "string" || !idToken.trim()) {
    throw new Error("INVALID_GOOGLE_TOKEN");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();

  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID is not configured.");
  }

  try {
    const googleClient = getGoogleClient();

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (
      !payload?.sub ||
      !payload.email ||
      payload.email_verified !== true
    ) {
      throw new Error("UNVERIFIED_GOOGLE_ACCOUNT");
    }

    return {
      googleId: payload.sub,
      email: payload.email.trim().toLowerCase(),
      name: payload.name || "",
      emailVerified: true,
    };
  } catch (error) {
    if (
      error.message === "UNVERIFIED_GOOGLE_ACCOUNT" ||
      error.message === "INVALID_GOOGLE_TOKEN"
    ) {
      throw error;
    }

    // Do not expose Google's internal verification errors to clients.
    throw new Error("INVALID_GOOGLE_TOKEN");
  }
}

module.exports = {
  verifyGoogleIdToken,
};
