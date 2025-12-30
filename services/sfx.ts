
/**
 * Simple Sound Effects Engine using Web Audio API
 * Uses the shared AudioContext from AudioService to prevent hardware resource limits.
 */
import { audioService } from './audio';

// Helper: Create an oscillator with envelope
const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.1, delay: number = 0) => {
  // Use the shared context!
  const ctx = audioService.getAudioContext();
  
  if (!ctx) return; 

  // Ensure context is running (vital for iOS)
  if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
  }

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch (e) {
      // Ignore audio errors to prevent app crash
      // console.warn("SFX Error:", e);
  }
};

export const SFX = {
  // 1. Soft Tap (Navigation/Selection)
  playClick: () => {
    playTone(600, 'sine', 0.1, 0.05);
  },

  // 2. Pop (Word Interact)
  playPop: () => {
    playTone(400, 'triangle', 0.1, 0.05);
    playTone(600, 'sine', 0.1, 0.03, 0.02); // slight delay harmony
  },

  // 3. Success (Correct Answer) - Major Chord Arpeggio
  playSuccess: () => {
    const vol = 0.1;
    playTone(523.25, 'sine', 0.4, vol, 0);    // C5
    playTone(659.25, 'sine', 0.4, vol, 0.1);  // E5
    playTone(783.99, 'sine', 0.6, vol, 0.2);  // G5
    playTone(1046.50, 'sine', 0.8, vol, 0.3); // C6
  },

  // 4. Error (Wrong Answer) - Low Dissonance
  playError: () => {
    playTone(150, 'sawtooth', 0.3, 0.08);
    playTone(140, 'sawtooth', 0.3, 0.08);
  },

  // 5. Complete (Lesson Finish) - Fanfare
  playFanfare: () => {
    const vol = 0.1;
    playTone(523.25, 'triangle', 0.3, vol, 0);
    playTone(523.25, 'triangle', 0.3, vol, 0.2);
    playTone(783.99, 'triangle', 0.6, vol, 0.4);
  },
  
  // 6. Pluck (Interactive Element)
  playPluck: () => {
      playTone(300 + Math.random() * 200, 'sine', 0.3, 0.05);
  }
};
