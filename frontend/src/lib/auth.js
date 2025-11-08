// src/lib/auth.js
import jwt from "jsonwebtoken";

// Secret should be stored in your .env.local
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Sign a new JWT token for a user.
 * Used during login or signup.
 */
export function signToken(user) {
  // Only include lightweight info in JWT
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Verify and decode JWT token.
 */
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract userId from Next.js API Request (App Router)
 * Usage: const userId = getUserIdFromReq(req)
 */
export async function getUserIdFromReq(req) {
  try {
    // App Router uses `req.headers.get`
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    return decoded.id; // user._id stored in token
  } catch (error) {
    console.error("Error in getUserIdFromReq:", error);
    return null;
  }
}
