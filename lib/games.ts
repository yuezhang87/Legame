import { createClient } from "@/lib/supabase/server";

export type Game = {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
};

// Games now live in the `games` table so teachers can publish them from the
// site itself. See app/games/new/actions.ts for how a row gets added.
export async function getGames(): Promise<Game[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("games")
    .select("id, slug, title, description, url")
    .order("created_at", { ascending: true });

  return data ?? [];
}

export async function getGame(slug: string): Promise<Game | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("games")
    .select("id, slug, title, description, url")
    .eq("slug", slug)
    .maybeSingle();

  return data;
}
