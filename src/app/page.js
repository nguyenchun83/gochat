// src/app/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";
import MessageInput from "@/components/MessageInput";
import ChatWindow from "@/components/ChatWindow";
import LogoutButton from "@/components/LogoutButton";
import UserList from "@/components/UserList";
import Link from "next/link";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatHeader, setChatHeader] = useState("Pilih Pengguna untuk Chat");
  const [showUserList, setShowUserList] = useState(true); // State untuk menampilkan daftar pengguna
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || "Pengguna",
          });
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSelectChat = (user) => {
    if (user === "global") {
      setActiveChatId("global_messages");
      setChatHeader("Chat Global");
    } else {
      const currentUser = auth.currentUser;
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      setActiveChatId(combinedId);
      setChatHeader(`Chat dengan ${user.displayName}`);
    }
    // Sembunyikan daftar pengguna di HP setelah memilih chat
    if (window.innerWidth < 768) {
      setShowUserList(false);
    }
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-secondary">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100 flex-column flex-md-row">
      {/* Tampilkan daftar pengguna berdasarkan state */}
      {showUserList && (
        <div className="flex-shrink-0" style={{ width: '300px' }}>
          <UserList onSelectChat={handleSelectChat} />
        </div>
      )}
      <div className="d-flex flex-column flex-grow-1">
        <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom shadow-sm">
          {/* Tombol untuk menampilkan/menyembunyikan daftar pengguna di HP */}
          <button
            className="btn btn-outline-secondary d-md-none"
            onClick={toggleUserList}
          >
            &#9776; {/* Ikon hamburger */}
          </button>
          <h5 className="m-0">{chatHeader}</h5>
          <div className="d-flex gap-2">
            <Link href="/profile" className="btn btn-outline-secondary">
              Profil
            </Link>
            <LogoutButton />
          </div>
        </header>
        {activeChatId ? (
          <>
            <ChatWindow activeChatId={activeChatId} />
            <MessageInput activeChatId={activeChatId} />
          </>
        ) : (
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <p className="text-secondary">Pilih pengguna untuk memulai percakapan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
