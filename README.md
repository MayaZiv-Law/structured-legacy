# Maya Ziv Law

Website for Maya Ziv Law, an Israeli law firm providing cross-border legal counsel in real estate, taxation, estate planning, and commercial transactions.

- **Live site**: https://mayaziv-law.com

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- Supabase (articles content)
- Netlify (hosting + edge functions for sitemap and bot prerendering)

## Local development

```sh
npm install
npm run dev
```

The dev server runs on http://localhost:5173. Environment variables for Supabase live in `.env`.

## Deployment

Pushes to `main` are automatically deployed to https://mayaziv-law.com by Netlify. The sitemap, bot prerender, and other edge functions live in `netlify/edge-functions/` and deploy as part of the same pipeline.
