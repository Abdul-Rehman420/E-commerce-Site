"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RecoverPage() {
  const { recoverPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoverPassword(email)) setSent(true);
    else setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md text-center">
        <h1 className="font-serif text-3xl font-medium text-navy mb-2">Reset Password</h1>
        <p className="text-sm text-navy/60 mb-10">Enter your email and we&apos;ll send recovery instructions</p>
        {sent ? (
          <div>
            <p className="text-sm text-navy/70 mb-6">If an account with that email exists, recovery instructions have been sent.</p>
            <Link href="/auth/login" className="text-sm text-gold underline hover:text-navy">Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-navy/20 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent text-navy" />
            <button type="submit" className="w-full bg-navy text-beige py-3.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Send Recovery Email</button>
          </form>
        )}
        <Link href="/auth/login" className="block mt-6 text-xs text-navy/60 underline hover:text-navy">Back to Sign In</Link>
      </div>
    </div>
  );
}
