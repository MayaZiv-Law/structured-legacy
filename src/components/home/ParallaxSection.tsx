import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

import azrieliNight from '@/assets/azrieli-night.webp';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ParallaxSection = () => {
  const { isRTL, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const rafRef = useRef<number | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(checkMobile());
  }, []);

  // Use IntersectionObserver instead of scroll for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Only run scroll handler when section is visible, on desktop, and motion allowed
  const handleScroll = useCallback(() => {
    if (!isVisible || !sectionRef.current || isMobile || prefersReducedMotion()) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        const offset = scrollProgress * 100;
        if (bgRef.current) bgRef.current.style.transform = `translateY(${offset * 0.4}px)`;
        if (quoteRef.current) quoteRef.current.style.transform = `translateY(${offset * 0.15}px)`;
      }
    });
  }, [isVisible, isMobile]);

  useEffect(() => {
    if (!isVisible || isMobile || prefersReducedMotion()) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVisible, isMobile, handleScroll]);

  return (
    <section
      ref={sectionRef}
      aria-label="Quote"
      className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax on desktop, static on mobile */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full md:h-[130%] md:-top-[15%]"
        style={{
          willChange: isVisible && !isMobile ? 'transform' : 'auto'
        }}
      >
        <img 
          src={azrieliNight}
          alt="Israel cityscape at night" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Quote with parallax effect on desktop */}
      <div
        ref={quoteRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          willChange: isVisible && !isMobile ? 'transform' : 'auto'
        }}
      >
        <blockquote className={cn("text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-medium text-primary-foreground leading-relaxed", isRTL && "font-hebrew")}>
          {isRTL ? '"' : '"'}
          {t('parallax.quote')}
          <span className="text-accent text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none">{isRTL ? '"' : '"'}</span>
        </blockquote>
      </div>
    </section>
  );
};

export default ParallaxSection;
