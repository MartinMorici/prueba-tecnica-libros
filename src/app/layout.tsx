import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prueba Técnica - Libros ',
  description: 'Esta es una prueba técnica de midudev para el puesto de desarrollador FrontEnd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
