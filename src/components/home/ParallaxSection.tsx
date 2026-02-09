import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

import azrieliNight from '@/assets/azrieli-night.webp';

const ParallaxSection = () => {
  const { isRTL, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR
  const [imageLoaded, setImageLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(checkMobile());
    
    // Image is imported, so always set as loaded on desktop
    if (!checkMobile()) {
      setImageLoaded(true);
    }
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

  // Only run scroll handler when section is visible and on desktop
  const handleScroll = useCallback(() => {
    if (!isVisible || !sectionRef.current || isMobile) return;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        setOffsetY(scrollProgress * 100);
      }
    });
  }, [isVisible, isMobile]);

  useEffect(() => {
    if (!isVisible || isMobile) return;
    
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
      className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax on desktop, static on mobile */}
      <div 
        className="absolute inset-0 w-full h-full md:h-[130%] md:-top-[15%]" 
        style={{
          transform: !isMobile ? `translateY(${offsetY * 0.4}px)` : 'none',
          willChange: isVisible && !isMobile ? 'transform' : 'auto'
        }}
      >
        <img 
          src={azrieliNight}
          alt="Azrieli towers Tel Aviv at night" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-primary/60" />
      
      {/* Quote with parallax effect on desktop */}
      <div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto" 
        style={{
          transform: !isMobile ? `translateY(${offsetY * 0.15}px)` : 'none',
          willChange: isVisible && !isMobile ? 'transform' : 'auto'
        }}
      >
        <blockquote className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary-foreground leading-relaxed", isRTL && "font-hebrew")}>
          {isRTL ? '"' : '"'}
          {t('parallax.quote')}
          <span className="text-accent text-5xl md:text-6xl leading-none">{isRTL ? '"' : '"'}</span>
        </blockquote>
      </div>
    </section>
  );
};

export default ParallaxSection;
