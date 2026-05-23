// src/components/CharacterCreator.jsx
import React, { useState, useEffect } from "react";
import { Dices, Sparkles, Trophy, Check, ArrowRight } from "lucide-react";

// 1. Definition of Avatar Customization Options (SVG definitions mapped in MinimeSprite)
export const PARTS = {
  accessory: [
    { id: "accessory_none", name: "❌ 장식 없음", type: "common" },
    { id: "accessory_ribbon", name: "🎀 러블리 왕리본", type: "common" },
    { id: "accessory_bow", name: "💝 웨딩 보타이", type: "common" },
    { id: "accessory_party", name: "🎉 미니 파티햇", type: "common" },
    { id: "accessory_glasses", name: "🕶️ 힙스터 선글라스", type: "rare" },
    { id: "accessory_silkhat", name: "🎩 웨딩 실크햇", type: "unique" },
    { id: "accessory_crown", name: "👑 반짝 골드왕관", type: "unique" },
    { id: "accessory_halo", name: "👼 축복의 천사링", type: "super_rare" },
    { id: "accessory_veil", name: "👰 로맨틱 면사포", type: "super_rare" }
  ],
  animal: [
    { id: "animal_hippo", name: "🦛 신랑 듬직하마", type: "common" },
    { id: "animal_cat", name: "🐱 신부 러블리냥", type: "common" },
    { id: "animal_bear", name: "🐻 하객 둥글곰", type: "common" },
    { id: "animal_rabbit", name: "🐰 하객 쫑긋토끼", type: "common" },
    { id: "animal_dog", name: "🐶 하객 순둥댕댕", type: "common" },
    { id: "animal_fox", name: "🦊 하객 세련여우", type: "common" },
    { id: "animal_duck", name: "🦆 하객 꽥꽥오리", type: "common" },
    { id: "animal_frog", name: "🐸 하객 볼록개구리", type: "common" }
  ],
  top: [
    { id: "top_basic", name: "오렌지 니트", type: "common" },
    { id: "top_hoodie", name: "민트 후드티", type: "common" },
    { id: "top_jacket", name: "레트로 떡볶이코트", type: "common" },
    { id: "top_punk", name: "🎸 가죽 라이더자켓", type: "rare" },
    { id: "top_gold", name: "✨ 럭셔리 골드 자켓", type: "unique" },
    { id: "top_wedding", name: "👔 스페셜 턱시도/드레스", type: "super_rare" }
  ],
  bottom: [
    { id: "bottom_jeans", name: "기본 청바지", type: "common" },
    { id: "bottom_cargo", name: "밀리터리 카고팬츠", type: "common" },
    { id: "bottom_skirt", name: "귀여운 플리츠스커트", type: "common" },
    { id: "bottom_neon", name: "⚡ 네온 조거팬츠", type: "rare" },
    { id: "bottom_gold", name: "⚜️ 로얄 골드 하의", type: "unique" },
    { id: "bottom_wedding", name: "💍 화이트 레이스스커트", type: "super_rare" }
  ],
  shoes: [
    { id: "shoes_sneakers", name: "빨간 운동화", type: "common" },
    { id: "shoes_boots", name: "클래식 구두", type: "common" },
    { id: "shoes_slippers", name: "편안한 삼선슬리퍼", type: "common" },
    { id: "shoes_skates", name: "🛼 네온 롤러블레이드", type: "rare" },
    { id: "shoes_gold", name: "👑 황금 보석구두", type: "unique" },
    { id: "shoes_cloud", name: "☁️ 날개 구름슈즈", type: "super_rare" }
  ]
};

