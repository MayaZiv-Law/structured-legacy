import { useEffect, useRef, useState } from 'react';
import telAvivHero from '@/assets/tel-aviv-hero.webp';

const ParallaxSection = () => {
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
      className="relative h-[40vh] md:h-[50vh] overflow-hidden"
    >
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url(${telAvivHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offsetY * 0.3}px)`,
          willChange: 'transform',
        }}
      />
      {/* Overlay for better visual blending */}
      <div className="absolute inset-0 bg-primary/20" />
    </section>
  );
};

export default ParallaxSection;
