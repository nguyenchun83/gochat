// src/app/profile/page.js
"use client";

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore"; // Pastikan ada setDoc
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      alert("Anda harus login.");
      setLoading(false);
      return;
    }

    try {
      // Perbarui nama di Firebase Authentication
      await updateProfile(user, { displayName });

      // Perbarui data di Firestore. setDoc dengan merge: true lebih aman.
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { displayName }, { merge: true });

      alert("Nama berhasil diperbarui!");
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error("Gagal memperbarui profil: ", error);
      alert("Gagal memperbarui profil: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-info bg-gradient">
      <form onSubmit={handleUpdateProfile} className="p-5 bg-white rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center text-dark">Perbarui Profil</h1>
        <div className="mb-3">
          <label htmlFor="displayNameInput" className="form-label">Nama Tampilan</label>
          <input
            type="text"
            className="form-control"
            id="displayNameInput"
            placeholder="Masukkan Nama Anda"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button type="submit" className="w-100 btn btn-primary" disabled={loading}>
          {loading ? "Memperbarui..." : "Simpan Nama"}
        </button>
      </form>
    </div>
  );
}
