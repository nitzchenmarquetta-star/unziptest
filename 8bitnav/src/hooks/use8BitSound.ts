import { useCallback, useRef } from 'react';

// 8-bit Sound Effects using Web Audio API
export const use8BitSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context on first user interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Jump sound effect (ascending arpeggio)
  const playJumpSound = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    const notes = [220, 330, 440]; // A3, E4, A4
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
      }, index * 30);
    });
  }, [initAudioContext]);

  // Coin/pickup sound effect (high pitch ding)
  const playCoinSound = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    // Two-tone coin sound like Super Mario
    const playNote = (freq: number, startTime: number) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      gainNode.gain.setValueAtTime(0.25, ctx.currentTime + startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + 0.15);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime + startTime);
      oscillator.stop(ctx.currentTime + startTime + 0.15);
    };

    playNote(987, 0);     // B5
    playNote(1318, 0.08); // E6
  }, [initAudioContext]);

  // Select/confirm sound effect
  const playSelectSound = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, [initAudioContext]);

  // Power-up sound effect
  const playPowerUpSound = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    const notes = [440, 554, 659, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
      }, index * 60);
    });
  }, [initAudioContext]);

  // Blip sound for small interactions
  const playBlipSound = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }, [initAudioContext]);

  // Startup sound ( nostalgic boot sound )
  const playStartupSound = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    const notes = [220, 294, 370, 440]; // A3, D4, F#4, A4
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
      }, index * 80);
    });
  }, [initAudioContext]);

  return {
    playJumpSound,
    playCoinSound,
    playSelectSound,
    playPowerUpSound,
    playBlipSound,
    playStartupSound,
    initAudioContext,
  };
};

export default use8BitSound;
