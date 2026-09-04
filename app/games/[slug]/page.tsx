import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGame } from "@/lib/games";

export default async function GamePage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const game = getGame(params.slug);
  if (!game) {
    notFound();
  }

  return (
    <div className="game-page">
      <div className="game-bar">
        <Link href="/dashboard" className="back-link">
          ← Back to games
        </Link>
        <strong>{game.title}</strong>
      </div>
      <iframe
        className="game-frame"
        src={game.url}
        title={game.title}
        allow="fullscreen"
      />
    </div>
  );
}
