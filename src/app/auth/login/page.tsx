"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) router.push("/account");
    else setError("Invalid email or password");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-serif text-3xl font-medium text-navy mb-2 text-center">Welcome Back</h1>
        <p className="text-sm text-navy/60 text-center mb-10">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-navy/20 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent text-navy" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-navy/20 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent text-navy" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-navy text-beige py-3.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Sign In</button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <Link href="/auth/recover" className="text-xs text-navy/60 underline hover:text-navy block">Forgot password?</Link>
          <Link href="/auth/register" className="text-xs text-navy/60 hover:text-navy block">Don&apos;t have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
}
