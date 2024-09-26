"use client"

// components/EmailConnection.tsx
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  email: string;
}

export default function EmailConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Mock email connection
    console.log('Connecting email:', data.email)
    setIsConnected(true)
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900">Connect Your Email</h3>
      {!isConnected ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connect Email
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-green-600">Email connected successfully!</p>
      )}
    </div>
  )
}