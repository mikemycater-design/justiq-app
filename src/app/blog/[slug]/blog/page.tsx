import { BlogSection } from '@/components/blog-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogg – Insikter om juridik och AI',
  description: 'Läs de senaste insikterna, guiderna och analyserna inom juridik och AI från JustiQ-teamet. Håll dig uppdaterad om lagändringar och tekniska framsteg.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BlogSection isPage={true} />
    </div>
  );
}
