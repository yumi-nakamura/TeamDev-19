import { supabase } from "../libs/supabase";

export const uploadImageToSupabase = async (file: File): Promise<string | null> => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("my-bucket") 
    .upload(`posts/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("画像アップロードエラー:", error);
    return null;
  }

  // 公開URLを取得
  const { data: publicUrlData } = supabase.storage
    .from("my-bucket")
    .getPublicUrl(`posts/${fileName}`);

  return publicUrlData.publicUrl || null;
};
