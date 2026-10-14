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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/errors";
import { SignUpSchema, type SignUpType } from "@/schemas/AuthSchema";

export function SignUpForm() {
  const router = useRouter();
  const signUp = useSignUp();
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: "", phoneNumber: "", address: "", password: "" },
  });

  async function onSubmit(values: SignUpType) {
    try {
      await signUp.mutateAsync(values);
      toast.success("Welcome to the neighbourhood!");
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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-up-name">Full name</FieldLabel>
              <Input
                {...field}
                id="sign-up-name"
                autoComplete="name"
                placeholder="Priya Sharma"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-up-phone">Phone number</FieldLabel>
              <PhoneInput
                {...field}
                id="sign-up-phone"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-up-address">Address</FieldLabel>
              <Input
                {...field}
                id="sign-up-address"
                autoComplete="street-address"
                placeholder="House no., street, area"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Helps us show you what&apos;s happening nearby.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
              <PasswordInput
                {...field}
                id="sign-up-password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>At least 8 characters.</FieldDescription>
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
            Create account
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
