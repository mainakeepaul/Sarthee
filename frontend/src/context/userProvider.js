
"use client";
// import { useState, useEffect } from "react";
// import UserContext from "../context/userContext.js"; // your existing context file

// export default function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     async function fetchCurrent() {
//       try {
//         const res = await fetch("/api/current", { cache: "no-store" });
//         const data = await res.json();
//         if (!mounted) return;
//         setUser(data?.user ?? null);
//       } catch (err) {
//         console.error("Failed to load current user:", err);
//         if (mounted) setUser(null);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     fetchCurrent();
//     return () => { mounted = false; };
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
// // // src/context/userProvider.js
// // "use client";
// // import { useState, useEffect } from "react";
// // import UserContext from "./userContext"; // <-- named import, relative to same folder

// // export default function UserProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     let mounted = true;
// //     async function fetchCurrent() {
// //   try {
// //     const res = await fetch("/api/current", {
// //       cache: "no-store",
// //       credentials: "include", // << important
// //     });
// //     const data = await res.json();
// //     console.log("[UserProvider] /api/current response:", data);
// //     setUser(data?.user ?? null);
// //   } catch (err) {
// //     console.error("[UserProvider] fetch /api/current failed:", err);
// //     setUser(null);
// //   } finally {
// //     setLoading(false);
// //   }
// // }
// //     fetchCurrent();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   return (
// //     <UserContext.Provider value={{ user, setUser, loading }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // }
// // "use client";

// // import { useState, useEffect, useMemo } from "react";
// // import UserContext from "./userContext"; // same folder

// // export default function UserProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     let mounted = true;

// //     async function fetchCurrentUser() {
// //       try {
// //         const res = await fetch("/api/current", {
// //           cache: "no-store",
// //           credentials: "include", // important for cookie-based auth
// //         });

// //         const data = await res.json();
// //         console.log("[UserProvider] /api/current response:", data);

// //         if (!mounted) return;

// //         // Normalize the user object so frontend always has _id
// //         const normalizedUser = data?.user
// //           ? {
// //               _id: data.user._id || data.user.id,
// //               name: data.user.name,
// //               email: data.user.email,
// //             }
// //           : null;

// //         setUser(normalizedUser);
// //       } catch (err) {
// //         console.error("[UserProvider] Failed to load current user:", err);
// //         if (mounted) setUser(null);
// //       } finally {
// //         if (mounted) setLoading(false);
// //       }
// //     }

// //     fetchCurrentUser();

// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   // Memoize context value to avoid unnecessary re-renders
// //   const contextValue = useMemo(() => ({ user, setUser, loading }), [user, loading]);

// //   return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
// // }
import React, { createContext, useState, useEffect } from 'react';
export const UserContext = createContext({ user: null, setUser: ()=>{}, loading: true });

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function getCurrent() {
      try {
        const res = await fetch('/api/current', { credentials: 'include' });
        const data = await res.json();
        if (!mounted) return;
        setUser(data.user || null);
      } catch (err) {
        if (!mounted) return;
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    getCurrent();
    return () => { mounted = false; };
  }, []);

  return <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>;
}
