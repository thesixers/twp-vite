import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Terms from '../components/Terms';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    agreedToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.agreedToTerms) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }
    const abortController = new AbortController();
    const signal = abortController.signal;

    setTimeout(() => {
      abortController.abort();
    }, 5000);

    try {
      setLoading(true);
      let res = await axios.post('https://twp2.onrender.com/twp/auth/signup', form, { signal });
      let { E, M } = res.data;
      if (E) throw new Error(E);
      if (M) {
        setMessage(res.data.M);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOkRedirect = () => {
    setMessage('');
    navigate('/login');
  };

  // placeholder Google sign-in
  const handleGoogleSignIn = () => {
    console.log("Google Sign-in clicked");
  };

  return (
    <div className="flex justify-center min-h-screen px-4 bg-gray-50 relative">
      {/* Terms & Conditions Modal */}
      {showTerms && <Terms setShowTerms={setShowTerms} />}

      {/* Success Message Popup */}
      {message && (
        <div className="fixed inset-0 bg-[#ffffff57] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-900 text-center">🎉 Success!</h3>
            <p className="mt-3 text-sm text-gray-600 text-center">{message}</p>
            <button
              id="ok-btn"
              onClick={handleOkRedirect}
              className="mt-5 w-full py-2 px-4 bg-[#e44616] text-white text-base font-medium rounded-lg shadow hover:bg-[#c93c12] focus:outline-none"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Signup Card */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mt-10">
        <h2 className="text-3xl font-bold text-center text-[#e44616] mb-6">
          Create a New Account
        </h2>
        {error && <div className="error text-center text-red-600 text-sm mb-2">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#e44616] focus:border-[#e44616]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#e44616] focus:border-[#e44616]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#e44616] focus:border-[#e44616]"
              placeholder="Choose a password"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={form.dob}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#e44616] focus:border-[#e44616]"
            />
          </div>

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              id="agreedToTerms"
              name="agreedToTerms"
              checked={form.agreedToTerms}
              onChange={handleChange}
              className="mr-2 rounded"
            />
            <label htmlFor="agreedToTerms" className="text-gray-700">
              I agree to the{' '}
              <button
                type="button"
                className="text-[#e44616] underline cursor-pointer"
                onClick={() => setShowTerms(true)}
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#e44616] text-white font-medium rounded-lg shadow hover:bg-[#c93c12] disabled:bg-red-300 transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#e44616] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}