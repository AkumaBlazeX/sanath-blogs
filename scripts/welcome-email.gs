function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const email = sheet.getRange(lastRow, 1).getValue(); // Assuming email is in first column
  const date = new Date().toLocaleDateString();
  
  const emailTemplate = `
Dear Subscriber,

Thank you for subscribing to Sanath Blogs! I'm excited to have you join our community of data science and AI enthusiasts.

You'll receive updates about:
- Data Science and AI automation insights
- Machine learning tutorials
- Practical guides on automated workflows
- Latest trends in AI technology

Feel free to check out our latest articles at https://sanathblogs.site

Best regards,
Sanath Kumar
`;

  try {
    GmailApp.sendEmail(
      email,
      "Welcome to Sanath Blogs!",
      emailTemplate,
      {
        name: "Sanath Kumar",
        replyTo: "sanathkumar.data@gmail.com"
      }
    );
    
    // Log that email was sent
    sheet.getRange(lastRow, 3).setValue("Welcome email sent on " + date); // Assuming column 3 is for status
  } catch (error) {
    Logger.log("Error sending email to " + email + ": " + error.toString());
    sheet.getRange(lastRow, 3).setValue("Failed to send welcome email: " + error.toString());
  }
} 