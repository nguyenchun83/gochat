"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

const MessageInput = () => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("write message !!!!");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("Anda harus login untuk mengirim pesan.");
        return;
    }

    await addDoc(collection(db, "messages"), {
      text: input,
      userName: currentUser.displayName || "user",
      uid: currentUser.uid,
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="bg-success p-3 border-top">
      <form onSubmit={sendMessage} className="d-flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="write message...."
          className="form-control rounded-pill bg-light border-secondary text-dark flex-grow-1"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-pill ms-2"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
