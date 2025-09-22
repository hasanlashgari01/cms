import { createClient } from "@/utils/supabase/client";

export const uploadAvatar = async (file: File, userId: string) => {
  const supabase = await createClient();

  const filePath = `avatars/${userId}-${Date.now()}.${file.name.split(".").pop()}`;

  const { error } = await supabase.storage.from("avatars").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    console.error("Error uploading file:", error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return publicUrl;
};
