import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
}

const Seo: React.FC<SeoProps> = ({ 
  title, 
  description = "Station445: Interstellar relay broadcasting signals from the void.", 
  image, 
  url = window.location.href, 
  type = 'website',
  publishedTime,
  tags
}) => {
  
  useEffect(() => {
    // Update Title
    const fullTitle = `${title} | Station445`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('description', description);

    // Open Graph
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:url', url, 'property');
    if (image) updateMeta('og:image', image, 'property');
    if (publishedTime) updateMeta('article:published_time', publishedTime, 'property');
    if (tags) tags.forEach(tag => updateMeta('article:tag', tag, 'property'));

    // Twitter Card
    updateMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    if (image) updateMeta('twitter:image', image);

  }, [title, description, image, url, type, publishedTime, tags]);

  return null;
};

export default Seo;