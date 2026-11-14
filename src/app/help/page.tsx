import Link from "next/link";
import { resetUrl, supportEmail, supportHours, supportPhone } from "@/lib/services";

export const metadata = { title: "IT Help" };

export default function Help() {
  return <div className="wrap max-w-3xl py-10">
    <Link href="/" className="font-semibold text-accent hover:underline">← Back to IT Self-Service</Link>
    <h1 className="my-5 text-4xl font-bold">IT Help</h1>
    <div className="panel space-y-6 p-6">
      <section id="faqs"><h2 className="text-xl font-bold">FAQs</h2>
        <details className="mt-2"><summary className="cursor-pointer font-medium">How do I reset my password?</summary><p className="mt-1 text-muted">Use <a className="underline" href={resetUrl} target="_blank" rel="noopener noreferrer">Microsoft Password Reset (new tab)</a> and follow the verification steps.</p></details>
        <details className="mt-2"><summary className="cursor-pointer font-medium">How do I raise an IT ticket?</summary><p className="mt-1 text-muted">Open <Link className="underline" href="/contact-it">Contact IT</Link> and sign in with your college Microsoft account.</p></details>
      </section>
      <section id="policies"><h2 className="text-xl font-bold">IT Policies</h2><p className="text-muted">Ask the IT Service Desk for the current security and acceptable use policies.</p></section>
      <section id="wifi"><h2 className="text-xl font-bold">Wi-Fi Access</h2><p className="text-muted">Contact the Service Desk for the network name and connection instructions for your campus.</p></section>
      <section id="printing"><h2 className="text-xl font-bold">Printing Services</h2><p className="text-muted">The Service Desk can help with printer access, setup, and print credit.</p></section>
      <section><h2 className="text-xl font-bold">IT Service Desk</h2><p className="text-muted">{supportHours}</p><a className="block underline" href={`mailto:${supportEmail}`}>{supportEmail}</a><a className="block underline" href="tel:+442074877200">{supportPhone}</a></section>
    </div>
  </div>;
}
