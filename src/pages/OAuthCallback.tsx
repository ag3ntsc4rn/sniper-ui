import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const verifier = sessionStorage.getItem('pkce_verifier');

    if (!code || !verifier) return;

    fetch('http://localhost:8000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, code_verifier: verifier }),
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Auth failed');
        login();
        navigate('/');
      })
      .catch(() => navigate('/login'));
  }, []);

  return <p>Signing you in…</p>;
}
