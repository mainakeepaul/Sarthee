// "use client"
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { logoutUSer } from "@/services/userServices";
// // import { Link } from "lucide-react";
// import Link from "next/link";

// /**
//  * Anchor: safe anchor wrapper (fallback to window.location for internal links)
//  */
// function Anchor({ href = "#", className = "", children, onClick, ...props }) {
//   const handleClick = (e) => {
//     if (onClick) onClick(e);
//     if (!href) return;
//     if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
//     if (typeof window !== "undefined") {
//       e.preventDefault();
//       window.location.href = href;
//     }
//   };

//   return (
//     <a href={href} className={className} onClick={handleClick} {...props}>
//       {children}
//     </a>
//   );
// }

// export default function SartheeLandingDark() {
//   const [dark, setDark] = useState(false);

//   const ctx = useContext(UserContext);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const stored = localStorage.getItem("sarthee-theme");
//     const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
//     const initial = stored ? stored === "dark" : prefersDark;
//     setDark(initial);
//     document.documentElement.classList.toggle("dark", initial);
//   }, []);

//   const isLoggedIn = Boolean(ctx && ctx.user);
//   const toggleTheme = () => {
//     const next = !dark;
//     setDark(next);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("sarthee-theme", next ? "dark" : "light");
//       document.documentElement.classList.toggle("dark", next);
//     }
//   };

//   const handleLogout = async() => {
//     console.log("[Navbar] logout clicked");
//     // Clear context's user if setUser is exposed
//     if (ctx && typeof ctx.setUser === "function") {
//       ctx.setUser(null);
//     }
//     try{
//       const res=await logoutUSer()
//       console.log(res)
//     }catch(err)
//     {
//       console.log(err)
//     }
//     // any other logout actions you need (call API, clear cookies...)
//     alert("Logged out successfully!");
//   };
//   return (
//     <div className="min-h-screen bg-[#0b1220] text-slate-100 antialiased transition-colors duration-300 dark:bg-[#0b1220]">
//       {/* NAV */}
//       <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md px-6 py-4 border-b border-transparent dark:border-slate-800">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-md">
//               <span className="font-semibold text-white text-lg">S</span>
//             </div>
//             <div>
//               <Anchor href="/" className="font-semibold text-lg tracking-wide text-slate-100">
//                 Sarthee
//               </Anchor>
//               <div className="text-xs text-slate-400">Multilingual regional data, simplified</div>
//             </div>
//           </div>

//           <div className="flex items-center gap-6">
//             <Anchor href="#features" className="text-sm text-slate-300 hover:text-white">Features</Anchor>
//             <Anchor href="#usecases" className="text-sm text-slate-300 hover:text-white">Use cases</Anchor>
//             <Anchor href="#how" className="text-sm text-slate-300 hover:text-white">How it works</Anchor>
//             <Anchor href="/chatbot" className="text-sm text-indigo-300 font-medium hover:text-indigo-200">Chatbot</Anchor>
//             {!isLoggedIn ? (
//             <Link href="/login" className="text-sm text-slate-300 hover:text-white">Log in</Link>

//             <Link href="/signup">
//               <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:brightness-110 transition">Sign up</button>
//             </Link>
//             ) : (
//               <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold transition">
//               Logout
//             </button>
//             )}
//             <button
//               onClick={toggleTheme}
//               aria-label="Toggle theme"
//               className="p-2 rounded-md hover:bg-slate-800/50 transition"
//             >
//               {dark ? "🌙" : "☀️"}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <header className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -24 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="space-y-6"
//           >
//             <p className="inline-flex items-center gap-3 rounded-full bg-indigo-900/30 px-3 py-1 text-sm text-indigo-200 w-max">
//               <span className="text-xs">New</span>
//               <span className="text-sm">Region-first multilingual platform</span>
//             </p>

//             <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
//               Sarthee — the multilingual gateway to regional knowledge
//             </h1>

//             <p className="text-slate-300 max-w-xl">
//               Access verified local datasets, community resources, and curated guides — all in the language you prefer. Sarthee helps organizations, researchers and citizens make sense of regional information.
//             </p>

//             <div className="flex gap-4 items-center">
//               <Anchor href="/signup">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-5 py-3 rounded-lg bg-indigo-500 text-black font-medium shadow"
//                 >
//                   Get started
//                 </motion.button>
//               </Anchor>

//               {/* <Anchor href="/learn-more">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-200"
//                 >
//                   Learn more
//                 </motion.button>
//               </Anchor> */}

//               <div className="ml-3 flex items-center gap-2">
//                 <label className="text-sm text-slate-400">Language</label>
//                 <select className="px-2 py-1 rounded-md border border-slate-700 bg-transparent text-sm text-slate-200">
//                   <option className="bg-[#0b1220]">English</option>
//                   <option className="bg-[#0b1220]">Bengali</option>
//                   <option className="bg-[#0b1220]">Hindi</option>
//                   {/* <option className="bg-[#0b1220]">Assamese</option> */}
//                 </select>
//               </div>
//             </div>

