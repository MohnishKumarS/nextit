import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Headset, KeyRound, Laptop, Mail, Phone, ShieldCheck, TicketCheck } from "lucide-react";
import { protectedServices, resetUrl, supportEmail, supportHours, supportPhone } from "@/lib/services";

export function Header() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="border-b border-[#e7edf2] bg-white">
      <div className="wrap flex min-h-[76px] flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/" aria-label="Regent College London IT Self-Service home">
            <Image src="/rcl-logo.svg" alt="Regent College London, 25+ years of changing lives" width={239} height={53} priority className="h-auto w-[160px] sm:w-[259px]" />
          </Link>
          <div className="border-l border-line pl-4 sm:pl-5">
            <div className="text-base font-bold sm:text-xl">IT Self-Service</div>
            <div className="text-xs text-muted sm:text-sm">Help &amp; support</div>
          </div>
        </div>
        <span className="hidden items-center gap-2 rounded-full bg-[#edf7f4] px-3 py-2 text-xs font-semibold text-[#176b52] md:flex"><ShieldCheck size={16} aria-hidden="true" /> Secure college support</span>
      </div>
    </header>
    <div className="bg-[#74205c] text-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2.5 text-xs font-medium sm:text-sm">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a className="inline-flex items-center gap-2 hover:underline" href="tel:+442038706666"><Phone size={15} aria-hidden="true" />{supportPhone}</a>
          <span className="inline-flex items-center gap-2 text-white/85"><Clock3 size={15} aria-hidden="true" />{supportHours}</span>
        </div>
        <div className="inline-flex items-center gap-2 text-white/85">
          <KeyRound size={15} aria-hidden="true" />
          Forgotten your password? Reset it below — no sign-in needed
        </div>
        {/* <a className="inline-flex items-center gap-2 font-semibold hover:underline" href={resetUrl} target="_blank" rel="noopener noreferrer">
          <KeyRound size={15} aria-hidden="true" /> Reset password <ArrowUpRight size={14} aria-hidden="true" />
        </a> */}
      </div>
    </div>
  </>;
}

export function Footer() {
  return <footer className="mt-auto bg-[#0b2b40] text-white">
    <div className="wrap grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:py-12">
      <section>
        <Link href="/" aria-label="Regent College London IT Self-Service home" className="inline-block">
          <Image src="/rcl-logo-primary.svg" alt="Regent College London" width={239} height={53} className="h-auto w-[145px]" />
        </Link>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-100">IT help and resources for the Regent College London community.</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-100">
          <ShieldCheck size={14} aria-hidden="true" /> Secure college support
        </span>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-bold tracking-wide">Contact the Service Desk</h2>
        <a className="footer-link" href="tel:+442038706666"><Phone size={16} aria-hidden="true" />{supportPhone}</a>
        <a className="footer-link" href={`mailto:${supportEmail}`}><Mail size={16} aria-hidden="true" />{supportEmail}</a>
        <p className="footer-link"><Clock3 size={16} aria-hidden="true" />{supportHours}</p>
      </section>
      <nav aria-label="Useful links">
        <h2 className="mb-4 text-sm font-bold tracking-wide">Quick links</h2>
        <a className="footer-link" href="https://www.microsoft365.com/" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16} aria-hidden="true" />Microsoft 365</a>
        <a className="footer-link" href={protectedServices["software-centre"].url} target="_blank" rel="noopener noreferrer"><Laptop size={16} aria-hidden="true" />Software Centre</a>
        <Link className="footer-link" href="/contact-it"><TicketCheck size={16} aria-hidden="true" />Contact IT</Link>
        <Link className="footer-link" href="/help"><Headset size={16} aria-hidden="true" />Help centre</Link>
      </nav>
    </div>
    <div className="border-t border-white/10">
      <div className="wrap flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-blue-100">
        <p>© {new Date().getFullYear()} Regent College London. All rights reserved.</p>
        {/* <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">IT Self-Service <ArrowUpRight size={13} aria-hidden="true" /></Link> */}
      </div>
    </div>
  </footer>;
}
