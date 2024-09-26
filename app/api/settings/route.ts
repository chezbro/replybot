import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ apiKey: process.env.ANTHROPIC_API_KEY || '' })
}

export async function POST(request: Request) {
  const { apiKey, aiModel, responseStyle, maxTokens } = await request.json()
  
  // Here you would typically save these settings to a database
  // For now, we'll just log them and return a success response
  console.log('Received settings:', { apiKey, aiModel, responseStyle, maxTokens })
  
  // Note: In a real application, you should never log API keys
  
  return NextResponse.json({ success: true })
}