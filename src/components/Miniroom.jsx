// src/components/Miniroom.jsx
import React, { useState, useEffect } from "react";
import { MinimeSprite } from "./CharacterCreator";

export default function Miniroom({ guestAvatar, onAcornGathered }) {
  const [activeBubble, setActiveBubble] = useState(null); // 'groom', 'bride', 'guest', or null
  const [isTreeShaking, setIsTreeShaking] = useState(false);
  const [acorns, setAcorns] = useState([]); // Array of falling acorns
  const [showPresentModal, setShowPresentModal] = useState(false);

  // Auto-close bubble after a short period
  useEffect(() => {
    if (activeBubble) {
      const timer = setTimeout(() => setActiveBubble(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [activeBubble]);

  const handleAvatarClick = (character) => {
    setActiveBubble(character);
    playSimpleSynth(character === "groom" ? 330 : character === "bride" ? 440 : 554);
  };

  // Shake left tree and drop an acorn!
  const handleTreeClick = () => {
    if (isTreeShaking) return;
    setIsTreeShaking(true);
    playSimpleSynth(150); // rustle sound

    setTimeout(() => {
      setIsTreeShaking(false);
      // Spawn a falling acorn!
      const newAcorn = {
        id: Date.now(),
        left: Math.random() * 20 + 5, // near the left tree (5% to 25%)
      };
      setAcorns((prev) => [...prev, newAcorn]);
    }, 600);
  };

  const handleAcornClick = (id) => {
    setAcorns((prev) => prev.filter((a) => a.id !== id));
    playSimpleSynth(880); // ping sound!
    if (onAcornGathered) {
      onAcornGathered();
    }
  };

  // Click the piano to play a cute chiptune chord!
  const handlePianoClick = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      // Play a lovely major triad in Y2K chiptune synth style (C Major / E Major)
      const freqs = [329.63, 415.30, 493.88, 659.25]; // E Major chord
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);
        
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.6);
      });
    } catch (e) {
      console.log("Piano sound synth error:", e);
    }
  };

  const playSimpleSynth = (freq) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch(e) {}
  };

  // Dialogue lines for Jjong, Kkyong and Guest based on grade
  const getGuestDialogue = () => {
    if (!guestAvatar) return "쭁♥꾱 평생 이쁘게 살아요! 축하합니다! 🎉";
    switch (guestAvatar.grade) {
      case "super_rare":
        return "헉! 0.5% 당첨된 슈퍼레어 천사 미니미 등판! 축하드려요! 👼💖";
      case "unique":
        return "황금빛 유니크 미니미 기운을 모아 두 분의 앞날을 축복합니다! 👑✨";
      case "rare":
        return "락스타 레어 미니미가 두 분의 힙한 결혼을 축하합니다! 🎸⚡";
      default:
        return "쭁♥꾱 평생 이쁘게 살아요! 결혼 진심으로 축하드립니다! 🎉";
    }
  };

  // Define Groom & Bride Avatars specifically for Jjong (Jong-ho) and Kkyong (Hee-gyung)
  const groomAvatar = {
    accessory: "accessory_silkhat",
    animal: "animal_hippo",
    top: "top_wedding",
    bottom: "bottom_jeans",
    shoes: "shoes_boots",
    grade: "common"
  };

  const brideAvatar = {
    accessory: "accessory_veil",
    animal: "animal_cat",
    top: "top_wedding",
    bottom: "bottom_wedding",
    shoes: "shoes_cloud",
    grade: "common"
  };

  return (
    <div className="miniroom-canvas">
      <div className="miniroom-title-bar">
        <span>MINIROOM: 쭁♥꾱의 로맨틱 야외 가든 웨딩 💒</span>
        <span style={{ fontSize: "8px", opacity: 0.9 }}>정원 나무를 흔들어 도토리를 모아보세요! 🐿️</span>
      </div>

      <div className="miniroom-scenery">
        {/* Gradients & Filters for Miniroom Elements */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <linearGradient id="arch_gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fae1cc" />
              <stop offset="100%" stopColor="#e5c3a3" />
            </linearGradient>
            <linearGradient id="cake_cream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fff5f6" />
              <stop offset="100%" stopColor="#f8bbd0" />
            </linearGradient>
            <linearGradient id="piano_body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f7f9fa" />
              <stop offset="100%" stopColor="#e3ebf0" />
            </linearGradient>
            <radialGradient id="balloon_grad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff8a80" />
              <stop offset="60%" stopColor="#e53935" />
              <stop offset="100%" stopColor="#b71c1c" />
            </radialGradient>
            <linearGradient id="leaf_left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a5d6a7" />
              <stop offset="100%" stopColor="#388e3c" />
            </linearGradient>
            <linearGradient id="cherry_blossom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffebee" />
              <stop offset="60%" stopColor="#f8bbd0" />
              <stop offset="100%" stopColor="#f48fb1" />
            </linearGradient>
          </defs>
        </svg>

        {/* --- Floating Red Balloon Invitation --- */}
        <div className="floating-present" onClick={() => { setShowPresentModal(true); playSimpleSynth(660); }}>
          {/* Beautiful 3D Translucent Red Heart Balloon */}
          <svg width="36" height="42" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40 C20 40, 38 26, 38 15 C38 6, 30 1, 20 9 C10 1, 2 6, 2 15 C2 26, 20 40, 20 40 Z" fill="url(#balloon_grad)" stroke="#9c0c0c" strokeWidth="1"/>
            <path d="M20 40 L17 43 H23 L20 40 Z" fill="#b71c1c" stroke="#9c0c0c" strokeWidth="0.8"/>
            {/* Highlight */}
            <path d="M10 9 C6 13, 6 18, 9 20" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
          </svg>
          <div className="balloon-string"></div>
          {/* Elegant gold tied letter envelope instead of box */}
          <svg className="gift-box" width="28" height="20" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="30" height="20" rx="3" fill="#fffaf0" stroke="#d4af37" strokeWidth="1.5"/>
            <path d="M1 2 L16 13 L31 2" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
            {/* Golden Heart Seal */}
            <path d="M16 11 C16 11, 19 8, 19 10 C19 12, 16 15, 16 15 C16 15, 13 12, 13 10 C13 8, 16 11, 16 11 Z" fill="#ffd700" stroke="#b79b00" strokeWidth="0.8"/>
          </svg>
        </div>

        {/* --- Left Tree (Shakeable Garden Tree with bulb garlands) --- */}
        <div 
          className={`isometric-element camp-tree ${isTreeShaking ? "tree-shake" : ""}`}
          onClick={handleTreeClick}
        >
          <svg width="100%" height="100%" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft Shading Trunk */}
            <path d="M31 55 C31 55, 27 92, 25 96 H45 C43 92, 39 55, 39 55 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth="1.2"/>
            {/* Fine Grass Roots */}
            <ellipse cx="35" cy="96" rx="12" ry="3.5" fill="#81c784" opacity="0.8"/>
            
            {/* Elegant Soft Layered Green foliage */}
            <path d="M35 5 C15 5, 2 22, 15 45 C5 52, 18 68, 35 68 C52 68, 65 52, 55 45 C68 22, 55 5, 35 5 Z" fill="url(#leaf_left)" stroke="#2e7d32" strokeWidth="1.2"/>
            
            {/* Shiny Bulbs String */}
            <path d="M12 32 Q35 48 58 32" stroke="#ffe082" strokeWidth="1" strokeDasharray="3 3" fill="none"/>
            <circle cx="20" cy="36" r="2.5" fill="#fff9c4" stroke="#ffeb3b" strokeWidth="0.5"/>
            <circle cx="35" cy="40" r="2.5" fill="#fff9c4" stroke="#ffeb3b" strokeWidth="0.5"/>
            <circle cx="50" cy="36" r="2.5" fill="#fff9c4" stroke="#ffeb3b" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* --- Falling Acorns --- */}
        {acorns.map((acorn) => (
          <div
            key={acorn.id}
            className="falling-acorn"
            style={{ left: `${acorn.left}%`, bottom: "12px" }}
            onClick={() => handleAcornClick(acorn.id)}
          >
            {/* Realistic cute brown Acorn */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2 C6.5 2, 4 4.5, 4 8 C4 12, 7 17.5, 10 18.5 C13 17.5, 16 12, 16 8 C16 4.5, 13.5 2, 10 2 Z" fill="#a1887f" stroke="#5d4037" strokeWidth="1.2"/>
              <path d="M3 7.5 C3 6.5, 6 4.5, 10 4.5 C14 4.5, 17 6.5, 17 7.5 C17 8.5, 14 9.5, 10 9.5 C6 9.5, 3 8.5, 3 7.5 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth="1.2"/>
              <path d="M10 1 V4" stroke="#5d4037" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        ))}

        {/* --- Wedding Floral Arch (Romantic Green ivy & soft pink/white roses) --- */}
        <div className="isometric-element wedding-arch">
          <svg width="100%" height="100%" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Elegant birch wood posts with realistic grain */}
            <rect x="18" y="42" width="6" height="88" rx="2" fill="url(#arch_gold)" stroke="#8e7058" strokeWidth="1"/>
            <rect x="96" y="42" width="6" height="88" rx="2" fill="url(#arch_gold)" stroke="#8e7058" strokeWidth="1"/>
            
            {/* Semi-circular lush green arch frame */}
            <path d="M15 45 C15 12, 105 12, 105 45" stroke="#4caf50" strokeWidth="7" strokeLinecap="round" fill="none"/>
            <path d="M12 45 C12 8, 108 8, 108 45" stroke="#81c784" strokeWidth="3" strokeLinecap="round" fill="none"/>
            
            {/* Ivy Hanging Vines */}
            <path d="M22 45 C20 60, 26 75, 23 90" stroke="#388e3c" strokeWidth="1.2" fill="none" strokeDasharray="3 2"/>
            <path d="M98 45 C96 60, 102 75, 99 90" stroke="#388e3c" strokeWidth="1.2" fill="none" strokeDasharray="3 2"/>
            
            {/* Soft Pastel Roses */}
            <circle cx="60" cy="14" r="6" fill="#f48fb1" stroke="#c2185b" strokeWidth="0.8"/>
            <circle cx="58" cy="13" r="3" fill="#ffe082" />
            <circle cx="40" cy="20" r="5" fill="#ffffff" stroke="#b0bec5" strokeWidth="0.8"/>
            <circle cx="80" cy="20" r="5" fill="#ffffff" stroke="#b0bec5" strokeWidth="0.8"/>
            <circle cx="23" cy="38" r="6" fill="#f48fb1" stroke="#c2185b" strokeWidth="0.8"/>
            <circle cx="97" cy="38" r="6" fill="#f48fb1" stroke="#c2185b" strokeWidth="0.8"/>
            <circle cx="30" cy="28" r="4" fill="#ffecb3" stroke="#ffa000" strokeWidth="0.8"/>
            <circle cx="90" cy="28" r="4" fill="#ffecb3" stroke="#ffa000" strokeWidth="0.8"/>
          </svg>
        </div>

        {/* --- Wedding Grand Piano (Premium 2.5D White & Gold Piano) --- */}
        <div className="isometric-element wedding-piano" onClick={handlePianoClick}>
          <svg width="100%" height="100%" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 4px 6px rgba(124,93,65,0.15))" }}>
            {/* Smooth Piano Body */}
            <path d="M4 26 C4 23, 12 18, 25 18 H52 C55 18, 56 22, 56 26 V52 C56 55, 52 57, 48 57 H12 C6 57, 4 54, 4 50 Z" fill="url(#piano_body)" stroke="#a6afb8" strokeWidth="1.2"/>
            {/* Keyboard Lid opened */}
            <path d="M4 26 L26 4 L50 26 H4Z" fill="#ffffff" stroke="#b8c5d3" strokeWidth="1"/>
            
            {/* Ivory Keyboard */}
            <rect x="8" y="28" width="44" height="8" fill="white" stroke="#333" strokeWidth="0.8"/>
            {/* Black keys */}
            <rect x="11.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="15.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="19.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="27.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="31.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="35.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="43.5" y="28" width="2" height="5" fill="#111"/>
            <rect x="47.5" y="28" width="2" height="5" fill="#111"/>
            
            {/* Gold details */}
            <path d="M26 38 H34 V40 H26 Z" fill="#ffd700"/>
            {/* Music stand & sheet */}
            <rect x="22" y="22" width="16" height="5" fill="#fff" stroke="#90a4ae" strokeWidth="0.5"/>
            <line x1="25" y1="24" x2="35" y2="24" stroke="#90a4ae" strokeWidth="0.8"/>
          </svg>
        </div>

        {/* --- Wedding Cake (Fine 3-tier pastel Wedding Cake) --- */}
        <div className="isometric-element wedding-cake">
          <svg width="100%" height="100%" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Table stand */}
            <path d="M14 40 H26 L23 48 H17 Z" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="1"/>
            
            {/* Tier 1 */}
            <rect x="4" y="28" width="32" height="12" rx="4" fill="url(#cake_cream)" stroke="#ff80ab" strokeWidth="1"/>
            <path d="M4 32 C8 34, 32 34, 36 32" stroke="#f50057" strokeWidth="1" strokeDasharray="1 1" fill="none"/>
            
            {/* Tier 2 */}
            <rect x="8" y="18" width="24" height="10" rx="3" fill="url(#cake_cream)" stroke="#ff80ab" strokeWidth="1"/>
            
            {/* Tier 3 */}
            <rect x="12" y="8" width="16" height="10" rx="2" fill="url(#cake_cream)" stroke="#ff80ab" strokeWidth="1"/>
            
            {/* Hearts Topper */}
            <path d="M17 3 C17 1, 19 0, 20 2 C21 0, 23 1, 23 3 C23 5, 20 7, 20 7 C20 7, 17 5, 17 3 Z" fill="#ff4081" />
          </svg>
        </div>

        {/* --- Right Tree (Romantic Cherry Blossom tree with falling petals) --- */}
        <div className="isometric-element camp-tree-right">
          <svg width="100%" height="100%" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31 55 C31 55, 28 92, 26 96 H44 C42 92, 39 55, 39 55 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth="1.2"/>
            
            {/* Dreamy Pink Blossom Clouds */}
            <circle cx="35" cy="32" r="23" fill="url(#cherry_blossom)" stroke="#f48fb1" strokeWidth="1"/>
            <circle cx="21" cy="42" r="16" fill="url(#cherry_blossom)" stroke="#f48fb1" strokeWidth="1"/>
            <circle cx="49" cy="42" r="16" fill="url(#cherry_blossom)" stroke="#f48fb1" strokeWidth="1"/>
            
            {/* Little cherry flowers decoration */}
            <circle cx="25" cy="32" r="2" fill="#fff"/>
            <circle cx="45" cy="36" r="2" fill="#fff"/>
            <circle cx="34" cy="46" r="1.5" fill="#fff"/>
          </svg>
        </div>

        {/* --- Groom Avatar (Jjong) --- */}
        <div className="isometric-element avatar-groom" onClick={() => handleAvatarClick("groom")}>
          <MinimeSprite avatar={groomAvatar} scale={0.7} />
        </div>

        {/* --- Bride Avatar (Kkyong) --- */}
        <div className="isometric-element avatar-bride" onClick={() => handleAvatarClick("bride")}>
          <MinimeSprite avatar={brideAvatar} scale={0.7} />
        </div>

        {/* --- Custom Guest Avatar --- */}
        {guestAvatar && (
          <div className="isometric-element avatar-guest" onClick={() => handleAvatarClick("guest")}>
            <MinimeSprite avatar={guestAvatar} scale={0.7} />
          </div>
        )}

        {/* --- Speech Bubbles --- */}
        {activeBubble === "groom" && (
          <div className="ac-speech-bubble groom-bubble">
            꾱아, 내 도토리를 전부 너에게 줄게! 🐿️🧡 <span className="dialogue-arrow">▶</span>
          </div>
        )}
        {activeBubble === "bride" && (
          <div className="ac-speech-bubble bride-bubble">
            어머나 쭁아! 평생 일촌 맺자! 💍✨ <span className="dialogue-arrow">▶</span>
          </div>
        )}
        {activeBubble === "guest" && (
          <div className="ac-speech-bubble guest-bubble">
            {getGuestDialogue()} <span className="dialogue-arrow">▶</span>
          </div>
        )}
      </div>

      {/* --- Wedding Balloon Invitation Modal --- */}
      {showPresentModal && (
        <div className="present-modal-overlay" onClick={() => setShowPresentModal(false)}>
          <div className="present-card" onClick={(e) => e.stopPropagation()}>
            <button className="present-card-close" onClick={() => setShowPresentModal(false)}>X</button>
            <div className="present-card-title">
              💌 <span>쭁 & 꾱의 모바일 초대장</span> 🎈
            </div>
            <div className="present-card-content">
              <p style={{ fontSize: "12px", fontWeight: "bold", color: "var(--cy-orange)", marginBottom: "8px" }}>
                신랑 채종호 ♥ 신부 나희경
              </p>
              <hr style={{ margin: "10px 0", border: "none", borderTop: "1px dashed #7c5d41" }} />
              <p style={{ margin: "6px 0" }}>오랜 시간 소중한 일촌으로 함께해온 저희 두 사람이,</p>
              <p style={{ margin: "6px 0" }}>인생이라는 미니홈피를 합쳐 평생 일촌으로 거듭나려 합니다.</p>
              <p style={{ margin: "6px 0" }}>새로운 보금자리의 스킨을 함께 가꾸어갈 첫걸음의 자리에</p>
              <p style={{ margin: "6px 0" }}>소중한 이웃 분들을 정중하게 초대합니다 🌳🏡💍</p>
              
              <p style={{ margin: "16px 0 8px 0", fontSize: "11px", backgroundColor: "#fff6f0", padding: "8px", borderRadius: "4px", border: "1px solid #ffe3d1" }}>
                <strong>📅 일시: 2025년 10월 25일 토요일 낮 12시</strong><br />
                <strong>📍 장소: 선릉 아펠가모 15층 웨딩홀</strong>
              </p>
              <p style={{ fontSize: "9px", color: "#888", marginTop: "10px" }}>
                (자세한 오시는 길 정보와 뷔페 안내는 메인 메뉴 중 <strong>'오시는길'</strong> 탭에서 편리하게 확인하실 수 있어요!)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
