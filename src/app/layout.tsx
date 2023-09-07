import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const grotesk = Space_Grotesk({ subsets: [], weight:['300','400','700'], variable:'--font-inter' });

export const metadata: Metadata = {
  title: 'Prueba Técnica - Libros ',
  description: 'Esta es una prueba técnica de midudev para el puesto de desarrollador FrontEnd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${grotesk.variable} font-sans flex flex-col`}>
        <header>
          
        </header>
        {children}
      </body>
    </html>
  );
}
