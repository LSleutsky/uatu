import { type PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from '~/lib/auth';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
