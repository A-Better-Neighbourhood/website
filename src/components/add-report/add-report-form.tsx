/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheck, Loader2, Lock, Plus } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { PhotoCapture } from "@/components/add-report/photo-capture";
import { ReportCard } from "@/components/report-card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { CreatedReport } from "@/actions/reports";
import { useCreateReport } from "@/hooks/reports/useReportMutations";
import { useAuth } from "@/hooks/useAuth";
import { categoryMeta, REPORT_CATEGORIES } from "@/lib/categories";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { CreateReportSchema, type CreateReportType } from "@/schemas/ReportSchema";
import { ReportStatus, UserRole, type Report } from "@/types/api";

function Step({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`step-${number}`} className="flex flex-col gap-5">
      <div className="flex gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary font-heading font-semibold text-primary-foreground">
          {number}
        </span>
        <div className="flex flex-col gap-1">
          <h2 id={`step-${number}`} className="text-xl font-semibold">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export function AddReportForm() {
  const { user, isLoading } = useAuth();
  const createReport = useCreateReport();
  const [created, setCreated] = useState<CreatedReport | null>(null);

  const form = useForm<CreateReportType>({
    resolver: zodResolver(CreateReportSchema),
    defaultValues: {
      image: "",
      location: [0, 0],
      category: undefined,
      title: "",
      description: "",
    },
  });
  const values = useWatch({ control: form.control });

  if (isLoading) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <Skeleton className="aspect-[4/3] rounded-2xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card px-6 py-20 text-center">
        <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Lock className="size-7" />
        </span>
        <h2 className="text-2xl font-semibold">Sign in to report an issue</h2>
        <p className="max-w-sm text-muted-foreground">
          An account lets you follow your report, get updates and rally your
          neighbours behind it.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="lg" asChild>
            <Link href="/auth/sign">Sign in</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/signup">Create an account</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (created) {
    return (
      <Success
        created={created}
        onAnother={() => {
          setCreated(null);
          form.reset();
        }}
      />
    );
  }

  async function onSubmit(data: CreateReportType) {
    try {
      setCreated(await createReport.mutateAsync(data));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  }

  const preview: Report = {
    id: "preview",
    title: values.title?.trim() || "Your title goes here",
    description: values.description?.trim() || "Your description will show up here.",
    imageUrl: values.image ? [values.image] : [],
    latitude: values.location?.[0] ?? 0,
    longitude: values.location?.[1] ?? 0,
    category: values.category ?? "",
    status: ReportStatus.PENDING,
    duplicateCount: 0,
    createdAt: new Date().toISOString(),
    creator: { id: user.id, fullName: user.fullName, role: UserRole.USER },
    upvotes: 0,
  };

  const rootError = form.formState.errors.root;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-12">
        <Step
          number={1}
          title="Take a photo"
          description="We'll pin the report to where you're standing when you take it."
        >
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <PhotoCapture
                  image={field.value}
                  location={form.getValues("location")}
                  invalid={fieldState.invalid}
                  onChange={(image, location) => {
                    form.setValue("image", image, { shouldValidate: form.formState.isSubmitted });
                    form.setValue("location", location, { shouldValidate: form.formState.isSubmitted });
                  }}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                {!fieldState.invalid && form.formState.errors.location && (
                  <FieldError errors={[form.formState.errors.location]} />
                )}
              </Field>
            )}
          />
        </Step>

        <Step
          number={2}
          title="What kind of issue is it?"
          description="This sends it to the right people."
        >
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <RadioGroup
                  aria-label="Issue category"
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {REPORT_CATEGORIES.map((category) => {
                    const meta = categoryMeta[category];
                    const id = `category-${category}`;
                    return (
                      <FieldLabel key={category} htmlFor={id}>
                        <Field orientation="horizontal">
                          <meta.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                          <FieldContent>
                            <FieldTitle>{meta.label}</FieldTitle>
                            <FieldDescription>{meta.hint}</FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={category}
                            id={id}
                            aria-invalid={fieldState.invalid}
                          />
                        </Field>
                      </FieldLabel>
                    );
                  })}
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </Step>

        <Step
          number={3}
          title="Describe it"
          description="A short title and a few details: where exactly, how bad, since when."
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="report-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="report-title"
                    maxLength={200}
                    placeholder="Pothole near the bus stop on Park Road"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="report-description">Details</FieldLabel>
                  <Textarea
                    {...field}
                    id="report-description"
                    rows={5}
                    maxLength={1000}
                    placeholder="It's on the left side heading towards the market, just past the chemist. It fills with water when it rains."
                    aria-invalid={fieldState.invalid}
                  />
                  <span className="self-end text-sm text-muted-foreground tabular-nums">
                    {field.value.length}/1000
                  </span>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </Step>

        <div className="flex flex-col gap-3 border-t pt-8">
          {rootError && <FieldError errors={[rootError]} />}
          <Button type="submit" size="lg" disabled={isSubmitting} className="sm:self-start">
            {isSubmitting && <Loader2 data-icon="inline-start" className="animate-spin" />}
            Submit report
          </Button>
          <p className="text-sm text-muted-foreground">
            Your name and report will be visible to neighbours and local authorities.
          </p>
        </div>
      </form>

      <aside className="hidden lg:block">
        <div className="sticky top-24 flex flex-col gap-4">
          <p className="text-sm font-semibold text-muted-foreground">Preview</p>
          <div className="pointer-events-none select-none" aria-hidden>
            <ReportCard report={preview} />
          </div>
          <p className="text-sm text-muted-foreground">
            This is how your report will look on the noticeboard.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Success({
  created,
  onAnother,
}: {
  created: CreatedReport;
  onAnother: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl border bg-card px-6 py-16 text-center md:py-20">
      <span className="flex size-16 -rotate-6 items-center justify-center rounded-2xl bg-sage text-sage-foreground">
        <CircleCheck className="size-8" />
      </span>
      <h2 className="text-3xl font-bold md:text-4xl">
        {created.merged ? "Someone beat you to it" : "It's on the noticeboard"}
      </h2>
      <p className={cn("max-w-md text-lg text-muted-foreground")}>
        {created.merged
          ? "A neighbour already reported this nearby, so we've added yours to theirs. More reports means more weight."
          : "Thanks for looking out for your street. We'll post every update on the report's timeline."}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button size="lg" asChild>
          <Link href={`/reports/${created.report.id}`}>
            View report
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" onClick={onAnother}>
          <Plus data-icon="inline-start" />
          Report another
        </Button>
      </div>
    </div>
  );
}
