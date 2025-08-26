import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function requireAuth(req, res, next) {
  try {
    // Prefer Authorization header, fallback to cookie
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ")
      ? header.slice(7)
      : req.cookies?.[process.env.COOKIE_NAME];

    if (!token) return res.status(401).json({ error: "Unauthenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { uid: payload.uid };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export async function attachUser(req, _res, next) {
  try {
    if (!req.auth?.uid) return next();
    const user = await User.findById(req.auth.uid).lean();
    req.user = user || null;
    next();
  } catch (_) {
    next();
  }
}
