"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleForm, { ArticleFormData } from "@/components/ArticleForm";
import {supabase} from "../../../../libs/supabase"
import { uploadImageToSupabase } from "../../../../libs/uploadImageToSupabase"


// 記事編集ページのコンポーネント
export default function EditArticlePage() {
  const router = useRouter();
  const { id: articleId } = useParams() as { id: string };
  const [article, setArticle] = useState<ArticleFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // フォーム送信と同じ機能のヘッダーボタン
  const handleCreateClick = () => {
    if (article) {
      handleSubmit(article);
    }
  };

  // 記事データの取得
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);

        const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(articleId))
        .single(); // 1件だけ取得

      if (error) {
        throw error;
      }

      if (data) {
        const fetchedArticle: ArticleFormData = {
          title: data.title,
          content: data.content,
          category_id: data.category_id,
          image: null,
          image_path: data.image_path || "",
        };
        setArticle(fetchedArticle);
      }
    } catch (err) {
      console.error("記事データの取得エラー:", err);
      setError("記事データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  if (articleId) fetchArticle();
}, [articleId]);

//※記事投稿に合わせる
  function getJSTDate(): Date {
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  return new Date(now.getTime() + jstOffset);
}

  // 更新処理
  const handleSubmit = async (data: ArticleFormData) => {
    try {
      let imagePath = data.image_path;
      if (data.image) {
        const uploadedUrl = await uploadImageToSupabase(data.image);
      if (!uploadedUrl) {
        alert("画像のアップロードに失敗しました");
        return;
      }
      imagePath = uploadedUrl;
    }

      // 更新データ
      const updateData = {
        title: data.title,
        content: data.content,
        category_id: data.category_id,
        image_path: imagePath,
        updated_at:  getJSTDate(),
        //※user_id は認証機能実装後に追加
      };

      const { error } = await supabase
      .from("posts") 
      .update(updateData)
      .eq("id",  Number(articleId));

       if (error) {
      throw error;
    }

      console.log("送信する更新データ:", updateData);

      // 成功時のリダイレクト
      router.push(`/article/${articleId}`);
    } catch (err) {
      console.error("記事更新エラー:", err);
      alert("記事の更新に失敗しました。");
    }
  };

  return (
    <>
      {/* カスタムヘッダー */}
      <header className="w-full max-w-[2055px] mx-auto h-[60px] bg-[#D9D9D9] px-[30px] flex justify-end items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleCreateClick}
            className="w-[110px] h-[36px] bg-[#383838] text-[#ffffff] rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1"
          >
            Create
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {loading && <p className="text-center py-8">読み込み中...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && article && (
          <ArticleForm onSubmit={handleSubmit} initialData={article} />
        )}
      </div>
    </>
  );
}
