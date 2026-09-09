"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      // Local fallback mode when Supabase env variables are not connected
      localStorage.setItem("air_mock_user", JSON.stringify({ email, name: email.split("@")[0] }));
      setLoading(false);
      router.push("/account");
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  const handleDemoAccess = () => {
    localStorage.setItem("air_mock_user", JSON.stringify({ email: "vip.client@air.aero", name: "VIP Aviation Member" }));
    router.push("/account");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-3">
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-3 px-4 rounded-lg transition text-sm flex items-center justify-center gap-2"
      >
        {loading ? "Authenticating..." : "Sign In"}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800"></div></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-neutral-900 px-2 text-neutral-500">Or Preview Access</span></div>
      </div>

      <button
        type="button"
        onClick={handleDemoAccess}
        className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2.5 px-4 rounded-lg transition text-xs font-medium border border-neutral-700"
      >
        Demo VIP Client Portal
      </button>

      <p className="text-center text-xs text-neutral-400 mt-4">
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="text-amber-400 hover:underline">
          Register Account
        </Link>
      </p>
    </form>
  );
}
