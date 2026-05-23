// src/components/HomeTab.jsx
import React, { useState, useEffect } from "react";
import Miniroom from "./Miniroom";
import { Sparkles, ArrowRight, Squirrel } from "lucide-react";

export default function HomeTab({ guestAvatar }) {
  const [acornsCount, setAcornsCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("cyworld_guest_acorns");
    if (saved) {
      setAcornsCount(parseInt(saved));
    }
  }, []);

  const handleAcornGathered = () => {
    setAcornsCount((prev) => {
      const newVal = prev + 1;
      localStorage.setItem("cyworld_guest_acorns", newVal.toString());
      return newVal;
    });
  };

  // Static BGM playlist representing nostalgic Y2K Cyworld tracks
  const bgmList = [
    { title: "Y (Please Tell Me Why)", artist: "프리스타일 (Freestyle)", dotori: "5개" },
    { title: "Sweet Sweet Music", artist: "프리템포 (FreeTEMPO)", dotori: "5개" },
    { title: "Sweety", artist: "클래지콰이 (Clazziquai)", dotori: "5개" },
    { title: "Love Recipe", artist: "바닐라 어쿠스틱", dotori: "5개" },
    { title: "눈의 꽃 (Snow Flower)", artist: "박효신", dotori: "5개" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {/* 2.5D Isometric Miniroom */}
      <Miniroom guestAvatar={guestAvatar} onAcornGathered={handleAcornGathered} />

      {/* Gamified Acorn Inventory Widget */}
      <div style={{
        backgroundColor: "var(--cy-orange-pale)",
        border: "1px solid #ffe3d1",
        borderRadius: "6px",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Squirrel size={14} color="var(--cy-orange)" style={{ animation: "bounce 0.8s infinite alternate" }} />
          <span>
            나무에서 주운 내 도토리: <strong style={{ color: "var(--cy-orange)", fontSize: "12px" }}>{acornsCount}</strong> 개 🐿️
          </span>
        </div>
        <div style={{ fontSize: "8px", color: "var(--cy-text-muted)" }}>
          (도토리는 축의금으로 쓸 수 있어요!)
        </div>
      </div>

      {/* BGM List Widget */}
      <div className="home-bgm-widget">
        <div className="home-bgm-title">
          🎵 BGM 플레이리스트 (미니홈피 음악 목록)
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {bgmList.map((bgm, idx) => (
            <div key={idx} className="bgm-list-row">
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "var(--cy-text-muted)" }}>{idx + 1}.</span>
                <strong style={{ color: idx === 0 ? "var(--cy-orange)" : "#333" }}>{bgm.title}</strong>
                <span style={{ color: "#999", fontSize: "8px" }}>- {bgm.artist}</span>
              </span>
              <span style={{ color: "var(--cy-orange)", fontSize: "8px", fontWeight: "bold" }}>
                🔑 {bgm.dotori}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick link to Registry / Dotori Tab */}
      <div style={{
        background: "linear-gradient(135deg, #fff 0%, #fafafa 100%)",
        border: "1px dashed var(--cy-border-color)",
        borderRadius: "6px",
        padding: "10px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "11px", fontWeight: "bold", color: "#333", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", marginBottom: "4px" }}>
          <Sparkles size={11} color="gold" />
          <span>채종호 ♥ 나희경 부부에게 도토리(축의금) 선물하기</span>
        </div>
        <p style={{ fontSize: "9px", color: "var(--cy-text-muted)", marginBottom: "8px" }}>
          가장 로맨틱하고 위트 있는 싸이월드 충전소 결제창을 통해 마음을 전하세요!
        </p>
        <button
          onClick={() => {
            // Find and click the Acorn Tab button
            const tabs = document.querySelectorAll(".menu-tab");
            tabs.forEach((tab) => {
              if (tab.textContent === "도토리") {
                tab.click();
              }
            });
          }}
          style={{
            background: "var(--cy-orange)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 12px",
            fontSize: "9px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            boxShadow: "0 2px 4px rgba(255,102,0,0.2)"
          }}
        >
          <span>도토리 선물숍 이동</span>
          <ArrowRight size={10} />
        </button>
      </div>
    </div>
  );
}
