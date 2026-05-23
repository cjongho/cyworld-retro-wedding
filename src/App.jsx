// src/App.jsx
import React, { useState, useEffect } from "react";
import CharacterCreator, { MinimeSprite } from "./components/CharacterCreator";
import BGMPlayer from "./components/BGMPlayer";
import HomeTab from "./components/HomeTab";
import DiaryTab from "./components/DiaryTab";
import GalleryTab from "./components/GalleryTab";
import GuestbookTab from "./components/GuestbookTab";
import MapTab from "./components/MapTab";
import DotoriTab from "./components/DotoriTab";

// Consolidated imports of Vanilla CSS styles
import "./styles/main.css";

export default function App() {
  const [guestAvatar, setGuestAvatar] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [todayVisitors, setTodayVisitors] = useState(1);
  const [totalVisitors, setTotalVisitors] = useState(1);
  
  // Dynamic scale responsive system for mobile landscape preservation
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });
  const [showRotateBanner, setShowRotateBanner] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if visitor has customized their avatar
  useEffect(() => {
    const saved = localStorage.getItem("cyworld_guest_avatar");
    if (saved) {
      setGuestAvatar(JSON.parse(saved));
    }

    // Set simulated Y2K visitor counts
    const todayNum = Math.floor(Math.random() * 80) + 120;
    const totalNum = Math.floor(Math.random() * 2000) + 48250;
    setTodayVisitors(todayNum);
    setTotalVisitors(totalNum);
  }, []);

  const handleEnterInvite = (avatarData) => {
    setGuestAvatar(avatarData);
    // Increase visitors slightly on entrance
    setTodayVisitors((prev) => prev + 1);
    setTotalVisitors((prev) => prev + 1);
  };

  const handleRecreateAvatar = () => {
    localStorage.removeItem("cyworld_guest_avatar");
    setGuestAvatar(null);
  };

  const handleWaveLinkChange = (e) => {
    const tabName = e.target.value;
    if (tabName) {
      if (tabName === "recreate") {
        handleRecreateAvatar();
      } else {
        setActiveTab(tabName);
      }
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab guestAvatar={guestAvatar} />;
      case "diary":
        return <DiaryTab />;
      case "gallery":
        return <GalleryTab />;
      case "guestbook":
        return <GuestbookTab guestAvatar={guestAvatar} />;
      case "map":
        return <MapTab />;
      case "dotori":
        return <DotoriTab />;
      default:
        return <HomeTab guestAvatar={guestAvatar} />;
    }
  };

  // Base responsive scaling values
  const designWidth = 800; // Container width + sidebar tabs
  const designHeight = 600;
  
  // Calculate perfect scaling multiplier based on screen width
  const scale = windowSize.width < designWidth ? (windowSize.width - 16) / designWidth : 1;
  const isPortrait = windowSize.width < windowSize.height && windowSize.width < 768;

  // If no customized avatar, force the Dressing Room / Gacha screen first!
  if (!guestAvatar) {
    return (
      <div style={{ width: "100%", padding: "10px" }}>
        <CharacterCreator onEnterInvite={handleEnterInvite} />
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }}>
      {/* 🔄 Retro Landscape Guide Banner for mobile Portrait users */}
      {isPortrait && showRotateBanner && (
        <div style={{
          width: "calc(100% - 16px)",
          maxWidth: "480px",
          background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
          border: "2px solid var(--cy-orange)",
          borderRadius: "8px",
          padding: "8px 10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          zIndex: 9999,
          animation: "bounce 0.8s infinite alternate"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "16px" }}>🔄</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "var(--cy-orange)" }}>
                스마트폰 화면을 가로(Landscape)로 돌려보세요!
              </span>
              <span style={{ fontSize: "8px", color: "#666", marginTop: "1px" }}>
                진짜 싸이월드 가로 2단 다이어리 크기로 시원하게 보여요!
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowRotateBanner(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "10px",
              color: "#888",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "2px"
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Outer wrapper to reserve proper space in document flow for transform-scaled element */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: `${designHeight * scale}px`,
        overflow: "visible",
        padding: "8px 0"
      }}>
        {/* Scale Container */}
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          width: "800px" // Explicitly lock base landscape design canvas width
        }}>
          
          {/* Main Cyworld Double-Border Frame */}
          <div className="mini-homepage-container" style={{ margin: "0 auto" }}>
            <div className="homepage-board">
              
              {/* Header area */}
              <header className="homepage-header">
                <div className="visitor-counter">
                  <span>TODAY</span>
                  <span className="today">{todayVisitors}</span>
                  <span style={{ color: "#d3d3d3", margin: "0 1px" }}>|</span>
                  <span>TOTAL</span>
                  <span>{totalVisitors}</span>
                </div>
                
                <div className="homepage-title">
                  🏡 [쭁♥꾱] 우리 결혼합니다! 축하 미니홈피 💍
                </div>
                
                <BGMPlayer />
              </header>

              {/* Core Content Layout (Always Row / dual columns) */}
              <main className="homepage-body">
                
                {/* Left Column Profile Box */}
                <section className="homepage-left-col">
                  <div className="profile-box">
                    {/* Mood bar */}
                    <div className="today-mood">
                      <span>오늘의 기분</span>
                      <span style={{ color: "var(--cy-orange)", fontWeight: "bold" }} className="mood-emoji">
                        설렘 100% 💖
                      </span>
                    </div>

                    {/* Couple Profile Frame */}
                    <div className="profile-img-wrapper">
                      <svg width="100%" height="100%" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: "#fcf6f2", border: "1px dashed var(--cy-orange)" }}>
                        <rect width="150" height="150" fill="#ffefe5" opacity="0.4"/>
                        {/* Cute pixel-art couple silhouette */}
                        <circle cx="60" cy="65" r="18" fill="#a0b6c6" stroke="#333" strokeWidth="1.5"/>
                        <rect x="42" y="83" width="36" height="40" rx="3" fill="#a0b6c6" stroke="#333" strokeWidth="1.5"/>
                        <circle cx="92" cy="72" r="15" fill="#f48fb1" stroke="#333" strokeWidth="1.5"/>
                        <path d="M78 87L107 87L103 123L81 123Z" fill="#f48fb1" stroke="#333" strokeWidth="1.5"/>
                        <path d="M72 75Q76 72 80 75" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                        {/* Little Red Heart floating */}
                        <path d="M75 42 C75 39, 78 37, 80 40 C82 37, 85 39, 85 42 Q85 47, 80 50 Q75 47, 75 42 Z" fill="red" style={{ animation: "bounce 0.8s infinite alternate" }}/>
                        <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fill="var(--cy-orange)" fontSize="10px" fontWeight="bold">Jjong & Kkyong</text>
                      </svg>
                    </div>

                    {/* Couple Names */}
                    <div className="profile-couple-info">
                      <div className="couple-names">
                        👨‍💼 채종호 ♥ 👩‍💼 나희경
                      </div>
                      <div className="couple-details">
                        2025.10.25 (토) 낮 12시<br />
                        선릉 아펠가모 15층
                      </div>
                    </div>

                    {/* Profile Description */}
                    <div className="profile-desc">
                      싸이월드 레트로 미니홈피에 오신 것을 환영합니다! 🌳🏡💍<br/>
                      서로 아끼고 평생 짝꿍이 될 저희 두 사람의 시작을 축하해 주세요!
                    </div>

                    {/* Guest Custom Avatar Info */}
                    <div style={{
                      border: "1px dashed var(--cy-border-color)",
                      borderRadius: "4px",
                      padding: "6px",
                      fontSize: "9px",
                      textAlign: "center",
                      background: "#fafafa"
                    }}>
                      <div style={{ color: "#666", marginBottom: "4px" }}>나의 미니미 등급:</div>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                        <div style={{ transform: "scale(0.6)", width: "25px", height: "45px" }}>
                          <MinimeSprite avatar={guestAvatar} scale={0.6} />
                        </div>
                        <span style={{
                          fontWeight: "bold",
                          color: guestAvatar.grade === "super_rare" ? "var(--color-super-rare)" : guestAvatar.grade === "unique" ? "var(--color-unique)" : guestAvatar.grade === "rare" ? "var(--color-rare)" : "#555"
                        }}>
                          {guestAvatar.grade === "super_rare" ? "슈퍼레어천사" : guestAvatar.grade === "unique" ? "유니크골드" : guestAvatar.grade === "rare" ? "레어락스타" : "기본미니미"}
                        </span>
                      </div>
                      <button
                        onClick={handleRecreateAvatar}
                        style={{
                          background: "white",
                          border: "1px solid #ccc",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          fontSize: "8px",
                          cursor: "pointer",
                          color: "#666"
                        }}
                      >
                        🎲 캐릭터 다시 뽑기
                      </button>
                    </div>

                    {/* Ilchon Quicklinks Dropdown (일촌 파도타기) */}
                    <div className="wave-links">
                      <select className="wave-select" onChange={handleWaveLinkChange} value={activeTab}>
                        <option value="">::: 일촌 파도타기 :::</option>
                        <option value="home">🏡 미니룸 홈</option>
                        <option value="diary">📖 연애 다이어리</option>
                        <option value="gallery">🖼️ 웨딩 사진첩</option>
                        <option value="guestbook">✉️ 축하 방명록</option>
                        <option value="map">📍 오시는 길 / RSVP</option>
                        <option value="dotori">🐿️ 도토리 충전소</option>
                        <option value="recreate">🎲 캐릭터 재생성</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Right Column Content Viewport */}
                <section className="homepage-right-col">
                  {renderActiveTab()}
                </section>
              </main>

              {/* Right Floating Orange Side Menu Tabs (PC style permanently side-by-side) */}
              <nav className="homepage-tabs">
                <button 
                  className={`menu-tab ${activeTab === "home" ? "active" : ""}`}
                  onClick={() => setActiveTab("home")}
                >
                  홈
                </button>
                <button 
                  className={`menu-tab ${activeTab === "diary" ? "active" : ""}`}
                  onClick={() => setActiveTab("diary")}
                >
                  다이어리
                </button>
                <button 
                  className={`menu-tab ${activeTab === "gallery" ? "active" : ""}`}
                  onClick={() => setActiveTab("gallery")}
                >
                  사진첩
                </button>
                <button 
                  className={`menu-tab ${activeTab === "guestbook" ? "active" : ""}`}
                  onClick={() => setActiveTab("guestbook")}
                >
                  방명록
                </button>
                <button 
                  className={`menu-tab ${activeTab === "map" ? "active" : ""}`}
                  onClick={() => setActiveTab("map")}
                >
                  오시는길
                </button>
                <button 
                  className={`menu-tab ${activeTab === "dotori" ? "active" : ""}`}
                  onClick={() => setActiveTab("dotori")}
                >
                  도토리
                </button>
              </nav>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
