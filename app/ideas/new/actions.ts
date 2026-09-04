"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createIdea(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const content = (formData.get("content") as string)?.trim();
  if (!content) {
    redirect("/ideas/new?error=missing");
  }

  const { error } = await supabase.from("ideas").insert({
    content,
    submitted_by: user.id,
    submitted_by_email: user.email ?? "",
  });

  if (error) {
    redirect("/ideas/new?error=save");
  }

  redirect("/ideas/new?submitted=1");
}
