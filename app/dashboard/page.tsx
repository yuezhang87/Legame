import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGames } from "@/lib/games";
import { getCurrentProfile } from "@/lib/profile";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [games, profile] = await Promise.all([
    getGames(),
    getCurrentProfile(),
  ]);
  const isTeacher = profile?.role === "teacher";

  return (
    <div className="page">
      <div className="topbar">
        <h1>Legame</h1>
        <div className="topbar-actions">
          <Link href="/ideas/new" className="text-link">
            Share an idea
          </Link>
          {isTeacher && (
            <>
              <Link href="/teacher/ideas" className="text-link">
                Review ideas
              </Link>
              <Link href="/games/new" className="text-link">
                + Add a game
              </Link>
            </>
          )}
          <SignOutButton />
        </div>
      </div>
      <div className="content">
        {games.length === 0 ? (
          <p className="empty-state">No games yet.</p>
        ) : (
          <div className="grid">
            {games.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="tile"
              >
                <h2>{game.title}</h2>
                <p>{game.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
