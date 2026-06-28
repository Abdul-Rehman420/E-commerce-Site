"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <AdminSidebar />
          </div>
        </div>
      )}
      <div className="flex-1 bg-navy/[0.02] min-h-screen">
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-navy/10 bg-white">
          <button onClick={() => setSidebarOpen(true)} className="text-navy">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <Link href="/admin" className="font-serif text-lg tracking-tighter font-semibold uppercase">RT Admin</Link>
          <Link href="/" className="text-xs text-navy/50 hover:text-navy">Store</Link>
        </div>
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
