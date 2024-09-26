// lib/aiService.ts
import { EmailThread } from './emailService';

export function createPrompt(thread: EmailThread): string {
  const latestMessage = thread.messages[thread.messages.length - 1];
  const previousMessages = thread.messages.slice(0, -1).map(msg => 
    `From: ${msg.sender}\nContent: ${msg.content}`
  ).join('\n\n');

  return `
    You are an AI assistant tasked with drafting an email response. 
    Here's the context:
    
    1. Email thread subject: "${thread.subject}"
    
    2. Previous messages in the thread:
    ${previousMessages}
    
    3. The latest message you're responding to:
    From: ${latestMessage.sender}
    Content: "${latestMessage.content}"
    
    Please draft a response that is appropriate and concise, considering the entire conversation history.
    Only provide the response text, without any additional explanations or formatting.
  `;
}

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-ai-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}