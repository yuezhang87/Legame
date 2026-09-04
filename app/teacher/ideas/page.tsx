import Link from "next/link";
import { requireTeacher } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export default async function TeacherIdeasPage() {
  await requireTeacher();

  const supabase = createClient();
  const { data: ideas } = await supabase
    .from("ideas")
    .select("id, content, submitted_by_email, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="topbar">
        <h1>Submitted ideas</h1>
        <Link href="/dashboard" className="text-link">
          ← Back to dashboard
        </Link>
      </div>
      <div className="content">
        {!ideas || ideas.length === 0 ? (
          <p className="empty-state">Nothing submitted yet.</p>
        ) : (
          <ul className="idea-list">
            {ideas.map((idea) => (
              <li key={idea.id} className="idea-card">
                <p>{idea.content}</p>
                <div className="idea-meta">
                  {idea.submitted_by_email} ·{" "}
                  {new Date(idea.created_at).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
