// src/components/GuestbookTab.jsx
import React, { useState, useEffect } from "react";
import { MinimeSprite } from "./CharacterCreator";
import { MessageSquare, Calendar, Smile, Send, Trash2 } from "lucide-react";

// Initial fake Y2K guestbook data for retro mood
const INITIAL_GUESTBOOK = [
  {
    id: 1,
    name: "도토리컬렉터 (동창)",
    message: "종호야! 결혼 진심으로 축하해! 미니홈피 완전 추억 돋는다 ㅋㅋㅋ 미니미 천사 날개(0.5%) 뽑으려고 주사위 80번 돌림 ㅠㅠ 축복 가득한 가정 이루길 바래!! 🎉 아펠가모에서 만나!",
    date: "2026.05.20 14:23",
    avatar: {
      hair: "hair_halo",
      face: "face_wink",
      top: "top_wedding",
      bottom: "bottom_wedding",
      shoes: "shoes_cloud",
      grade: "super_rare"
    },
    comments: [
      { id: 101, name: "채종호 (신랑)", text: "ㅋㅋㅋ 천사 날개 대박이네!! 고맙다 친구야! 맛있는 밥 사줄게!! 🤝", date: "2026.05.20 15:10" }
    ]
  },
  {
    id: 2,
    name: "꾱바라기 (절친)",
    message: "희경아 세상에서 제일 예쁜 신부 입장 대기중이네 ㅠㅠ 선릉 아펠가모 15층 접수하러 간닷!! 꽃길만 걷자 우리 꾱 ♥ 행복해야 해!! 미니미 금빛 번쩍이는 거 뽑았당 헤헤 ✨",
    date: "2026.05.21 18:05",
    avatar: {
      hair: "hair_crown",
      face: "face_sparkle",
      top: "top_gold",
      bottom: "bottom_gold",
      shoes: "shoes_gold",
      grade: "unique"
    },
    comments: [
      { id: 201, name: "나희경 (신부)", text: "우와아 골드 미니미 미쳤따리 넘 귀여워ㅠㅠ 와줘서 넘 고마워 얼른 보고 싶어 쪽쪽 😘", date: "2026.05.21 19:22" }
    ]
  },
  {
    id: 3,
    name: "도토리도둑 (의리)",
    message: "축의금 도토리 50개(5만원) 충전 완료하고 방명록 남긴다!! ㅋㅋㅋ 신랑 채종호 신부 나희경 비주얼 커플 축하합니닷! 웰컴 투 유부월드~ 오래오래 예쁘게 사랑하렴! 🐿️",
    date: "2026.05.22 09:12",
    avatar: {
      hair: "hair_bunny",
      face: "face_shades",
      top: "top_punk",
      bottom: "bottom_neon",
      shoes: "shoes_skates",
      grade: "rare"
    },
    comments: []
  }
];

