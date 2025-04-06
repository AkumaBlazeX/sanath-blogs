# Supabase Welcome Email Function

This Edge Function sends a welcome email to new subscribers using Resend.

## Setup Instructions

### 1. Install Supabase CLI

If you haven't already, install the Supabase CLI:

```bash
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Set up Resend API Key

1. Create a free account at [Resend](https://resend.com)
2. Get your API key from the dashboard

### 4. Set Environment Variables

Add your Resend API key as a secret in Supabase:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
```

### 5. Deploy the Edge Function

```bash
supabase functions deploy welcome-email --no-verify-jwt
```

The `--no-verify-jwt` flag allows the function to be called with just the anon key.

### 6. Add welcome_email_sent column to subscriptions table

Run this SQL in your Supabase dashboard:

```sql
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT FALSE;
```

### 7. Test the Function

You can test it using curl:

```bash
curl -X POST https://eetbqplrrpfakagerrag.supabase.co/functions/v1/welcome-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldGJxcGxycnBmYWthZ2VycmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTQ1NDksImV4cCI6MjA1ODczMDU0OX0.br1pugBZLUCTNoYHy5dS5dj4um7wYzwAsWpNmrnmInI" \
  -d '{"email":"test@example.com"}'
```

## Configuration Details

This function uses:
- **Resend's sandbox domain** (`onboarding@resend.dev`) for sending emails
- Replies go to the automated email: `automated.mail.hadoop4211@gmail.com`
- Marks subscriptions as processed in the Supabase database

## How It Works

1. When a user subscribes via the FooterSubscribeForm component
2. The function sends a welcome email via Resend
3. The function updates the subscriber record to mark the welcome email as sent

## Upgrading to a Custom Domain

When your domain verification is complete, you can update the `from` field in the function to use your custom domain. Domain verification can be completed by:

1. Adding the required DNS records in Namecheap
2. Waiting for verification to complete
3. Updating the `from` field to use your verified domain 