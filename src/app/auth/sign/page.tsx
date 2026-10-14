/** @format */

import type { Metadata } from "next";
import { SignInAside } from "@/components/auth/auth-asides";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back, neighbour."
      description="Pick up where you left off and see what's changed on your street."
      footer={{
        text: "New around here?",
        linkLabel: "Create an account",
        href: "/auth/signup",
      }}
      aside={<SignInAside />}
    >
      <SignInForm />
    </AuthShell>
  );
}
