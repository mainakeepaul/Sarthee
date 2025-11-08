"use client"
import { addUser } from "@/services/userServices";
import { useRouter } from "next/navigation.js";
import React, { useState } from "react";

export default function SignupPage({ onSignup, showLoginLink = true }) {
  const router=useRouter()
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData]=useState({
    name:"",
    email:"",
    phone:"",
    password:""
  })



  const validate = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.password) return "Please enter a password.";
    if (formData.password.length < 6) return "Password must be at least 6 characters.";
    if (formData.password !== confirm) return "Passwords do not match.";
    if (!accept) return "You must accept the terms and privacy policy.";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      const result = await addUser(formData);
      // console.log(result);

      setFormData({
        name: "",
        email: "",
        phone:"",
        password: "",
        confirmPassword: "",
      });
      router.push("/")
    } catch (err) {
      setError(err.message);
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
              <h1 className="text-2xl font-semibold">Create your account</h1>
              <p className="text-xs text-gray-300/80">Join Catalyst — quick setup, secure sign up</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-xs text-red-300 bg-red-900/20 px-3 py-2 rounded">{error}</div>}

            <label className="block text-xs text-gray-300">
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>

            <label className="block text-xs text-gray-300">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="block text-xs text-gray-300">
              Phone (optional)
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none"
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-gray-300">
                Password
                <input
                  type="password"
                  name="password"
                value={formData.password}
                onChange={handleChange}
                  className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
              </label>

              <label className="block text-xs text-gray-300">
                Confirm
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-2 block w-full rounded-lg px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                />
              </label>
            </div>

            <label className="flex items-center gap-3 text-xs text-gray-300">
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                className="w-4 h-4 bg-[#08040a] border rounded text-pink-500 focus:ring-pink-400"
              />
              I agree to the <button type="button" onClick={() => alert("Open terms")} className="text-pink-300 hover:underline">Terms of Service</button> and <button type="button" onClick={() => alert("Open privacy")} className="text-pink-300 hover:underline">Privacy Policy</button>.
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-br from-purple-600 to-pink-500 shadow hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#2a122b]" />
            <span className="text-xs text-gray-400">or sign up with</span>
            <span className="h-px w-12 bg-[#2a122b]" />
          </div>

          {/* <div className="mt-4 grid grid-cols-1 gap-3">
            <button
              onClick={() => alert("Google signup placeholder")}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0b0310] border border-[#2a122b] text-sm hover:bg-[#0d0510]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M21 12.218C21 11.403 20.945 10.819 20.848 10.293H12v3.852h5.454c-.235 1.2-.95 2.47-2.36 3.222v2.676h3.812C20.06 19.41 21 16.993 21 12.218z" fill="#4285F4"/>
                <path d="M12 22c2.7 0 4.967-.9 6.622-2.436l-3.812-2.676C13.999 17.436 13.108 17.79 12 17.79c-2.92 0-5.396-1.96-6.286-4.61H2.74v2.894C4.386 19.966 7.93 22 12 22z" fill="#34A853"/>
                <path d="M5.714 13.18A7.999 7.999 0 0 1 5.09 12c0-.403.036-.797.104-1.18V8.0H2.74A11.97 11.97 0 0 0 1 12c0 1.733.337 3.383.94 4.914l3.774-3.734z" fill="#FBBC05"/>
                <path d="M12 6.2c1.47 0 2.8.5 3.847 1.477l2.88-2.88C16.962 2.99 14.699 2 12 2 7.93 2 4.386 4.034 2.74 6.892L6.514 10.6C7.404 7.95 9.98 6.2 12 6.2z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
          </div> */}

          <div className="mt-6 text-center text-xs text-gray-400">
            {showLoginLink ? (
              <>
                Already have an account?{" "}
                <button onClick={() => alert("Go to login")} className="text-pink-300 hover:underline">Login</button>
              </>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>

        {/* small footer credit */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Sarthee</span>
        </div>
      </div>
    </div>
  );
}
