// src/components/GalleryTab.jsx
import React, { useState } from "react";
import { Folder, Image as ImageIcon, ZoomIn, MessageCircle, Heart } from "lucide-react";

export default function GalleryTab() {
  const [selectedFolder, setSelectedFolder] = useState("wedding");
  const [zoomedImage, setZoomedImage] = useState(null); // image object or null
  const [likes, setLikes] = useState({ 1: 52, 2: 38, 3: 47 });

  const folders = [
    { id: "wedding", name: "📁 웨딩 화보 (Wedding)" },
    { id: "daily", name: "📁 일상 데이트 (Daily)" },
    { id: "trip", name: "📁 추억 여행 (Trip)" }
  ];

  // Elegant pixelated / silhouette SVGs representing romantic couple scenes
  const photos = [
    {
      id: 1,
      folder: "wedding",
      title: "쭁♥꾱의 설레는 웨딩 화보 ˚✩",
      date: "2025.09.18",
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: "#ffefe5" }}>
          {/* Backdrop Sunset Glow */}
          <circle cx="150" cy="110" r="90" fill="#ffd54f" opacity="0.6" />
          <circle cx="150" cy="110" r="70" fill="#ffb74d" opacity="0.5" />
          {/* Wedding Arch */}
          <path d="M70 180 C70 60, 230 60, 230 180" stroke="#795548" strokeWidth="6" fill="none" strokeDasharray="6 4" />
          {/* Couple Silhouette */}
          <circle cx="138" cy="110" r="14" fill="#37474f" />
          <path d="M125 124 H151 V180 H125 Z" fill="#37474f" />
          
          <circle cx="162" cy="116" r="12.5" fill="#263238" />
          <path d="M152 128.5 L174 128.5 L178 180 H148 Z" fill="#263238" />
          <path d="M145 128.5 L179 175 L183 180 H138 Z" fill="#ffffff" opacity="0.9" /> {/* Bridal veil/skirt */}

          {/* Little sparkles and hearts */}
          <path d="M150 78 C150 76, 152 74, 154 76 C156 74, 158 76, 158 78 Q158 82, 154 85 Q150 82, 150 78 Z" fill="red" />
          <polygon points="90,70 93,76 100,77 95,82 96,89 90,85 84,89 85,82 80,77 87,76" fill="#fff" opacity="0.8" />
          <polygon points="210,90 212,94 217,95 213,99 214,104 210,101 206,104 207,99 203,95 208,94" fill="#fff" opacity="0.8" />
          
          {/* Ground */}
          <rect y="180" width="300" height="40" fill="#81c784" />
        </svg>
      ),
      desc: "수줍게 코끝을 맞댄 우리 둘... ♥ 평생 손잡고 웃으며 살아가자 약속한 바로 그날의 기록입니다. ˚✩"
    },
    {
      id: 2,
      folder: "daily",
      title: "가장 우리다운 일상 데이트 ☕",
      date: "2025.04.12",
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: "#e0f2f1" }}>
          {/* Retro Cafe Window Grid */}
          <rect x="30" y="30" width="240" height="120" fill="#e0f7fa" stroke="#4db6ac" strokeWidth="2" />
          <line x1="150" y1="30" x2="150" y2="150" stroke="#4db6ac" strokeWidth="1.5" />
          <line x1="30" y1="90" x2="270" y2="90" stroke="#4db6ac" strokeWidth="1.5" />

          {/* Table */}
          <rect x="80" y="140" width="140" height="40" rx="3" fill="#8d6e63" stroke="#5d4037" strokeWidth="2" />

          {/* Coffee Mugs */}
          <rect x="115" y="130" width="10" height="10" rx="1" fill="#ff8a80" />
          <rect x="175" y="130" width="10" height="10" rx="1" fill="#80d8ff" />
          {/* Coffee steam */}
          <path d="M120 125 Q118 120 122 115" stroke="#ff8a80" strokeWidth="1" fill="none" />
          <path d="M180 125 Q178 120 182 115" stroke="#80d8ff" strokeWidth="1" fill="none" />

          {/* Couple Silhouette */}
          {/* Groom */}
          <circle cx="70" cy="115" r="15" fill="#37474f" />
          <path d="M50 130 H90 V180 H50 Z" fill="#37474f" />
          {/* Bride */}
          <circle cx="230" cy="115" r="14" fill="#263238" />
          <path d="M210 129 H250 V180 H210 Z" fill="#263238" />

          {/* Ground */}
          <rect y="178" width="300" height="42" fill="#dfcdbd" stroke="#bcaaa4" strokeWidth="1" />
        </svg>
      ),
      desc: "스타벅스 단골 매장에 앉아 소소하게 조잘조잘 대화 나누기만 해도 세상에서 가장 행복해지는 쭁♥꾱 커플입니다. ☕✨"
    },
    {
      id: 3,
      folder: "trip",
      title: "낭만 가득했던 제주도 해변 여행 🌊",
      date: "2024.08.05",
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: "#e8f5e9" }}>
          {/* Sun & Sea backdrop */}
          <rect y="100" width="300" height="120" fill="#29b6f6" />
          <circle cx="70" cy="90" r="30" fill="#ff7043" />
          
          {/* Sandy Beach */}
          <path d="M0 160 Q150 140 300 170 L300 220 L0 220 Z" fill="#ffe082" />

          {/* Small Palm Tree */}
          <rect x="250" y="100" width="6" height="70" fill="#8d6e63" />
          <path d="M253 100 Q210 90 220 70 Q240 70 253 100" fill="#4caf50" />
          <path d="M253 100 Q290 90 280 70 Q260 70 253 100" fill="#4caf50" />

          {/* Couple Silhouette walking hand in hand */}
          <circle cx="120" cy="110" r="13" fill="#37474f" />
          <path d="M108 123 H132 V170 H108 Z" fill="#37474f" />
          <circle cx="150" cy="113" r="12" fill="#263238" />
          <path d="M138 125 H162 V172 H138 Z" fill="#263238" />

          {/* Sea waves sparkles */}
          <line x1="30" y1="120" x2="60" y2="120" stroke="white" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="160" y1="140" x2="200" y2="140" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      ),
      desc: "제주도 푸른 바다의 해안선을 맨발로 걸으며 영원히 어깨를 기댄 채 같은 방향을 바라보자 귓가에 소곤거렸던 눈부신 추억입니다. 🌴🌊"
    }
  ];

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const filteredPhotos = photos.filter(p => p.folder === selectedFolder);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {/* Title */}
      <div style={{
        background: "linear-gradient(135deg, #00b0ff 0%, #0080ff 100%)",
        border: "1.5px solid #0059b3",
        color: "white",
        borderRadius: "6px",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px",
        boxShadow: "0 2px 4px rgba(0, 128, 255, 0.15)"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold" }}>
          <ImageIcon size={13} />
          <span>🖼️ GALLERY (웨딩 사진첩)</span>
        </span>
        <span style={{ fontSize: "9px" }}>[총 3장의 추억]</span>
      </div>

      {/* Two Columns: Left Folder Tree, Right Photo List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        {/* Horizontal Folder selector for mobile touch optimization */}
        <div style={{
          display: "flex",
          gap: "5px",
          backgroundColor: "#f5f5f5",
          border: "1px dashed var(--cy-border-color)",
          borderRadius: "6px",
          padding: "6px"
        }}>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              style={{
                flex: 1,
                fontSize: "9px",
                padding: "6px 4px",
                borderRadius: "4px",
                border: selectedFolder === folder.id ? "1.5px solid #0080ff" : "1px solid #ccc",
                backgroundColor: selectedFolder === folder.id ? "#e0f2f1" : "white",
                color: selectedFolder === folder.id ? "#0080ff" : "#555",
                fontWeight: selectedFolder === folder.id ? "bold" : "normal",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              {folder.name.split(" ")[1]} {/* Short name */}
            </button>
          ))}
        </div>

        {/* Photo Feed List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                backgroundColor: "white",
                border: "1.5px solid #c9d5de",
                borderRadius: "6px",
                padding: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
              }}
            >
              {/* Photo Title bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dashed #ccc",
                paddingBottom: "4px",
                marginBottom: "6px"
              }}>
                <span style={{ fontSize: "10px", fontWeight: "bold", color: "#1c4966" }}>
                  {photo.title}
                </span>
                <span style={{ fontSize: "8px", color: "var(--cy-text-muted)" }}>
                  {photo.date}
                </span>
              </div>

              {/* Photo Frame Wrapper */}
              <div 
                onClick={() => setZoomedImage(photo)}
                style={{
                  width: "100%",
                  border: "4px double var(--cy-border-color)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "zoom-in",
                  position: "relative"
                }}
              >
                {photo.svg}
                {/* Hover zoom icon overlay */}
                <div style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "6px",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  padding: "3px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <ZoomIn size={10} />
                </div>
              </div>

              {/* Photo description */}
              <div style={{
                fontSize: "9.5px",
                color: "#444",
                margin: "8px 0",
                lineHeight: "1.4",
                padding: "6px",
                background: "#fbfcfc",
                borderRadius: "4px",
                border: "1px dotted #e0e0e0"
              }}>
                {photo.desc}
              </div>

              {/* Action buttons (Like / Share) */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px dotted #eee",
                paddingTop: "6px"
              }}>
                <button
                  onClick={() => handleLike(photo.id)}
                  style={{
                    background: "#fff1f3",
                    border: "1px solid #ffccd3",
                    borderRadius: "4px",
                    color: "#e91e63",
                    padding: "3px 8px",
                    fontSize: "8.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    fontWeight: "bold"
                  }}
                >
                  <Heart size={9} fill="#e91e63" />
                  <span>일촌 스크랩 ({likes[photo.id]})</span>
                </button>

                <span style={{ fontSize: "8px", color: "var(--cy-text-blue)", display: "flex", alignItems: "center", gap: "2px" }}>
                  <MessageCircle size={9} />
                  <span>댓글 0개</span>
                </span>
              </div>
            </div>
          ))}

          {filteredPhotos.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "30px",
              color: "#888",
              fontSize: "10px",
              border: "1px dashed #ccc",
              borderRadius: "6px"
            }}>
              📁 아직 업로드된 사진이 없습니다! 곧 추가될 예정입니다.
            </div>
          )}
        </div>
      </div>

      {/* --- Image Zoom Lightbox Modal --- */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px"
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "340px",
              backgroundColor: "white",
              border: "6px double #333",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: "#1c4966" }}>{zoomedImage.title}</span>
              <button 
                onClick={() => setZoomedImage(null)}
                style={{ background: "none", border: "none", fontSize: "12px", fontWeight: "bold", cursor: "pointer", color: "#999" }}
              >
                X
              </button>
            </div>
            <div style={{ border: "2px solid #ccc", overflow: "hidden", borderRadius: "4px" }}>
              {zoomedImage.svg}
            </div>
            <p style={{ fontSize: "9px", color: "#444", marginTop: "8px", lineHeight: "1.4" }}>
              {zoomedImage.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
