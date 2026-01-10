import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Only import image for desktop - mobile uses CSS gradient
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
    
    // Only load image on desktop
    if (!checkMobile()) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = '/images/tel-aviv-night-desktop.webp';
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
      className={cn(
        "relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center",
        // Mobile: use gradient background instead of image
        isMobile && "bg-gradient-to-br from-primary via-primary/95 to-primary/90"
      )}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 60vh' }}
    >
      {/* Background image with parallax - only on desktop */}
      {!isMobile && (
        <div 
          className="absolute inset-0 w-full h-[130%] -top-[15%]" 
          style={{
            transform: `translateY(${offsetY * 0.4}px)`,
            willChange: isVisible ? 'transform' : 'auto'
          }}
        >
          {imageLoaded && (
            <img 
              src="/images/tel-aviv-night-desktop.webp"
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
            />
          )}
        </div>
      )}
      
      {/* Dark overlay for text readability - only on desktop with image */}
      {!isMobile && <div className="absolute inset-0 bg-primary/60" />}
      
      {/* Quote with parallax effect on desktop */}
      <div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto" 
        style={{
          transform: !isMobile ? `translateY(${offsetY * 0.15}px)` : 'none',
          willChange: isVisible && !isMobile ? 'transform' : 'auto'
        }}
      >
        <blockquote className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-primary-foreground leading-relaxed", isRTL && "font-hebrew")}>
          {isRTL ? '"' : '"'}
          {t('parallax.quote')}
          <span className="text-accent text-4xl md:text-5xl leading-none">{isRTL ? '"' : '"'}</span>
        </blockquote>
      </div>
    </section>
  );
};

export default ParallaxSection;
