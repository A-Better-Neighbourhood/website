/** @format */

"use client";

import Container from "@/components/Container";
import CameraCapture from "@/components/CameraCapture";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateReportSchema, CreateReportType } from "@/schemas/ReportSchema";
import { useCreateReport } from "@/hooks/reports/useReportMutations";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AddReportPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const { user, isLoading } = useAuth();
  const createReportMutation = useCreateReport();

  const form = useForm<CreateReportType>({
    resolver: zodResolver(CreateReportSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      location: [0, 0],
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = form;
  const watchedLocation = watch("location");
  const watchedImage = watch("image");
  const watchedTitle = watch("title");
  const watchedDescription = watch("description");
  const isSubmitting = createReportMutation.isPending;

  const onSubmit = async (data: CreateReportType) => {
    try {
      await createReportMutation.mutateAsync(data);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
  };

  const handleCameraCapture = (
    image: string,
    location: { lat: number; lng: number }
  ) => {
    setValue("image", image, { shouldValidate: true });
    setValue("location", [location.lat, location.lng], {
      shouldValidate: true,
    });
    setCameraError(null);
  };

  const handleCameraError = (error: string) => {
    setCameraError(error);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Sign In Required
            </h1>
            <p className="text-slate-600 mb-8">
              Please sign in to report an issue. Your account helps us track and
              verify reports in the community.
            </p>
            <div className="space-y-3">
              <Link href="/auth/sign">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/reports">
                <Button variant="ghost" className="w-full">
                  Return to Reports
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Report Submitted!
            </h1>
            <p className="text-slate-600 mb-8">
              Thank you for helping improve our community. Your report has been
              submitted and will be reviewed soon.
            </p>
            <div className="space-y-3">
              <Link href="/reports">
                <Button className="w-full">View All Reports</Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => setIsSuccess(false)}
                className="w-full"
              >
                Submit Another Report
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li>
              <Link
                href="/reports"
                className="hover:text-emerald-600 transition-colors"
              >
                Reports
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-slate-900 font-medium">Add Report</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="space-y-6">
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Report an Issue
              </h1>
              <p className="text-slate-600">
                Fill out the details below to help us fix the problem.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="title">Title</FieldLabel>
                      <Input
                        id="title"
                        placeholder="e.g., Broken Streetlight"
                        {...register("title")}
                        className={cn(
                          errors.title &&
                            "border-red-300 focus-visible:ring-red-200"
                        )}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        id="description"
                        placeholder="Describe the issue in detail..."
                        rows={4}
                        {...register("description")}
                        className={cn(
                          "resize-none rounded-xl border-slate-200 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 min-h-[120px]",
                          errors.description &&
                            "border-red-300 focus-visible:ring-red-200"
                        )}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>Photo & Location</FieldLabel>
                      <FieldDescription className="mb-3">
                        Take a clear photo of the issue. We'll automatically
                        capture your location.
                      </FieldDescription>

                      {cameraError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-700 text-sm">{cameraError}</p>
                        </div>
                      )}

                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <CameraCapture
                          onCapture={handleCameraCapture}
                          onError={handleCameraError}
                        />
                      </div>

                      {errors.image && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.image.message}
                        </p>
                      )}
                      {errors.location && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </Button>
                  <Link href="/reports" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="hidden lg:block space-y-6 sticky top-24">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Live Preview
              </h2>
              <p className="text-slate-500 text-sm">
                This is how your report will appear to others.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Preview Image */}
              <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
                {watchedImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={watchedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                      No image captured yet
                    </p>
                  </div>
                )}

                {/* Status Badge Preview */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border bg-amber-50 text-amber-700 border-amber-200">
                    PENDING
                  </span>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                  {watchedTitle || "Untitled Report"}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 min-h-[3rem]">
                  {watchedDescription || "No description provided yet..."}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">
                    {user?.fullName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {user?.fullName || "Anonymous User"}
                    </p>
                    <p className="text-xs text-slate-500">Just now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Preview */}
            {watchedLocation[0] !== 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-slate-900 text-sm">
                    Location
                  </h3>
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">
                    {watchedLocation[0].toFixed(4)},{" "}
                    {watchedLocation[1].toFixed(4)}
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 h-40">
                  <Map
                    lat={watchedLocation[0]}
                    lng={watchedLocation[1]}
                    height="100%"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddReportPage;
