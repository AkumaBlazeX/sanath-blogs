import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const BreadcrumbContainer = styled.nav`
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: "/";
    margin: 0 0.5rem;
    color: #666;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #0066cc;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CurrentPage = styled.span`
  color: #666;
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": `https://www.sanathblogs.site${item.path}`,
        "name": item.name
      }
    }))
  };

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={item.path}>
            {index === items.length - 1 ? (
              <CurrentPage>{item.name}</CurrentPage>
            ) : (
              <BreadcrumbLink to={item.path}>{item.name}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs; 