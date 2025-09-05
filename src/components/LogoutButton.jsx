// src/components/LogoutButton.jsx
"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Memanggil fungsi signOut dari Firebase
      router.push("/login"); // Mengarahkan pengguna kembali ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-green bg-info rounded-lg hover:bg-info transition duration-300"
    >
      logout
    </button>
  );
};

export default LogoutButton;
