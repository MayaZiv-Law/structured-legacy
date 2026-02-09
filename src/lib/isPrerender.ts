/**
 * Detect if the page is being rendered by a prerender bot (ostr.io, Googlebot, etc.)
 * so we can show all content immediately without animations or lazy rendering.
 */
export const isPrerender = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  // Check for ostr.io / prerender global flag
  if ((window as any).__PRERENDER_INJECTED || (window as any).IS_PRERENDERING) return true;

  const ua = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'googlebot', 'bingbot', 'yandexbot', 'baiduspider',
    'slurp', 'duckduckbot', 'facebot', 'ia_archiver',
    'prerender', 'headlesschrome', 'phantomjs',
    'gptbot', 'claudebot', 'perplexitybot', 'bytespider',
    'amazonbot', 'cohere-ai', 'ostriobot',
  ];
  
  return botPatterns.some(bot => ua.includes(bot));
};
