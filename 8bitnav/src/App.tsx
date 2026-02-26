import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AnsiWings from './components/AnsiWings';
import PixelCharacter from './components/PixelCharacter';
import PixelMushrooms from './components/PixelMushrooms';
import { use8BitSound } from './hooks/use8BitSound';

function App() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { playStartupSound, initAudioContext } = use8BitSound();

  // Binary background effect
  const generateBinaryBackground = () => {
    let binary = '';
    for (let i = 0; i < 500; i++) {
      binary += Math.random() > 0.5 ? '1' : '0';
      if (i % 50 === 49) binary += ' ';
    }
    return binary;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title typewriter effect
      const titleText = '8-BIT NAVIGATOR';
      if (titleRef.current) {
        titleRef.current.textContent = '';
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (titleRef.current && charIndex < titleText.length) {
            titleRef.current.textContent += titleText[charIndex];
            charIndex++;
          } else {
            clearInterval(typeInterval);
          }
        }, 100);
      }

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2,
        ease: 'steps(5)',
      });

      // Blinking cursor effect for subtitle
      gsap.to(subtitleRef.current, {
        opacity: 0.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
        delay: 3,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle first interaction to enable sound
  const handleFirstInteraction = () => {
    if (!soundEnabled) {
      initAudioContext();
      playStartupSound();
      setSoundEnabled(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#1e1e1e] text-[#d0d0d0] relative overflow-hidden"
      onClick={handleFirstInteraction}
    >
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Binary Background */}
      <div className="binary-bg font-terminal text-[#00ff00] opacity-[0.03] whitespace-pre-wrap break-all fixed inset-0 pointer-events-none z-0">
        {generateBinaryBackground()}
      </div>

      {/* Sound indicator */}
      <div className="fixed top-4 right-20 z-30 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${soundEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
        <span className="font-terminal text-xs text-gray-400">
          {soundEnabled ? 'SOUND ON' : 'CLICK TO ENABLE'}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen screen-flicker">
        
        {/* Header Section - ANSI Wings */}
        <header className="pt-8 pb-4">
          <AnsiWings />
          
          {/* Title */}
          <div className="text-center mt-4">
            <h1 
              ref={titleRef}
              className="font-8bit text-xl sm:text-2xl md:text-3xl text-[#ff6b6b] glow tracking-wider"
            />
            <p 
              ref={subtitleRef}
              className="font-terminal text-sm sm:text-base text-[#4ecdc4] mt-2 opacity-0"
            >
              {'< 按 START 键继续 />'}
            </p>
          </div>
        </header>

        {/* Navigation Section - Pixel Characters */}
        <main className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-8">
          {/* Character tracks container */}
          <div className="max-w-6xl mx-auto w-full space-y-6">
            
            {/* Track 1: Mario-style character */}
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs font-terminal text-[#ff6b6b] opacity-50 hidden sm:block">
                [01]
              </div>
              <div className="bg-[#2a2a2a]/50 rounded border border-[#3a3a3a] overflow-hidden">
                <PixelCharacter 
                  type="mario" 
                  url="https://www.youtube.com/@hanyuyuzuru2624"
                  label="YOUTUBE →"
                />
              </div>
            </div>

            {/* Track 2: Frog */}
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs font-terminal text-[#4ecdc4] opacity-50 hidden sm:block">
                [02]
              </div>
              <div className="bg-[#2a2a2a]/50 rounded border border-[#3a3a3a] overflow-hidden">
                <PixelCharacter 
                  type="frog" 
                  url="https://twitter.com/YUZURUofficial_"
                  label="TWITTER →"
                />
              </div>
            </div>

            {/* Track 3: Rabbit */}
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs font-terminal text-[#ffe66d] opacity-50 hidden sm:block">
                [03]
              </div>
              <div className="bg-[#2a2a2a]/50 rounded border border-[#3a3a3a] overflow-hidden">
                <PixelCharacter 
                  type="rabbit" 
                  url="https://www.instagram.com/yuzuruofficial_/"
                  label="INSTAGRAM →"
                />
              </div>
            </div>

          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <p className="font-terminal text-sm text-gray-500">
              {'< 点击角色访问对应链接 />'}
            </p>
          </div>
        </main>

        {/* Footer Section - Pixel Mushrooms */}
        <footer className="py-8">
          <PixelMushrooms />
          
          {/* Footer text */}
          <div className="text-center mt-4">
            <p className="font-terminal text-xs text-gray-600">
              {'© 2024 8-BIT NAVIGATOR | MADE WITH ♥'}
            </p>
          </div>
        </footer>

      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 text-[#ff6b6b] font-terminal text-xs opacity-50 z-20">
        {'╔═══╗'}
        <br />
        {'║ 8B║'}
        <br />
        {'╚═══╝'}
      </div>
      <div className="fixed top-4 right-4 text-[#4ecdc4] font-terminal text-xs opacity-50 z-20">
        {'╔═══╗'}
        <br />
        {'║BIT║'}
        <br />
        {'╚═══╝'}
      </div>
      <div className="fixed bottom-4 left-4 text-[#ffe66d] font-terminal text-xs opacity-50 z-20">
        {'╔═══╗'}
        <br />
        {'║NAV║'}
        <br />
        {'╚═══╝'}
      </div>
      <div className="fixed bottom-4 right-4 text-[#ff6b6b] font-terminal text-xs opacity-50 z-20">
        {'╔═══╗'}
        <br />
        {'║IG8║'}
        <br />
        {'╚═══╝'}
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
