// src/components/ChatWindow.jsx
"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

const ChatWindow = ({ activeChatId }) => {
  const [messages, setMessages] = useState([]);
  const currentUserUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!activeChatId) return;

    const messagesCollectionRef = activeChatId === "global_messages"
      ? collection(db, "global_messages")
      : collection(db, "chats", activeChatId, "messages");

    const q = query(messagesCollectionRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });
    return () => unsubscribe();
  }, [activeChatId]);

  const deleteMessage = async (messageId) => {
    const messagesCollectionRef = activeChatId === "global_messages"
      ? collection(db, "global_messages")
      : collection(db, "chats", activeChatId, "messages");

    try {
      await deleteDoc(doc(messagesCollectionRef, messageId));
    } catch (error) {
      console.error("Gagal menghapus pesan: ", error);
      alert("Gagal menghapus pesan. Coba lagi.");
    }
  };

  return (
    <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column" style={{ gap: '1rem', backgroundColor: '#f8f9fa' }}>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded shadow-sm ${msg.uid === currentUserUid ? 'ms-auto bg-primary text-white' : 'me-auto bg-light text-dark'}`}
            style={{ maxWidth: '75%' }}
          >
            <div className="fw-semibold">{msg.userName}</div>
            <div className="mt-1">{msg.text}</div>
            {msg.uid === currentUserUid && (
              <div className="text-end mt-2">
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="btn btn-sm btn-outline-primary"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center mt-4 text-secondary">
          Belum ada pesan. Mulai kirim pesan!
        </p>
      )}
    </div>
  );
};

export default ChatWindow;
