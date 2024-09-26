'use client';

import React, { useState } from 'react'

export default function SettingsForm() {
  const [aiModel, setAiModel] = useState('gpt-3.5-turbo')
  const [responseStyle, setResponseStyle] = useState('professional')
  const [maxTokens, setMaxTokens] = useState(150)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement settings submission logic
    console.log('Settings submitted:', { aiModel, responseStyle, maxTokens })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="apiKey" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          OpenAI API Key
        </label>
        <input
          type="text"
          id="apiKey"
          name="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="ai-model" className="block text-sm font-medium text-gray-700">
          AI Model
        </label>
        <select
          id="ai-model"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </div>

      <div>
        <label htmlFor="response-style" className="block text-sm font-medium text-gray-700">
          Response Style
        </label>
        <select
          id="response-style"
          value={responseStyle}
          onChange={(e) => setResponseStyle(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <div>
        <label htmlFor="max-tokens" className="block text-sm font-medium text-gray-700">
          Max Tokens
        </label>
        <input
          type="number"
          id="max-tokens"
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </div>
    </form>
  )
}
