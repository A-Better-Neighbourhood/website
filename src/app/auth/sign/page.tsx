/** @format */

"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useSignIn } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const signInMutation = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInMutation.mutateAsync({ phoneNumber, password });
      router.push("/reports");
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Sign in to your A Better Neighbourhood account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="1234567890"
                    maxLength={10}
                    required
                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="flex items-center justify-between">
              <Link
                href="#"
                className="text-sm text-emerald-600 hover:text-emerald-500 ml-auto"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>

            {signInMutation.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  {signInMutation.error.message ||
                    "Sign in failed. Please try again."}
                </p>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-emerald-600 hover:text-emerald-500 font-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/reports"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to Reports
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
