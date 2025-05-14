import ProtectedRoute from '~/components/ProtectedRoute';

export default function Home() {
  return (
    <main className="flex-1">
      <ProtectedRoute>
        <div>Welcome to the Home Page!</div>
      </ProtectedRoute>
    </main>
  );
}
