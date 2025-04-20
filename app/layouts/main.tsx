import { Outlet } from 'react-router';

import ThemeToggle from '~/components/ThemeToggle';

import { ThemeProvider } from '~/context/ThemeContext';

import { AuthProvider } from '~/lib/auth';

export default function MainLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <main className="min-h-screen flex flex-col flex-auto dark:bg-black">
          <header className="py-4">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-col flex-auto">
            <Outlet />
          </div>
          <footer className="text-blue-700 dark:text-white"></footer>
        </main>
      </AuthProvider>
    </ThemeProvider>
  );
}
