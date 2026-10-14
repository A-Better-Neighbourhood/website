/** @format */

import Link from "next/link";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: { text: string; linkLabel: string; href: string };
  aside: React.ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  aside,
}: AuthShellProps) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:py-20 lg:grid-cols-2 lg:gap-20">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h1 className="text-4xl leading-[1.1] font-bold md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {children}

        <p className="text-sm text-muted-foreground">
          {footer.text}{" "}
          <Link
            href={footer.href}
            className="group font-semibold text-primary"
          >
            <span className="underline-grow">{footer.linkLabel}</span>
          </Link>
        </p>
      </div>

      <div aria-hidden className="hidden lg:block">
        {aside}
      </div>
    </section>
  );
}
