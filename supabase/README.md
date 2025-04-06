# Supabase Welcome Email Function

This Edge Function sends a welcome email to new subscribers using Resend with a verified domain.

## Configuration

The function is currently configured to:
- Send emails from `team@sanathblogs.site` (verified domain)
- Send welcome emails to all subscribers
- Update the subscription record once the email is sent

## Deployment

To deploy or update this function:

```bash
supabase functions deploy welcome-email
```

## Environment Variables

The function requires the following environment variables:
- `RESEND_API_KEY`: Your Resend API key
- `SUPABASE_URL`: Your Supabase project URL (set automatically)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (set automatically)

## Testing

You can test the function using the Supabase dashboard or with curl:

```bash
curl -X POST https://eetbqplrrpfakagerrag.supabase.co/functions/v1/welcome-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SUPABASE_ANON_KEY" \
  -d '{"email":"your-email@example.com"}'
```

## Email Template

The current email template includes:
- A welcome message
- List of content types subscribers will receive
- Link to the blog
- Contact information

To modify the template, edit the HTML in the `html` section of the code.

## Domain Verification

The domain `sanathblogs.site` has been fully verified with Resend, allowing emails to be sent from `team@sanathblogs.site`.

DNS records that were set up:
- MX Record
- SPF Record
- DKIM Record
- DMARC Record

## Future Improvements

- Create reusable email templates
- Add analytics tracking for open rates
- Implement newsletters and blog post notifications 