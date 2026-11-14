import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { isService, protectedServices, supportEmail } from "@/lib/services";
import { entraSettings } from "@/lib/entra";

type Props = { params: Promise<{ service: string }>; searchParams: Promise<{ error?: string }> };

export async function generateMetadata({ params }: Props) {
  const { service } = await params;
  return { title: isService(service) ? protectedServices[service].title : "Service unavailable", robots: { index: false } };
}

export default async function ServicePage({ params, searchParams }: Props) {
  const { service } = await params;
  if (!isService(service)) notFound();
  const { error } = await searchParams;
  let configured = false;
  try { configured = !!entraSettings(); } catch { /* An invalid APP_URL also disables sign-in. */ }
  const notice = error === "denied"
    ? "Access denied. Use an authorised college account or contact the IT Service Desk."
    : error === "expired" ? "Your sign-in request expired. Please try again."
    : error === "unavailable" || !configured ? "Microsoft sign-in is currently unavailable. Contact the IT Service Desk for assistance."
    : null;

  return <div className="wrap max-w-2xl py-10 sm:py-14">
    <Link href="/" className="font-semibold text-accent hover:underline">← Back to IT Self-Service</Link>
    <section className="panel mt-5 p-6 sm:p-9">
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-[#d3eaf8]"><ShieldCheck size={28} aria-hidden="true" /></span>
      <p className="mb-1 font-semibold text-accent">{protectedServices[service].title}</p>
      <h1 className="text-3xl font-bold">Sign in with your College Account</h1>
      <p className="mt-3 text-muted">Enter your college email on Microsoft’s sign-in page. After signing in, you’ll return briefly to this portal before continuing to {protectedServices[service].title}.</p>
      {notice && <p role="alert" className="mt-4 rounded border border-[#edccd9] bg-[#fff1f6] p-3 text-sm">{notice}</p>}
      {configured && <form className="mt-5" action="/api/auth/start" method="get">
        <input type="hidden" name="service" value={service} />
        <button type="submit" className="button cursor-pointer">Continue to Microsoft <ArrowRight size={18} aria-hidden="true" /></button>
      </form>}
      <a className="mt-4 block w-fit text-sm font-semibold text-accent hover:underline" href={`mailto:${supportEmail}`}>Contact the IT Service Desk</a>
    </section>
  </div>;
}
