import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TUYA Driver - Ride-Hailing Application',
  description: 'TUYA Ride-Hailing Driver Application - Earn money by driving',
  keywords: ['ride-hailing', 'driver', 'tuya', 'transportation'],
  authors: [{ name: 'TUYA' }],
  creator: 'TUYA',
  publisher: 'TUYA',
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tuya-driver.app',
    siteName: 'TUYA Driver',
    title: 'TUYA Driver - Ride-Hailing Application',
    description: 'Earn money by driving with TUYA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TUYA Driver',
    description: 'Earn money by driving with TUYA',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-white text-gray-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