//             <div className="flex gap-4 mt-2 text-sm text-slate-400">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-emerald-400" />
//                 <span>Verified datasets</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-indigo-400/60" />
//                 <span>Community-driven annotations</span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.98 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="relative flex justify-center"
//           >
//             {/* Illustration placeholder */}
//             <div className="w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-br from-slate-900/60 to-slate-800/40 p-8 border border-slate-800">
//               <div className="text-slate-200 text-lg font-semibold">Why Sarthee?</div>
//               <p className="text-slate-400 mt-2">Clear regional answers, structured datasets, and tools to explore local trends without language friction.</p>

//               <div className="mt-6 grid grid-cols-1 gap-3">
//                 <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
//                   <div className="text-xs text-slate-400">For NGOs</div>
//                   <div className="font-medium text-white">Community program planning with local indicators</div>
//                 </div>
//                 <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
//                   <div className="text-xs text-slate-400">For Researchers</div>
//                   <div className="font-medium text-white">Localized datasets ready for analysis</div>
//                 </div>
//                 <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
//                   <div className="text-xs text-slate-400">For Citizens</div>
//                   <div className="font-medium text-white">Access services and local guides in your language</div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </header>

//       {/* FEATURES */}
//       <section id="features" className="mt-16 max-w-7xl mx-auto px-6 lg:px-8">
//         <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-slate-100">
//           What Sarthee provides
//         </motion.h2>

//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             { title: "Multilingual Access", desc: "Switch UI and content between local languages.", icon: "🌐" },
//             { title: "Curated Datasets", desc: "Structured, downloadable regional datasets.", icon: "📊" },
//             { title: "Community Notes", desc: "Local annotations and context from users.", icon: "📝" },
//             { title: "API Access", desc: "Programmatic access for researchers & apps.", icon: "🔌" },
//           ].map((f, i) => (
//             <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-sm">
//               <div className="text-3xl">{f.icon}</div>
//               <div className="mt-3 font-medium text-white">{f.title}</div>
//               <div className="text-sm text-slate-400 mt-1">{f.desc}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* USE CASES */}
//       <section id="usecases" className="mt-12 max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-semibold text-slate-100">Use cases</h3>
//           <Anchor href="/cases" className="text-sm text-indigo-300">See examples</Anchor>
//         </div>

//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             { title: "Policy Planning", desc: "Design policies informed by local indicators." },
//             { title: "Journalism", desc: "Investigate regional stories with reliable data." },
//             { title: "Local Services", desc: "Help citizens discover nearby services & resources." },
//           ].map((c) => (
//             <motion.article key={c.title} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800">
//               <div>
//                 <div className="text-sm text-slate-400">Sector</div>
//                 <div className="text-lg font-semibold text-white">{c.title}</div>
//               </div>

//               <p className="text-sm text-slate-400 mt-3">{c.desc}</p>

//               <div className="mt-4">
//                 <Anchor href="/learn-more" className="text-sm text-indigo-300 hover:underline">Learn how</Anchor>
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section id="how" className="mt-16 bg-gradient-to-r from-indigo-900/10 to-slate-900/5 py-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <h3 className="text-2xl font-semibold text-slate-100">How Sarthee works</h3>
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
//               <div className="text-sm text-slate-400">01</div>
//               <div className="mt-2 font-semibold text-white">Collect</div>
//               <div className="text-sm text-slate-400 mt-2">Aggregate official and community sources for each region.</div>
//             </div>

//             <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
//               <div className="text-sm text-slate-400">02</div>
//               <div className="mt-2 font-semibold text-white">Curate</div>
//               <div className="text-sm text-slate-400 mt-2">Normalize and translate datasets while adding local context.</div>
//             </div>

//             <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
//               <div className="text-sm text-slate-400">03</div>
//               <div className="mt-2 font-semibold text-white">Share</div>
//               <div className="text-sm text-slate-400 mt-2">Expose clean APIs, visual dashboards and language-aware search for users.</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="mt-16 bg-gradient-to-r from-indigo-900/30 to-slate-900/10 py-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h4 className="text-xl font-semibold text-white">Want to explore regional data?</h4>
//             <p className="text-slate-300 mt-2">Sign up for access, browse datasets, or open the chatbot for guided conversations (no chat data shown here).</p>
//           </div>

//           <div className="flex gap-3">
//             <Anchor href="/signup">
//               <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-3 rounded-lg bg-indigo-500 text-black shadow">Create account</motion.button>
//             </Anchor>
//             <Anchor href="/chatbot">
//               <motion.button whileHover={{ scale: 1.03 }} className="px-4 py-3 rounded-lg border border-slate-700 text-slate-200">Open chatbot</motion.button>
//             </Anchor>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-slate-800 py-8">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400">
//           <div className="text-sm">© {new Date().getFullYear()} Sarthee — Multilingual regional data</div>
//           <div className="flex items-center gap-4 text-sm">
//             <Anchor href="/privacy" className="text-slate-400 hover:text-slate-200">Privacy</Anchor>
//             <Anchor href="/terms" className="text-slate-400 hover:text-slate-200">Terms</Anchor>
//             <a href="mailto:hello@sarthee.app" className="text-slate-400 hover:text-slate-200">Contact</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// adjust these paths to match your project
import { logoutUSer } from "@/services/userServices";
import UserContext  from "../context/userContext";

