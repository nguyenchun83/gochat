"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert("login failed: " + error.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-warning bg-gradient">
      <form onSubmit={handleLogin} className="p-5 bg-white rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center text-dark">login</h1>
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
          login
        </button>
        <p className="mt-3 text-center">
          don't have an account yet?{' '}
          <Link href="/signup" className="text-primary">
            signup here
          </Link>
        </p>
      </form>
    </div>
  );
}
