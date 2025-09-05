"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Arahkan ke halaman utama setelah berhasil daftar
    } catch (error) {
      alert("registration failed: " + error.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-warning bg-gradient">
      <form onSubmit={handleSignUp} className="p-5 bg-white rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center text-dark">signup</h1>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-100 btn btn-primary">
          signup
        </button>
        <p className="mt-3 text-center">
          have account?{' '}
          <Link href="/login" className="text-primary">
            login here
          </Link>
        </p>
      </form>
    </div>
  );
}
