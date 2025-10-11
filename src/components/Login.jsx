import React, { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState({ email: false, pass: false });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    document.title = 'Log In';
  }, []);

  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  function showMessage(msg, success = false) {
    setMessage(msg);
    setOk(!!success);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validEmail = reEmail.test(email);
    const validPass = rePass.test(password);
    setErrors({ email: !validEmail, pass: !validPass });
    if (!validEmail || !validPass) return;

    setLoading(true);
    try {
      // Use external PHP login endpoint
      const res = await fetch('https://fouadbechar.x10.mx/p/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember_me: remember })
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        showMessage(json.message || 'Logged in', true);
        if (json.user_token) sessionStorage.setItem('user_token', json.user_token);
        const target = json.redirect || '/profile';
        setTimeout(() => (location.href = target), 1000);
      } else {
        showMessage(json.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      showMessage('Unexpected error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md relative">
  <button type="button" id="closeButton" onClick={() => (location.href = '/')} className="absolute top-3 right-3 text-red-600 text-2xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

        <div id="messageBox" className={`${message ? 'block' : 'hidden'} mb-4 p-4 rounded text-sm ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} aria-live="polite">
          <p id="messageText">{message}</p>
        </div>

        <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              aria-describedby="emailErr"
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 form-input"
              required
            />
            <p role="alert" className={`${errors.email ? 'block' : 'hidden'} text-sm text-red-600 mt-1`} id="emailErr">Please enter a valid email.</p>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="Enter your password"
              aria-describedby="passwordErr"
              aria-required="true"
              aria-invalid={errors.pass ? 'true' : 'false'}
              className="w-full mt-1 p-2 border rounded pr-10 focus:outline-none focus:ring focus:border-blue-500 form-input"
              required
            />
            <button
              type="button"
              aria-label={showPass ? 'Hide password' : 'Show password'}
              aria-pressed={showPass}
              onClick={() => setShowPass(s => !s)}
              className={`bx ${showPass ? 'bx-show' : 'bx-hide'} absolute right-3 top-9 text-gray-500 show-hide`}
            ></button>
            <p role="alert" className={`${errors.pass ? 'block' : 'hidden'} text-sm text-red-600 mt-1`} id="passwordErr">At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol.</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" id="remember_me" checked={remember} onChange={e => setRemember(e.target.checked)} className="mr-2 form-checkbox" /> Remember me
            </label>
            <a href="/forgot" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg font-semibold">Log In</button>
          <p className="text-center mt-4 text-gray-600">Not a member? <a href="/register" className="text-blue-500 hover:underline">Sign up</a></p>
        </form>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
            <div className="border-4 border-gray-200 border-t-blue-600 h-12 w-12 rounded-full animate-spin" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
