"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (register(form.name, form.email, form.phone, form.password)) router.push("/account");
    else setError("Email already registered");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-serif text-3xl font-medium text-navy mb-2 text-center">Create Account</h1>
        <p className="text-sm text-navy/60 text-center mb-10">Join the Righteous community</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {(["name","email","phone","password","confirm"] as const).map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium text-navy mb-1.5 capitalize">{f === "confirm" ? "Confirm Password" : f}</label>
              <input type={f.includes("password")||f==="confirm"?"password":f==="email"?"email":"text"} required value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})}
                className="w-full border border-navy/20 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent text-navy" />
            </div>
          ))}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-navy text-beige py-3.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Create Account</button>
        </form>
        <p className="mt-6 text-center text-xs text-navy/60">Already have an account? <Link href="/auth/login" className="underline hover:text-navy">Sign in</Link></p>
      </div>
    </div>
  );
}
