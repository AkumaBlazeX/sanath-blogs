import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  categories: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src/data/markdown');
const RSS_PATH = path.join(process.cwd(), 'public/rss.xml');
const SITE_URL = 'https://www.sanathblogs.site';

function getBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR);
  
  return files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx?$/, '');
      
      return {
        title: data.title,
        description: data.description,
        date: data.date,
        slug,
        categories: data.categories || [],
        content: content.trim()
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateRSSFeed(posts: BlogPost[]): string {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sanath Blogs - Data Science &amp; AI Automation Insights</title>
    <link>${SITE_URL}</link>
    <description>Expert insights on Data Science, AI automation, and machine learning by Sanath Kumar. Discover practical guides and tutorials on automation workflows and data analysis.</description>
    <language>en-us</language>
    <lastBuildDate>${format(new Date(), 'E, dd MMM yyyy HH:mm:ss O')}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/images/logo-black.png</url>
      <title>Sanath Blogs</title>
      <link>${SITE_URL}</link>
    </image>
    
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/#/blog/${post.slug}</link>
      <guid>${SITE_URL}/#/blog/${post.slug}</guid>
      <pubDate>${format(new Date(post.date), 'E, dd MMM yyyy HH:mm:ss O')}</pubDate>
      <description>
        <![CDATA[
          ${post.description}
        ]]>
      </description>
      ${post.categories.map(category => `
      <category>${escapeXml(category)}</category>`).join('')}
    </item>`).join('\n    ')}
  </channel>
</rss>`;

  return rssFeed;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function updateRSSFeed(): void {
  try {
    const posts = getBlogPosts();
    const rssFeed = generateRSSFeed(posts);
    fs.writeFileSync(RSS_PATH, rssFeed);
    console.log('RSS feed updated successfully!');
  } catch (error) {
    console.error('Error updating RSS feed:', error);
    process.exit(1);
  }
}

// Run the update
updateRSSFeed(); 