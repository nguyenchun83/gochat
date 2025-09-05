"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

// Pastikan Anda sudah membuat dan mengimpor komponen ini
import MessageInput from "@/components/MessageInput";
import ChatWindow from "@/components/ChatWindow";
import LogoutButton from "@/components/LogoutButton";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Memeriksa status otentikasi pengguna
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Jika tidak ada pengguna (null), arahkan ke halaman login
      if (!user) {
        router.push("/login");
      } else {
        // Jika ada pengguna, hentikan status loading
        setLoading(false);
      }
    });

    // Menghentikan listener saat komponen dilepas
    return () => unsubscribe();
  }, [router]);

  // Tampilkan pesan loading saat menunggu status otentikasi
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-secondary">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column vh-100 bg-warning">
      {/* Header dengan tombol Logout */}
      <header className="d-flex justify-content-end align-items-center p-3 bg-white text-dark shadow">
        <LogoutButton />
      </header>
      
      {/* Jendela Chat */}
      <div className="flex-grow-1 overflow-auto">
        <ChatWindow />
      </div>

      {/* Input Pesan */}
      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  );
}
