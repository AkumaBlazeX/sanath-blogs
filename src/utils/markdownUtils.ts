
import blogPosts from '../data/blogPosts.json';

/**
 * Checks if a markdown file exists for the given slug
 */
export const checkMarkdownExists = async (slug: string): Promise<boolean> => {
  try {
    const response = await fetch(`/src/data/markdown/${slug}.md`);
    return response.ok;
  } catch (error) {
    console.error(`Error checking markdown for ${slug}:`, error);
    return false;
  }
};

/**
 * Gets the content of a markdown file
 */
export const getMarkdownContent = async (slug: string): Promise<string | null> => {
  try {
    const response = await fetch(`/src/data/markdown/${slug}.md`);
    if (!response.ok) {
      throw new Error(`Markdown file not found for ${slug}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading markdown for ${slug}:`, error);
    return null;
  }
};

/**
 * Scans for new markdown files that aren't in the blog posts data
 * In a real application, this would be done server-side
 */
export const scanForNewMarkdownFiles = async (): Promise<void> => {
  // This is a client-side simulation
  // In a real app, you would:
  // 1. Have a server endpoint that scans the directory
  // 2. Parse frontmatter from markdown files
  // 3. Update the blogPosts.json or database
  
  console.log('Scanning for new markdown files...');
  // In a real implementation, this would make an API call to the server
  
  // For demonstration purposes, we're logging the current posts
  // that have markdown content
  const postsWithMarkdown = await Promise.all(
    blogPosts.map(async post => {
      const hasMarkdown = await checkMarkdownExists(post.slug);
      return { ...post, hasMarkdown };
    })
  );
  
  console.log('Posts with markdown:', postsWithMarkdown);
};
