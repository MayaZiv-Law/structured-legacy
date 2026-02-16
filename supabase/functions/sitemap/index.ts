const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
}

const SITE_URL = 'https://mayaziv-law.com'
const LANGUAGES = ['en', 'he']

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
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
    
    const today = new Date().toISOString().split('T')[0]
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`

    // Static pages - one entry per language with xhtml:link alternates
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
  </url>`
      }
    }

    // Fetch articles via REST API
    if (supabaseUrl && supabaseKey) {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/articles?is_published=eq.true&select=slug,updated_at,published_at&order=published_at.desc`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      )
      
      if (response.ok) {
        const articles = await response.json()
        for (const article of articles) {
          const lastmod = article.updated_at 
            ? new Date(article.updated_at).toISOString().split('T')[0]
            : today
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
  </url>`
          }
        }
      }
    }

    xml += `
</urlset>`

    return new Response(xml, { headers: corsHeaders, status: 200 })
  } catch (error) {
    console.error('Sitemap error:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
})
