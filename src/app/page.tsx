"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import "./globals.css";
import Link from "next/link";
import { SearchBar } from "../components/SearchBar";
import { useAuth } from "../libs/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

type Post = {
  post_id: string;
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
};

type Category = {
  id: string;
  name: string;
};

export default function Page() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("データ取得エラー:", error);
      } else {
        const sorted = (data || []).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setBlogPosts(sorted);
      }
    };
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("カテゴリ取得エラー:", error);
      } else {
        setCategories(data || []);
      }
    };
    fetchPosts();
    fetchCategories();
  }, []);

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <>
      <div className="bg-gray-50 text-gray-900">
        <header className="bg-white px-4 py-3">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">BlogTitle</h1>
            <nav className="space-x-4 text-sm">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <SearchBar />

        <main>
          <div className="max-w-6xl w-full mx-auto flex flex-wrap gap-16 m-16 justify-center">
            {blogPosts.map((post, idx) => {
              const category = categories.find(
                (cat) => String(cat.id) === String(post.category_id),
              );
              return (
                <PostCard
                  key={post.id || post.post_id || String(idx)}
                  {...post}
                  categoryName={category ? category.name : ""}
                />
              );
            })}
          </div>
          <div style={{ padding: 20 }}>
            <Pagination totalPages={10} onPageChange={handlePageChange} />
          </div>
        </main>
        <footer className="bg-white mt-16 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TeamDev19. All rights reserved.
        </footer>
      </div>
    </>
  );
}