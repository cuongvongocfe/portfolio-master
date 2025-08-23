import { SeoMeta } from '@/types';
import Head from 'next/head';
import { siteConfig } from '@/data';

interface SEOHeadProps {
  meta?: Partial<SeoMeta>;
  path?: string;
}

export default function SEOHead({ meta = {}, path = '' }: SEOHeadProps) {
  const title = meta.title || siteConfig.title;
  const description = meta.description || siteConfig.description;
  const canonical = meta.canonical || `${siteConfig.url}${path}`;
  const ogImage = meta.ogImage || `${siteConfig.url}${siteConfig.ogImage}`;
  const keywords = meta.keywords?.join(', ') || 'frontend developer, react, nextjs, typescript, vietnam developer';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteConfig.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteConfig.name} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@YOUR_TWITTER" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": siteConfig.name,
            "jobTitle": "Frontend Developer",
            "description": description,
            "url": siteConfig.url,
            "sameAs": [
              siteConfig.links.github,
              siteConfig.links.linkedin,
              siteConfig.links.twitter
            ],
            "knowsAbout": [
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Frontend Development",
              "Web Development"
            ]
          })
        }}
      />
    </Head>
  );
}
