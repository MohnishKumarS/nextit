import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, Phone, Shield } from "lucide-react";
import { protectedServices, resetUrl, supportEmail, supportHours, supportPhone } from "@/lib/services";

export function Header() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="bg-white">
      <div className="wrap flex min-h-20 flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/" aria-label="Regent College London IT Self-Service home">
            <Image src="/regent-brand.png" alt="Regent College London, 25+ years of changing lives" width={239} height={53} priority className="h-auto w-[160px] sm:w-[239px]" />
          </Link>
          <div className="border-l border-line pl-4 sm:pl-5">
            <div className="text-base font-bold sm:text-xl">IT Self-Service</div>
            <div className="text-sm text-muted">Help &amp; support</div>
          </div>
        </div>
        <span className="hidden items-center gap-2 text-sm font-medium md:flex"><Shield size={17} aria-hidden="true" /> Secured with Microsoft Entra ID</span>
      </div>
    </header>
    <div className="bg-[#8d286b] text-white">
      <div className="wrap flex flex-wrap gap-x-7 gap-y-1 py-2.5 text-xs font-semibold sm:text-sm">
        <a className="hover:underline" href="tel:+442074877200">IT Service Desk · {supportPhone}</a>
        <span>Opening hours · {supportHours}</span>
        {/* <a className="hover:underline" href={resetUrl} target="_blank" rel="noopener noreferrer">Forgotten your password? Reset it online (new tab)</a> */}
        <span>Forgotten your password? Reset it below — no sign-in needed</span>
      </div>
    </div>
  </>;
}

export function Footer() {
  return <footer className="mt-auto bg-[#0d3048] text-white">
    <div className="wrap grid gap-6 py-7 text-sm sm:grid-cols-2 lg:grid-cols-[.85fr_1.4fr_1.2fr_1fr]">
      <Link href="/" className="w-fit text-lg font-bold">Regent College<br />London</Link>
      <section>
        <h2 className="mb-2 font-bold">IT Service Desk</h2>
        <a className="footer-link" href="tel:+442074877200"><Phone size={15} aria-hidden="true" />{supportPhone}</a>
        <a className="footer-link" href={`mailto:${supportEmail}`}><Mail size={15} aria-hidden="true" />{supportEmail}</a>
        <p className="footer-link"><Clock size={15} aria-hidden="true" />{supportHours}</p>
      </section>
      <nav aria-label="Useful links">
        <h2 className="mb-2 font-bold">Useful Links</h2>
        <a className="footer-link" href="https://www.microsoft365.com/">Microsoft 365</a>
        <a className="footer-link" href={protectedServices["software-centre"].url} target="_blank" rel="noopener noreferrer">Software Centre</a>
        <Link className="footer-link" href="/contact-it">Contact IT</Link>
      </nav>
      <p className="text-blue-100">© {new Date().getFullYear()} Regent College London.</p>
    </div>
  </footer>;
}
