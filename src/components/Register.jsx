import React, { useState, useEffect } from 'react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({ name: false, email: false, pass: false, conf: false });

  useEffect(() => {
    document.title = 'Create Account';
  }, []);

  const reName = /^[\p{L}\p{N}\s'-]{1,100}$/u;
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  function flash(m, success = false) {
    setMessage(m);
    setOk(!!success);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // honeypot
    const hp = (document.getElementById('hp_field')?.value || '').trim();
    if (hp !== '') {
      flash('Bot detected. Request blocked.');
      return;
    }

    const newErr = { name: false, email: false, pass: false, conf: false };
    let bad = false;
    if (!reName.test(fullName)) { newErr.name = true; bad = true; }
    if (!reEmail.test(email)) { newErr.email = true; bad = true; }
    if (!rePass.test(password)) { newErr.pass = true; bad = true; }
    if (password !== confirm) { newErr.conf = true; bad = true; }
    setErrors(newErr);
    if (bad) return;

    setLoading(true);
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password, confirm_password: confirm })
      });
      const json = await res.json().catch(() => ({}));
      flash(json.message || (res.ok ? 'Account created' : 'Error'), res.ok);
      if (json.user_token) sessionStorage.setItem('user_token', json.user_token);
      if (res.ok) setTimeout(() => location.href = '/profile', 1500);
    } catch (err) {
      console.error(err);
      flash('Unexpected error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg relative">
  <button type="button" id="closeButton" onClick={() => (location.href = '/')} className="absolute top-3 right-3 text-red-600 text-2xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        <div id="messageBox" role="alert" className={`${message ? 'block' : 'hidden'} mb-5 p-4 rounded text-sm ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} aria-live="polite">
          <p id="messageText">{message}</p>
        </div>

  <form id="registerForm" className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" name="hp_field" id="hp_field" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
            <input
              name="fullname"
              id="fullname"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              type="text"
              placeholder="John Doe"
              aria-describedby="nameErr"
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 form-input"
            />
            <p role="alert" id="nameErr" className={`${errors.name ? 'block' : 'hidden'} text-red-600 text-sm mt-1`}>Letters (Arabic or Latin), numbers, spaces, hyphens, apostrophes (max 100).</p>
          </div>
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
            />
            <p role="alert" id="emailErr" className={`${errors.email ? 'block' : 'hidden'} text-red-600 text-sm mt-1`}>Invalid email address.</p>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="Create password"
              aria-describedby="passErr"
              aria-required="true"
              aria-invalid={errors.pass ? 'true' : 'false'}
              className="w-full mt-1 p-2 border rounded pr-10 focus:outline-none focus:ring focus:border-blue-500 form-input"
            />
            <button
              type="button"
              aria-label={showPass ? 'Hide password' : 'Show password'}
              aria-pressed={showPass}
              onClick={() => setShowPass(s => !s)}
              className={`bx ${showPass ? 'bx-show' : 'bx-hide'} absolute right-3 top-9 text-gray-500`}
            ></button>
            <p role="alert" id="passErr" className={`${errors.pass ? 'block' : 'hidden'} text-red-600 text-sm mt-1`}>Must include uppercase, lowercase, number, and special character.</p>
          </div>
          <div className="relative">
            <label htmlFor="confirm" className="block text-gray-700">Confirm Password</label>
            <input
              name="confirm"
              id="confirm"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat password"
              aria-describedby="confErr"
              aria-required="true"
              aria-invalid={errors.conf ? 'true' : 'false'}
              className="w-full mt-1 p-2 border rounded pr-10 focus:outline-none focus:ring focus:border-blue-500 form-input"
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              aria-pressed={showConfirm}
              onClick={() => setShowConfirm(s => !s)}
              className={`bx ${showConfirm ? 'bx-show' : 'bx-hide'} absolute right-3 top-9 text-gray-500`}
            ></button>
            <p role="alert" id="confErr" className={`${errors.conf ? 'block' : 'hidden'} text-red-600 text-sm mt-1`}>Passwords do not match.</p>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold" type="submit">Create Account</button>
          <p className="text-center text-sm text-gray-600">Already have an account? <a href="/" className="text-blue-600 hover:underline">Log in</a></p>
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
