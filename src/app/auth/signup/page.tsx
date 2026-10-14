/** @format */

import type { Metadata } from "next";
import { SignUpAside } from "@/components/auth/auth-asides";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = { title: "Join" };

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Join"
      title="Join your neighbours."
      description="Report what you see, back the issues you care about, and follow them until they're sorted."
      footer={{
        text: "Already have an account?",
        linkLabel: "Sign in",
        href: "/auth/sign",
      }}
      aside={<SignUpAside />}
    >
      <SignUpForm />
    </AuthShell>
  );
}
