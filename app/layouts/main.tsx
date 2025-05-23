import { Outlet } from 'react-router';

import Profile from '~/components/Profile';
import ThemeToggle from '~/components/ThemeToggle';

import { ThemeProvider } from '~/context/ThemeContext';

import { AuthProvider } from '~/lib/auth';

export default function MainLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <main className="min-h-screen flex flex-col bg-(--background) p-4">
          <header className="">
            <div className="flex justify-between items-center">
              <h1 className="font-['Gloria_Hallelujah'] text-5xl text-(--primary)">Uatu</h1>
              <Profile />
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-col justify-center flex-1">
            <Outlet />
          </div>
          <footer className="text-blue-700 dark:text-white"></footer>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}
