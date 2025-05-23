import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';

const AuthContext = createContext<User | null | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user ?? null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
