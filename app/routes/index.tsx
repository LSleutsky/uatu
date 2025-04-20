import ProtectedRoute from "~/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div>Welcome to the Home Page!</div>
    </ProtectedRoute>
  );
}
