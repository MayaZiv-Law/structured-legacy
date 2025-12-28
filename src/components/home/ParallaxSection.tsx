import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import telAvivHero from '@/assets/tel-aviv-hero.webp';

const ParallaxSection = () => {
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        setOffsetY(scrollProgress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <div 
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{
          backgroundImage: `url(${telAvivHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offsetY * 0.4}px)`,
          willChange: 'transform',
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-primary/60" />
      
      {/* Quote with parallax effect */}
      <div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          transform: `translateY(${offsetY * 0.15}px)`,
          willChange: 'transform',
        }}
      >
        <blockquote className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-primary-foreground leading-relaxed",
          isRTL && "font-hebrew"
        )}>
          <span className="text-accent text-4xl md:text-5xl leading-none">"</span>
          We align legal execution with financial consequences — from day one.
          <span className="text-accent text-4xl md:text-5xl leading-none">"</span>
        </blockquote>
      </div>
    </section>
  );
};

export default ParallaxSection;
