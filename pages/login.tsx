import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setError(error.message);
    } else if (user) {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      if (data.role === 'patient') {
        router.push('/patient');
      } else if (data.role === 'doctor') {
        router.push('/doctor');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link href="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
