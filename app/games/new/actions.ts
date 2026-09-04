"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export async function createGame(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = (formData.get("title") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";

  if (!title || !url) {
    redirect("/games/new?error=missing");
  }

  const { error } = await supabase.from("games").insert({
    slug: slugify(title),
    title,
    url,
    description,
    created_by: user.id,
  });

  // The insert is also guarded by an RLS policy that only allows rows
  // from teachers — a non-teacher's request fails here, not silently.
  if (error) {
    redirect("/games/new?error=save");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
