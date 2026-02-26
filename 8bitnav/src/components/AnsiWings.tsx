import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnsiWings = () => {
  const leftWingRef = useRef<HTMLPreElement>(null);
  const rightWingRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 对称的ANSI艺术翅膀 - 更美观的设计
  const leftWingArt = `
        /\\
       /  \\
      /    \\
     /  /\\  \\
    /  /  \\  \\
   /  /    \\  \\
  /  /  /\\  \\  \\
 /  /  /  \\  \\  \\
/  /  /    \\  \\  \\
  /  /  /\\  \\  \\
   /  /  \\  \\  \\
    /  /  \\  \\
     /  /  \\
      /  /
       /`;

  const rightWingArt = `
        /\\
       /  \\
      /    \\
     /  /\\  \\
    /  /  \\  \\
   /  /    \\  \\
  /  /  /\\  \\  \\
 /  /  /  \\  \\  \\
/  /  /    \\  \\  \\
  /  /  /\\  \\  \\
   /  /  \\  \\  \\
    /  /  \\  \\
     /  /  \\
      /  /
       /`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Color cycle animation
      gsap.to([leftWingRef.current, rightWingRef.current], {
        filter: 'hue-rotate(360deg)',
        duration: 10,
        repeat: -1,
        ease: 'none',
      });

      // Floating animation
      gsap.to(containerRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Line drawing effect
      gsap.from([leftWingRef.current, rightWingRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        stagger: 0.2,
        ease: 'steps(10)',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full flex justify-center items-center py-8 select-none"
    >
      {/* Left Wing - 水平翻转 */}
      <pre
        ref={leftWingRef}
        className="text-xs sm:text-sm md:text-base lg:text-lg font-terminal leading-none whitespace-pre"
        style={{
          background: 'linear-gradient(180deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
          transform: 'scaleX(-1)',
        }}
      >
        {leftWingArt}
      </pre>

      {/* Center sparkle */}
      <div className="mx-4 sm:mx-8 animate-pulse">
        <div 
          className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-300"
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            boxShadow: '0 0 20px #ffe66d, 0 0 40px #ffe66d',
          }}
        />
      </div>

      {/* Right Wing */}
      <pre
        ref={rightWingRef}
        className="text-xs sm:text-sm md:text-base lg:text-lg font-terminal leading-none whitespace-pre"
        style={{
          background: 'linear-gradient(180deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
        }}
      >
        {rightWingArt}
      </pre>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnsiWings;
