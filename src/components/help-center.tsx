"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  FileText,
  HelpCircle,
  KeyRound,
  Mail,
  Printer,
  Search,
  Ticket,
  Wifi,
} from "lucide-react";
import { resetUrl, supportEmail, supportHours, supportPhone } from "@/lib/services";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: <>Use <a className="font-semibold text-accent underline underline-offset-2" href={resetUrl} target="_blank" rel="noopener noreferrer">Microsoft Password Reset</a> and follow the verification steps.</>,
    keywords: "account login password microsoft",
  },
  {
    question: "How do I raise an IT ticket?",
    answer: <>Open <Link className="font-semibold text-accent underline underline-offset-2" href="/contact-it">Contact IT</Link> and sign in with your college Microsoft account.</>,
    keywords: "support request issue ticket contact",
  },
];

const topics = [
  {
    id: "policies",
    title: "IT Policies",
    description: "Need guidance on safe and acceptable use of college IT?",
    detail: "Ask the IT Service Desk for the current security and acceptable use policies.",
    icon: FileText,
    keywords: "security acceptable use guidelines rules",
  },
  {
    id: "wifi",
    title: "Wi-Fi Access",
    description: "Get connected on campus.",
    detail: "Contact the Service Desk for the network name and connection instructions for your campus.",
    icon: Wifi,
    keywords: "wireless internet network connect campus",
  },
  {
    id: "printing",
    title: "Printing Services",
    description: "Help with printers and print credit.",
    detail: "The Service Desk can help with printer access, setup, and print credit.",
    icon: Printer,
    keywords: "printer print credit setup",
  },
];

const quickLinks = [
  { title: "Reset password", href: resetUrl, icon: KeyRound, external: true },
  { title: "Raise a ticket", href: "/contact-it", icon: Ticket, external: false },
  { title: "Email the Service Desk", href: `mailto:${supportEmail}`, icon: Mail, external: true },
];

export function HelpCenter() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const visibleFaqs = useMemo(() => faqs.filter(faq =>
    `${faq.question} ${faq.keywords}`.toLowerCase().includes(query),
  ), [query]);
  const visibleTopics = useMemo(() => topics.filter(topic =>
    `${topic.title} ${topic.description} ${topic.detail} ${topic.keywords}`.toLowerCase().includes(query),
  ), [query]);
  const resultsCount = visibleFaqs.length + visibleTopics.length;

  return <div className="wrap max-w-5xl py-8 sm:py-12">
    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent">
      <ArrowLeft size={17} aria-hidden="true" /> Back to IT Self-Service
    </Link>

    <section className="home-enter relative isolate mt-6 overflow-hidden rounded-3xl bg-[#0b3d58] px-6 py-9 text-white sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -right-20 -top-28 -z-10 size-80 rounded-full bg-[#70c9ee]/15 blur-3xl" />
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-50">
          <HelpCircle size={14} aria-hidden="true" /> REGENT COLLEGE LONDON · HELP CENTRE
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-50 sm:text-base">
          Search for answers or browse common topics. The IT Service Desk is here if you need more support.
        </p>
        <div role="search" className="mt-6 flex max-w-xl items-center gap-3 rounded-xl bg-white px-4 text-ink shadow-[0_14px_40px_#052b4560]">
          <Search size={20} aria-hidden="true" className="shrink-0 text-[#45627c]" />
          <label htmlFor="help-search" className="sr-only">Search help topics</label>
          <input
            id="help-search"
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search password, Wi-Fi, printing…"
            className="min-h-12 min-w-0 grow bg-transparent text-sm outline-none placeholder:text-muted focus-visible:outline-none"
          />
          {search && <button type="button" className="shrink-0 cursor-pointer text-xs font-semibold text-accent hover:underline" onClick={() => setSearch("")}>Clear</button>}
        </div>
      </div>
    </section>

    <nav aria-label="Quick help links" className="mt-5 grid gap-3 sm:grid-cols-3">
      {quickLinks.map(({ title, href, icon: Icon, external }) => <a
        key={title}
        href={href}
        target={external && href.startsWith("http") ? "_blank" : undefined}
        rel={external && href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-[0_4px_16px_#12365008] transition duration-200 hover:-translate-y-0.5 hover:border-[#c4d9e8] hover:shadow-[0_12px_28px_#12365014]"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf4fa] text-[#075781] transition-colors group-hover:bg-[#e2f1fa]"><Icon size={19} aria-hidden="true" /></span>
        <span className="grow text-sm font-semibold">{title}</span>
        {external ? <ArrowUpRight size={16} aria-hidden="true" className="text-muted" /> : <ArrowRight size={16} aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-1" />}
      </a>)}
    </nav>

    <p role="status" className={query ? "mt-7 text-sm font-medium text-muted" : "sr-only"}>
      {query ? `${resultsCount} ${resultsCount === 1 ? "help result" : "help results"}` : ""}
    </p>
    {query && resultsCount === 0 && <p className="mt-7 rounded-2xl border border-line bg-white p-5 text-sm text-muted">No matching help topics. Try another search, or contact the IT Service Desk below.</p>}

    {visibleFaqs.length > 0 && <section id="faqs" className="mt-10 scroll-mt-6 sm:mt-12">
      <div className="mb-4">
        <p className="mb-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">Quick answers</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Frequently asked questions</h2>
      </div>
      <div className="divide-y divide-[#e8eef3] rounded-2xl border border-line bg-white px-5 shadow-[0_6px_20px_#12365008] sm:px-6">
        {visibleFaqs.map(({ question, answer }) => <details key={question} className="help-faq group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-semibold marker:hidden sm:text-base">
            {question}
            <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted">{answer}</p>
        </details>)}
      </div>
    </section>}

    {visibleTopics.length > 0 && <section className="mt-10 sm:mt-12">
      <div className="mb-4">
        <p className="mb-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">Browse by topic</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">More help and guidance</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleTopics.map(({ id, title, description, detail, icon: Icon }) => <article id={id} key={id} className="group scroll-mt-6 rounded-2xl border border-line bg-white p-5 shadow-[0_6px_20px_#12365008] transition duration-200 hover:-translate-y-1 hover:border-[#c4d9e8] hover:shadow-[0_14px_32px_#12365014]">
          <span className="grid size-11 place-items-center rounded-xl bg-[#edf4fa] text-[#075781] transition-transform duration-200 group-hover:scale-105"><Icon size={21} aria-hidden="true" /></span>
          <h3 className="mt-4 text-lg font-bold">{title}</h3>
          <p className="mt-1 text-xs font-medium text-muted">{description}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{detail}</p>
          <a href={`mailto:${supportEmail}?subject=${encodeURIComponent(`Help with ${title}`)}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
            Ask the Service Desk <ArrowRight size={15} aria-hidden="true" />
          </a>
        </article>)}
      </div>
    </section>}

    <section className="mt-10 grid gap-5 rounded-2xl bg-[#e8f2f8] p-5 sm:mt-12 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
      <div>
        <p className="text-xs font-bold tracking-[0.16em] text-[#075781] uppercase">Need a person?</p>
        <h2 className="mt-1 text-xl font-bold">Contact the IT Service Desk</h2>
        <p className="mt-1 text-sm text-muted">{supportHours}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <a className="button rounded-xl" href={`mailto:${supportEmail}`}><Mail size={16} aria-hidden="true" /> Email us</a>
        <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c6d8e5] bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#f5f9fc]" href="tel:+442038706666">
          <Clock3 size={16} aria-hidden="true" /> {supportPhone}
        </a>
      </div>
    </section>
  </div>;
}
