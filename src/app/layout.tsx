// app/layout.tsx
import type { Metadata } from 'next';
import './globals.scss';
import { AuthProvider } from '@/context/AuthContext'; 

export const metadata: Metadata = {
  title: 'Bastion',
  description: 'Proyecto dedicado al alquiler de casas en Villa La Angostura.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