// 2. Component to Render the SVG Animal Minime Character
export function MinimeSprite({ avatar, scale = 1, isWalking = false }) {
  const { accessory, animal, top, bottom, shoes, grade } = avatar;

  // Grade styling classes
  let containerClass = "minime-sprite";
  if (grade === "rare") containerClass += " rare-effect";
  else if (grade === "unique") containerClass += " unique-effect";
  else if (grade === "super_rare") containerClass += " super-rare-effect";

  // Walking bounce animation style
  const bounceStyle = isWalking 
    ? { animation: "bounce 0.6s infinite alternate ease-in-out" }
    : {};

  return (
    <div className={containerClass} style={{ display: "inline-block", position: "relative", width: `${42 * scale}px`, height: `${75 * scale}px`, ...bounceStyle }}>
      
      {/* 2.5D Sprite bounce shadow */}
      <div style={{ position: "absolute", bottom: "-3px", left: "5%", width: "90%", height: "6px", background: "rgba(124,93,65,0.12)", borderRadius: "50%", zIndex: 0 }}></div>

      {/* --- Super Rare: White Angel Wings --- */}
      {grade === "super_rare" && (
        <svg style={{ position: "absolute", top: "15px", left: "-25px", width: "92px", height: "55px", zIndex: 1, pointerEvents: "none" }} viewBox="0 0 92 55">
          <path className="flapping-wing-left" d="M30 35 C12 35, 2 22, 8 8 C14 2, 24 12, 30 25 Z" fill="url(#wing_grad)" stroke="#f48fb1" strokeWidth="1" />
          <path className="flapping-wing-right" d="M62 35 C80 35, 90 22, 84 8 C78 2, 68 12, 62 25 Z" fill="url(#wing_grad)" stroke="#f48fb1" strokeWidth="1" />
          <defs>
            <linearGradient id="wing_grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#fff0f5" />
              <stop offset="100%" stopColor="#f8bbd0" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* --- Unique: Glowing Heart Aura --- */}
      {grade === "unique" && (
        <div className="sparkles-container">
          <div className="sparkle" style={{ left: "10%", animationDelay: "0s" }}></div>
          <div className="sparkle" style={{ left: "50%", animationDelay: "0.4s" }}></div>
          <div className="sparkle" style={{ left: "80%", animationDelay: "0.8s" }}></div>
          <svg style={{ position: "absolute", top: "0", left: "-5px", width: "52px", height: "75px", zIndex: 1, pointerEvents: "none", opacity: 0.65 }} viewBox="0 0 52 75">
            <path d="M12 25 C12 21, 15 19, 17 22 C19 19, 22 21, 22 25 C22 30, 17 34, 17 34 C17 34, 12 30, 12 25 Z" fill="#f48fb1" style={{ animation: "sparkle-float 2.2s infinite ease-in-out" }} />
            <path d="M28 45 C28 42, 30 40, 32 42 C34 40, 36 42, 36 45 C36 49, 32 52, 32 52 C32 52, 28 49, 28 45 Z" fill="#e91e63" style={{ animation: "sparkle-float 1.8s infinite ease-in-out", animationDelay: "0.6s" }} />
          </svg>
        </div>
      )}

      {/* --- Rare: Gold Stars --- */}
      {grade === "rare" && (
        <div className="sparkles-container">
          <div className="sparkle" style={{ left: "30%", animationDelay: "0.2s", background: "#ffb74d" }}></div>
          <div className="sparkle" style={{ left: "70%", animationDelay: "0.6s", background: "#ffd54f" }}></div>
        </div>
      )}

      <svg width="100%" height="100%" viewBox="0 0 42 75" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 2 }}>
        <defs>
          {/* 1. Animal Head radial gradients (Cyworld soft pastels) */}
          <radialGradient id="hippo_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>
          <radialGradient id="cat_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff9db" />
            <stop offset="70%" stopColor="#ffe8cc" />
            <stop offset="100%" stopColor="#ffa94d" />
          </radialGradient>
          <radialGradient id="bear_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ebdcd5" />
            <stop offset="70%" stopColor="#caab9f" />
            <stop offset="100%" stopColor="#8d6e63" />
          </radialGradient>
          <radialGradient id="rabbit_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fcedf2" />
            <stop offset="100%" stopColor="#fbc2eb" />
          </radialGradient>
          <radialGradient id="dog_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="70%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#f97316" />
          </radialGradient>
          <radialGradient id="fox_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff5f5" />
            <stop offset="70%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#ef4444" />
          </radialGradient>
          <radialGradient id="duck_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fefefe" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>
          <radialGradient id="frog_grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="70%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>

          {/* 2. Clothes Gradients */}
          <linearGradient id="body_skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe8cc" />
            <stop offset="100%" stopColor="#ffc078" />
          </linearGradient>
          <linearGradient id="jeans_grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4dabf7" />
            <stop offset="50%" stopColor="#228be6" />
            <stop offset="100%" stopColor="#1c7ed6" />
          </linearGradient>
          <linearGradient id="tux_grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#495057" />
            <stop offset="100%" stopColor="#212529" />
          </linearGradient>
          <linearGradient id="gold_grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffec99" />
            <stop offset="50%" stopColor="#fcc419" />
            <stop offset="100%" stopColor="#e64980" />
          </linearGradient>
          <linearGradient id="dress_grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fff0f6" />
            <stop offset="100%" stopColor="#fcc2d7" />
          </linearGradient>
        </defs>

        {/* --- 1. BODY FRAME & HANDS (2등신 공통 뼈대) --- */}
        {/* Neck */}
        <rect x="18" y="27" width="6" height="4" fill="url(#body_skin)" stroke="#4a3e3d" strokeWidth="1"/>

        {/* Body trunk base */}
        <path d="M11 30C11 30, 11 29, 13 29H29C31 29, 31 30, 31 30V63H11V30Z" fill="#f8fafc" stroke="#4a3e3d" strokeWidth="1.2"/>

        {/* Cute Hands */}
        <circle cx="7" cy="38" r="3.2" fill="url(#body_skin)" stroke="#4a3e3d" strokeWidth="1"/>
        <circle cx="35" cy="38" r="3.2" fill="url(#body_skin)" stroke="#4a3e3d" strokeWidth="1"/>
        <path d="M7 35L11 32" stroke="#4a3e3d" strokeWidth="1.2"/>
        <path d="M35 35L31 32" stroke="#4a3e3d" strokeWidth="1.2"/>

        {/* --- 2. BOTTOMS (하의) --- */}
        {bottom === "bottom_jeans" && (
          <g>
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="url(#jeans_grad)" />
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="none" stroke="#4a3e3d" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="21" y1="47" x2="21" y2="53" stroke="#4a3e3d" strokeWidth="1.2" />
          </g>
        )}
        {bottom === "bottom_cargo" && (
          <g>
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="#8d6e63" />
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="none" stroke="#4a3e3d" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="21" y1="47" x2="21" y2="53" stroke="#4a3e3d" strokeWidth="1.2" />
            <rect x="7.5" y="52" width="3" height="5" rx="0.5" fill="#6d4c41" stroke="#4a3e3d" strokeWidth="0.8" />
            <rect x="31.5" y="52" width="3" height="5" rx="0.5" fill="#6d4c41" stroke="#4a3e3d" strokeWidth="0.8" />
          </g>
        )}
        {bottom === "bottom_skirt" && (
          <g>
            <path d="M12 47 L8 62 Q21 65 34 62 L30 47 Z" fill="#fcc2d7" />
            <path d="M12 47 L8 62 Q21 65 34 62 L30 47 Z" fill="none" stroke="#4a3e3d" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="17" y1="47" x2="14" y2="63" stroke="#e64980" strokeWidth="0.8" />
            <line x1="21" y1="47" x2="21" y2="64" stroke="#e64980" strokeWidth="0.8" />
            <line x1="25" y1="47" x2="28" y2="63" stroke="#e64980" strokeWidth="0.8" />
          </g>
        )}
        {bottom === "bottom_neon" && (
          <g>
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="#b2f2bb" />
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="none" stroke="#2b8a3e" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="21" y1="47" x2="21" y2="53" stroke="#2b8a3e" strokeWidth="1.2" />
          </g>
        )}
        {bottom === "bottom_gold" && (
          <g>
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="url(#gold_grad)" />
            <path d="M11 47 H31 V63 C31 65, 22 65, 22 63 V53 H20 V63 C20 65, 11 65, 11 63 Z" fill="none" stroke="#fcc419" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="21" y1="47" x2="21" y2="53" stroke="#fcc419" strokeWidth="1.2" />
          </g>
        )}
        {bottom === "bottom_wedding" && (
          <g>
            <path d="M12 46 L6 62 Q21 66 36 62 L30 46 Z" fill="url(#dress_grad)" />
            <path d="M12 46 L6 62 Q21 66 36 62 L30 46 Z" fill="none" stroke="#f783ac" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M10 52 Q21 55 32 52" fill="none" stroke="#ffa8a8" strokeWidth="0.8" strokeDasharray="2 2" />
            <path d="M8 58 Q21 61 34 58" fill="none" stroke="#ffa8a8" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>
        )}

        {/* --- 3. SHOES (신발) --- */}
        {shoes === "shoes_sneakers" && (
          <>
            <path d="M9 64 H19 V69 C19 70, 9 70, 9 69 Z" fill="#ff6b6b" stroke="#4a3e3d" strokeWidth="1"/>
            <path d="M23 64 H33 V69 C33 70, 23 70, 23 69 Z" fill="#ff6b6b" stroke="#4a3e3d" strokeWidth="1"/>
            <line x1="12" y1="66" x2="16" y2="66" stroke="white" strokeWidth="1"/>
            <line x1="26" y1="66" x2="30" y2="66" stroke="white" strokeWidth="1"/>
          </>
        )}
        {shoes === "shoes_boots" && (
          <>
            <path d="M9 63 H19 V69 C19 70, 9 70, 9 69 Z" fill="#5c940d" stroke="#2b8a3e" strokeWidth="1"/>
            <path d="M23 63 H33 V69 C33 70, 23 70, 23 69 Z" fill="#5c940d" stroke="#2b8a3e" strokeWidth="1"/>
          </>
        )}
        {shoes === "shoes_slippers" && (
          <>
            <rect x="9" y="66" width="10" height="3" rx="1" fill="#495057" stroke="#212529" strokeWidth="0.8"/>
            <rect x="23" y="66" width="10" height="3" rx="1" fill="#495057" stroke="#212529" strokeWidth="0.8"/>
            <line x1="12" y1="67" x2="16" y2="67" stroke="white" strokeWidth="0.8"/>
            <line x1="26" y1="67" x2="30" y2="67" stroke="white" strokeWidth="0.8"/>
          </>
        )}
        {shoes === "shoes_skates" && (
          <>
            <rect x="9" y="63" width="10" height="5" rx="1" fill="#38d9a9" stroke="#0ca678" strokeWidth="1"/>
            <rect x="23" y="63" width="10" height="5" rx="1" fill="#38d9a9" stroke="#0ca678" strokeWidth="1"/>
            <circle cx="11" cy="70" r="2.2" fill="#ff922b" stroke="#333" strokeWidth="0.8"/>
            <circle cx="17" cy="70" r="2.2" fill="#ff922b" stroke="#333" strokeWidth="0.8"/>
            <circle cx="25" cy="70" r="2.2" fill="#ff922b" stroke="#333" strokeWidth="0.8"/>
            <circle cx="31" cy="70" r="2.2" fill="#ff922b" stroke="#333" strokeWidth="0.8"/>
          </>
        )}
        {shoes === "shoes_gold" && (
          <>
            <path d="M9 63 H19 V69 C19 70, 9 70, 9 69 Z" fill="url(#gold_grad)" stroke="#fab005" strokeWidth="1"/>
            <path d="M23 63 H33 V69 C33 70, 23 70, 23 69 Z" fill="url(#gold_grad)" stroke="#fab005" strokeWidth="1"/>
          </>
        )}
        {shoes === "shoes_cloud" && (
          <>
            <path d="M8 63 C8 63, 6 62, 5 65 C4 68, 9 69, 19 69 V63 Z" fill="#ffffff" stroke="#a5d8ff" strokeWidth="1"/>
            <path d="M23 63 V69 C33 69, 38 68, 37 65 C36 62, 34 63, 34 63 Z" fill="#ffffff" stroke="#a5d8ff" strokeWidth="1"/>
            <path d="M4 64 C2 64, 2 67, 5 67" stroke="#74c0fc" strokeWidth="0.8"/>
            <path d="M38 64 C40 64, 40 67, 37 67" stroke="#74c0fc" strokeWidth="0.8"/>
          </>
        )}

        {/* --- 4. TOPS (상의) --- */}
        {top === "top_basic" && (
          <path d="M11 30 H31 V48 H11 Z" fill="#f76707" stroke="#4a3e3d" strokeWidth="1.2" />
        )}
        {top === "top_hoodie" && (
          <>
            <path d="M11 29 H31 V48 H11 Z" fill="#20c997" stroke="#4a3e3d" strokeWidth="1.2" />
            <path d="M15 29 C15 33, 27 33, 27 29 Z" fill="#0ca678" stroke="#4a3e3d" strokeWidth="1"/>
            <line x1="19" y1="32" x2="19" y2="38" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="23" y1="32" x2="23" y2="38" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M15 40 H27 V46 H15 Z" fill="#0ca678" rx="2" />
          </>
        )}
        {top === "top_jacket" && (
          <>
            <path d="M11 29 H31 V48 H11 Z" fill="#78909c" stroke="#4a3e3d" strokeWidth="1.2" />
            <line x1="21" y1="29" x2="21" y2="48" stroke="#37474f" strokeWidth="1.2"/>
            <circle cx="17" cy="35" r="1.5" fill="#5d4037"/>
            <line x1="17" y1="35" x2="21" y2="35" stroke="#37474f" strokeWidth="1"/>
            <circle cx="17" cy="41" r="1.5" fill="#5d4037"/>
            <line x1="17" y1="41" x2="21" y2="41" stroke="#37474f" strokeWidth="1"/>
          </>
        )}
        {top === "top_punk" && (
          <>
            <path d="M11 29 H31 V48 H11 Z" fill="#343a40" stroke="#4a3e3d" strokeWidth="1.2" />
            <path d="M14 29 L21 44 L28 29" stroke="#dee2e6" strokeWidth="1.2" fill="none"/>
            <circle cx="16" cy="33" r="1" fill="#fcc419"/>
            <circle cx="26" cy="33" r="1" fill="#fcc419"/>
          </>
        )}
        {top === "top_gold" && (
          <>
            <path d="M11 29 H31 V48 H11 Z" fill="url(#gold_grad)" stroke="#cc5de8" strokeWidth="1.2" />
            <path d="M17 33 L25 37 V31 L17 35 Z" fill="#212529" stroke="#000" strokeWidth="0.8"/>
            <path d="M25 33 L17 37 V31 L25 35 Z" fill="#212529" stroke="#000" strokeWidth="0.8"/>
            <circle cx="21" cy="34" r="1.5" fill="#e64980"/>
          </>
        )}
        {top === "top_wedding" && (
          // 하의가 웨딩 스커트(bottom_wedding)이거나 동물이 고양이(animal_cat)일 때는 흰색 웨딩 드레스 탑 렌더링
          (bottom === "bottom_wedding" || animal === "animal_cat") ? (
            <>
              {/* 순백의 웨딩 드레스 탑 */}
              <path d="M11 29 H31 V48 H11 Z" fill="url(#dress_grad)" stroke="#f783ac" strokeWidth="1.2" />
              {/* 하트넥 라인 디테일 */}
              <path d="M11 29 Q21 36 31 29 V34 Q21 40 11 34 Z" fill="#ffffff" stroke="#f783ac" strokeWidth="0.8" />
              {/* 핑크색 비즈 장식 */}
              <circle cx="21" cy="34" r="1.5" fill="#f783ac" />
            </>
          ) : (
            <>
              {/* 멋진 신랑 턱시도 상의 */}
              <path d="M11 29 H31 V48 H11 Z" fill="url(#tux_grad)" stroke="#212529" strokeWidth="1.2" />
              <path d="M16 29 L21 40 L26 29 Z" fill="#ffffff" />
              <path d="M13 29 L18 39 L17 29 Z" fill="#111" />
              <path d="M29 29 L24 39 L25 29 Z" fill="#111" />
              {/* Red necktie */}
              <path d="M20 32 L22 32 L21 38 Z" fill="#fa5252"/>
              <circle cx="21" cy="31.5" r="1" fill="#fa5252" />
            </>
          )
        )}

        {/* Sleeves matching colors */}
        {top !== "" && (
          <>
            <path d="M4 31 H11 V37 H4 Z" fill={
              top === "top_basic" ? "#f76707" :
              top === "top_hoodie" ? "#20c997" :
              top === "top_jacket" ? "#78909c" :
              top === "top_punk" ? "#343a40" :
              top === "top_gold" ? "url(#gold_grad)" : 
              (bottom === "bottom_wedding" || animal === "animal_cat") ? "#ffffff" : "url(#tux_grad)"
            } stroke="#4a3e3d" strokeWidth="1.2" />
            <path d="M31 31 H38 V37 H31 Z" fill={
              top === "top_basic" ? "#f76707" :
              top === "top_hoodie" ? "#20c997" :
              top === "top_jacket" ? "#78909c" :
              top === "top_punk" ? "#343a40" :
              top === "top_gold" ? "url(#gold_grad)" :
              (bottom === "bottom_wedding" || animal === "animal_cat") ? "#ffffff" : "url(#tux_grad)"
            } stroke="#4a3e3d" strokeWidth="1.2" />
          </>
        )}

        {/* --- 5. ANIMAL HEAD BASE & DETAILS (동물 얼굴 렌더링) --- */}
        {animal === "animal_hippo" && (
          <g id="animal_hippo">
            {/* Hippo Head Base */}
            <path d="M9 13 C9 8, 13 6, 21 6 C29 6, 33 8, 33 13 C33 19, 34 23, 33 27 C32 29, 10 29, 9 27 Z" fill="url(#hippo_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Left Ear */}
            <circle cx="10" cy="8" r="2.5" fill="#94a3b8" stroke="#4a3e3d" strokeWidth="0.8"/>
            <circle cx="10" cy="8" r="1.2" fill="#ffbfa6" />
            {/* Right Ear */}
            <circle cx="32" cy="8" r="2.5" fill="#94a3b8" stroke="#4a3e3d" strokeWidth="0.8"/>
            <circle cx="32" cy="8" r="1.2" fill="#ffbfa6" />
            {/* Cute Muzzle */}
            <path d="M11 18 C11 15, 31 15, 31 18 C31 23, 28 26, 21 26 C14 26, 11 23, 11 18 Z" fill="#cbd5e1" stroke="#4a3e3d" strokeWidth="1" />
            {/* Nostrils */}
            <ellipse cx="17" cy="19.5" rx="0.8" ry="0.6" fill="#4a3e3d"/>
            <ellipse cx="25" cy="19.5" rx="0.8" ry="0.6" fill="#4a3e3d"/>
            {/* Round Eyes */}
            <circle cx="15.5" cy="14" r="1.5" fill="#1e293b" />
            <circle cx="15.0" cy="13.2" r="0.5" fill="#fff" />
            <circle cx="26.5" cy="14" r="1.5" fill="#1e293b" />
            <circle cx="26.0" cy="13.2" r="0.5" fill="#fff" />
            {/* Shading Cheeks */}
            <ellipse cx="13" cy="17.5" rx="2" ry="1" fill="#ffa4a2" opacity="0.6"/>
            <ellipse cx="29" cy="17.5" rx="2" ry="1" fill="#ffa4a2" opacity="0.6"/>
            {/* Cute Smile Mouth */}
            <path d="M19 22.5 Q21 24.5 23 22.5" stroke="#3e2723" strokeWidth="1" fill="none"/>
          </g>
        )}

        {animal === "animal_cat" && (
          <g id="animal_cat">
            {/* Cat Head Base */}
            <path d="M9 15 C9 11, 13 9, 21 9 C29 9, 33 11, 33 15 C33 21, 32 26, 32 28 C30 29, 12 29, 10 28 Z" fill="url(#cat_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Left Ear (Pointed) */}
            <path d="M9 14 L5 6 L14 11 Z" fill="#ffa94d" stroke="#4a3e3d" strokeWidth="1"/>
            <path d="M10 13 L7 8 L13 11 Z" fill="#ffc9c9" />
            {/* Right Ear (Pointed) */}
            <path d="M33 14 L37 6 L28 11 Z" fill="#ffa94d" stroke="#4a3e3d" strokeWidth="1"/>
            <path d="M32 13 L35 8 L29 11 Z" fill="#ffc9c9" />
            {/* Cat Whiskers */}
            <line x1="8" y1="20" x2="3" y2="19" stroke="#4a3e3d" strokeWidth="0.8"/>
            <line x1="8" y1="22" x2="2.5" y2="22.5" stroke="#4a3e3d" strokeWidth="0.8"/>
            <line x1="34" y1="20" x2="39" y2="19" stroke="#4a3e3d" strokeWidth="0.8"/>
            <line x1="34" y1="22" x2="39.5" y2="22.5" stroke="#4a3e3d" strokeWidth="0.8"/>
            {/* Sparkling Shiny Eyes */}
            <ellipse cx="15.5" cy="17" rx="2" ry="2.2" fill="#2b2b2b" />
            <circle cx="14.8" cy="16.2" r="0.7" fill="#fff" />
            <circle cx="16.2" cy="17.6" r="0.4" fill="#fff" />
            <ellipse cx="26.5" cy="17" rx="2" ry="2.2" fill="#2b2b2b" />
            <circle cx="25.8" cy="16.2" r="0.7" fill="#fff" />
            <circle cx="27.2" cy="17.6" r="0.4" fill="#fff" />
            {/* Tiny pink nose */}
            <polygon points="20,19.5 22,19.5 21,20.5" fill="#f783ac" />
            {/* Smile cat lips */}
            <path d="M19 22 C19.5 23, 21 23, 21 22 Q21 23 23 22" stroke="#4a3e3d" strokeWidth="0.8" fill="none"/>
            {/* Peach blush */}
            <ellipse cx="13" cy="20.5" rx="2" ry="1.2" fill="#ff8787" opacity="0.6"/>
            <ellipse cx="29" cy="20.5" rx="2" ry="1.2" fill="#ff8787" opacity="0.6"/>
          </g>
        )}

        {animal === "animal_bear" && (
          <g id="animal_bear">
            {/* Bear Head */}
            <path d="M9 14 C9 10, 13 8, 21 8 C29 8, 33 10, 33 14 C33 20, 32 25, 32 27 C30 28, 12 28, 10 27 Z" fill="url(#bear_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Ears */}
            <circle cx="10" cy="9" r="3.2" fill="#8d6e63" stroke="#4a3e3d" strokeWidth="0.8" />
            <circle cx="10" cy="9" r="1.5" fill="#ffc9c9" />
            <circle cx="32" cy="9" r="3.2" fill="#8d6e63" stroke="#4a3e3d" strokeWidth="0.8" />
            <circle cx="32" cy="9" r="1.5" fill="#ffc9c9" />
            {/* Bear Muzzle */}
            <ellipse cx="21" cy="20.5" rx="4" ry="3" fill="#f8f9fa" stroke="#4a3e3d" strokeWidth="0.8" />
            {/* Eyes */}
            <circle cx="15.5" cy="15" r="1.5" fill="#2d3748" />
            <circle cx="15.0" cy="14.3" r="0.5" fill="#fff" />
            <circle cx="26.5" cy="15" r="1.5" fill="#2d3748" />
            <circle cx="26.0" cy="14.3" r="0.5" fill="#fff" />
            {/* Nose & Mouth */}
            <ellipse cx="21" cy="19.2" rx="1.2" ry="0.8" fill="#4a3e3d"/>
            <path d="M19 21.5 Q21 23 23 21.5" stroke="#4a3e3d" strokeWidth="0.8" fill="none"/>
            <circle cx="13" cy="18" r="1.5" fill="#f03e3e" opacity="0.6"/>
            <circle cx="29" cy="18" r="1.5" fill="#f03e3e" opacity="0.6"/>
          </g>
        )}

        {animal === "animal_rabbit" && (
          <g id="animal_rabbit">
            {/* Rabbit Head */}
            <path d="M10 15 C10 11, 13 9, 21 9 C29 9, 32 11, 32 15 C32 21, 31 26, 31 27 C30 28, 12 28, 11 27 Z" fill="url(#rabbit_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Left long ear */}
            <path d="M11 11 C8 1, 13 -1, 14 6 C15 10, 14 11, 11 11 Z" fill="#ffffff" stroke="#4a3e3d" strokeWidth="0.8"/>
            <path d="M11.5 10 C9.5 3, 12 1, 13 6 C13.5 8, 13 10, 11.5 10 Z" fill="#ffa8a8" />
            {/* Right long ear */}
            <path d="M31 11 C34 1, 29 -1, 28 6 C27 10, 28 11, 31 11 Z" fill="#ffffff" stroke="#4a3e3d" strokeWidth="0.8"/>
            <path d="M30.5 10 C32.5 3, 30 1, 29 6 C28.5 8, 29 10, 30.5 10 Z" fill="#ffa8a8" />
            {/* Eyes */}
            <circle cx="15.5" cy="17" r="1.8" fill="#e64980" />
            <circle cx="14.8" cy="16.2" r="0.6" fill="#fff" />
            <circle cx="26.5" cy="17" r="1.8" fill="#e64980" />
            <circle cx="25.8" cy="16.2" r="0.6" fill="#fff" />
            {/* Nose & Mouth */}
            <polygon points="20.5,19.5 21.5,19.5 21,20.2" fill="#e64980" />
            <path d="M19 22 Q21 23.5 23 22" stroke="#4a3e3d" strokeWidth="0.8" fill="none"/>
            <circle cx="13" cy="20" r="2.2" fill="#ffdeeb" />
            <circle cx="29" cy="20" r="2.2" fill="#ffdeeb" />
          </g>
        )}

        {animal === "animal_dog" && (
          <g id="animal_dog">
            {/* Dog Head */}
            <path d="M10 14 C10 10, 14 8, 21 8 C28 8, 32 10, 32 14 C32 20, 32 25, 31 27 C29 28, 13 28, 11 27 Z" fill="url(#dog_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Left Folded Ear */}
            <path d="M10 11 C8 11, 7 17, 9 19 C11 19, 12 15, 10 11 Z" fill="#f97316" stroke="#4a3e3d" strokeWidth="0.8"/>
            {/* Right Folded Ear */}
            <path d="M32 11 C34 11, 35 17, 33 19 C31 19, 30 15, 32 11 Z" fill="#f97316" stroke="#4a3e3d" strokeWidth="0.8"/>
            {/* White face patches */}
            <ellipse cx="21" cy="21.5" rx="5" ry="3.5" fill="#fff" opacity="0.9" />
            {/* Nose & Eyes */}
            <circle cx="15.5" cy="15.2" r="1.5" fill="#334155" />
            <circle cx="15.0" cy="14.5" r="0.5" fill="#fff" />
            <circle cx="26.5" cy="15.2" r="1.5" fill="#334155" />
            <circle cx="26.0" cy="14.5" r="0.5" fill="#fff" />
            <ellipse cx="21" cy="19.2" rx="1.2" ry="0.8" fill="#1e293b" />
            <path d="M19.5 21 C20.2 22, 21.8 22, 22.5 21" stroke="#334155" strokeWidth="1" fill="none"/>
            <circle cx="13" cy="18.5" r="2.2" fill="#ff8787" opacity="0.6"/>
            <circle cx="29" cy="18.5" r="2.2" fill="#ff8787" opacity="0.6"/>
          </g>
        )}

        {animal === "animal_fox" && (
          <g id="animal_fox">
            {/* Fox Head */}
            <path d="M10 15 C10 11, 14 9, 21 9 C28 9, 32 11, 32 15 C32 21, 32 25, 31 27 C29 28, 13 28, 11 27 Z" fill="url(#fox_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Left Big Ear */}
            <path d="M9 13 L4 5 L13 10 Z" fill="#ef4444" stroke="#4a3e3d" strokeWidth="0.8" />
            <path d="M10 12 L6 7 L12 10 Z" fill="#fff0f0" />
            {/* Right Big Ear */}
            <path d="M33 13 L38 5 L29 10 Z" fill="#ef4444" stroke="#4a3e3d" strokeWidth="0.8" />
            <path d="M32 12 L36 7 L30 10 Z" fill="#fff0f0" />
            {/* White Fox Cheek patches */}
            <path d="M10 22 C11 20, 16 18, 18 20 C18 20, 14 26, 11 25 Z" fill="#ffffff" opacity="0.9" />
            <path d="M32 22 C31 20, 26 18, 24 20 C24 20, 28 26, 31 25 Z" fill="#ffffff" opacity="0.9" />
            {/* Intelligent Slanted Eyes */}
            <path d="M13 16 Q16 14 18 16" stroke="#1e293b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="16" cy="16.5" r="1.1" fill="#1e293b" />
            <path d="M29 16 Q26 14 24 16" stroke="#1e293b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="26" cy="16.5" r="1.1" fill="#1e293b" />
            {/* Nose & Smile */}
            <ellipse cx="21" cy="19.5" rx="1" ry="0.6" fill="#111" />
            <path d="M19.5 22 Q21 23.5 22.5 22" stroke="#4a3e3d" strokeWidth="0.8" fill="none" />
            <ellipse cx="13" cy="19.5" rx="2" ry="1" fill="#ff8787" opacity="0.6"/>
            <ellipse cx="29" cy="19.5" rx="2" ry="1" fill="#ff8787" opacity="0.6"/>
          </g>
        )}

        {animal === "animal_duck" && (
          <g id="animal_duck">
            {/* Duck Head */}
            <circle cx="21" cy="16" r="10.5" fill="url(#duck_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Duck Beak */}
            <path d="M14 19 C14 16, 28 16, 28 19 C28 22, 26 23.5, 21 23.5 C16 23.5, 14 22, 14 19 Z" fill="#f59f00" stroke="#d9480f" strokeWidth="1" />
            {/* Beak nostrils */}
            <circle cx="19.5" cy="18.5" r="0.5" fill="#d9480f"/>
            <circle cx="22.5" cy="18.5" r="0.5" fill="#d9480f"/>
            {/* Shiny black eyes */}
            <circle cx="16.5" cy="13.5" r="1.8" fill="#111" />
            <circle cx="15.8" cy="12.7" r="0.6" fill="#fff" />
            <circle cx="25.5" cy="13.5" r="1.8" fill="#111" />
            <circle cx="24.8" cy="12.7" r="0.6" fill="#fff" />
            <circle cx="12" cy="17" r="1.8" fill="#fa5252" opacity="0.5" />
            <circle cx="30" cy="17" r="1.8" fill="#fa5252" opacity="0.5" />
          </g>
        )}

        {animal === "animal_frog" && (
          <g id="animal_frog">
            {/* Frog Head Base (Wider) */}
            <ellipse cx="21" cy="18" rx="11" ry="8.5" fill="url(#frog_grad)" stroke="#4a3e3d" strokeWidth="1.2" />
            {/* Left big bulging eye */}
            <circle cx="13.5" cy="11.5" r="4.2" fill="#86efac" stroke="#4a3e3d" strokeWidth="1" />
            <circle cx="13.5" cy="11.5" r="3" fill="#fff" />
            <circle cx="13.5" cy="11.5" r="1.5" fill="#111" />
            <circle cx="12.8" cy="10.8" r="0.6" fill="#fff" />
            {/* Right bulging eye */}
            <circle cx="28.5" cy="11.5" r="4.2" fill="#86efac" stroke="#4a3e3d" strokeWidth="1" />
            <circle cx="28.5" cy="11.5" r="3" fill="#fff" />
            <circle cx="28.5" cy="11.5" r="1.5" fill="#111" />
            <circle cx="27.8" cy="10.8" r="0.6" fill="#fff" />
            {/* Cute rosy cheeks */}
            <circle cx="12.5" cy="19.5" r="2.2" fill="#ff8787" opacity="0.6"/>
            <circle cx="29.5" cy="19.5" r="2.2" fill="#ff8787" opacity="0.6"/>
            {/* Wide smile */}
            <path d="M16 20.5 Q21 24.5 26 20.5" stroke="#1e522f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* --- 6. HEAD ACCESSORIES (액세서리 탭 렌더링) --- */}
        {accessory === "accessory_ribbon" && (
          <g id="acc_ribbon">
            {/* Large red central bow ribbon */}
            <path d="M21 8 L14 4 C11 2, 11 9, 14 7 Z" fill="#fa5252" stroke="#4a3e3d" strokeWidth="1"/>
            <path d="M21 8 L28 4 C31 2, 31 9, 28 7 Z" fill="#fa5252" stroke="#4a3e3d" strokeWidth="1"/>
            <circle cx="21" cy="7.2" r="2" fill="#ff8787" stroke="#4a3e3d" strokeWidth="0.8"/>
          </g>
        )}

        {accessory === "accessory_bow" && (
          <g id="acc_bow">
            {/* Pastel wedding bowtie */}
            <path d="M21 9 L16 6 C13 4, 13 11, 16 9 Z" fill="#e599f7" stroke="#4a3e3d" strokeWidth="0.8"/>
            <path d="M21 9 L26 6 C29 4, 29 11, 26 9 Z" fill="#e599f7" stroke="#4a3e3d" strokeWidth="0.8"/>
            <circle cx="21" cy="8.2" r="1.5" fill="#f3d9fa" stroke="#4a3e3d" strokeWidth="0.6"/>
          </g>
        )}

        {accessory === "accessory_party" && (
          <g id="acc_party">
            {/* Conic colorful party hat */}
            <polygon points="21,0 15,9 27,9" fill="#ffd43b" stroke="#4a3e3d" strokeWidth="1" />
            <path d="M15 9 C18 10, 24 10, 27 9" stroke="#f03e3e" strokeWidth="1.2" fill="none" />
            <circle cx="21" cy="-0.5" r="1.8" fill="#f03e3e" />
          </g>
        )}

        {accessory === "accessory_glasses" && (
          <g id="acc_glasses">
            {/* Cool Y2K Sunglasses on face */}
            <path d="M10 16 C10 16, 11 20, 18 20 V16 Z" fill="#212529" stroke="#495057" strokeWidth="0.5"/>
            <path d="M24 16 C24 16, 25 20, 32 20 V16 Z" fill="#212529" stroke="#495057" strokeWidth="0.5"/>
            <line x1="18" y1="17" x2="24" y2="17" stroke="#212529" strokeWidth="1.5"/>
            <line x1="11" y1="18" x2="14" y2="18" stroke="white" strokeWidth="0.8" opacity="0.8"/>
            <line x1="25" y1="18" x2="28" y2="18" stroke="white" strokeWidth="0.8" opacity="0.8"/>
          </g>
        )}

        {accessory === "accessory_silkhat" && (
          <g id="acc_silkhat">
            {/* Elegant high groom silk hat */}
            <rect x="13" y="1" width="16" height="8" fill="#343a40" stroke="#111" strokeWidth="1" rx="0.5"/>
            <ellipse cx="21" cy="9" rx="10" ry="2.2" fill="#343a40" stroke="#111" strokeWidth="1"/>
            <rect x="13.5" y="7" width="15" height="1.8" fill="#e64980"/>
          </g>
        )}

        {accessory === "accessory_crown" && (
          <g id="acc_crown">
            {/* Sparkling gold bridal crown */}
            <path d="M12 9 L15 2 L21 6 L27 2 L30 9 H12 Z" fill="url(#gold_grad)" stroke="#fcc419" strokeWidth="1" />
            <circle cx="15" cy="2" r="1" fill="#ff6b6b" />
            <circle cx="21" cy="6" r="1.2" fill="#ff6b6b" />
            <circle cx="27" cy="2" r="1" fill="#ff6b6b" />
          </g>
        )}

        {accessory === "accessory_halo" && (
          <g id="acc_halo">
            {/* Dreamy floating golden halo ring */}
            <ellipse cx="21" cy="-1.5" rx="9" ry="2.5" fill="none" stroke="#ffe3e2" strokeWidth="2" style={{ filter: "drop-shadow(0 0 3px #ffd43b)" }} />
            <ellipse cx="21" cy="-1.5" rx="9" ry="2.5" fill="none" stroke="#ffd43b" strokeWidth="1" />
          </g>
        )}

        {accessory === "accessory_veil" && (
          <g id="acc_veil">
            {/* Wedding white transparent veil flowing back */}
            <path d="M14 8 C14 8, 9 20, 5 35 C10 38, 16 38, 17 32 C17 32, 21 8, 14 8 Z" fill="#ffffff" opacity="0.55" stroke="#e8f4fd" strokeWidth="0.8" />
            <path d="M28 8 C28 8, 33 20, 37 35 C32 38, 26 38, 25 32 C25 32, 21 8, 28 8 Z" fill="#ffffff" opacity="0.55" stroke="#e8f4fd" strokeWidth="0.8" />
            {/* Crown base tie */}
            <ellipse cx="21" cy="8" rx="7" ry="1.5" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

// 3. Main Avatar Customizer Screen (with 5% / 1% / 0.5% Gacha probabilities)
export default function CharacterCreator({ onEnterInvite }) {
  const [avatar, setAvatar] = useState({
    accessory: "accessory_ribbon",
    animal: "animal_bear",
    top: "top_basic",
    bottom: "bottom_jeans",
    shoes: "shoes_sneakers",
    grade: "common"
  });

  const [isRolling, setIsRolling] = useState(false);
  const [gachaResult, setGachaResult] = useState(null); // 'rare', 'unique', 'super_rare' or null
  const [gachaScore, setGachaScore] = useState(0); // roll count

  // Elegant synthesized crystal chimes for previewing and rolled grades
  const playSynthSound = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const delay = ctx.createDelay();
      const delayGain = ctx.createGain();
      
      delay.delayTime.setValueAtTime(0.16, now);
      delayGain.gain.setValueAtTime(0.35, now);
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);

      const playChimeNote = (freq, offset, vol, dur = 0.4) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(freq, now + offset);
        
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(freq * 2, now + offset); // 1-octave harmonic chime
        
        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteGain.connect(delay);
        
        noteGain.gain.setValueAtTime(0, now + offset);
        noteGain.gain.linearRampToValueAtTime(vol, now + offset + 0.004);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + offset + dur - 0.02);
        
        osc1.start(now + offset);
        osc1.stop(now + offset + dur);
        osc2.start(now + offset);
        osc2.stop(now + offset + dur);
      };

      if (type === "roll") {
        playChimeNote(659.25, 0.0, 0.06, 0.15); // E5
        playChimeNote(783.99, 0.08, 0.06, 0.15); // G5
        playChimeNote(987.77, 0.16, 0.08, 0.2);  // B5
      } else if (type === "win_rare") {
        playChimeNote(880.00, 0.0, 0.08, 0.35);  // A5
        playChimeNote(1318.51, 0.1, 0.10, 0.4);  // E6
      } else if (type === "win_unique") {
        playChimeNote(523.25, 0.0, 0.06, 0.45);  // C5
        playChimeNote(659.25, 0.06, 0.06, 0.45); // E5
        playChimeNote(783.99, 0.12, 0.06, 0.45); // G5
        playChimeNote(1046.50, 0.18, 0.09, 0.5);  // C6
      } else if (type === "win_super") {
        playChimeNote(587.33, 0.0, 0.06, 0.5);   // D5
        playChimeNote(783.99, 0.06, 0.06, 0.5);  // G5
        playChimeNote(987.77, 0.12, 0.06, 0.5);  // B5
        playChimeNote(1174.66, 0.18, 0.08, 0.5); // D6
        playChimeNote(1567.98, 0.24, 0.12, 0.6); // G6
      }
    } catch (e) {
      console.log("Audio synthesis error: ", e);
    }
  };

  // Perform Gacha when random button is clicked (filters guest animal list)
  const handleRandomize = () => {
    if (isRolling) return;
    setIsRolling(true);
    setGachaResult(null);
    playSynthSound("roll");

    // Guest animals exclude Hippo and Cat to guarantee guest is another animal
    const guestAnimals = PARTS.animal.filter(
      a => a.id !== "animal_hippo" && a.id !== "animal_cat"
    );

    let ticks = 0;
    const interval = setInterval(() => {
      const randomPart = (partKey) => {
        const list = PARTS[partKey].filter(p => p.type === "common");
        if (partKey === "animal") {
          const guestCommonAnimals = guestAnimals.filter(p => p.type === "common");
          return guestCommonAnimals[Math.floor(Math.random() * guestCommonAnimals.length)].id;
        }
        return list[Math.floor(Math.random() * list.length)].id;
      };

      setAvatar({
        accessory: randomPart("accessory"),
        animal: randomPart("animal"),
        top: randomPart("top"),
        bottom: randomPart("bottom"),
        shoes: randomPart("shoes"),
        grade: "common"
      });

      ticks++;
      if (ticks > 8) {
        clearInterval(interval);
        
        // Final Roll Probability Logic
        const roll = Math.random() * 100;
        let rolledGrade = "common";
        let specialParts = {};

        if (roll <= 0.5) {
          // 0.5% Super Rare Unique Custom
          rolledGrade = "super_rare";
          specialParts = {
            accessory: "accessory_halo",
            animal: guestAnimals[Math.floor(Math.random() * guestAnimals.length)].id,
            top: "top_wedding",
            bottom: "bottom_wedding",
            shoes: "shoes_cloud"
          };
          playSynthSound("win_super");
        } else if (roll <= 1.5) {
          // 1.0% Unique Custom (0.5% to 1.5% range)
          rolledGrade = "unique";
          specialParts = {
            accessory: "accessory_crown",
            animal: guestAnimals[Math.floor(Math.random() * guestAnimals.length)].id,
            top: "top_gold",
            bottom: "bottom_gold",
            shoes: "shoes_gold"
          };
          playSynthSound("win_unique");
        } else if (roll <= 6.5) {
          // 5.0% Rare Custom (1.5% to 6.5% range)
          rolledGrade = "rare";
          specialParts = {
            accessory: "accessory_glasses",
            animal: guestAnimals[Math.floor(Math.random() * guestAnimals.length)].id,
            top: "top_punk",
            bottom: "bottom_neon",
            shoes: "shoes_skates"
          };
          playSynthSound("win_rare");
        } else {
          // Common random combination
          const randomCommon = (partKey) => {
            if (partKey === "animal") {
              return guestAnimals[Math.floor(Math.random() * guestAnimals.length)].id;
            }
            const list = PARTS[partKey].filter(p => p.type === "common");
            return list[Math.floor(Math.random() * list.length)].id;
          };
          specialParts = {
            accessory: randomCommon("accessory"),
            animal: randomCommon("animal"),
            top: randomCommon("top"),
            bottom: randomCommon("bottom"),
            shoes: randomCommon("shoes")
          };
        }

        const finalAvatar = {
          ...specialParts,
          grade: rolledGrade
        };

        setAvatar(finalAvatar);
        setGachaResult(rolledGrade !== "common" ? rolledGrade : null);
        setGachaScore(prev => prev + 1);
        setIsRolling(false);
      }
    }, 100);
  };

  // Select a specific part manually
  const selectPart = (partKey, optionId) => {
    setAvatar(prev => {
      const updated = { ...prev, [partKey]: optionId };
      
      // Dynamic grade calculation based on equipped items
      let maxGrade = "common";
      Object.keys(PARTS).forEach(k => {
        const option = PARTS[k].find(o => o.id === updated[k]);
        if (option) {
          if (option.type === "super_rare") maxGrade = "super_rare";
          else if (option.type === "unique" && maxGrade !== "super_rare") maxGrade = "unique";
          else if (option.type === "rare" && maxGrade === "common") maxGrade = "rare";
        }
      });
      
      return { ...updated, grade: maxGrade };
    });
    setGachaResult(null);
  };

  // Submit avatar
  const handleEnterHome = () => {
    localStorage.setItem("cyworld_guest_avatar", JSON.stringify(avatar));
    if (onEnterInvite) {
      onEnterInvite(avatar);
    }
  };

  return (
    <div style={{
      width: "100%",
      backgroundColor: "#f5f5f5",
      border: "3px double #b0bec5",
      borderRadius: "10px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)"
    }}>
      {/* Intro Title Box */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <h2 style={{ fontSize: "16px", color: "var(--cy-orange)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          🏡 <span>쭁 ♥ 꾱 미니홈피 입장</span> 💍
        </h2>
        <p style={{ fontSize: "10px", color: "var(--cy-text-muted)", marginTop: "4px" }}>
          청첩장에 표시될 하객 동물 미니미(Mini-Me)를 예쁘게 코디해 주세요!
        </p>
      </div>

      {/* Realtime Character Preview & Gacha Result */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "280px",
        height: "170px",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}>
        {/* Grid pattern background */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(to right, #f2f2f2 1px, transparent 1px), linear-gradient(to bottom, #f2f2f2 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          pointerEvents: "none"
        }}></div>

        {/* Dynamic speech bubble */}
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "var(--cy-orange-light)",
          border: "1px solid var(--cy-orange)",
          borderRadius: "6px",
          padding: "5px 8px",
          fontSize: "9px",
          maxWidth: "110px",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.05)",
          zIndex: 10
        }}>
          {avatar.grade === "super_rare" ? "헉! 0.5% 날개 천사 링! 대박사건! 👼" :
           avatar.grade === "unique" ? "오옷! 황금빛 유니크 아바타! 👑" :
           avatar.grade === "rare" ? "우와! 힙스터 레어 세트 획득! 🎸" :
           "나만의 귀여운 동물 미니미 완성! 🦊"}
        </div>

        {/* Character Sprite */}
        <div style={{ transform: "scale(1.4)", marginTop: "15px" }}>
          <MinimeSprite avatar={avatar} scale={1} isWalking={isRolling} />
        </div>

        {/* Rarity Stamp overlay */}
        {avatar.grade !== "common" && (
          <div style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            background: avatar.grade === "super_rare" ? "var(--color-super-rare)" : avatar.grade === "unique" ? "var(--color-unique)" : "var(--color-rare)",
            color: "white",
            fontSize: "8px",
            padding: "2px 5px",
            borderRadius: "3px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "2px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            animation: "bounce 0.8s infinite alternate"
          }}>
            <Sparkles size={8} />
            <span>
              {avatar.grade === "super_rare" ? "SUPER RARE" : avatar.grade === "unique" ? "UNIQUE" : "RARE"}
            </span>
          </div>
        )}
      </div>

      {/* Parts Selector Tabs */}
      <div style={{ width: "100%" }}>
        {Object.keys(PARTS).map((partKey) => (
          <div key={partKey} style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "10px", fontWeight: "bold", color: "#555", marginBottom: "4px", textTransform: "uppercase" }}>
              {partKey === "accessory" ? "👑 Accessory" :
               partKey === "animal" ? "🐱 Animal Face" :
               partKey === "top" ? "👕 Top" :
               partKey === "bottom" ? "👖 Bottom" : "👟 Shoes"}
            </div>
            
            <div style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "4px",
              whiteSpace: "nowrap"
            }}>
              {PARTS[partKey].map((opt) => {
                const isSelected = avatar[partKey] === opt.id;
                
                // Button styling based on item rarity
                let borderStyle = "1px solid #ccc";
                let textCol = "#333";
                let bgCol = "white";

                if (isSelected) {
                  bgCol = "var(--cy-orange-light)";
                  borderStyle = "1.5px solid var(--cy-orange)";
                  textCol = "var(--cy-orange)";
                } else if (opt.type === "super_rare") {
                  borderStyle = "1px dashed var(--color-super-rare)";
                  bgCol = "#fff3f7";
                } else if (opt.type === "unique") {
                  borderStyle = "1px dashed var(--color-unique)";
                  bgCol = "#fdf4ff";
                } else if (opt.type === "rare") {
                  borderStyle = "1px dashed var(--color-rare)";
                  bgCol = "#fffaf0";
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => selectPart(partKey, opt.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "2px",
                      padding: "4px 8px",
                      fontSize: "9px",
                      borderRadius: "4px",
                      backgroundColor: bgCol,
                      border: borderStyle,
                      color: textCol,
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                  >
                    {isSelected && <Check size={8} />}
                    <span>{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Gacha Actions & Statistics */}
      <div style={{
        width: "100%",
        borderTop: "1px dashed #ccc",
        paddingTop: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        {/* Dice Rolling button */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleRandomize}
            disabled={isRolling}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #7c90a2 0%, #4f6b80 100%)",
              color: "white",
              border: "1px solid #334e68",
              borderRadius: "6px",
              padding: "10px 14px",
              fontSize: "11px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              transition: "all 0.15s"
            }}
          >
            <Dices size={14} className={isRolling ? "animate-spin" : ""} />
            <span>🎲 주사위 굴려 랜덤 조합!</span>
          </button>
        </div>

        {/* Probability Legend Table */}
        <div style={{
          backgroundColor: "#eee",
          borderRadius: "4px",
          padding: "6px",
          fontSize: "8px",
          color: "#666",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <strong>가챠 확률</strong>: 🧡레어 5.0% | 💜유니크 1.0% | 💗슈퍼레어 0.5% (하객 동물 전용)
          </div>
          <div>
            누적 주사위: <strong>{gachaScore}</strong>회
          </div>
        </div>

        {/* Gacha Success Banner */}
        {gachaResult && (
          <div style={{
            background: gachaResult === "super_rare" ? "var(--cy-orange-pale)" : "#fff",
            border: `1.5px solid ${gachaResult === "super_rare" ? "var(--color-super-rare)" : gachaResult === "unique" ? "var(--color-unique)" : "var(--color-rare)"}`,
            borderRadius: "6px",
            padding: "8px",
            textAlign: "center",
            animation: "pulse 1.5s infinite"
          }}>
            <span style={{
              color: gachaResult === "super_rare" ? "var(--color-super-rare)" : gachaResult === "unique" ? "var(--color-unique)" : "var(--color-rare)",
              fontWeight: "bold",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px"
            }}>
              <Trophy size={10} />
              축하합니다! <strong>{
                gachaResult === "super_rare" ? "0.5% 확률! [슈퍼레어 천사 미니미]" :
                gachaResult === "unique" ? "1.0% 확률! [유니크 황금 황제 미니미]" :
                "5.0% 확률! [레어 락스타 선글라스 미니미]"
              }</strong> 당첨! 🎉
            </span>
          </div>
        )}

        {/* Entry Submission Button */}
        <button
          onClick={handleEnterHome}
          disabled={isRolling}
          style={{
            background: "linear-gradient(135deg, #ff8033 0%, var(--cy-orange) 100%)",
            color: "white",
            border: "1px solid var(--cy-orange-hover)",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "12px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(255, 102, 0, 0.3)",
            marginTop: "6px",
            transition: "all 0.2s"
          }}
        >
          <span>미니홈피 일촌 입장하기</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
