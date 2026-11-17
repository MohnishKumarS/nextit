import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { entraSettings } from "@/lib/entra";
import { isService, protectedServices, supportEmail } from "@/lib/services";
import { authCookie, hasAuthorization, recaptchaCookie, recaptchaSettings, verifyPortalCookie } from "@/lib/portal-session";
import RecaptchaForm from "@/components/recaptcha-form";

type Props = { searchParams: Promise<{ service?: string; error?: string }> };

export const metadata = { title: "Verify you're human", robots: { index: false } };

export default async function CaptchaPage({ searchParams }: Props) {
  const { service: requestedService, error } = await searchParams;
  if (!isService(requestedService)) redirect("/sign-in-error?error=expired");

  let settings: ReturnType<typeof entraSettings>;
  try {
    settings = entraSettings();
  } catch {
    redirect(`/${requestedService}?error=unavailable`);
  }
  if (!settings) redirect(`/${requestedService}?error=unavailable`);

  const cookieStore = await cookies();
  if (!hasAuthorization(cookieStore.get(authCookie(requestedService))?.value, requestedService, settings.secret)) {
    redirect(`/${requestedService}?error=expired`);
  }

  const passed = verifyPortalCookie(cookieStore.get(recaptchaCookie)?.value, "recaptcha", settings.secret)?.passed === true;
  if (passed) redirect(`/api/portal/redirect?service=${requestedService}`);

  const captcha = recaptchaSettings();
  const errorMessage = error === "required" ? "Please complete the reCAPTCHA checkbox before continuing."
    : error === "failed" ? "Google could not verify that check. Please try again."
    : error === "unavailable" ? "reCAPTCHA is temporarily unavailable. Please contact the IT Service Desk."
    : null;

  return <div className="wrap max-w-2xl py-10 sm:py-14">
    <Link href="/" className="font-semibold text-accent hover:underline">← Back to IT Self-Service</Link>
    <section className="panel mt-5 p-6 sm:p-9">
      <p className="mb-1 font-semibold text-accent">{protectedServices[requestedService].title}</p>
      <h1 className="text-3xl font-bold">Verify you’re human</h1>
      <p className="mt-3 text-muted">Your college account is authorised. Complete this check to continue. You won’t need to repeat it during this browser session.</p>
      {errorMessage && <p role="alert" className="mt-4 rounded border border-[#edccd9] bg-[#fff1f6] p-3 text-sm">{errorMessage}</p>}
      {captcha
        ? <RecaptchaForm siteKey={captcha.siteKey} service={requestedService} />
        : <p role="alert" className="mt-4 rounded border border-[#edccd9] bg-[#fff1f6] p-3 text-sm">reCAPTCHA is not configured. Contact the IT Service Desk.</p>}
      <a className="mt-4 block w-fit text-sm font-semibold text-accent hover:underline" href={`mailto:${supportEmail}`}>Contact the IT Service Desk</a>
    </section>
  </div>;
}
