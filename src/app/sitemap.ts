import { MetadataRoute } from 'next'
import { allContent } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://justiq.se'; // Replace with your actual domain

  // Get all content items
  const blogRoutes = allContent
    .filter(item => item.type === 'blog_post')
    .map(post => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    }));

  const caseRoutes = allContent
    .filter(item => item.type === 'case_study')
    .map(c => ({
      url: `${siteUrl}/cases/${c.slug}`,
      lastModified: new Date(),
    }));

  // Get all static routes
  const staticRoutes = [
    '/',
    '/about',
    '/ai-transparency',
    '/blog',
    '/careers',
    '/cases',
    '/contact',
    '/cookies',
    '/faq',
    '/investors',
    '/login',
    '/newsletter',
    '/press',
    '/privacy',
    '/signup',
    '/terms',
    '/tools',
    '/tools/advisor',
    '/tools/contracts',
    '/tools/review',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
