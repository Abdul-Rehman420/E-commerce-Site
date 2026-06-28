"use client";

import { useState, useEffect } from "react";
import { scriptures } from "@/data/verses";

export function ScriptureBar() {
  const [verse, setVerse] = useState(scriptures[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerse((prev) => {
        const idx = scriptures.indexOf(prev);
        return scriptures[(idx + 1) % scriptures.length];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy text-gold py-2.5 px-4 text-center text-xs tracking-wide">
      <span className="font-serif italic font-medium">
        &ldquo;{verse.text}&rdquo; &mdash; {verse.ref}
      </span>
    </div>
  );
}
