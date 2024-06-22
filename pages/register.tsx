import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else if (user) {
      await supabase.from('users').insert([{ id: user.id, email: user.email, role }]);
      router.push('/login');
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
