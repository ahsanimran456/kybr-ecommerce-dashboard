"use client";

import { Bell, Search, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-neutral-200/80 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:bg-white focus:border-neutral-300 transition-all placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neutral-900 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-neutral-900">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-neutral-500">
              {user?.role || "Super Admin"}
            </p>
          </div>
          <div className="w-9 h-9 bg-neutral-900 rounded-full flex items-center justify-center ring-2 ring-neutral-200">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
