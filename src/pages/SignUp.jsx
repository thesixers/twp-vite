import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Terms from '../components/Terms';
import axios from 'axios';

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
    const abortController = new AbortController()
    const signal = abortController.signal

    setTimeout(() => {
      abortController.abort()
    }, 5000);

    try {
      setLoading(true);
      let res = await axios.post('https://twp2.onrender.com/twp/auth/signup', form, { signal })
      let {E, M } = res.data;
      if(E) throw new Error(E);
      if(M){
        setMessage(res.data.M);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };

  const handleOkRedirect = () => {
    setMessage('');
  };

  return (
    <div className="flex justify-center min-h-screen px-4 relative">
      {/* Terms & Conditions Modal */}
      {showTerms && (<Terms setShowTerms={setShowTerms} />)}

      {/* Success Message Popup */}
      {message && (
        <div className="fixed inset-0 bg-[#ffffff57] bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-sm mx-auto">
            <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">Success!</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500 text-center wrap-break-word">{message}</p>
            </div>
            <div className="items-center px-4 py-3">
              <button id="ok-btn" onClick={handleOkRedirect} className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">OK</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg w-full max-w-md mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Create a New Account
        </h2>
        <div className="error text-center text-red-600 text-sm">{error}</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border outline-none border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border outline-none border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border outline-none border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
              placeholder="Choose a password"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={form.dob}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border outline-none rounded-md border-gray-400 shadow-sm focus:ring-red-500 focus:border-gray-700"
            />
          </div>

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              id="agreedToTerms"
              name="agreedToTerms"
              checked={form.agreedToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="agreedToTerms" className="text-gray-700">
              I agree to the{' '}
              <button
                type="button"
                className="text-red-600 underline cursor-pointer"
                onClick={() => setShowTerms(true)}
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#e44616] text-white font-medium rounded-md hover:bg-[#e44616c5] disabled:bg-red-300"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
