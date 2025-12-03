// Sound effect utilities

let audioContext = null;
let boatHornBuffer = null;
let waterClickBuffer = null;

// Initialize audio context
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Generate boat horn sound synthetically
const generateBoatHorn = () => {
  const context = getAudioContext();
  const duration = 0.5;
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    // Boat horn: low frequency with harmonics
    const fundamental = Math.sin(2 * Math.PI * 150 * t);
    const harmonic2 = Math.sin(2 * Math.PI * 300 * t) * 0.5;
    const harmonic3 = Math.sin(2 * Math.PI * 450 * t) * 0.25;
    
    // Envelope: quick attack, sustained, quick release
    let envelope = 1;
    if (t < 0.05) {
      envelope = t / 0.05;
    } else if (t > duration - 0.1) {
      envelope = (duration - t) / 0.1;
    }
    
    data[i] = (fundamental + harmonic2 + harmonic3) * envelope * 0.15;
  }
  
  return buffer;
};

// Generate water click sound synthetically
const generateWaterClick = () => {
  const context = getAudioContext();
  const duration = 0.15;
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    // Water click: high frequency with quick decay
    const frequency = 2000 - (t * 1500);
    const signal = Math.sin(2 * Math.PI * frequency * t);
    
    // Sharp envelope for click effect
    const envelope = Math.exp(-t * 30);
    
    // Add some noise for water-like quality
    const noise = (Math.random() - 0.5) * 0.3 * envelope;
    
    data[i] = (signal * envelope * 0.2) + noise;
  }
  
  return buffer;
};

// Initialize sounds
const initSounds = () => {
  try {
    boatHornBuffer = generateBoatHorn();
    waterClickBuffer = generateWaterClick();
  } catch (error) {
    console.warn('Could not initialize sounds:', error);
  }
};

// Play boat horn sound
export const playBoatHorn = () => {
  try {
    const context = getAudioContext();
    
    if (!boatHornBuffer) {
      initSounds();
    }
    
    const source = context.createBufferSource();
    source.buffer = boatHornBuffer;
    
    const gainNode = context.createGain();
    gainNode.gain.value = 0.3; // Volume control
    
    source.connect(gainNode);
    gainNode.connect(context.destination);
    
    source.start(0);
  } catch (error) {
    console.warn('Could not play boat horn:', error);
  }
};

// Play water click sound
export const playWaterClick = () => {
  try {
    const context = getAudioContext();
    
    if (!waterClickBuffer) {
      initSounds();
    }
    
    const source = context.createBufferSource();
    source.buffer = waterClickBuffer;
    
    const gainNode = context.createGain();
    gainNode.gain.value = 0.15; // Subtle volume
    
    source.connect(gainNode);
    gainNode.connect(context.destination);
    
    source.start(0);
  } catch (error) {
    console.warn('Could not play water click:', error);
  }
};

// Alternative: Load from audio files (if you want to replace synthetic sounds)
export const loadAudioFiles = async () => {
  try {
    const context = getAudioContext();
    
    // Load boat horn
    const boatHornResponse = await fetch('/assets/sounds/boat_horn.wav');
    const boatHornArrayBuffer = await boatHornResponse.arrayBuffer();
    boatHornBuffer = await context.decodeAudioData(boatHornArrayBuffer);
    
    // Load water click
    const waterClickResponse = await fetch('/assets/sounds/water_click.wav');
    const waterClickArrayBuffer = await waterClickResponse.arrayBuffer();
    waterClickBuffer = await context.decodeAudioData(waterClickArrayBuffer);
  } catch (error) {
    console.warn('Could not load audio files, using synthetic sounds:', error);
    initSounds();
  }
};

// Initialize on module load
initSounds();

