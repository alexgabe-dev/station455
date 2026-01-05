import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTransmissionBySlug } from '../services/stationService';
import { Transmission } from '../types';
import { ArrowLeft, Share2, Clock, User, Tag, List } from 'lucide-react';
import Seo from '../components/Seo';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

const TransmissionPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Transmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  
  // Ref for observer to disconnect cleanly
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (slug) {
        setLoading(true);
        getTransmissionBySlug(slug).then(data => {
            setPost(data || null);
            setLoading(false);
        });
    }
  }, [slug]);

  // Process content to add IDs and build TOC
  useEffect(() => {
    if (post && post.content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content, 'text/html');
        const headers = doc.querySelectorAll('h2, h3');
        const newToc: TocItem[] = [];

        headers.forEach((header, index) => {
            const text = header.textContent || '';
            const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
            const id = `section-${slug}-${index}`;
            header.id = id;
            newToc.push({
                id,
                text,
                level: parseInt(header.tagName.substring(1))
            });
        });

        setProcessedContent(doc.body.innerHTML);
        setToc(newToc);
    } else if (post) {
        setProcessedContent(post.content || '');
        setToc([]);
    }
  }, [post]);

  // Intersection Observer for Active TOC Highlighting
  useEffect(() => {
    if (loading || toc.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-100px 0px -60% 0px', // Trigger when header is near top
      threshold: 0
    });

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, toc, processedContent]); // Re-run when content is processed and rendered

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        
        // Manually set active ID on click for immediate feedback
        setActiveId(id);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-mono text-alert animate-pulse">:: DECRYPTING_SIGNAL ::</div>;
  
  if (!post) return (
    <div className="h-screen flex flex-col items-center justify-center font-mono text-white gap-4">
        <span className="text-4xl">404</span>
        <span>SIGNAL_LOST</span>
        <Link to="/blog" className="text-alert hover:underline">Return to Archive</Link>
    </div>
  );

  return (
    <article className="min-h-screen bg-void pb-20">
        <Seo 
            title={post.title}
            description={post.excerpt}
            image={post.coverImage}
            type="article"
            publishedTime={post.publishDate}
            tags={post.tags}
        />
        
        {/* Header Image */}
        <div className="h-[50vh] md:h-[60vh] w-full relative overflow-hidden group">
             <img src={post.coverImage} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000" alt={post.title} />
             <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent"></div>
             <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none"></div>
             
             <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 z-10">
                 <div className="max-w-7xl mx-auto">
                     <Link to="/blog" className="inline-flex items-center gap-2 text-alert text-xs font-mono mb-4 md:mb-6 hover:text-white transition-colors uppercase tracking-widest bg-black/50 backdrop-blur-sm px-3 py-1 border border-alert/20 rounded-full">
                        <ArrowLeft size={12} /> Return to Archive
                     </Link>
                     
                     <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-white/10 backdrop-blur text-white border border-white/20 text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1">
                                <Tag size={10} /> {tag}
                            </span>
                        ))}
                     </div>

                     <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] mb-4 md:mb-6 drop-shadow-lg">
                         {post.title}
                     </h1>
                     
                     <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs font-mono text-gray-300 border-t border-gray-700/50 pt-4 md:pt-6">
                         <span className="flex items-center gap-2"><Clock size={14} className="text-alert" /> {post.readTime}</span>
                         <span className="hidden md:inline text-gray-600">//</span>
                         <span>PUBLISHED: {post.publishDate}</span>
                         <span className="hidden md:inline text-gray-600">//</span>
                         <span className="flex items-center gap-2"><User size={14} className="text-alert" /> {post.author}</span>
                     </div>
                 </div>
             </div>
        </div>

        {/* Layout Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 md:mt-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Desktop TOC Sidebar */}
                {toc.length > 0 && (
                    <aside className="hidden lg:block lg:col-span-3 relative">
                        <div className="sticky top-32 border-l border-gray-800 pl-6 animate-fade-in">
                            <h3 className="font-mono text-xs text-alert uppercase tracking-widest mb-6 flex items-center gap-2">
                                <List size={14} /> Signal Index
                            </h3>
                            <nav className="flex flex-col gap-4">
                                {toc.map(item => (
                                    <a 
                                        key={item.id} 
                                        href={`#${item.id}`} 
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        className={`font-mono text-xs transition-all duration-300 text-left leading-relaxed block 
                                            ${item.level === 3 ? 'pl-4 ml-1' : ''}
                                            ${activeId === item.id 
                                                ? 'text-white font-bold border-l-2 border-alert -ml-[26px] pl-[24px]' 
                                                : 'text-gray-500 hover:text-white'
                                            }
                                        `}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <div className={`col-span-1 ${toc.length > 0 ? 'lg:col-span-8' : 'lg:col-span-8 lg:col-start-3'}`}>
                    
                    {/* Background Trace Line (Mobile/Tablet only or if no sidebar) */}
                    <div className="absolute left-6 lg:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-alert/50 via-gray-800 to-transparent md:-ml-8 hidden lg:block -z-10 opacity-30"></div>

                    {/* Mobile TOC */}
                    {toc.length > 0 && (
                        <div className="lg:hidden mb-12 bg-void-gray border border-gray-800 p-6 rounded-sm">
                            <h3 className="font-mono text-xs text-alert uppercase tracking-widest mb-4 flex items-center gap-2">
                                <List size={14} /> Signal Index
                            </h3>
                            <nav className="flex flex-col gap-3">
                                {toc.map(item => (
                                    <a 
                                        key={item.id} 
                                        href={`#${item.id}`} 
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        className={`font-mono text-xs hover:text-white transition-colors border-b border-gray-800 pb-2 last:border-0 
                                            ${item.level === 3 ? 'pl-4' : ''}
                                            ${activeId === item.id ? 'text-white' : 'text-gray-400'}
                                        `}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                        prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white 
                        prose-headings:scroll-mt-32
                        prose-p:font-inter prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
                        prose-a:text-alert prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white prose-strong:font-bold
                        prose-blockquote:border-l-alert prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-400
                        prose-img:rounded-sm prose-img:grayscale prose-img:opacity-80 hover:prose-img:grayscale-0 hover:prose-img:opacity-100 prose-img:transition-all prose-img:border prose-img:border-gray-800
                        prose-code:text-alert prose-code:font-mono prose-code:bg-black prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
                    ">
                        <p className="lead text-xl md:text-2xl text-white font-inter font-light border-l-4 border-alert pl-6 mb-12 italic opacity-90">
                            {post.excerpt}
                        </p>
                        
                        {/* Safe Render of Processed HTML with IDs */}
                        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                        
                        <div className="mt-16 pt-12 border-t border-gray-800 flex justify-between items-center">
                            <div className="font-mono text-xs text-gray-500">
                                ID: {post.id}<br/>
                                SECURE_CONNECTION: TRUE
                            </div>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Signal coordinates copied to clipboard.');
                                }}
                                className="flex items-center gap-3 text-alert hover:text-white transition-colors text-xs font-mono uppercase tracking-widest border border-alert/30 hover:bg-alert/10 px-6 py-3"
                            >
                                <Share2 size={16} /> Broadcast Signal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </article>
  );
};

export default TransmissionPost;