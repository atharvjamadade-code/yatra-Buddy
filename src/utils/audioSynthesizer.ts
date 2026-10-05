// Web Audio API Synthesizer for high-altitude emergency signals and ambient guide accompaniment

let audioCtx: AudioContext | null = null;
let sirenOsc: OscillatorNode | null = null;
let sirenGain: GainNode | null = null;
let sirenInterval: number | null = null;

let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Emergency High-Pitch Distress Siren
export function startEmergencySiren(): boolean {
  try {
    const ctx = getAudioContext();
    stopEmergencySiren();

    sirenOsc = ctx.createOscillator();
    sirenGain = ctx.createGain();

    sirenOsc.type = 'sawtooth';
    sirenOsc.frequency.setValueAtTime(800, ctx.currentTime);
    sirenGain.gain.setValueAtTime(0.3, ctx.currentTime);

    sirenOsc.connect(sirenGain);
    sirenGain.connect(ctx.destination);
    sirenOsc.start();

    let high = true;
    sirenInterval = window.setInterval(() => {
      if (sirenOsc && ctx) {
        const targetFreq = high ? 1200 : 700;
        sirenOsc.frequency.exponentialRampToValueAtTime(targetFreq, ctx.currentTime + 0.3);
        high = !high;
      }
    }, 400);

    return true;
  } catch (e) {
    console.error('Audio synthesizer error:', e);
    return false;
  }
}

export function stopEmergencySiren(): void {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenOsc) {
    try {
      sirenOsc.stop();
      sirenOsc.disconnect();
    } catch {
      // ignore
    }
    sirenOsc = null;
  }
}

// Mountain Whistle Blast (Triple Blast Pattern)
export function playRescueWhistleBlast(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 3 short piercing blasts (2800 Hz)
    [0, 0.4, 0.8].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2850, now + offset);

      gain.gain.setValueAtTime(0, now + offset);
      gain.gain.linearRampToValueAtTime(0.4, now + offset + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + offset + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.28);
    });
  } catch (e) {
    console.error('Whistle error:', e);
  }
}

// Ambient Sacred Drone (432Hz Om / Tanpura harmony)
export function startAmbientMantraDrone(): void {
  try {
    const ctx = getAudioContext();
    stopAmbientMantraDrone();

    ambientOsc1 = ctx.createOscillator();
    ambientOsc2 = ctx.createOscillator();
    ambientGain = ctx.createGain();

    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(136.1, ctx.currentTime); // Cosmic Om frequency (C#)

    ambientOsc2.type = 'sine';
    ambientOsc2.frequency.setValueAtTime(272.2, ctx.currentTime); // First overtone

    ambientGain.gain.setValueAtTime(0.01, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.0);

    ambientOsc1.connect(ambientGain);
    ambientOsc2.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
  } catch (e) {
    console.error('Ambient drone error:', e);
  }
}

export function stopAmbientMantraDrone(): void {
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        ambientOsc1?.stop();
        ambientOsc2?.stop();
        ambientOsc1?.disconnect();
        ambientOsc2?.disconnect();
        ambientGain?.disconnect();
        ambientOsc1 = null;
        ambientOsc2 = null;
        ambientGain = null;
      }, 900);
    } catch {
      // ignore
    }
  }
}

// Offline Text-To-Speech Synthesizer
export function speakTextOffline(text: string, onEnd?: () => void): boolean {
  if (!('speechSynthesis' in window)) {
    return false;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95; // Slightly slower, clear delivery for mountain hikers
  utterance.pitch = 1.0;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
