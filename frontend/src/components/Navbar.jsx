import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chit-Chat</h1>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="flex items-center gap-2 bg-[var(--color-base)] border border-[var(--color-primary)] rounded-lg p-2 shadow hover:bg-[var(--color-base-hover)] transition"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-[var(--color-base)] border border-[var(--color-primary)] rounded-lg p-2 shadow hover:bg-[var(--color-base-hover)] transition"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-[var(--color-base)] border border-[var(--color-primary)] rounded-lg p-2 shadow hover:bg-[var(--color-base-hover)] transition"
                  aria-label="Logout"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
