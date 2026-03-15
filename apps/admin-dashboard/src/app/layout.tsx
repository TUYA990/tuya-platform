import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TUYA Admin Dashboard',
  description: 'TUYA Ride-Hailing Admin Dashboard',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        {children}
      </body>
    </html>
  );
}
