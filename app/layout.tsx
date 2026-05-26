import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: "Satoshi's Ranch", description: 'Local-first Bitcoin P2P marketplace prototype' };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang="en"><body>{children}</body></html> }
