// Script to synthesize a serene, premium instrumental wedding audio loop (WAV format)
const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const durationSeconds = 32; // 32 seconds loop
const totalSamples = sampleRate * durationSeconds;
const numChannels = 2;
const bytesPerSample = 2; // 16-bit PCM

const buffer = Buffer.alloc(44 + totalSamples * numChannels * bytesPerSample);

// Write WAV header
function writeWavHeader(buf, totalSamples) {
  const dataSize = totalSamples * numChannels * bytesPerSample;
  const fileSize = 36 + dataSize;

  buf.write('RIFF', 0);
  buf.writeUInt32LE(fileSize, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buf.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buf.writeUInt16LE(numChannels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // ByteRate
  buf.writeUInt16LE(numChannels * bytesPerSample, 32); // BlockAlign
  buf.writeUInt16LE(16, 34); // BitsPerSample
  buf.write('data', 36);
  buf.writeUInt32LE(dataSize, 40);
}

writeWavHeader(buffer, totalSamples);

// Music composition:
// Tempo = 60 bpm => 1 beat = 1 second.
// 8 measures of 4 beats each = 32 beats = 32 seconds.
// Chords: Dmaj -> Gmaj7 -> Bm7 -> Asus4 -> Dmaj -> F#m7 -> Gmaj9 -> Asus4-A

const chordNotes = [
  // Measure 1: D major (D3, A3, D4, F#4, A4)
  [146.83, 220.00, 293.66, 369.99, 440.00],
  // Measure 2: G major 7 (G2, G3, B3, D4, F#4)
  [98.00, 196.00, 246.94, 293.66, 369.99],
  // Measure 3: B minor 7 (B2, F#3, B3, D4, F#4)
  [123.47, 185.00, 246.94, 293.66, 369.99],
  // Measure 4: A sus4 to A (A2, E3, A3, D4 / C#4, E4)
  [110.00, 164.81, 220.00, 277.18, 329.63],
  // Measure 5: D major / F# (F#2, D3, A3, D4, F#4)
  [92.50, 146.83, 220.00, 293.66, 369.99],
  // Measure 6: G add9 (G2, D3, G3, A3, B3, D4)
  [98.00, 146.83, 196.00, 220.00, 293.66],
  // Measure 7: E minor 7 (E2, B2, E3, G3, B3, D4)
  [82.41, 123.47, 164.81, 196.00, 293.66],
  // Measure 8: A major with gentle resolution
  [110.00, 164.81, 220.00, 277.18, 440.00]
];

// Melodic arpeggio events: [timeInSeconds, freq, pan, duration, gain]
const notes = [];

// Populate lush harp & celesta arpeggios
for (let m = 0; m < 8; m++) {
  const mTime = m * 4;
  const chord = chordNotes[m];

  // Gentle low root bass pad
  notes.push({ t: mTime, f: chord[0], pan: 0.5, dur: 4.5, gain: 0.28, type: 'pad' });
  notes.push({ t: mTime, f: chord[1], pan: 0.45, dur: 4.5, gain: 0.22, type: 'pad' });

  // Harp / Bell arpeggio pattern across 4 beats
  const pattern = [
    { beat: 0.0, idx: 1, pan: 0.35, gain: 0.25 },
    { beat: 0.5, idx: 2, pan: 0.65, gain: 0.23 },
    { beat: 1.0, idx: 3, pan: 0.3, gain: 0.27 },
    { beat: 1.5, idx: 4, pan: 0.7, gain: 0.28 },
    { beat: 2.0, idx: 2, pan: 0.4, gain: 0.22 },
    { beat: 2.5, idx: 3, pan: 0.6, gain: 0.24 },
    { beat: 3.0, idx: 4, pan: 0.75, gain: 0.26 },
    { beat: 3.5, idx: 3, pan: 0.35, gain: 0.22 }
  ];

  pattern.forEach(p => {
    const freq = chord[p.idx % chord.length];
    notes.push({
      t: mTime + p.beat,
      f: freq,
      pan: p.pan,
      dur: 3.2,
      gain: p.gain,
      type: 'harp'
    });
  });

  // Soft high bell chime melody notes
  if (m === 0) {
    notes.push({ t: mTime + 1.0, f: 587.33, pan: 0.6, dur: 3.0, gain: 0.18, type: 'chime' }); // D5
    notes.push({ t: mTime + 2.5, f: 739.99, pan: 0.4, dur: 3.0, gain: 0.16, type: 'chime' }); // F#5
  } else if (m === 1) {
    notes.push({ t: mTime + 0.5, f: 880.00, pan: 0.7, dur: 3.5, gain: 0.18, type: 'chime' }); // A5
    notes.push({ t: mTime + 2.0, f: 739.99, pan: 0.3, dur: 3.0, gain: 0.17, type: 'chime' }); // F#5
  } else if (m === 2) {
    notes.push({ t: mTime + 1.0, f: 587.33, pan: 0.5, dur: 3.0, gain: 0.18, type: 'chime' }); // D5
    notes.push({ t: mTime + 2.5, f: 493.88, pan: 0.6, dur: 3.0, gain: 0.16, type: 'chime' }); // B4
  } else if (m === 3) {
    notes.push({ t: mTime + 1.0, f: 440.00, pan: 0.4, dur: 3.0, gain: 0.18, type: 'chime' }); // A4
    notes.push({ t: mTime + 2.0, f: 554.37, pan: 0.6, dur: 3.0, gain: 0.17, type: 'chime' }); // C#5
  } else if (m === 4) {
    notes.push({ t: mTime + 0.5, f: 587.33, pan: 0.5, dur: 3.0, gain: 0.18, type: 'chime' });
    notes.push({ t: mTime + 2.0, f: 739.99, pan: 0.7, dur: 3.0, gain: 0.19, type: 'chime' });
  } else if (m === 5) {
    notes.push({ t: mTime + 1.0, f: 880.00, pan: 0.4, dur: 3.5, gain: 0.20, type: 'chime' });
    notes.push({ t: mTime + 2.5, f: 987.77, pan: 0.6, dur: 3.0, gain: 0.17, type: 'chime' }); // B5
  } else if (m === 6) {
    notes.push({ t: mTime + 1.0, f: 739.99, pan: 0.3, dur: 3.0, gain: 0.18, type: 'chime' });
    notes.push({ t: mTime + 2.5, f: 587.33, pan: 0.7, dur: 3.0, gain: 0.16, type: 'chime' });
  } else if (m === 7) {
    notes.push({ t: mTime + 1.0, f: 554.37, pan: 0.5, dur: 3.5, gain: 0.18, type: 'chime' });
    notes.push({ t: mTime + 2.5, f: 440.00, pan: 0.5, dur: 4.0, gain: 0.20, type: 'chime' });
  }
}

// Float buffers for mixing
const leftChannel = new Float32Array(totalSamples);
const rightChannel = new Float32Array(totalSamples);

// Simple delay/reverb buffer
const delaySamples = Math.floor(sampleRate * 0.32);
const delayFeedback = 0.38;
const delayL = new Float32Array(delaySamples);
const delayR = new Float32Array(delaySamples);
let dIdx = 0;

// Render notes
notes.forEach(note => {
  const startSample = Math.floor(note.t * sampleRate);
  const durSamples = Math.floor(note.dur * sampleRate);
  const endSample = Math.min(totalSamples, startSample + durSamples);

  for (let s = startSample; s < endSample; s++) {
    const dt = (s - startSample) / sampleRate;

    // Envelope
    let env = 0;
    if (note.type === 'pad') {
      // Warm slow swell and gentle release
      const attack = 0.8;
      const decay = note.dur - attack;
      if (dt < attack) env = dt / attack;
      else env = Math.max(0, 1 - (dt - attack) / decay);
    } else if (note.type === 'harp') {
      // Plucked string acoustic exponential decay
      const attack = 0.008;
      if (dt < attack) env = dt / attack;
      else env = Math.exp(-2.2 * (dt - attack));
    } else { // chime
      // Bell shimmer with long ring
      const attack = 0.004;
      if (dt < attack) env = dt / attack;
      else env = Math.exp(-1.4 * (dt - attack));
    }

    // Rich harmonic synthesis
    const phase = 2 * Math.PI * note.f * dt;
    let wave = 0;
    if (note.type === 'pad') {
      // Warm filtered saw/sine
      wave = Math.sin(phase) * 0.7 + Math.sin(phase * 2) * 0.2 + Math.sin(phase * 3) * 0.1;
    } else if (note.type === 'harp') {
      // Plucked strings with bright transient and warm body
      wave = Math.sin(phase) * 0.65
           + Math.sin(phase * 2) * 0.22
           + Math.sin(phase * 3) * 0.10
           + Math.sin(phase * 4) * 0.03;
    } else {
      // Celesta / bell overtones
      wave = Math.sin(phase) * 0.55
           + Math.sin(phase * 2.76) * 0.25 // inharmonic bell chime
           + Math.sin(phase * 4.0) * 0.15
           + Math.sin(phase * 5.4) * 0.05;
    }

    const sampleVal = wave * env * note.gain;
    const lGain = Math.cos(note.pan * Math.PI / 2);
    const rGain = Math.sin(note.pan * Math.PI / 2);

    leftChannel[s] += sampleVal * lGain;
    rightChannel[s] += sampleVal * rGain;
  }
});

// Apply soothing stereo reverb delay and master soft limiter
let maxAmp = 0;
for (let s = 0; s < totalSamples; s++) {
  const inL = leftChannel[s];
  const inR = rightChannel[s];

  const echoL = delayL[dIdx];
  const echoR = delayR[dIdx];

  delayL[dIdx] = inL + echoR * delayFeedback;
  delayR[dIdx] = inR + echoL * delayFeedback;

  dIdx = (dIdx + 1) % delaySamples;

  leftChannel[s] = inL + echoL * 0.35;
  rightChannel[s] = inR + echoR * 0.35;

  const ampL = Math.abs(leftChannel[s]);
  const ampR = Math.abs(rightChannel[s]);
  if (ampL > maxAmp) maxAmp = ampL;
  if (ampR > maxAmp) maxAmp = ampR;
}

// Normalize gracefully to 0.85
const norm = maxAmp > 0 ? (0.85 / maxAmp) : 1.0;

// Convert to 16-bit PCM in buffer
let byteOffset = 44;
for (let s = 0; s < totalSamples; s++) {
  // Soft fade in first 0.5s and fade out last 1.0s for flawless seamless looping
  let edgeFade = 1.0;
  const t = s / sampleRate;
  if (t < 0.5) edgeFade = t / 0.5;
  else if (t > durationSeconds - 1.0) edgeFade = (durationSeconds - t) / 1.0;

  const l = Math.max(-1, Math.min(1, leftChannel[s] * norm * edgeFade));
  const r = Math.max(-1, Math.min(1, rightChannel[s] * norm * edgeFade));

  const s16L = Math.floor(l < 0 ? l * 32768 : l * 32767);
  const s16R = Math.floor(r < 0 ? r * 32768 : r * 32767);

  buffer.writeInt16LE(s16L, byteOffset);
  buffer.writeInt16LE(s16R, byteOffset + 2);
  byteOffset += 4;
}

const outPath1 = path.join(__dirname, '..', 'public', 'audio', 'wedding-song.mp3');
const outPath2 = path.join(__dirname, '..', 'public', 'audio', 'wedding-song.wav');
fs.writeFileSync(outPath1, buffer);
fs.writeFileSync(outPath2, buffer);

console.log('Successfully created wedding audio files at:');
console.log(outPath1);
console.log(outPath2);
