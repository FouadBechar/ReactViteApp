// Serverless handler for Vercel /api/verify-signup
// Verifies reCAPTCHA token with Google using RECAPTCHA_SECRET (server-only env var)
// Then calls Supabase REST signup endpoint including redirect_to and metadata.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password, full_name, captcha_token, redirect_to } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    // Safely read environment variables: try process.env, fall back to import.meta.env (Vite)
    let secret, supabaseUrl, anonKey, redirectUrl;
    try {
      // In Node-like environments this will work
      secret = process.env.RECAPTCHA_SECRET;
      supabaseUrl = process.env.VITE_SUPABASE_URL;
      anonKey = process.env.VITE_SUPABASE_ANON_KEY;
      redirectUrl = process.env.VITE_AUTH_REDIRECT_URL;
    } catch (e) {
      // In environments where `process` is not defined (e.g. some bundlers), fall back
      secret = typeof import.meta !== 'undefined' ? import.meta.env?.RECAPTCHA_SECRET : undefined;
      supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : undefined;
      anonKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : undefined;
      redirectUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_AUTH_REDIRECT_URL : undefined;
    }

    if (!secret) return res.status(500).json({ error: 'reCAPTCHA secret not configured' });
    if (!captcha_token) return res.status(400).json({ error: 'Missing captcha token' });

    // Verify token with Google
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', captcha_token);

    const gRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
    });
    const gJson = await gRes.json();

    if (!gJson.success) {
      return res.status(400).json({ error: 'Captcha verification failed', details: gJson });
    }

    // Call Supabase REST signup
    if (!supabaseUrl || !anonKey) return res.status(500).json({ error: 'Supabase not configured' });

    const sRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
      },
      body: JSON.stringify({
        email,
        password,
        data: { full_name },
        redirect_to: redirect_to || redirectUrl,
      }),
    });

    const sJson = await sRes.json().catch(() => ({}));
    if (!sRes.ok) {
      return res.status(sRes.status).json(sJson);
    }

    return res.status(200).json(sJson);
  } catch (err) {
    console.error('verify-signup error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
