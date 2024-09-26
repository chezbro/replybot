// lib/aiService.ts
import { EmailThread } from './emailService';

interface PromptData {
  subject: string;
  messages: Array<{ sender: string; content: string }>;
  userStyle?: string;
}

export function createPrompt(data: PromptData): string {
  const { subject, messages, userStyle } = data;
  const latestMessage = messages[messages.length - 1];
  const previousMessages = messages.slice(0, -1).map(msg => 
    `From: ${msg.sender}\nContent: ${msg.content}`
  ).join('\n\n');

  return `
    You are an AI assistant tasked with drafting an email response. 
    Here's the context:
    
    1. Email thread subject: "${subject}"
    
    2. Previous messages in the thread:
    ${previousMessages}
    
    3. The latest message you're responding to:
    From: ${latestMessage.sender}
    Content: "${latestMessage.content}"
    
    ${userStyle ? `4. User's preferred writing style: ${userStyle}` : ''}
    
    Please draft a response that is appropriate and concise, considering the entire conversation history.
    ${userStyle ? 'Ensure the response matches the user\'s preferred writing style.' : ''}
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