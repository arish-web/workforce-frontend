import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import { FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "EMPLOYEE">(
    "EMPLOYEE",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !role) {
      Notify.failure("Email, password, and role are required");
      return;
    }

    if (password.length < 8 || password.length > 12) {
      Notify.failure("Password must be 8–12 characters long");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, role);
      Notify.success("Signup successful. Please login.");
      navigate("/login");
    } catch (err: any) {
      Notify.failure(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Accent Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Icon */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600">
            <FiUserPlus size={28} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 relative z-10">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1 relative z-10">
          Join the platform and get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 relative z-10">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "MANAGER" | "EMPLOYEE")
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                     py-3 text-white font-semibold tracking-wide
                     hover:from-blue-700 hover:to-indigo-700
                     transition-all duration-200
                     disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600 mt-8 relative z-10">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
