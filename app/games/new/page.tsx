import Link from "next/link";
import { requireTeacher } from "@/lib/profile";
import { createGame } from "./actions";

export default async function NewGamePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  await requireTeacher();

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Add a game</h1>
        <p className="subtitle">It'll show up on the dashboard right away.</p>

        <form action={createGame}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" required />
          </div>
          <div className="field">
            <label htmlFor="url">Game URL</label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://…"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description (optional)</label>
            <input id="description" name="description" />
          </div>

          {searchParams.error === "missing" && (
            <p className="error">Title and URL are both required.</p>
          )}
          {searchParams.error === "save" && (
            <p className="error">Couldn't save that — please try again.</p>
          )}

          <button className="primary-btn" type="submit">
            Add game
          </button>
        </form>

        <Link href="/dashboard" className="link-btn">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
