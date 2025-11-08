"use client"
import { loginUSer } from "@/services/userServices";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const router=useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);
    const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.email) return "Please enter your email.";
    // simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) return "Please enter a valid email address.";
    if (!form.password) return "Please enter your password.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };
  const handleChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setServerMsg(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg(null);
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try{
    const result = await loginUSer(form);

      if (result.success) {
        setUser(result.user);
      } else {
        alert(data.message);
      }
      console.log(result.user)
      router.push("/")
    } catch (err) {
      setServerMsg({ type: "error", text: err.message || "Sign in failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0712] to-[#120517] p-6">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-[#0b0310]/60 to-[#140417]/60 border border-[#2a122b] rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3L21 8.5L12 14L3 8.5L12 3Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Welcome back</h1>
              <p className="text-xs text-gray-300/80">Sign in to continue to Catalyst</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-xs text-red-300 bg-red-900/20 px-3 py-2 rounded">{error}</div>}

            <label className="block text-xs text-gray-300">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="block text-xs text-gray-300">
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            {/* <div className="flex items-center justify-between text-xs text-gray-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 bg-[#08040a] border rounded text-pink-500 focus:ring-pink-400"
                />
                Remember me
              </label>
              <button type="button" className="text-pink-300 hover:underline text-xs" onClick={() => alert("Forgot password flow")}>
                Forgot password?
              </button>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-br from-purple-600 to-pink-500 shadow hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#2a122b]" />
            <span className="text-xs text-gray-400">or continue with</span>
            <span className="h-px w-12 bg-[#2a122b]" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <button
              onClick={() => alert("Google signin placeholder")}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0b0310] border border-[#2a122b] text-sm hover:bg-[#0d0510]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M21 12.218C21 11.403 20.945 10.819 20.848 10.293H12v3.852h5.454c-.235 1.2-.95 2.47-2.36 3.222v2.676h3.812C20.06 19.41 21 16.993 21 12.218z" fill="#4285F4"/>
                <path d="M12 22c2.7 0 4.967-.9 6.622-2.436l-3.812-2.676C13.999 17.436 13.108 17.79 12 17.79c-2.92 0-5.396-1.96-6.286-4.61H2.74v2.894C4.386 19.966 7.93 22 12 22z" fill="#34A853"/>
                <path d="M5.714 13.18A7.999 7.999 0 0 1 5.09 12c0-.403.036-.797.104-1.18V8.0H2.74A11.97 11.97 0 0 0 1 12c0 1.733.337 3.383.94 4.914l3.774-3.734z" fill="#FBBC05"/>
                <path d="M12 6.2c1.47 0 2.8.5 3.847 1.477l2.88-2.88C16.962 2.99 14.699 2 12 2 7.93 2 4.386 4.034 2.74 6.892L6.514 10.6C7.404 7.95 9.98 6.2 12 6.2z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <button onClick={() => alert("Go to signup")} className="text-pink-300 hover:underline">
              Sign up
            </button>
          </div>
        </div>

        {/* small footer credit */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Catalyst</span>
        </div>
      </div>
    </div>
  );
}
