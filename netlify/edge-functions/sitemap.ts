// Netlify Edge Function: Sitemap
// Generates sitemap.xml dynamically on every request so Google always sees
// a fresh lastmod date. Replaces the previous Supabase edge function, which
// required a separate manual deploy to update.
//
// Articles are fetched from the existing Supabase REST API using the public
// anon key (same key that is baked into the frontend bundle). If Supabase
// is unreachable the sitemap still returns with the static pages.

import type { Context } from "https://edge.netlify.com";

const SITE_URL = 'https://mayaziv-law.com';
const LANGUAGES = ['en', 'he'] as const;

// These are public values (the anon key is meant to be shared) — same as what
// the frontend uses via import.meta.env.VITE_SUPABASE_*.
const SUPABASE_URL = 'https://hqvagogzltdyacwocjhr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxdmFnb2d6bHRkeWFjd29jamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MjE0NjUsImV4cCI6MjA4MjQ5NzQ2NX0.ZDRqogJunnjykDPwPj89o7_c21IUxEdY_AR3VRyAoKc';

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/real-estate', priority: '0.8', changefreq: 'monthly' },
  { path: '/taxation', priority: '0.8', changefreq: 'monthly' },
  { path: '/estate-planning', priority: '0.8', changefreq: 'monthly' },
  { path: '/olim-residents', priority: '0.8', changefreq: 'monthly' },
  { path: '/commercial', priority: '0.8', changefreq: 'monthly' },
  { path: '/insights', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

interface Article {
  slug: string;
  updated_at: string | null;
  published_at: string | null;
}

export default async (_request: Request, _context: Context): Promise<Response> => {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  for (const page of staticPages) {
    for (const lang of LANGUAGES) {
      xml += `
  <url>
    <loc>${SITE_URL}/${lang}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en${page.path}" />
    <xhtml:link rel="alternate" hreflang="he" href="${SITE_URL}/he${page.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${page.path}" />
  </url>`;
    }
  }

  // Fetch published articles from Supabase. If it fails the sitemap still
  // returns with just the static pages above.
  try {
    const articlesResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?is_published=eq.true&select=slug,updated_at,published_at&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (articlesResponse.ok) {
      const articles: Article[] = await articlesResponse.json();
      for (const article of articles) {
        const lastmod = article.updated_at
          ? new Date(article.updated_at).toISOString().split('T')[0]
          : today;
        for (const lang of LANGUAGES) {
          xml += `
  <url>
    <loc>${SITE_URL}/${lang}/insights/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/insights/${article.slug}" />
    <xhtml:link rel="alternate" hreflang="he" href="${SITE_URL}/he/insights/${article.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/insights/${article.slug}" />
  </url>`;
        }
      }
    }
  } catch (error) {
    console.error('Sitemap: failed to fetch articles', error);
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};

export const config = {
  path: '/sitemap.xml',
};
