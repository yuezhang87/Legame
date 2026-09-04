import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { games } from "@/lib/games";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="page">
      <div className="topbar">
        <h1>Legame</h1>
        <SignOutButton />
      </div>
      <div className="content">
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
      </div>
    </div>
  );
}
