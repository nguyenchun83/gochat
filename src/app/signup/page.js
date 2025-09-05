// src/app/signup/page.js
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Impor updateProfile
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore"; // Impor setDoc dan doc
import { db } from "@/firebaseConfig"; // Pastikan db diimpor

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // State baru untuk nama
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Buat akun pengguna dengan email dan sandi
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Perbarui profil pengguna dengan nama yang dimasukkan
      await updateProfile(user, { displayName: displayName });

      // Simpan data pengguna ke koleksi 'users'
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
      });

      router.push("/");
    } catch (error) {
      alert("Pendaftaran gagal: " + error.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-info bg-gradient">
      <form onSubmit={handleSignUp} className="p-5 bg-white rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center text-dark">Daftar Akun</h1>
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
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="email@contoh.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Kata Sandi</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-100 btn btn-primary">
          Daftar
        </button>
        <p className="mt-3 text-center">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary">
            Masuk di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
