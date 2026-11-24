import { notFound, redirect } from "next/navigation";
import { isService, protectedServices } from "@/lib/services";
import { entraSettings } from "@/lib/entra";
import { ServiceAccessPanel } from "@/components/service-access-panel";

type Props = { params: Promise<{ service: string }>; searchParams: Promise<{ error?: string }> };

export async function generateMetadata({ params }: Props) {
  const { service } = await params;
  return { title: isService(service) ? protectedServices[service].title : "Service unavailable", robots: { index: false } };
}

export default async function ServicePage({ params, searchParams }: Props) {
  const { service } = await params;
  if (!isService(service)) notFound();
  if (!protectedServices[service].requiresMicrosoftSignIn) redirect(protectedServices[service].url);
  const { error } = await searchParams;
  let configured = false;
  try { configured = !!entraSettings(); } catch { /* An invalid APP_URL also disables sign-in. */ }
  const notice = error === "denied"
    ? "Access denied. Use an authorised college account or contact the IT Service Desk."
    : error === "expired" ? "Your sign-in request expired. Please try again."
    : error === "unavailable" || !configured ? "Microsoft sign-in is currently unavailable. Contact the IT Service Desk for assistance."
    : null;

  return <ServiceAccessPanel service={service} title={protectedServices[service].title} configured={configured} notice={notice} />;
}
