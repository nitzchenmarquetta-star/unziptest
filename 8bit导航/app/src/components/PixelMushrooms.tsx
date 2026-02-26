import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { use8BitSound } from '../hooks/use8BitSound';

const PixelMushrooms = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mushroomsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { playBlipSound, playSelectSound, initAudioContext } = use8BitSound();

  const mushroomCount = 12;

  // Mushroom SVG component
  const MushroomSVG = ({ color }: { color: string }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="overflow-visible">
      {/* Mushroom cap */}
      <rect x="8" y="0" width="16" height="4" fill={color} />
      <rect x="4" y="4" width="24" height="4" fill={color} />
      <rect x="0" y="8" width="32" height="4" fill={color} />
      <rect x="0" y="12" width="32" height="4" fill={color} />
      {/* White spots */}
      <rect x="6" y="6" width="4" height="4" fill="#ffffff" />
      <rect x="22" y="6" width="4" height="4" fill="#ffffff" />
      <rect x="14" y="10" width="4" height="4" fill="#ffffff" />
      {/* Stem */}
      <rect x="8" y="16" width="16" height="4" fill="#ffccaa" />
      <rect x="8" y="20" width="16" height="4" fill="#ffccaa" />
      <rect x="8" y="24" width="16" height="4" fill="#ffccaa" />
      <rect x="6" y="28" width="20" height="4" fill="#ffccaa" />
    </svg>
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wave animation - mushrooms move up and down in a sine wave pattern
      mushroomsRef.current.forEach((mushroom, idx) => {
        if (mushroom) {
          // Vertical wave motion
          gsap.to(mushroom, {
            y: Math.sin((idx / mushroomCount) * Math.PI * 2) * 15 + 15,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.15,
          });
        }
      });

      // Color switching animation
      const colorTimeline = gsap.timeline({ repeat: -1 });
      colorTimeline.to('.mushroom-cap', {
        filter: 'hue-rotate(120deg)',
        duration: 2,
        ease: 'none',
      }).to('.mushroom-cap', {
        filter: 'hue-rotate(0deg)',
        duration: 2,
        ease: 'none',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse interaction - mushrooms scatter when mouse is near
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    mushroomsRef.current.forEach((mushroom) => {
      if (!mushroom) return;

      const mushroomRect = mushroom.getBoundingClientRect();
      const mushroomX = mushroomRect.left - rect.left + mushroomRect.width / 2;
      const mushroomY = mushroomRect.top - rect.top + mushroomRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - mushroomX, 2) + Math.pow(mouseY - mushroomY, 2)
      );

      if (distance < 80) {
        const angle = Math.atan2(mushroomY - mouseY, mushroomX - mouseX);
        const pushDistance = (80 - distance) / 3;
        
        gsap.to(mushroom, {
          x: Math.cos(angle) * pushDistance,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(mushroom, {
          x: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    mushroomsRef.current.forEach((mushroom) => {
      if (mushroom) {
        gsap.to(mushroom, {
          x: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    });
  };

  const handleMushroomEnter = (index: number) => {
    initAudioContext();
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
      // Play different sounds for even/odd mushrooms
      if (index % 2 === 0) {
        playBlipSound();
      } else {
        playSelectSound();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
      
      {/* Mushroom row */}
      <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6 px-4">
        {[...Array(mushroomCount)].map((_, index) => (
          <div
            key={index}
            ref={(el) => { mushroomsRef.current[index] = el; }}
            className="relative cursor-pointer transition-transform hover:scale-110"
            style={{
              transformOrigin: 'bottom center',
            }}
            onMouseEnter={() => handleMushroomEnter(index)}
          >
            <div className="mushroom-cap">
              <MushroomSVG color={index % 2 === 0 ? '#ff0000' : '#00aa00'} />
            </div>
            
            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,230,109,0.3) 0%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-center gap-8 opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* ANSI-style decorative border */}
      <div className="absolute top-0 left-0 right-0 flex justify-center opacity-20">
        <pre className="text-xs font-terminal text-gray-500">
          {'+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+'}
        </pre>
      </div>
    </div>
  );
};

export default PixelMushrooms;
