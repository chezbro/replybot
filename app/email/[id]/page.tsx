import { fetchEmailThread } from '@/lib/emailService'
import EmailThreadClient from '@/app/components/EmailThreadClient'

export default async function EmailThreadPage({ params }: { params: { id: string } }) {
  const { id } = params
  const thread = await fetchEmailThread(id)

  if (!thread) {
    return <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-100 text-gray-700 rounded-lg text-lg">Email thread not found.</div>
  }

  return (
    <div className="max-w-6xl mx-auto my-8 bg-white shadow-xl rounded-lg overflow-hidden min-h-[80vh]">
      <div className="px-8 py-6 bg-indigo-600">
        <h3 className="text-2xl font-bold text-white">{thread.subject}</h3>
      </div>
      <EmailThreadClient thread={thread} />
    </div>
  )
}