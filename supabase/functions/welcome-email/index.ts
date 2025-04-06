import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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
      from: 'team@sanathblogs.site',
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the email from the request body
    const { email } = await req.json()
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }, 
          status: 400 
        }
      )
    }
    
    console.log(`Sending welcome email to: ${email}`)

    // Send the welcome email using Resend with verified domain
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'team@sanathblogs.site',
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
    
    const data = await res.json()
    console.log('Resend API response:', data)
    
    // Check for Resend API errors
    if (!res.ok) {
      console.error('Resend API error:', data)
      return new Response(
        JSON.stringify(data),
        { 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          status: res.status
        }
      )
    }
    
    // Update subscription record to mark email as sent
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://eetbqplrrpfakagerrag.supabase.co'
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    console.log('Updating subscription record in database')
    
    // Make a direct fetch call to Supabase REST API
    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          welcome_email_sent: true
        })
      }
    )
    
    if (!updateResponse.ok) {
      console.error('Error updating subscription record:', await updateResponse.text())
    }
    
    return new Response(
      JSON.stringify({ success: true, message: "Welcome email sent successfully" }),
      { 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in welcome-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 500 
      }
    )
  }
}) 