import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { requireAuth, attachUser } from "../middleware/auth.js";

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signAppJwt(userId) {
  return jwt.sign({ uid: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

// @route POST /api/auth/google
// @desc Verify Google ID token (credential) and issue app JWT
// @body { credential: string }
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body || {};
    if (!credential)
      return res.status(400).json({ error: "Missing credential" });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // payload fields: sub (googleId), email, email_verified, name, picture
    if (!payload?.email || payload.email_verified === false) {
      return res.status(400).json({ error: "Unverified Google account" });
    }

    const googleId = payload.sub;
    const update = {
      googleId,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    const user = await User.findOneAndUpdate(
      { $or: [{ googleId }, { email: payload.email }] },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const token = signAppJwt(user._id.toString());
    setAuthCookie(res, token);

    return res.json({
      token, // also sent as httpOnly cookie
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("/api/auth/google error", err);
    return res.status(401).json({ error: "Google token invalid" });
  }
});

// @route GET /api/auth/me
// @desc Return current user (requires JWT)
router.get("/me", requireAuth, attachUser, (req, res) => {
  if (!req.user) return res.status(404).json({ error: "User not found" });
  return res.json({ user: req.user });
});

// @route POST /api/auth/logout
router.post("/logout", (_req, res) => {
  res.clearCookie(process.env.COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.json({ ok: true });
});

export default router;
