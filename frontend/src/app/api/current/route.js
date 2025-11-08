
// // // import { NextResponse } from "next/server";
// // // import jwt from "jsonwebtoken";
// // // import { User } from "../../../models/userModel";

// // // export async function GET(request) {
// // //   try {
// // //     const auToken = request.cookies.get("loginToken")?.value;
// // //     console.log("Received Token:", auToken);

// // //     if (!auToken) {
// // //       // Return 200 with user: null so frontend can reliably handle "not logged in"
// // //       return NextResponse.json({ user: null }, { status: 200 });
// // //     }

// // //     // Verify token
// // //     const data = jwt.verify(auToken, process.env.JWT_TOKEN);
// // //     console.log("Decoded token:", data);

// // //     // Find user and only select safe fields (exclude password)
// // //     const user = await User.findById(data._id).select("_id name email").lean();

// // //     if (!user) {
// // //       return NextResponse.json({ user: null }, { status: 200 });
// // //     }

// // //     // Return user object
// // //     return NextResponse.json({ user }, { status: 200 });
// // //   } catch (error) {
// // //     console.error("Error in /api/current:", error);
// // //     // Return user: null (token invalid/expired or DB error) — frontend handles it
// // //     return NextResponse.json({ user: null }, { status: 200 });
// // //   }
// // // }
// // // src/app/api/current/route.js  (temporary debug version)
// // import { NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import { cookies } from "next/headers";
// // import connectDB from "@/helper/db";
// // import { User } from "@/models/userModel";

// // export async function GET(request) {
// //   try {
// //     // ----- cookie read -----
// //     let rawCookieHeader = null;
// //     try {
// //       // try using next/headers() cookie store
// //       const cookieStore = cookies();
// //       const auToken = cookieStore.get("loginToken")?.value;
// //       rawCookieHeader = auToken ? `token-present` : `token-missing`;
// //       console.log("[/api/current] cookies().get loginToken present:", !!auToken);
// //       console.log("[/api/current] token first 10 chars:", auToken ? auToken.slice(0, 10) + "..." : "none");
// //     } catch (e) {
// //       console.log("[/api/current] cookies() read failed:", e?.message ?? e);
// //     }

// //     // also log raw header from request (fallback)
// //     try {
// //       const header = request.headers.get("cookie");
// //       console.log("[/api/current] raw Cookie header:", header ? header : "none");
// //     } catch (e) {
// //       console.log("[/api/current] request.headers.get('cookie') error:", e?.message ?? e);
// //     }

// //     // ----- take token from either source -----
// //     const cookieStore = cookies();
// //     const auToken = cookieStore.get("loginToken")?.value ?? null;

// //     if (!auToken) {
// //       console.log("[/api/current] No token found -> returning user:null");
// //       return NextResponse.json({ user: null }, { status: 200 });
// //     }

// //     // ----- quick decode (does not verify) -----
// //     const decoded = jwt.decode(auToken);
// //     console.log("[/api/current] jwt.decode result:", decoded);

// //     // ----- verify token and log errors -----
// //     if (!process.env.JWT_TOKEN) {
// //       console.log("[/api/current] WARNING: process.env.JWT_TOKEN is MISSING");
// //     } else {
// //       console.log("[/api/current] JWT_TOKEN present (hidden).");
// //     }

// //     let payload;
// //     try {
// //       payload = jwt.verify(auToken, process.env.JWT_TOKEN);
// //       console.log("[/api/current] jwt.verify success. payload:", payload);
// //     } catch (verr) {
// //       console.error("[/api/current] jwt.verify FAILED:", verr?.message ?? verr);
// //       return NextResponse.json({ user: null }, { status: 200 });
// //     }

// //     // ----- db connect and lookup -----
// //     try {
// //       await connectDB();
// //       console.log("[/api/current] DB connected");
// //     } catch (dberr) {
// //       console.error("[/api/current] DB connect failed:", dberr?.message ?? dberr);
// //       return NextResponse.json({ user: null }, { status: 200 });
// //     }

// //     const user = await User.findById(payload._id).select("_id name email").lean();
// //     console.log("[/api/current] User find result:", user ? "found" : "not found", user ?? null);

