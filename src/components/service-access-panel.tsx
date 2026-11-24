"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { supportEmail } from "@/lib/services";

type Props = {
  service: string;
  title: string;
  configured: boolean;
  notice: string | null;
};

export function ServiceAccessPanel({ service, title, configured, notice }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return <div className="wrap max-w-5xl py-8 sm:py-12">
    <Link href="/" className="service-back inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent">
      <ArrowLeft size={17} aria-hidden="true" /> Back to IT Self-Service
    </Link>

    <div className="service-enter mt-6 grid overflow-hidden rounded-3xl border border-[#dce7ef] bg-white shadow-[0_20px_60px_#0d2d5012] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative isolate overflow-hidden bg-[#0b3d58] p-6 text-white sm:p-9 lg:p-11">
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-[#70c9ee]/15 blur-3xl" />
        <span className="mb-7 grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#c5edff]">
          <ShieldCheck size={29} aria-hidden="true" />
        </span>
        <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#c5edff] uppercase">Secure service access</p>
        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">Continue to {title}</h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-blue-50 sm:text-base">
          Use your College Account to verify your access. You’ll be securely returned here before continuing to the service.
        </p>

        <ol className="mt-8 space-y-5">
          <li className="flex items-start gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#0b3d58]">1</span>
            <span><span className="block text-sm font-semibold">Sign in with Microsoft</span><span className="mt-0.5 block text-xs text-blue-100">Use your college email and password.</span></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/35 bg-white/10 text-sm font-bold">2</span>
            <span><span className="block text-sm font-semibold">Open {title}</span><span className="mt-0.5 block text-xs text-blue-100">You’ll be redirected automatically after sign-in.</span></span>
          </li>
        </ol>
      </section>

      <section className="flex flex-col p-6 sm:p-9 lg:p-11">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#176b52]">
          <span className="grid size-7 place-items-center rounded-full bg-[#e7f5ee]"><LockKeyhole size={15} aria-hidden="true" /></span>
          Protected by Microsoft sign-in
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">Ready to continue?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          You’ll sign in on Microsoft’s secure website. We never ask you to enter your password on this portal.
        </p>

        {notice && <p role="alert" className="mt-5 rounded-xl border border-[#edccd9] bg-[#fff1f6] p-4 text-sm leading-relaxed text-[#702347]">{notice}</p>}

        {configured
          ? <form className="mt-7" action="/api/auth/start" method="get" onSubmit={() => setIsSubmitting(true)}>
              <input type="hidden" name="service" value={service} />
              <button type="submit" disabled={isSubmitting} className="button group min-h-12 w-full justify-between rounded-xl px-5 shadow-[0_7px_18px_#8a17652e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_11px_24px_#8a176544] disabled:cursor-wait disabled:opacity-80">
                <span className="inline-flex items-center gap-2">
                  {isSubmitting ? <LoaderCircle size={18} aria-hidden="true" className="animate-spin" /> : <ShieldCheck size={18} aria-hidden="true" />}
                  {isSubmitting ? "Connecting to Microsoft…" : "Continue with Microsoft"}
                </span>
                {!isSubmitting && <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          : <p className="mt-7 rounded-xl border border-[#f0dfb8] bg-[#fff9e9] p-4 text-sm leading-relaxed text-[#664900]">
              Sign-in is temporarily unavailable. Please try again later or contact the IT Service Desk.
            </p>}

        <details className="service-faq mt-6 border-t border-[#e8eef3] pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-semibold marker:hidden">
            <span className="inline-flex items-center gap-2"><CircleHelp size={17} aria-hidden="true" className="text-[#45627c]" /> What will happen after sign-in?</span>
            <ChevronDown size={17} aria-hidden="true" className="shrink-0 text-muted transition-transform" />
          </summary>
          <p className="mt-3 pl-6 text-sm leading-relaxed text-muted">
            Microsoft will verify your college account. Once sign-in is complete, you’ll return to this portal and continue directly to {title}.
          </p>
        </details>

        <div className="mt-auto pt-6">
          <p className="text-xs text-muted">Having trouble accessing your account?</p>
          <a className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-[#5f1049] hover:underline" href={`mailto:${supportEmail}`}>
            <Mail size={16} aria-hidden="true" /> Contact the IT Service Desk <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
        <div className="mt-6 flex items-center gap-2 border-t border-[#e8eef3] pt-4 text-xs text-muted">
          <Check size={14} aria-hidden="true" className="text-[#176b52]" /> Your sign-in is protected by Regent College London.
        </div>
      </section>
    </div>
  </div>;
}
