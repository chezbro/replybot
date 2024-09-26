// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import '../styles/globals.css' // Make sure this line exists

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReplyBot - AI Auto-Responder',
  description: 'Automatically respond to emails with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen ${inter.className}`}>
        <header className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>ReplyBot</span>
            </Link>
            <nav>
              <ul className="flex space-x-6 text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Settings</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
            © 2024 ReplyBot. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}