import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Placeholder for real login logic
    try {
      let res = await axios.post('https://twp2.onrender.com/twp/auth/login', {
      // let res = await axios.post('http://localhost:3001/twp/auth/login', {
        email,
        password
      }, {withCredentials: true})
      let { E, M } = res.data
      if(E) throw Error(E);
        
      if(M){
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error);
      if(error.response.data.E) return setError(error.response.data.E);
      setError(error.message);
    }finally{
      setLoading(false);
    }

  };

  return (
    <div className="flex  justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Log in to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 border-gray-400 outline-none py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-400 outline-none rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="text-red-600 border-gray-300 rounded" />
              Remember me
            </label>
            <Link to="/forgotpass" className="text-red-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#e44616] cursor-pointer text-white font-medium rounded-md hover:bg-[#e44616c7] disabled:bg-red-300"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-red-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
