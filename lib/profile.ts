import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string;
  role: "member" | "teacher";
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}

// Use at the top of a teacher-only page. Redirects everyone else back to
// the dashboard — the real enforcement is the RLS policies in Supabase,
// this is just so non-teachers don't land on a broken/pointless page.
export async function requireTeacher(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "teacher") {
    redirect("/dashboard");
  }
  return profile;
}
