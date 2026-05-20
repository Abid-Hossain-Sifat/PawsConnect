"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PawPrint, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [googleLoading, setGoogleLoading] = useState(false); 
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showToastMessage = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        showToastMessage(error.message || "Invalid email or password. Please try again.", "error");
        setLoading(false);
        return;
      }

      showToastMessage("Login Successful! Redirecting...", "success");
      
      setTimeout(() => {
        router.push("/");
        router.refresh(); 
      }, 1500);

    } catch (err) {
      showToastMessage("An unexpected error occurred.", "error");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      showToastMessage("Connecting with Google...", "success");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (err) {
      showToastMessage("Google login failed.", "error");
      setGoogleLoading(false);
    }
  };

  const isAnyLoading = loading || googleLoading;

  return (
    <div className="bg-[#f5faf8] min-h-screen py-12 md:py-20 flex items-center justify-center px-4 relative">
      {toast.show && (
        <div className="toast toast-top toast-end z-50 fixed top-4 right-4 animate-bounce">
          <div
            className={`alert ${toast.type === "success" ? "alert-success bg-teal-600 text-white" : "alert-error bg-rose-600 text-white"} shadow-lg rounded-xl flex items-center gap-2 p-4`}
          >
            {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[32px] shadow-xl border border-slate-200/60 max-w-lg w-full p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 text-slate-100 transform rotate-[25deg] pointer-events-none select-none">
          <PawPrint className="w-32 h-32" strokeWidth={1} fill="currentColor" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <div className="p-2.5 bg-[#00685f] rounded-xl mb-3 shadow-md shadow-teal-900/10">
            <PawPrint className="text-white w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Log in to continue your journey with PawsConnect!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 pl-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full bg-slate-50 text-slate-800 pl-12 pr-4 py-3.5 rounded-xl font-medium placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#00685f]/40 focus:bg-white focus:shadow-[0_0_15px_rgba(0,104,95,0.05)] transition-all duration-300 text-sm"
                required
                disabled={isAnyLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 text-slate-800 pl-12 pr-12 py-3.5 rounded-xl font-medium placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#00685f]/40 focus:bg-white focus:shadow-[0_0_15px_rgba(0,104,95,0.05)] transition-all duration-300 text-sm"
                required
                disabled={isAnyLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                disabled={isAnyLoading}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAnyLoading}
            className={`btn border-none normal-case w-full text-white font-bold h-auto min-h-0 py-4 rounded-xl shadow-md transition-all duration-300 text-sm mt-2 flex items-center justify-center gap-2 ${
              isAnyLoading ? "bg-gray-400 cursor-not-allowed shadow-none" : "bg-[#00685f] hover:bg-[#00574f] hover:shadow-lg"
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Logging In..." : "Log In"}
          </button>

          <div className="flex items-center my-2 select-none pointer-events-none">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-xs font-bold uppercase text-gray-400 tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isAnyLoading}
            className={`btn btn-outline border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white text-slate-700 normal-case w-full font-bold h-auto min-h-0 py-3.5 rounded-xl shadow-sm transition-all duration-300 text-sm flex items-center justify-center gap-3 ${
              isAnyLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {!googleLoading ? (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.58z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"
                />
              </svg>
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            )}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <p className="text-center text-sm font-semibold text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#00685f] hover:text-[#00574f] underline underline-offset-4 transition-colors"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;