// src/components/DiaryTab.jsx
import React, { useState, useEffect } from "react";
import { Heart, Calendar } from "lucide-react";

export default function DiaryTab() {
  const [dDayMessage, setDDayMessage] = useState("");

  useEffect(() => {
    const weddingDate = new Date("2025-10-25T12:00:00");
    const today = new Date();
    
    // Calculate difference
    const diffTime = today.getTime() - weddingDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      setDDayMessage(`쭁 ♥ 꾱 결혼한 지 ${diffDays}일째 💖`);
    } else if (diffDays === 0) {
      setDDayMessage(`💍 대망의 결혼식 당일! (TODAY) 💍`);
    } else {
      setDDayMessage(`💍 쭁 ♥ 꾱 결혼식까지 D${diffDays}일 💖`);
    }
  }, []);

  // Nostalgic Y2K diary posts
  const diaryPosts = [
    {
      date: "2025.10.25 (토) 12:00",
      title: "약속의 시작, 평생 일촌 맺는 날 💍",
      content: `...˚✩ 드디어 대박사건... ✩˚...
쭁이와 꾱이가 일생의 단 한 번뿐인 최고의 미니룸 합치기를 합니다!!!
그동안 각자의 미니홈피를 꾸미던 두 사람이 만나 
이제 한 울타리 안에서 도토리를 공유하고 살아가기로 약속했어요! 🐿️🧡

우리가 가꾸어갈 행복한 우리만의 스킨 개장식날!
우리를 항상 보살펴주시고 아껴주신 소중한 일촌 여러분을 모십니다.
귀한 시간 내어 왕림하셔서 축하해주시면 감사하겠습니다. ♥`,
      mood: "설렘 100% 🥰"
    },
    {
      date: "2025.06.14 (토) 20:30",
      title: "눈물 펑펑 프러포즈 대작전 성공 😭",
      content: `꾱이 몰래 쭁이가 준비한 촛불 100개 켜기 대작전... 🕯️
진짜 심장 터져 나가는 줄 알았다구 ㅠㅠ 
아무것도 모르고 맛있는 거 먹으러 가는 줄 알았던 꾱이가
촛불 길을 걸어오더니 눈가에 눈물이 방울방울 맺히는데...
나 진짜 완전 감동 먹었잖아!!! (쭁이 최고 멋쟁이 👍)

"나랑 평생 같이 미니룸 스킨 꾸미고 살래?"
대답은 당근 10000% YES!!! 우리 이쁘게 잘 살자 💖`,
      mood: "감동 200% 😭"
    },
    {
      date: "2022.03.01 (화) 14:00",
      title: "첫 만남.. 소중한 일촌 1일 싹트는 중 🌱",
      content: `새 학기 바람 솔솔 불던 봄날 🌸
진짜 우연처럼 눈이 마주쳤는데, 왠지 모르게 심장이 콩닥콩닥...
쭁이의 귀여운 눈웃음과 꾱이의 러블리한 미소가 만난 날!
그날 이후로 하루도 빠짐없이 밤새 네이트온 대화하고 
일촌평 남기며 마음을 키워갔더랬지... ˚✩

그 풋풋했던 일촌 1일의 인연이
어느덧 평생의 동반자로 이어지게 될 줄이야! 하늘이 맺어준 인연인가봐! ✨`,
      mood: "두근두근 💓"
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      
      {/* Diary Header with Lined paper note styling */}
      <div style={{
        background: "linear-gradient(135deg, #ff8033 0%, var(--cy-orange) 100%)",
        border: "1.5px solid var(--cy-orange-hover)",
        color: "white",
        borderRadius: "6px",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px",
        boxShadow: "0 2px 4px rgba(255,102,0,0.15)"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold" }}>
          <Calendar size={13} />
          <span>📖 DIARY (연애 다이어리)</span>
        </span>
        <span style={{ fontSize: "9px", fontWeight: "bold" }}>{dDayMessage}</span>
      </div>

      {/* Two column layout: Left Calendar (retro styled), Right Lined Paper posts */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%"
      }}>
        {/* Lined Paper Diary Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          {diaryPosts.map((post, idx) => (
            <div
              key={idx}
              style={{
                background: "#fafcfd",
                border: "1px solid #cce0eb",
                borderRadius: "6px",
                padding: "10px",
                backgroundImage: "linear-gradient(#f4f9fc 1px, transparent 1px)",
                backgroundSize: "100% 20px",
                lineHeight: "20px"
              }}
            >
              {/* Post Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1.5px solid #a3c1d4",
                paddingBottom: "4px",
                marginBottom: "8px",
                lineHeight: "normal"
              }}>
                <span style={{ fontSize: "9px", color: "var(--cy-orange)", fontWeight: "bold" }}>
                  {post.date}
                </span>
                <span style={{ fontSize: "8px", background: "#e1f5fe", color: "#0288d1", padding: "1px 5px", borderRadius: "3px" }}>
                  기분: {post.mood}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#1c4966",
                marginBottom: "6px",
                lineHeight: "normal"
              }}>
                {post.title}
              </h3>

              {/* Content */}
              <p style={{
                fontSize: "10px",
                color: "#444",
                whiteSpace: "pre-line",
                lineHeight: "20px"
              }}>
                {post.content}
              </p>

              {/* Heart Stamp */}
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "4px",
                lineHeight: "normal"
              }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2px",
                  fontSize: "8px",
                  color: "#e91e63",
                  background: "#ffebee",
                  padding: "2px 5px",
                  borderRadius: "4px"
                }}>
                  <Heart size={8} fill="#e91e63" />
                  <span>일촌 추천공감</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
