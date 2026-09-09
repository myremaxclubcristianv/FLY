import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Access Account — AIR",
  description: "Sign in to your AIR private aviation portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="w-full max-w-md bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">AIR ACCESS PORTAL</span>
          <h1 className="text-3xl font-light text-white mt-2 tracking-tight">Sign In to AIR</h1>
          <p className="text-xs text-neutral-400 mt-2">
            Access your active flight missions, quote options, and saved aviation fleet.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
