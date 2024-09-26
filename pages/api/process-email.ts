// pages/api/process-email.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateResponse, createPrompt } from '../../lib/aiService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, sender, content, userStyle } = req.body

    try {
      // In a real application, you would fetch previous conversations from a database
      const previousConversations: string[] = []

      const prompt = createPrompt(content, previousConversations, userStyle)
      const aiResponse = await generateResponse(prompt)

      // Here you would typically save the response to your database and send an SMS
      // For now, we'll just log it
      console.log(`AI Response for ${sender}: ${aiResponse}`)

      res.status(200).json({ message: 'Email processed successfully', suggestedResponse: aiResponse })
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error processing email', error: error.message })
      } else {
        res.status(500).json({ message: 'Error processing email', error: 'An unknown error occurred' })
      }
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}