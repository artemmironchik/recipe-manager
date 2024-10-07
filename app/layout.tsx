import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';

import HeaderAuth from '@/components/header-auth';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Recipe Manager',
  description: 'Basic Recipe Manager application',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={GeistSans.className} suppressHydrationWarning>
    <body className="bg-background text-foreground">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-7xl flex justify-between items-center gap-4 p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href="/">Recipe Manager</Link>
                </div>

                <HeaderAuth />
              </div>
            </nav>

            <div className="flex flex-1 justify-center flex-col gap-20 max-w-7xl w-full h-full p-5">
              {children}
            </div>

            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
              <p>
                Made by{' '}
                <a
                  href="https://github.com/artemmironchik/recipe-manager"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Artem Mironchik
                </a>
              </p>
            </footer>
          </div>

          <Toaster />
        </main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
