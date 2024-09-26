import EmailConnection from '../components/EmailConnection'
import EmailProcessor from '../components/EmailProcessor'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            AI Auto-Responder
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Streamline your email communication with AI-powered responses.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Get Started</h2>
              <p className="mt-1 text-sm text-gray-500">
                Connect your email to begin using AI-powered responses.
              </p>
              <div className="mt-6">
                <EmailConnection />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <EmailProcessor />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}