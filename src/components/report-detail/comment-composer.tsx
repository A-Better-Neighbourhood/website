/** @format */

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddComment } from "@/hooks/reports/useReportMutations";
import { getErrorMessage } from "@/lib/errors";
import { initials } from "@/lib/format";
import type { User } from "@/types/api";

const MAX_IMAGES = 4;

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function CommentComposer({
  reportId,
  user,
}: {
  reportId: string;
  user: User | undefined;
}) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const addComment = useAddComment();

  if (!user) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          Sign in to comment, add photos and follow updates.
        </p>
        <Button asChild>
          <Link href="/auth/sign">Sign in</Link>
        </Button>
      </div>
    );
  }

  async function addFiles(files: FileList | null) {
    if (!files) return;
    const room = MAX_IMAGES - images.length;
    const picked = Array.from(files).slice(0, room);
    if (files.length > room) {
      toast.info(`You can attach up to ${MAX_IMAGES} photos.`);
    }
    const urls = await Promise.all(picked.map(readAsDataUrl));
    setImages((current) => [...current, ...urls]);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await addComment.mutateAsync({ reportId, text: text.trim(), images });
      setText("");
      setImages([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-4">
      <Avatar className="relative z-10 size-10 shrink-0 ring-4 ring-background">
        <AvatarFallback className="bg-secondary font-semibold text-secondary-foreground">
          {initials(user.fullName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border bg-card p-4">
        <Textarea
          aria-label="Add a comment"
          placeholder="Add an update, a photo, or a word of support"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((src, index) => (
              <div key={index} className="relative size-20 overflow-hidden rounded-lg bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview */}
                <img src={src} alt={`Attachment ${index + 1}`} className="size-full object-cover" />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-xs"
                  aria-label={`Remove attachment ${index + 1}`}
                  className="absolute top-1 right-1"
                  onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="ghost"
            disabled={images.length >= MAX_IMAGES}
            onClick={() => fileInput.current?.click()}
          >
            <ImagePlus data-icon="inline-start" />
            Add photos
          </Button>
          <Button type="submit" disabled={!text.trim() || addComment.isPending}>
            {addComment.isPending && <Loader2 data-icon="inline-start" className="animate-spin" />}
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
}
