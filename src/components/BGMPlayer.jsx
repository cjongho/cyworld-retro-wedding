// src/components/BGMPlayer.jsx
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, ListMusic } from "lucide-react";

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(30); // scale 0-100
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioCtxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const activeNodesRef = useRef([]);

  const tracks = [
    { title: "Y (Please Tell Me Why)", artist: "프리스타일", desc: "싸이월드 시절 가슴 울리던 최고의 Y2K 감성 발라드 (오르골 편곡)" },
    { title: "Sweet Sweet Music", artist: "FreeTEMPO", desc: "미니홈피 대표 감성 일렉트로니카 (크리스탈 벨 편곡)" },
    { title: "Romantic Wedding March", artist: "Orgel", desc: "쭁♥꾱의 결혼식을 축하하는 성스럽고 맑은 오르골 웨딩 마치" }
  ];

  // Premium soft music box note sequencers (Y2K Cyworld Melodies)
  const melodies = [
    // Track 1: Freestyle - Y (Nostalgic Intro Arpeggio)
    [
      { note: 587.33, dur: 0.4, time: 0.0 }, // D5
      { note: 698.46, dur: 0.4, time: 0.4 }, // F5
      { note: 880.00, dur: 0.8, time: 0.8 }, // A5
      { note: 783.99, dur: 0.4, time: 1.6 }, // G5
      { note: 659.25, dur: 0.4, time: 2.0 }, // E5
      { note: 523.25, dur: 0.8, time: 2.4 }, // C5
      { note: 587.33, dur: 0.4, time: 3.2 }, // D5
      { note: 698.46, dur: 0.4, time: 3.6 }, // F5
      { note: 783.99, dur: 0.8, time: 4.0 }, // G5
      { note: 698.46, dur: 0.8, time: 4.8 }, // F5
      { note: 587.33, dur: 1.6, time: 5.6 }, // D5
      // Beautiful harmony line overlayed
      { note: 349.23, dur: 0.8, time: 0.8 }, // F4 (bass)
      { note: 261.63, dur: 0.8, time: 2.4 }, // C4 (bass)
      { note: 293.66, dur: 1.6, time: 4.0 }  // D4 (bass)
    ],
    // Track 2: FreeTEMPO - Sweet Sweet Music (Sparkling bell theme)
    [
      { note: 523.25, dur: 0.2, time: 0.0 }, // C5
      { note: 587.33, dur: 0.2, time: 0.2 }, // D5
      { note: 659.25, dur: 0.2, time: 0.4 }, // E5
      { note: 783.99, dur: 0.2, time: 0.6 }, // G5
      { note: 987.77, dur: 0.2, time: 0.8 }, // B5
      { note: 1046.50, dur: 0.4, time: 1.0 }, // C6
      { note: 783.99, dur: 0.2, time: 1.4 }, // G5
      { note: 880.00, dur: 0.4, time: 1.6 }, // A5
      { note: 783.99, dur: 0.4, time: 2.0 }, // G5
      { note: 659.25, dur: 0.2, time: 2.4 }, // E5
      { note: 523.25, dur: 0.2, time: 2.6 }, // C5
      { note: 587.33, dur: 0.8, time: 2.8 }, // D5
      // Sweet backing chord
      { note: 329.63, dur: 0.6, time: 0.4 }, // E4
      { note: 349.23, dur: 0.6, time: 1.6 }, // F4
      { note: 392.00, dur: 0.8, time: 2.8 }  // G4
    ],
    // Track 3: Romantic Wedding March (Soft Lyrical Music Box)
    [
      { note: 523.25, dur: 0.5, time: 0.0 }, // C5
      { note: 698.46, dur: 0.5, time: 0.5 }, // F5
      { note: 698.46, dur: 0.25, time: 1.0 }, // F5
      { note: 698.46, dur: 0.75, time: 1.25 }, // F5
      { note: 523.25, dur: 0.5, time: 2.0 }, // C5
      { note: 783.99, dur: 0.5, time: 2.5 }, // G5
      { note: 698.46, dur: 0.25, time: 3.0 }, // F5
      { note: 622.25, dur: 0.75, time: 3.25 }, // Eb5
      { note: 698.46, dur: 0.5, time: 4.0 }, // F5
      { note: 880.00, dur: 0.5, time: 4.5 }, // A5
      { note: 932.33, dur: 0.5, time: 5.0 }, // Bb5
      { note: 698.46, dur: 0.5, time: 5.5 }, // F5
      { note: 783.99, dur: 1.5, time: 6.0 }, // G5
      // Bass chords for warmth
      { note: 349.23, dur: 1.5, time: 0.5 }, // F4
      { note: 311.13, dur: 1.5, time: 2.5 }, // Eb4
      { note: 349.23, dur: 2.0, time: 4.5 }  // F4
    ]
  ];

  // Stop synthesizer synthesis notes
  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    activeNodesRef.current.forEach((node) => {
      try { node.stop(); } catch(e) {}
    });
    activeNodesRef.current = [];
  };

  // Play Sparkling Music Box Melody loop
  const playSynth = () => {
    stopSynth();

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const melody = melodies[currentTrackIndex];
    // Calculate total length of melody in seconds with reverb margin
    const melodyLength = Math.max(...melody.map((note) => note.time + note.dur)) + 1.2;

    const playSequence = () => {
      const startTime = ctx.currentTime;
      
      // 1. Create a delay node to simulate music-box reflection and echoes (deep resonance)
      const delayNode = ctx.createDelay();
      const feedbackNode = ctx.createGain();
      const delayGainNode = ctx.createGain();
      
      delayNode.delayTime.setValueAtTime(0.35, startTime); // 350ms echo interval
      feedbackNode.gain.setValueAtTime(0.40, startTime);   // 40% feedback decay
      delayGainNode.gain.setValueAtTime(0.28, startTime);  // 28% wet ratio
      
      // Connect delay feedback loop
      delayNode.connect(feedbackNode);
      feedbackNode.connect(delayNode);
      delayNode.connect(delayGainNode);
      delayGainNode.connect(ctx.destination);

      melody.forEach((item) => {
        // High fidelity music box uses dual oscillators:
        // - Primary sine wave for the fundamental warm bell tone
        // - Secondary high frequency sine wave for the bright metallic pluck (Overtone)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Connect oscillators
        osc1.connect(noteGain);
        osc2.connect(noteGain);

        // Dry route to output and wet route to echo chamber
        noteGain.connect(ctx.destination);
        noteGain.connect(delayNode);

        // Primary fundamental bell frequency
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(item.note, startTime + item.time);
        
        // Shiny metal overtone (1 octave higher)
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(item.note * 2, startTime + item.time);

        // Custom volume envelopes for a realistic physical chime pluck (Instant attack, slow decay)
        const baseVolume = (volume / 100) * 0.14; 
        
        // Trigger instant attack
        noteGain.gain.setValueAtTime(0, startTime + item.time);
        noteGain.gain.linearRampToValueAtTime(baseVolume, startTime + item.time + 0.006);
        
        // Decrescendo/Decay to a warm finish
        noteGain.gain.setValueAtTime(baseVolume, startTime + item.time + 0.015);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + item.time + item.dur);

        // Start/Stop oscillators
        osc1.start(startTime + item.time);
        osc1.stop(startTime + item.time + item.dur);
        osc2.start(startTime + item.time);
        osc2.stop(startTime + item.time + item.dur);

        activeNodesRef.current.push(osc1, osc2);
      });
    };

    // Trigger first play immediately
    playSequence();

    // Loop interval
    synthTimerRef.current = setInterval(() => {
      playSequence();
    }, melodyLength * 1000);
  };

  // Trigger synth play/pause when state changes
  useEffect(() => {
    if (isPlaying) {
      playSynth();
    } else {
      stopSynth();
    }
    return () => stopSynth();
  }, [isPlaying, currentTrackIndex, volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (idx) => {
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      position: "relative"
    }}>
      {/* MP3 Player Main box */}
      <div style={{
        backgroundColor: "#2e3a47",
        border: "1.5px solid #1a222a",
        borderRadius: "4px",
        height: "22px",
        padding: "0 6px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#00e5ff",
        fontSize: "8px",
        width: "150px",
        overflow: "hidden"
      }}>
        {/* Dynamic scrolling text */}
        <div style={{
          width: "90px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative"
        }}>
          <div style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "marquee 12s linear infinite"
          }}>
            {isPlaying ? "▶" : "■"} [BGM] {tracks[currentTrackIndex].artist} - {tracks[currentTrackIndex].title} ♬
          </div>
        </div>

        {/* Volume controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <Volume2 size={8} color="#00e5ff" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            style={{
              width: "25px",
              height: "2px",
              cursor: "pointer",
              accentColor: "#00e5ff"
            }}
          />
        </div>
      </div>

      {/* Button Controls */}
      <div style={{ display: "flex", gap: "2px" }}>
        <button
          onClick={handlePlayPause}
          style={{
            backgroundColor: "#dfcdbd",
            border: "1px solid #7c5d41",
            borderRadius: "3px",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7c5d41"
          }}
        >
          {isPlaying ? <Pause size={9} fill="#7c5d41" /> : <Play size={9} fill="#7c5d41" />}
        </button>

        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          style={{
            backgroundColor: "#dfcdbd",
            border: "1px solid #7c5d41",
            borderRadius: "3px",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7c5d41"
          }}
        >
          <ListMusic size={10} />
        </button>
      </div>

      {/* CSS marquee style injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
      `}</style>

      {/* BGM Playlist Dropdown Box */}
      {showPlaylist && (
        <div style={{
          position: "absolute",
          top: "24px",
          right: "0",
          backgroundColor: "#fcfcfc",
          border: "2px solid #7c5d41",
          borderRadius: "6px",
          width: "180px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          padding: "6px",
          zIndex: 100
        }}>
          <div style={{ fontSize: "9px", fontWeight: "bold", borderBottom: "1px solid #eee", paddingBottom: "4px", color: "var(--cy-orange)", marginBottom: "4px" }}>
            💿 미니홈피 BGM 선택
          </div>
          {tracks.map((track, idx) => (
            <div
              key={idx}
              onClick={() => handleTrackChange(idx)}
              style={{
                fontSize: "8px",
                padding: "4px",
                borderRadius: "3px",
                cursor: "pointer",
                backgroundColor: currentTrackIndex === idx ? "var(--cy-orange-light)" : "transparent",
                color: currentTrackIndex === idx ? "var(--cy-orange)" : "#333",
                borderBottom: "1px dotted #f1f1f1"
              }}
            >
              <strong>{idx+1}. {track.title}</strong>
              <div style={{ color: "#777", fontSize: "7px", marginTop: "1px" }}>{track.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
