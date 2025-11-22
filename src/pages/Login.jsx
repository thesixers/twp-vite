import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/Googleauth";
import { useUserContext } from "../../context/UserProvider";
import { serverUrl } from "../../requests/apicalls";

export default function Login() {
  const { setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res = await axios.post(
        `${serverUrl}/twp/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.M) {
        navigate("/")
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.E) return setError(error.response.data.E);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:border-[#e44616] focus:ring-1 focus:ring-[#e44616]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:border-[#e44616] focus:ring-1 focus:ring-[#e44616]"
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 text-center font-medium">
              {error}
            </p>
          )}

          {/* Options */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-[#e44616] border-gray-300 rounded"
              />
              Remember me
            </label>
            <Link
              to="/forgotpass"
              className="text-[#e44616] hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#e44616] cursor-pointer text-white font-semibold rounded-lg hover:bg-[#d33e12] transition-colors duration-300 disabled:bg-orange-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign in */}
        <GoogleSignIn setUser={setUser} />

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#e44616] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
