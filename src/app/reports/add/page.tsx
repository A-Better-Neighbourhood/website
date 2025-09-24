/** @format */

"use client";

import Container from "@/components/Container";
import CameraCapture from "@/components/CameraCapture";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateReportSchema, CreateReportType } from "@/schemas/ReportSchema";
import { useCreateReport } from "@/hooks/useReports";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddReportPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

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

  const { handleSubmit, setValue, watch } = form;
  const watchedLocation = watch("location");
  const isSubmitting = createReportMutation.isPending;

  const onSubmit = async (data: CreateReportType) => {
    try {
      await createReportMutation.mutateAsync(data);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Failed to submit report:", error);
      // Handle submission error here
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Report Submitted!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for helping improve our community. Your report has been
              submitted and will be reviewed soon.
            </p>
            <div className="space-y-3">
              <Link
                href="/reports"
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View All Reports
              </Link>
              <button
                onClick={() => setIsSuccess(false)}
                className="block w-full px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link
                href="/reports"
                className="hover:text-blue-600 transition-colors"
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
            <li className="text-gray-900 font-medium">Add Report</li>
          </ol>
        </nav>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Report an Issue
            </h1>
            <p className="text-gray-600">
              Help improve your community by reporting issues that need
              attention
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief description of the issue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide more details about the issue..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Camera Capture */}
                <div className="space-y-2">
                  <Label>
                    Photo & Location <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Take a photo of the issue to automatically capture both the
                    image and your current location. This ensures authenticity
                    and helps us locate the problem precisely.
                  </p>

                  {cameraError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{cameraError}</p>
                    </div>
                  )}

                  <CameraCapture
                    onCapture={handleCameraCapture}
                    onError={handleCameraError}
                  />

                  {form.formState.errors.image && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.image.message}
                    </p>
                  )}
                  {form.formState.errors.location && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.location.message}
                    </p>
                  )}
                </div>

                {/* Location Preview */}
                {watchedLocation[0] !== 0 && watchedLocation[1] !== 0 ? (
                  <div className="space-y-2">
                    <Label>Location Preview</Label>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <svg
                            className="w-4 h-4 text-green-600"
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
                          <span className="font-medium text-green-800">
                            Location captured successfully!
                          </span>
                        </div>
                        <div className="text-green-700">
                          <strong>Coordinates:</strong>{" "}
                          {watchedLocation[0].toFixed(6)},{" "}
                          {watchedLocation[1].toFixed(6)}
                        </div>
                      </div>
                      <Map
                        lat={watchedLocation[0]}
                        lng={watchedLocation[1]}
                        height="200px"
                        className="border border-gray-200"
                      />
                    </div>
                  </div>
                ) : watchedLocation[0] === 0 &&
                  watchedLocation[1] === 0 &&
                  form.watch("image") ? (
                  <div className="space-y-2">
                    <Label>Location Status</Label>
                    <div className="text-sm text-gray-600 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.167 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span className="font-medium text-yellow-800">
                          Location not available
                        </span>
                      </div>
                      <div className="text-yellow-700">
                        Your report will be submitted without location data.
                        This may affect how quickly it can be addressed.
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
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
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Submit Report
                      </>
                    )}
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/reports">Cancel</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddReportPage;
