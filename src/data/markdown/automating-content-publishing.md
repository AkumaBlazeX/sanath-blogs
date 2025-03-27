
# Automated Workflow Using n8n to Publish Markdown Content to GitHub

This guide outlines how to build an automated workflow in n8n to publish markdown content from **Google Drive**, **Notion**, or **Airtable** to a GitHub repository. It includes step-by-step instructions, key nodes, best practices, and troubleshooting tips.

## Step-by-Step Instructions

### 1. Setup Prerequisites
- **n8n Instance**: Deploy n8n locally or via cloud (e.g., n8n.cloud).
- **Credentials**:
  - GitHub Personal Access Token (repo permissions).
  - Google Drive API OAuth2 credentials.
  - Notion Integration Token (with page access).
  - Airtable API Key and Base ID.
- **GitHub Repository**: Pre-configured with a `content/` directory.

### 2. Workflow for Google Drive to GitHub
**Objective**: Convert Google Docs to Markdown and push to GitHub.
**Nodes Used**:
1. **Google Drive Node**: List/trigger new files.
2. **HTTP Request Node**: Convert Google Doc to text via Drive API.
3. **Function Node**: Convert text to Markdown (e.g., using Turndown).
4. **GitHub Node**: Commit to repository.

**Steps**:
1. **Trigger**: Use a Schedule Trigger or Google Drive Watch Trigger.
2. **List Files**: Configure Google Drive Node to fetch files from a folder.
3. **Export as Text**: Use HTTP Request Node to GET `https://www.googleapis.com/drive/v3/files/{fileId}/export?mimeType=text/plain`.
4. **Convert to Markdown**: In a Function Node, use a library like `turndown` to convert HTML to Markdown.
5. **Push to GitHub**: Use GitHub Node to create/update files in the repo.

### 3. Workflow for Notion to GitHub
**Objective**: Export Notion pages as Markdown and commit to GitHub.
**Nodes Used**:
1. **HTTP Request Node**: Fetch Notion page content.
2. **Function Node**: Parse Notion blocks to Markdown.
3. **GitHub Node**: Commit files.

**Steps**:
1. **Fetch Page Content**: Use HTTP Request Node to call Notion API (`GET https://api.notion.com/v1/blocks/{pageId}/children`).
2. **Parse Blocks**: In a Function Node, iterate through blocks and convert to Markdown (use libraries like `notion-to-md`).
3. **Push to GitHub**: Use GitHub Node to save the output as a `.md` file.

### 4. Workflow for Airtable to GitHub
**Objective**: Sync Airtable records (stored as Markdown) to GitHub.
**Nodes Used**:
1. **Airtable Node**: Fetch records.
2. **GitHub Node**: Commit files.

**Steps**:
1. **Fetch Records**: Configure Airtable Node to retrieve rows with Markdown content.
2. **Map Data**: Use a Function Node to structure data into filename/content pairs.
3. **Push to GitHub**: Use GitHub Node to create/update files for each record.

## Key n8n Nodes
- **HTTP Request**: Interact with APIs (Notion, Google Drive).
- **Google Drive**: List/watch files in Drive.
- **Airtable**: Fetch records from a base.
- **GitHub**: Create/update files in a repo.
- **Function**: Custom data processing (e.g., Markdown conversion).
- **Schedule Trigger**: Run workflows periodically.

## Best Practices
1. **Version Control**:
   - Use meaningful commit messages (e.g., "feat: Update blog post").
   - Check for changes before committing (compare file hashes).
   - Use branches for staging and PRs (optional).
2. **Content Formatting**:
   - Standardize front matter (metadata) in Markdown files.
   - Validate syntax with tools like `markdownlint`.
3. **Security**:
   - Store credentials in n8n environment variables.
   - Limit API token permissions (e.g., GitHub token with `repo` scope only).

## Common Pitfalls & Troubleshooting
1. **Authentication Errors**:
   - Verify tokens have correct permissions.
   - Re-authenticate OAuth2 connections (Google Drive).
2. **API Rate Limits**:
   - Add delay nodes between requests.
   - Monitor n8n logs for `429 Too Many Requests`.
3. **Incorrect Markdown**:
   - Test conversion logic with sample data.
   - Use `JSON` mode in Function Node for debugging.
4. **File Conflicts**:
   - Ensure unique filenames (e.g., append timestamps).
   - Handle deletions/renames in the source platform.

## Example Workflow (Google Drive to GitHub)
![n8n Workflow](https://n8n.io/_next/static/images/example-workflow-google-drive-github.png)
1. **Schedule Trigger**: Runs daily.
2. **Google Drive Node**: Lists files in "Markdown" folder.
3. **HTTP Request Node**: Exports a Google Doc as plain text.
4. **Function Node**: Converts HTML to Markdown.
5. **GitHub Node**: Commits to `content/{filename}.md`.

## Conclusion
By leveraging n8n's nodes and best practices, you can automate content publishing while minimizing errors. Test workflows thoroughly and monitor executions to ensure reliability. For advanced use cases, explore n8n's error handling and conditional logic.
