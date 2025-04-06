import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// Function to send email using Resend
async function sendWelcomeEmail(email: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: email,
      reply_to: 'automated.mail.hadoop4211@gmail.com',
      subject: 'Welcome to Sanath Blogs!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Sanath Blogs!</h2>
          <p>Thank you for subscribing to my blog. I'm excited to have you join our community of data science and AI enthusiasts.</p>
          <p>You'll receive updates about:</p>
          <ul>
            <li>Data Science and AI automation insights</li>
            <li>Machine learning tutorials</li>
            <li>Practical guides on automated workflows</li>
            <li>Latest trends in AI technology</li>
          </ul>
          <p>Feel free to check out our <a href="https://sanathblogs.site" style="color: #3498db;">latest articles</a>.</p>
          <p>Have questions? You can reply to this email or reach out through our website contact form.</p>
          <p>Best regards,<br>Sanath Kumar</p>
        </div>
      `
    })
  })

  return response.ok
}

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get email from request
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Send welcome email
    const success = await sendWelcomeEmail(email)

    if (!success) {
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Update subscription record to mark email as sent
    const { error } = await supabaseClient
      .from('subscriptions')
      .update({ welcome_email_sent: true })
      .eq('email', email)

    if (error) {
      console.error('Error updating subscription record:', error)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
}) 