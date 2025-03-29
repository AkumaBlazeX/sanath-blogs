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
  // First, try to find a dedicated tags section
  const tagsSection = content.match(/## Tags\s+([^#]+)/);
  if (tagsSection) {
    // Extract tags from the dedicated section
    const tagList = tagsSection[1].trim().split('\n')
      .map(line => line.replace(/^\s*-\s*/, '').trim()) // Remove list markers
      .filter(tag => tag.length > 0);
    return Array.from(new Set(tagList));
  }
  
  // If no dedicated section, look for hashtags
  const hashtagMatches = content.match(/#[a-zA-Z]\w+/g) || [];
  if (hashtagMatches.length > 0) {
    return Array.from(new Set(hashtagMatches));
  }
  
  // Default tags if none found
  return ['Uncategorized'];
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
      
      // Use frontmatter tags if available, otherwise extract from content
      const tags = data.tags || existingPost.tags || extractTags(content);
      
      // Convert markdown to HTML
      const htmlContent = marked.parse(content);
      
      return {
        id: existingPost.id || index + 1,
        title: data.title || extractTitle(content),
        summary: data.summary || extractSummary(content),
        date: data.date || existingPost.date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime: data.readTime || existingPost.readTime || `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
        imageUrl: data.imageUrl || existingPost.imageUrl || '',
        slug: slug,
        tags: tags,
        filters: data.filters || existingPost.filters || {
          category: data.category || 'Uncategorized',
          difficulty: data.difficulty || 'Beginner',
          topics: data.topics || [],
          tools: data.tools || []
        },
        meta: data.meta || existingPost.meta || {
          type: data.type || 'Article',
          keywords: data.keywords || tags
        },
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