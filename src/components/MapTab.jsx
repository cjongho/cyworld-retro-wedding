// src/components/MapTab.jsx
import React, { useState, useEffect } from "react";
import { MapPin, Phone, Car, Train, Navigation, Clipboard, CheckCircle2 } from "lucide-react";

export default function MapTab() {
  const [copied, setCopied] = useState(false);
  const [rsvpSaved, setRsvpSaved] = useState(null);
  
  // RSVP Form States
  const [side, setSide] = useState("groom"); // groom | bride
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes"); // yes | no
  const [guests, setGuests] = useState("1");
  const [dining, setDining] = useState("yes"); // yes | no | maybe
  const [memo, setMemo] = useState("");

  const weddingAddress = "서울 강남구 테헤란로 318, 한신인터밸리24 빌딩 15층 아펠가모 선릉";

  useEffect(() => {
    const saved = localStorage.getItem("cyworld_rsvp");
    if (saved) {
      setRsvpSaved(JSON.parse(saved));
    }
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(weddingAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // High-fidelity crystal bell arpeggio for RSVP submission
  const playRsvpSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const delay = ctx.createDelay();
      const delayGain = ctx.createGain();
      
      delay.delayTime.setValueAtTime(0.2, now);
      delayGain.gain.setValueAtTime(0.3, now);
      
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);
      
      const playBell = (freq, offset, vol) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(freq, now + offset);
        
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(freq * 2, now + offset);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        gain.connect(delay);
        
        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(vol, now + offset + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.4);
        
        osc1.start(now + offset);
        osc1.stop(now + offset + 0.5);
        osc2.start(now + offset);
        osc2.stop(now + offset + 0.5);
      };
      
      // Sparkling music box arpeggio: F5 -> A5 -> C6 -> F6
      playBell(698.46, 0.0, 0.08); // F5
      playBell(880.00, 0.08, 0.08); // A5
      playBell(1046.50, 0.16, 0.08); // C6
      playBell(1396.91, 0.24, 0.12); // F6
    } catch (e) {
      console.log("Audio synthesis error: ", e);
    }
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const rsvpData = {
      side,
      name: name.trim(),
      attending,
      guests: attending === "yes" ? guests : "0",
      dining: attending === "yes" ? dining : "no",
      memo: memo.trim(),
      submittedAt: new Date().toLocaleString()
    };

    localStorage.setItem("cyworld_rsvp", JSON.stringify(rsvpData));
    setRsvpSaved(rsvpData);
    playRsvpSound();
    alert("참석 설문 조사가 제출되었습니다! 쭁♥꾱 미니홈피 도토리가 100% 충전되었습니다! 🐿️💖");
  };

  const handleResetRsvp = () => {
    if (window.confirm("참석 정보를 수정하시겠습니까? 기존 정보가 초기화됩니다.")) {
      localStorage.removeItem("cyworld_rsvp");
      setRsvpSaved(null);
      setName("");
      setMemo("");
    }
  };

  return (
    <div style={{ padding: "8px 2px", fontFamily: "inherit" }}>
      {/* Title Banner */}
      <div style={{
        backgroundColor: "var(--cy-orange)",
        color: "white",
        padding: "6px 12px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "bold",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>📍 오시는 길 / RSVP 위젯</span>
        <span style={{ fontSize: "8px", opacity: 0.8 }}>선릉 아펠가모 15F</span>
      </div>

      {/* Wedding Hall Info */}
      <div style={{
        background: "#fafafa",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "12px",
        marginBottom: "14px",
        fontSize: "10px",
        lineHeight: "1.5"
      }}>
        <h3 style={{ fontSize: "12px", color: "var(--cy-orange)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
          <MapPin size={13} />
          아펠가모 선릉 (Apelgamo Seolleung)
        </h3>
        <p style={{ color: "#333", marginBottom: "8px" }}>
          <strong>주소:</strong> {weddingAddress} <br />
          <strong>연락처:</strong> 02-518-2488 (아펠가모 예약실)
        </p>

        {/* Address Copy Button */}
        <button
          onClick={handleCopyAddress}
          style={{
            background: copied ? "#4caf50" : "white",
            color: copied ? "white" : "#555",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "5px 10px",
            fontSize: "9px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            transition: "all 0.2s"
          }}
        >
          <Clipboard size={10} />
          <span>{copied ? "주소 복사 완료!" : "도로명 주소 복사하기"}</span>
        </button>
      </div>

      {/* Retro Styled Map (Custom SVG Art) */}
      <div style={{
        position: "relative",
        background: "#fffef5",
        border: "2px solid var(--cy-border-color)",
        borderRadius: "6px",
        padding: "8px",
        marginBottom: "14px",
        boxShadow: "inset 0 0 8px rgba(0,0,0,0.03)"
      }}>
        <div style={{ fontSize: "8px", color: "var(--cy-orange)", fontWeight: "bold", marginBottom: "4px", textAlign: "center" }}>
          🗺️ Y2K 레트로 미니 약도 (선릉역 4번 출구 도보 2분)
        </div>
        
        {/* SVG Map Container */}
        <svg width="100%" height="180" viewBox="0 0 300 180" style={{ background: "linear-gradient(135deg, #eef5e6 0%, #dbe6cf 100%)", borderRadius: "6px", border: "1px solid #c0cfb2" }}>
          <defs>
            {/* Building Gradients */}
            <linearGradient id="hallGrad" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#e1f5fe" />
              <stop offset="100%" stopColor="#80d8ff" />
            </linearGradient>
            <linearGradient id="hallSideGrad" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#b3e5fc" />
              <stop offset="100%" stopColor="#40c4ff" />
            </linearGradient>
            <linearGradient id="roadGrad" x1="0" y1="0" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b0bec5" />
              <stop offset="100%" stopColor="#90a4ae" />
            </linearGradient>
            {/* Heart Balloon Gradient */}
            <radialGradient id="heartGlow" cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ff8a80" />
              <stop offset="70%" stopColor="#ff1744" />
              <stop offset="100%" stopColor="#b71c1c" />
            </radialGradient>
            {/* Drop Shadows */}
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.15"/>
            </filter>
          </defs>

          {/* Grass Field Area Texture (2.5D Grid Lines) */}
          <path d="M 0,30 L 300,30 M 0,60 L 300,60 M 0,90 L 300,90 M 0,120 L 300,120 M 0,150 L 300,150" stroke="#d4e0c4" strokeWidth="0.5" />
          <path d="M 50,0 L 50,180 M 100,0 L 100,180 M 150,0 L 150,180 M 200,0 L 200,180 M 250,0 L 250,180" stroke="#d4e0c4" strokeWidth="0.5" />

          {/* Roads with Perspective 2.5D Feel */}
          {/* Teheran-ro (Main Horizontal Road) */}
          <path d="M 0,95 L 300,85 L 300,125 L 0,135 Z" fill="url(#roadGrad)" stroke="#78909c" strokeWidth="0.5" />
          <path d="M 0,115 L 300,105" stroke="#ffffff" strokeWidth="1" strokeDasharray="6,4" opacity="0.6" />
          
          {/* Crossing Street (Vertical Road) */}
          <path d="M 175,0 L 215,0 L 195,180 L 155,180 Z" fill="url(#roadGrad)" stroke="#78909c" strokeWidth="0.5" opacity="0.9" />

          {/* Landmark Building: Hana Bank (3D Block) */}
          <g filter="url(#shadow)">
            {/* Left face */}
            <path d="M 125,145 L 125,125 L 140,120 L 140,140 Z" fill="#cfd8dc" />
            {/* Right face */}
            <path d="M 140,140 L 140,120 L 155,123 L 155,143 Z" fill="#b0bec5" />
            {/* Roof */}
            <path d="M 125,125 L 140,120 L 155,123 L 140,128 Z" fill="#eceff1" />
            <text x="140" y="136" fill="#37474f" fontSize="6px" fontWeight="bold" textAnchor="middle">하나은행</text>
          </g>

          {/* Landmark Building: Seolleung Square (3D Block) */}
          <g filter="url(#shadow)">
            {/* Left face */}
            <path d="M 235,55 L 235,30 L 255,27 L 255,52 Z" fill="#cfd8dc" />
            {/* Right face */}
            <path d="M 255,52 L 255,27 L 275,30 L 275,55 Z" fill="#b0bec5" />
            {/* Roof */}
            <path d="M 235,30 L 255,27 L 275,30 L 255,33 Z" fill="#eceff1" />
            <text x="255" y="44" fill="#37474f" fontSize="5.5px" textAnchor="middle">선릉 스퀘어</text>
          </g>

          {/* MAIN WEDDING HALL: Apelgamo Seolleung (Hanshin Interval 24) - Luxurious 2.5D Castle */}
          <g filter="url(#shadow)">
            {/* Building Base Shadow */}
            <ellipse cx="90" cy="65" rx="30" ry="8" fill="#000" opacity="0.08" />

            {/* 3D Main Block Left Front Side */}
            <path d="M 60,65 L 60,25 L 90,20 L 90,60 Z" fill="url(#hallGrad)" stroke="#0288d1" strokeWidth="0.8" />
            {/* 3D Main Block Right Front Side */}
            <path d="M 90,60 L 90,20 L 115,24 L 115,64 Z" fill="url(#hallSideGrad)" stroke="#0288d1" strokeWidth="0.8" />
            {/* Roof */}
            <path d="M 60,25 L 90,20 L 115,24 L 85,29 Z" fill="#e3f2fd" stroke="#0288d1" strokeWidth="0.8" />

            {/* Romantic Pink Wedding Banner */}
            <path d="M 57,38 L 92,33 L 92,44 L 57,49 Z" fill="#ff4081" opacity="0.85" />
            <path d="M 92,33 L 118,37 L 118,48 L 92,44 Z" fill="#f50057" opacity="0.85" />
            <text x="88" y="42" fill="#ffffff" fontSize="7.5px" fontWeight="bold" textAnchor="middle">💖 아펠가모 선릉</text>
            <text x="88" y="53" fill="#01579b" fontSize="5.5px" textAnchor="middle">한신인터밸리24 15F</text>

            {/* Elegant glass windows grid */}
            <line x1="70" y1="26" x2="70" y2="34" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
            <line x1="80" y1="24" x2="80" y2="32" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
            <line x1="100" y1="26" x2="100" y2="34" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />

            {/* Helium Heart Balloon floating from wedding building */}
            <path d="M 108,18 L 115,-3" stroke="#ff4081" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
            <g transform="translate(115, -15)">
              <path d="M12,5 C12,5 10,0 6,0 C2,0 0,3.5 0,7 C0,12 7.5,17 12,20 C16.5,17 24,12 24,7 C24,3.5 22,0 18,0 C14,0 12,5 12,5 Z" fill="url(#heartGlow)" filter="url(#shadow)" transform="scale(0.6)" />
            </g>
          </g>

          {/* Seolleung Station Round High-Gloss Cap Green Button Style */}
          <g filter="url(#shadow)" transform="translate(180, 97)">
            {/* 3D button edge */}
            <circle cx="0" cy="2" r="13" fill="#1b5e20" />
            <circle cx="0" cy="0" r="13" fill="#4caf50" stroke="#2e7d32" strokeWidth="1" />
            {/* Specular ring */}
            <path d="M -8,-6 Q -2,-10 6,-6" stroke="#a5d6a7" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
            <text x="0" y="-1" fill="#ffffff" fontSize="7px" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">선릉역</text>
            <text x="0" y="6" fill="#ffeb3b" fontSize="4.5px" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">2 / 수인분당</text>
          </g>

          {/* Exit 4 Shiny Signboard */}
          <g filter="url(#shadow)" transform="translate(138, 92)">
            <rect x="0" y="0" width="13" height="9" rx="1.5" fill="#212121" stroke="#ffeb3b" strokeWidth="0.8" />
            <circle cx="6.5" cy="4.5" r="3.5" fill="#4caf50" />
            <text x="6.5" y="4.5" fill="#ffffff" fontSize="6px" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">4</text>
          </g>

          {/* Dotted path indicating the walk from Exit 4 to Apelgamo */}
          <path d="M 132,96 C 115,98 95,95 88,67" fill="none" stroke="#e91e63" strokeWidth="2.2" strokeDasharray="3.5,2.5" strokeLinecap="round" />
          
          {/* Beautiful Footprint icons / Sparkly Stars along the walk */}
          <g transform="translate(88, 62)">
            <polygon points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" fill="#ff3d00" />
          </g>
          <g transform="translate(110, 91)">
            <polygon points="0,-3 1,-1 3,0 1,1 0,3 -1,1 -3,0 -1,-1" fill="#e91e63" />
          </g>

          {/* Compass Rose */}
          <g transform="translate(25, 30)" filter="url(#shadow)">
            <circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#b0bec5" strokeWidth="0.8" />
            <polygon points="0,-8 2.5,0 -2.5,0" fill="#ff3d00" />
            <polygon points="0,8 2.5,0 -2.5,0" fill="#78909c" />
            <text x="0" y="-11" fontSize="6px" fontWeight="bold" fill="#37474f" textAnchor="middle">N</text>
          </g>

          {/* Beautiful Flower / Tree Decor in the bottom-left */}
          <g transform="translate(25, 155)">
            <circle cx="-4" cy="0" r="4" fill="#a5d6a7" opacity="0.8" />
            <circle cx="4" cy="0" r="5" fill="#81c784" opacity="0.8" />
            <circle cx="0" cy="-4" r="4" fill="#c8e6c9" opacity="0.8" />
            <circle cx="-1" cy="0" r="1.5" fill="#ff8a80" />
            <circle cx="3" cy="-2" r="1.5" fill="#ffd54f" />
          </g>
        </svg>
        
        {/* Navigation Map App Links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginTop: "8px"
        }}>
          <a
            href="https://map.kakao.com/link/to/%EC%95%84%ED%8E%A0%EA%B0%80%EB%AA%A8%20%EC%84%A0%EB%A6%89,37.505080,127.046903"
            target="_bin"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#ffeb00",
              color: "#3c1e1e",
              textDecoration: "none",
              textAlign: "center",
              borderRadius: "4px",
              padding: "6px",
              fontSize: "9px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              boxShadow: "1px 1px 1px rgba(0,0,0,0.1)"
            }}
          >
            <Navigation size={10} />
            <span>카카오맵 길찾기</span>
          </a>
          <a
            href="https://map.naver.com/v5/search/%EC%95%84%ED%8E%A0%EA%B0%80%EB%AA%A8%20%EC%84%A0%EB%A6%89/place/26425988"
            target="_bin"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#03c75a",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              borderRadius: "4px",
              padding: "6px",
              fontSize: "9px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              boxShadow: "1px 1px 1px rgba(0,0,0,0.1)"
            }}
          >
            <Navigation size={10} />
            <span>네이버 지도 길찾기</span>
          </a>
        </div>
      </div>

      {/* Traffic Guidelines (대중교통 & 주차 안내) */}
      <div style={{
        background: "white",
        border: "1px solid #eee",
        borderRadius: "6px",
        padding: "10px",
        marginBottom: "14px",
        fontSize: "9px",
        lineHeight: "1.5",
        color: "#555"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>
          <Train size={11} style={{ color: "var(--cy-orange)" }} />
          <span>지하철 이용 안내</span>
        </div>
        <p style={{ marginLeft: "15px", marginBottom: "8px" }}>
          - <strong>2호선, 수인분당선 선릉역</strong> 하락 후 <strong>4번 출구</strong>로 나와 약 100m 직진.<br />
          - 좌측에 위치한 한신인터밸리24 빌딩으로 진입하시어 고층 엘리베이터를 타고 15층으로 오시면 됩니다.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>
          <Car size={11} style={{ color: "var(--cy-orange)" }} />
          <span>자차 및 주차 안내</span>
        </div>
        <p style={{ marginLeft: "15px" }}>
          - <strong>네비게이션:</strong> '아펠가모 선릉' 혹은 '한신인터밸리24 주차장' 검색.<br />
          - <strong>하객 무료 주차:</strong> 빌드 지하 주차장 이용 시 안내 데스크에서 차량 번호 등록 시 <strong>2시간 무료 주차</strong> 가능합니다.
        </p>
      </div>

      {/* RSVP Section */}
      <div style={{
        background: "#fffbf5",
        border: "1px dashed var(--cy-orange)",
        borderRadius: "6px",
        padding: "12px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.02)"
      }}>
        <div style={{
          fontSize: "11px",
          fontWeight: "bold",
          color: "var(--cy-orange)",
          marginBottom: "6px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <CheckCircle2 size={12} />
          <span>신랑신부 하객 RSVP 설문 조사</span>
        </div>
        <p style={{ fontSize: "8px", color: "var(--cy-text-muted)", marginBottom: "10px" }}>
          하객분들의 소중한 참석 여부가 원활한 피로연 행사 및 자리 준비에 큰 도움이 됩니다!
        </p>

        {rsvpSaved ? (
          // RSVP Saved Dashboard View
          <div style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            padding: "10px",
            textAlign: "center"
          }}>
            <span style={{ fontSize: "18px" }}>🎉</span>
            <h4 style={{ fontSize: "10px", color: "var(--cy-orange)", margin: "4px 0" }}>참석 설문 제출 완료!</h4>
            <div style={{
              textAlign: "left",
              fontSize: "9px",
              color: "#555",
              margin: "8px 0",
              background: "#fafafa",
              padding: "8px",
              borderRadius: "3px",
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}>
              <div><strong>구분:</strong> {rsvpSaved.side === "groom" ? "신랑 채종호 하객" : "신부 나희경 하객"}</div>
              <div><strong>성함:</strong> {rsvpSaved.name}</div>
              <div><strong>참석:</strong> {rsvpSaved.attending === "yes" ? "참석합니다 💒" : "마음으로 축하합니다 💖"}</div>
              {rsvpSaved.attending === "yes" && (
                <>
                  <div><strong>인원:</strong> 본인 포함 {rsvpSaved.guests}명</div>
                  <div><strong>피로연 식사:</strong> {rsvpSaved.dining === "yes" ? "식사함 🍽️" : rsvpSaved.dining === "no" ? "식사 안함 🚫" : "미정 🤔"}</div>
                </>
              )}
              {rsvpSaved.memo && <div><strong>축하 메모:</strong> {rsvpSaved.memo}</div>}
              <div style={{ fontSize: "7px", color: "#999", marginTop: "4px", borderTop: "1px dotted #eee", paddingTop: "4px" }}>
                제출일시: {rsvpSaved.submittedAt}
              </div>
            </div>
            
            <button
              onClick={handleResetRsvp}
              style={{
                backgroundColor: "white",
                color: "#666",
                border: "1px solid #ccc",
                borderRadius: "3px",
                padding: "4px 10px",
                fontSize: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              참석 정보 수정하기
            </button>
          </div>
        ) : (
          // RSVP Form Input View
          <form onSubmit={handleRsvpSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Groom / Bride selection */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "#555" }}>구분</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="side"
                    checked={side === "groom"}
                    onChange={() => setSide("groom")}
                  />
                  <span>신랑(채종호) 측 하객</span>
                </label>
                <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="side"
                    checked={side === "bride"}
                    onChange={() => setSide("bride")}
                  />
                  <span>신부(나희경) 측 하객</span>
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "#555" }}>성함 / 일촌명</span>
              <input
                type="text"
                placeholder="방문객 성함을 적어주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={20}
                style={{
                  fontSize: "9px",
                  padding: "4px 6px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Attending Status Radio */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "#555" }}>참석 여부</span>
              <div style={{ display: "flex", gap: "12px" }}>
                <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === "yes"}
                    onChange={() => setAttending("yes")}
                  />
                  <span>참석합니다 💒</span>
                </label>
                <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === "no"}
                    onChange={() => setAttending("no")}
                  />
                  <span>마음으로 축하합니다 (미참석) 💖</span>
                </label>
              </div>
            </div>

            {attending === "yes" && (
              <>
                {/* Number of Guest Selector */}
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <span style={{ fontSize: "9px", fontWeight: "bold", color: "#555" }}>동반 인원수 (본인 포함)</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{
                      fontSize: "9px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      outline: "none",
                      backgroundColor: "white",
                      fontFamily: "inherit"
                    }}
                  >
                    <option value="1">1명 (본인)</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명 이상</option>
                  </select>
                </div>

                {/* Dining Selection Radio */}
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <span style={{ fontSize: "9px", fontWeight: "bold", color: "#555" }}>피로연 식사 여부</span>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="dining"
                        checked={dining === "yes"}
                        onChange={() => setDining("yes")}
                      />
                      <span>식사합니다 🍽️</span>
                    </label>
                    <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="dining"
                        checked={dining === "no"}
                        onChange={() => setDining("no")}
                      />
                      <span>하지 않습니다 🚫</span>
                    </label>
                    <label style={{ fontSize: "9px", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="dining"
                        checked={dining === "maybe"}
                        onChange={() => setDining("maybe")}
                      />
                      <span>미정 🤔</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Memo / Congratulations Text Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "#555" }}>신랑신부에게 한마디 / 메모</span>
              <input
                type="text"
                placeholder="축하 메모나 기타 전달 사항을 적어주세요"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                maxLength={100}
                style={{
                  fontSize: "9px",
                  padding: "4px 6px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                backgroundColor: "var(--cy-orange)",
                color: "white",
                border: "none",
                borderRadius: "3px",
                padding: "6px 12px",
                fontSize: "10px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "1px 1px 0 rgba(0,0,0,0.2)",
                marginTop: "4px"
              }}
            >
              📝 설문 답변 제출하기
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
