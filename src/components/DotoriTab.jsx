// src/components/DotoriTab.jsx
import React, { useState, useEffect } from "react";
import { Wallet, Coins, Copy, Check, ExternalLink, Heart } from "lucide-react";

// Premium 3D Embossed Dotori (Acorn) Icon Component using SVG
export function DotoriIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <defs>
        {/* Cap Gradient */}
        <linearGradient id="acornCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8d6e63" />
          <stop offset="50%" stopColor="#5d4037" />
          <stop offset="100%" stopColor="#3e2723" />
        </linearGradient>
        {/* Body Gradient */}
        <linearGradient id="acornBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb74d" />
          <stop offset="40%" stopColor="#ffa726" />
          <stop offset="80%" stopColor="#f57c00" />
          <stop offset="100%" stopColor="#d84315" />
        </linearGradient>
        {/* Shine/Gloss Gradient */}
        <linearGradient id="acornShineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Drop Shadow Gradient */}
        <radialGradient id="acornShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Realistic soft floor shadow */}
      <ellipse cx="16" cy="27" rx="10" ry="2.5" fill="url(#acornShadow)" />

      {/* Stem */}
      <path d="M16 3 C16 3, 14 7, 14 9 C14 9, 18 9, 16 3" fill="#3e2723" stroke="#27120f" strokeWidth="1" strokeLinecap="round" />

      {/* Acorn Cap */}
      <path d="M5 14 C5 7.5, 27 7.5, 27 14 C27 16, 24 17.5, 16 17.5 C8 17.5, 5 16, 5 14 Z" fill="url(#acornCapGrad)" stroke="#3e2723" strokeWidth="1.2" />
      <path d="M8 11 Q16 14.5 24 11" stroke="#4e342e" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M6 13 Q16 16.5 26 13" stroke="#4e342e" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Acorn Body */}
      <path d="M5 14.5 C5 14.5, 4 23, 16 29 C28 23, 27 14.5, 27 14.5 C27 16.5, 23 19, 16 19 C9 16.5, 5 14.5, 5 14.5 Z" fill="url(#acornBodyGrad)" stroke="#3e2723" strokeWidth="1.2" />
      
      {/* 3D Gloss highlight */}
      <path d="M7.5 17 C7.5 17, 8.5 22, 13.5 25" stroke="url(#acornShineGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="10.5" cy="19" r="1.5" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

