# Creating RAG AI-Agent Chat Bot for your website Part 2

## 🎯 What You'll Build
A professional portfolio website with an AI-powered chatbot that can answer questions about your work, skills, and experience.

## 🚀 Quick Start
1. Set up your n8n workflow (Part 1)
2. Configure your frontend (Part 2)
3. Test and deploy

## 📋 Prerequisites
- Basic knowledge of React and TypeScript
- An n8n workflow (from Part 1)
- Your portfolio website code

## 🛠️ Step-by-Step Implementation

### 1. Setting Up Your Environment

#### 1.1 Configure Environment Variables
Create a `.env` file in your project root:
```env
VITE_WEBHOOK_URL=your-n8n-production-webhook-url
```

![GitHub Secrets Configuration for Webhook URL](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Github%20Api.jpeg)
*Figure 2: GitHub Secrets Configuration for Webhook URL*

#### 1.2 Set Up GitHub Secrets
1. Go to your repository settings
2. Navigate to Secrets and Variables → Actions
3. Add `VITE_WEBHOOK_URL` with your n8n webhook URL

### 2. Building the Chat API Service
![Chat windows in website](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Chatwindow.jpeg)
*Figure 3: Chat windows in website*

#### 2.1 Create the API Service
Create `src/utils/chatApi.ts`:
```typescript
interface MessageType {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ApiResponse {
  response?: string;
  message?: string;
  status?: string;
  timestamp?: number;
}

const API_BASE_URL = import.meta.env.VITE_WEBHOOK_URL;

// Validate API response
const isValidResponse = (data: any): data is ApiResponse => {
  return 'response' in data || 'message' in data;
};

export const sendMessage = async (message: string): Promise<MessageType> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message,
        timestamp: Date.now(),
        source: 'portfolio-chat'
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!isValidResponse(data)) {
      throw new Error('Invalid response format');
    }

    return {
      id: Date.now().toString(),
      content: data.response || data.message || "I couldn't process that message.",
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to send message:', error);
    return {
      id: Date.now().toString(),
      content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
  }
};
```

#### 2.2 Create a Chat Component
Create `src/components/Chat.tsx`:
```typescript
import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../utils/chatApi';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
```

#### 2.3 Add Chat to Your Portfolio
Update `src/App.tsx`:
```typescript
import { Chat } from './components/Chat';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your existing portfolio content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Chat with Me
          </h2>
          <Chat />
        </div>
      </section>
    </div>
  );
}
```

### 3. Testing Your Setup

![Testing API Endpoint with Postman](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Postman.jpeg)
*Figure 4: Testing API Endpoint with Postman*

#### 3.1 Test the API Connection
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"test message"}' \
  your-n8n-production-webhook-url
```

![Browser testing](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Browser%20Testing.jpeg)
*Figure 5: Browser testing*

#### 3.2 Check Browser Console
- Open Developer Tools (F12)
- Look for:
  - Successful API requests
  - Response data
  - Any error messages

### 4. Common Issues & Solutions

#### 4.1 CORS Issues
If you see CORS errors, ensure your n8n workflow includes these headers:
```typescript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type'
```

#### 4.2 Connection Problems
- Verify your webhook URL is correct
- Check if n8n workflow is active
- Ensure environment variables are set

### 5. Best Practices

#### 5.1 Error Handling
```typescript
// Custom error types
class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Enhanced error handling
const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 404:
        return "The requested resource wasn't found.";
      case 403:
        return "You don't have permission to access this resource.";
      case 500:
        return "The server encountered an error. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }
  return "An unexpected error occurred. Please try again.";
};
```

#### 5.2 Rate Limiting Implementation
```typescript
// src/utils/rateLimiter.ts
class RateLimiter {
  private requests: number[] = [];
  private readonly limit: number;
  private readonly window: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.window = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(
      time => now - time < this.window
    );

    if (this.requests.length >= this.limit) {
      return false;
    }

    this.requests.push(now);
    return true;
  }
}

// Usage in chatApi.ts
const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

export const sendMessage = async (message: string): Promise<MessageType> => {
  if (!rateLimiter.canMakeRequest()) {
    throw new ApiError('Rate limit exceeded. Please try again later.');
  }
  // ... rest of the sendMessage implementation
};
```

## 🔍 Troubleshooting Guide

### Common Errors
| Error Code | Meaning | Solution |
|------------|---------|----------|
| 404 | Wrong API endpoint | Check your webhook URL |
| 403 | CORS issue | Add CORS headers |
| 500 | Server error | Check n8n workflow |

### Debugging Steps
1. Check Network tab in DevTools
2. Verify environment variables
3. Test API independently
4. Review n8n workflow logs

## 📚 Additional Resources
- [n8n Documentation](https://docs.n8n.io)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## �� Need Help?
- Check the [n8n Community Forum](https://community.n8n.io)
- Review the troubleshooting guide
- Test your API connection


