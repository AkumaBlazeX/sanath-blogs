---
title: "Creating RAG AI-Agent Chat Bot for Your Website: Part 1"
summary: "Seemsless integration of RAG model with your chatbot and decrease the work of interviewing many people where they can just ask questions about you directly here. Click here to see more"
date: "April 1, 2025"
imageUrl: "https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%201.jpeg"
tags:
  - "RAG"
  - "AI"
  - "Chatbot"
  - "Backend"
  - "n8n"
  - "OpenAI"
  - "Supabase"
  - "Vector Database"
  - "API Integration"
  - "Tutorial"
targetAudience:
  - "Developers"
  - "AI Enthusiasts"
  - "Website Owners"
---

# Creating RAG AI-Agent Chat Bot for Your Website: Part 1

## What you can expect
Seemsless integration of RAG model with your chatbot and decrease the work of interviewing many people where they can just ask questions about you directly here. Click here to see more


## Introduction
This guide will walk you through creating a RAG (Retrieval-Augmented Generation) AI-Agent Chat Bot for your website. We'll use n8n for workflow automation, OpenAI for AI processing, and Supabase for vector storage. This implementation is split into two parts:
- Part 1 (Current): Backend setup and workflow configuration
- Part 2: Frontend integration and deployment

## Prerequisites
Before we begin, ensure you have:
1. Your own website with chatbot features
2. N8N cloud version (latest)
3. Chat-gpt API access with:
   - GPT-3.5-turbo model access
   - text-embedding-ada-002 model access
4. Supabase account with:
   - Vector storage enabled
   - PostgreSQL database
5. Google Drive access (for document storage)
6. Basic understanding of:
   - API integrations
   - Vector databases
   - Webhook configurations

## Required Environment Variables
Set up these environment variables in your n8n instance:
```env
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GOOGLE_DRIVE_CREDENTIALS=your_google_drive_credentials
```

## Step-by-Step Implementation

### Step 1: Initial Workflow Setup

#### Testing with Chat Node
First, we'll build a workflow with Chat Node for testing without webhook integration.

![Chat Connected to RAG Agent](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%202.jpeg)
*Figure 2: Chat Connected to RAG Agent*

### Step 2: Data Vectorization Workflow

#### Creating Vector Storage
We'll create a new workflow to convert our data to vectors using Supabase Vector Storage.

![Converting Data to Vector and Needed Workflow](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%203.jpeg)
*Figure 3: Converting Data to Vector and Needed Workflow*

#### Workflow Configuration Steps

1. **Trigger Setup**
   - Node: `When clicking 'Test workflow'`
   - Connect to: `Google Drive (download file)`

2. **File Download**
   - Node: `Google Drive (download file)`
   - Connect to: `Default Data Loader`

3. **Data Loading**
   - Node: `Default Data Loader`
   - Connect to: `Recursive Character Text Splitter`

4. **Text Chunking**
   - Node: `Recursive Character Text Splitter`
   - Connect to: `Embeddings OpenAI`

5. **Embedding Generation**
   - Node: `Embeddings OpenAI`
   - Configuration:
     - Use OpenAI API key
     - Choose text-embedding-ada-002 model
   - Connect to: `Supabase Vector Store`

6. **Vector Storage**
   - Node: `Supabase Vector Store`
   - Configuration:
     - Use Supabase credentials for vector storage
     - Store embeddings in dedicated table

### Step 3: Chat Response Workflow

#### 1. Chat Trigger Setup
- Node: Chat window
- Purpose: Endpoint for chatbot queries
- Configuration:
  - Method: `POST`
  - Response: `Return Data`
  - Connect to: `AI Agent`

#### 2. Context Retrieval
- Node: `Supabase Vector Store (Search)`
- Purpose: Fetch relevant document chunks
- Configuration:
  - Use Supabase credentials
  - Query embeddings based on user input
- Connect to: `AI Agent`

#### 3. AI Agent Configuration
- Node: `AI Agent`
- Purpose: Process queries and context
- Configuration:
  - Chat Model: `OpenAI GPT`
  - Memory: `PostgreSQL Chat Memory`
  - Context Input: `Supabase Vector Store (Search) Output`
- Connect to: `OpenAI Chat Model`

#### 4. Response Generation
- Node: `OpenAI Chat Model`
- Purpose: Generate AI responses
- Configuration:
  - Use OpenAI API Key
  - Response Format: `Text`
- Connect to: `Postgres Chat Memory` and `Webhook (Response)`

#### 5. Chat History Storage
- Node: `Postgres Chat Memory`
- Purpose: Store conversation history
- Configuration:
  - Use same database as vector storage
  - Log messages by user ID
- Connect to: `AI Agent`

### Step 4: Webhook Integration

#### Replacing Chat Node with Webhook

![Webhook Node Configuration](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%204.jpeg)
*Figure 4: Webhook Node Configuration*

#### CORS Configuration
Configure origins (CORS) for proper access.

### Step 5: Testing with Postman

#### Headers Configuration

![Required Headers in Postman](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%205.jpeg)
*Figure 5: Required Headers in Postman*

#### Request Body Setup

![Request Body Configuration](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%206.jpeg)
*Figure 6: Request Body Configuration*

#### Testing Process
1. Copy webhook test URL
2. Paste in Postman
3. Start listening for test events
4. Send request
5. Verify response

### Step 6: Field Node Integration

#### Adding Field Nodes

![AI-Agent Node with Field Nodes](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%207.png)
*Figure 7: AI-Agent Node with Field Nodes*

#### System Message Configuration
Add system message in AI agent options to define behavior.

![AI-agent with system message](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%208.jpeg)
*Figure 8: AI-agent with system message*

### Step 7: Production Testing

#### Final Testing

![Production URL Testing Results](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-2/Blog%202%20-part%201/figure%209.jpeg)
*Figure 9: Production URL Testing Results*

## Troubleshooting

### Common Issues
1. **CORS Errors**
   - Ensure CORS is properly configured in webhook node
   - Check allowed origins in n8n settings

2. **API Rate Limits**
   - Monitor OpenAI API usage
   - Implement rate limiting if needed

3. **Vector Search Issues**
   - Verify Supabase connection
   - Check embedding dimensions match

4. **Webhook Failures**
   - Validate webhook URL
   - Check request/response format

### Debugging Tips
1. Use n8n execution logs
2. Monitor network requests in browser
3. Check Supabase logs
4. Verify API responses in Postman

## Security Considerations
1. Never expose API keys in client-side code
2. Implement proper authentication
3. Use environment variables for sensitive data
4. Regular security audits of webhook endpoints
5. Monitor API usage and implement rate limiting

## Performance Optimization
1. Optimize chunk sizes for better retrieval
2. Implement caching where appropriate
3. Monitor database query performance
4. Use appropriate embedding models
5. Implement proper error handling

## Next Steps
To connect this to your website's chat-bot backend, please refer to Part 2 of this guide.