/**
 * Anchor: safe anchor wrapper (fallback to window.location for internal links)
 */
function Anchor({ href = "#", className = "", children, onClick, ...props }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!href) return;
    if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
    if (typeof window !== "undefined") {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default function SartheeLandingDark() {
  const [dark, setDark] = useState(false);
  const {user,setUser, loading} = useContext(UserContext);


  // const { user, setUser } = useContext(UserContext);
  const clearedRef = useRef(false);

  useEffect(() => {
    // Example condition: clear only if backend reported invalid token (replace condition)
    const shouldClear = false; // <- set your actual condition
    if (shouldClear && user && !clearedRef.current) {
      clearedRef.current = true;
      setUser(null);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("sarthee-theme");
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const isLoggedIn = Boolean(user);

  // if(loading){
  //   return(
  //     <p>Loading User</p>
  //   )
  // }

  if (user && typeof setUser === "function") {
      setUser(null);
    }
  // console.log(ctx)
  console.log(user)
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("sarthee-theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
    }
  };

  const handleLogout = async () => {
    console.log("[Navbar] logout clicked");
    if (user && typeof setUser === "function") {
      setUser(null);
    }
    try {
      const res = await logoutUSer();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    alert("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100 antialiased transition-colors duration-300 dark:bg-[#0b1220]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md px-6 py-4 border-b border-transparent dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-md">
              <span className="font-semibold text-white text-lg">S</span>
            </div>
            <div>
              <Anchor href="/" className="font-semibold text-lg tracking-wide text-slate-100">
                Sarthee
              </Anchor>
              <div className="text-xs text-slate-400">Multilingual regional data, simplified</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Anchor href="#features" className="text-sm text-slate-300 hover:text-white">
              Features
            </Anchor>
            <Anchor href="#usecases" className="text-sm text-slate-300 hover:text-white">
              Use cases
            </Anchor>
            <Anchor href="#how" className="text-sm text-slate-300 hover:text-white">
              How it works
            </Anchor>
            <Anchor href="/chatbot" className="text-sm text-indigo-300 font-medium hover:text-indigo-200">
              Chatbot
            </Anchor>

            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-sm text-slate-300 hover:text-white">
                  Log in
                </Link>

                {/* use Link with className for "button-like" anchor; avoids nested button parsing issues */}
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:brightness-110 transition text-sm inline-block"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold transition"
              >
                Logout
              </button>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md hover:bg-slate-800/50 transition"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="inline-flex items-center gap-3 rounded-full bg-indigo-900/30 px-3 py-1 text-sm text-indigo-200 w-max">
              <span className="text-xs">New</span>
              <span className="text-sm">Region-first multilingual platform</span>
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
              Sarthee — the multilingual gateway to regional knowledge
            </h1>

            <p className="text-slate-300 max-w-xl">
              Access verified local datasets, community resources, and curated guides — all in the language you prefer. Sarthee helps organizations, researchers and citizens make sense of regional information.
            </p>

            <div className="flex gap-4 items-center">
              <Anchor href="/signup">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 rounded-lg bg-indigo-500 text-black font-medium shadow"
                >
                  Get started
                </motion.button>
              </Anchor>

              <div className="ml-3 flex items-center gap-2">
                <label className="text-sm text-slate-400">Language</label>
                <select className="px-2 py-1 rounded-md border border-slate-700 bg-transparent text-sm text-slate-200">
                  <option className="bg-[#0b1220]">English</option>
                  <option className="bg-[#0b1220]">Bengali</option>
                  <option className="bg-[#0b1220]">Hindi</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified datasets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400/60" />
                <span>Community-driven annotations</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex justify-center"
          >
            {/* Illustration placeholder */}
            <div className="w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-br from-slate-900/60 to-slate-800/40 p-8 border border-slate-800">
              <div className="text-slate-200 text-lg font-semibold">Why Sarthee?</div>
              <p className="text-slate-400 mt-2">Clear regional answers, structured datasets, and tools to explore local trends without language friction.</p>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                  <div className="text-xs text-slate-400">For NGOs</div>
                  <div className="font-medium text-white">Community program planning with local indicators</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                  <div className="text-xs text-slate-400">For Researchers</div>
                  <div className="font-medium text-white">Localized datasets ready for analysis</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                  <div className="text-xs text-slate-400">For Citizens</div>
                  <div className="font-medium text-white">Access services and local guides in your language</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* rest of component unchanged... */}

      <footer className="mt-16 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400">
          <div className="text-sm">© {new Date().getFullYear()} Sarthee — Multilingual regional data</div>
          <div className="flex items-center gap-4 text-sm">
            <Anchor href="/privacy" className="text-slate-400 hover:text-slate-200">Privacy</Anchor>
            <Anchor href="/terms" className="text-slate-400 hover:text-slate-200">Terms</Anchor>
            <a href="mailto:hello@sarthee.app" className="text-slate-400 hover:text-slate-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