export default function GuestbookTab({ guestAvatar }) {
  const [messages, setMessages] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  
  // Track comments currently being drafted for each message
  const [activeCommentDrafts, setActiveCommentDrafts] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("cyworld_guestbook");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(INITIAL_GUESTBOOK);
      localStorage.setItem("cyworld_guestbook", JSON.stringify(INITIAL_GUESTBOOK));
    }
  }, []);

  const saveMessages = (updated) => {
    setMessages(updated);
    localStorage.setItem("cyworld_guestbook", JSON.stringify(updated));
  };

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    // Get current date string formatted in retro style (YYYY.MM.DD HH:MM)
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMsg = {
      id: Date.now(),
      name: guestName.trim(),
      message: guestMessage.trim(),
      date: formattedDate,
      avatar: guestAvatar || {
        hair: "hair_basic",
        face: "face_smile",
        top: "top_basic",
        bottom: "bottom_jeans",
        shoes: "shoes_sneakers",
        grade: "common"
      },
      comments: []
    };

    const updated = [newMsg, ...messages];
    saveMessages(updated);
    
    // Clear inputs
    setGuestName("");
    setGuestMessage("");
  };

  const handleDeleteMessage = (id) => {
    // Only allow deleting user-created messages or any message since it's local
    if (window.confirm("방명록 글을 삭제하시겠습니까?")) {
      const updated = messages.filter((m) => m.id !== id);
      saveMessages(updated);
    }
  };

  const handleAddComment = (msgId) => {
    const draftText = activeCommentDrafts[msgId];
    if (!draftText || !draftText.trim()) return;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // Add comment as current visitor (or '나' if it matches bride/groom names)
    let commenterName = "익명일촌";
    if (guestName.trim()) {
      commenterName = guestName.trim();
    } else if (guestAvatar) {
      commenterName = guestAvatar.grade === "super_rare" ? "날개천사하객" : "꼬마미니미하객";
    }

    const newComment = {
      id: Date.now(),
      name: commenterName,
      text: draftText.trim(),
      date: formattedDate
    };

    const updated = messages.map((m) => {
      if (m.id === msgId) {
        return {
          ...m,
          comments: [...m.comments, newComment]
        };
      }
      return m;
    });

    saveMessages(updated);
    
    // Clear draft for this message
    setActiveCommentDrafts({
      ...activeCommentDrafts,
      [msgId]: ""
    });
  };

  const handleCommentDraftChange = (msgId, text) => {
    setActiveCommentDrafts({
      ...activeCommentDrafts,
      [msgId]: text
    });
  };

  return (
    <div style={{ padding: "8px 2px", fontFamily: "inherit" }}>
      {/* Tab Title Banner */}
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
        <span>✉️ 축하 방명록 (Guestbook)</span>
        <span style={{ fontSize: "8px", opacity: 0.8 }}>총 {messages.length}개의 축하글</span>
      </div>

      {/* Guestbook Submission Form */}
      <form onSubmit={handleAddMessage} style={{
        background: "#fafafa",
        border: "1px dashed var(--cy-orange)",
        borderRadius: "6px",
        padding: "10px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Avatar preview block */}
          {guestAvatar && (
            <div style={{
              width: "40px",
              height: "55px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}>
              <div style={{ transform: "scale(0.65)", marginTop: "8px" }}>
                <MinimeSprite avatar={guestAvatar} scale={0.65} />
              </div>
            </div>
          )}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "9px", color: "var(--cy-orange)", fontWeight: "bold" }}>
              내 미니미 장착 중 💖
            </span>
            <input
              type="text"
              placeholder="이름이나 일촌명을 적어주세요"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              maxLength={15}
              style={{
                fontSize: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                outline: "none",
                fontFamily: "inherit"
              }}
            />
          </div>
        </div>

        <textarea
          placeholder="쭁♥꾱 신랑신부에게 따뜻한 축하의 한마디를 남겨주세요! (도토리 50개 축의 충전은 도토리 탭에서 가능합니다 😉)"
          value={guestMessage}
          onChange={(e) => setGuestMessage(e.target.value)}
          required
          rows={3}
          maxLength={300}
          style={{
            fontSize: "10px",
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            lineHeight: "1.4"
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "var(--cy-orange)",
            color: "white",
            border: "none",
            borderRadius: "3px",
            padding: "6px",
            fontSize: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            boxShadow: "1px 1px 0 rgba(0,0,0,0.2)"
          }}
        >
          <Send size={10} />
          <span>방명록 남기기</span>
        </button>
      </form>

      {/* Guestbook List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {messages.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "30px 10px",
            color: "#888",
            fontSize: "10px",
            border: "1px dashed #ccc",
            borderRadius: "4px"
          }}>
            아직 방명록 글이 없습니다.<br />첫 번째 축하글의 주인공이 되어 보세요! 💖
          </div>
        ) : (
          messages.map((msg, index) => {
            const displayNo = messages.length - index;
            const isRare = msg.avatar?.grade === "rare";
            const isUnique = msg.avatar?.grade === "unique";
            const isSuperRare = msg.avatar?.grade === "super_rare";

            let nameColor = "#333";
            let borderStyle = "1px solid #b0bec5";
            let headerBg = "#f2f5f7";

            if (isSuperRare) {
              nameColor = "var(--color-super-rare)";
              borderStyle = "2px solid var(--color-super-rare)";
              headerBg = "#fff3f7";
            } else if (isUnique) {
              nameColor = "var(--color-unique)";
              borderStyle = "1.5px solid var(--color-unique)";
              headerBg = "#fdf4ff";
            } else if (isRare) {
              nameColor = "var(--color-rare)";
              borderStyle = "1.5px solid var(--color-rare)";
              headerBg = "#fffaf0";
            }

            return (
              <div
                key={msg.id}
                style={{
                  border: borderStyle,
                  borderRadius: "5px",
                  overflow: "hidden",
                  boxShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                  background: "white"
                }}
              >
                {/* Message Header Bar */}
                <div style={{
                  background: headerBg,
                  borderBottom: "1px solid #e0e0e0",
                  padding: "5px 8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "9px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontWeight: "bold", color: "var(--cy-orange)" }}>No. {displayNo}</span>
                    <span style={{ fontWeight: "bold", color: nameColor }}>
                      {msg.name}
                    </span>
                    {msg.avatar?.grade !== "common" && (
                      <span style={{
                        fontSize: "7px",
                        padding: "1px 3px",
                        borderRadius: "2px",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: isSuperRare ? "var(--color-super-rare)" : isUnique ? "var(--color-unique)" : "var(--color-rare)"
                      }}>
                        {isSuperRare ? "슈퍼레어천사" : isUnique ? "유니크골드" : "레어락스타"}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#888" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                      <Calendar size={8} />
                      {msg.date}
                    </span>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#a0a0a0"
                      }}
                    >
                      <Trash2 size={9} />
                    </button>
                  </div>
                </div>

                {/* Message Body Content */}
                <div style={{
                  padding: "10px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start"
                }}>
                  {/* Left Avatar Column */}
                  <div style={{
                    width: "48px",
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #eee",
                    borderRadius: "4px",
                    flexShrink: 0,
                    overflow: "hidden"
                  }}>
                    <div style={{ transform: "scale(0.8)", marginTop: "12px" }}>
                      <MinimeSprite avatar={msg.avatar} scale={0.8} />
                    </div>
                  </div>

                  {/* Right Written Message Column */}
                  <div style={{
                    flex: 1,
                    fontSize: "10px",
                    lineHeight: "1.4",
                    color: "#333",
                    whiteSpace: "pre-wrap",
                    minHeight: "45px"
                  }}>
                    {msg.message}
                  </div>
                </div>

                {/* Comment Section (일촌평/댓글) */}
                <div style={{
                  background: "#fafafa",
                  borderTop: "1px dashed #e0e0e0",
                  padding: "6px 8px"
                }}>
                  {/* Existing Comments List */}
                  {msg.comments && msg.comments.length > 0 && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      marginBottom: "6px"
                    }}>
                      {msg.comments.map((comm) => (
                        <div key={comm.id} style={{
                          fontSize: "8px",
                          lineHeight: "1.3",
                          borderBottom: "1px dotted #eaeaea",
                          paddingBottom: "3px"
                        }}>
                          <span style={{ fontWeight: "bold", color: "var(--cy-orange)", marginRight: "5px" }}>
                            {comm.name}
                          </span>
                          <span style={{ color: "#333", marginRight: "6px" }}>{comm.text}</span>
                          <span style={{ color: "#aaa" }}>({comm.date})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Input Form Row */}
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder="댓글 달기..."
                      value={activeCommentDrafts[msg.id] || ""}
                      onChange={(e) => handleCommentDraftChange(msg.id, e.target.value)}
                      maxLength={100}
                      style={{
                        flex: 1,
                        fontSize: "8px",
                        padding: "3px 6px",
                        border: "1px solid #ddd",
                        borderRadius: "2px",
                        outline: "none",
                        fontFamily: "inherit"
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(msg.id)}
                      style={{
                        backgroundColor: "#eee",
                        border: "1px solid #ccc",
                        borderRadius: "2px",
                        padding: "3px 6px",
                        fontSize: "8px",
                        cursor: "pointer",
                        fontFamily: "inherit"
                      }}
                    >
                      등록
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
