import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Access Restricted',
  description: 'This website is not available in your region.',
}

export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6 max-w-8 mx-auto">
          <svg
            aria-hidden="true"
            className="w-full h-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h1>
        <p className="text-gray-600 mb-6">This website is not available in your region.</p>
        <div className="text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}
