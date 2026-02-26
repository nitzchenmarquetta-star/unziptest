import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { use8BitSound } from '../hooks/use8BitSound';

interface PixelCharacterProps {
  type: 'mario' | 'frog' | 'rabbit';
  url: string;
  label: string;
}

const PixelCharacter = ({ type, url, label }: PixelCharacterProps) => {
  const characterRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [frame, setFrame] = useState(0);
  const { playJumpSound, playCoinSound, initAudioContext } = use8BitSound();

  // SVG Pixel Art for each character type
  const renderPixelArt = () => {
    const pixelSize = 4;
    
    if (type === 'mario') {
      // Mario-style character with red hat and blue overalls
      const marioFrames = [
        // Frame 0: Standing
        {
          pixels: [
            { x: 4, y: 0, c: '#ff0000' }, { x: 5, y: 0, c: '#ff0000' }, { x: 6, y: 0, c: '#ff0000' }, { x: 7, y: 0, c: '#ff0000' },
            { x: 3, y: 1, c: '#ff0000' }, { x: 4, y: 1, c: '#ff0000' }, { x: 5, y: 1, c: '#ff0000' }, { x: 6, y: 1, c: '#ff0000' }, { x: 7, y: 1, c: '#ff0000' }, { x: 8, y: 1, c: '#ff0000' },
            { x: 3, y: 2, c: '#8b4513' }, { x: 4, y: 2, c: '#8b4513' }, { x: 5, y: 2, c: '#8b4513' }, { x: 6, y: 2, c: '#ffccaa' }, { x: 7, y: 2, c: '#ffccaa' },
            { x: 2, y: 3, c: '#8b4513' }, { x: 3, y: 3, c: '#ffccaa' }, { x: 4, y: 3, c: '#8b4513' }, { x: 5, y: 3, c: '#ffccaa' }, { x: 6, y: 3, c: '#ffccaa' }, { x: 7, y: 3, c: '#ffccaa' }, { x: 8, y: 3, c: '#ffccaa' },
            { x: 2, y: 4, c: '#8b4513' }, { x: 3, y: 4, c: '#ffccaa' }, { x: 4, y: 4, c: '#8b4513' }, { x: 5, y: 4, c: '#8b4513' }, { x: 6, y: 4, c: '#ffccaa' }, { x: 7, y: 4, c: '#ffccaa' }, { x: 8, y: 4, c: '#ffccaa' },
            { x: 3, y: 5, c: '#ffccaa' }, { x: 4, y: 5, c: '#ffccaa' }, { x: 5, y: 5, c: '#ffccaa' }, { x: 6, y: 5, c: '#ffccaa' }, { x: 7, y: 5, c: '#ffccaa' },
            { x: 2, y: 6, c: '#ff0000' }, { x: 3, y: 6, c: '#ff0000' }, { x: 4, y: 6, c: '#0000ff' }, { x: 5, y: 6, c: '#ff0000' }, { x: 6, y: 6, c: '#ff0000' },
            { x: 1, y: 7, c: '#ff0000' }, { x: 2, y: 7, c: '#ff0000' }, { x: 3, y: 7, c: '#ff0000' }, { x: 4, y: 7, c: '#0000ff' }, { x: 5, y: 7, c: '#ff0000' }, { x: 6, y: 7, c: '#ff0000' }, { x: 7, y: 7, c: '#ff0000' },
            { x: 0, y: 8, c: '#ff0000' }, { x: 1, y: 8, c: '#ff0000' }, { x: 2, y: 8, c: '#ff0000' }, { x: 3, y: 8, c: '#ff0000' }, { x: 4, y: 8, c: '#0000ff' }, { x: 5, y: 8, c: '#ff0000' }, { x: 6, y: 8, c: '#ff0000' }, { x: 7, y: 8, c: '#ff0000' }, { x: 8, y: 8, c: '#ff0000' },
            { x: 0, y: 9, c: '#ffccaa' }, { x: 1, y: 9, c: '#ffccaa' }, { x: 2, y: 9, c: '#ff0000' }, { x: 3, y: 9, c: '#0000ff' }, { x: 4, y: 9, c: '#0000ff' }, { x: 5, y: 9, c: '#0000ff' }, { x: 6, y: 9, c: '#ffccaa' }, { x: 7, y: 9, c: '#ffccaa' },
            { x: 0, y: 10, c: '#ffccaa' }, { x: 1, y: 10, c: '#ffccaa' }, { x: 2, y: 10, c: '#ffccaa' }, { x: 3, y: 10, c: '#0000ff' }, { x: 4, y: 10, c: '#0000ff' }, { x: 5, y: 10, c: '#0000ff' }, { x: 6, y: 10, c: '#ffccaa' }, { x: 7, y: 10, c: '#ffccaa' },
            { x: 0, y: 11, c: '#ffccaa' }, { x: 1, y: 11, c: '#ffccaa' }, { x: 2, y: 11, c: '#0000ff' }, { x: 3, y: 11, c: '#0000ff' }, { x: 4, y: 11, c: '#0000ff' }, { x: 5, y: 11, c: '#0000ff' }, { x: 6, y: 11, c: '#ffccaa' }, { x: 7, y: 11, c: '#ffccaa' },
            { x: 2, y: 12, c: '#0000ff' }, { x: 3, y: 12, c: '#0000ff' }, { x: 4, y: 12, c: '#0000ff' }, { x: 5, y: 12, c: '#0000ff' },
            { x: 1, y: 13, c: '#8b4513' }, { x: 2, y: 13, c: '#8b4513' }, { x: 3, y: 13, c: '#8b4513' }, { x: 5, y: 13, c: '#8b4513' }, { x: 6, y: 13, c: '#8b4513' }, { x: 7, y: 13, c: '#8b4513' },
            { x: 0, y: 14, c: '#8b4513' }, { x: 1, y: 14, c: '#8b4513' }, { x: 2, y: 14, c: '#8b4513' }, { x: 3, y: 14, c: '#8b4513' }, { x: 5, y: 14, c: '#8b4513' }, { x: 6, y: 14, c: '#8b4513' }, { x: 7, y: 14, c: '#8b4513' }, { x: 8, y: 14, c: '#8b4513' },
          ]
        },
        // Frame 1: Walking
        {
          pixels: [
            { x: 4, y: 0, c: '#ff0000' }, { x: 5, y: 0, c: '#ff0000' }, { x: 6, y: 0, c: '#ff0000' }, { x: 7, y: 0, c: '#ff0000' },
            { x: 3, y: 1, c: '#ff0000' }, { x: 4, y: 1, c: '#ff0000' }, { x: 5, y: 1, c: '#ff0000' }, { x: 6, y: 1, c: '#ff0000' }, { x: 7, y: 1, c: '#ff0000' }, { x: 8, y: 1, c: '#ff0000' },
            { x: 3, y: 2, c: '#8b4513' }, { x: 4, y: 2, c: '#8b4513' }, { x: 5, y: 2, c: '#8b4513' }, { x: 6, y: 2, c: '#ffccaa' }, { x: 7, y: 2, c: '#ffccaa' },
            { x: 2, y: 3, c: '#8b4513' }, { x: 3, y: 3, c: '#ffccaa' }, { x: 4, y: 3, c: '#8b4513' }, { x: 5, y: 3, c: '#ffccaa' }, { x: 6, y: 3, c: '#ffccaa' }, { x: 7, y: 3, c: '#ffccaa' }, { x: 8, y: 3, c: '#ffccaa' },
            { x: 2, y: 4, c: '#8b4513' }, { x: 3, y: 4, c: '#ffccaa' }, { x: 4, y: 4, c: '#8b4513' }, { x: 5, y: 4, c: '#8b4513' }, { x: 6, y: 4, c: '#ffccaa' }, { x: 7, y: 4, c: '#ffccaa' }, { x: 8, y: 4, c: '#ffccaa' },
            { x: 3, y: 5, c: '#ffccaa' }, { x: 4, y: 5, c: '#ffccaa' }, { x: 5, y: 5, c: '#ffccaa' }, { x: 6, y: 5, c: '#ffccaa' }, { x: 7, y: 5, c: '#ffccaa' },
            { x: 2, y: 6, c: '#ff0000' }, { x: 3, y: 6, c: '#ff0000' }, { x: 4, y: 6, c: '#0000ff' }, { x: 5, y: 6, c: '#ff0000' }, { x: 6, y: 6, c: '#ff0000' },
            { x: 1, y: 7, c: '#ff0000' }, { x: 2, y: 7, c: '#ff0000' }, { x: 3, y: 7, c: '#ff0000' }, { x: 4, y: 7, c: '#0000ff' }, { x: 5, y: 7, c: '#ff0000' }, { x: 6, y: 7, c: '#ff0000' }, { x: 7, y: 7, c: '#ff0000' },
            { x: 0, y: 8, c: '#ff0000' }, { x: 1, y: 8, c: '#ff0000' }, { x: 2, y: 8, c: '#ff0000' }, { x: 3, y: 8, c: '#ff0000' }, { x: 4, y: 8, c: '#0000ff' }, { x: 5, y: 8, c: '#ff0000' }, { x: 6, y: 8, c: '#ff0000' }, { x: 7, y: 8, c: '#ff0000' }, { x: 8, y: 8, c: '#ff0000' },
            { x: 0, y: 9, c: '#ffccaa' }, { x: 1, y: 9, c: '#ffccaa' }, { x: 2, y: 9, c: '#ff0000' }, { x: 3, y: 9, c: '#0000ff' }, { x: 4, y: 9, c: '#0000ff' }, { x: 5, y: 9, c: '#0000ff' }, { x: 6, y: 9, c: '#ffccaa' }, { x: 7, y: 9, c: '#ffccaa' },
            { x: 2, y: 10, c: '#ffccaa' }, { x: 3, y: 10, c: '#ffccaa' }, { x: 4, y: 10, c: '#0000ff' }, { x: 5, y: 10, c: '#0000ff' }, { x: 6, y: 10, c: '#ffccaa' },
            { x: 3, y: 11, c: '#0000ff' }, { x: 4, y: 11, c: '#0000ff' }, { x: 5, y: 11, c: '#0000ff' },
            { x: 2, y: 12, c: '#8b4513' }, { x: 3, y: 12, c: '#8b4513' }, { x: 4, y: 12, c: '#8b4513' },
            { x: 5, y: 13, c: '#8b4513' }, { x: 6, y: 13, c: '#8b4513' },
            { x: 6, y: 14, c: '#8b4513' }, { x: 7, y: 14, c: '#8b4513' },
          ]
        },
      ];
      
      const currentFrame = marioFrames[frame % marioFrames.length];
      return (
        <svg width="40" height="60" viewBox="0 0 40 60" className="overflow-visible">
          {currentFrame.pixels.map((p, i) => (
            <rect
              key={i}
              x={p.x * pixelSize}
              y={p.y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={p.c}
            />
          ))}
        </svg>
      );
    }
    
    if (type === 'frog') {
      // Green frog
      const frogFrames = [
        // Frame 0: Standing
        {
          pixels: [
            { x: 3, y: 0, c: '#00ff00' }, { x: 4, y: 0, c: '#00ff00' }, { x: 5, y: 0, c: '#00ff00' }, { x: 6, y: 0, c: '#00ff00' },
            { x: 2, y: 1, c: '#00ff00' }, { x: 3, y: 1, c: '#00ff00' }, { x: 4, y: 1, c: '#00ff00' }, { x: 5, y: 1, c: '#00ff00' }, { x: 6, y: 1, c: '#00ff00' }, { x: 7, y: 1, c: '#00ff00' },
            { x: 2, y: 2, c: '#ffffff' }, { x: 3, y: 2, c: '#000000' }, { x: 4, y: 2, c: '#00ff00' }, { x: 5, y: 2, c: '#00ff00' }, { x: 6, y: 2, c: '#000000' }, { x: 7, y: 2, c: '#ffffff' },
            { x: 2, y: 3, c: '#00ff00' }, { x: 3, y: 3, c: '#00ff00' }, { x: 4, y: 3, c: '#00ff00' }, { x: 5, y: 3, c: '#00ff00' }, { x: 6, y: 3, c: '#00ff00' }, { x: 7, y: 3, c: '#00ff00' },
            { x: 1, y: 4, c: '#00ff00' }, { x: 2, y: 4, c: '#00ff00' }, { x: 3, y: 4, c: '#00ff00' }, { x: 4, y: 4, c: '#00ff00' }, { x: 5, y: 4, c: '#00ff00' }, { x: 6, y: 4, c: '#00ff00' }, { x: 7, y: 4, c: '#00ff00' }, { x: 8, y: 4, c: '#00ff00' },
            { x: 1, y: 5, c: '#00ff00' }, { x: 2, y: 5, c: '#00ff00' }, { x: 3, y: 5, c: '#00ff00' }, { x: 4, y: 5, c: '#00ff00' }, { x: 5, y: 5, c: '#00ff00' }, { x: 6, y: 5, c: '#00ff00' }, { x: 7, y: 5, c: '#00ff00' }, { x: 8, y: 5, c: '#00ff00' },
            { x: 0, y: 6, c: '#00ff00' }, { x: 1, y: 6, c: '#00ff00' }, { x: 2, y: 6, c: '#00ff00' }, { x: 3, y: 6, c: '#00ff00' }, { x: 4, y: 6, c: '#00ff00' }, { x: 5, y: 6, c: '#00ff00' }, { x: 6, y: 6, c: '#00ff00' }, { x: 7, y: 6, c: '#00ff00' }, { x: 8, y: 6, c: '#00ff00' }, { x: 9, y: 6, c: '#00ff00' },
            { x: 0, y: 7, c: '#00ff00' }, { x: 1, y: 7, c: '#00ff00' }, { x: 2, y: 7, c: '#00ff00' }, { x: 3, y: 7, c: '#00ff00' }, { x: 4, y: 7, c: '#00ff00' }, { x: 5, y: 7, c: '#00ff00' }, { x: 6, y: 7, c: '#00ff00' }, { x: 7, y: 7, c: '#00ff00' }, { x: 8, y: 7, c: '#00ff00' }, { x: 9, y: 7, c: '#00ff00' },
            { x: 0, y: 8, c: '#00ff00' }, { x: 1, y: 8, c: '#00ff00' }, { x: 2, y: 8, c: '#00ff00' }, { x: 3, y: 8, c: '#008800' }, { x: 4, y: 8, c: '#008800' }, { x: 5, y: 8, c: '#008800' }, { x: 6, y: 8, c: '#008800' }, { x: 7, y: 8, c: '#00ff00' }, { x: 8, y: 8, c: '#00ff00' }, { x: 9, y: 8, c: '#00ff00' },
            { x: 0, y: 9, c: '#00ff00' }, { x: 1, y: 9, c: '#00ff00' }, { x: 2, y: 9, c: '#008800' }, { x: 3, y: 9, c: '#008800' }, { x: 4, y: 9, c: '#008800' }, { x: 5, y: 9, c: '#008800' }, { x: 6, y: 9, c: '#008800' }, { x: 7, y: 9, c: '#008800' }, { x: 8, y: 9, c: '#00ff00' }, { x: 9, y: 9, c: '#00ff00' },
            { x: 1, y: 10, c: '#008800' }, { x: 2, y: 10, c: '#008800' }, { x: 7, y: 10, c: '#008800' }, { x: 8, y: 10, c: '#008800' },
          ]
        },
        // Frame 1: Jumping
        {
          pixels: [
            { x: 3, y: 0, c: '#00ff00' }, { x: 4, y: 0, c: '#00ff00' }, { x: 5, y: 0, c: '#00ff00' }, { x: 6, y: 0, c: '#00ff00' },
            { x: 2, y: 1, c: '#00ff00' }, { x: 3, y: 1, c: '#00ff00' }, { x: 4, y: 1, c: '#00ff00' }, { x: 5, y: 1, c: '#00ff00' }, { x: 6, y: 1, c: '#00ff00' }, { x: 7, y: 1, c: '#00ff00' },
            { x: 2, y: 2, c: '#ffffff' }, { x: 3, y: 2, c: '#000000' }, { x: 4, y: 2, c: '#00ff00' }, { x: 5, y: 2, c: '#00ff00' }, { x: 6, y: 2, c: '#000000' }, { x: 7, y: 2, c: '#ffffff' },
            { x: 2, y: 3, c: '#00ff00' }, { x: 3, y: 3, c: '#00ff00' }, { x: 4, y: 3, c: '#00ff00' }, { x: 5, y: 3, c: '#00ff00' }, { x: 6, y: 3, c: '#00ff00' }, { x: 7, y: 3, c: '#00ff00' },
            { x: 1, y: 4, c: '#00ff00' }, { x: 2, y: 4, c: '#00ff00' }, { x: 3, y: 4, c: '#00ff00' }, { x: 4, y: 4, c: '#00ff00' }, { x: 5, y: 4, c: '#00ff00' }, { x: 6, y: 4, c: '#00ff00' }, { x: 7, y: 4, c: '#00ff00' }, { x: 8, y: 4, c: '#00ff00' },
            { x: 0, y: 5, c: '#00ff00' }, { x: 1, y: 5, c: '#00ff00' }, { x: 2, y: 5, c: '#00ff00' }, { x: 3, y: 5, c: '#00ff00' }, { x: 4, y: 5, c: '#00ff00' }, { x: 5, y: 5, c: '#00ff00' }, { x: 6, y: 5, c: '#00ff00' }, { x: 7, y: 5, c: '#00ff00' }, { x: 8, y: 5, c: '#00ff00' }, { x: 9, y: 5, c: '#00ff00' },
            { x: 0, y: 6, c: '#00ff00' }, { x: 1, y: 6, c: '#00ff00' }, { x: 2, y: 6, c: '#008800' }, { x: 3, y: 6, c: '#008800' }, { x: 4, y: 6, c: '#008800' }, { x: 5, y: 6, c: '#008800' }, { x: 6, y: 6, c: '#008800' }, { x: 7, y: 6, c: '#008800' }, { x: 8, y: 6, c: '#00ff00' }, { x: 9, y: 6, c: '#00ff00' },
            { x: 0, y: 7, c: '#00ff00' }, { x: 1, y: 7, c: '#008800' }, { x: 2, y: 7, c: '#008800' }, { x: 3, y: 7, c: '#008800' }, { x: 4, y: 7, c: '#008800' }, { x: 5, y: 7, c: '#008800' }, { x: 6, y: 7, c: '#008800' }, { x: 7, y: 7, c: '#008800' }, { x: 8, y: 7, c: '#008800' }, { x: 9, y: 7, c: '#00ff00' },
            { x: 2, y: 8, c: '#008800' }, { x: 3, y: 8, c: '#008800' }, { x: 6, y: 8, c: '#008800' }, { x: 7, y: 8, c: '#008800' },
          ]
        },
      ];
      
      const currentFrame = frogFrames[frame % frogFrames.length];
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" className="overflow-visible">
          {currentFrame.pixels.map((p, i) => (
            <rect
              key={i}
              x={p.x * pixelSize}
              y={p.y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={p.c}
            />
          ))}
        </svg>
      );
    }
    
    if (type === 'rabbit') {
      // White rabbit with pink ears
      const rabbitFrames = [
        // Frame 0: Standing
        {
          pixels: [
            { x: 3, y: 0, c: '#ffffff' }, { x: 4, y: 0, c: '#ffffff' },
            { x: 3, y: 1, c: '#ffffff' }, { x: 4, y: 1, c: '#ffaaaa' },
            { x: 3, y: 2, c: '#ffffff' }, { x: 4, y: 2, c: '#ffaaaa' },
            { x: 3, y: 3, c: '#ffffff' }, { x: 4, y: 3, c: '#ffffff' },
            { x: 3, y: 4, c: '#ffffff' }, { x: 4, y: 4, c: '#ffffff' },
            { x: 2, y: 5, c: '#ffffff' }, { x: 3, y: 5, c: '#ffffff' }, { x: 4, y: 5, c: '#ffffff' }, { x: 5, y: 5, c: '#ffffff' },
            { x: 2, y: 6, c: '#ffffff' }, { x: 3, y: 6, c: '#000000' }, { x: 4, y: 6, c: '#ffffff' }, { x: 5, y: 6, c: '#000000' },
            { x: 2, y: 7, c: '#ffffff' }, { x: 3, y: 7, c: '#ffffff' }, { x: 4, y: 7, c: '#ffffff' }, { x: 5, y: 7, c: '#ffffff' },
            { x: 1, y: 8, c: '#ffffff' }, { x: 2, y: 8, c: '#ffffff' }, { x: 3, y: 8, c: '#ffffff' }, { x: 4, y: 8, c: '#ffffff' }, { x: 5, y: 8, c: '#ffffff' }, { x: 6, y: 8, c: '#ffffff' },
            { x: 1, y: 9, c: '#ffffff' }, { x: 2, y: 9, c: '#ffffff' }, { x: 3, y: 9, c: '#ffffff' }, { x: 4, y: 9, c: '#ffffff' }, { x: 5, y: 9, c: '#ffffff' }, { x: 6, y: 9, c: '#ffffff' },
            { x: 0, y: 10, c: '#ffffff' }, { x: 1, y: 10, c: '#ffffff' }, { x: 2, y: 10, c: '#ffffff' }, { x: 3, y: 10, c: '#ffffff' }, { x: 4, y: 10, c: '#ffffff' }, { x: 5, y: 10, c: '#ffffff' }, { x: 6, y: 10, c: '#ffffff' }, { x: 7, y: 10, c: '#ffffff' },
            { x: 0, y: 11, c: '#ffffff' }, { x: 1, y: 11, c: '#ffffff' }, { x: 2, y: 11, c: '#ffffff' }, { x: 3, y: 11, c: '#ffffff' }, { x: 4, y: 11, c: '#ffffff' }, { x: 5, y: 11, c: '#ffffff' }, { x: 6, y: 11, c: '#ffffff' }, { x: 7, y: 11, c: '#ffffff' },
            { x: 1, y: 12, c: '#ffffff' }, { x: 2, y: 12, c: '#ffffff' }, { x: 5, y: 12, c: '#ffffff' }, { x: 6, y: 12, c: '#ffffff' },
            { x: 0, y: 13, c: '#ffffff' }, { x: 1, y: 13, c: '#ffffff' }, { x: 2, y: 13, c: '#ffffff' }, { x: 5, y: 13, c: '#ffffff' }, { x: 6, y: 13, c: '#ffffff' }, { x: 7, y: 13, c: '#ffffff' },
          ]
        },
        // Frame 1: Running
        {
          pixels: [
            { x: 3, y: 0, c: '#ffffff' }, { x: 4, y: 0, c: '#ffffff' },
            { x: 3, y: 1, c: '#ffffff' }, { x: 4, y: 1, c: '#ffaaaa' },
            { x: 3, y: 2, c: '#ffffff' }, { x: 4, y: 2, c: '#ffaaaa' },
            { x: 3, y: 3, c: '#ffffff' }, { x: 4, y: 3, c: '#ffffff' },
            { x: 3, y: 4, c: '#ffffff' }, { x: 4, y: 4, c: '#ffffff' },
            { x: 2, y: 5, c: '#ffffff' }, { x: 3, y: 5, c: '#ffffff' }, { x: 4, y: 5, c: '#ffffff' }, { x: 5, y: 5, c: '#ffffff' },
            { x: 2, y: 6, c: '#ffffff' }, { x: 3, y: 6, c: '#000000' }, { x: 4, y: 6, c: '#ffffff' }, { x: 5, y: 6, c: '#000000' },
            { x: 2, y: 7, c: '#ffffff' }, { x: 3, y: 7, c: '#ffffff' }, { x: 4, y: 7, c: '#ffffff' }, { x: 5, y: 7, c: '#ffffff' },
            { x: 1, y: 8, c: '#ffffff' }, { x: 2, y: 8, c: '#ffffff' }, { x: 3, y: 8, c: '#ffffff' }, { x: 4, y: 8, c: '#ffffff' }, { x: 5, y: 8, c: '#ffffff' }, { x: 6, y: 8, c: '#ffffff' },
            { x: 1, y: 9, c: '#ffffff' }, { x: 2, y: 9, c: '#ffffff' }, { x: 3, y: 9, c: '#ffffff' }, { x: 4, y: 9, c: '#ffffff' }, { x: 5, y: 9, c: '#ffffff' }, { x: 6, y: 9, c: '#ffffff' },
            { x: 0, y: 10, c: '#ffffff' }, { x: 1, y: 10, c: '#ffffff' }, { x: 2, y: 10, c: '#ffffff' }, { x: 3, y: 10, c: '#ffffff' }, { x: 4, y: 10, c: '#ffffff' }, { x: 5, y: 10, c: '#ffffff' }, { x: 6, y: 10, c: '#ffffff' }, { x: 7, y: 10, c: '#ffffff' },
            { x: 1, y: 11, c: '#ffffff' }, { x: 2, y: 11, c: '#ffffff' }, { x: 3, y: 11, c: '#ffffff' }, { x: 4, y: 11, c: '#ffffff' }, { x: 5, y: 11, c: '#ffffff' }, { x: 6, y: 11, c: '#ffffff' },
            { x: 2, y: 12, c: '#ffffff' }, { x: 3, y: 12, c: '#ffffff' },
            { x: 5, y: 13, c: '#ffffff' }, { x: 6, y: 13, c: '#ffffff' }, { x: 7, y: 13, c: '#ffffff' },
          ]
        },
      ];
      
      const currentFrame = rabbitFrames[frame % rabbitFrames.length];
      return (
        <svg width="36" height="56" viewBox="0 0 36 56" className="overflow-visible">
          {currentFrame.pixels.map((p, i) => (
            <rect
              key={i}
              x={p.x * pixelSize}
              y={p.y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={p.c}
            />
          ))}
        </svg>
      );
    }
    
    return null;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get track width for movement
      const trackWidth = characterRef.current?.parentElement?.offsetWidth || 800;
      const moveDistance = Math.min(trackWidth - 120, 600);
      
      // Continuous horizontal movement - more visible
      const moveAnimation = gsap.to(characterRef.current, {
        x: moveDistance,
        duration: type === 'rabbit' ? 3 : type === 'frog' ? 5 : 8,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        onRepeat: () => {
          setDirection((prev) => -prev);
        },
      });

      // Frame animation
      const frameInterval = setInterval(() => {
        setFrame((prev) => prev + 1);
      }, type === 'rabbit' ? 120 : type === 'frog' ? 250 : 180);

      // Jump animation for frog
      if (type === 'frog') {
        gsap.to(characterRef.current, {
          y: -25,
          duration: 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'power2.out',
          repeatDelay: 0.6,
        });
      }

      return () => {
        clearInterval(frameInterval);
        moveAnimation.kill();
      };
    }, characterRef);

    return () => ctx.revert();
  }, [type]);

  const handleClick = () => {
    playCoinSound();
    gsap.to(characterRef.current, {
      scale: 1.3,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'steps(2)',
      onComplete: () => {
        window.open(url, '_blank');
      },
    });
  };

  const handleMouseEnter = () => {
    initAudioContext();
    playJumpSound();
    setIsHovered(true);
    gsap.to(characterRef.current, {
      y: type === 'frog' ? -45 : -20,
      duration: 0.1,
      ease: 'steps(2)',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(characterRef.current, {
      y: type === 'frog' ? -25 : 0,
      duration: 0.1,
      ease: 'steps(2)',
    });
  };

  return (
    <div className="relative w-full h-28 sm:h-36 track-line overflow-hidden">
      {/* Ground line with pixelated style */}
      <div className="absolute bottom-4 left-0 right-0 h-1">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-40" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(128,128,128,0.5) 8px, rgba(128,128,128,0.5) 16px)',
            height: '2px'
          }} 
        />
      </div>
      
      {/* Character container */}
      <div
        ref={characterRef}
        className="absolute bottom-6 left-8 cursor-pointer transition-transform z-10"
        style={{
          transform: `scaleX(${direction})`,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pixel sprite SVG */}
        <div className="relative">
          {renderPixelArt()}
        </div>

        {/* Hover glow effect */}
        {isHovered && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,230,109,0.4) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        )}
      </div>

      {/* Label */}
      <div 
        className="absolute bottom-2 right-4 text-xs sm:text-sm font-terminal text-gray-400 opacity-60 tracking-wider"
      >
        {label}
      </div>

      {/* Footprint particles */}
      <div className="absolute bottom-4 left-0 right-0 h-8 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1.5 h-1.5 bg-gray-500/30"
            style={{
              left: `${15 + i * 12}%`,
              animation: `fadeOut ${2 + i * 0.3}s ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.3); }
        }
      `}</style>
    </div>
  );
};

export default PixelCharacter;
