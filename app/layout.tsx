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
      <body className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col ${inter.className}`}>
        <header className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 mb-4 sm:mb-0">
              <span>ReplyBot</span>
            </Link>
            <nav className="w-full sm:w-auto">
              <ul className="flex justify-center sm:justify-end space-x-6 text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Settings</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 sm:py-12 flex-grow">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
          <div className="container mx-auto px-4 py-4 sm:py-6 text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            © 2024 ReplyBot. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}