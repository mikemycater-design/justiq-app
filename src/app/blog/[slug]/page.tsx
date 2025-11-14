import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, type Content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/placeholder-images';

const fallbackImage = placeholderImages.find(p => p.id === 'placeholder-fallback-large');

function getPost(slug: string): Content | undefined {
    return blogPosts.find((p) => p.slug === slug);
}

type BlogPageProps = {
  params: {
    slug: string;
  }
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = getPost(params.slug);

  if (!post) {
    return {
      title: 'Inlägg hittades inte',
    };
  }
  
  const imageUrl = post.image?.imageUrl || fallbackImage?.imageUrl;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  };
}

function BlogPostContent({ post }: { post: Content }) {
  const imageUrl = post.image?.imageUrl || fallbackImage?.imageUrl;
  const imageHint = post.image?.imageHint || 'abstract';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": imageUrl,
    "datePublished": post.publishedAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "JustiQ"
    }
  };

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mb-8">
          <Button asChild variant="link" className="p-0">
              <Link href="/blog" className="flex items-center text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tillbaka till bloggen
              </Link>
          </Button>
      </div>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
              {post.publishedAt && (
                  <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('sv-SE')}</span>
                  </div>
              )}
              {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                     <Tag className="w-4 h-4" />
                     <div className='flex flex-wrap gap-1'>
                        {post.tags.map(tag => <span key={tag} className='bg-secondary px-2 py-0.5 rounded-full'>{tag}</span>)}
                     </div>
                  </div>
              )}
          </div>
          {imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={imageHint}
                    sizes="(max-width: 768px) 100vw, 1000px"
                    priority
                />
            </div>
          )}
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">{post.excerpt}</p>
          {post.body.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <main className="max-w-4xl mx-auto">
        <BlogPostContent post={post} />
      </main>
    </div>
  );
}
