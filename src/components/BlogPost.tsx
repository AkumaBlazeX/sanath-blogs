import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostProps {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string[];
  content: string;
  imageUrl?: string;
  tags?: string[];
  slug?: string;
}

const BlogPostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogHeader = styled.header`
  margin-bottom: 2rem;
`;

const BlogMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Category = styled.span`
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const BlogContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
  }
  
  pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  code {
    font-family: monospace;
    background: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }
`;

const BlogFooter = styled.footer`
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const Tag = styled.span`
  color: #0066cc;
  margin-right: 1rem;
  font-size: 0.9rem;
`;

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  description,
  publishDate,
  author,
  category,
  content,
  imageUrl,
  tags = [],
  slug
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://www.sanathblogs.site/about"
    },
    "publisher": {
      "@type": "Person",
      "name": "Sanath Kumar",
      "url": "https://www.sanathblogs.site"
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "image": imageUrl || "https://www.sanathblogs.site/images/logo-black.png",
    "url": window.location.href,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    },
    "keywords": tags.join(", ")
  };

  return (
    <BlogPostContainer>
      <Helmet>
        <title>{`${title} - Sanath Blogs`}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={tags.join(", ")} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        
        {/* Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <BlogHeader>
        <h1>{title}</h1>
        <BlogMeta>
          <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
          <span className="author">By {author}</span>
          <div className="categories">
            {category.map((cat) => (
              <Category key={cat}>{cat}</Category>
            ))}
          </div>
        </BlogMeta>
      </BlogHeader>

      <BlogContent>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </BlogContent>

      {tags.length > 0 && (
        <BlogFooter>
          <div className="tags">
            {tags.map((tag) => (
              <Tag key={tag}>#{tag}</Tag>
            ))}
          </div>
        </BlogFooter>
      )}
    </BlogPostContainer>
  );
};

export default BlogPost;