// //     if (!user) return NextResponse.json({ user: null }, { status: 200 });

// //     return NextResponse.json({ user }, { status: 200 });
// //   } catch (error) {
// //     console.error("[/api/current] unexpected error:", error);
// //     return NextResponse.json({ user: null }, { status: 200 });
// //   }
// // }

// // src/app/api/current/route.js
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import {connectToDB}from "@/helper/db"; // your DB helper
// import { User } from "@/models/userModel";

// /** tiny helper: parse cookie string -> object */
// function parseCookies(cookieHeader) {
//   if (!cookieHeader) return {};
//   return cookieHeader.split(";").reduce((acc, pair) => {
//     const [rawName, ...rawVal] = pair.split("=");
//     if (!rawName) return acc;
//     const name = rawName.trim();
//     const value = rawVal.join("=").trim();
//     acc[name] = decodeURIComponent(value);
//     return acc;
//   }, {});
// }

// export async function GET(request) {
//   try {
//     // 1) Try the new cookies() API (await it) — safe on Next 16
//     let auToken = null;
//     try {
//       // in Next 16 cookies() returns a Promise, so await it
//       // NOTE: this may throw on some runtimes; we catch and fallback
//       // eslint-disable-next-line no-undef
//       if (typeof cookies !== "undefined") {
//         // cookies() in app routes must be awaited
//         const cookieStore = await cookies();
//         // cookieStore.get may exist in this runtime
//         if (cookieStore?.get) {
//           auToken = cookieStore.get("loginToken")?.value ?? null;
//           console.log("[/api/current] token from await cookies():", !!auToken);
//         }
//       }
//     } catch (e) {
//       console.log("[/api/current] await cookies() not available or failed:", e?.message ?? e);
//     }

//     // 2) Fallback: parse raw Cookie header
//     if (!auToken) {
//       const raw = request.headers.get("cookie");
//       console.log("[/api/current] raw Cookie header (fallback):", raw ?? "none");
//       const parsed = parseCookies(raw);
//       auToken = parsed["loginToken"] ?? null;
//       console.log("[/api/current] token from header parse fallback:", !!auToken);
//     }

//     // 3) If still no token -> return user: null
//     if (!auToken) {
//       console.log("[/api/current] No token found -> returning user:null");
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     // 4) Log a quick decode (non-verify) to inspect payload
//     const decoded = jwt.decode(auToken);
//     console.log("[/api/current] jwt.decode result:", decoded);

//     // 5) Check secret presence
//     if (!process.env.JWT_TOKEN) {
//       console.warn("[/api/current] WARNING: process.env.JWT_TOKEN is MISSING");
//       // still attempt verification (will fail) — but we log explicitly
//     } else {
//       console.log("[/api/current] JWT token secret present (hidden).");
//     }

//     // 6) Verify token (catch verify errors)
//     let payload;
//     try {
//       payload = jwt.verify(auToken, process.env.JWT_TOKEN);
//       console.log("[/api/current] jwt.verify success. payload:", payload);
//     } catch (verr) {
//       console.error("[/api/current] jwt.verify FAILED:", verr?.message ?? verr);
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     // 7) Connect DB and fetch user
//     try {
//       await connectToDB();
//       console.log("[/api/current] DB connected");
//     } catch (dberr) {
//       console.error("[/api/current] DB connect failed:", dberr?.message ?? dberr);
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     const user = await User.findById(payload._id).select("_id name email").lean();
//     console.log("[/api/current] User find result:", user ? "found" : "not found", user ?? null);

//     if (!user) {
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     // 8) success
//     return NextResponse.json({ user }, { status: 200 });
//   } catch (err) {
//     console.error("[/api/current] unexpected error:", err);
//     return NextResponse.json({ user: null }, { status: 200 });
//   }
// }
// /app/api/current/route.js  (App Router)
import { NextResponse } from "next/server";
import { connectToDB } from "@/helper/db";
import {User} from "@/models/userModel";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectToDB();
  const token = req.cookies.get("loginToken")?.value;
  if (!token) return NextResponse.json({ user: null });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload._id).select("name email").lean();
    return NextResponse.json({ user: user || null });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
