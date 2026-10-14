/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { PasswordInput } from "@/components/auth/password-input";
import { PhoneInput } from "@/components/auth/phone-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useSignIn } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/errors";
import { SignInSchema, type SignInType } from "@/schemas/AuthSchema";

export function SignInForm() {
  const router = useRouter();
  const signIn = useSignIn();
  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { phoneNumber: "", password: "" },
  });

  async function onSubmit(values: SignInType) {
    try {
      await signIn.mutateAsync(values);
      toast.success("Welcome back!");
      router.push("/reports");
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  }

  const rootError = form.formState.errors.root;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-in-phone">Phone number</FieldLabel>
              <PhoneInput
                {...field}
                id="sign-in-phone"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-in-password">Password</FieldLabel>
              <PasswordInput
                {...field}
                id="sign-in-password"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {rootError && <FieldError errors={[rootError]} />}
        <Field>
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 data-icon="inline-start" className="animate-spin" />
            )}
            Sign in
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
