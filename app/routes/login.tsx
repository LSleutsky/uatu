import { useState } from 'react';
import { useNavigate } from 'react-router';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import LoginSignup from '~/components/LoginSignup';

import { auth } from '~/lib/firebase';

export type FormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const firebaseError = (code: string): string => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid username and/or password';
      case 'auth/invalid-email':
        return 'Please enter a valid email address';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'Something went wrong. Please try again';
    }
  };

  const handleLogin = async (data: FormInputs) => {
    try {
      setError(null);

      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate('/');
    } catch (err: any) {
      console.error(err.message);

      setError(firebaseError(err.code));
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-1/2 p-6 border border-(--border) rounded-lg bg-(--surface)">
        <header className="flex justify-center">
          <h2 className="text-4xl text-(--primary)">Login</h2>
        </header>
        <LoginSignup handleFormSubmit={handleLogin} />
        {error && (
          <footer className="text-(--error) mt-4 ml-6">
            <span>{error}</span>
          </footer>
        )}
      </div>
    </section>
  );
}
