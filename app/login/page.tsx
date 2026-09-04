"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      setNotice("Check your email to confirm your account, then sign in.");
      setMode("sign-in");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Legame</h1>
        <p className="subtitle">
          {mode === "sign-in"
            ? "Sign in to play"
            : "Create an account to get started"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={
                mode === "sign-in" ? "current-password" : "new-password"
              }
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {notice && <p className="subtitle">{notice}</p>}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading
              ? "Please wait…"
              : mode === "sign-in"
                ? "Sign in"
                : "Sign up"}
          </button>
        </form>

        <button
          className="link-btn"
          onClick={() => {
            setError(null);
            setNotice(null);
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
          }}
        >
          {mode === "sign-in"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
