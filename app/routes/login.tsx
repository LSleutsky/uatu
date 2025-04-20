import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

import { auth } from '~/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      navigate(`/`);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}
