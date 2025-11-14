import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ChatBubble } from '@/components/chat-bubble';
import { Inter, Russo_One } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const russoOne = Russo_One({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-russo-one',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://justiq.se'), // Replace with actual domain
  title: {
    default: 'JustiQ – AI-driven juridisk rådgivning online',
    template: '%s | JustiQ',
  },
  description: 'Få juridisk klarhet på minuter. JustiQ erbjuder AI-driven rådgivning, dokumentanalys och avtalsgenerering baserat på svensk lag och rättspraxis.',
  openGraph: {
    title: 'JustiQ – AI-driven juridisk rådgivning online',
    description: 'Få juridisk klarhet på minuter. JustiQ erbjuder AI-driven rådgivning, dokumentanalys och avtalsgenerering baserat på svensk lag och rättspraxis.',
    url: 'https://justiq.se', // Replace with actual domain
    siteName: 'JustiQ',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'JustiQ – AI-driven juridisk rådgivning online',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JustiQ – AI-driven juridisk rådgivning online',
    description: 'Få juridisk klarhet på minuter. JustiQ erbjuder AI-driven rådgivning, dokumentanalys och avtalsgenerering baserat på svensk lag och rättspraxis.',
    // images: ['/twitter-image.png'], // Replace with your actual Twitter image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JustiQ",
    "url": "https://justiq.se", // Replace with actual domain
    "logo": "https://justiq.se/logo.png", // Replace with actual logo URL
    "sameAs": [
      // Add URLs to your social media profiles here
    ]
  };

  return (
    <html lang="sv" className={cn(inter.variable, russoOne.variable)}>
      <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Google Consent Mode v2 - Default Settings */}
        <Script id="gtag-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("consent", "default", {
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
              analytics_storage: "denied",
              functionality_storage: "granted",
              security_storage: "granted",
              wait_for_update: 500
            });
          `}
        </Script>

        {/* Google Analytics 4 */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
          `}
        </Script>
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <FirebaseClientProvider>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <Toaster />
          <ChatBubble />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
