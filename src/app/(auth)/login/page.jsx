"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Store } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailed, setLoading as setAuthLoading } from "@/store/slices/authSlice";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(setAuthLoading(true));

    // Call login API
    const result = await api.post("/auth/admin/login", {
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      console.log(result,"result");
      
      // Save user + token in Redux store
      dispatch(loginSuccess({
        user:   result.data.data?.user ||result?.data?.user ,
        token:  result.data.data?.session?.access_token || result.data.data?.session?.access_token ,
        session:  result.data.data?.session || result.data.data?.session ,
      }));
      toast.success("Login successful!");
      // router.push("/dashboard");
    } else {
      dispatch(loginFailed(result.message));
      toast.error(result.message || "Login failed");
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-4 shadow-lg shadow-white/10">
          <Store className="w-7 h-7 text-neutral-900" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
        <p className="text-neutral-500 mt-1 text-sm">Sign in to Kybr Admin Dashboard</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@kybr.ae"
                className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-neutral-900 focus:ring-neutral-500 accent-white" />
              <span className="text-sm text-neutral-400">Remember me</span>
            </label>
            <button type="button" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-neutral-900 font-semibold rounded-xl hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 text-neutral-600 bg-neutral-900">or</span>
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white font-medium hover:text-neutral-300 transition-colors">
            Create Account
          </Link>
        </p>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-neutral-600 mt-6">
        Kybr E-Commerce &copy; 2026. Dubai, UAE
      </p>
    </div>
  );
}
