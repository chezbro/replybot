'use client';

// components/EmailProcessor.tsx
import { useState, useEffect } from 'react'
// Remove the axios import
import { fetchEmails, markEmailAsRead, Email } from '../lib/emailService'
import Link from 'next/link' // Add this import

// Add these new imports
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// Add this type definition for the thread
type EmailThread = {
  id: string;
  messages: {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
  }[];
};

export default function EmailProcessor() {
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [suggestedResponse, setSuggestedResponse] = useState('')

  // Add these new state variables
  const [isThreadOpen, setIsThreadOpen] = useState(false)
  const [currentThread, setCurrentThread] = useState<EmailThread | null>(null)

  useEffect(() => {
    async function loadEmails() {
      const fetchedEmails = await fetchEmails()
      setEmails(fetchedEmails)
      setLoading(false)
    }
    loadEmails()
  }, [])

  // Remove the processEmail function and related state variables

  // Remove the viewThread function as we'll be navigating to a new page instead

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-indigo-600">
        <h3 className="text-xl font-semibold text-white">Incoming Emails</h3>
      </div>
      {emails.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-600">No new emails to process.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {emails.map((email) => (
            <li key={email.id} className="p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">{email.sender}</p>
                  <p className="text-sm text-gray-600">{email.subject}</p>
                  <p className="text-xs text-gray-500">{email.timestamp.toLocaleString()}</p>
                </div>
                <div>
                  <Link
                    href={`/email/${email.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    View Thread
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Remove the email thread modal */}
    </div>
  )
}