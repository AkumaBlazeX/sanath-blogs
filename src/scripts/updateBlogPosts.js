import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure marked to use GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true
});

// Paths
const MARKDOWN_DIR = path.join(__dirname, '../data/markdown');
const JSON_FILE = path.join(__dirname, '../data/blogPosts.json');

// Extract title from markdown content
function extractTitle(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].replace(/\*\*/g, '') : 'Untitled';
}

// Extract summary from content (first paragraph after title)
function extractSummary(content) {
  const lines = content.split('\n');
  let summary = '';
  let foundTitle = false;
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    
    if (foundTitle && line.trim() && !line.startsWith('#')) {
      summary = line.replace(/\*\*/g, '');
      break;
    }
  }
  
  return summary || 'No summary available';
}

// Extract tags from content
function extractTags(content) {
  const tags = new Set();
  
  // Look for tags in the content
  const tagMatches = content.match(/\*\*(.+?)\*\*/g) || [];
  tagMatches.forEach(match => {
    const tag = match.replace(/\*\*/g, '');
    if (tag.length > 0) tags.add(tag);
  });
  
  return Array.from(tags);
}

// Read all markdown files and convert to JSON
function updateBlogPosts() {
  try {
    // Read existing blog posts to preserve metadata
    let existingPosts = [];
    try {
      existingPosts = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
    } catch (error) {
      console.log('No existing blog posts found, creating new file');
    }

    // Create a map of existing posts by slug for easy lookup
    const existingPostsMap = new Map(
      existingPosts.map(post => [post.slug, post])
    );

    // Read all markdown files
    const markdownFiles = fs.readdirSync(MARKDOWN_DIR)
      .filter(file => file.endsWith('.md'));

    const blogPosts = markdownFiles.map((file, index) => {
      const filePath = path.join(MARKDOWN_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Try to parse frontmatter if it exists
      const { data, content } = matter(fileContent);
      
      // Generate slug from filename
      const slug = file.replace('.md', '');
      
      // Get existing post data if available
      const existingPost = existingPostsMap.get(slug) || {};
      
      // Extract metadata from content if no frontmatter
      const title = data.title || extractTitle(content);
      const summary = data.summary || extractSummary(content);
      const tags = data.tags || extractTags(content);
      
      // Convert markdown to HTML
      const htmlContent = marked.parse(content);
      
      return {
        id: existingPost.id || index + 1,
        title: title,
        summary: summary,
        date: data.date || existingPost.date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        imageUrl: data.imageUrl || existingPost.imageUrl || '',
        slug: slug,
        tags: tags,
        content: htmlContent,
        targetAudience: data.targetAudience || existingPost.targetAudience || []
      };
    });

    // Write to JSON file
    fs.writeFileSync(JSON_FILE, JSON.stringify(blogPosts, null, 2));
    
    console.log('✅ Blog posts updated successfully!');
    console.log(`📝 Processed ${markdownFiles.length} markdown files`);
  } catch (error) {
    console.error('❌ Error updating blog posts:', error);
    process.exit(1);
  }
}

// Run the update
updateBlogPosts(); 