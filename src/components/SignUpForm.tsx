"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      // 1. Supabase Authでユーザー登録
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

      if (signUpError) {
        alert("サインアップに失敗しました：" + signUpError.message);
        return;
      }

      const userId = signUpData.user?.id;
      if (!userId) {
        alert("ユーザーIDの取得に失敗しました。");
        return;
      }

      // 2. usersテーブルにnameなど追加登録
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          name: formData.name,
          email: formData.email,
        },
      ]);

      if (insertError) {
        alert("ユーザーデータの保存に失敗しました：" + insertError.message);
        return;
      }

      alert("サインアップ成功！ログインページに移動します。");
      router.push("/login");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("予期しないエラーが発生しました。");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* ヘッダーナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-end gap-2">
        <button className="px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100">
          Login
        </button>
        <button className="px-6 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700">
          Sign Up
        </button>
      </nav>

      {/* メインフォーム */}
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="off"
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
