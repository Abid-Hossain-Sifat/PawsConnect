"use client";
import React, { useState } from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  PawPrint,
  User,
  Mail,
  Link as UrlLink,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Error: Passwords do not match. Please try again.");
      return; 
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoUrl
      });

      if (authError) {
        setError(authError.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/log-in");
      }, 2000);

    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5faf8] min-h-screen py-12 md:py-20 flex items-center justify-center px-4">
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-200/60 max-w-lg w-full p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 text-slate-100 transform rotate-[25deg] pointer-events-none select-none">
          <PawPrint className="w-32 h-32" strokeWidth={1} fill="currentColor" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <div className="p-2.5 bg-[#00685f] rounded-xl mb-3 shadow-md shadow-teal-900/10">
            <PawPrint className="text-white w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an Account
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Join PawsConnect today and find your perfect pet match!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 pl-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-50 text-slate-800 pl-12 pr-4 py-3.5 rounded-xl font-medium placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#00685f]/40 focus:bg-white focus:shadow-[0_0_15px_rgba(0,104,95,0.05)] transition-all duration-300 text-sm"
                required
                disabled={loading || success}
              />
            </div>
          </div>

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
                disabled={loading || success}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 pl-1">
              Photo URL
            </label>
            <div className="relative">
              <UrlLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-slate-50 text-slate-800 pl-12 pr-4 py-3.5 rounded-xl font-medium placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#00685f]/40 focus:bg-white focus:shadow-[0_0_15px_rgba(0,104,95,0.05)] transition-all duration-300 text-sm"
                required
                disabled={loading || success}
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
                minLength={6}
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                title="Password must contain at least 6 characters, 1 uppercase and 1 lowercase letter"
                className="w-full bg-slate-50 text-slate-800 pl-12 pr-12 py-3.5 rounded-xl font-medium placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#00685f]/40 focus:bg-white focus:shadow-[0_0_15px_rgba(0,104,95,0.05)] transition-all duration-300 text-sm"
                required
                disabled={loading || success}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                disabled={loading || success}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 pl-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 text-slate-800 pl-12 pr-12 py-3.5 rounded-xl font-medium placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#00685f]/40 focus:bg-white focus:shadow-[0_0_15px_rgba(0,104,95,0.05)] transition-all duration-300 text-sm"
                required
                disabled={loading || success}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-2 mt-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Password Requirements:
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <CheckCircle2 className={`w-4 h-4 ${formData.password.length >= 6 ? 'text-teal-600' : 'text-gray-400'}`} />
              <span className={formData.password.length >= 6 ? 'text-slate-700' : ''}>At least 6 characters</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <CheckCircle2 className={`w-4 h-4 ${/[A-Z]/.test(formData.password) ? 'text-teal-600' : 'text-gray-400'}`} />
              <span className={/[A-Z]/.test(formData.password) ? 'text-slate-700' : ''}>One uppercase letter</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <CheckCircle2 className={`w-4 h-4 ${/[a-z]/.test(formData.password) ? 'text-teal-600' : 'text-gray-400'}`} />
              <span className={/[a-z]/.test(formData.password) ? 'text-slate-700' : ''}>One lowercase letter</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <CheckCircle2 className={`w-4 h-4 ${formData.password && formData.password === formData.confirmPassword ? 'text-teal-600' : 'text-gray-400'}`} />
              <span className={formData.password && formData.password === formData.confirmPassword ? 'text-slate-700' : ''}>Passwords must match</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-200/60 p-3.5 rounded-xl text-rose-700 text-xs font-bold transition-all duration-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 bg-teal-50 border border-teal-200/60 p-3.5 rounded-xl text-teal-700 text-xs font-bold transition-all duration-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Registration Successful! Redirecting to login...</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className={`btn border-none normal-case w-full font-bold h-auto min-h-0 py-4 rounded-xl shadow-md transition-all duration-300 text-sm mt-2 text-white ${
              loading || success ? "bg-gray-400 cursor-not-allowed shadow-none" : "bg-[#00685f] hover:bg-[#00574f] hover:shadow-lg"
            }`}
          >
            {loading ? "Registering Account..." : success ? "Success!" : "Register Account"}
          </button>

          <p className="text-center text-sm font-semibold text-gray-500 mt-2">
            Already have an account?{" "}
            <Link
              href="/log-in"
              className="text-[#00685f] hover:text-[#00574f] underline underline-offset-4 transition-colors"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;