"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/libs/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="w-full max-w-[2055px] mx-auto h-[60px] bg-[#D9D9D9] px-[30px] flex justify-between items-center relative">
      <Link href="/" className="text-xl font-bold text-gray-900">
        BlogTitle
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <Link href="/article/create">
              <button className="w-[110px] h-[36px] bg-[#383838] text-white rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1">
                Create
              </button>
            </Link>
            <button className="w-[40px] h-[40px] bg-[#bababa] rounded-full flex items-center justify-center">
              <div
                className="w-[20px] h-[23px] bg-[#151515]"
                style={{
                  mask: "url('/icons/user-icon.svg') no-repeat center",
                  WebkitMask: "url('/icons/user-icon.svg') no-repeat center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button
                type="button"
                className="w-[110px] h-[36px] bg-white text-black border border-black rounded-full text-[14px] font-bold px-2 py-1 mr-2"
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                type="button"
                className="w-[110px] h-[36px] bg-[#383838] text-[#ffffff] rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1"
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden w-[24px] h-[24px] flex flex-col justify-center items-center gap-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[60px] right-0 w-[200px] bg-white shadow-lg rounded-bl-lg z-50">
          {user ? (
            <div className="p-4 flex flex-col gap-3">
              <Link href="/article/create">
                <button className="w-full h-[36px] bg-[#383838] text-white rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1">
                  Create
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full h-[36px] bg-[#FF3131] bg-opacity-80 text-[14px] font-bold text-white rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-3">
              <Link href="/login">
                <button className="w-full h-[36px] bg-white text-black border border-black rounded-full text-[14px] font-bold">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-full h-[36px] bg-[#383838] text-white rounded-full text-[14px] font-bold">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;