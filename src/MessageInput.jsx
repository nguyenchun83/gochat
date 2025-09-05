// src/components/MessageInput.jsx
"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

const MessageInput = () => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Masukkan pesan!");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: input,
      userName: displayName,
      uid,
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <form onSubmit={sendMessage} className="flex p-4 bg-gray-200 dark:bg-gray-900 shadow-lg">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Tulis pesan..."
        className="flex-grow p-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="ml-4 px-6 py-3 text-white font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300"
      >
        Kirim
      </button>
    </form>
  );
};

export default MessageInput;
