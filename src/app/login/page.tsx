"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../libs/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { error, user } = await signIn(email, password);
      if (error) {
        setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
        return;
      }
      if (user) {
        router.push("/");
      }
    } catch (err) {
      setError("ログイン中にエラーが発生しました。");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ナビゲーションバー */}
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-end space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Sign In</h1>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