export default function DotoriTab() {
  const [selectedAmount, setSelectedAmount] = useState(100); // Default 100 dotoris (100k KRW)
  const [customAmount, setCustomAmount] = useState("");
  const [activeRecipient, setActiveRecipient] = useState("groom"); // groom | bride
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [myDotoris, setMyDotoris] = useState(0); // Cumulative dotoris sent by me
  const [globalDotoris, setGlobalDotoris] = useState(12850); // Total simulated dotoris on the site

  const groomBank = "신한은행 110-123-456789 (채종호)";
  const brideBank = "국민은행 9-1234-5678-90 (나희경)";

  useEffect(() => {
    // Load sent history
    const saved = localStorage.getItem("cyworld_dotori_my_sent");
    if (saved) {
      setMyDotoris(parseInt(saved, 10));
    }
    // Randomize simulated guest dotori count
    const simulatedBase = 12500 + Math.floor(Math.random() * 400);
    setGlobalDotoris(simulatedBase + (saved ? parseInt(saved, 10) : 0));
  }, []);

  const handleCopy = (type, text) => {
    navigator.clipboard.writeText(text);
    if (type === "groom") {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  // High fidelity crystal chime bell arpeggio for premium UX
  const playCoinSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      
      // Delay and feedback loop
      const delay = ctx.createDelay();
      const delayGain = ctx.createGain();
      
      delay.delayTime.setValueAtTime(0.18, now); // 180ms delay spacing
      delayGain.gain.setValueAtTime(0.35, now);  // 35% delay feedback
      
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);
      
      const playChimeNode = (freq, offsetTime, maxVolume) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(freq, now + offsetTime);
        
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(freq * 2, now + offsetTime); // 1-octave shiny overtone
        
        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteGain.connect(delay);
        
        // Attack-decay volume envelope
        noteGain.gain.setValueAtTime(0, now + offsetTime);
        noteGain.gain.linearRampToValueAtTime(maxVolume, now + offsetTime + 0.005);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + offsetTime + 0.45);
        
        osc1.start(now + offsetTime);
        osc1.stop(now + offsetTime + 0.5);
        osc2.start(now + offsetTime);
        osc2.stop(now + offsetTime + 0.5);
      };
      
      // Crystal arpeggio progression: C6 -> E6 -> G6 -> C7
      playChimeNode(1046.50, 0.0, 0.08);  // C6
      playChimeNode(1318.51, 0.06, 0.08); // E6
      playChimeNode(1567.98, 0.12, 0.08); // G6
      playChimeNode(2093.00, 0.18, 0.12); // C7
      
    } catch (e) {
      console.log("Audio synthesis error: ", e);
    }
  };

  const handleSendDotori = () => {
    const amount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (isNaN(amount) || amount <= 0) {
      alert("올바른 도토리 개수를 설정해주세요.");
      return;
    }

    const wonAmount = amount * 1000;
    const recipientName = activeRecipient === "groom" ? "신랑 채종호" : "신부 나희경";
    const accountNum = activeRecipient === "groom" ? groomBank : brideBank;

    // Show retro modal confirmation prompt
    const confirmMessage = `[도토리 충전소 결제 승인 요청]\n\n받는 사람: ${recipientName}\n선물할 도토리: 🐿️ ${amount}개\n송금 금액: ${wonAmount.toLocaleString()}원\n\n확인을 누르시면 해당 계좌정보가 복사되며, 송금 안내 창이 나타납니다. 진행하시겠습니까?`;

    if (window.confirm(confirmMessage)) {
      // Copy bank account immediately
      const rawAccount = activeRecipient === "groom" ? "신한은행 110123456789" : "국민은행 91234567890";
      navigator.clipboard.writeText(rawAccount);

      // Play Y2K 8-bit sound
      playCoinSound();

      // Update states
      const newMySent = myDotoris + amount;
      setMyDotoris(newMySent);
      localStorage.setItem("cyworld_dotori_my_sent", newMySent.toString());
      setGlobalDotoris((prev) => prev + amount);

      alert(`🐿️ 도토리 ${amount}개 충전 성공!\n\n${recipientName} 님의 계좌가 자동으로 복사되었습니다.\n주요 송금 앱(토스, 카카오페이 등)을 열어 붙여넣기 하신 후 ${wonAmount.toLocaleString()}원을 송금해 주세요.\n\n따뜻한 마음에 진심으로 감사드립니다! 💕`);
      
      // Auto redirect triggers
      setCustomAmount("");
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
        <span>🐿️ 도토리 충전소 (Wedding Gift)</span>
        <span style={{ fontSize: "8px", opacity: 0.8 }}>도토리 1개 = 1,000원</span>
      </div>

      {/* Cumulative Dotori Stat Widget */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
        marginBottom: "14px"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
          border: "1px dashed var(--cy-orange)",
          borderRadius: "6px",
          padding: "8px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "8px", color: "var(--cy-orange)", fontWeight: "bold" }}>현재까지 내가 선물한 도토리</div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <DotoriIcon size={14} />
            <span>{myDotoris.toLocaleString()} 개</span>
          </div>
          <div style={{ fontSize: "7px", color: "#666", marginTop: "2px" }}>({(myDotoris * 1000).toLocaleString()}원 상당)</div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
          border: "1px dashed #2e7d32",
          borderRadius: "6px",
          padding: "8px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "8px", color: "#2e7d32", fontWeight: "bold" }}>쭁♥꾱 미니홈피 누적 도토리</div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <DotoriIcon size={14} />
            <span>{globalDotoris.toLocaleString()} 개</span>
          </div>
          <div style={{ fontSize: "7px", color: "#666", marginTop: "2px" }}>하객분들이 모아주신 따뜻한 도토리 🌳</div>
        </div>
      </div>

      {/* Recipient Account Cards */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "14px"
      }}>
        <div style={{ fontSize: "10px", fontWeight: "bold", color: "#555" }}>🏦 축의금 송금 계좌 안내</div>
        
        {/* Groom Bank Block */}
        <div style={{
          background: "white",
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
        }}>
          <div>
            <div style={{ fontSize: "8px", color: "var(--cy-orange)", fontWeight: "bold" }}>🤵 신랑 채종호 계좌</div>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#333", margin: "2px 0" }}>
              {groomBank}
            </div>
            <div style={{ fontSize: "7.5px", color: "#888" }}>예금주: 채종호 (쭁)</div>
          </div>
          <button
            onClick={() => handleCopy("groom", groomBank)}
            style={{
              backgroundColor: copiedGroom ? "#4caf50" : "white",
              color: copiedGroom ? "white" : "#666",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              transition: "all 0.2s"
            }}
          >
            {copiedGroom ? <Check size={11} /> : <Copy size={11} />}
            <span style={{ fontSize: "8px", fontWeight: "bold" }}>{copiedGroom ? "복사완료" : "복사"}</span>
          </button>
        </div>

        {/* Bride Bank Block */}
        <div style={{
          background: "white",
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
        }}>
          <div>
            <div style={{ fontSize: "8px", color: "#f48fb1", fontWeight: "bold" }}>👰 신부 나희경 계좌</div>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#333", margin: "2px 0" }}>
              {brideBank}
            </div>
            <div style={{ fontSize: "7.5px", color: "#888" }}>예금주: 나희경 (꾱)</div>
          </div>
          <button
            onClick={() => handleCopy("bride", brideBank)}
            style={{
              backgroundColor: copiedBride ? "#4caf50" : "white",
              color: copiedBride ? "white" : "#666",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              transition: "all 0.2s"
            }}
          >
            {copiedBride ? <Check size={11} /> : <Copy size={11} />}
            <span style={{ fontSize: "8px", fontWeight: "bold" }}>{copiedBride ? "복사완료" : "복사"}</span>
          </button>
        </div>
      </div>

      {/* Dotori Charging Form Panel */}
      <div style={{
        background: "#fafafa",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "12px"
      }}>
        <div style={{ fontSize: "10px", fontWeight: "bold", color: "#333", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
          <Coins size={12} style={{ color: "var(--cy-orange)" }} />
          <span>도토리 개수 선택 (결제하기)</span>
        </div>

        {/* Amount Selector Buttons Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
          marginBottom: "10px"
        }}>
          {[50, 100, 200].map((amt) => {
            const isSelected = selectedAmount === amt && !customAmount;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount("");
                }}
                style={{
                  background: isSelected ? "var(--cy-orange-light)" : "white",
                  border: isSelected ? "1.5px solid var(--cy-orange)" : "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px 4px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  transition: "all 0.15s"
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: "bold", color: isSelected ? "var(--cy-orange)" : "#333" }}>
                  🐿️ {amt}개
                </span>
                <span style={{ fontSize: "8px", color: "#666" }}>
                  {(amt * 1000).toLocaleString()}원
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "12px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "4px 8px"
        }}>
          <span style={{ fontSize: "9px", color: "#666" }}>직접 입력:</span>
          <input
            type="number"
            placeholder="도토리 개수 입력"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(0);
            }}
            min="1"
            max="10000"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "9px",
              textAlign: "right",
              fontFamily: "inherit"
            }}
          />
          <span style={{ fontSize: "9px", color: "#333", fontWeight: "bold" }}>개</span>
        </div>

        {/* Choose Recipient Side Radio */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "9.5px",
          marginBottom: "12px",
          background: "white",
          border: "1px solid #eee",
          padding: "6px 8px",
          borderRadius: "4px"
        }}>
          <span style={{ fontWeight: "bold", color: "#555" }}>받는 이 선택</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
              <input
                type="radio"
                name="dotori_side"
                checked={activeRecipient === "groom"}
                onChange={() => setActiveRecipient("groom")}
              />
              <span>신랑 채종호</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
              <input
                type="radio"
                name="dotori_side"
                checked={activeRecipient === "bride"}
                onChange={() => setActiveRecipient("bride")}
              />
              <span>신부 나희경</span>
            </label>
          </div>
        </div>

        {/* Pricing Summary Box */}
        <div style={{
          background: "#fff8f0",
          border: "1px dashed var(--cy-orange)",
          borderRadius: "4px",
          padding: "8px",
          marginBottom: "12px",
          fontSize: "9px",
          lineHeight: "1.4"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
            <span>선택한 도토리:</span>
            <span style={{ fontWeight: "bold" }}>
              🐿️ {customAmount ? parseInt(customAmount, 10).toLocaleString() : selectedAmount}개
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "bold", color: "var(--cy-orange)", borderTop: "1px dotted #ccc", paddingTop: "4px" }}>
            <span>총 결제금액:</span>
            <span>
              {((customAmount ? parseInt(customAmount, 10) : selectedAmount) * 1000).toLocaleString()}원
            </span>
          </div>
        </div>

        {/* Giant Cyworld Styled Charging Button */}
        <button
          onClick={handleSendDotori}
          style={{
            width: "100%",
            background: "linear-gradient(to bottom, #ff9800, #f57c00)",
            color: "white",
            border: "1px solid #e65100",
            borderRadius: "4px",
            padding: "10px",
            fontSize: "11px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            transition: "all 0.1s"
          }}
        >
          <DotoriIcon size={12} />
          <span>도토리 선물하고 축의금 전달하기 🐿️</span>
        </button>

        {/* Quick Bank App Redirect Buttons for Mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginTop: "8px"
        }}>
          <a
            href="https://toss.im/_m/uN1QUe" // toss open app or general redirect
            onClick={() => {
              const rawAccount = activeRecipient === "groom" ? "신한은행 110123456789" : "국민은행 91234567890";
              navigator.clipboard.writeText(rawAccount);
              alert("계좌번호가 복사되었습니다! 토스 앱으로 이동하여 붙여넣어 주세요.");
            }}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#2e83f2",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              borderRadius: "4px",
              padding: "6px",
              fontSize: "8.5px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              boxShadow: "1px 1px 1px rgba(0,0,0,0.08)"
            }}
          >
            <span>toss</span>
            <span>토스 앱으로 송금</span>
            <ExternalLink size={8} />
          </a>
          <a
            href="kakaotalk://" // kakaotalk open protocol
            onClick={() => {
              const rawAccount = activeRecipient === "groom" ? "신한은행 110123456789" : "국민은행 91234567890";
              navigator.clipboard.writeText(rawAccount);
              alert("계좌번호가 복사되었습니다! 카카오톡 앱을 열고 송금 창에서 붙여넣어 주세요.");
            }}
            style={{
              backgroundColor: "#fee500",
              color: "#191919",
              textDecoration: "none",
              textAlign: "center",
              borderRadius: "4px",
              padding: "6px",
              fontSize: "8.5px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              boxShadow: "1px 1px 1px rgba(0,0,0,0.08)"
            }}
          >
            <span>pay</span>
            <span>카카오페이 송금</span>
            <ExternalLink size={8} />
          </a>
        </div>
      </div>
      
      {/* Humorous Cyworld Disclaimer Notice */}
      <div style={{
        marginTop: "14px",
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        padding: "8px",
        fontSize: "8px",
        lineHeight: "1.4",
        color: "#666",
        background: "#fafafa"
      }}>
        <div style={{ fontWeight: "bold", color: "#333", marginBottom: "2px", display: "flex", alignItems: "center", gap: "2px" }}>
          <Heart size={8} style={{ color: "red" }} />
          <span>도토리 충전 거래 명세서 안내</span>
        </div>
        - 본 충전소는 싸이월드 감성 오마주 축의금 안내 페이지입니다. 충전된 도토리는 신랑신부의 일생에 단 한 번뿐인 결혼식 축하 기금으로 100% 자동 환원 및 전달됩니다. <br />
        - 축의금을 전달하신 하객분들께는 평생 일촌 관계 보장, 쭁♥꾱 커플의 무한 하트 리액션이 평생 무료 제공됩니다!
      </div>
    </div>
  );
}
