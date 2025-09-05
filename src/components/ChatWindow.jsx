"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const currentUserUid = auth.currentUser?.uid;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });
    return () => unsubscribe();
  }, []);

  const deleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
    } catch (error) {
      console.error("Gagal menghapus pesan: ", error);
      alert("Gagal menghapus pesan. Coba lagi.");
    }
  };

  return (
    <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column" style={{ gap: '1rem', backgroundColor: 'white' }}>
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
                  className="btn btn-sm btn-outline-light"
                >
                  delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center mt-4 text-secondary">
          write message here !!
        </p>
      )}
    </div>
  );
};
export default ChatWindow;
