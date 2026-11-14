import Link from "next/link";
import { discoverEntra, entraSettings } from "@/lib/entra";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Microsoft Entra Configuration Test",
  robots: { index: false, follow: false },
};

function safeError(error: unknown) {
  let message = error instanceof Error ? error.message : "Unexpected error";
  for (const value of [
    process.env.ENTRA_CLIENT_SECRET,
    process.env.ENTRA_CLIENT_ID,
    process.env.ENTRA_TENANT_ID,
    process.env.ENTRA_TENANT_ID?.toLowerCase(),
    process.env.APP_URL,
  ]) {
    if (value) message = message.replaceAll(value, "[redacted]");
  }
  return message.slice(0, 500);
}

export default async function EntraTestPage() {
  const checks = [
    ["ENTRA_TENANT_ID", Boolean(process.env.ENTRA_TENANT_ID)],
    ["ENTRA_CLIENT_ID", Boolean(process.env.ENTRA_CLIENT_ID)],
    ["ENTRA_CLIENT_SECRET", Boolean(process.env.ENTRA_CLIENT_SECRET)],
    ["APP_URL", Boolean(process.env.APP_URL)],
  ] as const;

  let settings: ReturnType<typeof entraSettings> = null;
  let settingsError: string | null = null;
  try {
    settings = entraSettings();
    if (!settings && checks.every(([, configured]) => configured)) {
      settingsError = "One or more values are invalid. Check that the tenant and client IDs are UUIDs.";
    }
  } catch (error) {
    settingsError = safeError(error);
  }

  let discoveryError: string | null = null;
  if (settings) {
    try {
      await discoverEntra(settings);
    } catch (error) {
      discoveryError = safeError(error);
    }
  }

  const discoveryPassed = !!settings && !discoveryError;

  return <div className="wrap max-w-2xl py-10 sm:py-14">
    <Link href="/" className="font-semibold text-accent hover:underline">← Back to IT Self-Service</Link>
    <section className="panel mt-5 p-6 sm:p-9">
      <h1 className="text-3xl font-bold">Microsoft Entra Configuration Test</h1>
      <p className="mt-3 text-muted">Checks server-side environment configuration and Microsoft OpenID Connect discovery. This does not sign in a user or reveal credential values.</p>

      <h2 className="mt-6 text-xl font-bold">Environment</h2>
      <ul className="mt-2 space-y-2">
        {checks.map(([name, configured]) => <li key={name} className="flex items-center justify-between gap-4 rounded border border-line p-3">
          <code>{name}</code>
          <span className={configured ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
            {configured ? "Configured" : "Missing"}
          </span>
        </li>)}
      </ul>

      <h2 className="mt-6 text-xl font-bold">Configuration validation</h2>
      {settings
        ? <p className="mt-2 text-green-700">Passed. Required values are valid and APP_URL is an allowed origin.</p>
        : <p role="alert" className="mt-2 text-red-700">{settingsError ?? "Failed. Add the required values and verify the tenant/client IDs and APP_URL."}</p>}

      <h2 className="mt-6 text-xl font-bold">Microsoft discovery</h2>
      {discoveryPassed
        ? <p className="mt-2 text-green-700">Passed. Microsoft OpenID Connect metadata was retrieved successfully.</p>
        : <p role="alert" className="mt-2 text-red-700">
          {settings ? `Failed: ${discoveryError}` : "Not run because configuration validation failed."}
        </p>}
    </section>
  </div>;
}
