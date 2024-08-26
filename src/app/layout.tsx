import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Bastion',
  description: 'Proyecto dedicado al alquiler de casas en Villa La Angostura.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
