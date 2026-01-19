import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

// const ALLOWED_DOMAINS = [".com", ".in", ".co", ".org"];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const isEmailValid = (email: string) =>
  //   ALLOWED_DOMAINS.some((domain) =>
  //     email.toLowerCase().endsWith(domain),
  //   );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!email || !password) {
      Notify.failure("Email and password are required");
      return;
    }

    if (password.length < 8 || password.length > 12) {
      Notify.failure("Password must be 8–12 characters long");
      return;
    }

    // if (!isEmailValid(email)) {
    //   Notify.failure(
    //     `Email domain not allowed. Use ${ALLOWED_DOMAINS.join(", ")}`,
    //   );
    //   return;
    // }

    setLoading(true);

    try {
      const data = await login(email, password);

      Notify.success("Login successful");

      // role-based redirect (CRITICAL)
      switch (data.user.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "MANAGER":
          navigate("/manager");
          break;
        case "EMPLOYEE":
          navigate("/employee");
          break;
        default:
          Notify.failure("Unknown role");
      }
    } catch (err) {
      Notify.failure("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Please sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white font-semibold
                       hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
