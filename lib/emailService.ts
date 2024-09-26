// lib/emailService.ts
export interface Email {
    id: string;
    sender: string;
    subject: string;
    content: string;
    timestamp: Date;
  }
  
  const mockEmails: Email[] = [
    {
      id: '1',
      sender: 'john@example.com',
      subject: 'Project Update',
      content: `Hi, just wanted to give you a quick update on the project. We're making good progress and should be ready for the next review by Friday.`,
      timestamp: new Date('2024-09-25T10:00:00Z'),
    },
    {
      id: '2',
      sender: 'sarah@example.com',
      subject: 'Meeting Request',
      content: `Hello, I was wondering if you're available for a quick call tomorrow at 2 PM to discuss the new marketing strategy.`,
      timestamp: new Date('2024-09-25T11:30:00Z'),
    },
    {
      id: '3',
      sender: 'team@company.com',
      subject: 'Weekly Newsletter',
      content: `Here's your weekly company newsletter with updates on ongoing projects, upcoming events, and employee spotlights.`,
      timestamp: new Date('2024-09-25T09:00:00Z'),
    },
  ];
  
  export async function fetchEmails(): Promise<Email[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEmails;
  }
  
  export async function markEmailAsRead(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Marked email ${id} as read`);
  }
  
  export async function processEmail(data: {
    email: string;
    sender: string;
    content: string;
  }): Promise<{ suggestedResponse: string }> {
    const response = await fetch('/api/process-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to process email');
    }

    return response.json();
  }
  
  export interface EmailThread {
    id: string;
    subject: string;
    messages: Email[];
  }

  const mockThreads: EmailThread[] = [
    {
      id: '1',
      subject: 'Project Update',
      messages: [
        {
          id: '1a',
          sender: 'john@example.com',
          subject: 'Project Update',
          content: `Hi, just wanted to give you a quick update on the project. We're making good progress and should be ready for the next review by Friday.`,
          timestamp: new Date('2024-09-25T10:00:00Z'),
        },
        {
          id: '1b',
          sender: 'you@example.com',
          subject: 'Re: Project Update',
          content: `Thanks for the update, John. That's great news. Do you need any additional resources to meet the Friday deadline?`,
          timestamp: new Date('2024-09-25T11:15:00Z'),
        },
        {
          id: '1c',
          sender: 'john@example.com',
          subject: 'Re: Project Update',
          content: `No, I think we're good for now. I'll let you know if anything changes. Thanks for checking!`,
          timestamp: new Date('2024-09-25T13:30:00Z'),
        },
      ],
    },
    {
      id: '2',
      subject: 'Quarterly Financial Review',
      messages: [
        {
          id: '2a',
          sender: 'finance@company.com',
          subject: 'Quarterly Financial Review',
          content: `Dear Team, please find attached the financial report for Q3. We need to discuss the variances and strategize for Q4 during our upcoming meeting.`,
          timestamp: new Date('2024-09-25T14:00:00Z'),
        },
        {
          id: '2b',
          sender: 'you@example.com',
          subject: 'Re: Quarterly Financial Review',
          content: `Thanks for sharing the report. I noticed the marketing expenses have increased significantly. Can we allocate more budget to digital campaigns next quarter?`,
          timestamp: new Date('2024-09-25T15:00:00Z'),
        },
        {
          id: '2c',
          sender: 'finance@company.com',
          subject: 'Re: Quarterly Financial Review',
          content: `Absolutely, we should consider reallocating funds. However, we need to ensure that our ROI metrics are met. Let's discuss this in detail during the meeting.`,
          timestamp: new Date('2024-09-25T16:00:00Z'),
        },
      ],
    },
    {
      id: '3',
      subject: 'Product Launch Strategy',
      messages: [
        {
          id: '3a',
          sender: 'product@company.com',
          subject: 'Product Launch Strategy',
          content: `Hello Team, as we approach the launch of our new product, we need to finalize our go-to-market strategy. I suggest we focus on influencer partnerships and targeted ads.`,
          timestamp: new Date('2024-09-25T17:00:00Z'),
        },
        {
          id: '3b',
          sender: 'marketing@company.com',
          subject: 'Re: Product Launch Strategy',
          content: `Great idea! Additionally, we should consider a pre-launch campaign to build anticipation. Perhaps a teaser video could work well on social media.`,
          timestamp: new Date('2024-09-25T18:00:00Z'),
        },
        {
          id: '3c',
          sender: 'product@company.com',
          subject: 'Re: Product Launch Strategy',
          content: `I agree. Let's also prepare a press release to reach out to tech blogs. We need to ensure maximum visibility on launch day.`,
          timestamp: new Date('2024-09-25T19:00:00Z'),
        },
      ],
    },
    // ... you can add more mock threads here if needed
  ];

  export async function fetchEmailThread(id: string): Promise<EmailThread | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const thread = mockThreads.find(t => t.id === id);
    return thread || null;
  }

  import { generateResponse, createPrompt } from './aiService';

  export async function generateAIResponse(thread: EmailThread): Promise<string> {
    try {
      console.log('Generating AI response for thread:', thread.id);
      const prompt = createPrompt(thread);
      console.log('Created prompt:', prompt);
      const aiResponse = await generateResponse(prompt);
      console.log('Received AI response');
      return aiResponse;
    } catch (error) {
      console.error('Error generating AI response:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate AI response: ${error.message}`);
      } else {
        throw new Error(`Failed to generate AI response: ${JSON.stringify(error)}`);
      }
    }
  }

  export async function deleteMessage(threadId: string, messageId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const threadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (threadIndex === -1) {
      throw new Error('Thread not found');
    }

    const messageIndex = mockThreads[threadIndex].messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) {
      throw new Error('Message not found');
    }

    mockThreads[threadIndex].messages.splice(messageIndex, 1);
    console.log(`Deleted message ${messageId} from thread ${threadId}`);
  }