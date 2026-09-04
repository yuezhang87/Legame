import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createIdea } from "./actions";

export default async function NewIdeaPage({
  searchParams,
}: {
  searchParams: { error?: string; submitted?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Share an idea</h1>
        <p className="subtitle">
          Got a game or learning tool idea? Teachers see everything
          submitted here.
        </p>

        {searchParams.submitted ? (
          <p className="subtitle">Thanks — your idea has been sent along.</p>
        ) : (
          <form action={createIdea}>
            <div className="field">
              <label htmlFor="content">Your idea</label>
              <textarea id="content" name="content" rows={5} required />
            </div>

            {searchParams.error === "missing" && (
              <p className="error">Write something first.</p>
            )}
            {searchParams.error === "save" && (
              <p className="error">Couldn't submit that — please try again.</p>
            )}

            <button className="primary-btn" type="submit">
              Submit idea
            </button>
          </form>
        )}

        <Link href="/dashboard" className="link-btn">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
