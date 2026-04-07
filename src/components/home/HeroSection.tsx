import heroImage from '@/assets/tel-aviv-coastline-hero.webp';

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] overflow-visible -mt-0 lg:-mt-20">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Israel coastline and city lights at dusk"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          src={heroImage}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={3237}
          height={2369}
        />
        {/* Cinematic gradient overlay — darkens bottom for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
      </div>
    </section>
  );
};
export default HeroSection;
