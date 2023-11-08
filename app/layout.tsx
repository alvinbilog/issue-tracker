import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import { Container, Theme } from '@radix-ui/themes';
import AuthProvider from './auth/Provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'New app to track issues.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="blue" radius="large">
            <Navbar />
            <main className="p-5">
              <Container> {children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
